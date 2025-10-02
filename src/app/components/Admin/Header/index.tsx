"use client"

import { Bell, Search, Sun, Moon, User, Settings, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { useGraphQLAuth } from "@/hooks/useGraphQLAuth"
import { toast } from "sonner"

export function AdminHeader() {
  const router = useRouter()
  const [unreadCount] = useState(5) // This would come from getUnreadCount API
  
  // Get auth state from Zustand store (includes persisted adminData)
  const { adminData } = useAuth()
  
  // Get admin-specific data from GraphQL (fallback/refresh)
  const { currentAdmin, logout: graphqlLogout } = useGraphQLAuth()
  
  // Use multi-source strategy: Zustand (primary) + GraphQL (fallback)
  const admin = adminData || currentAdmin
  
  // Generate initials from admin name
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
  }
  
  // Extract admin info with fallback values
  const adminName = admin ? `${admin.firstName} ${admin.lastName}` : 'Admin User'
  const adminEmail = admin?.email || 'admin@example.com'
  const adminImage = admin?.profileImage || null
  const adminPhone = admin?.phone || null
  
  const handleLogout = async () => {
    try {
      await graphqlLogout()
      toast.success("Logged out successfully")
      router.push('/admin/auth/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error("Logout failed. Please try again.")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:supports-[backdrop-filter]:bg-gray-950/60">
      <div className="flex h-16 items-center px-4 gap-4">
        {/* Mobile sidebar trigger */}
        <SidebarTrigger className="lg:hidden" />

        {/* Logo and branding */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="EvOrgs Logo"
            width={500}
            height={40}
            className="w-20 h-8 object-contain"
          />
          <h1 className="hidden sm:block text-xl font-semibold text-gray-900 dark:text-white"> Admin</h1>
        </div>

        {/* Global search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search users, bookings, venues..."
              className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2">

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-9 w-9">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500 hover:bg-orange-600">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Button variant="ghost" size="sm" className="text-xs text-orange-600">
                  Mark all read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="flex flex-col items-start p-3">
                  <div className="font-medium">New booking request</div>
                  <div className="text-sm text-gray-500">Wedding venue booking for Dec 25</div>
                  <div className="text-xs text-gray-400 mt-1">2 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3">
                  <div className="font-medium">Vendor approval pending</div>
                  <div className="text-sm text-gray-500">New catering vendor registration</div>
                  <div className="text-xs text-gray-400 mt-1">1 hour ago</div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-9 px-2">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={adminImage || "/placeholder.svg?height=32&width=32"} alt={adminName} />
                  <AvatarFallback className="bg-orange-100 text-orange-700">
                    {admin ? getInitials(admin.firstName, admin.lastName) : 'AD'}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:block text-sm font-medium">{adminName}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{adminName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{adminEmail}</p>
                  {adminPhone && (
                    <p className="text-xs leading-none text-muted-foreground">{adminPhone}</p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push('/admin/profile')}>
                <User className="mr-2 h-4 w-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push('/admin/profile/change-password')}>
                <Settings className="mr-2 h-4 w-4" />
                Change Password
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
