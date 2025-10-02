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
import { useAuth } from "@/hooks/useAuth"
import { useGraphQLAuth } from "@/hooks/useGraphQLAuth"
import { useEffect } from "react"
import { toast } from "sonner"

export default function VendorHeader() {
  const router = useRouter()
  
  // Get auth state from Zustand store (includes persisted vendorData)
  const { isAuthenticated, userType, vendorData } = useAuth()
  
  // Get vendor-specific data from GraphQL (fallback/refresh)
  const { currentVendor, logout: graphqlLogout } = useGraphQLAuth()

  const handleLogout = async () => {
    try {
      await graphqlLogout()
      toast.success("Logged out successfully")
      router.push('/vendor/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error("Logout failed. Please try again.")
    }
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

  // Use vendorData from Zustand first (immediate), fallback to GraphQL query
  const vendorSource = vendorData || currentVendor
  
  // Extract vendor info with fallback values
  const vendorName = vendorSource?.vendorName || 'Vendor User'
  const vendorEmail = vendorSource?.vendorEmail || 'Loading...'
  const vendorImage = vendorSource?.profileImage || null
  const vendorType = vendorSource?.vendorType || null
  const vendorStatus = vendorSource?.vendorStatus || null
  const vendorRating = vendorSource?.rating || null

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
                  <AvatarImage src={vendorImage || "/placeholder.svg?height=36&width=36"} alt={vendorName} />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    {getInitials(vendorName)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 shadow-xl" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <p className="text-sm font-semibold leading-none text-gray-900">
                    {vendorName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {vendorEmail}
                  </p>
                  {vendorType && (
                    <Badge variant="outline" className="w-fit text-xs capitalize">
                      {vendorType}
                    </Badge>
                  )}
                  {vendorStatus && (
                    <Badge 
                      variant={vendorStatus === 'Approved' ? 'default' : vendorStatus === 'Pending' ? 'secondary' : 'destructive'} 
                      className="w-fit text-xs"
                    >
                      {vendorStatus}
                    </Badge>
                  )}
                  {vendorRating && (
                    <div className="flex items-center gap-1 text-xs text-yellow-600">
                      <span>⭐</span>
                      <span>{vendorRating.toFixed(1)}</span>
                    </div>
                  )}
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