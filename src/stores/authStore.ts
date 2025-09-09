"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import client from '@/utils/client';
import {
  LOGIN_USER,
  VENDOR_LOGIN,
  ADMIN_LOGIN,
  GET_CURRENT_USER,
  GET_VENDOR_PROFILE,
  ADMIN_ME,
  REGISTER_USER,
  VENDOR_REGISTER,
  ADMIN_SIGNUP,
  VERIFY_USER_REGISTRATION,
  VERIFY_VENDOR_REGISTRATION,
  ADMIN_VERIFY_OTP,
  RESET_USER_PASSWORD,
  RESET_VENDOR_PASSWORD,
  ADMIN_RESET_PASSWORD,
  UPDATE_USER_PROFILE,
  CHANGE_USER_PASSWORD,
  DELETE_USER_ACCOUNT,
  RESEND_USER_OTP,
  SET_NEW_USER_PASSWORD,
  type User,
  type Vendor,
  type Admin,
  type UserType,
  type LoginInput,
  type VendorLoginInput,
  type AdminLoginInput,
  type RegisterInput,
  type VendorRegisterInput,
  type AdminSignupInput,
  type VerifyOtpInput,
  type VendorVerifyOtpInput,
  type AdminVerifyOtpInput,
  type ResetPasswordInput,
  type VendorResetPasswordInput,
  type AdminResetPasswordInput,
  type UpdateProfileInput,
  type ChangePasswordInput,
  type ResendOtpInput,
  type SetNewPasswordInput,
} from '@/utils/graphql/auth';

// Define the current user type (union of all user types)
type CurrentUser = User | Vendor | Admin;

interface AuthState {
  // State
  user: CurrentUser | null;
  userType: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setUser: (user: CurrentUser, userType: UserType) => void;
  loginSuccess: (user: CurrentUser, userType: UserType, token: string) => void;
  logout: () => void;
  clearError: () => void;
  
  // Auth methods
  loginUser: (input: LoginInput) => Promise<void>;
  loginVendor: (input: VendorLoginInput) => Promise<void>;
  loginAdmin: (input: AdminLoginInput) => Promise<void>;
  
  registerUser: (input: RegisterInput) => Promise<void>;
  registerVendor: (input: VendorRegisterInput) => Promise<void>;
  registerAdmin: (input: AdminSignupInput) => Promise<void>;
  
  verifyUserOtp: (input: VerifyOtpInput) => Promise<void>;
  verifyVendorOtp: (input: VendorVerifyOtpInput) => Promise<void>;
  verifyAdminOtp: (input: AdminVerifyOtpInput) => Promise<void>;
  
  resetUserPassword: (input: ResetPasswordInput) => Promise<void>;
  resetVendorPassword: (input: VendorResetPasswordInput) => Promise<void>;
  resetAdminPassword: (input: AdminResetPasswordInput) => Promise<void>;
  
  // Profile management methods
  updateUserProfile: (input: UpdateProfileInput) => Promise<void>;
  changeUserPassword: (input: ChangePasswordInput) => Promise<void>;
  deleteUserAccount: () => Promise<void>;
  resendUserOtp: (input: ResendOtpInput) => Promise<void>;
  setNewUserPassword: (input: SetNewPasswordInput) => Promise<void>;
  
  // Utility methods
  initializeAuth: () => Promise<void>;
  refreshUserData: () => Promise<void>;
}

// Helper function to store auth data
const storeAuthData = (token: string, userType: UserType) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_type', userType);
  }
};

// Helper function to remove auth data
const removeAuthData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_type');
  }
};

// Helper function to get redirect URL based on user type
const getRedirectUrl = (userType: UserType): string => {
  switch (userType) {
    case 'User':
      return '/my-bookings';
    case 'Vendor':
      return '/vendor';
    case 'Admin':
      return '/admin';
    default:
      return '/login';
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      // Initial state
      user: null,
      userType: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,
      error: null,

      // Basic actions
      setLoading: (loading: boolean) => {
        set((state) => {
          state.isLoading = loading;
        });
      },

      setError: (error: string | null) => {
        set((state) => {
          state.error = error;
        });
      },

      setUser: (user: CurrentUser, userType: UserType) => {
        set((state) => {
          state.user = user;
          state.userType = userType;
          state.isAuthenticated = true;
          state.isLoading = false;
        });
      },

      loginSuccess: (user: CurrentUser, userType: UserType, token: string) => {
        set((state) => {
          state.user = user;
          state.userType = userType;
          state.token = token;
          state.isAuthenticated = true;
          state.isLoading = false;
          state.error = null;
        });
        storeAuthData(token, userType);
      },

      logout: () => {
        set((state) => {
          state.user = null;
          state.userType = null;
          state.token = null;
          state.isAuthenticated = false;
          state.isLoading = false;
          state.error = null;
        });
        removeAuthData();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      },

      clearError: () => {
        set((state) => {
          state.error = null;
        });
      },

      // Authentication methods
      loginUser: async (input: LoginInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          const { data } = await client.mutate({
            mutation: LOGIN_USER,
            variables: { input },
          });

          const { token, user } = (data as any).login;
          get().loginSuccess(user, 'User', token);
          
          if (typeof window !== 'undefined') {
            window.location.href = getRedirectUrl('User');
          }
        } catch (error: any) {
          get().setError(error.message || 'Login failed');
          get().setLoading(false);
        }
      },

      loginVendor: async (input: VendorLoginInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          const { data } = await client.mutate({
            mutation: VENDOR_LOGIN,
            variables: { input },
          });

          const { token, vendor } = (data as any).vendorLogin;
          get().loginSuccess(vendor, 'Vendor', token);
          
          if (typeof window !== 'undefined') {
            window.location.href = getRedirectUrl('Vendor');
          }
        } catch (error: any) {
          get().setError(error.message || 'Login failed');
          get().setLoading(false);
        }
      },

      loginAdmin: async (input: AdminLoginInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          const { data } = await client.mutate({
            mutation: ADMIN_LOGIN,
            variables: { input },
          });

          const { success, token, admin } = (data as any).adminLogin;

          if (success && token && admin) {
            get().loginSuccess(admin, 'Admin', token);
            
            if (typeof window !== 'undefined') {
              window.location.href = getRedirectUrl('Admin');
            }
          } else {
            throw new Error('Login failed');
          }
        } catch (error: any) {
          get().setError(error.message || 'Login failed');
          get().setLoading(false);
        }
      },

      // Registration methods
      registerUser: async (input: RegisterInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          await client.mutate({
            mutation: REGISTER_USER,
            variables: { input },
          });

          get().setLoading(false);
          
          if (typeof window !== 'undefined') {
            window.location.href = '/otp-verification';
          }
        } catch (error: any) {
          get().setError(error.message || 'Registration failed');
          get().setLoading(false);
        }
      },

      registerVendor: async (input: VendorRegisterInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          await client.mutate({
            mutation: VENDOR_REGISTER,
            variables: { input },
          });

          get().setLoading(false);
          
          if (typeof window !== 'undefined') {
            window.location.href = '/otp-verification';
          }
        } catch (error: any) {
          get().setError(error.message || 'Registration failed');
          get().setLoading(false);
        }
      },

      registerAdmin: async (input: AdminSignupInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          const { data } = await client.mutate({
            mutation: ADMIN_SIGNUP,
            variables: { input },
          });

          const { success, token, admin } = (data as any).adminSignup;

          if (success && token && admin) {
            get().loginSuccess(admin, 'Admin', token);
            
            if (typeof window !== 'undefined') {
              window.location.href = getRedirectUrl('Admin');
            }
          } else {
            if (typeof window !== 'undefined') {
              window.location.href = '/otp-verification';
            }
          }
        } catch (error: any) {
          get().setError(error.message || 'Registration failed');
          get().setLoading(false);
        }
      },

      // OTP verification methods
      verifyUserOtp: async (input: VerifyOtpInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          const { data } = await client.mutate({
            mutation: VERIFY_USER_REGISTRATION,
            variables: { input },
          });

          const { token, user } = (data as any).verifyRegistration;
          get().loginSuccess(user, 'User', token);
          
          if (typeof window !== 'undefined') {
            window.location.href = getRedirectUrl('User');
          }
        } catch (error: any) {
          get().setError(error.message || 'Verification failed');
          get().setLoading(false);
        }
      },

      verifyVendorOtp: async (input: VendorVerifyOtpInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          const { data } = await client.mutate({
            mutation: VERIFY_VENDOR_REGISTRATION,
            variables: { input },
          });

          const { token, vendor } = (data as any).vendorVerifyRegistration;
          get().loginSuccess(vendor, 'Vendor', token);
          
          if (typeof window !== 'undefined') {
            window.location.href = getRedirectUrl('Vendor');
          }
        } catch (error: any) {
          get().setError(error.message || 'Verification failed');
          get().setLoading(false);
        }
      },

      verifyAdminOtp: async (input: AdminVerifyOtpInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          await client.mutate({
            mutation: ADMIN_VERIFY_OTP,
            variables: { input },
          });

          get().setLoading(false);
          
          if (typeof window !== 'undefined') {
            window.location.href = '/admin';
          }
        } catch (error: any) {
          get().setError(error.message || 'Verification failed');
          get().setLoading(false);
        }
      },

      // Password reset methods
      resetUserPassword: async (input: ResetPasswordInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          await client.mutate({
            mutation: RESET_USER_PASSWORD,
            variables: { input },
          });

          get().setLoading(false);
          
          if (typeof window !== 'undefined') {
            window.location.href = '/reset-password';
          }
        } catch (error: any) {
          get().setError(error.message || 'Password reset failed');
          get().setLoading(false);
        }
      },

      resetVendorPassword: async (input: VendorResetPasswordInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          await client.mutate({
            mutation: RESET_VENDOR_PASSWORD,
            variables: { input },
          });

          get().setLoading(false);
          
          if (typeof window !== 'undefined') {
            window.location.href = '/reset-password';
          }
        } catch (error: any) {
          get().setError(error.message || 'Password reset failed');
          get().setLoading(false);
        }
      },

      resetAdminPassword: async (input: AdminResetPasswordInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          const { data } = await client.mutate({
            mutation: ADMIN_RESET_PASSWORD,
            variables: { input },
          });

          const { success, token, admin } = (data as any).adminResetPassword;

          if (success && token && admin) {
            get().loginSuccess(admin, 'Admin', token);
            
            if (typeof window !== 'undefined') {
              window.location.href = getRedirectUrl('Admin');
            }
          }
        } catch (error: any) {
          get().setError(error.message || 'Password reset failed');
          get().setLoading(false);
        }
      },

      // Utility methods
      initializeAuth: async () => {
        try {
          if (typeof window === 'undefined') return;

          const token = localStorage.getItem('auth_token');
          const userType = localStorage.getItem('user_type') as UserType;

          console.log('Initializing auth:', { token: !!token, userType });

          if (!token || !userType) {
            console.log('No auth data found, setting loading to false');
            get().setLoading(false);
            return;
          }

          // Set auth state immediately for faster login experience
          set((state) => {
            state.token = token;
            state.userType = userType;
            state.isAuthenticated = true; // Set this immediately
            state.isLoading = false; // Stop loading immediately
          });

          console.log('Auth data loaded, attempting to fetch user data in background...');
          
          // Try to fetch user data in background, but don't block the UI
          try {
            await get().refreshUserData();
          } catch (error) {
            console.warn('Background user data fetch failed, but keeping auth state:', error);
            // Don't logout here, user might just have network issues
          }
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          get().logout();
        }
      },

      refreshUserData: async () => {
        try {
          const { userType, token } = get();
          
          console.log('Refreshing user data:', { userType, token: !!token });
          
          if (!token || !userType) {
            throw new Error('No authentication data found');
          }

          let userData;

          switch (userType) {
            case 'User':
              console.log('Fetching user data...');
              const userResult = await client.query({
                query: GET_CURRENT_USER,
                fetchPolicy: 'network-only',
              });
              userData = (userResult.data as any).me;
              break;

            case 'Vendor':
              console.log('Fetching vendor data...');
              try {
                const vendorResult = await client.query({
                  query: GET_VENDOR_PROFILE,
                  fetchPolicy: 'network-only',
                });
                userData = (vendorResult.data as any).vendorProfile;
              } catch (vendorError) {
                console.warn('GET_VENDOR_PROFILE query failed, keeping auth state without user data:', vendorError);
                // Don't throw error, just continue without user data
                // The vendor can still access protected routes with just token + userType
                userData = null;
              }
              break;

            case 'Admin':
              console.log('Fetching admin data...');
              const adminResult = await client.query({
                query: ADMIN_ME,
                fetchPolicy: 'network-only',
              });
              userData = (adminResult.data as any).adminMe;
              break;

            default:
              throw new Error('Invalid user type');
          }

          console.log('User data fetched:', { userData: !!userData, userType });

          // Always update the state, even if userData is null (for vendor with failing GraphQL)
          set((state) => {
            state.user = userData; // This can be null for vendor if GraphQL fails
            state.userType = userType;
            state.isAuthenticated = true; // Keep authenticated even without user data
            state.isLoading = false;
          });

          if (!userData) {
            console.warn('No user data returned from API, but keeping authenticated state');
          }
        } catch (error: any) {
          console.error('Failed to refresh user data:', error);
          
          // Only logout for authentication errors, not network errors
          if (error.graphQLErrors?.some((e: any) => 
            e.message?.includes('Unauthorized') || 
            e.message?.includes('Invalid token') ||
            e.message?.includes('Authentication') ||
            e.extensions?.code === 'UNAUTHENTICATED'
          )) {
            console.log('Authentication error detected, logging out');
            get().logout();
          } else {
            // For network errors or other issues, just log but keep the user logged in
            console.warn('Non-authentication error, keeping user logged in:', error.message);
          }
        }
      },

      // ======== PROFILE MANAGEMENT METHODS ========
      updateUserProfile: async (input: UpdateProfileInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          const { data } = await client.mutate({
            mutation: UPDATE_USER_PROFILE,
            variables: { input },
          });

          const updatedUser = (data as any).updateProfile;
          if (updatedUser) {
            get().setUser(updatedUser, get().userType!);
          }
        } catch (error: any) {
          get().setError(error.message || 'Failed to update profile');
        } finally {
          get().setLoading(false);
        }
      },

      changeUserPassword: async (input: ChangePasswordInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          await client.mutate({
            mutation: CHANGE_USER_PASSWORD,
            variables: { input },
          });

          // Password changed successfully
        } catch (error: any) {
          get().setError(error.message || 'Failed to change password');
          throw error;
        } finally {
          get().setLoading(false);
        }
      },

      deleteUserAccount: async () => {
        try {
          get().setLoading(true);
          get().setError(null);

          await client.mutate({
            mutation: DELETE_USER_ACCOUNT,
          });

          // Account deleted successfully, logout user
          get().logout();
        } catch (error: any) {
          get().setError(error.message || 'Failed to delete account');
          throw error;
        } finally {
          get().setLoading(false);
        }
      },

      resendUserOtp: async (input: ResendOtpInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          await client.mutate({
            mutation: RESEND_USER_OTP,
            variables: { input },
          });

          // OTP resent successfully
        } catch (error: any) {
          get().setError(error.message || 'Failed to resend OTP');
          throw error;
        } finally {
          get().setLoading(false);
        }
      },

      setNewUserPassword: async (input: SetNewPasswordInput) => {
        try {
          get().setLoading(true);
          get().setError(null);

          await client.mutate({
            mutation: SET_NEW_USER_PASSWORD,
            variables: { input },
          });

          // Password reset successfully
        } catch (error: any) {
          get().setError(error.message || 'Failed to set new password');
          throw error;
        } finally {
          get().setLoading(false);
        }
      },
    })),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        userType: state.userType,
      }),
    }
  )
);

// Initialize auth when the store is created
if (typeof window !== 'undefined') {
  useAuthStore.getState().initializeAuth();
}
