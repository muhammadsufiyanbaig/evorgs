"use client";

import { useState, useEffect } from 'react';
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

import {
  VENDOR_LOGIN,
  VENDOR_REGISTER,
  VERIFY_VENDOR_REGISTRATION,
  VENDOR_REQUEST_LOGIN_OTP,
  VERIFY_VENDOR_LOGIN_OTP,
  RESET_VENDOR_PASSWORD,
  SET_NEW_VENDOR_PASSWORD,
  UPDATE_VENDOR_PROFILE,
  CHANGE_VENDOR_PASSWORD,
  RESEND_VENDOR_OTP,
  GET_VENDOR_PROFILE,
  type VendorLoginInput,
  type VendorRegisterInput,
  type VendorVerifyOtpInput,
  type VendorResetPasswordInput,
  type VendorSetNewPasswordInput,
  type VendorUpdateProfileInput,
  type VendorChangePasswordInput,
  type VendorResendOtpInput,
  type VendorAuthPayload,
  type Vendor
} from '@/lib/graphQL/auth/vendor';

import {
  ADMIN_LOGIN,
  ADMIN_SIGNUP,
  ADMIN_REQUEST_OTP,
  ADMIN_VERIFY_OTP,
  ADMIN_RESEND_OTP,
  ADMIN_RESET_PASSWORD,
  ADMIN_SET_NEW_PASSWORD,
  ADMIN_CHANGE_PASSWORD,
  ADMIN_UPDATE_PROFILE,
  ADMIN_ME,
  type AdminLoginInput,
  type AdminSignupInput,
  type AdminRequestOtpInput,
  type AdminVerifyOtpInput,
  type AdminResendOtpInput,
  type AdminResetPasswordInput,
  type AdminSetNewPasswordInput,
  type AdminChangePasswordInput,
  type AdminUpdateProfileInput,
  type AdminAuthResponse,
  type Admin
} from '@/lib/graphQL/auth/admin';

export const useGraphQLAuth = () => {
  const { setAuthenticatedUser, logout: zustandLogout, setLoading } = useAuth();
  const [pendingVerification, setPendingVerification] = useState<{
    email: string;
    purpose: 'registration' | 'password_reset';
    userType: 'User' | 'Vendor' | 'Admin';
  } | null>(null);

  // User Mutations
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

  // Vendor Mutations
  const [vendorLoginMutation, { loading: vendorLoginLoading }] = useMutation<{ vendorLogin: VendorAuthPayload }>(VENDOR_LOGIN);
  const [vendorRegisterMutation, { loading: vendorRegisterLoading }] = useMutation<{ vendorRegister: string }>(VENDOR_REGISTER);
  const [verifyVendorRegistrationMutation, { loading: verifyVendorRegistrationLoading }] = useMutation<{ vendorVerifyRegistration: VendorAuthPayload }>(VERIFY_VENDOR_REGISTRATION);
  const [vendorRequestLoginOtpMutation, { loading: vendorRequestOtpLoading }] = useMutation<{ vendorRequestLoginOtp: string }>(VENDOR_REQUEST_LOGIN_OTP);
  const [verifyVendorLoginOtpMutation, { loading: verifyVendorOtpLoading }] = useMutation<{ vendorVerifyLoginOtp: VendorAuthPayload }>(VERIFY_VENDOR_LOGIN_OTP);
  const [resetVendorPasswordMutation, { loading: resetVendorPasswordLoading }] = useMutation<{ vendorResetPassword: string }>(RESET_VENDOR_PASSWORD);
  const [setNewVendorPasswordMutation, { loading: setNewVendorPasswordLoading }] = useMutation<{ vendorSetNewPassword: string }>(SET_NEW_VENDOR_PASSWORD);
  const [updateVendorProfileMutation, { loading: updateVendorProfileLoading }] = useMutation<{ vendorUpdateProfile: Vendor }>(UPDATE_VENDOR_PROFILE);
  const [changeVendorPasswordMutation, { loading: changeVendorPasswordLoading }] = useMutation<{ vendorChangePassword: string }>(CHANGE_VENDOR_PASSWORD);
  const [resendVendorOtpMutation, { loading: resendVendorOtpLoading }] = useMutation<{ vendorResendOtp: string }>(RESEND_VENDOR_OTP);

  // Admin Mutations
  const [adminLoginMutation, { loading: adminLoginLoading }] = useMutation<{ adminLogin: AdminAuthResponse }>(ADMIN_LOGIN);
  const [adminSignupMutation, { loading: adminSignupLoading }] = useMutation<{ adminSignup: AdminAuthResponse }>(ADMIN_SIGNUP);
  const [adminRequestOtpMutation, { loading: adminRequestOtpLoading }] = useMutation(ADMIN_REQUEST_OTP);
  const [adminVerifyOtpMutation, { loading: adminVerifyOtpLoading }] = useMutation(ADMIN_VERIFY_OTP);
  const [adminResendOtpMutation, { loading: adminResendOtpLoading }] = useMutation(ADMIN_RESEND_OTP);
  const [adminResetPasswordMutation, { loading: adminResetPasswordLoading }] = useMutation<{ adminResetPassword: AdminAuthResponse }>(ADMIN_RESET_PASSWORD);
  const [adminSetNewPasswordMutation, { loading: adminSetNewPasswordLoading }] = useMutation<{ adminSetNewPassword: AdminAuthResponse }>(ADMIN_SET_NEW_PASSWORD);
  const [adminChangePasswordMutation, { loading: adminChangePasswordLoading }] = useMutation(ADMIN_CHANGE_PASSWORD);
  const [adminUpdateProfileMutation, { loading: adminUpdateProfileLoading }] = useMutation<{ adminUpdateAdminProfile: Admin }>(ADMIN_UPDATE_PROFILE);

  // Queries
  const { data: currentUserData, loading: currentUserLoading, refetch: refetchCurrentUser } = useQuery<{ me: User }>(GET_CURRENT_USER, {
    skip: typeof window === 'undefined' || !localStorage.getItem('auth_token'),
  });

  const { data: currentVendorData, loading: currentVendorLoading, refetch: refetchCurrentVendor, error: vendorQueryError } = useQuery<{ vendorProfile: Vendor }>(GET_VENDOR_PROFILE, {
    skip: typeof window === 'undefined' || !localStorage.getItem('auth_token'),
  });

  const { data: currentAdminData, loading: currentAdminLoading, refetch: refetchCurrentAdmin, error: adminQueryError } = useQuery<{ adminMe: Admin }>(ADMIN_ME, {
    skip: typeof window === 'undefined' || !localStorage.getItem('auth_token'),
  });
  
  // Log vendor query state changes
  useEffect(() => {
    console.log('🔍 GET_VENDOR_PROFILE Query State:');
    console.log('  - Loading:', currentVendorLoading);
    console.log('  - Has Data:', !!currentVendorData);
    console.log('  - Vendor Profile:', currentVendorData?.vendorProfile);
    console.log('  - Error:', vendorQueryError);
    console.log('  - Token exists:', typeof window !== 'undefined' ? !!localStorage.getItem('auth_token') : 'N/A');
    
    if (currentVendorData?.vendorProfile) {
      console.log('✅ Vendor Profile Loaded Successfully:', currentVendorData.vendorProfile);
    }
    
    if (vendorQueryError) {
      console.error('❌ Vendor Query Error:', vendorQueryError);
    }
  }, [currentVendorLoading, currentVendorData, vendorQueryError]);

  // Helper to store auth token and update Zustand store
  const handleAuthSuccess = (authPayload: AuthPayload | VendorAuthPayload | AdminAuthResponse, userType: 'User' | 'Vendor' | 'Admin' = 'User') => {
    console.log('🎯 handleAuthSuccess called');
    console.log('🎯 authPayload:', authPayload);
    console.log('🎯 userType:', userType);
    console.log('🎯 Token:', authPayload.token);
    
    if (typeof window !== 'undefined' && authPayload.token) {
      localStorage.setItem('auth_token', authPayload.token);
      console.log('✅ Token stored in localStorage:', localStorage.getItem('auth_token'));
    }
    
    // Handle different auth payload types and update Zustand store
    if (userType === 'Admin' && 'admin' in authPayload) {
      const adminPayload = authPayload as AdminAuthResponse;
      console.log('🎯 Admin Payload:', adminPayload.admin);
      
      if (adminPayload.admin) {
        // Prepare admin data for Zustand
        const adminData = {
          id: adminPayload.admin.id,
          firstName: adminPayload.admin.firstName,
          lastName: adminPayload.admin.lastName,
          email: adminPayload.admin.email,
          phone: adminPayload.admin.phone,
          profileImage: adminPayload.admin.profileImage,
          createdAt: adminPayload.admin.createdAt,
          updatedAt: adminPayload.admin.updatedAt,
        };
        
        console.log('📦 Prepared Admin Data for Zustand:', adminData);
        
        setAuthenticatedUser(
          {
            id: adminPayload.admin.id,
            name: `${adminPayload.admin.firstName} ${adminPayload.admin.lastName}`.trim(),
            email: adminPayload.admin.email,
          },
          authPayload.token || '',
          userType,
          undefined, // No vendor data for admin
          adminData // Pass admin data to Zustand
        );
        
        console.log('✅ Admin data stored in Zustand');
      }
    } else if (userType === 'Vendor' && 'vendor' in authPayload) {
      const vendorPayload = authPayload as VendorAuthPayload;
      console.log('🎯 Vendor Payload:', vendorPayload.vendor);
      
      // Prepare vendor data for Zustand
      const vendorData = {
        id: vendorPayload.vendor.id,
        vendorName: vendorPayload.vendor.vendorName,
        vendorEmail: vendorPayload.vendor.vendorEmail,
        vendorPhone: vendorPayload.vendor.vendorPhone,
        vendorAddress: vendorPayload.vendor.vendorAddress,
        vendorProfileDescription: vendorPayload.vendor.vendorProfileDescription,
        vendorWebsite: vendorPayload.vendor.vendorWebsite,
        vendorSocialLinks: vendorPayload.vendor.vendorSocialLinks,
        profileImage: vendorPayload.vendor.profileImage,
        bannerImage: vendorPayload.vendor.bannerImage,
        vendorType: vendorPayload.vendor.vendorType,
        vendorStatus: vendorPayload.vendor.vendorStatus,
        rating: vendorPayload.vendor.rating,
        reviewCount: vendorPayload.vendor.reviewCount,
        createdAt: vendorPayload.vendor.createdAt,
        updatedAt: vendorPayload.vendor.updatedAt,
      };
      
      console.log('📦 Prepared Vendor Data for Zustand:', vendorData);
      
      setAuthenticatedUser(
        {
          id: vendorPayload.vendor.id,
          name: vendorPayload.vendor.vendorName,
          email: vendorPayload.vendor.vendorEmail,
        },
        authPayload.token,
        userType,
        vendorData // Pass vendor data to Zustand
      );
      
      console.log('✅ Vendor data stored in Zustand');
    } else if ('user' in authPayload) {
      const userPayload = authPayload as AuthPayload;
      setAuthenticatedUser(
        {
          id: userPayload.user.id,
          name: `${userPayload.user.firstName} ${userPayload.user.lastName}`.trim(),
          email: userPayload.user.email,
        },
        authPayload.token,
        userType
      );
    }
  };

  // Login with email/password (with optional user type)
  const login = async (input: LoginInput | VendorLoginInput | AdminLoginInput, userType: 'User' | 'Vendor' | 'Admin' = 'User') => {
    try {
      setLoading(true);
      
      if (userType === 'Admin') {
        const adminInput = input as AdminLoginInput;
        console.log('🔐 Admin Login Mutation Input:', adminInput);
        
        const { data } = await adminLoginMutation({ variables: { input: adminInput } });
        
        console.log('🔐 Admin Login Mutation Response:', data);
        console.log('🔐 adminLogin data:', data?.adminLogin);
        
        if (data?.adminLogin) {
          console.log('✅ Calling handleAuthSuccess with:', data.adminLogin);
          handleAuthSuccess(data.adminLogin, userType);
          toast.success('Admin login successful!');
          return { success: true, data: data.adminLogin };
        } else {
          console.error('❌ No adminLogin data in response');
        }
      } else if (userType === 'Vendor') {
        const vendorInput = input as VendorLoginInput;
        console.log('🔐 Vendor Login Mutation Input:', vendorInput);
        
        const { data } = await vendorLoginMutation({ variables: { input: vendorInput } });
        
        console.log('🔐 Vendor Login Mutation Response:', data);
        console.log('🔐 vendorLogin data:', data?.vendorLogin);
        
        if (data?.vendorLogin) {
          console.log('✅ Calling handleAuthSuccess with:', data.vendorLogin);
          handleAuthSuccess(data.vendorLogin, userType);
          toast.success('Vendor login successful!');
          return { success: true, data: data.vendorLogin };
        } else {
          console.error('❌ No vendorLogin data in response');
        }
      } else {
        const userInput = input as LoginInput;
        const { data } = await loginMutation({ variables: { input: userInput } });
        
        if (data?.login) {
          handleAuthSuccess(data.login, userType);
          toast.success('Login successful!');
          return { success: true, data: data.login };
        }
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

  // Register user or vendor
  const register = async (input: RegisterInput | VendorRegisterInput, userType: 'User' | 'Vendor' = 'User') => {
    try {
      setLoading(true);
      
      if (userType === 'Vendor') {
        const vendorInput = input as VendorRegisterInput;
        const { data } = await vendorRegisterMutation({ variables: { input: vendorInput } });
        
        if (data?.vendorRegister) {
          // Store registration info for OTP verification
          setPendingVerification({
            email: vendorInput.vendorEmail,
            purpose: 'registration',
            userType: 'Vendor'
          });
          
          toast.success('Vendor registration successful! Please check your email for OTP verification.');
          return { success: true, message: 'OTP sent to your email' };
        }
      } else {
        const userInput = input as RegisterInput;
        const { data } = await registerMutation({ variables: { input: userInput } });
        
        if (data?.register) {
          // Store registration info for OTP verification
          setPendingVerification({
            email: userInput.email,
            purpose: 'registration',
            userType: 'User'
          });
          
          toast.success('Registration successful! Please check your email for OTP verification.');
          return { success: true, message: 'OTP sent to your email' };
        }
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
      
      if (pendingVerification.userType === 'Vendor') {
        const input: VendorVerifyOtpInput = {
          vendorEmail: pendingVerification.email,
          otp,
          purpose: 'registration',
          userType: pendingVerification.userType
        };

        const { data } = await verifyVendorRegistrationMutation({ variables: { input } });
        
        if (data?.vendorVerifyRegistration) {
          handleAuthSuccess(data.vendorVerifyRegistration, 'Vendor');
          setPendingVerification(null);
          toast.success('Vendor registration verified successfully!');
          return { success: true, data: data.vendorVerifyRegistration };
        }
      } else {
        const input: VerifyOtpInput = {
          email: pendingVerification.email,
          otp,
          purpose: 'registration',
          userType: pendingVerification.userType
        };

        const { data } = await verifyRegistrationMutation({ variables: { input } });
        
        if (data?.verifyRegistration) {
          handleAuthSuccess(data.verifyRegistration, pendingVerification.userType);
          setPendingVerification(null);
          toast.success('Registration verified successfully!');
          return { success: true, data: data.verifyRegistration };
        }
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

  // Request login OTP (for OTP-based login)
  const requestLoginOtp = async (email: string, userType: 'User' | 'Vendor' = 'User') => {
    try {
      setLoading(true);
      
      if (userType === 'Vendor') {
        const { data } = await vendorRequestLoginOtpMutation({ 
          variables: { vendorEmail: email, userType } 
        });
        
        if (data?.vendorRequestLoginOtp) {
          setPendingVerification({
            email,
            purpose: 'registration', // Using same type for OTP login
            userType: 'Vendor'
          });
          
          toast.success('OTP sent to your vendor email!');
          return { success: true };
        }
      } else {
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
      
      if (pendingVerification.userType === 'Vendor') {
        const input: VendorVerifyOtpInput = {
          vendorEmail: pendingVerification.email,
          otp,
          purpose: 'registration', // Using for login OTP
          userType: 'Vendor'
        };

        const { data } = await verifyVendorLoginOtpMutation({ variables: { input } });
        
        if (data?.vendorVerifyLoginOtp) {
          handleAuthSuccess(data.vendorVerifyLoginOtp, 'Vendor');
          setPendingVerification(null);
          toast.success('Vendor login successful!');
          return { success: true, data: data.vendorVerifyLoginOtp };
        }
      } else {
        const input: VerifyOtpInput = {
          email: pendingVerification.email,
          otp,
          purpose: 'registration', // Using for login OTP
          userType: pendingVerification.userType
        };

        const { data } = await verifyLoginOtpMutation({ variables: { input } });
        
        if (data?.verifyLoginOtp) {
          handleAuthSuccess(data.verifyLoginOtp, pendingVerification.userType);
          setPendingVerification(null);
          toast.success('Login successful!');
          return { success: true, data: data.verifyLoginOtp };
        }
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
  const resetPassword = async (email: string, newPassword: string, otp: string, userType: 'User' | 'Vendor' = 'User') => {
    try {
      setLoading(true);
      
      if (userType === 'Vendor') {
        const input: VendorResetPasswordInput = {
          vendorEmail: email,
          userType: 'Vendor'
        };

        const { data } = await resetVendorPasswordMutation({ variables: { input } });
        
        if (data?.vendorResetPassword) {
          setPendingVerification({
            email,
            purpose: 'password_reset',
            userType: 'Vendor'
          });
          
          toast.success('Password reset OTP sent to your vendor email!');
          return { success: true };
        }
      } else {
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
      
      if (pendingVerification.userType === 'Vendor') {
        const input: VendorSetNewPasswordInput = {
          vendorEmail: pendingVerification.email,
          otp,
          newPassword,
          userType: 'Vendor'
        };

        const { data } = await setNewVendorPasswordMutation({ variables: { input } });
        
        if (data?.vendorSetNewPassword) {
          setPendingVerification(null);
          toast.success('Vendor password updated successfully!');
          return { success: true };
        }
      } else {
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
      
      if (pendingVerification.userType === 'Vendor') {
        const input: VendorResendOtpInput = {
          vendorEmail: pendingVerification.email,
          purpose: pendingVerification.purpose,
          userType: 'Vendor'
        };

        const { data } = await resendVendorOtpMutation({ variables: { input } });
        
        if (data?.vendorResendOtp) {
          toast.success('OTP sent to your vendor email!');
          return { success: true };
        }
      } else {
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
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
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
    currentVendor: currentVendorData?.vendorProfile,
    currentAdmin: currentAdminData?.adminMe,
    pendingVerification,
    
    // Loading states
    isLoading: loginLoading || registerLoading || verifyRegistrationLoading || 
               requestOtpLoading || verifyOtpLoading || resetPasswordLoading || 
               setNewPasswordLoading || updateProfileLoading || changePasswordLoading || 
               resendOtpLoading || currentUserLoading || vendorLoginLoading || 
               vendorRegisterLoading || verifyVendorRegistrationLoading || 
               vendorRequestOtpLoading || verifyVendorOtpLoading || resetVendorPasswordLoading || 
               setNewVendorPasswordLoading || updateVendorProfileLoading || 
               changeVendorPasswordLoading || resendVendorOtpLoading || currentVendorLoading ||
               adminLoginLoading || adminSignupLoading || adminRequestOtpLoading ||
               adminVerifyOtpLoading || adminResendOtpLoading || adminResetPasswordLoading ||
               adminSetNewPasswordLoading || adminChangePasswordLoading || adminUpdateProfileLoading ||
               currentAdminLoading
  };
};
