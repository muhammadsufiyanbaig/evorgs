"use client";

import { AdminRoute } from "@/components/ProtectedRoute";
import AdminWrapper from "@/app/components/Admin/Wrapper";
import { ReactNode } from "react";

export default function AdminRouteWrapper({ children }: { children: ReactNode }) {
  return (
    <AdminRoute>
      <AdminWrapper>
        {children}
      </AdminWrapper>
    </AdminRoute>
  );
}
