"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { ListCollapse, CalendarDays, PlusCircle, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { BookingTable } from "@/app/components/Vendor/booking/booking-table"
import { BookingCalendar } from "@/app/components/Vendor/Calendar/booking-calendar"
import { mockBookings } from "@/utils/data"
import type { Booking, BookingStatus, PaymentStatus } from "@/utils/interfaces"

export default function BookingsPage() {
  const router = useRouter()

  /* ----------------------------- Local state ----------------------------- */
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    paymentStatus: "all",
  })
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const [paymentOpen, setPaymentOpen] = useState(false)
  const [visitOpen, setVisitOpen] = useState(false)
  const [cancelOpen, setCancelOpen] = useState(false)

  const [statusUpdate, setStatusUpdate] = useState<BookingStatus>("Pending")
  const [paymentUpdate, setPaymentUpdate] = useState({ advance: 0, balance: 0 })
  const [visitDate, setVisitDate] = useState<Date | undefined>(new Date())
  const [cancellationReason, setCancellationReason] = useState("")

  /* ----------------------------- Computed ----------------------------- */
  const filteredBookings = useMemo(() => {
    return mockBookings.filter((b) => {
      const search = filters.search.toLowerCase()
      const searchMatch =
        !search ||
        b.bookingReference.toLowerCase().includes(search) ||
        b.userName.toLowerCase().includes(search) ||
        b.serviceName.toLowerCase().includes(search)
      const statusMatch = filters.status === "all" || b.status === filters.status
      const paymentMatch = filters.paymentStatus === "all" || b.paymentStatus === filters.paymentStatus
      return searchMatch && statusMatch && paymentMatch
    })
  }, [filters])

  /* ----------------------------- Helpers ----------------------------- */
  const openModal = (type: "detail" | "status" | "payment" | "visit" | "cancel", booking: Booking) => {
    setSelectedBooking(booking)
    if (type === "detail") setDetailOpen(true)
    if (type === "status") {
      setStatusUpdate(booking.status)
      setStatusOpen(true)
    }
    if (type === "payment") {
      setPaymentUpdate({ advance: booking.advanceAmount, balance: booking.balanceAmount })
      setPaymentOpen(true)
    }
    if (type === "visit") {
      setVisitDate(booking.visitScheduledFor ? new Date(booking.visitScheduledFor) : new Date())
      setVisitOpen(true)
    }
    if (type === "cancel") {
      setCancellationReason("")
      setCancelOpen(true)
    }
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

  const paymentBadge = (status: PaymentStatus) => {
    const map = {
      "Awaiting Advance": "bg-gray-100 text-gray-800 border-gray-200",
      "Advance Paid": "bg-orange-100 text-orange-800 border-orange-200",
      "Partially Paid": "bg-purple-100 text-purple-800 border-purple-200",
      "Fully Paid": "bg-green-100 text-green-800 border-green-200",
      Refunded: "bg-pink-100 text-pink-800 border-pink-200",
      Canceled: "bg-red-100 text-red-800 border-red-200",
    } as const
    return map[status]
  }

  /* -------------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-orange-50/50">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
            <p className="text-gray-600 mt-1">View and manage all your bookings in one place.</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/vendor/bookings/custom-orders")}
              className="bg-white border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              Custom Orders
            </Button>
            <Button
              onClick={() => router.push("/vendor/bookings/create")}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Booking
            </Button>
          </div>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-orange-200/50 p-1 rounded-lg">
            <TabsTrigger
              value="list"
              className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-md"
            >
              <ListCollapse className="w-4 h-4 mr-2" />
              List View
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-md"
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Calendar View
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list" className="mt-4">
            <BookingTable bookings={filteredBookings} openModal={openModal} />
          </TabsContent>
          <TabsContent value="calendar" className="mt-4 rounded-xl border bg-white overflow-hidden shadow-sm">
            <BookingCalendar bookings={filteredBookings} />
          </TabsContent>
        </Tabs>
      </div>

      {/* ---------- Modals ---------- */}
      {selectedBooking && (
        <>
          {/* Details */}
          <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Booking Details: {selectedBooking.bookingReference}</DialogTitle>
                <p className="text-sm text-muted-foreground">Customer: {selectedBooking.userName}</p>
              </DialogHeader>
              <div className="grid gap-4 py-4 text-sm">
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold">Service</span>
                  <span>
                    {selectedBooking.serviceName} ({selectedBooking.serviceType})
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold">Event Date</span>
                  <span>{new Date(selectedBooking.eventDate).toLocaleDateString()}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold">Guests</span>
                  <span>{selectedBooking.numberOfGuests}</span>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold">Total Amount</span>
                  <span>${selectedBooking.totalAmount.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold">Advance Paid</span>
                  <span>${selectedBooking.advanceAmount.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold">Balance Due</span>
                  <span>${selectedBooking.balanceAmount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold">Booking Status</span>
                  <span>
                    <Badge variant="outline" className={statusBadge(selectedBooking.status)}>
                      {selectedBooking.status}
                    </Badge>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <span className="font-semibold">Payment Status</span>
                  <span>
                    <Badge variant="outline" className={paymentBadge(selectedBooking.paymentStatus)}>
                      {selectedBooking.paymentStatus}
                    </Badge>
                  </span>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {/* Update Status */}
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

          {/* Payment */}
          <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Manage Payment</DialogTitle>
                <p className="text-sm text-muted-foreground">Total: ${selectedBooking.totalAmount.toFixed(2)}</p>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="advance">Advance Amount Paid</Label>
                  <Input
                    id="advance"
                    type="number"
                    value={paymentUpdate.advance}
                    onChange={(e) =>
                      setPaymentUpdate((p) => ({
                        ...p,
                        advance: Number(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="balance">Balance Amount Paid</Label>
                  <Input
                    id="balance"
                    type="number"
                    value={paymentUpdate.balance}
                    onChange={(e) =>
                      setPaymentUpdate((p) => ({
                        ...p,
                        balance: Number(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setPaymentOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setPaymentOpen(false)}>Update Payment</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Schedule Visit */}
          <Dialog open={visitOpen} onOpenChange={setVisitOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Schedule Site Visit</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center py-4">
                <Calendar mode="single" selected={visitDate} onSelect={setVisitDate} />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setVisitOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setVisitOpen(false)}>Schedule Visit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Cancel Booking */}
          <Dialog open={cancelOpen} onOpenChange={setCancelOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Booking: {selectedBooking.bookingReference}</DialogTitle>
                <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="reason">Reason for Cancellation</Label>
                <Input
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
        </>
      )}
    </div>
  )
}
