"use client"

import { useParams } from "next/navigation"
import { useState } from "react"
import { mockBookings } from "@/utils/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, FileText, Edit, RefreshCw, XCircle } from "lucide-react"
import type { BookingStatus } from "@/utils/interfaces"

export default function BookingDetailPage() {
  const params = useParams()
  const bookingId = params.id as string
  const booking = mockBookings.find((b) => b.id === bookingId)

  const [rescheduleOpen, setRescheduleOpen] = useState(false)
  const [newDate, setNewDate] = useState<Date | undefined>(booking ? new Date(booking.eventDate) : undefined)

  const [statusOpen, setStatusOpen] = useState(false)
  const [statusUpdate, setStatusUpdate] = useState<BookingStatus>(booking?.status || "Pending")

  const [cancelOpen, setCancelOpen] = useState(false)
  const [cancellationReason, setCancellationReason] = useState("")

  if (!booking) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Booking not found.</p>
      </div>
    )
  }

  const statusBadge = (status: BookingStatus) => {
    const map = {
      Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Confirmed: "bg-blue-100 text-blue-800 border-blue-200",
      Completed: "bg-green-100 text-green-800 border-green-200",
      Canceled: "bg-red-100 text-red-800 border-red-200",
    } as const
    return map[status]
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Booking Details</CardTitle>
            <CardDescription>Overall information for booking #{booking.bookingReference}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setRescheduleOpen(true)}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Reschedule
            </Button>
            <Button variant="outline" onClick={() => setStatusOpen(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Update Status
            </Button>
            <Button variant="destructive" onClick={() => setCancelOpen(true)}>
              <XCircle className="w-4 h-4 mr-2" />
              Cancel Booking
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="space-y-1">
              <div className="text-gray-500">Status</div>
              <div className="font-semibold">
                <Badge variant="outline" className={statusBadge(booking.status)}>
                  {booking.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-500">Customer</div>
              <div className="font-semibold">{booking.userName}</div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-500">Service</div>
              <div className="font-semibold">{booking.serviceName}</div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-500">Event Date</div>
              <div className="font-semibold">{new Date(booking.eventDate).toLocaleDateString()}</div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-500">Guests</div>
              <div className="font-semibold">{booking.numberOfGuests}</div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-500">Total Amount</div>
              <div className="font-semibold">${booking.totalAmount.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-orange-600" /> Service & Event
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Service Name</span>
              <span className="font-medium">{booking.serviceName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Service Type</span>
              <span className="font-medium">{booking.serviceType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Event Date</span>
              <span className="font-medium">{new Date(booking.eventDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Number of Guests</span>
              <span className="font-medium">{booking.numberOfGuests}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-600" /> Special Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{booking.specialRequests || "No special requests provided."}</p>
          </CardContent>
        </Card>
      </div>

      {/* Reschedule Dialog */}
      <Dialog open={rescheduleOpen} onOpenChange={setRescheduleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reschedule Booking</DialogTitle>
            <p className="text-sm text-muted-foreground">Select a new date for this booking.</p>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Calendar mode="single" selected={newDate} onSelect={setNewDate} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRescheduleOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setRescheduleOpen(false)}>Confirm Reschedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Status Dialog */}
      <Dialog open={statusOpen} onOpenChange={setStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Booking Status</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="status-select">New Status</Label>
            <Select value={statusUpdate} onValueChange={(v: BookingStatus) => setStatusUpdate(v)}>
              <SelectTrigger id="status-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Confirmed">Confirmed</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setStatusOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setStatusOpen(false)}>Save Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Booking Dialog */}
      <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Booking: {booking.bookingReference}</DialogTitle>
            <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="reason">Reason for Cancellation</Label>
            <Textarea
              id="reason"
              value={cancellationReason}
              onChange={(e) => setCancellationReason(e.target.value)}
              placeholder="Provide a reason..."
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelOpen(false)}>
              Back
            </Button>
            <Button variant="destructive" onClick={() => setCancelOpen(false)}>
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
