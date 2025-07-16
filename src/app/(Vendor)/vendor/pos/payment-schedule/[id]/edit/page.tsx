"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Trash2, CheckCircle, Send } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API call
const mockPaymentSchedule = {
  id: "1",
  bookingId: "booking-123",
  customer: "John Doe",
  dueDate: "2024-01-20",
  amount: "500.00",
  description: "Wedding photography - Final payment",
  status: "Pending",
  reminderSent: false,
  lastReminderDate: null,
  transactionId: null,
}

export default function EditPaymentSchedulePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    bookingId: "",
    dueDate: "",
    amount: "",
    description: "",
    status: "Pending",
  })

  const [scheduleInfo, setScheduleInfo] = useState({
    customer: "",
    reminderSent: false,
    lastReminderDate: null as string | null,
    transactionId: null as string | null,
  })

  useEffect(() => {
    // Load payment schedule data
    setFormData({
      bookingId: mockPaymentSchedule.bookingId,
      dueDate: mockPaymentSchedule.dueDate,
      amount: mockPaymentSchedule.amount,
      description: mockPaymentSchedule.description,
      status: mockPaymentSchedule.status,
    })
    setScheduleInfo({
      customer: mockPaymentSchedule.customer,
      reminderSent: mockPaymentSchedule.reminderSent,
      lastReminderDate: mockPaymentSchedule.lastReminderDate,
      transactionId: mockPaymentSchedule.transactionId,
    })
  }, [params.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form updated:", formData)
    // Redirect to payment schedule page
    router.push("/payment-schedule")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this payment schedule?")) {
      // Handle deletion here
      console.log("Payment schedule deleted:", params.id)
      router.push("/payment-schedule")
    }
  }

  const handleMarkAsPaid = () => {
    if (confirm("Mark this payment as paid?")) {
      // Handle marking as paid
      console.log("Payment marked as paid:", params.id)
      setFormData((prev) => ({ ...prev, status: "Paid" }))
    }
  }

  const handleSendReminder = () => {
    if (confirm("Send payment reminder to customer?")) {
      // Handle sending reminder
      console.log("Reminder sent for:", params.id)
      setScheduleInfo((prev) => ({
        ...prev,
        reminderSent: true,
        lastReminderDate: new Date().toISOString().split("T")[0],
      }))
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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

  const isOverdue = new Date(formData.dueDate) < new Date() && formData.status !== "Paid"

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/vendor/pos/payment-schedule">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Payment Schedule</h1>
          <p className="text-gray-600">Update payment schedule details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Payment Schedule Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bookingId">Booking ID</Label>
                  <Input
                    id="bookingId"
                    value={formData.bookingId}
                    onChange={(e) => handleInputChange("bookingId", e.target.value)}
                    placeholder="Enter booking ID"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange("dueDate", e.target.value)}
                      required
                      className={isOverdue ? "border-red-300 focus:border-red-500" : ""}
                    />
                    {isOverdue && <p className="text-sm text-red-600">This payment is overdue</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount}
                      onChange={(e) => handleInputChange("amount", e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Enter payment description"
                    rows={3}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                    <Save className="h-4 w-4 mr-2" />
                    Update Payment Schedule
                  </Button>
                  <Button type="button" variant="destructive" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <Link href="/vendor/pos/payment-schedule">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          {/* Payment Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Payment Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Current Status:</span>
                <Badge className={getStatusColor(formData.status)}>{formData.status}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Customer:</span>
                <span className="font-medium">{scheduleInfo.customer}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Amount:</span>
                <span className="font-medium text-lg">${formData.amount}</span>
              </div>

              {isOverdue && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800 font-medium">Payment Overdue</p>
                  <p className="text-xs text-red-600">This payment is past its due date</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {formData.status === "Pending" && (
                <Button onClick={handleMarkAsPaid} className="w-full bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Paid
                </Button>
              )}

              {formData.status !== "Paid" && (
                <Button onClick={handleSendReminder} variant="outline" className="w-full bg-transparent">
                  <Send className="h-4 w-4 mr-2" />
                  Send Reminder
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Reminder History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reminder History</CardTitle>
            </CardHeader>
            <CardContent>
              {scheduleInfo.reminderSent ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Reminder:</span>
                    <span className="text-sm font-medium">
                      {scheduleInfo.lastReminderDate
                        ? new Date(scheduleInfo.lastReminderDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <p className="text-xs text-green-600">✓ Reminder sent successfully</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No reminders sent yet</p>
              )}
            </CardContent>
          </Card>

          {/* Transaction Link */}
          {scheduleInfo.transactionId && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Linked Transaction</CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/vendor/pos/transactions/${scheduleInfo.transactionId}/edit`}
                  className="text-orange-600 hover:text-orange-700 text-sm"
                >
                  View Transaction #{scheduleInfo.transactionId}
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
