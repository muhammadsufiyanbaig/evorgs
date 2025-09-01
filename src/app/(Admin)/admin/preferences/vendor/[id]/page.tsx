"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    ArrowLeft,
    Save,
    RotateCcw,
    Store,
    Bell,
    Mail,
    Calendar,
    Activity,
    Eye,
    EyeOff,
    Clock,
    Star,
} from "lucide-react"
import { toast } from "sonner"

// Mock data - in real app this would come from GraphQL
const mockVendor = {
    id: "1",
    vendorId: "vendor_001",
    businessName: "Tech Solutions Inc",
    email: "contact@techsolutions.com",
    category: "Technology",
    pushNotifications: true,
    emailNotifications: true,
    visibleInSearch: true,
    visibleReviews: true,
    workingHoursStart: "09:00",
    workingHoursEnd: "17:00",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    rating: 4.8,
    totalReviews: 124,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
    lastActive: "2024-01-25T09:15:00Z",
}

const workingDaysOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function EditVendorPage() {
    const router = useRouter()
    const [vendor, setVendor] = useState(mockVendor)
    const [isLoading, setIsLoading] = useState(false)

    const handleSave = async () => {
        setIsLoading(true)
        try {
            // In real app, this would call GraphQL mutation
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast.success("Vendor preferences updated successfully")
        } catch (error) {
            toast.error("Failed to update vendor preferences")
        } finally {
            setIsLoading(false)
        }
    }

    const handleReset = () => {
        setVendor(mockVendor)
        toast.info("Preferences reset to original values")
    }

    const handleWorkingDayToggle = (day: string) => {
        const currentDays = vendor.workingDays || []
        const updatedDays = currentDays.includes(day) ? currentDays.filter((d: string) => d !== day) : [...currentDays, day]
        setVendor({ ...vendor, workingDays: updatedDays })
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const formatWorkingDays = (days: string[]) => {
        if (days.length === 7) return "Every day"
        if (days.length === 5 && !days.includes("Saturday") && !days.includes("Sunday")) return "Weekdays"
        if (days.length === 2 && days.includes("Saturday") && days.includes("Sunday")) return "Weekends"
        return days.join(", ")
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" onClick={() => router.back()} className="border-orange-200 text-orange-600 hover:bg-orange-50">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div>
                        <h1 className="text-3xl font-bold text-orange-600">Edit Vendor Preferences</h1>
                        <p className="text-orange-500">Manage settings for {vendor.businessName}</p>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Vendor Information */}
                    <Card className="border-orange-200 bg-white">
                        <CardHeader className="bg-orange-50">
                            <CardTitle className="flex items-center gap-2 text-orange-600">
                                <Store className="w-5 h-5 text-primary" />
                                Vendor Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 bg-white">
                            <div>
                                <Label className="text-sm font-medium text-orange-500">Business Name</Label>
                                <p className="font-medium text-orange-800">{vendor.businessName}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-orange-500">Email</Label>
                                <p className="font-medium text-orange-800">{vendor.email}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-orange-500">Category</Label>
                                <Badge variant="outline" className="border-orange-300 text-orange-600 bg-orange-50">{vendor.category}</Badge>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-orange-500">Vendor ID</Label>
                                <p className="font-mono text-sm text-orange-700">{vendor.vendorId}</p>
                            </div>
                            <Separator className="bg-orange-200" />
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-yellow-500" />
                                    <Label className="text-sm font-medium text-orange-500">Rating</Label>
                                </div>
                                <p className="text-sm text-orange-700">
                                    {vendor.rating} ({vendor.totalReviews} reviews)
                                </p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <Label className="text-sm font-medium text-orange-500">Created</Label>
                                </div>
                                <p className="text-sm text-orange-700">{formatDate(vendor.createdAt)}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-muted-foreground" />
                                    <Label className="text-sm font-medium text-orange-500">Last Active</Label>
                                </div>
                                <p className="text-sm text-orange-700">{formatDate(vendor.lastActive)}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Vendor Preferences */}
                    <Card className="lg:col-span-2 border-orange-200 bg-white">
                        <CardHeader className="bg-orange-50">
                            <CardTitle className="text-orange-600">Vendor Preferences</CardTitle>
                            <CardDescription className="text-orange-500">Configure notifications, visibility, and working hours for this vendor</CardDescription>
                        </CardHeader>
                        <CardContent className="bg-white">
                            <Tabs defaultValue="notifications" className="w-full">
                                <TabsList className="grid w-full grid-cols-3 bg-orange-100">
                                    <TabsTrigger value="notifications" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-600">Notifications</TabsTrigger>
                                    <TabsTrigger value="visibility" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-600">Visibility</TabsTrigger>
                                    <TabsTrigger value="schedule" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-600">Schedule</TabsTrigger>
                                </TabsList>

                                <TabsContent value="notifications" className="space-y-6">
                                    {/* Push Notifications */}
                                    <div className="flex items-start justify-between space-x-4">
                                        <div className="space-y-1 flex-1">
                                            <div className="flex items-center gap-2">
                                                <Bell className="w-4 h-4 text-primary" />
                                                <Label className="text-base font-medium text-orange-600">Push Notifications</Label>
                                                <Badge variant={vendor.pushNotifications ? "default" : "secondary"} className={vendor.pushNotifications ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"}>
                                                    {vendor.pushNotifications ? "Enabled" : "Disabled"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-orange-500">
                                                Receive real-time notifications on mobile devices and desktop
                                            </p>
                                            <div className="text-xs text-orange-400">
                                                Includes order updates, customer inquiries, and system alerts
                                            </div>
                                        </div>
                                        <Switch
                                            checked={vendor.pushNotifications}
                                            onCheckedChange={(checked) => setVendor({ ...vendor, pushNotifications: checked })}
                                            className="data-[state=checked]:bg-orange-500"
                                        />
                                    </div>

                                    <Separator className="bg-orange-200" />

                                    {/* Email Notifications */}
                                    <div className="flex items-start justify-between space-x-4">
                                        <div className="space-y-1 flex-1">
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-primary" />
                                                <Label className="text-base font-medium text-orange-600">Email Notifications</Label>
                                                <Badge variant={vendor.emailNotifications ? "default" : "secondary"} className={vendor.emailNotifications ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"}>
                                                    {vendor.emailNotifications ? "Enabled" : "Disabled"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-orange-500">Receive notifications via email at {vendor.email}</p>
                                            <div className="text-xs text-orange-400">
                                                Includes daily summaries, important updates, and promotional opportunities
                                            </div>
                                        </div>
                                        <Switch
                                            checked={vendor.emailNotifications}
                                            onCheckedChange={(checked) => setVendor({ ...vendor, emailNotifications: checked })}
                                            className="data-[state=checked]:bg-orange-500"
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="visibility" className="space-y-6">
                                    {/* Search Visibility */}
                                    <div className="flex items-start justify-between space-x-4">
                                        <div className="space-y-1 flex-1">
                                            <div className="flex items-center gap-2">
                                                {vendor.visibleInSearch ? (
                                                    <Eye className="w-4 h-4 text-green-600" />
                                                ) : (
                                                    <EyeOff className="w-4 h-4 text-red-600" />
                                                )}
                                                <Label className="text-base font-medium text-orange-600">Search Visibility</Label>
                                                <Badge variant={vendor.visibleInSearch ? "default" : "secondary"} className={vendor.visibleInSearch ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"}>
                                                    {vendor.visibleInSearch ? "Visible" : "Hidden"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-orange-500">
                                                Allow customers to find this vendor in search results
                                            </p>
                                            <div className="text-xs text-orange-400">
                                                When disabled, vendor will not appear in public search listings
                                            </div>
                                        </div>
                                        <Switch
                                            checked={vendor.visibleInSearch}
                                            onCheckedChange={(checked) => setVendor({ ...vendor, visibleInSearch: checked })}
                                            className="data-[state=checked]:bg-orange-500"
                                        />
                                    </div>

                                    <Separator className="bg-orange-200" />

                                    {/* Reviews Visibility */}
                                    <div className="flex items-start justify-between space-x-4">
                                        <div className="space-y-1 flex-1">
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 text-yellow-500" />
                                                <Label className="text-base font-medium text-orange-600">Reviews Visibility</Label>
                                                <Badge variant={vendor.visibleReviews ? "default" : "secondary"} className={vendor.visibleReviews ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-600"}>
                                                    {vendor.visibleReviews ? "Visible" : "Hidden"}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-orange-500">Display customer reviews and ratings publicly</p>
                                            <div className="text-xs text-orange-400">
                                                Current rating: {vendor.rating} stars from {vendor.totalReviews} reviews
                                            </div>
                                        </div>
                                        <Switch
                                            checked={vendor.visibleReviews}
                                            onCheckedChange={(checked) => setVendor({ ...vendor, visibleReviews: checked })}
                                            className="data-[state=checked]:bg-orange-500"
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="schedule" className="space-y-6">
                                    {/* Working Hours */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-primary" />
                                            <Label className="text-base font-medium text-orange-600">Working Hours</Label>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-orange-600">Start Time</Label>
                                                <Input
                                                    type="time"
                                                    value={vendor.workingHoursStart}
                                                    onChange={(e) => setVendor({ ...vendor, workingHoursStart: e.target.value })}
                                                    className="border-orange-200 focus:border-orange-500 text-orange-700"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-orange-600">End Time</Label>
                                                <Input
                                                    type="time"
                                                    value={vendor.workingHoursEnd}
                                                    onChange={(e) => setVendor({ ...vendor, workingHoursEnd: e.target.value })}
                                                    className="border-orange-200 focus:border-orange-500 text-orange-700"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator className="bg-orange-200" />

                                    {/* Working Days */}
                                    <div className="space-y-4">
                                        <Label className="text-base font-medium text-orange-600">Working Days</Label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {workingDaysOptions.map((day) => (
                                                <div key={day} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={day}
                                                        checked={vendor.workingDays?.includes(day) || false}
                                                        onCheckedChange={() => handleWorkingDayToggle(day)}
                                                        className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                                                    />
                                                    <Label htmlFor={day} className="text-sm text-orange-700">
                                                        {day}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-xs text-orange-400">
                                            Current schedule: {formatWorkingDays(vendor.workingDays)}
                                        </div>
                                    </div>

                                    <Separator className="bg-orange-200" />

                                    {/* Current Schedule Summary */}
                                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                                        <h4 className="font-medium mb-2 text-orange-600">Current Schedule</h4>
                                        <div className="text-sm space-y-1">
                                            <div>
                                                <span className="text-orange-500">Hours:</span>
                                                <span className="ml-2 font-medium text-orange-700">
                                                    {vendor.workingHoursStart} - {vendor.workingHoursEnd}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-orange-500">Days:</span>
                                                <span className="ml-2 font-medium text-orange-700">{formatWorkingDays(vendor.workingDays)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-6">
                                <Button variant="outline" onClick={handleReset} className="border-orange-200 text-orange-600 hover:bg-orange-50">
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Reset Changes
                                </Button>
                                <Button onClick={handleSave} disabled={isLoading} className="bg-orange-500 hover:bg-orange-600 text-white">
                                    <Save className="w-4 h-4 mr-2" />
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
