"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Eye } from "lucide-react"
import Link from "next/link"

// Mock data
const transactions = [
  {
    id: "1",
    transactionNumber: "TXN-001",
    amount: 250.0,
    transactionType: "Full Payment",
    paymentMethod: "Credit Card",
    status: "Completed",
    customer: "John Doe",
    createdAt: "2024-01-15T10:30:00Z",
    description: "Wedding photography service",
  },
  {
    id: "2",
    transactionNumber: "TXN-002",
    amount: 150.0,
    transactionType: "Advance",
    paymentMethod: "Cash",
    status: "Completed",
    customer: "Jane Smith",
    createdAt: "2024-01-15T09:15:00Z",
    description: "Event planning advance payment",
  },
  {
    id: "3",
    transactionNumber: "TXN-003",
    amount: 300.0,
    transactionType: "Balance",
    paymentMethod: "Bank Transfer",
    status: "Pending",
    customer: "Mike Johnson",
    createdAt: "2024-01-14T16:45:00Z",
    description: "Catering service balance",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800"
    case "Pending":
      return "bg-yellow-100 text-yellow-800"
    case "Failed":
      return "bg-red-100 text-red-800"
    case "Disputed":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "Full Payment":
      return "bg-blue-100 text-blue-800"
    case "Advance":
      return "bg-orange-100 text-orange-800"
    case "Balance":
      return "bg-indigo-100 text-indigo-800"
    case "Refund":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.transactionType === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
          <p className="text-gray-600">Manage all your payment transactions</p>
        </div>
        <Link href="/vendor/pos/transactions/new">
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
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
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Disputed">Disputed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full Payment">Full Payment</SelectItem>
                <SelectItem value="Advance">Advance</SelectItem>
                <SelectItem value="Balance">Balance</SelectItem>
                <SelectItem value="Refund">Refund</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.transactionNumber}</TableCell>
                    <TableCell>{transaction.customer}</TableCell>
                    <TableCell className="font-medium">${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(transaction.transactionType)}>{transaction.transactionType}</Badge>
                    </TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>{transaction.status}</Badge>
                    </TableCell>
                    <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Link href={`/vendor/pos/transactions/${transaction.id}/edit`}>
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
