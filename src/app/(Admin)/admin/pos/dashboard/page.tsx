"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, Users, ShoppingCart, TrendingUp, Download, Search, Filter, FileText, Calendar } from "lucide-react"

const mockVendors = [
    {
        id: "1",
        businessName: "Elite Catering Co.",
        email: "contact@elitecatering.com",
        phone: "+1-555-0123",
        address: "123 Business St, City, State",
        status: "ACTIVE",
        totalRevenue: 15750.0,
        totalExpenses: 8200.0,
        transactionCount: 45,
        joinedDate: "2023-06-15",
        lastActivity: "2024-01-15T10:30:00Z",
    },
    {
        id: "2",
        businessName: "Premium Event Planners",
        email: "info@premiuevents.com",
        phone: "+1-555-0124",
        address: "456 Event Ave, City, State",
        status: "ACTIVE",
        totalRevenue: 22300.0,
        totalExpenses: 12100.0,
        transactionCount: 67,
        joinedDate: "2023-03-20",
        lastActivity: "2024-01-14T14:20:00Z",
    },
    {
        id: "3",
        businessName: "Budget Supplies Inc.",
        email: "sales@budgetsupplies.com",
        phone: "+1-555-0125",
        address: "789 Supply Rd, City, State",
        status: "SUSPENDED",
        totalRevenue: 5400.0,
        totalExpenses: 3200.0,
        transactionCount: 23,
        joinedDate: "2023-09-10",
        lastActivity: "2024-01-10T09:15:00Z",
    },
]

const mockVendorActivities = [
    {
        id: "1",
        vendorId: "1",
        vendorName: "Elite Catering Co.",
        activity: "Created new expense",
        description: "Added catering supplies expense of $150",
        timestamp: "2024-01-15T10:30:00Z",
        type: "EXPENSE",
    },
    {
        id: "2",
        vendorId: "2",
        vendorName: "Premium Event Planners",
        activity: "Received payment",
        description: "Payment of $500 received for booking #123",
        timestamp: "2024-01-14T14:20:00Z",
        type: "PAYMENT",
    },
    {
        id: "3",
        vendorId: "1",
        vendorName: "Elite Catering Co.",
        activity: "Updated booking",
        description: "Modified event details for upcoming wedding",
        timestamp: "2024-01-13T16:45:00Z",
        type: "BOOKING",
    },
]

const exportToPDF = (data: any[], filename: string) => {
    const content = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>${filename}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; background-color: #fff; }
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
            <h1>Vendor Dashboard Report</h1>
            <p>Generated on: ${new Date().toLocaleString()}</p>
            <table>
                <thead>
                    <tr>
                        <th>Business Name</th>
                        <th>Status</th>
                        <th>Revenue</th>
                        <th>Expenses</th>
                        <th>Transactions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data
                        .map(
                            (vendor) => `
                        <tr>
                            <td>${vendor.businessName}</td>
                            <td>${vendor.status}</td>
                            <td>$${vendor.totalRevenue.toLocaleString()}</td>
                            <td>$${vendor.totalExpenses.toLocaleString()}</td>
                            <td>${vendor.transactionCount}</td>
                        </tr>
                    `,
                        )
                        .join("")}
                </tbody>
            </table>
        </body>
        </html>
    `

    // Create a new window with the content and trigger print dialog
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
    const headers = ["Business Name", "Status", "Revenue", "Expenses", "Transactions", "Last Activity"]
    const csvContent = [
        headers.join(","),
        ...data.map((vendor) =>
            [
                `"${vendor.businessName}"`,
                vendor.status,
                vendor.totalRevenue,
                vendor.totalExpenses,
                vendor.transactionCount,
                `"${new Date(vendor.lastActivity).toLocaleDateString()}"`,
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

export default function DashboardContent() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [dateFilter, setDateFilter] = useState("all")

    const filteredVendors = mockVendors.filter((vendor) => {
        const matchesSearch =
            vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || vendor.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const totalVendors = filteredVendors.length
    const activeVendors = filteredVendors.filter((v) => v.status === "ACTIVE").length
    const totalPlatformRevenue = filteredVendors.reduce((sum, vendor) => sum + vendor.totalRevenue, 0)
    const totalPlatformExpenses = filteredVendors.reduce((sum, vendor) => sum + vendor.totalExpenses, 0)
    const suspendedVendors = filteredVendors.filter((v) => v.status === "SUSPENDED").length

    return (
        <div className="min-h-screen bg-white">
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-orange-500">Vendor Overview Dashboard</h2>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" onClick={() => exportToCSV(filteredVendors, "dashboard-report")} className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600">
                            <FileText className="mr-2 h-4 w-4" />
                            Export CSV
                        </Button>
                        <Button onClick={() => exportToPDF(filteredVendors, "dashboard-report")} className="bg-orange-500 hover:bg-orange-600 text-white">
                            <Download className="mr-2 h-4 w-4" />
                            Export PDF
                        </Button>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-400" />
                        <Input
                            placeholder="Search vendors..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-200"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[180px] border-orange-200 focus:border-orange-500 focus:ring-orange-200">
                            <Filter className="mr-2 h-4 w-4 text-orange-500" />
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-orange-200">
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="SUSPENDED">Suspended</SelectItem>
                            <SelectItem value="PENDING">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                        <SelectTrigger className="w-[180px] border-orange-200 focus:border-orange-500 focus:ring-orange-200">
                            <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                            <SelectValue placeholder="Filter by date" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-orange-200">
                            <SelectItem value="all">All Time</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">This Week</SelectItem>
                            <SelectItem value="month">This Month</SelectItem>
                            <SelectItem value="quarter">This Quarter</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                    <Card className="bg-white border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-orange-50">
                            <CardTitle className="text-sm font-medium text-orange-700">Total Vendors</CardTitle>
                            <Users className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent className="bg-white">
                            <div className="text-2xl font-bold text-orange-600">{totalVendors}</div>
                            <p className="text-xs text-orange-400">{activeVendors} active</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-orange-50">
                            <CardTitle className="text-sm font-medium text-orange-700">Platform Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent className="bg-white">
                            <div className="text-2xl font-bold text-orange-600">${totalPlatformRevenue.toLocaleString()}</div>
                            <p className="text-xs text-orange-400">+12% from last month</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-orange-50">
                            <CardTitle className="text-sm font-medium text-orange-700">Total Expenses</CardTitle>
                            <ShoppingCart className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent className="bg-white">
                            <div className="text-2xl font-bold text-orange-600">${totalPlatformExpenses.toLocaleString()}</div>
                            <p className="text-xs text-orange-400">-5% from last month</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-orange-50">
                            <CardTitle className="text-sm font-medium text-orange-700">Net Profit</CardTitle>
                            <TrendingUp className="h-4 w-4 text-orange-500" />
                        </CardHeader>
                        <CardContent className="bg-white">
                            <div className="text-2xl font-bold text-green-600">
                                ${(totalPlatformRevenue - totalPlatformExpenses).toLocaleString()}
                            </div>
                            <p className="text-xs text-orange-400">+18% from last month</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="bg-orange-50">
                            <CardTitle className="text-orange-700">Issues</CardTitle>
                        </CardHeader>
                        <CardContent className="bg-white">
                            <div className="text-2xl font-bold text-orange-600">{suspendedVendors}</div>
                            <p className="text-xs text-orange-400">Suspended vendors</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="bg-white border-orange-200 shadow-sm">
                        <CardHeader className="bg-orange-50">
                            <CardTitle className="text-orange-700">Top Performing Vendors</CardTitle>
                        </CardHeader>
                        <CardContent className="bg-white">
                            <div className="space-y-4">
                                {filteredVendors
                                    .sort((a, b) => b.totalRevenue - a.totalRevenue)
                                    .slice(0, 3)
                                    .map((vendor) => (
                                        <div key={vendor.id} className="flex items-center justify-between border-b border-orange-100 pb-3 last:border-b-0">
                                            <div>
                                                <p className="font-medium text-orange-700">{vendor.businessName}</p>
                                                <p className="text-sm text-orange-500">{vendor.transactionCount} transactions</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-orange-600">${vendor.totalRevenue.toLocaleString()}</p>
                                                <Badge variant={vendor.status === "ACTIVE" ? "default" : "secondary"} className={vendor.status === "ACTIVE" ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-700"}>
                                                    {vendor.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-orange-200 shadow-sm">
                        <CardHeader className="bg-orange-50">
                            <CardTitle className="text-orange-700">Recent Vendor Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="bg-white">
                            <div className="space-y-4">
                                {mockVendorActivities.slice(0, 3).map((activity) => (
                                    <div key={activity.id} className="flex items-start space-x-3 border-b border-orange-100 pb-3 last:border-b-0">
                                        <div className="flex-1">
                                            <p className="font-medium text-orange-700">{activity.activity}</p>
                                            <p className="text-sm text-orange-600">{activity.vendorName}</p>
                                            <p className="text-xs text-orange-400">{new Date(activity.timestamp).toLocaleString()}</p>
                                        </div>
                                        <Badge variant="outline" className="text-xs border-orange-300 text-orange-600">
                                            {activity.type}
                                        </Badge>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
