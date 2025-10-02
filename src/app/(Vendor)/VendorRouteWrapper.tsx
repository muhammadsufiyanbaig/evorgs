"use client";

import { VendorRoute } from "@/components/ProtectedRoute";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function VendorRouteWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Check if current path is an auth route - these should be accessible without authentication
  const isAuthRoute = pathname.includes('/auth/');
  
  // For auth routes, render children without protection
  if (isAuthRoute) {
    return <>{children}</>;
  }
  
  // For protected vendor routes, apply VendorRoute protection
  return (
    <VendorRoute>
      {children}
    </VendorRoute>
  );
}
