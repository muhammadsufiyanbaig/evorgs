"use client";

import { UserRoute } from "@/components/ProtectedRoute";
import ActiveSectionContextProvider from "../context/active-section-context";
import HeaderFooterWrapper from "@/app/components/Home/HeaderFooterWrapper";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function UserRouteWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  // Check if current path is an auth route - these should be accessible without authentication
  const isAuthRoute = pathname.includes('/auth/');
  
  // For auth routes, render children without protection and wrapper
  if (isAuthRoute) {
    return <>{children}</>;
  }
  
  // For protected user routes, apply UserRoute protection and wrapper
  return (
    <UserRoute>
      <ActiveSectionContextProvider>
        <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
      </ActiveSectionContextProvider>
    </UserRoute>
  );
}