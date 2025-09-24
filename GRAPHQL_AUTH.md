# GraphQL Authentication Integration

## Overview

This project now includes a complete GraphQL-integrated authentication system with support for multiple user types (User, Vendor, Admin) and various authentication flows.

## GraphQL Endpoint

**Production API**: `https://ev-orgs-server.vercel.app/graphql`

The endpoint is configured in `.env` and `.env.local` files via the `NEXT_PUBLIC_GRAPHQL_API` environment variable.

## Authentication Features

### 🔐 Login Methods
- **Email/Password Login**: Traditional login with email and password
- **OTP Login**: Passwordless login using email OTP verification
- **Multi-Role Support**: Separate login flows for Users, Vendors, and Admins

### 📧 Registration & Verification
- **User Registration**: Complete registration form with validation
- **Email Verification**: OTP-based email verification system
- **Form Validation**: Client-side validation with proper error handling

### 🔄 Password Management
- **Forgot Password**: Request password reset via email
- **Password Reset**: OTP-verified password reset flow
- **Change Password**: Authenticated users can change passwords

### 👤 Profile Management
- **Get Current User**: Fetch authenticated user data
- **Update Profile**: Update user profile information
- **Token Management**: Automatic JWT token handling

## Available Routes

### User Authentication
- `/auth/login` - User login (Password/OTP options)
- `/auth/register` - User registration
- `/auth/verify-otp` - OTP verification (registration/login/password reset)
- `/auth/forgot-password` - Request password reset
- `/auth/reset-password` - Complete password reset with OTP

### Vendor Authentication
- `/vendor/auth/login` - Vendor login

### Admin Authentication
- `/admin/auth/login` - Admin login

## GraphQL Operations

### Authentication Mutations
```graphql
# Login with email/password
mutation LoginUser($input: LoginInput!) {
  login(input: $input) {
    token
    user {
      id
      firstName
      lastName
      email
      # ... other fields
    }
  }
}

# Register new user
mutation RegisterUser($input: RegisterInput!) {
  register(input: $input)
}

# Verify registration OTP
mutation VerifyUserRegistration($input: VerifyOtpInput!) {
  verifyRegistration(input: $input) {
    token
    user { ... }
  }
}

# Request login OTP
mutation RequestLoginOtp($email: String!, $userType: UserType!) {
  requestLoginOtp(email: $email, userType: $userType)
}

# Verify login OTP
mutation VerifyLoginOtp($input: VerifyOtpInput!) {
  verifyLoginOtp(input: $input) {
    token
    user { ... }
  }
}

# Reset password request
mutation ResetUserPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input)
}

# Set new password with OTP
mutation SetNewUserPassword($input: SetNewPasswordInput!) {
  setNewPassword(input: $input)
}
```

### Profile Mutations
```graphql
# Update user profile
mutation UpdateUserProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    firstName
    lastName
    # ... other fields
  }
}

# Change password
mutation ChangeUserPassword($input: ChangePasswordInput!) {
  changePassword(input: $input)
}
```

### Queries
```graphql
# Get current authenticated user
query GetCurrentUser {
  me {
    id
    firstName
    lastName
    email
    # ... other fields
  }
}
```

## Technical Implementation

### Apollo Client Setup
- **Client Configuration**: Auto-configured with authentication headers
- **Token Management**: JWT tokens stored in localStorage and included in requests
- **Error Handling**: Comprehensive error handling with toast notifications

### React Hooks
- **`useGraphQLAuth`**: Main authentication hook with all auth operations
- **Type Safety**: Full TypeScript integration with GraphQL schema types
- **Loading States**: Proper loading states for all operations

### State Management
- **Zustand Integration**: Synced with existing Zustand auth store
- **Persistence**: Authentication state persists across page reloads
- **Real-time Updates**: Automatic UI updates on auth state changes

## Usage Examples

### Login with Password
```typescript
import { useGraphQLAuth } from '@/hooks/useGraphQLAuth';

const { login, isLoading } = useGraphQLAuth();

const handleLogin = async () => {
  try {
    await login({
      email: 'user@example.com',
      password: 'password123'
    });
    // Redirect to dashboard
  } catch (error) {
    // Error handling done automatically
  }
};
```

### Register New User
```typescript
const { register } = useGraphQLAuth();

const handleRegister = async () => {
  await register({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    gender: 'Male'
  });
  // Will redirect to OTP verification
};
```

### OTP Verification
```typescript
const { verifyRegistration } = useGraphQLAuth();

const handleOTPVerification = async (otp: string) => {
  await verifyRegistration(otp);
  // Will auto-login and redirect
};
```

## Environment Configuration

Create `.env.local` for local development:
```bash
NEXT_PUBLIC_GRAPHQL_API=https://ev-orgs-server.vercel.app/graphql
```

## Dependencies

- `@apollo/client` - GraphQL client
- `graphql` - GraphQL query language
- `zustand` - State management (existing)
- `sonner` - Toast notifications
- `@radix-ui/react-*` - UI components

## Testing

The application is configured to work with the live GraphQL API at `https://ev-orgs-server.vercel.app/graphql`.

### Test the Integration
1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/auth/login`
3. Try both password and OTP login methods
4. Test registration flow at `/auth/register`
5. Test password reset at `/auth/forgot-password`

## Security Features

- ✅ JWT token authentication
- ✅ Automatic token refresh handling
- ✅ Secure password validation
- ✅ OTP-based verification
- ✅ Email masking for privacy
- ✅ Form validation and sanitization
- ✅ HTTPS-only GraphQL endpoints

## Error Handling

- **Network Errors**: Automatic retry and user feedback
- **Validation Errors**: Form-level error display
- **Authentication Errors**: Clear messaging and redirect handling
- **Server Errors**: Graceful degradation with error reporting

The authentication system is now fully integrated with the GraphQL backend and ready for production use!
