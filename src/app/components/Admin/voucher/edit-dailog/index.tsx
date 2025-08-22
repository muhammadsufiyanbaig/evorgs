"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Calendar, Percent, DollarSign, Users, ShoppingCart } from "lucide-react"

interface VoucherEditDialogProps {
    voucher: any
    open: boolean
    onOpenChange: (open: boolean) => void
    onSave: (updatedVoucher: any) => void
}

export function VoucherEditDialog({ voucher, open, onOpenChange, onSave }: VoucherEditDialogProps) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        couponCode: "",
        discountType: "PERCENTAGE",
        discountValue: 0,
        maxDiscountAmount: 0,
        minOrderValue: 0,
        applicableFor: "ALL",
        serviceTypes: [] as string[],
        totalUsageLimit: 0,
        usagePerUser: 1,
        validFrom: "",
        validUntil: "",
        isActive: true,
    })

    useEffect(() => {
        if (voucher) {
            setFormData({
                title: voucher.title || "",
                description: voucher.description || "",
                couponCode: voucher.couponCode || "",
                discountType: voucher.discountType || "PERCENTAGE",
                discountValue: voucher.discountValue || 0,
                maxDiscountAmount: voucher.maxDiscountAmount || 0,
                minOrderValue: voucher.minOrderValue || 0,
                applicableFor: voucher.applicableFor || "ALL",
                serviceTypes: voucher.serviceTypes || [],
                totalUsageLimit: voucher.totalUsageLimit || 0,
                usagePerUser: voucher.usagePerUser || 1,
                validFrom: voucher.validFrom ? voucher.validFrom.split("T")[0] : "",
                validUntil: voucher.validUntil ? voucher.validUntil.split("T")[0] : "",
                isActive: voucher.isActive ?? true,
            })
        }
    }, [voucher])

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleServiceTypeToggle = (serviceType: string) => {
        setFormData((prev) => ({
            ...prev,
            serviceTypes: prev.serviceTypes.includes(serviceType)
                ? prev.serviceTypes.filter((type) => type !== serviceType)
                : [...prev.serviceTypes, serviceType],
        }))
    }

    const handleSave = () => {
        const updatedVoucher = {
            ...voucher,
            ...formData,
            updatedAt: new Date().toISOString(),
        }
        onSave(updatedVoucher)
        onOpenChange(false)
    }

    if (!voucher) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-orange-200">
                <DialogHeader>
                    <DialogTitle className="font-montserrat text-orange-600">Edit Voucher</DialogTitle>
                    <DialogDescription className="text-orange-500">Update voucher details and settings for {voucher.vendorName}</DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Basic Information */}
                    <div className="space-y-6">
                        <Card className="border-orange-200 bg-white">
                            <CardHeader className="bg-orange-50">
                                <CardTitle className="text-lg font-montserrat text-orange-600">Basic Information</CardTitle>
                                <CardDescription className="text-orange-500">Core voucher details and description</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 bg-white">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-orange-600">Voucher Title</Label>
                                    <Input
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                        placeholder="e.g., 20% Off All Orders"
                                        className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-orange-600">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        placeholder="Detailed description of the voucher offer"
                                        rows={3}
                                        className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="couponCode" className="text-orange-600">Coupon Code</Label>
                                    <Input
                                        id="couponCode"
                                        value={formData.couponCode}
                                        onChange={(e) => handleInputChange("couponCode", e.target.value.toUpperCase())}
                                        placeholder="e.g., SAVE20"
                                        className="font-mono border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="isActive"
                                        checked={formData.isActive}
                                        onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                                        className="data-[state=checked]:bg-orange-500"
                                    />
                                    <Label htmlFor="isActive" className="text-orange-600">Active Status</Label>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-orange-200 bg-white">
                            <CardHeader className="bg-orange-50">
                                <CardTitle className="text-lg font-montserrat text-orange-600">Discount Configuration</CardTitle>
                                <CardDescription className="text-orange-500">Set discount type and value</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 bg-white">
                                <div className="space-y-2">
                                    <Label htmlFor="discountType" className="text-orange-600">Discount Type</Label>
                                    <Select
                                        value={formData.discountType}
                                        onValueChange={(value) => handleInputChange("discountType", value)}
                                    >
                                        <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-orange-200">
                                            <SelectItem value="PERCENTAGE" className="hover:bg-orange-50">
                                                <div className="flex items-center gap-2">
                                                    <Percent className="h-4 w-4 text-orange-500" />
                                                    <span className="text-orange-600">Percentage</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="FIXED_AMOUNT" className="hover:bg-orange-50">
                                                <div className="flex items-center gap-2">
                                                    <DollarSign className="h-4 w-4 text-orange-500" />
                                                    <span className="text-orange-600">Fixed Amount</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="BOGO" className="hover:bg-orange-50">
                                                <div className="flex items-center gap-2">
                                                    <ShoppingCart className="h-4 w-4 text-orange-500" />
                                                    <span className="text-orange-600">Buy One Get One</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="discountValue" className="text-orange-600">
                                            {formData.discountType === "PERCENTAGE" ? "Discount %" : "Discount Amount ($)"}
                                        </Label>
                                        <Input
                                            id="discountValue"
                                            type="number"
                                            value={formData.discountValue}
                                            onChange={(e) => handleInputChange("discountValue", Number.parseFloat(e.target.value) || 0)}
                                            min="0"
                                            step={formData.discountType === "PERCENTAGE" ? "1" : "0.01"}
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                        />
                                    </div>

                                    {formData.discountType === "PERCENTAGE" && (
                                        <div className="space-y-2">
                                            <Label htmlFor="maxDiscountAmount" className="text-orange-600">Max Discount ($)</Label>
                                            <Input
                                                id="maxDiscountAmount"
                                                type="number"
                                                value={formData.maxDiscountAmount}
                                                onChange={(e) => handleInputChange("maxDiscountAmount", Number.parseFloat(e.target.value) || 0)}
                                                min="0"
                                                step="0.01"
                                                className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="minOrderValue" className="text-orange-600">Minimum Order Value ($)</Label>
                                    <Input
                                        id="minOrderValue"
                                        type="number"
                                        value={formData.minOrderValue}
                                        onChange={(e) => handleInputChange("minOrderValue", Number.parseFloat(e.target.value) || 0)}
                                        min="0"
                                        step="0.01"
                                        className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Usage & Validity */}
                    <div className="space-y-6">
                        <Card className="border-orange-200 bg-white">
                            <CardHeader className="bg-orange-50">
                                <CardTitle className="text-lg font-montserrat text-orange-600">Usage Limits</CardTitle>
                                <CardDescription className="text-orange-500">Control voucher usage and user limits</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 bg-white">
                                <div className="space-y-2">
                                    <Label htmlFor="applicableFor" className="text-orange-600">Applicable For</Label>
                                    <Select
                                        value={formData.applicableFor}
                                        onValueChange={(value) => handleInputChange("applicableFor", value)}
                                    >
                                        <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-orange-200">
                                            <SelectItem value="ALL" className="hover:bg-orange-50">
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-orange-500" />
                                                    <span className="text-orange-600">All Users</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="NEW_USERS" className="hover:bg-orange-50">
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-orange-500" />
                                                    <span className="text-orange-600">New Users Only</span>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="EXISTING_USERS" className="hover:bg-orange-50">
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-4 w-4 text-orange-500" />
                                                    <span className="text-orange-600">Existing Users Only</span>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="totalUsageLimit" className="text-orange-600">Total Usage Limit</Label>
                                        <Input
                                            id="totalUsageLimit"
                                            type="number"
                                            value={formData.totalUsageLimit}
                                            onChange={(e) => handleInputChange("totalUsageLimit", Number.parseInt(e.target.value) || 0)}
                                            min="1"
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="usagePerUser" className="text-orange-600">Usage Per User</Label>
                                        <Input
                                            id="usagePerUser"
                                            type="number"
                                            value={formData.usagePerUser}
                                            onChange={(e) => handleInputChange("usagePerUser", Number.parseInt(e.target.value) || 1)}
                                            min="1"
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-orange-600">Service Types</Label>
                                    <div className="flex flex-wrap gap-2">
                                        {["FOOD", "RETAIL", "SERVICE", "DELIVERY"].map((type) => (
                                            <Badge
                                                key={type}
                                                variant={formData.serviceTypes.includes(type) ? "default" : "outline"}
                                                className={`cursor-pointer ${
                                                    formData.serviceTypes.includes(type)
                                                        ? "bg-orange-500 text-white hover:bg-orange-600"
                                                        : "border-orange-300 text-orange-600 hover:bg-orange-50"
                                                }`}
                                                onClick={() => handleServiceTypeToggle(type)}
                                            >
                                                {type}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-orange-200 bg-white">
                            <CardHeader className="bg-orange-50">
                                <CardTitle className="text-lg font-montserrat text-orange-600">Validity Period</CardTitle>
                                <CardDescription className="text-orange-500">Set voucher start and end dates</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 bg-white">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="validFrom" className="text-orange-600">Valid From</Label>
                                        <Input
                                            id="validFrom"
                                            type="date"
                                            value={formData.validFrom}
                                            onChange={(e) => handleInputChange("validFrom", e.target.value)}
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="validUntil" className="text-orange-600">Valid Until</Label>
                                        <Input
                                            id="validUntil"
                                            type="date"
                                            value={formData.validUntil}
                                            onChange={(e) => handleInputChange("validUntil", e.target.value)}
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                        />
                                    </div>
                                </div>

                                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="h-4 w-4 text-orange-500" />
                                        <span className="font-medium text-orange-600">Current Usage</span>
                                    </div>
                                    <div className="text-sm text-orange-500">
                                        {voucher.currentUsageCount} out of {voucher.totalUsageLimit} uses
                                    </div>
                                    <div className="w-full bg-white rounded-full h-2 mt-2 border border-orange-200">
                                        <div
                                            className="bg-orange-500 h-2 rounded-full"
                                            style={{
                                                width: `${Math.min((voucher.currentUsageCount / voucher.totalUsageLimit) * 100, 100)}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)} className="border-orange-300 text-orange-600 hover:bg-orange-50">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} className="bg-orange-500 hover:bg-orange-600 text-white">Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
