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

          if (!token || !userType) {
            get().setLoading(false);
            return;
          }

          set((state) => {
            state.token = token;
            state.userType = userType;
          });

          // Fetch user data based on type
          await get().refreshUserData();
        } catch (error) {
          console.error('Failed to initialize auth:', error);
          get().logout();
        }
      },

      refreshUserData: async () => {
        try {
          const { userType, token } = get();
          
          if (!token || !userType) {
            throw new Error('No authentication data found');
          }

          let userData;

          switch (userType) {
            case 'User':
              const userResult = await client.query({
                query: GET_CURRENT_USER,
                fetchPolicy: 'network-only',
              });
              userData = (userResult.data as any).me;
              break;

            case 'Vendor':
              const vendorResult = await client.query({
                query: GET_VENDOR_PROFILE,
                fetchPolicy: 'network-only',
              });
              userData = (vendorResult.data as any).vendorProfile;
              break;

            case 'Admin':
              const adminResult = await client.query({
                query: ADMIN_ME,
                fetchPolicy: 'network-only',
              });
              userData = (adminResult.data as any).adminMe;
              break;

            default:
              throw new Error('Invalid user type');
          }

          if (userData) {
            get().setUser(userData, userType);
          } else {
            throw new Error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Failed to refresh user data:', error);
          get().logout();
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
