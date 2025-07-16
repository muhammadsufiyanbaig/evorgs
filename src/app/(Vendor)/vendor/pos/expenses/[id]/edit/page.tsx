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
const mockExpense = {
  id: "1",
  bookingId: "booking-123",
  description: "Photography equipment rental",
  amount: "150.00",
  category: "Equipment",
  expenseDate: "2024-01-15",
  receiptUrl: "/receipt-1.pdf",
}

export default function EditExpensePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    bookingId: "",
    description: "",
    amount: "",
    category: "",
    expenseDate: "",
    receiptFile: null as File | null,
    existingReceiptUrl: "",
  })

  useEffect(() => {
    // Load expense data
    setFormData({
      ...mockExpense,
      receiptFile: null,
      existingReceiptUrl: mockExpense.receiptUrl,
    })
  }, [params.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form updated:", formData)
    // Redirect to expenses page
    router.push("/expenses")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this expense?")) {
      // Handle deletion here
      console.log("Expense deleted:", params.id)
      router.push("/expenses")
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, receiptFile: file }))
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link href="/vendor/pos/expenses">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Expense</h1>
          <p className="text-gray-600">Update expense details</p>
        </div>
      </div>

      {/* Form */}
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Expense Details</CardTitle>
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

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter expense description"
                rows={3}
                required
              />
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
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                    <SelectItem value="Supplies">Supplies</SelectItem>
                    <SelectItem value="Transportation">Transportation</SelectItem>
                    <SelectItem value="Decoration">Decoration</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expenseDate">Expense Date</Label>
              <Input
                id="expenseDate"
                type="date"
                value={formData.expenseDate}
                onChange={(e) => handleInputChange("expenseDate", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="receipt">Receipt</Label>
              {formData.existingReceiptUrl && (
                <div className="mb-2">
                  <p className="text-sm text-gray-600">Current receipt:</p>
                  <Link
                    href={formData.existingReceiptUrl}
                    target="_blank"
                    className="text-orange-600 hover:text-orange-700 text-sm"
                  >
                    View existing receipt
                  </Link>
                </div>
              )}
              <div className="flex items-center gap-4">
                <Input
                  id="receipt"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                />
                {formData.receiptFile && <span className="text-sm text-gray-600">{formData.receiptFile.name}</span>}
              </div>
              <p className="text-sm text-gray-500">
                Upload a new receipt to replace the existing one. Supported formats: PDF, JPG, PNG (Max 5MB)
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                <Save className="h-4 w-4 mr-2" />
                Update Expense
              </Button>
              <Button type="button" variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
              <Link href="/vendor/pos/expenses">
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
