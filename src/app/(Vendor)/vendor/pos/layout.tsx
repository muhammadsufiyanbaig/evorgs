import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/app/globals.css"
import { Sidebar } from "@/app/components/Vendor/pos/sidebar"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "POS System - Vendor Dashboard",
  description: "Point of Sale system for vendors",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="min-h-screen flex bg-gray-50">
            <Sidebar />
            <main className="w-full">{children}</main>
          </div>
      </body>
    </html>
  )
}
