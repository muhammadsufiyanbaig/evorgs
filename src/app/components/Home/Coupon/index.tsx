"use client"

import { useState } from "react"
import { Check, X, Tag, AlertCircle, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

// Types based on the schema
type DiscountType = "Percentage" | "Fixed Amount"
type ServiceType = "FarmHouse" | "Venue" | "Catering" | "Photography"

interface Voucher {
  id: string
  couponCode: string
  title: string
  description: string
  discountType: DiscountType
  discountValue: number
  maxDiscountAmount?: number
  minOrderValue?: number
  applicableFor: "All Services" | "Specific Services"
  serviceTypes?: ServiceType[]
  validFrom: string
  validUntil: string
  usagePerUser: number
  totalUsageLimit?: number
  currentUsageCount: number
}

interface BookingDetails {
  serviceType: ServiceType
  serviceId: string
  originalAmount: number
}

interface VoucherApplicationProps {
  bookingDetails: BookingDetails
  onVoucherApplied?: (discountAmount: number, finalAmount: number, voucher: Voucher) => void
  onVoucherRemoved?: () => void
}

export default function VoucherApplication({
  bookingDetails = {
    serviceType: "Venue",
    serviceId: "service-123",
    originalAmount: 25000,
  },
  onVoucherApplied,
  onVoucherRemoved,
}: VoucherApplicationProps) {
  const [couponCode, setCouponCode] = useState("")
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState("")
  const [discountAmount, setDiscountAmount] = useState(0)
  const [finalAmount, setFinalAmount] = useState(bookingDetails.originalAmount)

  // Mock function to simulate voucher validation
  const validateVoucher = async (code: string): Promise<Voucher | null> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock voucher data for demonstration
    const mockVouchers: Record<string, Voucher> = {
      SAVE20: {
        id: "voucher-1",
        couponCode: "SAVE20",
        title: "20% Off All Services",
        description: "Get 20% discount on all bookings",
        discountType: "Percentage",
        discountValue: 20,
        maxDiscountAmount: 5000,
        minOrderValue: 10000,
        applicableFor: "All Services",
        validFrom: "2024-01-01",
        validUntil: "2024-12-31",
        usagePerUser: 1,
        currentUsageCount: 45,
      },
      VENUE500: {
        id: "voucher-2",
        couponCode: "VENUE500",
        title: "₹500 Off Venue Booking",
        description: "Fixed discount on venue bookings",
        discountType: "Fixed Amount",
        discountValue: 500,
        minOrderValue: 15000,
        applicableFor: "Specific Services",
        serviceTypes: ["Venue", "FarmHouse"],
        validFrom: "2024-01-01",
        validUntil: "2024-12-31",
        usagePerUser: 2,
        currentUsageCount: 23,
      },
      EXPIRED: {
        id: "voucher-3",
        couponCode: "EXPIRED",
        title: "Expired Voucher",
        description: "This voucher has expired",
        discountType: "Percentage",
        discountValue: 15,
        applicableFor: "All Services",
        validFrom: "2023-01-01",
        validUntil: "2023-12-31",
        usagePerUser: 1,
        currentUsageCount: 10,
      },
    }

    return mockVouchers[code.toUpperCase()] || null
  }

  const calculateDiscount = (voucher: Voucher, originalAmount: number): number => {
    if (voucher.discountType === "Percentage") {
      const discount = (originalAmount * voucher.discountValue) / 100
      return voucher.maxDiscountAmount ? Math.min(discount, voucher.maxDiscountAmount) : discount
    } else {
      return voucher.discountValue
    }
  }

  const isVoucherValid = (voucher: Voucher): { valid: boolean; reason?: string } => {
    const now = new Date()
    const validFrom = new Date(voucher.validFrom)
    const validUntil = new Date(voucher.validUntil)

    if (now < validFrom || now > validUntil) {
      return { valid: false, reason: "Voucher has expired or is not yet active" }
    }

    if (voucher.minOrderValue && bookingDetails.originalAmount < voucher.minOrderValue) {
      return { valid: false, reason: `Minimum order value of ₹${voucher.minOrderValue.toLocaleString()} required` }
    }

    if (voucher.applicableFor === "Specific Services" && voucher.serviceTypes) {
      if (!voucher.serviceTypes.includes(bookingDetails.serviceType)) {
        return { valid: false, reason: `This voucher is not applicable for ${bookingDetails.serviceType} bookings` }
      }
    }

    return { valid: true }
  }

  const handleApplyVoucher = async () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code")
      return
    }

    setIsValidating(true)
    setError("")

    try {
      const voucher = await validateVoucher(couponCode)

      if (!voucher) {
        setError("Invalid coupon code")
        setIsValidating(false)
        return
      }

      const validation = isVoucherValid(voucher)
      if (!validation.valid) {
        setError(validation.reason || "Voucher is not valid")
        setIsValidating(false)
        return
      }

      const discount = calculateDiscount(voucher, bookingDetails.originalAmount)
      const final = bookingDetails.originalAmount - discount

      setAppliedVoucher(voucher)
      setDiscountAmount(discount)
      setFinalAmount(final)
      setIsValidating(false)

      onVoucherApplied?.(discount, final, voucher)
    } catch (err) {
      setError("Failed to validate voucher. Please try again.")
      setIsValidating(false)
    }
  }

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null)
    setDiscountAmount(0)
    setFinalAmount(bookingDetails.originalAmount)
    setCouponCode("")
    setError("")
    onVoucherRemoved?.()
  }

  return (
    <Card className="w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-orange-700">
          <div className="p-2 bg-white rounded-xl shadow-md">
            <Tag className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <span className="text-xl font-bold">Apply Coupon</span>
            <Sparkles className="h-4 w-4 inline ml-2 text-orange-500" />
          </div>
        </CardTitle>
        <CardDescription className="text-orange-600 font-medium">
          Enter a coupon code to get amazing discounts on your booking
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        {!appliedVoucher ? (
          <div className="space-y-4">
            <div className="flex gap-3">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                disabled={isValidating}
                className="flex-1 h-12 border-2 border-orange-100 focus:border-orange-300 rounded-xl bg-orange-50/50"
              />
              <Button
                onClick={handleApplyVoucher}
                disabled={isValidating || !couponCode.trim()}
                className="h-12 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg transition-all duration-300 rounded-xl"
              >
                {isValidating ? <Loader2 className="h-5 w-5 animate-spin" /> : "Apply"}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50 rounded-xl">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription className="font-medium">{error}</AlertDescription>
              </Alert>
            )}

            <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-4 rounded-xl">
              <p className="text-orange-700 font-semibold mb-2">✨ Try these sample codes:</p>
              <div className="flex gap-2">
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-white hover:shadow-md transition-all duration-200 bg-white/80 text-orange-700 font-semibold px-4 py-2 rounded-full"
                  onClick={() => setCouponCode("SAVE20")}
                >
                  SAVE20
                </Badge>
                <Badge
                  variant="secondary"
                  className="cursor-pointer hover:bg-white hover:shadow-md transition-all duration-200 bg-white/80 text-orange-700 font-semibold px-4 py-2 rounded-full"
                  onClick={() => setCouponCode("VENUE500")}
                >
                  VENUE500
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-2xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500 rounded-full">
                  <Check className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-green-800 text-lg">{appliedVoucher.title}</p>
                  <p className="text-green-600 font-semibold">{appliedVoucher.couponCode}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRemoveVoucher}
                className="text-green-700 hover:text-green-800 hover:bg-green-200 rounded-full p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {appliedVoucher.description && (
              <p className="text-gray-600 bg-gray-50 p-4 rounded-xl font-medium">{appliedVoucher.description}</p>
            )}
          </div>
        )}

        <Separator className="bg-orange-200" />

        {/* Enhanced Order Summary */}
        <div className="space-y-4">
          <h4 className="font-bold text-lg text-gray-900 flex items-center gap-2">📋 Order Summary</h4>

          <div className="bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-2xl space-y-3">
            <div className="flex justify-between text-base">
              <span className="text-gray-700 font-medium">Service Amount</span>
              <span className="font-bold text-gray-900">₹{bookingDetails.originalAmount.toLocaleString()}</span>
            </div>

            {appliedVoucher && (
              <div className="flex justify-between text-base text-green-700 bg-white/50 p-3 rounded-xl">
                <span className="font-medium">
                  💰 Discount (
                  {appliedVoucher.discountType === "Percentage"
                    ? `${appliedVoucher.discountValue}%`
                    : `₹${appliedVoucher.discountValue}`}
                  )
                </span>
                <span className="font-bold">-₹{discountAmount.toLocaleString()}</span>
              </div>
            )}

            <Separator className="bg-orange-300" />

            <div className="flex justify-between text-xl font-bold">
              <span className="text-gray-900">Total Amount</span>
              <span className={appliedVoucher ? "text-orange-600" : "text-gray-900"}>
                ₹{finalAmount.toLocaleString()}
              </span>
            </div>

            {appliedVoucher && (
              <div className="text-center bg-green-100 p-3 rounded-xl">
                <p className="text-green-700 font-bold text-lg">🎉 You saved ₹{discountAmount.toLocaleString()}!</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Service Info */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-600 font-medium">
            <span className="text-orange-600">Service:</span> {bookingDetails.serviceType}
          </p>
          <p className="text-sm text-gray-600 font-medium">
            <span className="text-orange-600">Service ID:</span> {bookingDetails.serviceId}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
