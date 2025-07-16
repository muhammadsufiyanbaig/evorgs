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
import { ArrowLeft, Save, Trash2 } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API call
const mockTransaction = {
  id: "1",
  bookingId: "booking-123",
  userId: "user-456",
  amount: "250.00",
  transactionType: "Full Payment",
  paymentMethod: "Credit Card",
  description: "Wedding photography service",
  receiptNumber: "RCP-001",
  paymentGatewayReference: "stripe_pi_123456",
}

export default function EditTransactionPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    bookingId: "",
    userId: "",
    amount: "",
    transactionType: "",
    paymentMethod: "",
    description: "",
    receiptNumber: "",
    paymentGatewayReference: "",
  })

  useEffect(() => {
    // Load transaction data
    setFormData(mockTransaction)
  }, [params.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form updated:", formData)
    // Redirect to transactions page
    router.push("/transactions")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      // Handle deletion here
      console.log("Transaction deleted:", params.id)
      router.push("/transactions")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/vendor/pos/transactions">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Transaction</h1>
          <p className="text-gray-600">Update transaction details</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="userId">Customer ID</Label>
                <Input
                  id="userId"
                  value={formData.userId}
                  onChange={(e) => handleInputChange("userId", e.target.value)}
                  placeholder="Enter customer ID"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="transactionType">Transaction Type</Label>
                <Select
                  value={formData.transactionType}
                  onValueChange={(value) => handleInputChange("transactionType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Advance">Advance</SelectItem>
                    <SelectItem value="Balance">Balance</SelectItem>
                    <SelectItem value="Full Payment">Full Payment</SelectItem>
                    <SelectItem value="Refund">Refund</SelectItem>
                    <SelectItem value="Additional Service">Additional Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Debit Card">Debit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Mobile Payment">Mobile Payment</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiptNumber">Receipt Number</Label>
                <Input
                  id="receiptNumber"
                  value={formData.receiptNumber}
                  onChange={(e) => handleInputChange("receiptNumber", e.target.value)}
                  placeholder="Enter receipt number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter transaction description"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentGatewayReference">Payment Gateway Reference</Label>
              <Input
                id="paymentGatewayReference"
                value={formData.paymentGatewayReference}
                onChange={(e) => handleInputChange("paymentGatewayReference", e.target.value)}
                placeholder="Enter gateway reference (optional)"
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                <Save className="h-4 w-4 mr-2" />
                Update Transaction
              </Button>
              <Button type="button" variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Link href="/vendor/pos/transactions">
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
