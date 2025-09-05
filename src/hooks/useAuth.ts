"use client";

import { useAuthStore } from '@/stores/authStore';

// Custom hook for easier access to auth state and methods
export const useAuth = () => {
  const store = useAuthStore();
  
  return {
    // State
    user: store.user,
    userType: store.userType,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    
    // Auth methods
    loginUser: store.loginUser,
    loginVendor: store.loginVendor,
    loginAdmin: store.loginAdmin,
    
    registerUser: store.registerUser,
    registerVendor: store.registerVendor,
    registerAdmin: store.registerAdmin,
    
    verifyUserOtp: store.verifyUserOtp,
    verifyVendorOtp: store.verifyVendorOtp,
    verifyAdminOtp: store.verifyAdminOtp,
    
    resetUserPassword: store.resetUserPassword,
    resetVendorPassword: store.resetVendorPassword,
    resetAdminPassword: store.resetAdminPassword,
    
    // Utility methods
    logout: store.logout,
    clearError: store.clearError,
    refreshUserData: store.refreshUserData,
  };
};

// Selector hooks for specific pieces of state (for performance optimization)
export const useAuthUser = () => useAuthStore((state) => state.user);
export const useAuthUserType = () => useAuthStore((state) => state.userType);
export const useAuthToken = () => useAuthStore((state) => state.token);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);

// Combined selectors
export const useAuthStatus = () => useAuthStore((state) => ({
  isAuthenticated: state.isAuthenticated,
  isLoading: state.isLoading,
  error: state.error,
}));

export const useAuthData = () => useAuthStore((state) => ({
  user: state.user,
  userType: state.userType,
  token: state.token,
}));
