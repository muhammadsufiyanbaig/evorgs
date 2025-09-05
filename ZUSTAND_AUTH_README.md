# Zustand-Based Authentication System for Evorgs

This document describes the updated authentication system using Zustand for state management instead of React Context. The system handles all three user types (User, Vendor, Admin) with reusable auth screens and role-based route protection.

## 🔄 Migration from Context to Zustand

### Why Zustand?
- **Better Performance**: Selective subscriptions prevent unnecessary re-renders
- **Simpler API**: No providers needed, direct store access
- **TypeScript Support**: Excellent TypeScript integration
- **Persistence**: Built-in local storage persistence
- **DevTools**: Built-in devtools support
- **Smaller Bundle**: Lighter than Context + useReducer patterns

## 📁 Updated File Structure

```
src/
├── stores/
│   └── authStore.ts                   # Main Zustand auth store
├── hooks/
│   └── useAuth.ts                     # Custom hooks for auth access
├── utils/
│   ├── graphql/
│   │   └── auth.ts                    # All GraphQL queries, mutations & types
│   ├── client/
│   │   └── index.ts                   # Apollo Client with auth headers
│   └── provider/
│       └── index.tsx                  # Simplified provider (Apollo only)
├── components/
│   ├── auth/
│   │   ├── UnifiedLoginForm.tsx       # Updated to use Zustand
│   │   ├── UnifiedRegistrationForm.tsx # Updated to use Zustand
│   │   └── OtpVerificationForm.tsx    # Updated to use Zustand
│   └── ProtectedRoute.tsx             # Updated route protection
└── examples/
    └── AuthExample.tsx                # Usage examples
```

## 🏪 Zustand Store Structure

### Store Definition (`/src/stores/authStore.ts`)

```typescript
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
  
  // ... more methods
}
```

### Key Features
- **Immer Integration**: Immutable state updates with mutable syntax
- **Persistence**: Automatic localStorage persistence for token and userType
- **Automatic Initialization**: Store initializes on app load
- **Error Handling**: Built-in error management
- **Navigation**: Automatic redirects after auth actions

## 🎣 Custom Hooks (`/src/hooks/useAuth.ts`)

### Main Hook
```typescript
const useAuth = () => {
  // Returns all auth state and methods
  // Use for components that need multiple auth features
}
```

### Selector Hooks (Performance Optimized)
```typescript
const useAuthUser = () => useAuthStore((state) => state.user);
const useAuthUserType = () => useAuthStore((state) => state.userType);
const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
const useAuthLoading = () => useAuthStore((state) => state.isLoading);
const useAuthError = () => useAuthStore((state) => state.error);
```

### Combined Selectors
```typescript
const useAuthStatus = () => useAuthStore((state) => ({
  isAuthenticated: state.isAuthenticated,
  isLoading: state.isLoading,
  error: state.error,
}));

const useAuthData = () => useAuthStore((state) => ({
  user: state.user,
  userType: state.userType,
  token: state.token,
}));
```

## 🎯 Usage Examples

### Basic Component Usage
```typescript
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { user, userType, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginButton />;
  }
  
  return (
    <div>
      <h1>Welcome, {userType === 'Vendor' ? user.vendorName : user.firstName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Performance-Optimized Usage
```typescript
import { useAuthUser, useIsAuthenticated } from '@/hooks/useAuth';

function UserProfile() {
  // Only re-renders when user data changes
  const user = useAuthUser();
  
  return <div>Profile: {user?.firstName}</div>;
}

function LoginStatus() {
  // Only re-renders when auth status changes
  const isAuthenticated = useIsAuthenticated();
  
  return <div>{isAuthenticated ? 'Logged In' : 'Logged Out'}</div>;
}
```

### Form Usage
```typescript
import { useAuth } from '@/hooks/useAuth';

function LoginForm() {
  const { loginUser, isLoading, error, clearError } = useAuth();
  
  const handleSubmit = async (formData) => {
    try {
      await loginUser(formData);
      // Automatic redirect handled by store
    } catch (err) {
      // Error automatically set in store
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* form fields */}
      <button disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Accessing Store Outside Components
```typescript
import { useAuthStore } from '@/stores/authStore';

// In utility functions, API calls, etc.
function apiCall() {
  const { token, isAuthenticated } = useAuthStore.getState();
  
  if (!isAuthenticated) {
    window.location.href = '/login';
    return;
  }
  
  // Make authenticated API call
  return fetch('/api/data', {
    headers: { Authorization: `Bearer ${token}` }
  });
}

// Subscribe to store changes outside components
const unsubscribe = useAuthStore.subscribe(
  (state) => state.isAuthenticated,
  (isAuthenticated) => {
    if (!isAuthenticated) {
      // User logged out, clean up
    }
  }
);
```

## 🛡️ Route Protection (Unchanged API)

The route protection components work exactly the same:

```typescript
// Single role protection
<VendorRoute>{children}</VendorRoute>
<AdminRoute>{children}</AdminRoute>
<UserRoute>{children}</UserRoute>

// Multi-role protection
<MultiRoleRoute allowedRoles={['Admin', 'Vendor']}>
  {children}
</MultiRoleRoute>
```

## 🔧 Store Methods

### Authentication
```typescript
const { loginUser, loginVendor, loginAdmin } = useAuth();

// User login
await loginUser({ email: 'user@example.com', password: 'password' });

// Vendor login
await loginVendor({ vendorEmail: 'vendor@example.com', password: 'password' });

// Admin login
await loginAdmin({ email: 'admin@example.com', password: 'password' });
```

### Registration
```typescript
const { registerUser, registerVendor, registerAdmin } = useAuth();

// User registration
await registerUser({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  password: 'password',
  gender: 'Male'
});

// Vendor registration
await registerVendor({
  vendorName: 'My Business',
  vendorEmail: 'business@example.com',
  password: 'password',
  vendorType: 'Catering'
});
```

### OTP Verification
```typescript
const { verifyUserOtp, verifyVendorOtp, verifyAdminOtp } = useAuth();

await verifyUserOtp({
  email: 'user@example.com',
  otp: '123456',
  purpose: 'registration',
  userType: 'User'
});
```

### Utility Methods
```typescript
const { logout, clearError, refreshUserData } = useAuth();

// Logout user
logout();

// Clear current error
clearError();

// Refresh user data from server
await refreshUserData();
```

## 📱 Persistence

The store automatically persists:
- `token`: Authentication token
- `userType`: Current user type

On app restart:
1. Store loads persisted data
2. Automatically fetches fresh user data
3. Sets loading to false when complete

## 🎛️ DevTools Support

Zustand automatically works with Redux DevTools:

```typescript
// In development, you'll see:
// - Action names (loginUser, logout, setError, etc.)
// - State changes
// - Time travel debugging
```

## ⚡ Performance Benefits

### Before (Context)
```typescript
// Every auth state change re-renders all consumers
const AuthContext = createContext();

function MyComponent() {
  const { user, isAuthenticated, error, isLoading } = useContext(AuthContext);
  // Re-renders when ANY auth state changes
}
```

### After (Zustand)
```typescript
// Only re-renders when selected state changes
function MyComponent() {
  const user = useAuthUser(); // Only re-renders when user changes
  const isAuthenticated = useIsAuthenticated(); // Only re-renders when auth status changes
}
```

## 🔄 Migration Guide

### 1. Replace Context Hook Calls
```typescript
// Before
import { useAuth } from '@/contexts/AuthContext';

// After  
import { useAuth } from '@/hooks/useAuth';
// API remains exactly the same!
```

### 2. Remove Provider (Already Done)
```typescript
// Before
<AuthProvider>
  <App />
</AuthProvider>

// After (automatic initialization)
<App />
```

### 3. Optional: Use Selector Hooks for Performance
```typescript
// Before
const { user } = useAuth(); // Gets all auth state

// After (performance optimized)
const user = useAuthUser(); // Only subscribes to user changes
```

## 🚀 Getting Started

1. **No Additional Setup Required**: Store initializes automatically
2. **Use Auth Hooks**: Import and use hooks in components
3. **Optional Optimization**: Use selector hooks for better performance

```typescript
// Basic usage - works immediately
import { useAuth } from '@/hooks/useAuth';

function MyComponent() {
  const { isAuthenticated, user, logout } = useAuth();
  
  if (!isAuthenticated) return <LoginForm />;
  
  return (
    <div>
      <h1>Welcome {user?.firstName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

## 🎁 Benefits Summary

1. **Better Performance**: Selective subscriptions, no unnecessary re-renders
2. **Simpler Code**: No providers, direct store access anywhere
3. **Type Safety**: Full TypeScript support maintained
4. **Persistence**: Automatic localStorage integration
5. **DevTools**: Built-in debugging support
6. **Same API**: All existing components continue to work
7. **Smaller Bundle**: Zustand is lighter than Context patterns
8. **Better Testing**: Easier to test with direct store access

The migration maintains the exact same API for components while providing better performance and developer experience under the hood!
