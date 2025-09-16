"use client";

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

type UserType = 'User' | 'Vendor' | 'Admin';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedUserTypes: UserType[];
  redirectTo?: string;
}

export function ProtectedRoute({ children, allowedUserTypes, redirectTo }: ProtectedRouteProps) {
  const { isAuthenticated, userType, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to the appropriate login route based on user type
        let loginPath = '/auth/login'; // default to user login
        
        if (allowedUserTypes.length === 1) {
          switch (allowedUserTypes[0]) {
            case 'User':
              loginPath = '/auth/login';
              break;
            case 'Vendor':
              loginPath = '/vendor/auth/login';
              break;
            case 'Admin':
              loginPath = '/admin/auth/login';
              break;
          }
        }
        
        router.push(redirectTo || loginPath);
      } else if (userType && !allowedUserTypes.includes(userType)) {
        // User is authenticated but doesn't have the required role
        router.push('/unauthorized');
      }
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
