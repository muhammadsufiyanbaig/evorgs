import { useAuthStore  } from '@/stores/authStore'

export const useAuth = () => {
  const store = useAuthStore()
  
  return {
    user: store.user,
    vendorData: store.vendorData,
    adminData: store.adminData,
    userType: store.userType,
    token: store.token,
    isAuthenticated: store.isAuthenticated,
    isLoading: store.isLoading,
    error: store.error,
    login: store.login,
    setAuthenticatedUser: store.setAuthenticatedUser,
    logout: store.logout,
    clearError: store.clearError,
    setLoading: store.setLoading,
    initializeAuth: store.initializeAuth,
  }
}

// Additional convenience hooks
export const useAuthUser = () => {
  return useAuthStore((state) => state.user)
}

export const useAuthUserType = () => {
  return useAuthStore((state) => state.userType)
}

export const useAuthLoading = () => {
  return useAuthStore((state) => state.isLoading)
}

export const useAuthError = () => {
  return useAuthStore((state) => state.error)
}

export const useAuthToken = () => {
  return useAuthStore((state) => state.token)
}

export const useIsAuthenticated = () => {
  return useAuthStore((state) => state.isAuthenticated)
}
