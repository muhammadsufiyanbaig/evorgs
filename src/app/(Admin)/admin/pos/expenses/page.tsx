"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, FileText, Download, ChevronLeft, ChevronRight, Eye } from "lucide-react"

const mockExpenses = [
    {
        id: "1",
        description: "Catering supplies for wedding event",
        amount: 150.0,
        category: "SUPPLIES",
        status: "APPROVED",
        expenseDate: "2024-01-10",
        vendor: { businessName: "Elite Catering Co." },
        booking: { id: "B001", eventType: "Wedding" },
    },
    {
        id: "2",
        description: "Equipment rental for corporate event",
        amount: 200.0,
        category: "EQUIPMENT",
        status: "PENDING",
        expenseDate: "2024-01-12",
        vendor: { businessName: "Premium Event Planners" },
        booking: { id: "B002", eventType: "Corporate Meeting" },
    },
    {
        id: "3",
        description: "Decorative flowers and arrangements",
        amount: 75.0,
        category: "SUPPLIES",
        status: "APPROVED",
        expenseDate: "2024-01-08",
        vendor: { businessName: "Bloom & Blossom" },
        booking: { id: "B003", eventType: "Birthday Party" },
    },
    {
        id: "4",
        description: "Photography equipment rental",
        amount: 300.0,
        category: "EQUIPMENT",
        status: "REJECTED",
        expenseDate: "2024-01-15",
        vendor: { businessName: "Photo Pro Rentals" },
        booking: { id: "B004", eventType: "Wedding" },
    },
    {
        id: "5",
        description: "Venue decoration materials",
        amount: 120.0,
        category: "SUPPLIES",
        status: "PENDING",
        expenseDate: "2024-01-14",
        vendor: { businessName: "Party Decorators Inc." },
        booking: { id: "B005", eventType: "Corporate Event" },
    },
]

const exportExpensesCSV = (expenses: any[]) => {
    const headers = ["ID", "Description", "Amount", "Category", "Status", "Date", "Vendor", "Event Type"]
    const csvContent = [
        headers.join(","),
        ...expenses.map((expense) =>
            [
                expense.id,
                `"${expense.description}"`,
                expense.amount,
                expense.category,
                expense.status,
                expense.expenseDate,
                `"${expense.vendor.businessName}"`,
                expense.booking.eventType,
            ].join(","),
        ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `expenses-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
}

const exportExpensesPDF = (expenses: any[]) => {
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Expenses Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background-color: #ffffff; color: #1a1a1a; }
                .header { color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 10px; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; background-color: #ffffff; }
                th, td { border: 1px solid #fed7aa; padding: 8px; text-align: left; font-size: 12px; }
                th { background-color: #ea580c; color: white; }
                .status-approved { background-color: #fed7aa; color: #ea580c; }
                .status-pending { background-color: #ffedd5; color: #c2410c; }
                .status-rejected { background-color: #fee2e2; color: #dc2626; }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Expenses Report</h1>
                <p>Generated on: ${new Date().toLocaleString()}</p>
                <p>Total Expenses: ${expenses.length}</p>
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Vendor</th>
                        <th>Event Type</th>
                    </tr>
                </thead>
                <tbody>
                    ${expenses
                        .map(
                            (expense) => `
                        <tr>
                            <td>${expense.id}</td>
                            <td>${expense.description}</td>
                            <td>$${expense.amount.toFixed(2)}</td>
                            <td>${expense.category}</td>
                            <td class="status-${expense.status.toLowerCase()}">${expense.status}</td>
                            <td>${expense.expenseDate}</td>
                            <td>${expense.vendor.businessName}</td>
                            <td>${expense.booking.eventType}</td>
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
        printWindow.onload = () => {
            printWindow.print()
            printWindow.close()
        }
    }
}

export default function ExpensesContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [categoryFilter, setCategoryFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Filter expenses based on search and filters
    const filteredExpenses = mockExpenses.filter((expense) => {
        const matchesSearch =
            expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.booking.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expense.id.includes(searchTerm)

        const matchesStatus = statusFilter === "all" || expense.status === statusFilter
        const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter

        return matchesSearch && matchesStatus && matchesCategory
    })

    // Pagination
    const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage)

    const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    const approvedAmount = filteredExpenses
        .filter((expense) => expense.status === "APPROVED")
        .reduce((sum, expense) => sum + expense.amount, 0)

    return (
        <div className="min-h-screen bg-white text-gray-900">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-orange-600">Expenses Management</h2>
                    <div className="flex items-center space-x-2">
                        <Button 
                            variant="outline" 
                            onClick={() => exportExpensesCSV(filteredExpenses)}
                            className="border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export CSV
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={() => exportExpensesPDF(filteredExpenses)}
                            className="border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Export PDF
                        </Button>
                    </div>
                </div>

                {/* Summary Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-orange-200 bg-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">Total Expenses</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">{filteredExpenses.length}</div>
                        </CardContent>
                    </Card>
                    <Card className="border-orange-200 bg-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">Total Amount</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-600">${totalAmount.toFixed(2)}</div>
                        </CardContent>
                    </Card>
                    <Card className="border-orange-200 bg-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">Approved Amount</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-500">${approvedAmount.toFixed(2)}</div>
                        </CardContent>
                    </Card>
                    <Card className="border-orange-200 bg-white">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-700">Pending Approval</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-400">
                                {filteredExpenses.filter((expense) => expense.status === "PENDING").length}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Search and Filters */}
                <Card className="border-orange-200 bg-white">
                    <CardHeader>
                        <CardTitle className="flex items-center text-orange-600">
                            <Filter className="mr-2 h-5 w-5" />
                            Search & Filters
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-orange-400" />
                                    <Input
                                        placeholder="Search expenses, vendors, or event types..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-8 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[180px] border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                    <SelectValue placeholder="Filter by status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-orange-200">
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="APPROVED">Approved</SelectItem>
                                    <SelectItem value="PENDING">Pending</SelectItem>
                                    <SelectItem value="REJECTED">Rejected</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-full md:w-[180px] border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                    <SelectValue placeholder="Filter by category" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-orange-200">
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="SUPPLIES">Supplies</SelectItem>
                                    <SelectItem value="EQUIPMENT">Equipment</SelectItem>
                                    <SelectItem value="SERVICES">Services</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Expenses Table */}
                <Card className="border-orange-200 bg-white">
                    <CardHeader>
                        <CardTitle className="text-orange-600">Expenses List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="border-orange-200">
                                    <TableHead className="text-orange-700">ID</TableHead>
                                    <TableHead className="text-orange-700">Description</TableHead>
                                    <TableHead className="text-orange-700">Amount</TableHead>
                                    <TableHead className="text-orange-700">Category</TableHead>
                                    <TableHead className="text-orange-700">Status</TableHead>
                                    <TableHead className="text-orange-700">Date</TableHead>
                                    <TableHead className="text-orange-700">Vendor</TableHead>
                                    <TableHead className="text-orange-700">Event Type</TableHead>
                                    <TableHead className="text-orange-700">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedExpenses.map((expense) => (
                                    <TableRow key={expense.id} className="border-orange-100 hover:bg-orange-50">
                                        <TableCell className="font-medium text-orange-600">{expense.id}</TableCell>
                                        <TableCell className="max-w-[200px] truncate">{expense.description}</TableCell>
                                        <TableCell className="font-bold text-orange-600">${expense.amount.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="border-orange-300 text-orange-600">
                                                {expense.category}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                className={
                                                    expense.status === "APPROVED"
                                                        ? "bg-orange-100 text-orange-700 border-orange-300"
                                                        : expense.status === "PENDING"
                                                            ? "bg-orange-50 text-orange-600 border-orange-200"
                                                            : "bg-red-100 text-red-700 border-red-300"
                                                }
                                            >
                                                {expense.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{expense.expenseDate}</TableCell>
                                        <TableCell className="max-w-[150px] truncate">{expense.vendor.businessName}</TableCell>
                                        <TableCell>{expense.booking.eventType}</TableCell>
                                        <TableCell>
                                            <Link href={`/admin/pos/expenses/${expense.id}`}>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    className="border-orange-300 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                                                >
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        <div className="flex items-center justify-between space-x-2 py-4">
                            <div className="flex items-center space-x-2">
                                <p className="text-sm font-medium text-gray-700">Rows per page</p>
                                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                                    <SelectTrigger className="h-8 w-[70px] border-orange-200">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent side="top" className="bg-white border-orange-200">
                                        <SelectItem value="5">5</SelectItem>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex items-center space-x-6 lg:space-x-8">
                                <div className="flex w-[100px] items-center justify-center text-sm font-medium text-gray-700">
                                    Page {currentPage} of {totalPages}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0 bg-white border-orange-300 text-orange-600 hover:bg-orange-50"
                                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="h-8 w-8 p-0 bg-white border-orange-300 text-orange-600 hover:bg-orange-50"
                                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
