"use client"

import { SetStateAction, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit,
    Eye,
    Trash2,
    Download,
    Upload,
    Calendar,
    Percent,
    DollarSign,
    FileText,
} from "lucide-react"
import { VoucherDetailsDialog } from "@/app/components/Admin/voucher/detail-dailouge"
import { VoucherEditDialog } from "@/app/components/Admin/voucher/edit-dailog"

// Mock data based on GraphQL schema
const mockVouchers = [
    {
        id: "1",
        vendorId: "vendor-1",
        vendorName: "Restaurant ABC",
        couponCode: "SAVE20",
        title: "20% Off All Orders",
        description: "Get 20% discount on all menu items",
        discountType: "PERCENTAGE",
        discountValue: 20,
        maxDiscountAmount: 50,
        minOrderValue: 25,
        applicableFor: "ALL",
        serviceTypes: ["FOOD"],
        totalUsageLimit: 1000,
        usagePerUser: 3,
        currentUsageCount: 245,
        validFrom: "2024-01-01",
        validUntil: "2024-12-31",
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-15T10:30:00Z",
    },
    {
        id: "2",
        vendorId: "vendor-2",
        vendorName: "Shop XYZ",
        couponCode: "FIXED10",
        title: "$10 Off Orders",
        description: "Fixed $10 discount on orders above $50",
        discountType: "FIXED_AMOUNT",
        discountValue: 10,
        maxDiscountAmount: 10,
        minOrderValue: 50,
        applicableFor: "NEW_USERS",
        serviceTypes: ["RETAIL"],
        totalUsageLimit: 500,
        usagePerUser: 1,
        currentUsageCount: 89,
        validFrom: "2024-02-01",
        validUntil: "2024-06-30",
        isActive: true,
        createdAt: "2024-02-01T00:00:00Z",
        updatedAt: "2024-02-10T14:20:00Z",
    },
    {
        id: "3",
        vendorId: "vendor-3",
        vendorName: "Service 123",
        couponCode: "EXPIRED15",
        title: "15% Service Discount",
        description: "15% off on all services",
        discountType: "PERCENTAGE",
        discountValue: 15,
        maxDiscountAmount: 30,
        minOrderValue: 20,
        applicableFor: "ALL",
        serviceTypes: ["SERVICE"],
        totalUsageLimit: 200,
        usagePerUser: 2,
        currentUsageCount: 156,
        validFrom: "2023-12-01",
        validUntil: "2024-01-31",
        isActive: false,
        createdAt: "2023-12-01T00:00:00Z",
        updatedAt: "2024-01-31T23:59:59Z",
    },
]

export default function VouchersPage() {
    const [vouchers, setVouchers] = useState(mockVouchers)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterType, setFilterType] = useState("all")
    const [selectedVoucher, setSelectedVoucher] = useState<typeof mockVouchers[0] | null>(null)
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const filteredVouchers = vouchers.filter((voucher) => {
        const matchesSearch =
            voucher.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            voucher.couponCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            voucher.vendorName.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus =
            filterStatus === "all" ||
            (filterStatus === "active" && voucher.isActive) ||
            (filterStatus === "inactive" && !voucher.isActive) ||
            (filterStatus === "expired" && new Date(voucher.validUntil) < new Date())

        const matchesType = filterType === "all" || voucher.discountType === filterType

        return matchesSearch && matchesStatus && matchesType
    })

    const getStatusBadge = (voucher: { id?: string; vendorId?: string; vendorName?: string; couponCode?: string; title?: string; description?: string; discountType?: string; discountValue?: number; maxDiscountAmount?: number; minOrderValue?: number; applicableFor?: string; serviceTypes?: string[]; totalUsageLimit?: number; usagePerUser?: number; currentUsageCount?: number; validFrom?: string; validUntil: any; isActive: any; createdAt?: string; updatedAt?: string }) => {
        if (!voucher.isActive) {
            return <Badge variant="secondary" className="bg-gray-100 text-gray-700 border-gray-300">Inactive</Badge>
        }
        if (new Date(voucher.validUntil) < new Date()) {
            return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-300">Expired</Badge>
        }
        return (
            <Badge variant="default" className="bg-orange-500 text-white border-orange-600 hover:bg-orange-600">
                Active
            </Badge>
        )
    }

    const getUsageProgress = (current: number, total: number) => {
        return Math.round((current / total) * 100)
    }

    const getVoucherStatus = (voucher: typeof mockVouchers[0]) => {
        if (!voucher.isActive) return "Inactive"
        if (new Date(voucher.validUntil) < new Date()) return "Expired"
        return "Active"
    }

    const exportToPDF = () => {
        const printWindow = window.open('', '_blank')
        if (!printWindow) return

        const currentDate = new Date().toLocaleDateString()
        const currentTime = new Date().toLocaleTimeString()

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Vouchers Report - ${currentDate}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        background: white;
                        color: #333;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #f97316;
                        padding-bottom: 20px;
                    }
                    .header h1 {
                        color: #f97316;
                        margin: 0;
                        font-size: 28px;
                        font-weight: bold;
                    }
                    .header p {
                        color: #666;
                        margin: 5px 0;
                        font-size: 14px;
                    }
                    .stats {
                        display: flex;
                        justify-content: space-around;
                        margin-bottom: 30px;
                        background: #f8f9fa;
                        padding: 20px;
                        border-radius: 8px;
                    }
                    .stat-item {
                        text-align: center;
                    }
                    .stat-item h3 {
                        margin: 0;
                        font-size: 24px;
                        color: #f97316;
                    }
                    .stat-item p {
                        margin: 5px 0 0 0;
                        font-size: 12px;
                        color: #666;
                    }
                    .filters-info {
                        background: #fff3cd;
                        padding: 15px;
                        border-radius: 8px;
                        margin-bottom: 20px;
                        border: 1px solid #ffeaa7;
                    }
                    .filters-info h4 {
                        margin: 0 0 10px 0;
                        color: #856404;
                    }
                    .filters-info p {
                        margin: 0;
                        color: #856404;
                        font-size: 14px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                        font-size: 12px;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: left;
                    }
                    th {
                        background-color: #f97316;
                        color: white;
                        font-weight: bold;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    tr:hover {
                        background-color: #f5f5f5;
                    }
                    .status-active {
                        background: #10b981;
                        color: white;
                        padding: 2px 6px;
                        border-radius: 4px;
                        font-size: 10px;
                    }
                    .status-inactive {
                        background: #6b7280;
                        color: white;
                        padding: 2px 6px;
                        border-radius: 4px;
                        font-size: 10px;
                    }
                    .status-expired {
                        background: #ef4444;
                        color: white;
                        padding: 2px 6px;
                        border-radius: 4px;
                        font-size: 10px;
                    }
                    .footer {
                        margin-top: 30px;
                        text-align: center;
                        color: #666;
                        font-size: 12px;
                        border-top: 1px solid #ddd;
                        padding-top: 20px;
                    }
                    .progress-bar {
                        width: 50px;
                        height: 8px;
                        background: #e5e7eb;
                        border-radius: 4px;
                        overflow: hidden;
                    }
                    .progress-fill {
                        height: 100%;
                        background: #f97316;
                        border-radius: 4px;
                    }
                    @media print {
                        body { print-color-adjust: exact; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Vouchers Management Report</h1>
                    <p>Generated on: ${currentDate} at ${currentTime}</p>
                    <p>Total Records: ${filteredVouchers.length}</p>
                </div>

                <div class="stats">
                    <div class="stat-item">
                        <h3>${vouchers.length}</h3>
                        <p>Total Vouchers</p>
                    </div>
                    <div class="stat-item">
                        <h3>${vouchers.filter((v) => v.isActive && new Date(v.validUntil) >= new Date()).length}</h3>
                        <p>Active Vouchers</p>
                    </div>
                    <div class="stat-item">
                        <h3>${vouchers.reduce((sum, v) => sum + v.currentUsageCount, 0)}</h3>
                        <p>Total Usage</p>
                    </div>
                    <div class="stat-item">
                        <h3>${vouchers.filter((v) => new Date(v.validUntil) < new Date()).length}</h3>
                        <p>Expired Vouchers</p>
                    </div>
                </div>

                ${searchTerm || filterStatus !== "all" || filterType !== "all" ? `
                <div class="filters-info">
                    <h4>Applied Filters:</h4>
                    ${searchTerm ? `<p>Search: "${searchTerm}"</p>` : ''}
                    ${filterStatus !== "all" ? `<p>Status: ${filterStatus}</p>` : ''}
                    ${filterType !== "all" ? `<p>Type: ${filterType}</p>` : ''}
                </div>
                ` : ''}

                <table>
                    <thead>
                        <tr>
                            <th>Voucher Code</th>
                            <th>Title</th>
                            <th>Vendor</th>
                            <th>Discount Type</th>
                            <th>Discount Value</th>
                            <th>Max Discount</th>
                            <th>Min Order</th>
                            <th>Usage</th>
                            <th>Progress</th>
                            <th>Valid From</th>
                            <th>Valid Until</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filteredVouchers.map(voucher => {
                            const progress = getUsageProgress(voucher.currentUsageCount, voucher.totalUsageLimit)
                            const status = getVoucherStatus(voucher)
                            const statusClass = status === 'Active' ? 'status-active' : 
                                              status === 'Expired' ? 'status-expired' : 'status-inactive'
                            
                            return `
                                <tr>
                                    <td><strong>${voucher.couponCode}</strong></td>
                                    <td>${voucher.title}</td>
                                    <td>${voucher.vendorName}</td>
                                    <td>${voucher.discountType}</td>
                                    <td>${voucher.discountType === 'PERCENTAGE' ? `${voucher.discountValue}%` : `$${voucher.discountValue}`}</td>
                                    <td>${voucher.maxDiscountAmount ? `$${voucher.maxDiscountAmount}` : 'N/A'}</td>
                                    <td>$${voucher.minOrderValue}</td>
                                    <td>${voucher.currentUsageCount} / ${voucher.totalUsageLimit}</td>
                                    <td>
                                        <div class="progress-bar">
                                            <div class="progress-fill" style="width: ${progress}%"></div>
                                        </div>
                                        ${progress}%
                                    </td>
                                    <td>${new Date(voucher.validFrom).toLocaleDateString()}</td>
                                    <td>${new Date(voucher.validUntil).toLocaleDateString()}</td>
                                    <td><span class="${statusClass}">${status}</span></td>
                                </tr>
                            `
                        }).join('')}
                    </tbody>
                </table>

                <div class="footer">
                    <p>This report contains ${filteredVouchers.length} voucher(s) out of ${vouchers.length} total vouchers.</p>
                    <p>Report generated by Voucher Management System</p>
                </div>
            </body>
            </html>
        `

        printWindow.document.write(htmlContent)
        printWindow.document.close()
        
        // Wait for content to load then print
        printWindow.addEventListener('load', () => {
            setTimeout(() => {
                printWindow.print()
                printWindow.close()
            }, 250)
        })
    }

    const handleVoucherAction = (action: string, voucher: typeof mockVouchers[0]) => {
        switch (action) {
            case "view":
                setSelectedVoucher(voucher)
                setIsDetailsDialogOpen(true)
                break
            case "edit":
                setSelectedVoucher(voucher)
                setIsEditDialogOpen(true)
                break
            case "deactivate":
                setVouchers((prev) => prev.map((v) => (v.id === voucher.id ? { ...v, isActive: false } : v)))
                break
            case "delete":
                if (voucher) {
                    setVouchers((prev) => prev.filter((v) => v.id !== voucher.id))
                }
                break
        }
    }

    const handleVoucherUpdate = (updatedVoucher: typeof mockVouchers[0]) => {
        setVouchers((prev) => prev.map((v) => (v.id === updatedVoucher.id ? updatedVoucher : v)))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 p-3 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat text-gray-900">
                            Voucher Management
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Create, manage, and monitor all vouchers in the system
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full sm:w-auto border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300"
                            onClick={exportToPDF}
                        >
                            <FileText className="h-4 w-4 mr-2" />
                            Export PDF
                        </Button>
                        <Button 
                            size="sm" 
                            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white border-0 shadow-lg"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Voucher
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <Card className="border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-3 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
                                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">Total Vouchers</p>
                                    <p className="text-lg sm:text-xl font-bold font-montserrat text-gray-900">
                                        {vouchers.length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-3 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
                                    <Percent className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">Active Vouchers</p>
                                    <p className="text-lg sm:text-xl font-bold font-montserrat text-gray-900">
                                        {vouchers.filter((v) => v.isActive && new Date(v.validUntil) >= new Date()).length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-3 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">Total Usage</p>
                                    <p className="text-lg sm:text-xl font-bold font-montserrat text-gray-900">
                                        {vouchers.reduce((sum, v) => sum + v.currentUsageCount, 0)}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-3 sm:p-4">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">Expired</p>
                                    <p className="text-lg sm:text-xl font-bold font-montserrat text-gray-900">
                                        {vouchers.filter((v) => new Date(v.validUntil) < new Date()).length}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card className="border-orange-100 shadow-sm">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        placeholder="Search vouchers by title, code, or vendor..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-100"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
                                <Select value={filterStatus} onValueChange={setFilterStatus}>
                                    <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-100">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                        <SelectItem value="expired">Expired</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={filterType} onValueChange={setFilterType}>
                                    <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-100">
                                        <SelectValue placeholder="Filter by type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Types</SelectItem>
                                        <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                                        <SelectItem value="FIXED_AMOUNT">Fixed Amount</SelectItem>
                                        <SelectItem value="BOGO">Buy One Get One</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Vouchers Table */}
                <Card className="border-orange-100 shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="font-montserrat text-gray-900 text-lg sm:text-xl">
                            Vouchers ({filteredVouchers.length})
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Manage and monitor all vouchers in the system
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {/* Mobile Card View */}
                        <div className="block sm:hidden">
                            <div className="space-y-3 p-4">
                                {filteredVouchers.map((voucher) => (
                                    <Card key={voucher.id} className="border-orange-100 shadow-sm">
                                        <CardContent className="p-4 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="font-medium text-gray-900 truncate">{voucher.title}</h3>
                                                    <p className="text-sm text-gray-600 font-mono">{voucher.couponCode}</p>
                                                    <p className="text-sm text-gray-500">{voucher.vendorName}</p>
                                                </div>
                                                <div className="flex items-center gap-2 ml-2">
                                                    {getStatusBadge(voucher)}
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem onClick={() => handleVoucherAction("view", voucher)}>
                                                                <Eye className="h-4 w-4 mr-2" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleVoucherAction("edit", voucher)}>
                                                                <Edit className="h-4 w-4 mr-2" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handleVoucherAction("deactivate", voucher)}>
                                                                <Calendar className="h-4 w-4 mr-2" />
                                                                {voucher.isActive ? "Deactivate" : "Activate"}
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => handleVoucherAction("delete", voucher)}
                                                                className="text-red-600"
                                                            >
                                                                <Trash2 className="h-4 w-4 mr-2" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <p className="text-gray-500">Discount</p>
                                                    <div className="flex items-center gap-1 text-gray-900">
                                                        {voucher.discountType === "PERCENTAGE" ? (
                                                            <>
                                                                <Percent className="h-3 w-3" />
                                                                <span>{voucher.discountValue}%</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <DollarSign className="h-3 w-3" />
                                                                <span>${voucher.discountValue}</span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-gray-500">Usage</p>
                                                    <p className="text-gray-900">
                                                        {voucher.currentUsageCount} / {voucher.totalUsageLimit}
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <p className="text-gray-500 text-sm mb-1">Usage Progress</p>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className="bg-orange-500 h-2 rounded-full transition-all"
                                                        style={{
                                                            width: `${getUsageProgress(voucher.currentUsageCount, voucher.totalUsageLimit)}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="text-sm text-gray-500">
                                                <p>{new Date(voucher.validFrom).toLocaleDateString()} - {new Date(voucher.validUntil).toLocaleDateString()}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden sm:block overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-orange-100">
                                        <TableHead className="text-gray-700">Voucher Details</TableHead>
                                        <TableHead className="text-gray-700">Vendor</TableHead>
                                        <TableHead className="text-gray-700">Discount</TableHead>
                                        <TableHead className="text-gray-700">Usage</TableHead>
                                        <TableHead className="text-gray-700">Validity</TableHead>
                                        <TableHead className="text-gray-700">Status</TableHead>
                                        <TableHead className="text-right text-gray-700">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredVouchers.map((voucher) => (
                                        <TableRow key={voucher.id} className="border-orange-100 hover:bg-orange-50/50">
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium text-gray-900">{voucher.title}</div>
                                                    <div className="text-sm text-gray-600 font-mono">{voucher.couponCode}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm text-gray-900">{voucher.vendorName}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-gray-900">
                                                    {voucher.discountType === "PERCENTAGE" ? (
                                                        <>
                                                            <Percent className="h-3 w-3" />
                                                            <span>{voucher.discountValue}%</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <DollarSign className="h-3 w-3" />
                                                            <span>${voucher.discountValue}</span>
                                                        </>
                                                    )}
                                                </div>
                                                {voucher.maxDiscountAmount && (
                                                    <div className="text-xs text-gray-500">Max: ${voucher.maxDiscountAmount}</div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="text-sm text-gray-900">
                                                        {voucher.currentUsageCount} / {voucher.totalUsageLimit}
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                        <div
                                                            className="bg-orange-500 h-1.5 rounded-full transition-all"
                                                            style={{
                                                                width: `${getUsageProgress(voucher.currentUsageCount, voucher.totalUsageLimit)}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div className="text-gray-900">{new Date(voucher.validFrom).toLocaleDateString()}</div>
                                                    <div className="text-gray-500">
                                                        to {new Date(voucher.validUntil).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getStatusBadge(voucher)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="hover:bg-orange-50">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleVoucherAction("view", voucher)}>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Details
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleVoucherAction("edit", voucher)}>
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handleVoucherAction("deactivate", voucher)}>
                                                            <Calendar className="h-4 w-4 mr-2" />
                                                            {voucher.isActive ? "Deactivate" : "Activate"}
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => handleVoucherAction("delete", voucher)}
                                                            className="text-red-600"
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Voucher Details Dialog */}
                <VoucherDetailsDialog
                    voucher={selectedVoucher}
                    open={isDetailsDialogOpen}
                    onOpenChange={setIsDetailsDialogOpen}
                />

                {/* Voucher Edit Dialog */}
                <VoucherEditDialog
                    voucher={selectedVoucher}
                    open={isEditDialogOpen}
                    onOpenChange={setIsEditDialogOpen}
                    onSave={handleVoucherUpdate}
                />
            </div>
        </div>
    )
}
