"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, MessageSquare, Settings, User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { Vendor } from "@/utils/interfaces"

export default function VendorHeader() {
  const router = useRouter()

  // TODO: Replace with actual auth context or state management
  const userType = 'Vendor' // Temporary hardcoded value
  const authUser = null // Temporary - replace with actual user data

  // Cast user to vendor if userType is Vendor
  const vendor = userType === 'Vendor' ? authUser as unknown as Vendor : null
  
  // Fallback vendor data when authUser is null but userType is Vendor (common after page refresh)
  const fallbackVendor = {
    vendorName: 'Vendor User',
    vendorEmail: 'Loading...',
    profileImage: null
  }
  
  // Use vendor data or fallback for display
  const displayVendor = vendor || (userType === 'Vendor' ? fallbackVendor : null)

  const handleLogout = () => {
    router.push('/login')
  }

  // Generate initials from vendor name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        {/* Mobile sidebar trigger */}
        <SidebarTrigger className="md:hidden" />

        {/* Brand Logo and Name */}
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Evorgs Logo" width={56} height={36} />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-bold text-gray-800">Evorgs Vendor</span>
            <span className="text-xs text-gray-500 hidden sm:block">
              Business Management Platform
            </span>
          </div>
        </div>

        <div className="flex-1" />

        {/* Right side icons */}
        <div className="flex items-center gap-3">
          {/* Messages */}
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-gray-100 transition"
            onClick={() => router.push("/vendor/messages")}
          >
            <MessageSquare className="h-5 w-5 text-gray-700" />
          </Button>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative hover:bg-gray-100 transition"
            onClick={() => router.push("/vendor/notification")}
          >
            <Bell className="h-5 w-5 text-gray-700" />
            <Badge className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-500 p-0 hover:bg-red-500" />
          </Button>

          {/* User Avatar & Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 hover:ring-2 hover:ring-orange-500 transition">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={displayVendor?.profileImage || "/placeholder.svg?height=36&width=36"} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    {displayVendor?.vendorName ? getInitials(displayVendor.vendorName) : 'V'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 shadow-xl" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none">
                    {displayVendor?.vendorName || 'Vendor'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {displayVendor?.vendorEmail || 'No email'}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/vendor/profile")}>
                <User className="mr-2 h-4 w-4 text-gray-600" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/vendor/profile/settings")}>
                <Settings className="mr-2 h-4 w-4 text-gray-600" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 hover:bg-red-100" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}