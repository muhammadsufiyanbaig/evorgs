"use client";

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export function AuthInitializer() {
  const { initializeAuth } = useAuth();

  useEffect(() => {
    // Initialize auth state from localStorage on app startup
    initializeAuth();
  }, [initializeAuth]);

  return null; // This component doesn't render anything
}
