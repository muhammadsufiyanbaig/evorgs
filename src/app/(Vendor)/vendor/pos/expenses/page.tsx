"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Eye, Download } from "lucide-react"
import Link from "next/link"

// Mock data
const expenses = [
  {
    id: "1",
    bookingId: "booking-123",
    description: "Photography equipment rental",
    amount: 150.0,
    category: "Equipment",
    expenseDate: "2024-01-15",
    receiptUrl: "/receipt-1.pdf",
    customer: "John Doe",
  },
  {
    id: "2",
    bookingId: "booking-456",
    description: "Catering supplies",
    amount: 300.0,
    category: "Supplies",
    expenseDate: "2024-01-14",
    receiptUrl: "/receipt-2.pdf",
    customer: "Jane Smith",
  },
  {
    id: "3",
    bookingId: "booking-789",
    description: "Transportation costs",
    amount: 75.0,
    category: "Transportation",
    expenseDate: "2024-01-13",
    receiptUrl: null,
    customer: "Mike Johnson",
  },
  {
    id: "4",
    bookingId: "booking-101",
    description: "Venue decoration materials",
    amount: 200.0,
    category: "Decoration",
    expenseDate: "2024-01-12",
    receiptUrl: "/receipt-4.pdf",
    customer: "Alice Brown",
  },
]

const categories = ["All Categories", "Equipment", "Supplies", "Transportation", "Decoration", "Marketing", "Other"]

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    Equipment: "bg-blue-100 text-blue-800",
    Supplies: "bg-green-100 text-green-800",
    Transportation: "bg-purple-100 text-purple-800",
    Decoration: "bg-pink-100 text-pink-800",
    Marketing: "bg-yellow-100 text-yellow-800",
    Other: "bg-gray-100 text-gray-800",
  }
  return colors[category] || "bg-gray-100 text-gray-800"
}

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [dateFilter, setDateFilter] = useState("all")

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "All Categories" || expense.category === categoryFilter

    let matchesDate = true
    if (dateFilter !== "all") {
      const expenseDate = new Date(expense.expenseDate)
      const today = new Date()

      switch (dateFilter) {
        case "today":
          matchesDate = expenseDate.toDateString() === today.toDateString()
          break
        case "week":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
          matchesDate = expenseDate >= weekAgo
          break
        case "month":
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
          matchesDate = expenseDate >= monthAgo
          break
      }
    }

    return matchesSearch && matchesCategory && matchesDate
  })

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600">Track and manage your business expenses</p>
        </div>
        <Link href="/vendor/pos/expenses/new">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="h-4 w-4 mr-2" />
            New Expense
          </Button>
        </Link>
      </div>

      {/* Summary Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Expenses (Filtered)</p>
              <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-xl font-semibold">{filteredExpenses.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Last Week</SelectItem>
                <SelectItem value="month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Expenses ({filteredExpenses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Receipt</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell className="font-medium">{expense.description}</TableCell>
                    <TableCell>{expense.customer}</TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(expense.category)}>{expense.category}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">${expense.amount.toFixed(2)}</TableCell>
                    <TableCell>{new Date(expense.expenseDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {expense.receiptUrl ? (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      ) : (
                        <span className="text-gray-400 text-sm">No receipt</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link href={`/expenses/${expense.id}/edit`}>
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
