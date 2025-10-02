"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Settings, LogOut, Bell, Heart, Calendar, Store, Shield, BarChart3, Users, MessageSquare, CreditCard, Briefcase } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/useAuth"
import { useGraphQLAuth } from "@/hooks/useGraphQLAuth"
import { useNotifications } from "@/hooks/useNotifications"
import { NotificationDropdown } from "@/components/ui/notification-dropdown"
import type { User as UserType } from "@/stores/authStore"

export default function Header() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Safe localStorage check for SSR
  const hasAuthToken = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  
  // Use both hooks - GraphQL for data, Zustand for state
  const { user: zustandUser, userType, isAuthenticated } = useAuth()
  const { currentUser, logout: graphqlLogout, isLoading } = useGraphQLAuth()
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications()

  // Use GraphQL user data if available, fallback to Zustand user
  const user = currentUser || zustandUser

  const handleLogin = () => {
    router.push('/auth/login')
    setMenuOpen(false)
  }

  const handleRegister = () => {
    router.push('/auth/register')
    setMenuOpen(false)
  }

  const handleLogout = async () => {
    try {
      await graphqlLogout()
      setMenuOpen(false)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
      // Fallback logout if GraphQL fails
      setMenuOpen(false)
      router.push('/')
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Get user display information based on user type and data source
  const getUserDisplayInfo = () => {
    if (!user) return null

    // Handle GraphQL user data structure
    if (currentUser) {
      return {
        name: `${currentUser.firstName} ${currentUser.lastName}`.trim() || currentUser.email,
        email: currentUser.email,
        avatar: currentUser.profileImage || "/placeholder.svg",
        initials: `${currentUser.firstName?.[0] || ''}${currentUser.lastName?.[0] || ''}`.toUpperCase() || currentUser.email[0].toUpperCase(),
        phone: currentUser.phone,
        isVerified: currentUser.isVerified,
        id: currentUser.id
      }
    }

    // Handle Zustand user data structure (fallback)
    if (zustandUser) {
      return {
        name: zustandUser.name || zustandUser.email,
        email: zustandUser.email,
        avatar: "/placeholder.svg",
        initials: zustandUser.name ? zustandUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : zustandUser.email[0].toUpperCase(),
        id: zustandUser.id
      }
    }

    return null
  }

  const userDisplayInfo = getUserDisplayInfo()

  // Get dashboard link based on user type
  const getDashboardLink = () => {
    switch (userType) {
      case 'User':
        return '/profile'
      case 'Vendor':
        return '/vendor'
      case 'Admin':
        return '/admin'
      default:
        return '/'
    }
  }

  // Get navigation items based on user type
  const getNavigationItems = () => {
    switch (userType) {
      case 'User':
        return [
          { href: '/profile', label: 'My Profile', icon: User },
          { href: '/my-bookings', label: 'My Bookings', icon: Calendar },
          { href: '/favourite', label: 'Favorites', icon: Heart },
          { href: '/messages', label: 'Messages', icon: MessageSquare },
          { href: '/vouchers', label: 'Vouchers', icon: CreditCard },
          { href: '/notifications', label: 'Notifications', icon: Bell },
          { href: '/support', label: 'Support', icon: Settings },
        ]
      case 'Vendor':
        return [
          { href: '/vendor', label: 'Dashboard', icon: BarChart3 },
          { href: '/vendor/profile', label: 'Profile', icon: User },
          { href: '/vendor/services', label: 'My Services', icon: Store },
          { href: '/vendor/services/create', label: 'Add Service', icon: Briefcase },
          { href: '/vendor/bookings', label: 'Bookings', icon: Calendar },
          { href: '/vendor/messages', label: 'Messages', icon: MessageSquare },
          { href: '/vendor/analytics', label: 'Analytics', icon: BarChart3 },
          { href: '/vendor/profile/settings', label: 'Settings', icon: Settings },
        ]
      case 'Admin':
        return [
          { href: '/admin', label: 'Dashboard', icon: BarChart3 },
          { href: '/admin/users', label: 'Users', icon: Users },
          { href: '/admin/vendors', label: 'Vendors', icon: Store },
          { href: '/admin/services', label: 'Services', icon: Briefcase },
          { href: '/admin/bookings', label: 'Bookings', icon: Calendar },
          { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
          { href: '/admin/settings', label: 'Settings', icon: Settings },
        ]
      default:
        return []
    }
  }

  const navigationItems = getNavigationItems()

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <Image
                    width={40}
                    height={40}
                    src="/logo.svg"
                    className="h-10 w-24 transition-transform group-hover:scale-105"
                    alt="Evorgs™"
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/services"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group"
              >
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/blogs"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group"
              >
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-orange-500 font-medium transition-colors duration-200 relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {(isAuthenticated || currentUser || hasAuthToken) ? (
                <>
                  {/* Notifications */}
                  <NotificationDropdown
                    notifications={notifications}
                    unreadCount={unreadCount}
                    onMarkAsRead={markAsRead}
                    onMarkAllAsRead={markAllAsRead}
                    onNotificationClick={(notification) => {
                      if (notification.actionUrl) {
                        router.push(notification.actionUrl);
                      } else {
                        router.push(userType === 'User' ? '/notifications' : `/${userType?.toLowerCase()}/notifications`);
                      }
                    }}
                  />

                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-orange-50">
                        <Avatar className="h-10 w-10 ring-2 ring-orange-200 hover:ring-orange-300 transition-all">
                          <AvatarImage src={userDisplayInfo?.avatar || "/placeholder.svg"} alt={userDisplayInfo?.name || "User"} />
                          <AvatarFallback className="bg-orange-500 text-white">
                            {userDisplayInfo?.initials || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium leading-none">{userDisplayInfo?.name || "User"}</p>
                            {userDisplayInfo?.isVerified && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                                Verified
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {userType}
                            </Badge>
                          </div>
                          <p className="text-xs leading-none text-muted-foreground">{userDisplayInfo?.email || "user@example.com"}</p>
                          {userDisplayInfo?.phone && (
                            <p className="text-xs leading-none text-muted-foreground">{userDisplayInfo.phone}</p>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      {/* Quick Actions */}
                      <DropdownMenuItem 
                        className="cursor-pointer" 
                        onClick={() => router.push(getDashboardLink())}
                      >
                        <BarChart3 className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      {/* Navigation Items */}
                      {navigationItems.slice(0, 4).map((item) => (
                        <DropdownMenuItem 
                          key={item.href}
                          className="cursor-pointer" 
                          onClick={() => router.push(item.href)}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.label}</span>
                        </DropdownMenuItem>
                      ))}
                      
                      {navigationItems.length > 4 && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="cursor-pointer text-gray-500" 
                            onClick={() => router.push(getDashboardLink())}
                          >
                            <Settings className="mr-2 h-4 w-4" />
                            <span>View All Options</span>
                          </DropdownMenuItem>
                        </>
                      )}
                      
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600" 
                        onClick={handleLogout}
                        disabled={isLoading}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={handleLogin}
                    className="text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-full transition-all duration-200"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={handleRegister}
                    className="bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                onClick={toggleMenu}
                variant="ghost"
                size="icon"
                className="hover:bg-orange-50 rounded-full transition-colors"
              >
                {menuOpen ? <X className="h-6 w-6 text-orange-500" /> : <Menu className="h-6 w-6 text-orange-500" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden" onClick={closeMenu} />}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <Image width={32} height={32} src="/logo.svg" className="h-8 w-8" alt="Evorgs™" />
              <span className="ml-2 text-lg font-bold text-orange-500">Evorgs™</span>
            </div>
            <Button onClick={closeMenu} variant="ghost" size="icon" className="hover:bg-gray-100 rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* User Section (if logged in) */}
          {(isAuthenticated || currentUser || hasAuthToken) && (
            <div className="p-4 border-b bg-orange-50">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-12 w-12 ring-2 ring-orange-200">
                    <AvatarImage src={userDisplayInfo?.avatar || "/placeholder.svg"} alt={userDisplayInfo?.name || "User"} />
                    <AvatarFallback className="bg-orange-500 text-white">
                      {userDisplayInfo?.initials || "U"}
                    </AvatarFallback>
                  </Avatar>
                  {userDisplayInfo?.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                      <Shield className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-gray-900">{userDisplayInfo?.name || "User"}</p>
                    <Badge variant="outline" className="text-xs">
                      {userType}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{userDisplayInfo?.email || "user@example.com"}</p>
                  {userDisplayInfo?.phone && (
                    <p className="text-xs text-gray-400">{userDisplayInfo.phone}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center px-3 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/services"
              onClick={closeMenu}
              className="flex items-center px-3 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              href="/blogs"
              onClick={closeMenu}
              className="flex items-center px-3 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors font-medium"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              onClick={closeMenu}
              className="flex items-center px-3 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors font-medium"
            >
              Contact
            </Link>

            {(isAuthenticated || currentUser || hasAuthToken) && (
              <>
                <div className="border-t my-4"></div>
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center px-3 py-3 text-gray-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors font-medium"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Mobile Actions */}
          <div className="p-4 border-t space-y-3">
            {(isAuthenticated || currentUser || hasAuthToken) ? (
              <>
                <Button
                  onClick={() => {
                    closeMenu()
                    router.push(getDashboardLink())
                  }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg mb-2"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 rounded-full bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {isLoading ? 'Signing out...' : 'Sign out'}
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleLogin}
                  variant="outline"
                  className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 rounded-full bg-transparent"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={handleRegister}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-16"></div>
    </>
  )
}
