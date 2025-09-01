"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { AdminHeader } from "@/app/components/Admin/Header"
import { AdminSidebar } from "@/app/components/Admin/Sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

const AdminWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const hideHeaderFooter = [
    "/admin/auth/login",
    "/admin/auth/verify-otp",
    "/admin/auth/forget-password",
    "/admin/auth/reset-password",
  ].includes(pathname)

  if (hideHeaderFooter) {
    return <div className="min-h-screen w-full">{children}</div>
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminHeader />
        <main className="flex-1 space-y-4 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminWrapper
