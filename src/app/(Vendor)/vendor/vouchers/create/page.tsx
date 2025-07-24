"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Percent, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

const serviceTypes = [
  { id: "FarmHouse", label: "Farm House" },
  { id: "Venue", label: "Venue" },
  { id: "Catering", label: "Catering" },
  { id: "Photography", label: "Photography" },
]

export default function CreateVoucherPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    couponCode: "",
    title: "",
    description: "",
    discountType: "Percentage" as "Percentage" | "Fixed Amount",
    discountValue: "",
    maxDiscountAmount: "",
    minOrderValue: "",
    applicableFor: "All Services" as "All Services" | "Specific Services",
    serviceTypes: [] as string[],
    totalUsageLimit: "",
    usagePerUser: "1",
    validFrom: "",
    validUntil: "",
    isActive: true,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleServiceTypeChange = (serviceType: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        serviceTypes: [...prev.serviceTypes, serviceType],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        serviceTypes: prev.serviceTypes.filter((type) => type !== serviceType),
      }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Creating voucher:", formData)
    // Redirect back to vouchers list
    router.push("/vendor/vouchers")
  }

  const generateCouponCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    handleInputChange("couponCode", code)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/vendor/vouchers">
            <Button
              variant="outline"
              size="icon"
              className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-orange-900">Create New Voucher</h1>
            <p className="text-orange-700">Set up a new discount voucher for your services</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-orange-200 shadow-lg bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Basic Information</CardTitle>
              <CardDescription className="text-orange-100">Enter the basic details for your voucher</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="couponCode" className="text-orange-900 font-medium">
                    Coupon Code *
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="couponCode"
                      value={formData.couponCode}
                      onChange={(e) => handleInputChange("couponCode", e.target.value)}
                      placeholder="Enter coupon code"
                      className="font-mono border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                      required
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateCouponCode}
                      className="border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white bg-transparent"
                    >
                      Generate
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-orange-900 font-medium">
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter voucher title"
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-orange-900 font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter voucher description"
                  rows={3}
                  className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Discount Configuration */}
          <Card className="border-orange-200 shadow-lg bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Discount Configuration</CardTitle>
              <CardDescription className="text-orange-100">
                Configure the discount amount and conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discountType" className="text-orange-900 font-medium">
                    Discount Type *
                  </Label>
                  <Select
                    value={formData.discountType}
                    onValueChange={(value: "Percentage" | "Fixed Amount") => handleInputChange("discountType", value)}
                  >
                    <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-orange-200">
                      <SelectItem value="Percentage" className="hover:bg-orange-50">
                        <div className="flex items-center gap-2">
                          <Percent className="w-4 h-4 text-orange-600" />
                          Percentage
                        </div>
                      </SelectItem>
                      <SelectItem value="Fixed Amount" className="hover:bg-orange-50">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-orange-600" />
                          Fixed Amount
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountValue" className="text-orange-900 font-medium">
                    Discount Value * {formData.discountType === "Percentage" ? "(%)" : "(₹)"}
                  </Label>
                  <Input
                    id="discountValue"
                    type="number"
                    value={formData.discountValue}
                    onChange={(e) => handleInputChange("discountValue", e.target.value)}
                    placeholder={formData.discountType === "Percentage" ? "Enter percentage" : "Enter amount"}
                    min="0"
                    step={formData.discountType === "Percentage" ? "0.01" : "1"}
                    max={formData.discountType === "Percentage" ? "100" : undefined}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.discountType === "Percentage" && (
                  <div className="space-y-2">
                    <Label htmlFor="maxDiscountAmount" className="text-orange-900 font-medium">
                      Maximum Discount Amount (₹)
                    </Label>
                    <Input
                      id="maxDiscountAmount"
                      type="number"
                      value={formData.maxDiscountAmount}
                      onChange={(e) => handleInputChange("maxDiscountAmount", e.target.value)}
                      placeholder="Enter max discount amount"
                      min="0"
                      className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="minOrderValue" className="text-orange-900 font-medium">
                    Minimum Order Value (₹)
                  </Label>
                  <Input
                    id="minOrderValue"
                    type="number"
                    value={formData.minOrderValue}
                    onChange={(e) => handleInputChange("minOrderValue", e.target.value)}
                    placeholder="Enter minimum order value"
                    min="0"
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Targeting */}
          <Card className="border-orange-200 shadow-lg bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Service Targeting</CardTitle>
              <CardDescription className="text-orange-100">
                Choose which services this voucher applies to
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="space-y-2">
                <Label className="text-orange-900 font-medium">Applicable For *</Label>
                <Select
                  value={formData.applicableFor}
                  onValueChange={(value: "All Services" | "Specific Services") =>
                    handleInputChange("applicableFor", value)
                  }
                >
                  <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-orange-200">
                    <SelectItem value="All Services" className="hover:bg-orange-50">
                      All Services
                    </SelectItem>
                    <SelectItem value="Specific Services" className="hover:bg-orange-50">
                      Specific Services
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {formData.applicableFor === "Specific Services" && (
                <div className="space-y-2">
                  <Label className="text-orange-900 font-medium">Select Service Types *</Label>
                  <div className="grid grid-cols-2 gap-4">
                    {serviceTypes.map((service) => (
                      <div key={service.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={service.id}
                          checked={formData.serviceTypes.includes(service.id)}
                          onCheckedChange={(checked) => handleServiceTypeChange(service.id, checked as boolean)}
                          className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                        />
                        <Label htmlFor={service.id} className="text-orange-900">
                          {service.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Usage Limits */}
          <Card className="border-orange-200 shadow-lg bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Usage Limits</CardTitle>
              <CardDescription className="text-orange-100">
                Set limits on how many times this voucher can be used
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalUsageLimit" className="text-orange-900 font-medium">
                    Total Usage Limit
                  </Label>
                  <Input
                    id="totalUsageLimit"
                    type="number"
                    value={formData.totalUsageLimit}
                    onChange={(e) => handleInputChange("totalUsageLimit", e.target.value)}
                    placeholder="Leave empty for unlimited"
                    min="1"
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usagePerUser" className="text-orange-900 font-medium">
                    Usage Per User *
                  </Label>
                  <Input
                    id="usagePerUser"
                    type="number"
                    value={formData.usagePerUser}
                    onChange={(e) => handleInputChange("usagePerUser", e.target.value)}
                    placeholder="Enter usage per user"
                    min="1"
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validity Period */}
          <Card className="border-orange-200 shadow-lg bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Validity Period</CardTitle>
              <CardDescription className="text-orange-100">
                Set the date range when this voucher is valid
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="validFrom" className="text-orange-900 font-medium">
                    Valid From *
                  </Label>
                  <Input
                    id="validFrom"
                    type="datetime-local"
                    value={formData.validFrom}
                    onChange={(e) => handleInputChange("validFrom", e.target.value)}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="validUntil" className="text-orange-900 font-medium">
                    Valid Until *
                  </Label>
                  <Input
                    id="validUntil"
                    type="datetime-local"
                    value={formData.validUntil}
                    onChange={(e) => handleInputChange("validUntil", e.target.value)}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <Card className="border-orange-200 shadow-lg bg-white">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
              <CardTitle className="text-white">Status</CardTitle>
              <CardDescription className="text-orange-100">Set the initial status of this voucher</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <Label className="text-orange-900 font-medium">Voucher Status *</Label>
                <Select
                  value={formData.isActive ? "Active" : "Inactive"}
                  onValueChange={(value) => handleInputChange("isActive", value === "Active")}
                >
                  <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-orange-200">
                    <SelectItem value="Active" className="hover:bg-orange-50">
                      Active
                    </SelectItem>
                    <SelectItem value="Inactive" className="hover:bg-orange-50">
                      Inactive
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4 pb-6">
            <Link href="/vendor/vouchers">
              <Button
                type="button"
                variant="outline"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
              >
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white shadow-lg">
              Create Voucher
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
