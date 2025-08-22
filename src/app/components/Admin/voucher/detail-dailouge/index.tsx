"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Calendar, DollarSign, Percent, Target, Clock, TrendingUp } from "lucide-react"
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, Key } from "react"

interface VoucherDetailsDialogProps {
  voucher: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VoucherDetailsDialog({ voucher, open, onOpenChange }: VoucherDetailsDialogProps) {
  if (!voucher) return null

  const getStatusBadge = (voucher: { isActive: any; validUntil: string | number | Date }) => {
    if (!voucher.isActive) {
      return <Badge variant="secondary" className="bg-gray-100 text-gray-600">Inactive</Badge>
    }
    if (new Date(voucher.validUntil) < new Date()) {
      return (<Badge variant="destructive" className="bg-red-100 text-red-600">Expired</Badge>)
    }
    return (
      <Badge variant="default" className="bg-orange-500 text-white hover:bg-orange-600">
        Active
      </Badge>
    )
  }

  const getUsageProgress = (current: number, total: number) => {
    return Math.round((current / total) * 100)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-montserrat text-orange-600">{voucher.title}</DialogTitle>
              <DialogDescription className="text-base mt-2 text-gray-600">
                Code: <span className="font-mono font-medium text-orange-500">{voucher.couponCode}</span>
              </DialogDescription>
            </div>
            {getStatusBadge(voucher)}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card className="border-orange-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Target className="h-5 w-5 text-orange-500" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div>
                <label className="text-sm font-medium text-orange-400">Vendor</label>
                <p className="text-base text-gray-800">{voucher.vendorName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-orange-400">Description</label>
                <p className="text-base text-gray-800">{voucher.description}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-orange-400">Applicable For</label>
                <p className="text-base text-gray-800">{voucher.applicableFor.replace("_", " ")}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-orange-400">Service Types</label>
                <div className="flex gap-2 mt-1">
                  {voucher.serviceTypes.map((type: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                    <Badge key={index} variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discount Details */}
          <Card className="border-orange-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center gap-2 text-orange-600">
                {voucher.discountType === "PERCENTAGE" ? (
                  <Percent className="h-5 w-5 text-orange-500" />
                ) : (
                  <DollarSign className="h-5 w-5 text-orange-500" />
                )}
                Discount Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div>
                <label className="text-sm font-medium text-orange-400">Discount Type</label>
                <p className="text-base text-gray-800">{voucher.discountType.replace("_", " ")}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-orange-400">Discount Value</label>
                <p className="text-2xl font-bold font-montserrat text-orange-500">
                  {voucher.discountType === "PERCENTAGE" ? `${voucher.discountValue}%` : `$${voucher.discountValue}`}
                </p>
              </div>
              {voucher.maxDiscountAmount && (
                <div>
                  <label className="text-sm font-medium text-orange-400">Maximum Discount</label>
                  <p className="text-base text-gray-800">${voucher.maxDiscountAmount}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-medium text-orange-400">Minimum Order Value</label>
                <p className="text-base text-gray-800">${voucher.minOrderValue}</p>
              </div>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card className="border-orange-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                Usage Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-orange-400">Usage Progress</label>
                  <span className="text-sm font-medium text-gray-800">
                    {voucher.currentUsageCount} / {voucher.totalUsageLimit}
                  </span>
                </div>
                <Progress
                  value={getUsageProgress(voucher.currentUsageCount, voucher.totalUsageLimit)}
                  className="h-2 bg-orange-100 [&>div]:bg-orange-500"
                />
                <p className="text-xs text-orange-400 mt-1">
                  {getUsageProgress(voucher.currentUsageCount, voucher.totalUsageLimit)}% used
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-orange-400">Usage Per User Limit</label>
                <p className="text-base text-gray-800">{voucher.usagePerUser} times</p>
              </div>
              <div>
                <label className="text-sm font-medium text-orange-400">Remaining Uses</label>
                <p className="text-base font-medium text-orange-500">
                  {voucher.totalUsageLimit - voucher.currentUsageCount}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Validity Period */}
          <Card className="border-orange-200 bg-white">
            <CardHeader className="bg-orange-50">
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <Calendar className="h-5 w-5 text-orange-500" />
                Validity Period
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 bg-white">
              <div>
                <label className="text-sm font-medium text-orange-400">Valid From</label>
                <p className="text-base text-gray-800">{new Date(voucher.validFrom).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-orange-400">Valid Until</label>
                <p className="text-base text-gray-800">{new Date(voucher.validUntil).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-orange-400">Days Remaining</label>
                <p className="text-base font-medium text-orange-500">
                  {Math.max(
                    0,
                    Math.ceil((new Date(voucher.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
                  )}{" "}
                  days
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="bg-orange-200" />

        {/* Timestamps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-400">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Created: {new Date(voucher.createdAt).toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Last Updated: {new Date(voucher.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
