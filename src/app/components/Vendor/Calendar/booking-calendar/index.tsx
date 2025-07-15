"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DayView } from "../day-view"
import { WeekView } from "../week-view"
import { MonthView } from "../month-view"
import { MiniCalendar } from "../mini-calendar"
import type { Event, ViewType } from "@/utils/interfaces"
import { formatDate } from "@/utils/function"
import { AddEventDialog } from "../add-event-dialog"
import type { Booking } from "@/utils/interfaces"

interface BookingCalendarProps {
  bookings: Booking[]
}

export function BookingCalendar({ bookings }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<ViewType>("month")
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  const bookingEvents: Event[] = useMemo(() => {
    return bookings.map((booking) => ({
      id: booking.id,
      title: booking.userName,
      date: new Date(booking.eventDate),
      startTime: booking.visitScheduledFor
        ? new Date(booking.visitScheduledFor).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : "09:00",
      location: booking.serviceName, // Using location to store service name
      color: booking.status === "Confirmed" ? "blue" : booking.status === "Pending" ? "pink" : "gray",
      bookingId: booking.id,
    }))
  }, [bookings])

  const [customEvents, setCustomEvents] = useState<Event[]>([])
  const allEvents = useMemo(() => [...bookingEvents, ...customEvents], [bookingEvents, customEvents])

  const navigateToday = () => setCurrentDate(new Date())

  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    if (view === "day") newDate.setDate(currentDate.getDate() - 1)
    else if (view === "week") newDate.setDate(currentDate.getDate() - 7)
    else newDate.setMonth(currentDate.getMonth() - 1)
    setCurrentDate(newDate)
  }

  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (view === "day") newDate.setDate(currentDate.getDate() + 1)
    else if (view === "week") newDate.setDate(currentDate.getDate() + 7)
    else newDate.setMonth(currentDate.getMonth() + 1)
    setCurrentDate(newDate)
  }

  const addEvent = (newEvent: Event) => {
    setCustomEvents([...customEvents, { ...newEvent, id: `custom-${Date.now()}` }])
    setIsAddEventOpen(false)
  }

  const renderView = () => {
    switch (view) {
      case "day":
        return <DayView date={currentDate} events={allEvents} />
      case "week":
        return <WeekView date={currentDate} events={allEvents} />
      case "month":
        return <MonthView date={currentDate} events={allEvents} />
      default:
        return <MonthView date={currentDate} events={allEvents} />
    }
  }

  return (
    <div className="flex flex-col lg:flex-row h-full min-h-[80vh]">
      <div className="flex-1 flex flex-col">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 border-b">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{formatDate(currentDate)}</h1>
            <p className="text-gray-500">{currentDate.toLocaleDateString("en-US", { weekday: "long" })}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1 rounded-lg border p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600" onClick={navigatePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="h-8 text-gray-600" onClick={navigateToday}>
                Today
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-600" onClick={navigateNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Select value={view} onValueChange={(value) => setView(value as ViewType)}>
              <SelectTrigger className="h-10 w-[120px] rounded-lg">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="h-10 bg-orange-600 hover:bg-orange-700 text-white"
              onClick={() => setIsAddEventOpen(true)}
            >
              Add event
            </Button>
          </div>
        </header>
        <div className="flex-1 overflow-auto">{renderView()}</div>
      </div>
      <div className="w-full lg:w-[320px] lg:border-l p-4 bg-gray-50/50">
        <MiniCalendar date={currentDate} onDateSelect={setCurrentDate} events={allEvents} />
      </div>
      <AddEventDialog
        open={isAddEventOpen}
        onOpenChange={setIsAddEventOpen}
        onAddEvent={addEvent}
        defaultDate={currentDate}
        bookings={bookings}
      />
    </div>
  )
}
