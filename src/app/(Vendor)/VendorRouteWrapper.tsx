"use client";

import { VendorRoute } from "@/components/ProtectedRoute";
import { ReactNode } from "react";

export default function VendorRouteWrapper({ children }: { children: ReactNode }) {
  return (
    <VendorRoute>
      {children}
    </VendorRoute>
  );
}
