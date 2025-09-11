"use client";

import { useEffect, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';

type UserType = 'User' | 'Vendor' | 'Admin';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedUserTypes: UserType[];
  redirectTo?: string;
}

export function ProtectedRoute({ children, allowedUserTypes, redirectTo = '/login' }: ProtectedRouteProps) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);

  useEffect(() => {
    // Add your authentication logic here
    // This is a placeholder - replace with your actual auth logic
    const checkAuth = async () => {
      try {
        // Example: check token, call API, etc.
        // const token = localStorage.getItem('token');
        // const response = await fetch('/api/auth/me');
        // const userData = await response.json();
        
        // For now, setting default values
        setIsAuthenticated(false);
        setUserType(null);
      } catch (error) {
        setIsAuthenticated(false);
        setUserType(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || (userType && !allowedUserTypes.includes(userType)))) {
      router.push(redirectTo);
    }
  }, [isLoading, isAuthenticated, userType, allowedUserTypes, router, redirectTo]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
      </div>
    );
  }

  // Show nothing while redirecting
  if (!isAuthenticated || (userType && !allowedUserTypes.includes(userType))) {
    return null;
  }

  return <>{children}</>;
}

// Specific route guards for each user type
export function UserRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedUserTypes={['User']}>
      {children}
    </ProtectedRoute>
  );
}

export function VendorRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedUserTypes={['Vendor']}>
      {children}
    </ProtectedRoute>
  );
}

export function AdminRoute({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute allowedUserTypes={['Admin']}>
      {children}
    </ProtectedRoute>
  );
}

// Multi-role route guard
export function MultiRoleRoute({ children, allowedRoles }: { children: ReactNode; allowedRoles: UserType[] }) {
  return (
    <ProtectedRoute allowedUserTypes={allowedRoles}>
      {children}
    </ProtectedRoute>
  );
}
