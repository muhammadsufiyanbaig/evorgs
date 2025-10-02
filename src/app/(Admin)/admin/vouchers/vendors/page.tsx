"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
    Search,
    MoreHorizontal,
    Eye,
    Ban,
    CheckCircle,
    Store,
    DollarSign,
    AlertTriangle,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

// Custom Vendor Details Dialog Component
interface VendorDetailsDialogProps {
        vendor: any
        open: boolean
        onOpenChange: (open: boolean) => void
}

function VendorDetailsDialog({ vendor, open, onOpenChange }: VendorDetailsDialogProps) {
        if (!vendor) return null

        const getStatusBadge = (status: string) => {
                switch (status) {
                        case "ACTIVE":
                                return (
                                        <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                                                Active
                                        </Badge>
                                )
                        case "SUSPENDED":
                                return <Badge variant="destructive">Suspended</Badge>
                        case "INACTIVE":
                                return <Badge variant="secondary">Inactive</Badge>
                        default:
                                return <Badge variant="outline">{status}</Badge>
                }
        }

        return (
                <Dialog open={open} onOpenChange={onOpenChange}>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                        <DialogTitle className="font-montserrat text-xl text-orange-900">{vendor.name}</DialogTitle>
                                        <DialogDescription>
                                                Vendor ID: {vendor.id} | Category: {vendor.category}
                                        </DialogDescription>
                                </DialogHeader>
                                
                                <Tabs defaultValue="overview" className="w-full">
                                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-orange-50">
                                                <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Overview</TabsTrigger>
                                                <TabsTrigger value="performance" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Performance</TabsTrigger>
                                                <TabsTrigger value="vouchers" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Vouchers</TabsTrigger>
                                                <TabsTrigger value="activity" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Activity</TabsTrigger>
                                        </TabsList>
                                        
                                        <TabsContent value="overview" className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <Card className="border-orange-200">
                                                                <CardHeader>
                                                                        <CardTitle className="text-sm font-medium text-orange-900">Contact Information</CardTitle>
                                                                </CardHeader>
                                                                <CardContent className="space-y-2">
                                                                        <div>
                                                                                <span className="text-sm text-muted-foreground">Email:</span>
                                                                                <p className="font-medium text-orange-800">{vendor.email}</p>
                                                                        </div>
                                                                        <div>
                                                                                <span className="text-sm text-muted-foreground">Phone:</span>
                                                                                <p className="font-medium text-orange-800">{vendor.phone}</p>
                                                                        </div>
                                                                        <div>
                                                                                <span className="text-sm text-muted-foreground">Joined Date:</span>
                                                                                <p className="font-medium text-orange-800">{new Date(vendor.joinedDate).toLocaleDateString()}</p>
                                                                        </div>
                                                                        <div>
                                                                                <span className="text-sm text-muted-foreground">Status:</span>
                                                                                <div className="mt-1">{getStatusBadge(vendor.status)}</div>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                        
                                                        <Card className="border-orange-200">
                                                                <CardHeader>
                                                                        <CardTitle className="text-sm font-medium text-orange-900">Business Metrics</CardTitle>
                                                                </CardHeader>
                                                                <CardContent className="space-y-2">
                                                                        <div>
                                                                                <span className="text-sm text-muted-foreground">Total Revenue Impact:</span>
                                                                                <p className="font-medium text-lg text-orange-800">${vendor.totalDiscountGiven.toLocaleString()}</p>
                                                                        </div>
                                                                        <div>
                                                                                <span className="text-sm text-muted-foreground">Conversion Rate:</span>
                                                                                <p className="font-medium text-orange-800">{vendor.conversionRate}%</p>
                                                                        </div>
                                                                        <div>
                                                                                <span className="text-sm text-muted-foreground">Average Usage:</span>
                                                                                <p className="font-medium text-orange-800">${Math.round(vendor.averageUsagePerVoucher)}</p>
                                                                        </div>
                                                                        <div>
                                                                                <span className="text-sm text-muted-foreground">Fraud Incidents:</span>
                                                                                <p className={`font-medium ${vendor.fraudIncidents > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                                                                        {vendor.fraudIncidents}
                                                                                </p>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                </div>
                                                
                                                {vendor.suspensionReason && (
                                                        <Card className="border-red-200 bg-red-50">
                                                                <CardHeader>
                                                                        <CardTitle className="text-sm font-medium text-red-700">Suspension Details</CardTitle>
                                                                </CardHeader>
                                                                <CardContent>
                                                                        <p className="text-sm text-red-600">{vendor.suspensionReason}</p>
                                                                </CardContent>
                                                        </Card>
                                                )}
                                        </TabsContent>
                                        
                                        <TabsContent value="performance" className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <Card className="border-orange-200">
                                                                <CardContent className="p-4">
                                                                        <div className="text-center">
                                                                                <p className="text-2xl font-bold font-montserrat text-orange-600">{vendor.performance.rating}</p>
                                                                                <p className="text-sm text-muted-foreground">Rating</p>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                        <Card className="border-orange-200">
                                                                <CardContent className="p-4">
                                                                        <div className="text-center">
                                                                                <p className="text-2xl font-bold font-montserrat text-orange-600">{vendor.performance.responseTime}</p>
                                                                                <p className="text-sm text-muted-foreground">Response Time</p>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                        <Card className="border-orange-200">
                                                                <CardContent className="p-4">
                                                                        <div className="text-center">
                                                                                <p className="text-2xl font-bold font-montserrat text-orange-600">{vendor.performance.issueResolution}</p>
                                                                                <p className="text-sm text-muted-foreground">Issue Resolution</p>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                </div>
                                                
                                                <Card className="border-orange-200">
                                                        <CardHeader>
                                                                <CardTitle className="text-sm font-medium text-orange-900">Conversion Rate Trend</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="space-y-2">
                                                                        <div className="flex justify-between text-sm">
                                                                                <span>Conversion Rate</span>
                                                                                <span className="text-orange-600">{vendor.conversionRate}%</span>
                                                                        </div>
                                                                        <Progress value={vendor.conversionRate} className="h-2 bg-orange-100 [&>div]:bg-orange-500" />
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </TabsContent>
                                        
                                        <TabsContent value="vouchers" className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <Card className="border-orange-200">
                                                                <CardHeader>
                                                                        <CardTitle className="text-sm font-medium text-orange-900">Voucher Statistics</CardTitle>
                                                                </CardHeader>
                                                                <CardContent className="space-y-2">
                                                                        <div className="flex justify-between">
                                                                                <span className="text-sm text-muted-foreground">Total Vouchers:</span>
                                                                                <span className="font-medium text-orange-800">{vendor.totalVouchers}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                                <span className="text-sm text-muted-foreground">Active Vouchers:</span>
                                                                                <span className="font-medium text-orange-800">{vendor.activeVouchers}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                                <span className="text-sm text-muted-foreground">Total Usage:</span>
                                                                                <span className="font-medium text-orange-800">{vendor.totalUsage}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="flex justify-between">
                                                                                <span className="text-sm text-muted-foreground">Usage Rate:</span>
                                                                                <span className="font-medium text-orange-800">
                                                                                        {((vendor.activeVouchers / vendor.totalVouchers) * 100).toFixed(1)}%
                                                                                </span>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                        
                                                        <Card className="border-orange-200">
                                                                <CardHeader>
                                                                        <CardTitle className="text-sm font-medium text-orange-900">Revenue Impact</CardTitle>
                                                                </CardHeader>
                                                                <CardContent className="space-y-2">
                                                                        <div className="flex justify-between">
                                                                                <span className="text-sm text-muted-foreground">Total Discount Given:</span>
                                                                                <span className="font-medium text-orange-800">${vendor.totalDiscountGiven.toLocaleString()}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                                <span className="text-sm text-muted-foreground">Average per Voucher:</span>
                                                                                <span className="font-medium text-orange-800">${Math.round(vendor.averageUsagePerVoucher)}</span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                                <span className="text-sm text-muted-foreground">Average per Usage:</span>
                                                                                <span className="font-medium text-orange-800">
                                                                                        ${Math.round(vendor.totalDiscountGiven / vendor.totalUsage)}
                                                                                </span>
                                                                        </div>
                                                                </CardContent>
                                                        </Card>
                                                </div>
                                        </TabsContent>
                                        
                                        <TabsContent value="activity" className="space-y-4">
                                                <Card className="border-orange-200">
                                                        <CardHeader>
                                                                <CardTitle className="text-sm font-medium text-orange-900">Recent Activity</CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                                <div className="space-y-2">
                                                                        <div className="flex justify-between">
                                                                                <span className="text-sm text-muted-foreground">Last Activity:</span>
                                                                                <span className="font-medium text-orange-800">
                                                                                        {new Date(vendor.lastActivity).toLocaleString()}
                                                                                </span>
                                                                        </div>
                                                                        <div className="flex justify-between">
                                                                                <span className="text-sm text-muted-foreground">Account Status:</span>
                                                                                <span className="font-medium text-orange-800">{vendor.status}</span>
                                                                        </div>
                                                                        {vendor.fraudIncidents > 0 && (
                                                                                <div className="flex justify-between">
                                                                                        <span className="text-sm text-muted-foreground">Security Incidents:</span>
                                                                                        <span className="font-medium text-red-600">{vendor.fraudIncidents} reported</span>
                                                                                </div>
                                                                        )}
                                                                </div>
                                                        </CardContent>
                                                </Card>
                                        </TabsContent>
                                </Tabs>
                        </DialogContent>
                </Dialog>
        )
}

// TODO: Replace with GraphQL data from useQuery
const mockVendors: any[] = []

export default function VendorsPage() {
    const [vendors] = useState(mockVendors)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterCategory, setFilterCategory] = useState("all")
    const [selectedVendor, setSelectedVendor] = useState<any>(null)
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)

    const filteredVendors = vendors.filter((vendor) => {
        const matchesSearch =
            vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.email.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = filterStatus === "all" || vendor.status.toLowerCase() === filterStatus.toLowerCase()

        const matchesCategory = filterCategory === "all" || vendor.category === filterCategory

        return matchesSearch && matchesStatus && matchesCategory
    })

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "ACTIVE":
                return (
                    <Badge className="bg-orange-500 text-white hover:bg-orange-600">
                        Active
                    </Badge>
                )
            case "SUSPENDED":
                return <Badge variant="destructive">Suspended</Badge>
            case "INACTIVE":
                return <Badge variant="secondary">Inactive</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    const getCategoryBadge = (category: string) => {
        const colors: { [key: string]: string } = {
            FOOD: "bg-orange-100 text-orange-800 border-orange-200",
            RETAIL: "bg-blue-100 text-blue-800 border-blue-200",
            SERVICE: "bg-green-100 text-green-800 border-green-200",
        }
        return (
            <Badge variant="outline" className={colors[category] || ""}>
                {category}
            </Badge>
        )
    }

    const handleViewVendor = (vendor: any) => {
        setSelectedVendor(vendor)
        setIsDetailsDialogOpen(true)
    }

    const totalStats = {
        totalVendors: vendors.length,
        activeVendors: vendors.filter((v) => v.status === "ACTIVE").length,
        suspendedVendors: vendors.filter((v) => v.status === "SUSPENDED").length,
        totalRevenue: vendors.reduce((sum, v) => sum + v.totalDiscountGiven, 0),
    }

    return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4 md:p-6 space-y-4 md:space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl md:text-3xl font-bold font-montserrat text-orange-900">Vendor's Vouchers</h1>
                    <p className="text-orange-700 text-sm md:text-base">Monitor and manage all vendors in the system</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                    <Card className="border-orange-200 bg-white shadow-sm">
                        <CardContent className="p-3 md:p-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 md:p-2 bg-orange-100 rounded-lg">
                                    <Store className="h-3 w-3 md:h-4 md:w-4 text-orange-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm text-orange-700 truncate">Total Vendors</p>
                                    <p className="text-lg md:text-xl font-bold font-montserrat text-orange-900">{totalStats.totalVendors}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-orange-200 bg-white shadow-sm">
                        <CardContent className="p-3 md:p-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 md:p-2 bg-green-100 rounded-lg">
                                    <CheckCircle className="h-3 w-3 md:h-4 md:w-4 text-green-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm text-orange-700 truncate">Active Vendors</p>
                                    <p className="text-lg md:text-xl font-bold font-montserrat text-orange-900">{totalStats.activeVendors}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-orange-200 bg-white shadow-sm">
                        <CardContent className="p-3 md:p-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 md:p-2 bg-red-100 rounded-lg">
                                    <Ban className="h-3 w-3 md:h-4 md:w-4 text-red-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm text-orange-700 truncate">Suspended</p>
                                    <p className="text-lg md:text-xl font-bold font-montserrat text-orange-900">{totalStats.suspendedVendors}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-orange-200 bg-white shadow-sm">
                        <CardContent className="p-3 md:p-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 md:p-2 bg-orange-100 rounded-lg">
                                    <DollarSign className="h-3 w-3 md:h-4 md:w-4 text-orange-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs md:text-sm text-orange-700 truncate">Total Revenue</p>
                                    <p className="text-lg md:text-xl font-bold font-montserrat text-orange-900">${totalStats.totalRevenue.toLocaleString()}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card className="border-orange-200 bg-white shadow-sm">
                    <CardContent className="p-4 md:p-6">
                        <div className="flex flex-col gap-3 md:gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-400" />
                                <Input
                                    placeholder="Search vendors by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <Select value={filterStatus} onValueChange={setFilterStatus}>
                                    <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200">
                                        <SelectValue placeholder="Filter by status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="suspended">Suspended</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={filterCategory} onValueChange={setFilterCategory}>
                                    <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200">
                                        <SelectValue placeholder="Filter by category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Categories</SelectItem>
                                        <SelectItem value="FOOD">Food</SelectItem>
                                        <SelectItem value="RETAIL">Retail</SelectItem>
                                        <SelectItem value="SERVICE">Service</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Vendors Table */}
                <Card className="border-orange-200 bg-white shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="font-montserrat text-orange-900">Vendors ({filteredVendors.length})</CardTitle>
                        <CardDescription className="text-orange-700">Manage and monitor all vendors in the system</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-orange-100">
                                        <TableHead className="text-orange-800">Vendor Details</TableHead>
                                        <TableHead className="text-orange-800 hidden md:table-cell">Category</TableHead>
                                        <TableHead className="text-orange-800 hidden lg:table-cell">Performance</TableHead>
                                        <TableHead className="text-orange-800 hidden sm:table-cell">Vouchers</TableHead>
                                        <TableHead className="text-orange-800 hidden md:table-cell">Revenue</TableHead>
                                        <TableHead className="text-orange-800">Status</TableHead>
                                        <TableHead className="text-orange-800 text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredVendors.map((vendor) => (
                                        <TableRow key={vendor.id} className="border-orange-100 hover:bg-orange-50">
                                            <TableCell className="py-3">
                                                <div>
                                                    <div className="font-medium text-orange-900 text-sm md:text-base">{vendor.name}</div>
                                                    <div className="text-xs md:text-sm text-orange-600">{vendor.email}</div>
                                                    <div className="text-xs text-orange-500">
                                                        Joined: {new Date(vendor.joinedDate).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">{getCategoryBadge(vendor.category)}</TableCell>
                                            <TableCell className="hidden lg:table-cell">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs md:text-sm text-orange-700">Conversion:</span>
                                                        <span className="font-medium text-orange-900 text-xs md:text-sm">{vendor.conversionRate}%</span>
                                                    </div>
                                                    <Progress value={vendor.conversionRate} className="h-1.5 w-16 bg-orange-100 [&>div]:bg-orange-500" />
                                                    {vendor.fraudIncidents > 0 && (
                                                        <div className="flex items-center gap-1 text-xs text-red-600">
                                                            <AlertTriangle className="h-3 w-3" />
                                                            {vendor.fraudIncidents} fraud incidents
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <div className="text-xs md:text-sm">
                                                    <div className="text-orange-900">
                                                        {vendor.activeVouchers} / {vendor.totalVouchers} active
                                                    </div>
                                                    <div className="text-orange-600">{vendor.totalUsage} total uses</div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                <div className="text-xs md:text-sm">
                                                    <div className="font-medium text-orange-900">${vendor.totalDiscountGiven.toLocaleString()}</div>
                                                    <div className="text-orange-600">Avg: ${Math.round(vendor.averageUsagePerVoucher)}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    {getStatusBadge(vendor.status)}
                                                    {vendor.suspensionReason && (
                                                        <div className="text-xs text-red-600 max-w-24 md:max-w-32 truncate">
                                                            {vendor.suspensionReason}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handleViewVendor(vendor)}>
                                                            <Eye className="h-4 w-4 mr-2" />
                                                            View Details
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

                {/* Vendor Details Dialog */}
                <VendorDetailsDialog 
                    vendor={selectedVendor} 
                    open={isDetailsDialogOpen} 
                    onOpenChange={setIsDetailsDialogOpen} 
                />
            </div>
    )
}