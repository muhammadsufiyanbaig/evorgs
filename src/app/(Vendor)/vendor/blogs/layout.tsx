import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, PlusCircle, FileText, BarChart3 } from "lucide-react"

export default function VendorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              
              <div className="hidden md:flex space-x-4">
                <Link href="/vendor/blogs">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
                <Link href="/vendor/blogs/my-blogs">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    My Blogs
                  </Button>
                </Link>
                <Link href="/vendor/blogs/create-blog">
                  <Button variant="ghost" className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Create Blog
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/blogs">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Home className="w-4 h-4" />
                  View All Blogs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {children}
    </div>
  )
}
