"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DayView } from "./day-view"
import { WeekView } from "./week-view"
import { MonthView } from "./month-view"
import { MiniCalendar } from "./mini-calendar"
import type { Event, ViewType } from "@/lib/types"
import { sampleEvents } from "@/lib/sample-events"
import { formatDate } from "@/lib/utils"
import { AddEventDialog } from "./add-event-dialog"

export default function VendorCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<ViewType>("day")
  const [events, setEvents] = useState<Event[]>(sampleEvents)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  const navigateToday = () => {
    setCurrentDate(new Date())
  }

  const navigatePrevious = () => {
    const newDate = new Date(currentDate)
    if (view === "day") {
      newDate.setDate(currentDate.getDate() - 1)
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() - 7)
    } else {
      newDate.setMonth(currentDate.getMonth() - 1)
    }
    setCurrentDate(newDate)
  }

  const navigateNext = () => {
    const newDate = new Date(currentDate)
    if (view === "day") {
      newDate.setDate(currentDate.getDate() + 1)
    } else if (view === "week") {
      newDate.setDate(currentDate.getDate() + 7)
    } else {
      newDate.setMonth(currentDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const addEvent = (newEvent: Event) => {
    setEvents([...events, { ...newEvent, id: String(events.length + 1) }])
    setIsAddEventOpen(false)
  }

  const renderView = () => {
    switch (view) {
      case "day":
        return <DayView date={currentDate} events={events} />
      case "week":
        return <WeekView date={currentDate} events={events} />
      case "month":
        return <MonthView date={currentDate} events={events} />
      default:
        return <DayView date={currentDate} events={events} />
    }
  }

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col">
        <header className="flex items-start justify-between p-4">
          <div>
            <h1 className="text-xl font-semibold">{formatDate(currentDate)}</h1>
            <p className="text-muted-foreground">{currentDate.toLocaleDateString("en-US", { weekday: "long" })}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg border p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={navigatePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="h-8" onClick={navigateToday}>
                Today
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={navigateNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Select value={view} onValueChange={(value) => setView(value as ViewType)}>
              <SelectTrigger className="h-10 w-[120px] rounded-lg border">
                <SelectValue placeholder="Select view" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Day view</SelectItem>
                <SelectItem value="week">Week view</SelectItem>
                <SelectItem value="month">Month view</SelectItem>
              </SelectContent>
            </Select>
            <Button className="h-10 bg-orange-500 hover:bg-orange-500/90" onClick={() => setIsAddEventOpen(true)}>
              Add event
            </Button>
          </div>
        </header>
        <div className="flex-1 overflow-auto border-t">{renderView()}</div>
      </div>
      <div className="w-[280px] border-l p-4">
        <MiniCalendar date={currentDate} onDateSelect={setCurrentDate} />
      </div>
      <AddEventDialog
        open={isAddEventOpen}
        onOpenChange={setIsAddEventOpen}
        onAddEvent={addEvent}
        defaultDate={currentDate}
      />
    </div>
  )
}

