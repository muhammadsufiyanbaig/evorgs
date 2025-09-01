"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Search,
    Filter,
    Download,
    FileText,
    Calendar,
    Activity,
    ChevronLeft,
    ChevronRight,
    User,
    CreditCard,
    ShoppingCart,
    AlertCircle,
} from "lucide-react"

const mockVendorActivities = [
    {
        id: "1",
        vendorId: "1",
        vendorName: "Elite Catering Co.",
        activity: "Created new expense",
        description: "Added catering supplies expense of $150 for wedding event",
        timestamp: "2024-01-15T10:30:00Z",
        type: "EXPENSE",
        severity: "INFO",
        metadata: {
            expenseId: "1",
            amount: 150.0,
            category: "SUPPLIES",
        },
    },
    {
        id: "2",
        vendorId: "2",
        vendorName: "Premium Event Planners",
        activity: "Received payment",
        description: "Payment of $500 received for booking #B002",
        timestamp: "2024-01-14T14:20:00Z",
        type: "PAYMENT",
        severity: "SUCCESS",
        metadata: {
            transactionId: "TXN-002",
            amount: 500.0,
            bookingId: "B002",
        },
    },
    {
        id: "3",
        vendorId: "1",
        vendorName: "Elite Catering Co.",
        activity: "Updated booking",
        description: "Modified event details for upcoming wedding - changed guest count from 120 to 150",
        timestamp: "2024-01-13T16:45:00Z",
        type: "BOOKING",
        severity: "INFO",
        metadata: {
            bookingId: "B001",
            oldGuestCount: 120,
            newGuestCount: 150,
        },
    },
    {
        id: "4",
        vendorId: "3",
        vendorName: "Budget Supplies Inc.",
        activity: "Account suspended",
        description: "Vendor account suspended due to policy violation",
        timestamp: "2024-01-12T09:15:00Z",
        type: "ACCOUNT",
        severity: "WARNING",
        metadata: {
            reason: "Policy violation",
            suspendedBy: "Admin Manager",
        },
    },
    {
        id: "5",
        vendorId: "4",
        vendorName: "Fresh Food Distributors",
        activity: "Profile updated",
        description: "Updated business address and contact information",
        timestamp: "2024-01-11T11:20:00Z",
        type: "PROFILE",
        severity: "INFO",
        metadata: {
            fieldsUpdated: ["address", "phone", "email"],
        },
    },
    {
        id: "6",
        vendorId: "2",
        vendorName: "Premium Event Planners",
        activity: "Payment failed",
        description: "Payment attempt of $75.50 failed - insufficient funds",
        timestamp: "2024-01-10T08:30:00Z",
        type: "PAYMENT",
        severity: "ERROR",
        metadata: {
            transactionId: "TXN-006",
            amount: 75.5,
            errorCode: "INSUFFICIENT_FUNDS",
        },
    },
    {
        id: "7",
        vendorId: "5",
        vendorName: "Party Rental Solutions",
        activity: "New vendor registration",
        description: "New vendor completed registration and submitted documents for approval",
        timestamp: "2024-01-09T14:45:00Z",
        type: "REGISTRATION",
        severity: "SUCCESS",
        metadata: {
            documentsSubmitted: ["business_license", "insurance", "tax_id"],
        },
    },
    {
        id: "8",
        vendorId: "1",
        vendorName: "Elite Catering Co.",
        activity: "Expense approved",
        description: "Expense #1 for $150 approved by Admin Manager",
        timestamp: "2024-01-08T13:20:00Z",
        type: "EXPENSE",
        severity: "SUCCESS",
        metadata: {
            expenseId: "1",
            amount: 150.0,
            approvedBy: "Admin Manager",
        },
    },
]

const getActivityIcon = (type: string) => {
    switch (type) {
        case "PAYMENT":
            return CreditCard
        case "EXPENSE":
            return ShoppingCart
        case "BOOKING":
            return Calendar
        case "ACCOUNT":
            return User
        case "PROFILE":
            return User
        case "REGISTRATION":
            return User
        default:
            return Activity
    }
}

const getSeverityColor = (severity: string) => {
    switch (severity) {
        case "SUCCESS":
            return "bg-green-100 text-green-800 border-green-200"
        case "INFO":
            return "bg-orange-100 text-orange-800 border-orange-200"
        case "WARNING":
            return "bg-yellow-100 text-yellow-800 border-yellow-200"
        case "ERROR":
            return "bg-red-100 text-red-800 border-red-200"
        default:
            return "bg-orange-100 text-orange-800 border-orange-200"
    }
}

const exportToPDF = (data: any[], filename: string) => {
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${filename}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background-color: #fff; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #fed7aa; padding: 12px; text-align: left; }
                th { background-color: #f97316; color: white; font-weight: bold; }
                tr:nth-child(even) { background-color: #fff7ed; }
                h1 { color: #f97316; font-size: 28px; margin-bottom: 10px; }
                .report-info { color: #9a3412; font-size: 14px; margin-bottom: 20px; }
                .severity-success { color: #15803d; font-weight: bold; }
                .severity-warning { color: #ca8a04; font-weight: bold; }
                .severity-error { color: #dc2626; font-weight: bold; }
                .severity-info { color: #f97316; font-weight: bold; }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <h1>🧡 Activity Logs Report</h1>
            <p class="report-info">Generated on: ${new Date().toLocaleString()}</p>
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Vendor</th>
                        <th>Activity</th>
                        <th>Type</th>
                        <th>Severity</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    ${data
                        .map(
                            (activity) => `
                        <tr>
                            <td>${new Date(activity.timestamp).toLocaleString()}</td>
                            <td><strong>${activity.vendorName}</strong></td>
                            <td>${activity.activity}</td>
                            <td><span style="background-color: #fed7aa; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${activity.type}</span></td>
                            <td class="severity-${activity.severity.toLowerCase()}">${activity.severity}</td>
                            <td>${activity.description}</td>
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
    const headers = ["Timestamp", "Vendor", "Activity", "Type", "Severity", "Description"]
    const csvContent = [
        headers.join(","),
        ...data.map((activity) =>
            [
                `"${new Date(activity.timestamp).toLocaleString()}"`,
                `"${activity.vendorName}"`,
                `"${activity.activity}"`,
                activity.type,
                activity.severity,
                `"${activity.description}"`,
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

export default function ActivityLogsContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [typeFilter, setTypeFilter] = useState("all")
    const [severityFilter, setSeverityFilter] = useState("all")
    const [dateFilter, setDateFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const filteredActivities = mockVendorActivities.filter((activity) => {
        const matchesSearch =
            activity.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesType = typeFilter === "all" || activity.type === typeFilter
        const matchesSeverity = severityFilter === "all" || activity.severity === severityFilter

        let matchesDate = true
        if (dateFilter !== "all") {
            const activityDate = new Date(activity.timestamp)
            const now = new Date()

            switch (dateFilter) {
                case "today":
                    matchesDate = activityDate.toDateString() === now.toDateString()
                    break
                case "week":
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                    matchesDate = activityDate >= weekAgo
                    break
                case "month":
                    const monthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate())
                    matchesDate = activityDate >= monthAgo
                    break
                case "quarter":
                    const quarterAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate())
                    matchesDate = activityDate >= quarterAgo
                    break
            }
        }

        return matchesSearch && matchesType && matchesSeverity && matchesDate
    })

    // Sort by timestamp (newest first)
    const sortedActivities = [...filteredActivities].sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )

    // Pagination logic
    const totalPages = Math.ceil(sortedActivities.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedActivities = sortedActivities.slice(startIndex, startIndex + itemsPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                    <div>
                        <h2 className="text-3xl font-bold text-orange-600 mb-2">🧡 Vendor Activity Log</h2>
                        <p className="text-orange-700/70">Monitor and track all vendor activities in real-time</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Button 
                            variant="outline" 
                            onClick={() => exportToCSV(filteredActivities, "activity-logs-report")}
                            className="border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400"
                        >
                            <FileText className="mr-2 h-4 w-4" />
                            Export CSV
                        </Button>
                        <Button 
                            onClick={() => exportToPDF(filteredActivities, "activity-logs-report")}
                            className="bg-orange-500 hover:bg-orange-600 text-white border-0"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Export PDF
                        </Button>
                    </div>
                </div>

                {/* Search and Filter Controls */}
                <Card className="border-orange-200 shadow-md">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4 flex-wrap gap-4">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
                                <Input
                                    placeholder="Search activities..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                />
                            </div>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                                <SelectTrigger className="w-[150px] border-orange-200 focus:border-orange-400">
                                    <Filter className="mr-2 h-4 w-4 text-orange-500" />
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent className="border-orange-200">
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="PAYMENT">Payment</SelectItem>
                                    <SelectItem value="EXPENSE">Expense</SelectItem>
                                    <SelectItem value="BOOKING">Booking</SelectItem>
                                    <SelectItem value="ACCOUNT">Account</SelectItem>
                                    <SelectItem value="PROFILE">Profile</SelectItem>
                                    <SelectItem value="REGISTRATION">Registration</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={severityFilter} onValueChange={setSeverityFilter}>
                                <SelectTrigger className="w-[150px] border-orange-200 focus:border-orange-400">
                                    <AlertCircle className="mr-2 h-4 w-4 text-orange-500" />
                                    <SelectValue placeholder="Severity" />
                                </SelectTrigger>
                                <SelectContent className="border-orange-200">
                                    <SelectItem value="all">All Severity</SelectItem>
                                    <SelectItem value="SUCCESS">Success</SelectItem>
                                    <SelectItem value="INFO">Info</SelectItem>
                                    <SelectItem value="WARNING">Warning</SelectItem>
                                    <SelectItem value="ERROR">Error</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={dateFilter} onValueChange={setDateFilter}>
                                <SelectTrigger className="w-[150px] border-orange-200 focus:border-orange-400">
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
                    </CardContent>
                </Card>

                {/* Results Summary */}
                <div className="flex items-center justify-between text-sm bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                    <span className="text-orange-700 font-medium">
                        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedActivities.length)} of{" "}
                        {sortedActivities.length} activities
                    </span>
                    <span className="text-orange-600">
                        <span className="inline-flex items-center text-red-600">
                            {sortedActivities.filter((a) => a.severity === "ERROR").length} errors
                        </span>
                        {", "}
                        <span className="inline-flex items-center text-yellow-600">
                            {sortedActivities.filter((a) => a.severity === "WARNING").length} warnings
                        </span>
                    </span>
                </div>

                {/* Activity Feed */}
                <Card className="border-orange-200 shadow-md">
                    <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-400 text-white rounded-t-lg">
                        <CardTitle className="flex items-center">
                            <Activity className="mr-2 h-5 w-5" />
                            Recent Activities
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 bg-white">
                        <div className="space-y-4">
                            {paginatedActivities.map((activity) => {
                                const IconComponent = getActivityIcon(activity.type)
                                return (
                                    <div key={activity.id} className="flex items-start space-x-4 p-4 border border-orange-100 rounded-lg hover:bg-orange-25 transition-colors duration-200 bg-gradient-to-r from-white to-orange-50/30">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center border-2 border-orange-200">
                                                <IconComponent className="h-6 w-6 text-orange-600" />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="font-semibold text-sm text-orange-900">{activity.activity}</h4>
                                                <div className="flex items-center space-x-2">
                                                    <Badge className="text-xs bg-orange-100 text-orange-800 border border-orange-200 hover:bg-orange-200">
                                                        {activity.type}
                                                    </Badge>
                                                    <Badge className={`text-xs border ${getSeverityColor(activity.severity)}`}>
                                                        {activity.severity}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{activity.description}</p>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                                                    {activity.vendorName}
                                                </span>
                                                <span className="text-orange-500">
                                                    {new Date(activity.timestamp).toLocaleString()}
                                                </span>
                                            </div>
                                            {activity.metadata && (
                                                <div className="mt-3 p-3 bg-orange-50 rounded-md border border-orange-100">
                                                    <span className="font-medium text-orange-800 text-xs">Metadata: </span>
                                                    <span className="text-xs text-orange-700">
                                                        {Object.entries(activity.metadata)
                                                            .map(([key, value]) => `${key}: ${value}`)
                                                            .join(", ")}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>

                {/* Pagination */}
                {totalPages > 1 && (
                    <Card className="border-orange-200 shadow-md">
                        <CardContent className="p-4">
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
                                                        ? "w-8 h-8 p-0 bg-orange-500 hover:bg-orange-600 text-white border-0"
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
                                <span className="text-sm text-orange-600 font-medium">
                                    Page {currentPage} of {totalPages}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}

