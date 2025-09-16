import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  userType: 'User' | 'Vendor' | 'Admin'
}

interface AuthState {
  user: User | null
  userType: 'User' | 'Vendor' | 'Admin' | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  token: string | null
  
  // Actions
  login: (email: string, password: string, userType: 'User' | 'Vendor' | 'Admin') => Promise<boolean>
  logout: () => void
  clearError: () => void
  setLoading: (loading: boolean) => void
}

// Test credentials
const TEST_CREDENTIALS = {
  'user@test.com': { userType: 'User' as const, password: 'password' },
  'vendor@test.com': { userType: 'Vendor' as const, password: 'password' },
  'admin@test.com': { userType: 'Admin' as const, password: 'password' },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      userType: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      token: null,

      setLoading: (loading: boolean) => {
        set({ isLoading: loading })
      },

      login: async (email: string, password: string, userType: 'User' | 'Vendor' | 'Admin') => {
        set({ isLoading: true, error: null })

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        const testUser = TEST_CREDENTIALS[email as keyof typeof TEST_CREDENTIALS]
        
        if (testUser && testUser.password === password && testUser.userType === userType) {
          const user: User = {
            id: `${userType.toLowerCase()}-1`,
            name: `Test ${userType}`,
            email,
            userType: testUser.userType
          }
          
          set({ 
            user, 
            userType: testUser.userType, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          })
          return true
        } else {
          set({ 
            isLoading: false, 
            error: 'Invalid credentials or user type' 
          })
          return false
        }
      },

      logout: () => {
        set({ 
          user: null, 
          userType: null, 
          isAuthenticated: false, 
          error: null 
        })
      },

      clearError: () => {
        set({ error: null })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        userType: state.userType, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)
