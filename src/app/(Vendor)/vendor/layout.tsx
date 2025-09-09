import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import  VendorSidebar  from "@/app/components/Vendor/VendorSidebar"
import  VendorHeader  from "@/app/components/Vendor/VendorHeader"

export default function VendorMainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
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
  )
}
