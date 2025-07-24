"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function NewPaymentSchedulePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    bookingId: "",
    dueDate: "",
    amount: "",
    description: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
    // Redirect to payment schedule page
    router.push("/payment-schedule")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

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
          <h1 className="text-2xl font-bold text-gray-900">New Payment Schedule</h1>
          <p className="text-gray-600">Create a new payment schedule</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
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
                />
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
                Create Payment Schedule
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
  )
}
