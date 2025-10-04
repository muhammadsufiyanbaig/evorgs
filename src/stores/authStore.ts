import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  userType: 'User' | 'Vendor' | 'Admin'
}

export interface VendorData {
  id: string
  vendorName: string
  vendorEmail: string
  vendorPhone?: string
  vendorAddress?: string
  vendorProfileDescription?: string
  vendorWebsite?: string
  vendorSocialLinks?: string[]
  profileImage?: string
  bannerImage?: string
  vendorType: string
  vendorStatus: string
  rating?: number
  reviewCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface AdminData {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  profileImage?: string
  createdAt?: string
  updatedAt?: string
}

interface AuthState {
  user: User | null
  vendorData: VendorData | null
  adminData: AdminData | null
  userType: 'User' | 'Vendor' | 'Admin' | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  token: string | null
  
  // Actions
  login: (email: string, password: string, userType: 'User' | 'Vendor' | 'Admin') => Promise<boolean>
  setAuthenticatedUser: (user: Partial<User>, token: string, userType: 'User' | 'Vendor' | 'Admin', vendorData?: VendorData, adminData?: AdminData) => void
  logout: () => void
  clearError: () => void
  setLoading: (loading: boolean) => void
  initializeAuth: () => void
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
      vendorData: null,
      adminData: null,
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

      setAuthenticatedUser: (userData: Partial<User>, token: string, userType: 'User' | 'Vendor' | 'Admin', vendorData?: VendorData, adminData?: AdminData) => {
        const user: User = {
          id: userData.id || `${userType.toLowerCase()}-${Date.now()}`,
          name: userData.name || userData.email || 'Unknown User',
          email: userData.email || 'unknown@example.com',
          userType
        }
        
        console.log('💾 setAuthenticatedUser - Storing in Zustand:');
        console.log('  - User:', user);
        console.log('  - Token:', token);
        console.log('  - UserType:', userType);
        console.log('  - VendorData:', vendorData);
        console.log('  - AdminData:', adminData);
        
        set({ 
          user,
          vendorData: vendorData || null,
          adminData: adminData || null,
          userType,
          token,
          isAuthenticated: true,
          isLoading: false,
          error: null 
        })
        
        console.log('✅ Zustand state updated');
      },

      logout: () => {
        console.log('🚪 Logging out - Clearing Zustand state');
        set({ 
          user: null,
          vendorData: null,
          adminData: null,
          userType: null, 
          isAuthenticated: false,
          token: null,
          error: null 
        })
      },

      clearError: () => {
        set({ error: null })
      },

      initializeAuth: () => {
        // Auth state is automatically restored by Zustand persist middleware
        // This function is called on app startup to ensure state is initialized
        const state = get()
        
        if (state.isAuthenticated && state.token) {
          console.log('🔑 Auth initialized - User authenticated as:', state.userType)
          console.log('📝 Token present:', state.token ? 'Yes' : 'No')
        } else {
          console.log('⚠️ Auth initialized - No active session')
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user,
        vendorData: state.vendorData,
        adminData: state.adminData,
        userType: state.userType, 
        isAuthenticated: state.isAuthenticated,
        token: state.token
      }),
    }
  )
)
