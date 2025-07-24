import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"
import  VendorSidebar  from "@/app/components/Vendor/VendorSidebar"
import  VendorHeader  from "@/app/components/Vendor/VendorHeader"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Evorgs Vendor Dashboard",
  description: "Business management platform",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
      </body>
    </html>
  )
}
