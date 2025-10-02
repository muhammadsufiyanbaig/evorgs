import type { ReactNode } from "react";
import type { Metadata } from "next";
import VendorRouteWrapper from "./VendorRouteWrapper";

export const metadata: Metadata = {
  title: "Evorgs - Vendor Dashboard",
  description: "Manage your services, bookings, and business on Evorgs",
};

interface VendorLayoutProps {
  children: ReactNode;
}

export default function VendorLayout({ children }: VendorLayoutProps) {
  return (
    <VendorRouteWrapper>
      {children}
    </VendorRouteWrapper>
  );
}
