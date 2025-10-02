"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import VendorSidebar from "@/app/components/Vendor/VendorSidebar"
import VendorHeader from "@/app/components/Vendor/VendorHeader"
import { ProtectedRoute } from "@/components/ProtectedRoute"

export default function VendorMainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Check if current path is an auth route
  const isAuthRoute = pathname.includes('/auth/')
  
  // For auth routes, render children without sidebar and header (no protection needed)
  if (isAuthRoute) {
    return (
      <div className="min-h-screen w-full">
        {children}
      </div>
    )
  }
  
  // For normal vendor routes, wrap with ProtectedRoute and render with sidebar and header
  return (
    <ProtectedRoute allowedUserTypes={['Vendor']}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <div className="flex flex-1 flex-col">
            <VendorHeader />
            <div className="flex">
              <VendorSidebar />
              <main className="flex-1 p-4 md:p-6 lg:p-8 ml-20">{children}</main>
            </div>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  )
}
