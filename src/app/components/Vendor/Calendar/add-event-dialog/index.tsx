"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Event } from "@/utils/interfaces"
import type { Booking } from "@/utils/interfaces"

interface AddEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddEvent: (event: Event) => void
  defaultDate: Date
  bookings: Booking[]
}

export function AddEventDialog({ open, onOpenChange, onAddEvent, defaultDate, bookings }: AddEventDialogProps) {
  const [title, setTitle] = useState("")
  const [startTime, setStartTime] = useState("09:00")
  const [location, setLocation] = useState("")
  const [color, setColor] = useState<Event["color"]>("gray")
  const [selectedBookingId, setSelectedBookingId] = useState<string | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const selectedBooking = bookings.find((b) => b.id === selectedBookingId)

    onAddEvent({
      id: "",
      title: title || (selectedBooking ? `Follow-up: ${selectedBooking.userName}` : "New Event"),
      date: defaultDate,
      startTime,
      location: location || selectedBooking?.serviceName || "",
      color,
      bookingId: selectedBookingId,
    })
    // Reset form
    setTitle("")
    setStartTime("09:00")
    setLocation("")
    setColor("gray")
    setSelectedBookingId(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Calendar Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="booking-select">Link to Booking (Optional)</Label>
            <Select value={selectedBookingId} onValueChange={setSelectedBookingId}>
              <SelectTrigger id="booking-select">
                <SelectValue placeholder="Select a booking..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {bookings.map((booking) => (
                  <SelectItem key={booking.id} value={booking.id}>
                    {booking.bookingReference} - {booking.userName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={selectedBookingId ? "e.g., Final Payment Reminder" : "e.g., Staff Meeting"}
              required={!selectedBookingId}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time">Start Time</Label>
            <Input id="time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Select value={color} onValueChange={(value: Event["color"]) => setColor(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
                <SelectItem value="gray">Gray</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
              Add Event
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
