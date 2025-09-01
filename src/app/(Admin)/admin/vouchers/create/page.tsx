"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye } from "lucide-react"
import Link from "next/link"

export default function CreateVoucherPage() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        code: "",
        discountType: "percentage",
        discountValue: "",
        minimumAmount: "",
        maximumDiscount: "",
        usageLimit: "",
        userLimit: "",
        validFrom: "",
        validUntil: "",
        vendor: "",
        category: "",
        isActive: true,
        isPublic: true,
    })

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Creating voucher:", formData)
        // Handle voucher creation
    }

    const generateCode = () => {
        const code = Math.random().toString(36).substring(2, 10).toUpperCase()
        setFormData((prev) => ({ ...prev, code }))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100/50 p-3 sm:p-4 lg:p-6">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <Link href="/admin/vouchers" className="w-fit">
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-orange-200 text-orange-700 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            <span className="hidden xs:inline">Back to Vouchers</span>
                            <span className="xs:hidden">Back</span>
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold font-montserrat text-gray-800 leading-tight">
                            Create New Voucher
                        </h1>
                        <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                            Set up a new voucher with custom parameters
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
                    {/* Main Form */}
                    <div className="xl:col-span-2 space-y-4 sm:space-y-6">
                        {/* Basic Information */}
                        <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg pb-4">
                                <CardTitle className="font-montserrat text-lg sm:text-xl">Basic Information</CardTitle>
                                <CardDescription className="text-orange-100">
                                    Essential voucher details and description
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 space-y-4 bg-white">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-gray-700 font-medium">
                                            Voucher Title *
                                        </Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange("title", e.target.value)}
                                            placeholder="e.g., Summer Sale 2024"
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="code" className="text-gray-700 font-medium">
                                            Voucher Code *
                                        </Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="code"
                                                value={formData.code}
                                                onChange={(e) => handleInputChange("code", e.target.value)}
                                                placeholder="e.g., SUMMER2024"
                                                className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 flex-1"
                                                required
                                            />
                                            <Button 
                                                type="button" 
                                                variant="outline" 
                                                onClick={generateCode}
                                                className="border-orange-300 text-orange-600 hover:bg-orange-50 whitespace-nowrap px-3 sm:px-4"
                                            >
                                                <span className="hidden sm:inline">Generate</span>
                                                <span className="sm:hidden">Gen</span>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-gray-700 font-medium">
                                        Description
                                    </Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        placeholder="Describe the voucher offer and terms"
                                        rows={3}
                                        className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 resize-none"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Discount Configuration */}
                        <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg pb-4">
                                <CardTitle className="font-montserrat text-lg sm:text-xl">Discount Configuration</CardTitle>
                                <CardDescription className="text-orange-100">
                                    Set discount type, value, and limitations
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 space-y-4 bg-white">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="discountType" className="text-gray-700 font-medium">
                                            Discount Type *
                                        </Label>
                                        <Select
                                            value={formData.discountType}
                                            onValueChange={(value) => handleInputChange("discountType", value)}
                                        >
                                            <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="percentage">Percentage (%)</SelectItem>
                                                <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                                                <SelectItem value="buy_one_get_one">Buy One Get One</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="discountValue" className="text-gray-700 font-medium">
                                            {formData.discountType === "percentage" ? "Percentage" : "Amount"} *
                                        </Label>
                                        <Input
                                            id="discountValue"
                                            type="number"
                                            value={formData.discountValue}
                                            onChange={(e) => handleInputChange("discountValue", e.target.value)}
                                            placeholder={formData.discountType === "percentage" ? "10" : "25.00"}
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                                        <Label htmlFor="minimumAmount" className="text-gray-700 font-medium">
                                            Minimum Order Amount
                                        </Label>
                                        <Input
                                            id="minimumAmount"
                                            type="number"
                                            value={formData.minimumAmount}
                                            onChange={(e) => handleInputChange("minimumAmount", e.target.value)}
                                            placeholder="0.00"
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                        />
                                    </div>
                                </div>
                                {formData.discountType === "percentage" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="maximumDiscount" className="text-gray-700 font-medium">
                                            Maximum Discount Amount
                                        </Label>
                                        <Input
                                            id="maximumDiscount"
                                            type="number"
                                            value={formData.maximumDiscount}
                                            onChange={(e) => handleInputChange("maximumDiscount", e.target.value)}
                                            placeholder="100.00"
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200 max-w-md"
                                        />
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Usage Limits */}
                        <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg pb-4">
                                <CardTitle className="font-montserrat text-lg sm:text-xl">Usage Limits</CardTitle>
                                <CardDescription className="text-orange-100">
                                    Control how many times the voucher can be used
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 space-y-4 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="usageLimit" className="text-gray-700 font-medium">
                                            Total Usage Limit
                                        </Label>
                                        <Input
                                            id="usageLimit"
                                            type="number"
                                            value={formData.usageLimit}
                                            onChange={(e) => handleInputChange("usageLimit", e.target.value)}
                                            placeholder="Unlimited"
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="userLimit" className="text-gray-700 font-medium">
                                            Per User Limit
                                        </Label>
                                        <Input
                                            id="userLimit"
                                            type="number"
                                            value={formData.userLimit}
                                            onChange={(e) => handleInputChange("userLimit", e.target.value)}
                                            placeholder="1"
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Validity Period */}
                        <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg pb-4">
                                <CardTitle className="font-montserrat text-lg sm:text-xl">Validity Period</CardTitle>
                                <CardDescription className="text-orange-100">
                                    Set when the voucher is active
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 space-y-4 bg-white">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="validFrom" className="text-gray-700 font-medium">
                                            Valid From *
                                        </Label>
                                        <Input
                                            id="validFrom"
                                            type="datetime-local"
                                            value={formData.validFrom}
                                            onChange={(e) => handleInputChange("validFrom", e.target.value)}
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="validUntil" className="text-gray-700 font-medium">
                                            Valid Until *
                                        </Label>
                                        <Input
                                            id="validUntil"
                                            type="datetime-local"
                                            value={formData.validUntil}
                                            onChange={(e) => handleInputChange("validUntil", e.target.value)}
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                                            required
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Vendor & Category */}
                        <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg pb-4">
                                <CardTitle className="font-montserrat text-lg">Assignment</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 space-y-4 bg-white">
                                <div className="space-y-2">
                                    <Label htmlFor="vendor" className="text-gray-700 font-medium">Vendor</Label>
                                    <Select value={formData.vendor} onValueChange={(value) => handleInputChange("vendor", value)}>
                                        <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200">
                                            <SelectValue placeholder="Select vendor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Vendors</SelectItem>
                                            <SelectItem value="vendor1">TechStore Pro</SelectItem>
                                            <SelectItem value="vendor2">Fashion Hub</SelectItem>
                                            <SelectItem value="vendor3">Food Paradise</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category" className="text-gray-700 font-medium">Category</Label>
                                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                        <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-200">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="electronics">Electronics</SelectItem>
                                            <SelectItem value="fashion">Fashion</SelectItem>
                                            <SelectItem value="food">Food & Dining</SelectItem>
                                            <SelectItem value="travel">Travel</SelectItem>
                                            <SelectItem value="services">Services</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Settings */}
                        <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg pb-4">
                                <CardTitle className="font-montserrat text-lg">Settings</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 space-y-4 bg-white">
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex-1 pr-4">
                                        <Label htmlFor="isActive" className="text-gray-700 font-medium block">Active Status</Label>
                                        <p className="text-sm text-gray-500 mt-1">Enable voucher for use</p>
                                    </div>
                                    <Switch
                                        id="isActive"
                                        checked={formData.isActive}
                                        onCheckedChange={(checked) => handleInputChange("isActive", checked)}
                                        className="data-[state=checked]:bg-orange-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between py-2">
                                    <div className="flex-1 pr-4">
                                        <Label htmlFor="isPublic" className="text-gray-700 font-medium block">Public Visibility</Label>
                                        <p className="text-sm text-gray-500 mt-1">Show in public listings</p>
                                    </div>
                                    <Switch
                                        id="isPublic"
                                        checked={formData.isPublic}
                                        onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                                        className="data-[state=checked]:bg-orange-500"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Preview */}
                        <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow duration-200">
                            <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg pb-4">
                                <CardTitle className="font-montserrat text-lg">Preview</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 sm:p-6 bg-white">
                                <div className="p-4 border-2 border-dashed border-orange-200 rounded-lg bg-orange-50/50">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base leading-tight flex-1 pr-2">
                                            {formData.title || "Voucher Title"}
                                        </h3>
                                        <Badge 
                                            variant={formData.isActive ? "default" : "secondary"}
                                            className={formData.isActive 
                                                ? "bg-orange-500 hover:bg-orange-600 text-white" 
                                                : "bg-gray-300 text-gray-700"
                                            }
                                        >
                                            {formData.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        Code: <span className="font-mono font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded text-xs">
                                            {formData.code || "VOUCHERCODE"}
                                        </span>
                                    </p>
                                    <p className="text-sm font-medium text-gray-800">
                                        {formData.discountType === "percentage"
                                            ? `${formData.discountValue || "0"}% off`
                                            : `$${formData.discountValue || "0"} off`}
                                    </p>
                                    {formData.minimumAmount && (
                                        <p className="text-xs text-gray-500 mt-2">
                                            Min. order: <span className="font-medium">${formData.minimumAmount}</span>
                                        </p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Actions */}
                        <div className="space-y-3">
                            <Button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2.5 transition-all duration-200"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Create Voucher
                            </Button>
                            <Button 
                                type="button" 
                                variant="outline" 
                                className="w-full bg-white border-orange-300 text-orange-600 hover:bg-orange-50 hover:border-orange-400 transition-all duration-200"
                            >
                                <Eye className="h-4 w-4 mr-2" />
                                Save as Draft
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
