"use client";

import { UserRoute } from "@/components/ProtectedRoute";
import ActiveSectionContextProvider from "../context/active-section-context";
import HeaderFooterWrapper from "@/app/components/Home/HeaderFooterWrapper";
import { ReactNode } from "react";

export default function UserRouteWrapper({ children }: { children: ReactNode }) {
  return (
    <UserRoute>
      <ActiveSectionContextProvider>
        <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
      </ActiveSectionContextProvider>
    </UserRoute>
  );
}
