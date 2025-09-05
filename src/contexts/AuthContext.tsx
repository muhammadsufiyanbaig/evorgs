"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@apollo/client/react';
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
  user: CurrentUser | null;
  userType: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGIN_SUCCESS'; payload: { user: CurrentUser; userType: UserType; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: { user: CurrentUser; userType: UserType } };

const initialState: AuthState = {
  user: null,
  userType: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        userType: action.payload.userType,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  // Login methods
  loginUser: (input: LoginInput) => Promise<void>;
  loginVendor: (input: VendorLoginInput) => Promise<void>;
  loginAdmin: (input: AdminLoginInput) => Promise<void>;
  
  // Registration methods
  registerUser: (input: RegisterInput) => Promise<void>;
  registerVendor: (input: VendorRegisterInput) => Promise<void>;
  registerAdmin: (input: AdminSignupInput) => Promise<void>;
  
  // OTP verification methods
  verifyUserOtp: (input: VerifyOtpInput) => Promise<void>;
  verifyVendorOtp: (input: VendorVerifyOtpInput) => Promise<void>;
  verifyAdminOtp: (input: AdminVerifyOtpInput) => Promise<void>;
  
  // Password reset methods
  resetUserPassword: (input: ResetPasswordInput) => Promise<void>;
  resetVendorPassword: (input: VendorResetPasswordInput) => Promise<void>;
  resetAdminPassword: (input: AdminResetPasswordInput) => Promise<void>;
  
  // General methods
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage keys
const TOKEN_KEY = 'auth_token';
const USER_TYPE_KEY = 'user_type';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  // GraphQL mutations
  const [loginUserMutation] = useMutation(LOGIN_USER);
  const [loginVendorMutation] = useMutation(VENDOR_LOGIN);
  const [loginAdminMutation] = useMutation(ADMIN_LOGIN);
  
  const [registerUserMutation] = useMutation(REGISTER_USER);
  const [registerVendorMutation] = useMutation(VENDOR_REGISTER);
  const [registerAdminMutation] = useMutation(ADMIN_SIGNUP);
  
  const [verifyUserRegistrationMutation] = useMutation(VERIFY_USER_REGISTRATION);
  const [verifyVendorRegistrationMutation] = useMutation(VERIFY_VENDOR_REGISTRATION);
  const [verifyAdminOtpMutation] = useMutation(ADMIN_VERIFY_OTP);
  
  const [resetUserPasswordMutation] = useMutation(RESET_USER_PASSWORD);
  const [resetVendorPasswordMutation] = useMutation(RESET_VENDOR_PASSWORD);
  const [resetAdminPasswordMutation] = useMutation(ADMIN_RESET_PASSWORD);

  // Conditional queries based on user type
  const { data: userData, refetch: refetchUser } = useQuery<{ me: User }>(GET_CURRENT_USER, {
    skip: !state.token || state.userType !== 'User',
    errorPolicy: 'ignore',
  });

  const { data: vendorData, refetch: refetchVendor } = useQuery<{ vendorProfile: Vendor }>(GET_VENDOR_PROFILE, {
    skip: !state.token || state.userType !== 'Vendor',
    errorPolicy: 'ignore',
  });

  const { data: adminData, refetch: refetchAdmin } = useQuery<{ adminMe: Admin }>(ADMIN_ME, {
    skip: !state.token || state.userType !== 'Admin',
    errorPolicy: 'ignore',
  });

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userType = localStorage.getItem(USER_TYPE_KEY) as UserType;

    if (token && userType) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: {} as CurrentUser, userType, token } });
      
      // Trigger appropriate query based on user type
      switch (userType) {
        case 'User':
          refetchUser();
          break;
        case 'Vendor':
          refetchVendor();
          break;
        case 'Admin':
          refetchAdmin();
          break;
      }
    } else {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [refetchUser, refetchVendor, refetchAdmin]);

  // Update user data when queries complete
  useEffect(() => {
    if (userData?.me && state.userType === 'User') {
      dispatch({ type: 'SET_USER', payload: { user: userData.me, userType: 'User' } });
    }
  }, [userData, state.userType]);

  useEffect(() => {
    if (vendorData?.vendorProfile && state.userType === 'Vendor') {
      dispatch({ type: 'SET_USER', payload: { user: vendorData.vendorProfile, userType: 'Vendor' } });
    }
  }, [vendorData, state.userType]);

  useEffect(() => {
    if (adminData?.adminMe && state.userType === 'Admin') {
      dispatch({ type: 'SET_USER', payload: { user: adminData.adminMe, userType: 'Admin' } });
    }
  }, [adminData, state.userType]);

  // Helper function to store auth data
  const storeAuthData = (token: string, userType: UserType) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_TYPE_KEY, userType);
  };

  // Login methods
  const loginUser = async (input: LoginInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const { data } = await loginUserMutation({ variables: { input } });
      const { token, user } = (data as any).login;

      storeAuthData(token, 'User');
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, userType: 'User', token } });
      
      router.push('/dashboard');
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loginVendor = async (input: VendorLoginInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const { data } = await loginVendorMutation({ variables: { input } });
      const { token, vendor } = (data as any).vendorLogin;

      storeAuthData(token, 'Vendor');
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: vendor, userType: 'Vendor', token } });
      
      router.push('/vendor');
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loginAdmin = async (input: AdminLoginInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const { data } = await loginAdminMutation({ variables: { input } });
      const { success, token, admin } = (data as any).adminLogin;

      if (success && token && admin) {
        storeAuthData(token, 'Admin');
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: admin, userType: 'Admin', token } });
        
        router.push('/admin');
      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Registration methods
  const registerUser = async (input: RegisterInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      await registerUserMutation({ variables: { input } });
      dispatch({ type: 'SET_LOADING', payload: false });
      
      router.push('/otp-verification');
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const registerVendor = async (input: VendorRegisterInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      await registerVendorMutation({ variables: { input } });
      dispatch({ type: 'SET_LOADING', payload: false });
      
      router.push('/otp-verification');
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const registerAdmin = async (input: AdminSignupInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const { data } = await registerAdminMutation({ variables: { input } });
      const { success, token, admin } = (data as any).adminSignup;

      if (success && token && admin) {
        storeAuthData(token, 'Admin');
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: admin, userType: 'Admin', token } });
        
        router.push('/admin');
      } else {
        router.push('/otp-verification');
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // OTP verification methods
  const verifyUserOtp = async (input: VerifyOtpInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const { data } = await verifyUserRegistrationMutation({ variables: { input } });
      const { token, user } = (data as any).verifyRegistration;

      storeAuthData(token, 'User');
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user, userType: 'User', token } });
      
      router.push('/dashboard');
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const verifyVendorOtp = async (input: VendorVerifyOtpInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const { data } = await verifyVendorRegistrationMutation({ variables: { input } });
      const { token, vendor } = (data as any).vendorVerifyRegistration;

      storeAuthData(token, 'Vendor');
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: vendor, userType: 'Vendor', token } });
      
      router.push('/vendor');
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const verifyAdminOtp = async (input: AdminVerifyOtpInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      await verifyAdminOtpMutation({ variables: { input } });
      dispatch({ type: 'SET_LOADING', payload: false });
      
      // Handle based on purpose (registration, login, password_reset)
      router.push('/admin');
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Password reset methods
  const resetUserPassword = async (input: ResetPasswordInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      await resetUserPasswordMutation({ variables: { input } });
      dispatch({ type: 'SET_LOADING', payload: false });
      
      router.push('/reset-password');
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const resetVendorPassword = async (input: VendorResetPasswordInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      await resetVendorPasswordMutation({ variables: { input } });
      dispatch({ type: 'SET_LOADING', payload: false });
      
      router.push('/reset-password');
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const resetAdminPassword = async (input: AdminResetPasswordInput) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      const { data } = await resetAdminPasswordMutation({ variables: { input } });
      const { success, token, admin } = (data as any).adminResetPassword;

      if (success && token && admin) {
        storeAuthData(token, 'Admin');
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user: admin, userType: 'Admin', token } });
        
        router.push('/admin');
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // General methods
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_TYPE_KEY);
    dispatch({ type: 'LOGOUT' });
    router.push('/login');
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value: AuthContextType = {
    ...state,
    loginUser,
    loginVendor,
    loginAdmin,
    registerUser,
    registerVendor,
    registerAdmin,
    verifyUserOtp,
    verifyVendorOtp,
    verifyAdminOtp,
    resetUserPassword,
    resetVendorPassword,
    resetAdminPassword,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
