"use client";

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import type { UserType } from '@/utils/graphql/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedUserTypes: UserType[];
  redirectTo?: string;
}

export function ProtectedRoute({ children, allowedUserTypes, redirectTo = '/login' }: ProtectedRouteProps) {
  const { isAuthenticated, userType, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (userType && !allowedUserTypes.includes(userType)) {
        // Redirect to appropriate dashboard based on user type
        switch (userType) {
          case 'User':
            router.push('/my-bookings');
            break;
          case 'Vendor':
            router.push('/vendor');
            break;
          case 'Admin':
            router.push('/admin');
            break;
          default:
            router.push('/login');
        }
      }
    }
  }, [isAuthenticated, userType, isLoading, allowedUserTypes, redirectTo, router]);

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
