import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"

import "@/app/globals.css"
import { AdminSidebar } from "@/app/components/Admin/Sidebar"
import { AdminHeader } from "@/app/components/Admin/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
          <SidebarProvider defaultOpen={true}>
            <div className="flex min-h-screen w-full">
              <AdminSidebar />
              <div className="flex flex-1 flex-col">
                <AdminHeader />
                <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900">{children}</main>
              </div>
            </div>
          </SidebarProvider>
      </body>
    </html>
  )
}
