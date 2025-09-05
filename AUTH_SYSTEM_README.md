# Unified Authentication System for Evorgs

This document describes the comprehensive authentication system that handles all three user types (User, Vendor, Admin) with reusable auth screens and role-based route protection.

## 📁 File Structure

```
src/
├── utils/
│   ├── graphql/
│   │   └── auth.ts                    # All GraphQL queries, mutations & types
│   ├── client/
│   │   └── index.ts                   # Apollo Client with auth headers
│   └── provider/
│       └── index.tsx                  # Main provider wrapper
├── contexts/
│   └── AuthContext.tsx               # Unified auth context & state management
├── components/
│   ├── auth/
│   │   ├── UnifiedLoginForm.tsx       # Single login form for all user types
│   │   ├── UnifiedRegistrationForm.tsx # Single registration form for all user types
│   │   └── OtpVerificationForm.tsx    # OTP verification component
│   └── ProtectedRoute.tsx             # Route protection components
└── app/
    ├── (Auth)/
    │   ├── login/page.tsx             # Main login page
    │   ├── register/page.tsx          # Main registration page
    │   └── otp-verification/page.tsx  # OTP verification page
    ├── (Vendor)/
    │   ├── layout.tsx                 # Vendor route protection
    │   └── vendor/
    │       ├── page.tsx               # Vendor dashboard
    │       ├── login/page.tsx         # Vendor-specific login
    │       └── register/page.tsx      # Vendor-specific registration
    └── (Admin)/
        └── admin/
            ├── layout.tsx             # Admin route protection
            ├── page.tsx               # Admin dashboard
            └── auth/
                ├── login/page.tsx     # Admin-specific login
                └── register/page.tsx  # Admin-specific registration
```

## 🔐 Authentication Flow

### User Types
- **User**: Regular customers
- **Vendor**: Service providers (FarmHouse, Venue, Catering, Photography)
- **Admin**: Platform administrators

### Authentication Methods

#### 1. Registration Flow
1. User selects their type (User/Vendor/Admin)
2. Fills appropriate form fields based on user type
3. Submits registration data
4. Receives OTP via email
5. Verifies OTP to complete registration
6. Automatically logged in and redirected to appropriate dashboard

#### 2. Login Flow
1. User selects their type
2. Enters email/password
3. System authenticates using appropriate GraphQL mutation
4. On success, user is redirected to their role-specific dashboard

#### 3. OTP Verification
- Supports registration and password reset purposes
- Works for all user types
- Unified verification component

## 🛡️ Route Protection

### Protected Routes
- `/vendor/*` - Only accessible to authenticated vendors
- `/admin/*` - Only accessible to authenticated admins
- `/dashboard/*` - Only accessible to authenticated users

### Protection Components
```typescript
// Single role protection
<VendorRoute>{children}</VendorRoute>
<AdminRoute>{children}</AdminRoute>
<UserRoute>{children}</UserRoute>

// Multi-role protection
<MultiRoleRoute allowedRoles={['Admin', 'Vendor']}>
  {children}
</MultiRoleRoute>

// Custom protection
<ProtectedRoute allowedUserTypes={['User']} redirectTo="/login">
  {children}
</ProtectedRoute>
```

## 🔄 State Management

The `AuthContext` provides:

```typescript
interface AuthContextType {
  // State
  user: CurrentUser | null;
  userType: UserType | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

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
```

## 📝 GraphQL Integration

### Queries
- `GET_CURRENT_USER` - Fetch current user data
- `GET_VENDOR_PROFILE` - Fetch current vendor data  
- `ADMIN_ME` - Fetch current admin data

### Mutations

#### Registration
- `REGISTER_USER` - User registration
- `VENDOR_REGISTER` - Vendor registration
- `ADMIN_SIGNUP` - Admin registration

#### Login
- `LOGIN_USER` - User login
- `VENDOR_LOGIN` - Vendor login
- `ADMIN_LOGIN` - Admin login

#### OTP Verification
- `VERIFY_USER_REGISTRATION` - User OTP verification
- `VERIFY_VENDOR_REGISTRATION` - Vendor OTP verification
- `ADMIN_VERIFY_OTP` - Admin OTP verification

#### Password Reset
- `RESET_USER_PASSWORD` - User password reset
- `RESET_VENDOR_PASSWORD` - Vendor password reset
- `ADMIN_RESET_PASSWORD` - Admin password reset

## 🎨 Component Reusability

### Unified Login Form
- Single component handles all user types
- Dynamic field rendering based on user type
- Proper email labeling (e.g., "Vendor Email" for vendors)

### Unified Registration Form  
- Conditional field rendering based on user type
- User-specific fields (dateOfBirth, gender)
- Vendor-specific fields (business type, description, website)
- Admin-specific fields (minimal personal info)

### OTP Verification
- Works for all user types
- Supports both registration and password reset flows
- Unified interface with role selection

## 🔧 Usage Examples

### Using Authentication in Components
```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, userType, isAuthenticated, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {userType === 'Vendor' ? user.vendorName : user.firstName}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

### Creating Protected Pages
```typescript
// pages/vendor/dashboard.tsx
export default function VendorDashboard() {
  return (
    <VendorRoute>
      <div>Vendor Dashboard Content</div>
    </VendorRoute>
  );
}
```

### Role-Specific Login Pages
```typescript
// Vendor login with pre-selected user type
export default function VendorLoginPage() {
  return <UnifiedLoginForm defaultUserType="Vendor" />;
}
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install @apollo/client graphql
   ```

2. **Set Environment Variables**
   ```env
   NEXT_PUBLIC_GRAPHQL_API=your_graphql_endpoint
   ```

3. **Wrap Your App**
   ```typescript
   // app/layout.tsx
   import Providers from '@/utils/provider';
   
   export default function RootLayout({ children }: { children: ReactNode }) {
     return (
       <html>
         <body>
           <Providers>
             {children}
           </Providers>
         </body>
       </html>
     );
   }
   ```

4. **Use Authentication**
   - Navigate to `/login` for general login
   - Navigate to `/vendor/login` for vendor-specific login
   - Navigate to `/admin/auth/login` for admin-specific login

## 🔒 Security Features

- **Token-based authentication** with automatic header injection
- **Role-based access control** with route protection
- **Automatic redirects** based on user roles
- **Secure token storage** in localStorage
- **Error handling** with user-friendly messages
- **Loading states** for better UX

## 📱 Mobile Responsive

All authentication forms are fully responsive and work seamlessly on:
- Desktop screens
- Tablets
- Mobile devices

## 🎯 Benefits

1. **Code Reusability**: Single components handle all user types
2. **Consistent UX**: Same interface across all auth flows
3. **Type Safety**: Full TypeScript support with proper types
4. **Scalability**: Easy to add new user types or auth methods
5. **Maintainability**: Centralized auth logic and state management
6. **Security**: Robust protection and error handling

This unified authentication system provides a solid foundation for your multi-role application while maintaining clean, reusable code and excellent user experience.
