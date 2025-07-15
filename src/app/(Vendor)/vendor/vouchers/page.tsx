"use client"

import { useState } from "react"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

// Mock data for demonstration
const mockVouchers = [
  {
    id: "1",
    couponCode: "WEDDING50",
    title: "Wedding Package Discount",
    description: "50% off on wedding photography packages",
    discountType: "Percentage" as const,
    discountValue: "50.00",
    maxDiscountAmount: "500.00",
    minOrderValue: "1000.00",
    applicableFor: "Specific Services" as const,
    serviceTypes: ["Photography"],
    totalUsageLimit: 100,
    usagePerUser: 1,
    currentUsageCount: 25,
    validFrom: "2024-01-01",
    validUntil: "2024-12-31",
    isActive: true,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    couponCode: "VENUE20",
    title: "Venue Booking Discount",
    description: "₹2000 off on venue bookings",
    discountType: "Fixed Amount" as const,
    discountValue: "2000.00",
    minOrderValue: "10000.00",
    applicableFor: "Specific Services" as const,
    serviceTypes: ["Venue"],
    totalUsageLimit: 50,
    usagePerUser: 1,
    currentUsageCount: 12,
    validFrom: "2024-02-01",
    validUntil: "2024-06-30",
    isActive: true,
    createdAt: "2024-02-01T00:00:00Z",
  },
  {
    id: "3",
    couponCode: "ALLFOOD15",
    title: "All Services Discount",
    description: "15% off on all services",
    discountType: "Percentage" as const,
    discountValue: "15.00",
    maxDiscountAmount: "1000.00",
    minOrderValue: "500.00",
    applicableFor: "All Services" as const,
    serviceTypes: [],
    totalUsageLimit: 200,
    usagePerUser: 2,
    currentUsageCount: 89,
    validFrom: "2024-03-01",
    validUntil: "2024-05-31",
    isActive: false,
    createdAt: "2024-03-01T00:00:00Z",
  },
]

export default function VouchersPage() {
  const [vouchers, setVouchers] = useState(mockVouchers)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredVouchers = vouchers.filter((voucher) => {
    const matchesSearch =
      voucher.couponCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && voucher.isActive) ||
      (statusFilter === "inactive" && !voucher.isActive)
    return matchesSearch && matchesStatus
  })

  const toggleVoucherStatus = (id: string) => {
    setVouchers(vouchers.map((voucher) => (voucher.id === id ? { ...voucher, isActive: !voucher.isActive } : voucher)))
  }

  const deleteVoucher = (id: string) => {
    setVouchers(vouchers.filter((voucher) => voucher.id !== id))
  }

  const getStatusBadge = (isActive: boolean, validUntil: string) => {
    const isExpired = new Date(validUntil) < new Date()
    if (isExpired) {
      return <Badge variant="destructive">Expired</Badge>
    }
    return isActive ? (
      <Badge variant="default" className="bg-orange-600 hover:bg-orange-700 text-white">
        Active
      </Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    )
  }

  const getUsagePercentage = (current: number, total: number | null) => {
    if (!total) return 0
    return Math.round((current / total) * 100)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Voucher Management</h1>
          <p className="text-muted-foreground">Create and manage discount vouchers for your services</p>
        </div>
        <Link href="/vendor/vouchers/create">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Create Voucher
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-orange-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Total Vouchers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{vouchers.length}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Active Vouchers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{vouchers.filter((v) => v.isActive).length}</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Total Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {vouchers.reduce((sum, v) => sum + v.currentUsageCount, 0)}
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Avg. Usage Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(
                vouchers.reduce((sum, v) => sum + getUsagePercentage(v.currentUsageCount, v.totalUsageLimit), 0) /
                  vouchers.length,
              )}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Vouchers</CardTitle>
          <CardDescription>Manage your discount vouchers and track their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vouchers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vouchers Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Coupon Code</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVouchers.map((voucher) => (
                  <TableRow key={voucher.id}>
                    <TableCell className="font-mono font-medium">{voucher.couponCode}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{voucher.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                          {voucher.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {voucher.discountType === "Percentage"
                          ? `${voucher.discountValue}%`
                          : `₹${voucher.discountValue}`}
                      </div>
                      {voucher.maxDiscountAmount && (
                        <div className="text-sm text-muted-foreground">Max: ₹{voucher.maxDiscountAmount}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          {voucher.currentUsageCount}/{voucher.totalUsageLimit || "∞"}
                        </div>
                        {voucher.totalUsageLimit && (
                          <div className="w-full bg-orange-100 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{
                                width: `${getUsagePercentage(voucher.currentUsageCount, voucher.totalUsageLimit)}%`,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(voucher.validUntil).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(voucher.isActive, voucher.validUntil)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/vendor/vouchers/${voucher.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/vendor/vouchers/${voucher.id}/edit`}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toggleVoucherStatus(voucher.id)}>
                            {voucher.isActive ? (
                              <>
                                <ToggleLeft className="w-4 h-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <ToggleRight className="w-4 h-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => deleteVoucher(voucher.id)} className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
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

          {filteredVouchers.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No vouchers found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
