"use client"

import { use } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Calendar, MapPin, User, Building, Clock } from "lucide-react"

// Mock data for scheduled visit details
const mockScheduleDetails = {
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
  scheduledDate: "2024-02-20",
  scheduledTime: "2:00 PM",
  visitDuration: "2 hours",
  visitStatus: "scheduled",
  visitPurpose: "Site inspection and consultation for wedding photography setup",
  notes: "Vendor will assess lighting conditions and discuss setup requirements with venue staff",
  timeline: [
    { date: "2024-01-10", event: "Visit request submitted", status: "completed" },
    { date: "2024-01-15", event: "Visit approved", status: "completed" },
    { date: "2024-01-18", event: "Visit scheduled", status: "completed" },
    { date: "2024-02-20", event: "Scheduled visit", status: "upcoming" },
  ],
}

export default function ScheduleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const getVisitStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/scheduling">
              <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Scheduling
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Scheduled Visit Details</h1>
              <p className="text-gray-600 mt-1">Schedule ID: {id}</p>
            </div>
          </div>
          <Link href={`/scheduling/${id}/edit`}>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Schedule
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Visit Schedule Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Service</p>
                    <p className="text-lg font-semibold text-gray-900">{mockScheduleDetails.service.packageName}</p>
                    <p className="text-sm text-gray-600">{mockScheduleDetails.service.description}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Service Type</p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">
                      {mockScheduleDetails.serviceType.replace("Package", "")}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Scheduled Visit</p>
                      <p className="font-semibold text-gray-900">{mockScheduleDetails.scheduledDate}</p>
                      <p className="text-sm text-gray-600">{mockScheduleDetails.scheduledTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-900">{mockScheduleDetails.visitDuration}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Location</p>
                      <p className="font-semibold text-gray-900">{mockScheduleDetails.eventLocation}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Visit Purpose</p>
                  <p className="text-gray-700">{mockScheduleDetails.visitPurpose}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Notes</p>
                  <p className="text-gray-700">{mockScheduleDetails.notes}</p>
                </div>
              </CardContent>
            </Card>

            {/* Event Details */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Event Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Event Date</p>
                      <p className="font-semibold text-gray-900">{mockScheduleDetails.eventDate}</p>
                      <p className="text-sm text-gray-600">{mockScheduleDetails.eventTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Event Location</p>
                      <p className="font-semibold text-gray-900">{mockScheduleDetails.eventLocation}</p>
                    </div>
                  </div>
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
                      {mockScheduleDetails.user.firstName} {mockScheduleDetails.user.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{mockScheduleDetails.user.email}</p>
                    <p className="text-sm text-gray-600">{mockScheduleDetails.user.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm text-gray-700">{mockScheduleDetails.user.address}</p>
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
                    <p className="font-semibold text-gray-900">{mockScheduleDetails.vendor.businessName}</p>
                    <p className="text-sm text-gray-600">{mockScheduleDetails.vendor.email}</p>
                    <p className="text-sm text-gray-600">{mockScheduleDetails.vendor.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-sm text-gray-700">{mockScheduleDetails.vendor.address}</p>
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
                  <Badge className={getVisitStatusColor(mockScheduleDetails.visitStatus)}>
                    {mockScheduleDetails.visitStatus}
                  </Badge>
                </div>
                {mockScheduleDetails.visitStatus === "scheduled" && (
                  <div className="space-y-2 pt-4">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Mark as Completed</Button>
                    <Button variant="destructive" className="w-full">
                      Cancel Visit
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
                  {mockScheduleDetails.timeline.map((item, index) => (
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
