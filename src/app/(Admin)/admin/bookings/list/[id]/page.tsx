import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Calendar, MapPin, DollarSign, User, Building } from "lucide-react"

// Mock data for booking details
const mockBookingDetails = {
  id: "1",
  user: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, City, State 12345",
  },
  vendor: {
    businessName: "Elite Photography",
    email: "contact@elitephoto.com",
    phone: "+1 (555) 987-6543",
    address: "456 Business Ave, City, State 12345",
  },
  service: {
    packageName: "Wedding Premium Package",
    name: "Photography",
    description:
      "Complete wedding photography package including engagement session, full day coverage, and edited photos.",
  },
  serviceType: "PhotographyPackage",
  eventDate: "2024-03-15",
  eventTime: "10:00 AM",
  eventLocation: "Grand Ballroom, Downtown Hotel",
  totalAmount: 2500,
  paidAmount: 2000,
  remainingAmount: 500,
  paymentStatus: "partial",
  bookingStatus: "confirmed",
  createdAt: "2024-01-10",
  notes: "Client requested additional coverage for reception. Vendor confirmed availability.",
  timeline: [
    { date: "2024-01-10", event: "Booking created", status: "completed" },
    { date: "2024-01-12", event: "Payment received ($2000)", status: "completed" },
    { date: "2024-01-15", event: "Booking confirmed", status: "completed" },
    { date: "2024-03-15", event: "Event date", status: "upcoming" },
  ],
}

export default async function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

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

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/bookings">
              <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Bookings
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
              <p className="text-gray-600 mt-1">Booking ID: {id}</p>
            </div>
          </div>
          <Link href={`/admin/bookings/${id}/edit`}>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Booking
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Booking Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Service</p>
                    <p className="text-lg font-semibold text-gray-900">{mockBookingDetails.service.packageName}</p>
                    <p className="text-sm text-gray-600">{mockBookingDetails.service.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Service Type</p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">
                      {mockBookingDetails.serviceType.replace("Package", "")}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Event Date</p>
                      <p className="font-semibold text-gray-900">{mockBookingDetails.eventDate}</p>
                      <p className="text-sm text-gray-600">{mockBookingDetails.eventTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">{mockBookingDetails.eventLocation}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Amount</p>
                      <p className="font-semibold text-gray-900">${mockBookingDetails.totalAmount}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Notes</p>
                  <p className="text-gray-700">{mockBookingDetails.notes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Customer & Vendor Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center">
                    <User className="w-5 h-5 mr-2 text-orange-500" />
                    Customer Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {mockBookingDetails.user.firstName} {mockBookingDetails.user.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{mockBookingDetails.user.email}</p>
                    <p className="text-sm text-gray-600">{mockBookingDetails.user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm text-gray-700">{mockBookingDetails.user.address}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-gray-900 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-orange-500" />
                    Vendor Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">{mockBookingDetails.vendor.businessName}</p>
                    <p className="text-sm text-gray-600">{mockBookingDetails.vendor.email}</p>
                    <p className="text-sm text-gray-600">{mockBookingDetails.vendor.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm text-gray-700">{mockBookingDetails.vendor.address}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status & Payment */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Status & Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Booking Status</p>
                  <Badge className={getStatusColor(mockBookingDetails.bookingStatus)}>
                    {mockBookingDetails.bookingStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Payment Status</p>
                  <Badge className={getPaymentStatusColor(mockBookingDetails.paymentStatus)}>
                    {mockBookingDetails.paymentStatus}
                  </Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Amount:</span>
                    <span className="font-semibold text-gray-900">${mockBookingDetails.totalAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Paid Amount:</span>
                    <span className="font-semibold text-green-600">${mockBookingDetails.paidAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Remaining:</span>
                    <span className="font-semibold text-orange-600">${mockBookingDetails.remainingAmount}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookingDetails.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 ${
                          item.status === "completed" ? "bg-green-500" : "bg-orange-500"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{item.event}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}
