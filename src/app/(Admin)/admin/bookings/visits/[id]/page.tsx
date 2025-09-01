"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Calendar, MapPin, User, Building } from "lucide-react"

// Mock data for visit request details
const mockVisitDetails = {
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
  visitStatus: "pending",
  requestedDate: "2024-01-10",
  visitPurpose: "Site inspection and consultation for wedding photography setup",
  specialRequirements: "Need to check lighting conditions and identify best photo spots",
  timeline: [
    { date: "2024-01-10", event: "Visit request submitted", status: "completed" },
    { date: "2024-01-12", event: "Request under review", status: "completed" },
    { date: "Pending", event: "Visit approval", status: "pending" },
  ],
}

export default async function VisitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const getVisitStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/visits">
              <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Visits
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Visit Request Details</h1>
              <p className="text-gray-600 mt-1">Visit ID: {id}</p>
            </div>
          </div>
          <Link href={`/admin/visits/${id}/edit`}>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Visit
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Visit Request Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Service</p>
                    <p className="text-lg font-semibold text-gray-900">{mockVisitDetails.service.packageName}</p>
                    <p className="text-sm text-gray-600">{mockVisitDetails.service.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Service Type</p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">
                      {mockVisitDetails.serviceType.replace("Package", "")}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Event Date</p>
                      <p className="font-semibold text-gray-900">{mockVisitDetails.eventDate}</p>
                      <p className="text-sm text-gray-600">{mockVisitDetails.eventTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">{mockVisitDetails.eventLocation}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Visit Purpose</p>
                  <p className="text-gray-700">{mockVisitDetails.visitPurpose}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Special Requirements</p>
                  <p className="text-gray-700">{mockVisitDetails.specialRequirements}</p>
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
                      {mockVisitDetails.user.firstName} {mockVisitDetails.user.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{mockVisitDetails.user.email}</p>
                    <p className="text-sm text-gray-600">{mockVisitDetails.user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm text-gray-700">{mockVisitDetails.user.address}</p>
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
                    <p className="font-semibold text-gray-900">{mockVisitDetails.vendor.businessName}</p>
                    <p className="text-sm text-gray-600">{mockVisitDetails.vendor.email}</p>
                    <p className="text-sm text-gray-600">{mockVisitDetails.vendor.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm text-gray-700">{mockVisitDetails.vendor.address}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Visit Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Current Status</p>
                  <Badge className={getVisitStatusColor(mockVisitDetails.visitStatus)}>
                    {mockVisitDetails.visitStatus}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Requested Date</p>
                  <p className="text-sm text-gray-700">{mockVisitDetails.requestedDate}</p>
                </div>
                {mockVisitDetails.visitStatus === "pending" && (
                  <div className="space-y-2 pt-4">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Approve Visit</Button>
                    <Button variant="destructive" className="w-full">
                      Reject Visit
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockVisitDetails.timeline.map((item, index) => (
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
