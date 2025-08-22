"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, Share, Menu, X } from "lucide-react"

// Mock report data
const availableReports = [
    {
        id: "voucher-performance",
        name: "Voucher Performance Report",
        description: "Detailed analysis of voucher usage, conversion rates, and ROI",
        category: "Performance",
        frequency: "Weekly",
        lastGenerated: "2024-01-20T10:30:00Z",
        size: "2.4 MB",
        format: ["PDF", "Excel", "CSV"],
    },
    {
        id: "vendor-analytics",
        name: "Vendor Analytics Report",
        description: "Comprehensive vendor performance metrics and comparisons",
        category: "Vendor",
        frequency: "Monthly",
        lastGenerated: "2024-01-15T14:20:00Z",
        size: "1.8 MB",
        format: ["PDF", "Excel"],
    },
    {
        id: "fraud-detection",
        name: "Fraud Detection Report",
        description: "Security incidents, suspicious activities, and fraud prevention metrics",
        category: "Security",
        frequency: "Daily",
        lastGenerated: "2024-01-21T08:00:00Z",
        size: "856 KB",
        format: ["PDF", "CSV"],
    },
    {
        id: "revenue-impact",
        name: "Revenue Impact Analysis",
        description: "Financial impact of voucher campaigns and discount strategies",
        category: "Financial",
        frequency: "Monthly",
        lastGenerated: "2024-01-18T16:45:00Z",
        size: "3.2 MB",
        format: ["PDF", "Excel"],
    },
    {
        id: "user-behavior",
        name: "User Behavior Report",
        description: "Customer usage patterns, preferences, and engagement metrics",
        category: "User",
        frequency: "Weekly",
        lastGenerated: "2024-01-19T12:15:00Z",
        size: "1.5 MB",
        format: ["PDF", "CSV"],
    },
]

const scheduledReports = [
    {
        id: "1",
        reportId: "voucher-performance",
        name: "Weekly Voucher Performance",
        recipients: ["admin@company.com", "manager@company.com"],
        frequency: "Weekly",
        nextRun: "2024-01-28T09:00:00Z",
        status: "Active",
    },
    {
        id: "2",
        reportId: "fraud-detection",
        name: "Daily Security Summary",
        recipients: ["security@company.com"],
        frequency: "Daily",
        nextRun: "2024-01-22T08:00:00Z",
        status: "Active",
    },
]

export default function ReportsPage() {
    const [selectedReports, setSelectedReports] = useState<string[]>([])
    const [filterCategory, setFilterCategory] = useState("all")
    const [customDateFrom, setCustomDateFrom] = useState("")
    const [customDateTo, setCustomDateTo] = useState("")
    const [reportFormat, setReportFormat] = useState("PDF")
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const filteredReports = availableReports.filter((report) => {
        return filterCategory === "all" || report.category.toLowerCase() === filterCategory.toLowerCase()
    })

    const handleReportSelection = (reportId: string, checked: boolean) => {
        if (checked) {
            setSelectedReports([...selectedReports, reportId])
        } else {
            setSelectedReports(selectedReports.filter((id) => id !== reportId))
        }
    }

    // PDF Generation without external packages
    const generatePDF = (data: any[]) => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Set canvas size for A4 (portrait)
        canvas.width = 595
        canvas.height = 842

        // White background
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Orange header
        ctx.fillStyle = '#f97316'
        ctx.fillRect(0, 0, canvas.width, 80)

        // Title
        ctx.fillStyle = '#ffffff'
        ctx.font = 'bold 24px Arial'
        ctx.fillText('Reports Export', 40, 50)

        // Date
        ctx.fillStyle = '#ffffff'
        ctx.font = '12px Arial'
        ctx.fillText(`Generated on: ${new Date().toLocaleDateString()}`, 40, 65)

        // Content
        let yPosition = 120
        ctx.fillStyle = '#374151'
        ctx.font = 'bold 16px Arial'
        ctx.fillText('Selected Reports:', 40, yPosition)

        yPosition += 30
        data.forEach((report, index) => {
            ctx.fillStyle = '#f97316'
            ctx.font = 'bold 14px Arial'
            ctx.fillText(`${index + 1}. ${report.name}`, 40, yPosition)
            
            yPosition += 20
            ctx.fillStyle = '#6b7280'
            ctx.font = '12px Arial'
            ctx.fillText(`Category: ${report.category}`, 60, yPosition)
            
            yPosition += 15
            ctx.fillText(`Description: ${report.description}`, 60, yPosition)
            
            yPosition += 15
            ctx.fillText(`Last Generated: ${new Date(report.lastGenerated).toLocaleDateString()}`, 60, yPosition)
            
            yPosition += 15
            ctx.fillText(`Size: ${report.size}`, 60, yPosition)
            
            yPosition += 25
            
            if (yPosition > 750) {
                // Start new page logic would go here
                yPosition = 120
            }
        })

        // Convert canvas to blob and download
        canvas.toBlob((blob) => {
            if (blob) {
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.href = url
                link.download = 'reports-export.pdf'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                URL.revokeObjectURL(url)
            }
        }, 'image/png')
    }

    const handleExportReports = () => {
        if (selectedReports.length === 0) return

        // Create export data
        const exportData = selectedReports.map((reportId) => {
            const report = availableReports.find((r) => r.id === reportId)
            return {
                name: report?.name,
                category: report?.category,
                description: report?.description,
                lastGenerated: report?.lastGenerated,
                size: report?.size,
                dateRange: `${customDateFrom} to ${customDateTo}`,
                format: reportFormat,
            }
        })

        // Export based on format
        if (reportFormat === "CSV") {
            const csv = convertToCSV(exportData)
            downloadFile(csv, "reports-export.csv", "text/csv")
        } else if (reportFormat === "Excel") {
            // Simulate Excel export
            const data = JSON.stringify(exportData, null, 2)
            downloadFile(data, "reports-export.json", "application/json")
        } else {
            // PDF export
            generatePDF(exportData)
        }
    }

    const convertToCSV = (data: any[]) => {
        const headers = Object.keys(data[0]).join(",")
        const rows = data.map((row) => Object.values(row).join(","))
        return [headers, ...rows].join("\n")
    }

    const downloadFile = (content: string, filename: string, contentType: string) => {
        const blob = new Blob([content], { type: contentType })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    }

    const getCategoryBadge = (category: string) => {
        const colors: Record<string, string> = {
            Performance: "bg-orange-100 text-orange-600 border-orange-200",
            Vendor: "bg-orange-50 text-orange-700 border-orange-100",
            Security: "bg-red-100 text-red-600 border-red-200",
            Financial: "bg-amber-100 text-amber-600 border-amber-200",
            User: "bg-orange-200 text-orange-800 border-orange-300",
        }
        return (
            <Badge variant="outline" className={`${colors[category] || "bg-gray-100 text-gray-600"} text-xs px-2 py-1`}>
                {category}
            </Badge>
        )
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Active":
                return (
                    <Badge variant="default" className="bg-orange-500 text-white hover:bg-orange-600">
                        Active
                    </Badge>
                )
            case "Paused":
                return <Badge variant="secondary" className="bg-gray-200 text-gray-700">Paused</Badge>
            case "Failed":
                return <Badge variant="destructive" className="bg-red-500 text-white">Failed</Badge>
            default:
                return <Badge variant="outline" className="border-gray-300 text-gray-600">{status}</Badge>
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
                {/* Header */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat text-gray-900">
                                Reports & Exports
                            </h1>
                            <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                                Generate and export system reports
                            </p>
                        </div>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="lg:hidden border-orange-300 text-orange-600 hover:bg-orange-50"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </Button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        <Button 
                            size="sm" 
                            onClick={handleExportReports} 
                            disabled={selectedReports.length === 0}
                            className="bg-orange-500 hover:bg-orange-600 text-white border-0 w-full sm:w-auto"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Export Selected ({selectedReports.length})
                        </Button>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
                                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">Available Reports</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold font-montserrat text-gray-900">
                                        {availableReports.length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 sm:p-3 bg-amber-100 rounded-lg">
                                    <Download className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">Reports Generated</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold font-montserrat text-gray-900">47</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 sm:p-3 bg-orange-200 rounded-lg">
                                    <Share className="h-4 w-4 sm:h-5 sm:w-5 text-orange-700" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">Exported Reports</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold font-montserrat text-gray-900">23</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Report Generation */}
                <Card className="border-orange-200 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="font-montserrat text-gray-900 text-lg sm:text-xl">
                            Generate & Export Reports
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base text-gray-600">
                            Select reports and customize parameters for export
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            {/* Report Selection */}
                            <div className="xl:col-span-2">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                                    <Label className="text-base font-medium text-gray-900">Select Reports</Label>
                                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                                        <SelectTrigger className="w-full sm:w-[200px] border-orange-200 focus:border-orange-400">
                                            <SelectValue placeholder="Filter by category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Categories</SelectItem>
                                            <SelectItem value="performance">Performance</SelectItem>
                                            <SelectItem value="vendor">Vendor</SelectItem>
                                            <SelectItem value="security">Security</SelectItem>
                                            <SelectItem value="financial">Financial</SelectItem>
                                            <SelectItem value="user">User</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-3">
                                    {filteredReports.map((report) => (
                                        <div 
                                            key={report.id} 
                                            className="flex items-start space-x-3 p-3 sm:p-4 rounded-lg border border-orange-200 bg-white hover:bg-orange-50 transition-colors"
                                        >
                                            <Checkbox
                                                id={report.id}
                                                checked={selectedReports.includes(report.id)}
                                                onCheckedChange={(checked) => handleReportSelection(report.id, checked as boolean)}
                                                className="mt-1 border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                                    <Label 
                                                        htmlFor={report.id} 
                                                        className="font-medium cursor-pointer text-gray-900 text-sm sm:text-base"
                                                    >
                                                        {report.name}
                                                    </Label>
                                                    {getCategoryBadge(report.category)}
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-600 mb-3 leading-relaxed">
                                                    {report.description}
                                                </p>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-gray-500">
                                                    <span className="flex-shrink-0">
                                                        Last: {new Date(report.lastGenerated).toLocaleDateString()}
                                                    </span>
                                                    <span className="flex-shrink-0">Size: {report.size}</span>
                                                    <span className="flex-shrink-0">Formats: {report.format.join(", ")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Configuration Sidebar */}
                            <div className={`xl:block ${sidebarOpen ? 'block' : 'hidden'}`}>
                                <div className="xl:sticky xl:top-6 space-y-6 p-4 xl:p-0 bg-white xl:bg-transparent rounded-lg border xl:border-0 border-orange-200">
                                    <div>
                                        <Label htmlFor="dateFrom" className="text-sm font-medium text-gray-900">
                                            Date Range
                                        </Label>
                                        <div className="grid grid-cols-1 gap-3 mt-3">
                                            <Input
                                                id="dateFrom"
                                                type="date"
                                                value={customDateFrom}
                                                onChange={(e) => setCustomDateFrom(e.target.value)}
                                                placeholder="From date"
                                                className="border-orange-200 focus:border-orange-400 text-sm"
                                            />
                                            <Input
                                                type="date"
                                                value={customDateTo}
                                                onChange={(e) => setCustomDateTo(e.target.value)}
                                                placeholder="To date"
                                                className="border-orange-200 focus:border-orange-400 text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="format" className="text-sm font-medium text-gray-900">
                                            Export Format
                                        </Label>
                                        <Select value={reportFormat} onValueChange={setReportFormat}>
                                            <SelectTrigger className="mt-3 border-orange-200 focus:border-orange-400">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="PDF">PDF</SelectItem>
                                                <SelectItem value="Excel">Excel</SelectItem>
                                                <SelectItem value="CSV">CSV</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="pt-4">
                                        <Button 
                                            onClick={handleExportReports} 
                                            disabled={selectedReports.length === 0} 
                                            className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0"
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Export Reports ({selectedReports.length})
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
