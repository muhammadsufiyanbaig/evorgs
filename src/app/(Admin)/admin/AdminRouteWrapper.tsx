"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import AdminWrapper from "@/app/components/Admin/Wrapper";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function AdminRouteWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Check if current path is an auth route - these should be accessible without authentication
  const isAuthRoute = pathname.includes('/auth/');
  
  // For auth routes, render children without protection and wrapper
  if (isAuthRoute) {
    return <>{children}</>;
  }
  
  // For protected admin routes, apply AdminRoute protection and wrapper
  return (
    <AdminRoute>
      <AdminWrapper>
        {children}
      </AdminWrapper>
    </AdminRoute>
  );
}
