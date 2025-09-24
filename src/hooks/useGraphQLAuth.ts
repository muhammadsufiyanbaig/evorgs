"use client";

import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import {
  LOGIN_USER,
  REGISTER_USER,
  VERIFY_USER_REGISTRATION,
  REQUEST_LOGIN_OTP,
  VERIFY_LOGIN_OTP,
  RESET_USER_PASSWORD,
  SET_NEW_USER_PASSWORD,
  UPDATE_USER_PROFILE,
  CHANGE_USER_PASSWORD,
  RESEND_USER_OTP,
  GET_CURRENT_USER,
  type LoginInput,
  type RegisterInput,
  type VerifyOtpInput,
  type ResetPasswordInput,
  type SetNewPasswordInput,
  type UpdateProfileInput,
  type ChangePasswordInput,
  type ResendOtpInput,
  type AuthPayload,
  type User
} from '@/lib/graphQL/auth/user';

export const useGraphQLAuth = () => {
  const { login: zustandLogin, logout: zustandLogout, setLoading } = useAuth();
  const [pendingVerification, setPendingVerification] = useState<{
    email: string;
    purpose: 'registration' | 'password_reset';
    userType: 'User' | 'Vendor' | 'Admin';
  } | null>(null);

  // Mutations
  const [loginMutation, { loading: loginLoading }] = useMutation<{ login: AuthPayload }>(LOGIN_USER);
  const [registerMutation, { loading: registerLoading }] = useMutation<{ register: string }>(REGISTER_USER);
  const [verifyRegistrationMutation, { loading: verifyRegistrationLoading }] = useMutation<{ verifyRegistration: AuthPayload }>(VERIFY_USER_REGISTRATION);
  const [requestLoginOtpMutation, { loading: requestOtpLoading }] = useMutation<{ requestLoginOtp: string }>(REQUEST_LOGIN_OTP);
  const [verifyLoginOtpMutation, { loading: verifyOtpLoading }] = useMutation<{ verifyLoginOtp: AuthPayload }>(VERIFY_LOGIN_OTP);
  const [resetPasswordMutation, { loading: resetPasswordLoading }] = useMutation<{ resetPassword: string }>(RESET_USER_PASSWORD);
  const [setNewPasswordMutation, { loading: setNewPasswordLoading }] = useMutation<{ setNewPassword: string }>(SET_NEW_USER_PASSWORD);
  const [updateProfileMutation, { loading: updateProfileLoading }] = useMutation<{ updateProfile: User }>(UPDATE_USER_PROFILE);
  const [changePasswordMutation, { loading: changePasswordLoading }] = useMutation<{ changePassword: string }>(CHANGE_USER_PASSWORD);
  const [resendOtpMutation, { loading: resendOtpLoading }] = useMutation<{ resendOtp: string }>(RESEND_USER_OTP);

  // Queries
  const { data: currentUserData, loading: currentUserLoading, refetch: refetchCurrentUser } = useQuery<{ me: User }>(GET_CURRENT_USER, {
    skip: typeof window === 'undefined' || !localStorage.getItem('auth_token'),
  });

  // Helper to store auth token and update Zustand store
  const handleAuthSuccess = (authPayload: AuthPayload) => {
    localStorage.setItem('auth_token', authPayload.token);
    
    // Update Zustand store with user data
    const zustandUser = {
      id: authPayload.user.id,
      name: `${authPayload.user.firstName} ${authPayload.user.lastName}`,
      email: authPayload.user.email,
      userType: 'User' as const
    };
    
    // Manually update the store state
    zustandLogin(authPayload.user.email, '', 'User');
  };

  // Login with email/password
  const login = async (input: LoginInput) => {
    try {
      setLoading(true);
      const { data } = await loginMutation({ variables: { input } });
      
      if (data?.login) {
        handleAuthSuccess(data.login);
        toast.success('Login successful!');
        return { success: true, data: data.login };
      }
      
      throw new Error('Login failed');
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (input: RegisterInput) => {
    try {
      setLoading(true);
      const { data } = await registerMutation({ variables: { input } });
      
      if (data?.register) {
        // Store registration info for OTP verification
        setPendingVerification({
          email: input.email,
          purpose: 'registration',
          userType: 'User'
        });
        
        toast.success('Registration successful! Please check your email for OTP verification.');
        return { success: true, message: 'OTP sent to your email' };
      }
      
      throw new Error('Registration failed');
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Verify registration OTP
  const verifyRegistration = async (otp: string) => {
    if (!pendingVerification || pendingVerification.purpose !== 'registration') {
      throw new Error('No pending registration to verify');
    }

    try {
      setLoading(true);
      const input: VerifyOtpInput = {
        email: pendingVerification.email,
        otp,
        purpose: 'registration',
        userType: pendingVerification.userType
      };

      const { data } = await verifyRegistrationMutation({ variables: { input } });
      
      if (data?.verifyRegistration) {
        handleAuthSuccess(data.verifyRegistration);
        setPendingVerification(null);
        toast.success('Registration verified successfully!');
        return { success: true, data: data.verifyRegistration };
      }
      
      throw new Error('Verification failed');
    } catch (error: any) {
      const errorMessage = error.message || 'Verification failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Request login OTP (for OTP-based login)
  const requestLoginOtp = async (email: string) => {
    try {
      setLoading(true);
      const { data } = await requestLoginOtpMutation({ 
        variables: { email, userType: 'User' } 
      });
      
      if (data?.requestLoginOtp) {
        setPendingVerification({
          email,
          purpose: 'registration', // Using same type for OTP login
          userType: 'User'
        });
        
        toast.success('OTP sent to your email!');
        return { success: true };
      }
      
      throw new Error('Failed to send OTP');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to send OTP';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Verify login OTP
  const verifyLoginOtp = async (otp: string) => {
    if (!pendingVerification) {
      throw new Error('No pending OTP verification');
    }

    try {
      setLoading(true);
      const input: VerifyOtpInput = {
        email: pendingVerification.email,
        otp,
        purpose: 'registration', // Using for login OTP
        userType: pendingVerification.userType
      };

      const { data } = await verifyLoginOtpMutation({ variables: { input } });
      
      if (data?.verifyLoginOtp) {
        handleAuthSuccess(data.verifyLoginOtp);
        setPendingVerification(null);
        toast.success('Login successful!');
        return { success: true, data: data.verifyLoginOtp };
      }
      
      throw new Error('OTP verification failed');
    } catch (error: any) {
      const errorMessage = error.message || 'OTP verification failed';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset password (request)
  const resetPassword = async (email: string, otp: string, email: string,) => {
    try {
      setLoading(true);
      const input: ResetPasswordInput = {
        email,
        userType: 'User'
      };

      const { data } = await resetPasswordMutation({ variables: { input } });
      
      if (data?.resetPassword) {
        setPendingVerification({
          email,
          purpose: 'password_reset',
          userType: 'User'
        });
        
        toast.success('Password reset OTP sent to your email!');
        return { success: true };
      }
      
      throw new Error('Failed to send reset OTP');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to send reset OTP';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Set new password with OTP
  const setNewPassword = async (otp: string, newPassword: string) => {
    if (!pendingVerification || pendingVerification.purpose !== 'password_reset') {
      throw new Error('No pending password reset to complete');
    }

    try {
      setLoading(true);
      const input: SetNewPasswordInput = {
        email: pendingVerification.email,
        otp,
        newPassword,
        userType: pendingVerification.userType
      };

      const { data } = await setNewPasswordMutation({ variables: { input } });
      
      if (data?.setNewPassword) {
        setPendingVerification(null);
        toast.success('Password updated successfully!');
        return { success: true };
      }
      
      throw new Error('Failed to update password');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update password';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (input: UpdateProfileInput) => {
    try {
      setLoading(true);
      const { data } = await updateProfileMutation({ variables: { input } });
      
      if (data?.updateProfile) {
        toast.success('Profile updated successfully!');
        refetchCurrentUser(); // Refresh current user data
        return { success: true, data: data.updateProfile };
      }
      
      throw new Error('Failed to update profile');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to update profile';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Change password
  const changePassword = async (input: ChangePasswordInput) => {
    try {
      setLoading(true);
      const { data } = await changePasswordMutation({ variables: { input } });
      
      if (data?.changePassword) {
        toast.success('Password changed successfully!');
        return { success: true };
      }
      
      throw new Error('Failed to change password');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to change password';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const resendOtp = async () => {
    if (!pendingVerification) {
      throw new Error('No pending verification to resend OTP for');
    }

    try {
      setLoading(true);
      const input: ResendOtpInput = {
        email: pendingVerification.email,
        purpose: pendingVerification.purpose,
        userType: pendingVerification.userType
      };

      const { data } = await resendOtpMutation({ variables: { input } });
      
      if (data?.resendOtp) {
        toast.success('OTP sent to your email!');
        return { success: true };
      }
      
      throw new Error('Failed to resend OTP');
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to resend OTP';
      toast.error(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('auth_token');
    zustandLogout();
    toast.success('Logged out successfully');
  };

  return {
    // Auth operations
    login,
    register,
    verifyRegistration,
    requestLoginOtp,
    verifyLoginOtp,
    resetPassword,
    setNewPassword,
    logout,

    // Profile operations
    updateProfile,
    changePassword,

    // OTP operations
    resendOtp,

    // State
    currentUser: currentUserData?.me,
    pendingVerification,
    
    // Loading states
    isLoading: loginLoading || registerLoading || verifyRegistrationLoading || 
               requestOtpLoading || verifyOtpLoading || resetPasswordLoading || 
               setNewPasswordLoading || updateProfileLoading || changePasswordLoading || 
               resendOtpLoading || currentUserLoading
  };
};
