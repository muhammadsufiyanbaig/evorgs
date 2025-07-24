"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Building, CalendarIcon, Save, Plus, X, AlertCircle, Clock, CalendarDays } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns"

// Mock service data
const mockService = {
  id: "venue1",
  name: "Grand Ballroom",
  type: "venue",
  basePrice: 2500,
  minPersonLimit: 50,
  maxPersonLimit: 300,
}

// Mock availability data
const mockAvailabilityData = {
  availableDates: [
    { date: new Date(2024, 1, 15), price: 2500, timeSlots: ["Morning", "Evening", "Full Day"] },
    { date: new Date(2024, 1, 22), price: 2800, timeSlots: ["Evening"] },
    { date: new Date(2024, 1, 29), price: 2500, timeSlots: ["Morning", "Evening", "Full Day"] },
  ],
  blockedDates: [
    { date: new Date(2024, 1, 14), reason: "Maintenance", type: "maintenance" },
    { date: new Date(2024, 1, 21), reason: "Private Event", type: "booked" },
    { date: new Date(2024, 1, 28), reason: "Staff Training", type: "blocked" },
  ],
  recurringRules: [
    { id: "1", pattern: "weekly", days: ["Monday"], action: "block", reason: "Weekly Maintenance" },
    { id: "2", pattern: "monthly", dates: [1, 15], action: "premium", priceMultiplier: 1.5 },
  ],
}

const mockBookings = [
  {
    id: "booking1",
    date: new Date(2024, 1, 16),
    timeSlot: "Evening",
    customerName: "Sarah Johnson",
    status: "confirmed",
    price: 2500,
  },
  {
    id: "booking2",
    date: new Date(2024, 1, 23),
    timeSlot: "Full Day",
    customerName: "Michael Chen",
    status: "pending",
    price: 2800,
  },
]

interface CustomTimeSlot {
  id: string
  name: string
  startTime: string
  endTime: string
}

export default function ManageAvailabilityPage() {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string

  // Date selection states
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [selectionMode, setSelectionMode] = useState<"individual" | "range">("individual")

  // UI states
  const [selectedTab, setSelectedTab] = useState("calendar")
  const [isAddingAvailability, setIsAddingAvailability] = useState(false)
  const [isBlockingDates, setIsBlockingDates] = useState(false)

  // Form states
  const [availabilityForm, setAvailabilityForm] = useState({
    price: mockService.basePrice.toString(),
    timeSlots: [] as string[],
    customTimeSlots: [] as CustomTimeSlot[],
    notes: "",
    useCustomTimes: false,
  })

  const [blockingForm, setBlockingForm] = useState({
    reason: "",
    type: "blocked" as "blocked" | "maintenance" | "booked",
  })

  // Custom time slot form
  const [customTimeForm, setCustomTimeForm] = useState({
    name: "",
    startTime: "09:00",
    endTime: "17:00",
  })

  const timeSlotOptions = ["Morning (9AM-1PM)", "Afternoon (2PM-6PM)", "Evening (7PM-11PM)", "Full Day (9AM-11PM)"]

  // Quick date selection presets
  const datePresets = [
    { label: "Today", action: () => setSelectedDates([new Date()]) },
    { label: "Tomorrow", action: () => setSelectedDates([addDays(new Date(), 1)]) },
    {
      label: "This Week",
      action: () => {
        const start = startOfWeek(new Date())
        const end = endOfWeek(new Date())
        const dates = []
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          dates.push(new Date(d))
        }
        setSelectedDates(dates)
      },
    },
    {
      label: "This Month",
      action: () => {
        const start = startOfMonth(new Date())
        const end = endOfMonth(new Date())
        const dates = []
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          dates.push(new Date(d))
        }
        setSelectedDates(dates)
      },
    },
  ]

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return

    if (selectionMode === "individual") {
      setSelectedDates((prev) => {
        const isSelected = prev.some((d) => d.toDateString() === date.toDateString())
        if (isSelected) {
          return prev.filter((d) => d.toDateString() !== date.toDateString())
        } else {
          return [...prev, date]
        }
      })
    }
  }

  type DateRange = { from?: Date; to?: Date }

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (!range) return
    setDateRange({ from: range.from, to: range.to })

    if (range.from && range.to) {
      const dates = []
      for (let d = new Date(range.from); d <= range.to; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d))
      }
      setSelectedDates(dates)
    }
  }

  const handleTimeSlotToggle = (slot: string) => {
    setAvailabilityForm((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.includes(slot) ? prev.timeSlots.filter((s) => s !== slot) : [...prev.timeSlots, slot],
    }))
  }

  const handleAddCustomTimeSlot = () => {
    if (!customTimeForm.name || !customTimeForm.startTime || !customTimeForm.endTime) return

    const newTimeSlot: CustomTimeSlot = {
      id: Date.now().toString(),
      name: customTimeForm.name,
      startTime: customTimeForm.startTime,
      endTime: customTimeForm.endTime,
    }

    setAvailabilityForm((prev) => ({
      ...prev,
      customTimeSlots: [...prev.customTimeSlots, newTimeSlot],
    }))

    setCustomTimeForm({ name: "", startTime: "09:00", endTime: "17:00" })
  }

  const handleRemoveCustomTimeSlot = (id: string) => {
    setAvailabilityForm((prev) => ({
      ...prev,
      customTimeSlots: prev.customTimeSlots.filter((slot) => slot.id !== id),
    }))
  }

  const handleSaveAvailability = () => {
    const finalDates = selectionMode === "range" && dateRange.from && dateRange.to ? selectedDates : selectedDates

    console.log("Saving availability:", {
      dates: finalDates,
      availabilityForm,
      selectionMode,
      dateRange,
    })

    // Reset form
    setIsAddingAvailability(false)
    setSelectedDates([])
    setDateRange({ from: undefined, to: undefined })
    setAvailabilityForm({
      price: mockService.basePrice.toString(),
      timeSlots: [],
      customTimeSlots: [],
      notes: "",
      useCustomTimes: false,
    })
  }

  const handleBlockDates = () => {
    console.log("Blocking dates:", { selectedDates, blockingForm })
    setIsBlockingDates(false)
    setSelectedDates([])
    setDateRange({ from: undefined, to: undefined })
    setBlockingForm({ reason: "", type: "blocked" })
  }

  const getDateStatus = (date: Date) => {
    const dateStr = date.toDateString()
    const booking = mockBookings.find((b) => b.date.toDateString() === dateStr)
    if (booking) return { type: "booked", data: booking }

    const blocked = mockAvailabilityData.blockedDates.find((b) => b.date.toDateString() === dateStr)
    if (blocked) return { type: "blocked", data: blocked }

    const available = mockAvailabilityData.availableDates.find((a) => a.date.toDateString() === dateStr)
    if (available) return { type: "available", data: available }

    return { type: "none", data: null }
  }

  const renderCalendarDay = (date: Date) => {
    const status = getDateStatus(date)
    const isSelected = selectedDates.some((d) => d.toDateString() === date.toDateString())
    let className = "relative w-full h-full flex items-center justify-center text-sm"

    if (isSelected) {
      className += " bg-orange-600 text-white rounded"
    } else {
      switch (status.type) {
        case "booked":
          className += " bg-red-100 text-red-800 rounded"
          break
        case "blocked":
          className += " bg-gray-100 text-gray-600 rounded"
          break
        case "available":
          className += " bg-green-100 text-green-800 rounded"
          break
        default:
          className += " hover:bg-orange-50 rounded"
      }
    }

    return (
      <div className={className}>
        {date.getDate()}
        {status.type !== "none" && (
          <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full">
            {status.type === "booked" && <div className="w-full h-full bg-red-500 rounded-full" />}
            {status.type === "blocked" && <div className="w-full h-full bg-gray-500 rounded-full" />}
            {status.type === "available" && <div className="w-full h-full bg-green-500 rounded-full" />}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push(`/vendor/services/${serviceId}`)}
              className="border-orange-200 text-orange-700 hover:bg-orange-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Service
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manage Availability</h1>
                <p className="text-orange-600">{mockService.name}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsAddingAvailability(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Availability
            </Button>
            <Button
              onClick={() => setIsBlockingDates(true)}
              variant="outline"
              className="border-red-200 text-red-700 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-2" />
              Block Dates
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px] bg-white border border-orange-200">
            <TabsTrigger value="calendar" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Calendar
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Bookings
            </TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Pricing
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Calendar */}
              <div className="lg:col-span-2">
                <Card className="border-orange-200 bg-white">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-gray-900 flex items-center gap-2">
                          <CalendarIcon className="w-5 h-5" />
                          Availability Calendar
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          Select dates for availability management
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Label htmlFor="selection-mode" className="text-sm text-gray-600">
                          Selection Mode:
                        </Label>
                        <Select
                          value={selectionMode}
                          onValueChange={(value: "individual" | "range") => {
                            setSelectionMode(value)
                            setSelectedDates([])
                            setDateRange({ from: undefined, to: undefined })
                          }}
                        >
                          <SelectTrigger className="w-32 border-orange-200">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Individual</SelectItem>
                            <SelectItem value="range">Date Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Quick Date Selection */}
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-600 mr-2">Quick Select:</span>
                      {datePresets.map((preset) => (
                        <Button
                          key={preset.label}
                          variant="outline"
                          size="sm"
                          onClick={preset.action}
                          className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                        >
                          {preset.label}
                        </Button>
                      ))}
                    </div>

                    {/* Date Range Picker for Range Mode */}
                    {selectionMode === "range" && (
                      <div className="flex items-center gap-4">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-[280px] justify-start text-left font-normal border-orange-200 bg-transparent"
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {dateRange.from ? (
                                dateRange.to ? (
                                  <>
                                    {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(dateRange.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date range</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              initialFocus
                              mode="range"
                              defaultMonth={dateRange.from}
                              selected={dateRange}
                              onSelect={handleDateRangeSelect}
                              numberOfMonths={2}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    )}

                    {/* Main Calendar */}
                    {selectionMode === "individual" ? (
                      <Calendar
                        mode="multiple"
                        selected={selectedDates}
                        onSelect={(dates: any) => setSelectedDates(dates || [])}
                        className="rounded-md border border-orange-200"
                        components={{
                          Day: ({ day }) => renderCalendarDay(day.date),
                        }}
                        required
                      />
                    ) : (
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={handleDateRangeSelect}
                        className="rounded-md border border-orange-200"
                        components={{
                          Day: ({ day }) => renderCalendarDay(day.date),
                        }}
                      />
                    )}

                    {selectedDates.length > 0 && (
                      <Alert className="border-orange-200">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <AlertDescription className="text-orange-800">
                          {selectedDates.length} date(s) selected. Use the buttons above to add availability or block
                          dates.
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Legend */}
                <Card className="border-orange-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Calendar Legend</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                      <span className="text-sm text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                      <span className="text-sm text-gray-600">Booked</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                      <span className="text-sm text-gray-600">Blocked</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 bg-orange-600 rounded"></div>
                      <span className="text-sm text-gray-600">Selected</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="border-orange-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Available Days</span>
                      <span className="font-semibold text-green-600">{mockAvailabilityData.availableDates.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Booked Days</span>
                      <span className="font-semibold text-red-600">{mockBookings.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Blocked Days</span>
                      <span className="font-semibold text-gray-600">{mockAvailabilityData.blockedDates.length}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="border-orange-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-gray-900">Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{booking.customerName}</p>
                          <p className="text-xs text-gray-600">
                            {booking.date.toLocaleDateString()} - {booking.timeSlot}
                          </p>
                        </div>
                        <Badge
                          variant={booking.status === "confirmed" ? "default" : "secondary"}
                          className={booking.status === "confirmed" ? "bg-green-600 text-white" : ""}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Other tabs would continue here... */}
        </Tabs>

        {/* Add Availability Dialog */}
        <Dialog open={isAddingAvailability} onOpenChange={setIsAddingAvailability}>
          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Add Availability</DialogTitle>
              <DialogDescription className="text-gray-600">
                Set availability for {selectedDates.length} selected date(s)
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-700">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={availabilityForm.price}
                  onChange={(e) => setAvailabilityForm((prev) => ({ ...prev, price: e.target.value }))}
                  className="border-orange-200 focus:border-orange-400"
                />
              </div>

              {/* Time Slot Configuration */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-700">Time Slot Configuration</Label>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="custom-times" className="text-sm text-gray-600">
                      Use Custom Times
                    </Label>
                    <Switch
                      id="custom-times"
                      checked={availabilityForm.useCustomTimes}
                      onCheckedChange={(checked) =>
                        setAvailabilityForm((prev) => ({ ...prev, useCustomTimes: checked }))
                      }
                    />
                  </div>
                </div>

                {!availabilityForm.useCustomTimes ? (
                  // Predefined Time Slots
                  <div className="grid grid-cols-1 gap-2">
                    {timeSlotOptions.map((slot) => (
                      <div key={slot} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={slot}
                          checked={availabilityForm.timeSlots.includes(slot)}
                          onChange={() => handleTimeSlotToggle(slot)}
                          className="rounded border-orange-300 text-orange-600 focus:ring-orange-500"
                        />
                        <Label htmlFor={slot} className="text-sm text-gray-700">
                          {slot}
                        </Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Custom Time Slots
                  <div className="space-y-4">
                    {/* Add Custom Time Slot Form */}
                    <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                      <h4 className="text-sm font-medium text-gray-900 mb-3">Add Custom Time Slot</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <Label htmlFor="slot-name" className="text-xs text-gray-600">
                            Slot Name
                          </Label>
                          <Input
                            id="slot-name"
                            placeholder="e.g., Lunch Session"
                            value={customTimeForm.name}
                            onChange={(e) => setCustomTimeForm((prev) => ({ ...prev, name: e.target.value }))}
                            className="border-orange-200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="start-time" className="text-xs text-gray-600">
                            Start Time
                          </Label>
                          <Input
                            id="start-time"
                            type="time"
                            value={customTimeForm.startTime}
                            onChange={(e) => setCustomTimeForm((prev) => ({ ...prev, startTime: e.target.value }))}
                            className="border-orange-200"
                          />
                        </div>
                        <div>
                          <Label htmlFor="end-time" className="text-xs text-gray-600">
                            End Time
                          </Label>
                          <Input
                            id="end-time"
                            type="time"
                            value={customTimeForm.endTime}
                            onChange={(e) => setCustomTimeForm((prev) => ({ ...prev, endTime: e.target.value }))}
                            className="border-orange-200"
                          />
                        </div>
                      </div>
                      <Button
                        type="button"
                        onClick={handleAddCustomTimeSlot}
                        size="sm"
                        className="mt-3 bg-orange-600 hover:bg-orange-700 text-white"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Time Slot
                      </Button>
                    </div>

                    {/* Custom Time Slots List */}
                    {availabilityForm.customTimeSlots.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-700">Custom Time Slots</Label>
                        {availabilityForm.customTimeSlots.map((slot) => (
                          <div
                            key={slot.id}
                            className="flex items-center justify-between p-3 bg-white border border-orange-200 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <Clock className="w-4 h-4 text-orange-600" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{slot.name}</p>
                                <p className="text-xs text-gray-600">
                                  {slot.startTime} - {slot.endTime}
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveCustomTimeSlot(slot.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-gray-700">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={availabilityForm.notes}
                  onChange={(e) => setAvailabilityForm((prev) => ({ ...prev, notes: e.target.value }))}
                  className="border-orange-200 focus:border-orange-400"
                  rows={3}
                  placeholder="Add any special notes or requirements..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddingAvailability(false)}
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                Cancel
              </Button>
              <Button onClick={handleSaveAvailability} className="bg-green-600 hover:bg-green-700 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Availability
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Block Dates Dialog */}
        <Dialog open={isBlockingDates} onOpenChange={setIsBlockingDates}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle className="text-gray-900">Block Dates</DialogTitle>
              <DialogDescription className="text-gray-600">
                Block {selectedDates.length} selected date(s) from booking
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="blockType" className="text-gray-700">
                  Block Type
                </Label>
                <Select
                  value={blockingForm.type}
                  onValueChange={(value: "blocked" | "maintenance" | "booked") =>
                    setBlockingForm((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger className="border-orange-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blocked">Blocked</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="booked">Private Booking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason" className="text-gray-700">
                  Reason
                </Label>
                <Input
                  id="reason"
                  value={blockingForm.reason}
                  onChange={(e) => setBlockingForm((prev) => ({ ...prev, reason: e.target.value }))}
                  placeholder="Enter reason for blocking"
                  className="border-orange-200 focus:border-orange-400"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsBlockingDates(false)}
                className="border-orange-200 text-orange-700 hover:bg-orange-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBlockDates}
                variant="destructive"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <X className="w-4 h-4 mr-2" />
                Block Dates
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
