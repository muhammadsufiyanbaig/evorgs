"use client"

import type React from "react"

import { useState } from "react"
import {
  ArrowLeft,
  Edit,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Copy,
  Users,
  TrendingUp,
  Calendar,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for demonstration
const mockVoucher = {
  id: "1",
  couponCode: "WEDDING50",
  title: "Wedding Package Discount",
  description:
    "50% off on wedding photography packages for couples planning their special day. This exclusive offer is valid for all premium photography packages.",
  discountType: "Percentage" as const,
  discountValue: "50.00",
  maxDiscountAmount: "500.00",
  minOrderValue: "1000.00",
  applicableFor: "Specific Services" as const,
  serviceTypes: ["Photography"],
  totalUsageLimit: 100,
  usagePerUser: 1,
  currentUsageCount: 25,
  validFrom: "2024-01-01T00:00:00Z",
  validUntil: "2024-12-31T23:59:59Z",
  isActive: true,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
}

const mockUsageHistory = [
  {
    id: "1",
    userId: "user1",
    userName: "John Doe",
    userEmail: "john@example.com",
    bookingId: "booking1",
    originalAmount: "2000.00",
    discountAmount: "500.00",
    finalAmount: "1500.00",
    serviceType: "Photography",
    appliedAt: "2024-01-15T14:30:00Z",
  },
  {
    id: "2",
    userId: "user2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    bookingId: "booking2",
    originalAmount: "1500.00",
    discountAmount: "500.00",
    finalAmount: "1000.00",
    serviceType: "Photography",
    appliedAt: "2024-01-14T09:15:00Z",
  },
]

export default function VoucherDetailsPage() {
  const params = useParams()
  const [voucher, setVoucher] = useState(mockVoucher)
  const [usageHistory] = useState(mockUsageHistory)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const toggleVoucherStatus = () => {
    setVoucher((prev) => ({ ...prev, isActive: !prev.isActive }))
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

  const getUsagePercentage = () => {
    if (!voucher.totalUsageLimit) return 0
    return Math.round((voucher.currentUsageCount / voucher.totalUsageLimit) * 100)
  }

  const getTotalSavings = () => {
    return usageHistory.reduce((sum, usage) => sum + Number.parseFloat(usage.discountAmount), 0)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/vendor/vouchers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">{voucher.title}</h1>
            <p className="text-muted-foreground">Voucher Details & Analytics</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={toggleVoucherStatus}>
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
          </Button>
          <Link href={`/vendor/vouchers/${voucher.id}/edit`}>
            <Button variant="outline" className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-orange-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Total Usage</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{voucher.currentUsageCount}</div>
            <p className="text-xs text-muted-foreground">of {voucher.totalUsageLimit || "∞"} limit</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Usage Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{getUsagePercentage()}%</div>
            <progress value={getUsagePercentage()} className="mt-2 [&>div]:bg-orange-600" />
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Total Savings</CardTitle>
            <Target className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">₹{getTotalSavings().toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Customer savings</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Status</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusBadge(voucher.isActive, voucher.validUntil)}</div>
            <p className="text-xs text-muted-foreground">Expires {new Date(voucher.validUntil).toLocaleDateString()}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Voucher Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Voucher Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Coupon Code</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="bg-orange-50 border border-orange-200 px-2 py-1 rounded font-mono text-sm text-orange-800">
                      {voucher.couponCode}
                    </code>
                    <Button variant="ghost" size="sm" onClick={() => copyToClipboard(voucher.couponCode)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <div className="mt-1">{getStatusBadge(voucher.isActive, voucher.validUntil)}</div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-muted-foreground">Description</Label>
                <p className="mt-1 text-sm">{voucher.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Discount Type</Label>
                  <p className="mt-1 font-medium">{voucher.discountType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Discount Value</Label>
                  <p className="mt-1 font-medium">
                    {voucher.discountType === "Percentage" ? `${voucher.discountValue}%` : `₹${voucher.discountValue}`}
                  </p>
                </div>
              </div>

              {voucher.maxDiscountAmount && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Max Discount Amount</Label>
                    <p className="mt-1 font-medium">₹{voucher.maxDiscountAmount}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Min Order Value</Label>
                    <p className="mt-1 font-medium">₹{voucher.minOrderValue}</p>
                  </div>
                </div>
              )}

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Applicable For</Label>
                  <p className="mt-1 font-medium">{voucher.applicableFor}</p>
                </div>
                {voucher.serviceTypes.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Service Types</Label>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {voucher.serviceTypes.map((type) => (
                        <Badge
                          key={type}
                          variant="secondary"
                          className="bg-orange-100 text-orange-800 border-orange-200"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Valid From</Label>
                  <p className="mt-1 font-medium">{new Date(voucher.validFrom).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Valid Until</Label>
                  <p className="mt-1 font-medium">{new Date(voucher.validUntil).toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage History */}
          <Card>
            <CardHeader>
              <CardTitle>Usage History</CardTitle>
              <CardDescription>Recent applications of this voucher</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Original Amount</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Final Amount</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usageHistory.map((usage) => (
                      <TableRow key={usage.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{usage.userName}</div>
                            <div className="text-sm text-muted-foreground">{usage.userEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{usage.serviceType}</Badge>
                        </TableCell>
                        <TableCell>₹{Number.parseFloat(usage.originalAmount).toLocaleString()}</TableCell>
                        <TableCell className="text-green-600 font-medium">
                          -₹{Number.parseFloat(usage.discountAmount).toLocaleString()}
                        </TableCell>
                        <TableCell className="font-medium">
                          ₹{Number.parseFloat(usage.finalAmount).toLocaleString()}
                        </TableCell>
                        <TableCell>{new Date(usage.appliedAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              {usageHistory.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No usage history available yet.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Usage Limits & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Limits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Total Usage</span>
                  <span>
                    {voucher.currentUsageCount}/{voucher.totalUsageLimit || "∞"}
                  </span>
                </div>
                {voucher.totalUsageLimit && <progress value={getUsagePercentage()} className="[&>div]:bg-orange-600" />}
              </div>
              <Separator />
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Usage Per User</Label>
                <p className="mt-1 font-medium">{voucher.usagePerUser}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => copyToClipboard(voucher.couponCode)}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Coupon Code
              </Button>
              <Link href={`/vendor/vouchers/${voucher.id}/edit`} className="block">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent border-orange-600 text-orange-600 hover:bg-orange-50"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Voucher
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start bg-transparent" onClick={toggleVoucherStatus}>
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
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function Label({
  children,
  className,
  ...props
}: { children: React.ReactNode; className?: string; [key: string]: any }) {
  return (
    <label
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ""}`}
      {...props}
    >
      {children}
    </label>
  )
}
