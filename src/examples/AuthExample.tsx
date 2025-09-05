import { useAuth, useAuthUser, useIsAuthenticated } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/authStore';

// Example component showing different ways to use the auth store
export function ExampleAuthUsage() {
  // Option 1: Use the main useAuth hook (gets all auth state and methods)
  const { user, userType, isAuthenticated, logout, loginUser } = useAuth();
  
  // Option 2: Use specific selector hooks for better performance (only re-renders when specific data changes)
  const authUser = useAuthUser();
  const isAuth = useIsAuthenticated();
  
  const handleLogin = async () => {
    try {
      await loginUser({ email: 'test@example.com', password: 'password' });
    } catch (error) {
      // Error is automatically handled by the store
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        <p>Not logged in</p>
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <p>User Type: {userType}</p>
      <p>User Name: {userType === 'Vendor' ? (user as any)?.vendorName : (user as any)?.firstName}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

// Example of accessing auth state outside of React components
export function checkAuthStatus() {
  const { isAuthenticated, userType } = useAuthStore.getState();
  
  if (!isAuthenticated) {
    // Redirect to login
    window.location.href = '/login';
    return false;
  }
  
  return { isAuthenticated, userType };
}
