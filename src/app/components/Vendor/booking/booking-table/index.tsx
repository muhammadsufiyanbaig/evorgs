"use client"

import Link from "next/link"
import { MoreHorizontal, Eye, DollarSign, CalendarCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Booking, BookingStatus, PaymentStatus } from "@/utils/interfaces"

interface BookingTableProps {
  bookings: Booking[]
  openModal: (type: "detail" | "status" | "payment" | "visit" | "cancel", booking: Booking) => void
}

export function BookingTable({ bookings, openModal }: BookingTableProps) {
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

  return (
    <Card className="border-orange-200 bg-white">
      <CardHeader>
        <CardTitle>All Bookings</CardTitle>
        <CardDescription>A list of bookings from your customers.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Event Date</TableHead>
                <TableHead className="text-center">Payment Status</TableHead>
                <TableHead className="text-center">Booking Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>
                    <div className="font-medium">{b.userName}</div>
                    <div className="text-sm text-gray-500">{b.bookingReference}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{b.serviceName}</div>
                    <div className="text-sm text-gray-500">{b.serviceType}</div>
                  </TableCell>
                  <TableCell>{new Date(b.eventDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={paymentBadge(b.paymentStatus)}>
                      {b.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={statusBadge(b.status)}>
                      {b.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/vendor/bookings/${b.id}`}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/vendor/bookings/${b.id}/payment`}>
                            <DollarSign className="mr-2 h-4 w-4" /> Manage Payment
                          </Link>
                        </DropdownMenuItem>
                        {b.visitRequested && (
                          <DropdownMenuItem asChild>
                            <Link href={`/vendor/bookings/${b.id}/visit`}>
                              <CalendarCheck className="mr-2 h-4 w-4" /> Schedule Visit
                            </Link>
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
