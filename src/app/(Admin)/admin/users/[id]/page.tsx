"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Camera, ChefHat, Edit, Home, Mail, MapPin, Phone, Star, MapPinIcon } from "lucide-react"

// Mock user data
const mockUser = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY 10001",
  profileImage: "/placeholder.svg?height=120&width=120",
  dateOfBirth: "1990-05-15",
  gender: "Male",
  createdAt: "2024-01-15T10:30:00Z",
  isVerified: true,
}

// Mock bookings data
const mockBookings = [
  {
    id: "B001",
    service: "Wedding Photography",
    serviceType: "Photography",
    date: "2024-03-15",
    status: "Completed",
    amount: 2500,
    venue: "Grand Hotel Ballroom",
  },
  {
    id: "B002",
    service: "Birthday Catering",
    serviceType: "Catering",
    date: "2024-02-20",
    status: "Completed",
    amount: 1200,
    venue: "Private Residence",
  },
  {
    id: "B003",
    service: "Corporate Event Venue",
    serviceType: "Venue",
    date: "2024-04-10",
    status: "Upcoming",
    amount: 3500,
    venue: "Convention Center",
  },
]

// Mock vouchers data
const mockVouchers = [
  {
    id: "V001",
    code: "WELCOME20",
    discount: "20%",
    status: "Used",
    usedDate: "2024-02-15",
    service: "Photography",
  },
  {
    id: "V002",
    code: "BIRTHDAY50",
    discount: "$50",
    status: "Active",
    expiryDate: "2024-06-30",
    service: "Catering",
  },
  {
    id: "V003",
    code: "VENUE15",
    discount: "15%",
    status: "Expired",
    expiryDate: "2024-01-31",
    service: "Venue",
  },
]

// Mock favorite services
const mockFavoriteServices = {
  catering: [
    { id: "C001", name: "Italian Cuisine Catering", rating: 4.8, bookings: 3 },
    { id: "C002", name: "BBQ & Grill Masters", rating: 4.6, bookings: 1 },
  ],
  photography: [
    { id: "P001", name: "Professional Wedding Photography", rating: 4.9, bookings: 2 },
    { id: "P002", name: "Event Photography Studio", rating: 4.7, bookings: 1 },
  ],
  farmhouse: [{ id: "F001", name: "Rustic Country Farmhouse", rating: 4.5, bookings: 0 }],
  venue: [
    { id: "V001", name: "Grand Convention Center", rating: 4.8, bookings: 1 },
    { id: "V002", name: "Elegant Banquet Hall", rating: 4.6, bookings: 0 },
  ],
}

export default function UserDetailPage() {
  const params = useParams()
  const userId = params.id as string
  const [activeTab, setActiveTab] = useState("overview")

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "upcoming":
        return "bg-orange-100 text-orange-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "active":
        return "bg-orange-100 text-orange-800"
      case "used":
        return "bg-gray-100 text-gray-800"
      case "expired":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getServiceIcon = (serviceType: string) => {
    switch (serviceType.toLowerCase()) {
      case "catering":
        return <ChefHat className="h-4 w-4" />
      case "photography":
        return <Camera className="h-4 w-4" />
      case "farmhouse":
        return <Home className="h-4 w-4" />
      case "venue":
        return <MapPinIcon className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Users
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">User Details</h1>
            <p className="text-gray-600">
              Complete information and activity for {mockUser.firstName} {mockUser.lastName}
            </p>
          </div>
        </div>
        <Link href={`/admin/users/${userId}/edit`}>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
            <Edit className="h-4 w-4" />
            Edit User
          </Button>
        </Link>
      </div>

      {/* User Profile Card */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b border-orange-100">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={mockUser.profileImage || "/placeholder.svg"}
                alt={`${mockUser.firstName} ${mockUser.lastName}`}
              />
              <AvatarFallback className="text-2xl bg-orange-100 text-orange-800">
                {mockUser.firstName.charAt(0)}
                {mockUser.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-orange-900">
                  {mockUser.firstName} {mockUser.lastName}
                </h2>
                <Badge className={mockUser.isVerified ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-800"}>
                  {mockUser.isVerified ? "Verified" : "Unverified"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="h-4 w-4" />
                  {mockUser.email}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4" />
                  {mockUser.phone}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  {mockUser.address}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  Born: {formatDate(mockUser.dateOfBirth)}
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-orange-50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="bookings" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Bookings
          </TabsTrigger>
          <TabsTrigger value="vouchers" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Vouchers
          </TabsTrigger>
          <TabsTrigger value="favorites" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
            Favorite Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-orange-900">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{mockBookings.length}</div>
                <p className="text-sm text-gray-600">Lifetime bookings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-orange-900">Total Spent</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">
                  ${mockBookings.reduce((sum, booking) => sum + booking.amount, 0).toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">Across all services</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-orange-900">Member Since</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-orange-600">{new Date(mockUser.createdAt).getFullYear()}</div>
                <p className="text-sm text-gray-600">{formatDate(mockUser.createdAt)}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-900">Booking History</CardTitle>
              <CardDescription>All bookings made by this user</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-orange-50">
                    <TableHead className="text-orange-900">Booking ID</TableHead>
                    <TableHead className="text-orange-900">Service</TableHead>
                    <TableHead className="text-orange-900">Date</TableHead>
                    <TableHead className="text-orange-900">Venue</TableHead>
                    <TableHead className="text-orange-900">Amount</TableHead>
                    <TableHead className="text-orange-900">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockBookings.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-orange-50/50">
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getServiceIcon(booking.serviceType)}
                          {booking.service}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(booking.date)}</TableCell>
                      <TableCell>{booking.venue}</TableCell>
                      <TableCell className="font-medium">${booking.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vouchers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-900">Vouchers & Discounts</CardTitle>
              <CardDescription>All vouchers associated with this user</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-orange-50">
                    <TableHead className="text-orange-900">Voucher ID</TableHead>
                    <TableHead className="text-orange-900">Code</TableHead>
                    <TableHead className="text-orange-900">Discount</TableHead>
                    <TableHead className="text-orange-900">Service</TableHead>
                    <TableHead className="text-orange-900">Status</TableHead>
                    <TableHead className="text-orange-900">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockVouchers.map((voucher) => (
                    <TableRow key={voucher.id} className="hover:bg-orange-50/50">
                      <TableCell className="font-medium">{voucher.id}</TableCell>
                      <TableCell>
                        <code className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">{voucher.code}</code>
                      </TableCell>
                      <TableCell className="font-medium text-orange-600">{voucher.discount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getServiceIcon(voucher.service)}
                          {voucher.service}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(voucher.status)}>{voucher.status}</Badge>
                      </TableCell>
                      <TableCell>
                        {voucher.status === "Used" && voucher.usedDate
                          ? `Used: ${formatDate(voucher.usedDate)}`
                          : voucher.expiryDate
                            ? `Expires: ${formatDate(voucher.expiryDate)}`
                            : "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Catering */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <ChefHat className="h-5 w-5" />
                  Catering Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockFavoriteServices.catering.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                        {service.rating} • {service.bookings} bookings
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Photography */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Camera className="h-5 w-5" />
                  Photography Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockFavoriteServices.photography.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                        {service.rating} • {service.bookings} bookings
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Farmhouse */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Home className="h-5 w-5" />
                  Farmhouse Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockFavoriteServices.farmhouse.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                        {service.rating} • {service.bookings} bookings
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Venue */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <MapPinIcon className="h-5 w-5" />
                  Venue Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockFavoriteServices.venue.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                        {service.rating} • {service.bookings} bookings
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
