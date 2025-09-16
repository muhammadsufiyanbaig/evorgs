"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Settings, LogOut, Bell, Heart, Calendar, Store } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
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
import type { User as UserType } from "@/stores/authStore"

export default function Header() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, userType, isAuthenticated, logout } = useAuth()

  const handleLogin = () => {
    router.push('/auth/login')
    setMenuOpen(false)
  }

  const handleRegister = () => {
    router.push('/auth/register')
    setMenuOpen(false)
  }

  const handleLogout = async () => {
    logout()
    setMenuOpen(false)
    router.push('/')
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  // Get user display information based on user type
  const getUserDisplayInfo = () => {
    if (!user) return null

    switch (userType) {
      case 'User':
        const userData = user as UserType
        return {
          name: userData.name,
          email: userData.email,
          avatar: "/placeholder.svg",
          initials: userData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        }
      case 'Vendor':
        const vendorData = user as UserType
        return {
          name: vendorData.name,
          email: vendorData.email,
          avatar: "/placeholder.svg",
          initials: vendorData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        }
      default:
        return null
    }
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
          { href: '/profile', label: 'Profile', icon: User },
          { href: '/profile/my-bookings', label: 'My Bookings', icon: Calendar },
          { href: '/favourite', label: 'Favorites', icon: Heart },
          { href: '/profile/settings', label: 'Settings', icon: Settings },
        ]
      case 'Vendor':
        return [
          { href: '/vendor/profile', label: 'Profile', icon: User },
          { href: '/vendor/bookings', label: 'Bookings', icon: Calendar },
          { href: '/vendor/services', label: 'Services', icon: Store },
          { href: '/vendor/profile/settings', label: 'Settings', icon: Settings },
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
              {isAuthenticated ? (
                <>
                  {/* Notifications */}
                  <Button variant="ghost" size="icon" className="relative hover:bg-orange-50 rounded-full">
                    <Bell className="h-5 w-5 text-gray-600" />
                    {user && (user as any)?.notifications && (user as any).notifications > 0 && (
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-orange-500 text-xs">
                        {(user as any).notifications}
                      </Badge>
                    )}
                  </Button>

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
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{userDisplayInfo?.name || "User"}</p>
                          <p className="text-xs leading-none text-muted-foreground">{userDisplayInfo?.email || "user@example.com"}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {navigationItems.map((item) => (
                        <DropdownMenuItem 
                          key={item.href}
                          className="cursor-pointer" 
                          onClick={() => router.push(item.href)}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.label}</span>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
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
          {isAuthenticated && (
            <div className="p-4 border-b bg-orange-50">
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12 ring-2 ring-orange-200">
                  <AvatarImage src={userDisplayInfo?.avatar || "/placeholder.svg"} alt={userDisplayInfo?.name || "User"} />
                  <AvatarFallback className="bg-orange-500 text-white">
                    {userDisplayInfo?.initials || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{userDisplayInfo?.name || "User"}</p>
                  <p className="text-sm text-gray-500">{userDisplayInfo?.email || "user@example.com"}</p>
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

            {isAuthenticated && (
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
            {isAuthenticated ? (
              <>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full border-red-200 text-red-600 hover:bg-red-50 rounded-full bg-transparent"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log Out
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
