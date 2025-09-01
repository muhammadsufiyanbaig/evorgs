"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Search,
    Filter,
    Download,
    FileText,
    Calendar,
    Eye,
    ChevronLeft,
    ChevronRight,
    CreditCard,
    ArrowUpDown,
} from "lucide-react"

const mockVendorTransactions = [
    {
        id: "1",
        transactionNumber: "TXN-001",
        amount: 250.0,
        transactionType: "PAYMENT",
        paymentMethod: "CREDIT_CARD",
        status: "COMPLETED",
        createdAt: "2024-01-15T10:30:00Z",
        vendor: { id: "1", businessName: "Elite Catering Co.", email: "contact@elitecatering.com" },
        booking: { id: "B001", eventDate: "2024-02-01", totalAmount: 1500.0, bookingStatus: "CONFIRMED" },
        user: { firstName: "John", lastName: "Doe", email: "john@example.com" },
    },
    {
        id: "2",
        transactionNumber: "TXN-002",
        amount: 75.5,
        transactionType: "EXPENSE",
        paymentMethod: "BANK_TRANSFER",
        status: "PENDING",
        createdAt: "2024-01-14T14:20:00Z",
        vendor: { id: "2", businessName: "Premium Event Planners", email: "info@premiuevents.com" },
        booking: { id: "B002", eventDate: "2024-01-30", totalAmount: 800.0, bookingStatus: "CONFIRMED" },
        user: { firstName: "Jane", lastName: "Smith", email: "jane@example.com" },
    },
    {
        id: "3",
        transactionNumber: "TXN-003",
        amount: 450.0,
        transactionType: "PAYMENT",
        paymentMethod: "PAYPAL",
        status: "COMPLETED",
        createdAt: "2024-01-13T09:15:00Z",
        vendor: { id: "3", businessName: "Budget Supplies Inc.", email: "sales@budgetsupplies.com" },
        booking: { id: "B003", eventDate: "2024-02-15", totalAmount: 2200.0, bookingStatus: "PENDING" },
        user: { firstName: "Mike", lastName: "Johnson", email: "mike@example.com" },
    },
    {
        id: "4",
        transactionNumber: "TXN-004",
        amount: 125.0,
        transactionType: "REFUND",
        paymentMethod: "CREDIT_CARD",
        status: "PROCESSING",
        createdAt: "2024-01-12T16:45:00Z",
        vendor: { id: "1", businessName: "Elite Catering Co.", email: "contact@elitecatering.com" },
        booking: { id: "B004", eventDate: "2024-01-25", totalAmount: 950.0, bookingStatus: "CANCELLED" },
        user: { firstName: "Sarah", lastName: "Brown", email: "sarah@example.com" },
    },
    {
        id: "5",
        transactionNumber: "TXN-005",
        amount: 320.0,
        transactionType: "EXPENSE",
        paymentMethod: "CASH",
        status: "COMPLETED",
        createdAt: "2024-01-11T11:20:00Z",
        vendor: { id: "4", businessName: "Fresh Food Distributors", email: "orders@freshfood.com" },
        booking: { id: "B005", eventDate: "2024-02-10", totalAmount: 1800.0, bookingStatus: "CONFIRMED" },
        user: { firstName: "David", lastName: "Wilson", email: "david@example.com" },
    },
]

const exportToPDF = (data: any[], filename: string) => {
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${filename}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background-color: #ffffff; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #fed7aa; padding: 8px; text-align: left; }
                th { background-color: #f97316; color: white; }
                h1 { color: #f97316; }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <h1>Transactions Report</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <table>
                <thead>
                    <tr>
                        <th>Transaction #</th>
                        <th>Vendor</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Method</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${data
                        .map(
                            (transaction) => `
                        <tr>
                            <td>${transaction.transactionNumber}</td>
                            <td>${transaction.vendor.businessName}</td>
                            <td>$${transaction.amount.toFixed(2)}</td>
                            <td>${transaction.transactionType}</td>
                            <td>${transaction.paymentMethod}</td>
                            <td>${transaction.status}</td>
                            <td>${new Date(transaction.createdAt).toLocaleDateString()}</td>
                        </tr>
                    `,
                        )
                        .join("")}
                </tbody>
            </table>
        </body>
        </html>
    `

    const printWindow = window.open("", "_blank")
    if (printWindow) {
        printWindow.document.write(content)
        printWindow.document.close()
        printWindow.focus()

        // Wait for content to load then print
        printWindow.onload = () => {
            printWindow.print()
            printWindow.close()
        }
    }
}

const exportToCSV = (data: any[], filename: string) => {
    const headers = ["Transaction #", "Vendor", "Amount", "Type", "Method", "Status", "Date", "Customer"]
    const csvContent = [
        headers.join(","),
        ...data.map((transaction) =>
            [
                `"${transaction.transactionNumber}"`,
                `"${transaction.vendor.businessName}"`,
                transaction.amount,
                transaction.transactionType,
                transaction.paymentMethod,
                transaction.status,
                `"${new Date(transaction.createdAt).toLocaleDateString()}"`,
                `"${transaction.user.firstName} ${transaction.user.lastName}"`,
            ].join(","),
        ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}.csv`
    a.click()
    URL.revokeObjectURL(url)
}

export default function TransactionsContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [typeFilter, setTypeFilter] = useState("all")
    const [dateFilter, setDateFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [sortField, setSortField] = useState<string | null>(null)
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")
    const itemsPerPage = 4

    const filteredTransactions = mockVendorTransactions.filter((transaction) => {
        const matchesSearch =
            transaction.transactionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.user.lastName.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
        const matchesType = typeFilter === "all" || transaction.transactionType === typeFilter

        let matchesDate = true
        if (dateFilter !== "all") {
            const transactionDate = new Date(transaction.createdAt)
            const now = new Date()

            switch (dateFilter) {
                case "today":
                    matchesDate = transactionDate.toDateString() === now.toDateString()
                    break
                case "week":
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                    matchesDate = transactionDate >= weekAgo
                    break
                case "month":
                    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
                    matchesDate = transactionDate >= monthAgo
                    break
                case "quarter":
                    const quarterAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
                    matchesDate = transactionDate >= quarterAgo
                    break
            }
        }

        return matchesSearch && matchesStatus && matchesType && matchesDate
    })

    // Sorting logic
    const sortedTransactions = [...filteredTransactions].sort((a, b) => {
        if (!sortField) return 0

        let aValue: any = a[sortField as keyof typeof a]
        let bValue: any = b[sortField as keyof typeof b]

        if (sortField === "amount") {
            aValue = Number.parseFloat(aValue)
            bValue = Number.parseFloat(bValue)
        } else if (sortField === "createdAt") {
            aValue = new Date(aValue)
            bValue = new Date(bValue)
        } else if (typeof aValue === "string") {
            aValue = aValue.toLowerCase()
            bValue = bValue.toLowerCase()
        }

        if (sortDirection === "asc") {
            return aValue > bValue ? 1 : -1
        } else {
            return aValue < bValue ? 1 : -1
        }
    })

    // Pagination logic
    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + itemsPerPage)

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("desc")
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
            <div className="space-y-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-orange-600">Vendor Transactions</h2>
                    <div className="flex items-center space-x-2">
                        <Button 
                            variant="outline" 
                            onClick={() => exportToCSV(filteredTransactions, "transactions-report")}
                            className="border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Export CSV
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={() => exportToPDF(filteredTransactions, "transactions-report")}
                            className="border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export PDF
                        </Button>
                    </div>
                </div>

                {/* Search and Filter Controls */}
                <div className="flex items-center space-x-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
                        <Input
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[150px] border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                            <Filter className="mr-2 h-4 w-4 text-orange-500" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent className="border-orange-200">
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="COMPLETED">Completed</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                            <SelectItem value="PROCESSING">Processing</SelectItem>
                            <SelectItem value="FAILED">Failed</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                        <SelectTrigger className="w-[150px] border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                            <CreditCard className="mr-2 h-4 w-4 text-orange-500" />
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent className="border-orange-200">
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="PAYMENT">Payment</SelectItem>
                            <SelectItem value="EXPENSE">Expense</SelectItem>
                            <SelectItem value="REFUND">Refund</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="w-[150px] border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                            <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                            <SelectValue placeholder="Date" />
                        </SelectTrigger>
                        <SelectContent className="border-orange-200">
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="quarter">This Quarter</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Results Summary */}
                <div className="flex items-center justify-between text-sm text-orange-600">
                    <span>
                        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedTransactions.length)} of{" "}
                        {sortedTransactions.length} transactions
                    </span>
                    <span className="font-semibold">Total: ${sortedTransactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}</span>
                </div>

                {/* Transactions Table */}
                <Card className="border-orange-200 shadow-lg">
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-orange-500 hover:bg-orange-600">
                                    <TableHead className="text-white">
                                        <Button variant="ghost" onClick={() => handleSort("transactionNumber")} className="h-auto p-0 text-white hover:bg-orange-600">
                                            Transaction #
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead className="text-white">
                                        <Button variant="ghost" onClick={() => handleSort("vendor")} className="h-auto p-0 text-white hover:bg-orange-600">
                                            Vendor
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead className="text-white">
                                        <Button variant="ghost" onClick={() => handleSort("amount")} className="h-auto p-0 text-white hover:bg-orange-600">
                                            Amount
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead className="text-white">Type</TableHead>
                                    <TableHead className="text-white">Method</TableHead>
                                    <TableHead className="text-white">Status</TableHead>
                                    <TableHead className="text-white">
                                        <Button variant="ghost" onClick={() => handleSort("createdAt")} className="h-auto p-0 text-white hover:bg-orange-600">
                                            Date
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead className="text-white">Customer</TableHead>
                                    <TableHead className="text-white">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedTransactions.map((transaction, index) => (
                                    <TableRow key={transaction.id} className={index % 2 === 0 ? "bg-orange-25" : "bg-white"}>
                                        <TableCell className="font-medium text-orange-700">{transaction.transactionNumber}</TableCell>
                                        <TableCell className="text-gray-700">{transaction.vendor.businessName}</TableCell>
                                        <TableCell className="font-medium text-orange-600">${transaction.amount.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    transaction.transactionType === "PAYMENT"
                                                        ? "default"
                                                        : transaction.transactionType === "EXPENSE"
                                                            ? "secondary"
                                                            : "outline"
                                                }
                                                className={
                                                    transaction.transactionType === "PAYMENT"
                                                        ? "bg-orange-500 text-white"
                                                        : transaction.transactionType === "EXPENSE"
                                                            ? "bg-orange-200 text-orange-800"
                                                            : "border-orange-300 text-orange-600"
                                                }
                                            >
                                                {transaction.transactionType}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-gray-700">{transaction.paymentMethod.replace("_", " ")}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    transaction.status === "COMPLETED"
                                                        ? "default"
                                                        : transaction.status === "PENDING"
                                                            ? "secondary"
                                                            : transaction.status === "PROCESSING"
                                                                ? "outline"
                                                                : "destructive"
                                                }
                                                className={
                                                    transaction.status === "COMPLETED"
                                                        ? "bg-green-500 text-white"
                                                        : transaction.status === "PENDING"
                                                            ? "bg-yellow-200 text-yellow-800"
                                                            : transaction.status === "PROCESSING"
                                                                ? "border-orange-300 text-orange-600"
                                                                : "bg-red-500 text-white"
                                                }
                                            >
                                                {transaction.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-gray-700">{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-gray-700">
                                            {transaction.user.firstName} {transaction.user.lastName}
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/admin/pos/transactions/${transaction.id}`}>
                                                <Button variant="ghost" size="icon" title="View Details" className="text-orange-600 hover:bg-orange-100">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="border-orange-300 text-orange-600 hover:bg-orange-50 disabled:opacity-50"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </Button>
                            <div className="flex items-center space-x-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                        className={
                                            currentPage === page
                                                ? "w-8 h-8 p-0 bg-orange-500 text-white hover:bg-orange-600"
                                                : "w-8 h-8 p-0 border-orange-300 text-orange-600 hover:bg-orange-50"
                                        }
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="border-orange-300 text-orange-600 hover:bg-orange-50 disabled:opacity-50"
                            >
                                Next
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                        <span className="text-sm text-orange-600">
                            Page {currentPage} of {totalPages}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
