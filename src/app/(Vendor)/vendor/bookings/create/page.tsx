"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CalendarIcon, DollarSign, Users, FileText, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { mockServices } from "@/utils/data"
import type { Service } from "@/utils/interfaces"

export default function CreateBookingPage() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [eventDate, setEventDate] = useState<Date | undefined>()

  const handleServiceSelect = (serviceId: string) => {
    const service = mockServices.find((s) => s.id === serviceId) || null
    setSelectedService(service)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would gather all form data and send to your API
    console.log("Creating booking for service:", selectedService)
    alert("Booking creation simulated! Check the console for details.")
    router.push("/bookings")
  }

  return (
    <div className="min-h-screen bg-orange-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/bookings")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create a New Booking</h1>
            <p className="text-gray-600 mt-1">Manually add a booking for one of your services.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Service Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5 text-orange-600" />
                    Service Information
                  </CardTitle>
                  <CardDescription>Select the service this booking is for.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Label htmlFor="service">Select a Service</Label>
                  <Select onValueChange={handleServiceSelect}>
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Choose a service..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockServices.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name} ({service.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Event Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-orange-600" />
                    Event Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-date">Event Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {eventDate ? format(eventDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={eventDate} onSelect={setEventDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Number of Guests</Label>
                      <Input id="guests" type="number" placeholder="e.g., 150" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input id="start-time" type="time" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <Input id="end-time" type="time" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Special Requests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-600" />
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="special-requests">Special Requests</Label>
                    <Textarea id="special-requests" placeholder="Enter any special requirements or notes..." />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="visit-requested" />
                    <Label htmlFor="visit-requested">Customer has requested a site visit</Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Customer Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-orange-600" />
                    Customer Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="customer-name">Full Name</Label>
                    <Input id="customer-name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="customer-email">Email</Label>
                    <Input id="customer-email" type="email" placeholder="john.doe@example.com" />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-orange-600" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="total-amount">Total Amount ($)</Label>
                    <Input id="total-amount" type="number" placeholder="2500.00" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="advance-amount">Advance Paid ($)</Label>
                    <Input id="advance-amount" type="number" placeholder="500.00" />
                  </div>
                </CardContent>
              </Card>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                Create Booking
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
