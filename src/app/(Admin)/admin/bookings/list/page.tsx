"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Edit, Plus } from "lucide-react"

// Mock data for bookings
const mockBookings = [
  {
    id: "1",
    user: { firstName: "John", lastName: "Doe", email: "john@example.com" },
    vendor: { businessName: "Elite Photography", email: "contact@elitephoto.com" },
    service: { packageName: "Wedding Premium Package", name: "Photography" },
    serviceType: "PhotographyPackage",
    eventDate: "2024-03-15",
    eventTime: "10:00 AM",
    totalAmount: 2500,
    remainingAmount: 500,
    paymentStatus: "partial",
    bookingStatus: "confirmed",
  },
  {
    id: "2",
    user: { firstName: "Sarah", lastName: "Johnson", email: "sarah@example.com" },
    vendor: { businessName: "Garden Venues", email: "info@gardenvenues.com" },
    service: { packageName: "Outdoor Wedding Package", name: "Venue" },
    serviceType: "VenuePackage",
    eventDate: "2024-04-20",
    eventTime: "2:00 PM",
    totalAmount: 3500,
    remainingAmount: 0,
    paymentStatus: "paid",
    bookingStatus: "confirmed",
  },
]

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "partial":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100"
      case "pending":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.bookingStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Bookings Management</h1>
            <p className="text-gray-600 mt-2">Manage all booking requests and their details</p>
          </div>
          <Link href="/bookings/create">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Booking
            </Button>
          </Link>
        </div>

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-gray-900">All Bookings</CardTitle>
            <CardDescription>View and manage booking requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-orange-200 focus:border-orange-500"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48 border-orange-200">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border border-orange-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-orange-50">
                    <TableRow>
                      <TableHead className="text-gray-900 font-semibold">Customer</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Vendor</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Service</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Event Date</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Amount</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Payment</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Status</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id} className="hover:bg-orange-25">
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {booking.user.firstName} {booking.user.lastName}
                            </p>
                            <p className="text-sm text-gray-500">{booking.user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{booking.vendor.businessName}</p>
                            <p className="text-sm text-gray-500">{booking.vendor.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {booking.service.packageName || booking.service.name}
                            </p>
                            <p className="text-sm text-gray-500 capitalize">
                              {booking.serviceType.replace("Package", "")}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{booking.eventDate}</p>
                            <p className="text-sm text-gray-500">{booking.eventTime}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">${booking.totalAmount}</p>
                            {booking.remainingAmount > 0 && (
                              <p className="text-sm text-orange-600">${booking.remainingAmount} due</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                            {booking.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.bookingStatus)}>{booking.bookingStatus}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Link href={`/bookings/${booking.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-orange-200 hover:bg-orange-50 bg-transparent"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            <Link href={`/bookings/${booking.id}/edit`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-orange-200 hover:bg-orange-50 bg-transparent"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
