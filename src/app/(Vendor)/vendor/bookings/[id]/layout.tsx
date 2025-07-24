"use client"

import type React from "react"

import { usePathname, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Info, DollarSign, CalendarCheck } from "lucide-react"
import { mockBookings } from "@/utils/data"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function BookingDetailLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const params = useParams()
  const bookingId = params.id as string

  const booking = mockBookings.find((b) => b.id === bookingId)

  if (!booking) {
    return (
      <div className="p-8 text-center">
        <p>Booking not found.</p>
        <Link href="/bookings" className="text-orange-500 hover:underline">
          Return to bookings list
        </Link>
      </div>
    )
  }

  const navLinks = [
    { href: `/vendor/bookings/${bookingId}`, label: "Details", icon: Info },
    { href: `/vendor/bookings/${bookingId}/payment`, label: "Payment", icon: DollarSign },
    { href: `/vendor/bookings/${bookingId}/visit`, label: "Visit Request", icon: CalendarCheck },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/vendor/bookings"
            className="flex items-center text-sm text-gray-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all bookings
          </Link>
        </div>

        <Card className="mb-6 border-orange-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-orange-100">
              <AvatarImage src={booking.userAvatar || "/placeholder.svg"} alt={booking.userName} />
              <AvatarFallback>{booking.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{booking.userName}</CardTitle>
              <CardDescription>
                Booking Reference: <span className="font-medium text-gray-700">{booking.bookingReference}</span>
              </CardDescription>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? "bg-orange-500 text-white shadow"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <link.icon className="mr-3 h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </aside>

          <main className="lg:col-span-3">
            <Card className="border-orange-200 bg-white shadow-sm min-h-[400px]">{children}</Card>
          </main>
        </div>
      </div>
    </div>
  )
}
