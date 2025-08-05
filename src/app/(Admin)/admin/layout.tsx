import type { ReactNode } from "react";
import { Metadata } from "next";
import "@/app/globals.css";
import AdminWrapper from "@/app/components/Admin/Wrapper";

export const metadata: Metadata = {
  title: {
    template: "%s | Admin Dashboard",
    default: "Admin Dashboard - Evorgs",
  },
  description: "Secure admin dashboard for managing Evorgs platform. Access analytics, user management, and system controls.",
  keywords: ["admin", "dashboard", "management", "evorgs", "control panel"],
  robots: {
    index: false,
    follow: false,
    nosnippet: true,
  },
  openGraph: {
    title: "Admin Dashboard - Evorgs",
    description: "Secure admin dashboard for managing Evorgs platform",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Admin Dashboard - Evorgs",
    description: "Secure admin dashboard for managing Evorgs platform",
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {


  return (
    <html lang="en">
      <body>
        <AdminWrapper>
        {children}
        </AdminWrapper>
      </body>
    </html>
  );
}