"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, CheckCircle, Send, AlertTriangle } from "lucide-react"
import Link from "next/link"

// Mock data
const paymentSchedules = [
  {
    id: "1",
    bookingId: "booking-123",
    customer: "John Doe",
    dueDate: "2024-01-20",
    amount: 500.0,
    description: "Wedding photography - Final payment",
    status: "Pending",
    reminderSent: false,
    lastReminderDate: null,
  },
  {
    id: "2",
    bookingId: "booking-456",
    customer: "Jane Smith",
    dueDate: "2024-01-22",
    amount: 750.0,
    description: "Event planning - Balance payment",
    status: "Pending",
    reminderSent: true,
    lastReminderDate: "2024-01-18",
  },
  {
    id: "3",
    bookingId: "booking-789",
    customer: "Mike Johnson",
    dueDate: "2024-01-18",
    amount: 300.0,
    description: "Catering service - Overdue payment",
    status: "Overdue",
    reminderSent: true,
    lastReminderDate: "2024-01-19",
  },
  {
    id: "4",
    bookingId: "booking-101",
    customer: "Alice Brown",
    dueDate: "2024-01-15",
    amount: 400.0,
    description: "Photography session - Completed",
    status: "Paid",
    reminderSent: false,
    lastReminderDate: null,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-800"
    case "Pending":
      return "bg-yellow-100 text-yellow-800"
    case "Overdue":
      return "bg-red-100 text-red-800"
    case "Canceled":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const isOverdue = (dueDate: string) => {
  return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString()
}

export default function PaymentSchedulePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSchedules = paymentSchedules.filter((schedule) => {
    const matchesSearch =
      schedule.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      schedule.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || schedule.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleMarkAsPaid = (id: string) => {
    console.log("Mark as paid:", id)
    // Handle marking payment as paid
  }

  const handleSendReminder = (id: string) => {
    console.log("Send reminder:", id)
    // Handle sending reminder
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Schedule</h1>
          <p className="text-gray-600">Manage payment schedules and due dates</p>
        </div>
        <Link href="/vendor/pos/payment-schedule/new">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="h-4 w-4 mr-2" />
            New Payment Schedule
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pending</p>
                <p className="text-2xl font-bold">
                  $
                  {paymentSchedules
                    .filter((p) => p.status === "Pending")
                    .reduce((sum, p) => sum + p.amount, 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">
                  {paymentSchedules.filter((p) => p.status === "Overdue").length}
                </p>
              </div>
              <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-2xl font-bold">
                  {
                    paymentSchedules.filter((p) => {
                      const dueDate = new Date(p.dueDate)
                      const today = new Date()
                      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                      return dueDate >= today && dueDate <= weekFromNow
                    }).length
                  }
                </p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {paymentSchedules.filter((p) => p.status === "Paid").length}
                </p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
                <SelectItem value="Canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payment Schedule Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Schedules ({filteredSchedules.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reminder</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSchedules.map((schedule) => (
                  <TableRow
                    key={schedule.id}
                    className={isOverdue(schedule.dueDate) && schedule.status !== "Paid" ? "bg-red-50" : ""}
                  >
                    <TableCell className="font-medium">{schedule.customer}</TableCell>
                    <TableCell>{schedule.description}</TableCell>
                    <TableCell>
                      <div
                        className={
                          isOverdue(schedule.dueDate) && schedule.status !== "Paid" ? "text-red-600 font-medium" : ""
                        }
                      >
                        {new Date(schedule.dueDate).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">${schedule.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(schedule.status)}>{schedule.status}</Badge>
                    </TableCell>
                    <TableCell>
                      {schedule.reminderSent ? (
                        <span className="text-sm text-gray-600">
                          Sent{" "}
                          {schedule.lastReminderDate ? new Date(schedule.lastReminderDate).toLocaleDateString() : ""}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">Not sent</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {schedule.status === "Pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsPaid(schedule.id)}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        )}
                        {schedule.status !== "Paid" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSendReminder(schedule.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        )}
                        <Link href={`/payment-schedule/${schedule.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
