"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, Calendar, DollarSign, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"

// Mock data for payment schedules
const mockPaymentSchedules = [
    {
        id: "PS001",
        vendorId: "V001",
        vendorName: "Tech Solutions Inc",
        amount: 15000,
        dueDate: "2024-01-15",
        status: "pending",
        frequency: "monthly",
        description: "Software licensing payment",
        createdAt: "2024-01-01",
        nextPayment: "2024-02-15",
    },
    {
        id: "PS002",
        vendorId: "V002",
        vendorName: "Office Supplies Co",
        amount: 2500,
        dueDate: "2024-01-20",
        status: "paid",
        frequency: "weekly",
        description: "Office supplies recurring order",
        createdAt: "2024-01-01",
        nextPayment: "2024-01-27",
    },
    {
        id: "PS003",
        vendorId: "V003",
        vendorName: "Marketing Agency",
        amount: 8000,
        dueDate: "2024-01-10",
        status: "overdue",
        frequency: "monthly",
        description: "Digital marketing services",
        createdAt: "2023-12-15",
        nextPayment: "2024-02-10",
    },
    {
        id: "PS004",
        vendorId: "V001",
        vendorName: "Tech Solutions Inc",
        amount: 5000,
        dueDate: "2024-01-25",
        status: "pending",
        frequency: "quarterly",
        description: "Maintenance and support",
        createdAt: "2024-01-01",
        nextPayment: "2024-04-25",
    },
    {
        id: "PS005",
        vendorId: "V004",
        vendorName: "Logistics Partner",
        amount: 12000,
        dueDate: "2024-01-30",
        status: "paid",
        frequency: "monthly",
        description: "Shipping and delivery services",
        createdAt: "2024-01-01",
        nextPayment: "2024-02-29",
    },
]

export function PaymentSchedulesContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [frequencyFilter, setFrequencyFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // Filter and search logic
    const filteredSchedules = mockPaymentSchedules.filter((schedule) => {
        const matchesSearch =
            schedule.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            schedule.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            schedule.id.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || schedule.status === statusFilter
        const matchesFrequency = frequencyFilter === "all" || schedule.frequency === frequencyFilter

        return matchesSearch && matchesStatus && matchesFrequency
    })

    // Pagination logic
    const totalPages = Math.ceil(filteredSchedules.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedSchedules = filteredSchedules.slice(startIndex, startIndex + itemsPerPage)

    // Export functions
    const exportToCSV = () => {
        const headers = [
            "Schedule ID",
            "Vendor Name",
            "Amount",
            "Due Date",
            "Status",
            "Frequency",
            "Description",
            "Next Payment",
        ]
        const csvContent = [
            headers.join(","),
            ...filteredSchedules.map((schedule) =>
                [
                    schedule.id,
                    `"${schedule.vendorName}"`,
                    schedule.amount,
                    schedule.dueDate,
                    schedule.status,
                    schedule.frequency,
                    `"${schedule.description}"`,
                    schedule.nextPayment,
                ].join(","),
            ),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `payment-schedules-${new Date().toISOString().split("T")[0]}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
    }

    const exportToPDF = () => {
        const printWindow = window.open("", "_blank")
        if (!printWindow) return

        const htmlContent = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Payment Schedules Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; background-color: #fff; }
                        .header { text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #ea580c, #fb923c); color: white; padding: 20px; border-radius: 8px; }
                        .summary { display: flex; justify-content: space-around; margin-bottom: 30px; }
                        .summary-card { text-align: center; padding: 15px; border: 2px solid #ea580c; border-radius: 8px; background-color: #fff; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #fed7aa; padding: 8px; text-align: left; }
                        th { background-color: #ea580c; color: white; }
                        tbody tr:nth-child(even) { background-color: #fff7ed; }
                        .status-pending { color: #ea580c; font-weight: bold; }
                        .status-paid { color: #059669; font-weight: bold; }
                        .status-overdue { color: #dc2626; font-weight: bold; }
                        @media print { body { margin: 0; } }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Payment Schedules Report</h1>
                        <p>Generated on ${new Date().toLocaleDateString()}</p>
                    </div>
                    
                    <div class="summary">
                        <div class="summary-card">
                            <h3 style="color: #ea580c;">Total Schedules</h3>
                            <p style="font-size: 24px; font-weight: bold; color: #ea580c;">${filteredSchedules.length}</p>
                        </div>
                        <div class="summary-card">
                            <h3 style="color: #ea580c;">Total Amount</h3>
                            <p style="font-size: 24px; font-weight: bold; color: #ea580c;">$${filteredSchedules.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}</p>
                        </div>
                        <div class="summary-card">
                            <h3 style="color: #ea580c;">Pending</h3>
                            <p style="font-size: 24px; font-weight: bold; color: #ea580c;">${filteredSchedules.filter((s) => s.status === "pending").length}</p>
                        </div>
                        <div class="summary-card">
                            <h3 style="color: #ea580c;">Overdue</h3>
                            <p style="font-size: 24px; font-weight: bold; color: #dc2626;">${filteredSchedules.filter((s) => s.status === "overdue").length}</p>
                        </div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Schedule ID</th>
                                <th>Vendor Name</th>
                                <th>Amount</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Frequency</th>
                                <th>Next Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredSchedules
                                .map(
                                    (schedule) => `
                                <tr>
                                    <td>${schedule.id}</td>
                                    <td>${schedule.vendorName}</td>
                                    <td>$${schedule.amount.toLocaleString()}</td>
                                    <td>${new Date(schedule.dueDate).toLocaleDateString()}</td>
                                    <td class="status-${schedule.status}">${schedule.status.toUpperCase()}</td>
                                    <td>${schedule.frequency}</td>
                                    <td>${new Date(schedule.nextPayment).toLocaleDateString()}</td>
                                </tr>
                            `,
                                )
                                .join("")}
                        </tbody>
                    </table>
                </body>
            </html>
        `

        printWindow.document.write(htmlContent)
        printWindow.document.close()
        printWindow.print()
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "paid":
                return <CheckCircle className="h-4 w-4 text-green-600" />
            case "pending":
                return <Clock className="h-4 w-4 text-orange-500" />
            case "overdue":
                return <XCircle className="h-4 w-4 text-red-500" />
            default:
                return <AlertCircle className="h-4 w-4 text-orange-400" />
        }
    }

    const getStatusBadge = (status: string) => {
        const variants = {
            paid: "bg-green-50 text-green-700 border-green-200",
            pending: "bg-orange-50 text-orange-700 border-orange-200",
            overdue: "bg-red-50 text-red-700 border-red-200",
        }
        return variants[status as keyof typeof variants] || "bg-orange-50 text-orange-700 border-orange-200"
    }

    // Calculate summary statistics
    const totalAmount = filteredSchedules.reduce((sum, schedule) => sum + schedule.amount, 0)
    const pendingCount = filteredSchedules.filter((s) => s.status === "pending").length
    const paidCount = filteredSchedules.filter((s) => s.status === "paid").length
    const overdueCount = filteredSchedules.filter((s) => s.status === "overdue").length

    return (
        <div className="space-y-6 bg-white min-h-screen">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-orange-700">Total Schedules</CardTitle>
                        <Calendar className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{filteredSchedules.length}</div>
                    </CardContent>
                </Card>
                <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-orange-700">Total Amount</CardTitle>
                        <DollarSign className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">${totalAmount.toLocaleString()}</div>
                    </CardContent>
                </Card>
                <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-orange-700">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
                    </CardContent>
                </Card>
                <Card className="border-red-200 bg-gradient-to-br from-red-50 to-white shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-red-700">Overdue</CardTitle>
                        <XCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{overdueCount}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card className="border-orange-200 bg-white shadow-md">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                    <CardTitle className="text-white">Payment Schedules Management</CardTitle>
                    <CardDescription className="text-orange-100">Monitor and manage all vendor payment schedules</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-4 w-4 text-orange-400" />
                                <Input
                                    placeholder="Search by vendor, description, or schedule ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px] border-orange-200 focus:border-orange-500">
                                <Filter className="mr-2 h-4 w-4 text-orange-500" />
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent className="border-orange-200">
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="paid">Paid</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={frequencyFilter} onValueChange={setFrequencyFilter}>
                            <SelectTrigger className="w-[180px] border-orange-200 focus:border-orange-500">
                                <Filter className="mr-2 h-4 w-4 text-orange-500" />
                                <SelectValue placeholder="Filter by frequency" />
                            </SelectTrigger>
                            <SelectContent className="border-orange-200">
                                <SelectItem value="all">All Frequencies</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                            </SelectContent>
                        </Select>
                        <div className="flex space-x-2">
                            <Button onClick={exportToCSV} variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                                <Download className="mr-2 h-4 w-4" />
                                CSV
                            </Button>
                            <Button onClick={exportToPDF} variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                                <Download className="mr-2 h-4 w-4" />
                                PDF
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Payment Schedules Table */}
            <Card className="border-orange-200 bg-white shadow-md">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-orange-500 to-orange-600">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-white">Schedule ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-white">Vendor</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-white">Amount</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-white">Due Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-white">Status</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-white">Frequency</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-white">Next Payment</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-white">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-orange-100">
                                {paginatedSchedules.map((schedule, index) => (
                                    <tr key={schedule.id} className={`hover:bg-orange-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-orange-25'}`}>
                                        <td className="px-4 py-3 text-sm font-medium text-orange-700">{schedule.id}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{schedule.vendorName}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-orange-600">${schedule.amount.toLocaleString()}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{new Date(schedule.dueDate).toLocaleDateString()}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center space-x-2">
                                                {getStatusIcon(schedule.status)}
                                                <Badge className={getStatusBadge(schedule.status)}>{schedule.status.toUpperCase()}</Badge>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm capitalize text-gray-700">{schedule.frequency}</td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{new Date(schedule.nextPayment).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-sm max-w-xs truncate text-gray-700" title={schedule.description}>
                                            {schedule.description}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-orange-200 shadow-sm">
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-orange-600">Show</span>
                    <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                        <SelectTrigger className="w-[70px] border-orange-200 focus:border-orange-500">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="border-orange-200">
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-sm text-orange-600">of {filteredSchedules.length} entries</span>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="border-orange-300 text-orange-600 hover:bg-orange-50 disabled:opacity-50"
                    >
                        Previous
                    </Button>
                    <span className="text-sm text-orange-600 font-medium">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="border-orange-300 text-orange-600 hover:bg-orange-50 disabled:opacity-50"
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
