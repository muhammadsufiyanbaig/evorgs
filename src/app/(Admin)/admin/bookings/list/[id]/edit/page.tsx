"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save } from "lucide-react"

// Mock data for booking edit form
const mockBookingData = {
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
  eventTime: "10:00",
  eventLocation: "Grand Ballroom, Downtown Hotel",
  totalAmount: 2500,
  paidAmount: 2000,
  remainingAmount: 500,
  paymentStatus: "partial",
  bookingStatus: "confirmed",
  notes: "Client requested additional coverage for reception. Vendor confirmed availability.",
}

export default async function EditBookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [formData, setFormData] = useState(mockBookingData)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNestedInputChange = (parent: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as Record<string, any>),
        [field]: value,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    console.log("Updated booking:", formData)
  }

  return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/admin/bookings/${id}`}>
              <Button variant="outline" size="sm" className="border-orange-200 hover:bg-orange-50 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Details
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Booking</h1>
              <p className="text-gray-600 mt-1">Booking ID: {id}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Customer Information */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.user.firstName}
                      onChange={(e) => handleNestedInputChange("user", "firstName", e.target.value)}
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.user.lastName}
                      onChange={(e) => handleNestedInputChange("user", "lastName", e.target.value)}
                      className="border-orange-200 focus:border-orange-500"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.user.email}
                    onChange={(e) => handleNestedInputChange("user", "email", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.user.phone}
                    onChange={(e) => handleNestedInputChange("user", "phone", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={formData.user.address}
                    onChange={(e) => handleNestedInputChange("user", "address", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Vendor Information */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Vendor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={formData.vendor.businessName}
                    onChange={(e) => handleNestedInputChange("vendor", "businessName", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="vendorEmail">Email</Label>
                  <Input
                    id="vendorEmail"
                    type="email"
                    value={formData.vendor.email}
                    onChange={(e) => handleNestedInputChange("vendor", "email", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="vendorPhone">Phone</Label>
                  <Input
                    id="vendorPhone"
                    value={formData.vendor.phone}
                    onChange={(e) => handleNestedInputChange("vendor", "phone", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="vendorAddress">Address</Label>
                  <Textarea
                    id="vendorAddress"
                    value={formData.vendor.address}
                    onChange={(e) => handleNestedInputChange("vendor", "address", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service & Event Details */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Service & Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="packageName">Package Name</Label>
                  <Input
                    id="packageName"
                    value={formData.service.packageName}
                    onChange={(e) => handleNestedInputChange("service", "packageName", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="serviceType">Service Type</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => handleInputChange("serviceType", value)}
                  >
                    <SelectTrigger className="border-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PhotographyPackage">Photography</SelectItem>
                      <SelectItem value="VenuePackage">Venue</SelectItem>
                      <SelectItem value="CateringPackage">Catering</SelectItem>
                      <SelectItem value="FarmHousePackage">Farm House</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="serviceDescription">Service Description</Label>
                <Textarea
                  id="serviceDescription"
                  value={formData.service.description}
                  onChange={(e) => handleNestedInputChange("service", "description", e.target.value)}
                  className="border-orange-200 focus:border-orange-500"
                />
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="eventDate">Event Date</Label>
                  <Input
                    id="eventDate"
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => handleInputChange("eventDate", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="eventTime">Event Time</Label>
                  <Input
                    id="eventTime"
                    type="time"
                    value={formData.eventTime}
                    onChange={(e) => handleInputChange("eventTime", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="eventLocation">Event Location</Label>
                  <Input
                    id="eventLocation"
                    value={formData.eventLocation}
                    onChange={(e) => handleInputChange("eventLocation", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Status */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Payment & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="totalAmount">Total Amount ($)</Label>
                  <Input
                    id="totalAmount"
                    type="number"
                    value={formData.totalAmount}
                    onChange={(e) => handleInputChange("totalAmount", Number(e.target.value))}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="paidAmount">Paid Amount ($)</Label>
                  <Input
                    id="paidAmount"
                    type="number"
                    value={formData.paidAmount}
                    onChange={(e) => handleInputChange("paidAmount", Number(e.target.value))}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
                <div>
                  <Label htmlFor="remainingAmount">Remaining Amount ($)</Label>
                  <Input
                    id="remainingAmount"
                    type="number"
                    value={formData.remainingAmount}
                    onChange={(e) => handleInputChange("remainingAmount", Number(e.target.value))}
                    className="border-orange-200 focus:border-orange-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select
                    value={formData.paymentStatus}
                    onValueChange={(value) => handleInputChange("paymentStatus", value)}
                  >
                    <SelectTrigger className="border-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="partial">Partial</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bookingStatus">Booking Status</Label>
                  <Select
                    value={formData.bookingStatus}
                    onValueChange={(value) => handleInputChange("bookingStatus", value)}
                  >
                    <SelectTrigger className="border-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="border-orange-200 focus:border-orange-500"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href={`/admin/bookings/${id}`}>
              <Button variant="outline" className="border-orange-200 hover:bg-orange-50 bg-transparent">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isLoading} className="bg-orange-500 hover:bg-orange-600 text-white">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
  )
}
