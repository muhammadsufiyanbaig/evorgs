"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Send, Save } from "lucide-react"
import { NotificationCategory, NotificationPriority, NotificationType } from "@/utils/interfaces"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function CreateNotificationPage() {
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        category: NotificationCategory.General,
        priority: NotificationPriority.medium,
        type: NotificationType.All_Users,
        targetUserId: "",
        targetVendorId: "",
        linkTo: "",
        scheduleForLater: false,
        scheduledAt: undefined as Date | undefined,
    })

    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

    const handleInputChange = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (action: "save" | "send") => {
        console.log("Form submitted:", { action, data: formData })
        // Here you would call your GraphQL mutation
    }

    const getRecipientCount = () => {
        switch (formData.type) {
            case NotificationType.All_Users:
                return "~1,250 users"
            case NotificationType.All_Vendors:
                return "~85 vendors"
            case NotificationType.User_Personal:
                return "1 user"
            case NotificationType.Vendor_Personal:
                return "1 vendor"
            case NotificationType.General:
                return "~1,335 recipients"
            default:
                return "Unknown"
        }
    }

    return (
        <>
             <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gradient-to-br from-orange-50 to-white min-h-screen">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="border-orange-200 bg-white shadow-lg">
                                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                                    <CardTitle className="text-balance">Notification Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-orange-800 font-medium">Title *</Label>
                                        <Input
                                            id="title"
                                            placeholder="Enter notification title"
                                            value={formData.title}
                                            onChange={(e) => handleInputChange("title", e.target.value)}
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-orange-800 font-medium">Message *</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Enter notification message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => handleInputChange("message", e.target.value)}
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                        />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label className="text-orange-800 font-medium">Category</Label>
                                            <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                                                <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border-orange-200">
                                                    <SelectItem value={NotificationCategory.General}>General</SelectItem>
                                                    <SelectItem value={NotificationCategory.System}>System</SelectItem>
                                                    <SelectItem value={NotificationCategory.Payment}>Payment</SelectItem>
                                                    <SelectItem value={NotificationCategory.Booking}>Booking</SelectItem>
                                                    <SelectItem value={NotificationCategory.Chat}>Chat</SelectItem>
                                                    <SelectItem value={NotificationCategory.Promotion}>Promotion</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-orange-800 font-medium">Priority</Label>
                                            <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                                                <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-white border-orange-200">
                                                    <SelectItem value={NotificationPriority.low}>Low</SelectItem>
                                                    <SelectItem value={NotificationPriority.medium}>Medium</SelectItem>
                                                    <SelectItem value={NotificationPriority.high}>High</SelectItem>
                                                    <SelectItem value={NotificationPriority.urgent}>Urgent</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="linkTo" className="text-orange-800 font-medium">Link (Optional)</Label>
                                        <Input
                                            id="linkTo"
                                            placeholder="https://example.com/page"
                                            value={formData.linkTo}
                                            onChange={(e) => handleInputChange("linkTo", e.target.value)}
                                            className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-orange-200 bg-white shadow-lg">
                                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                                    <CardTitle className="text-balance">Target Audience</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    <div className="space-y-2">
                                        <Label className="text-orange-800 font-medium">Notification Type</Label>
                                        <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                                            <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-orange-200">
                                                <SelectItem value={NotificationType.All_Users}>All Users</SelectItem>
                                                <SelectItem value={NotificationType.All_Vendors}>All Vendors</SelectItem>
                                                <SelectItem value={NotificationType.User_Personal}>Specific User</SelectItem>
                                                <SelectItem value={NotificationType.Vendor_Personal}>Specific Vendor</SelectItem>
                                                <SelectItem value={NotificationType.General}>General (All)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {formData.type === NotificationType.User_Personal && (
                                        <div className="space-y-2">
                                            <Label htmlFor="targetUserId" className="text-orange-800 font-medium">Target User ID</Label>
                                            <Input
                                                id="targetUserId"
                                                placeholder="Enter user ID"
                                                value={formData.targetUserId}
                                                onChange={(e) => handleInputChange("targetUserId", e.target.value)}
                                                className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                            />
                                        </div>
                                    )}

                                    {formData.type === NotificationType.Vendor_Personal && (
                                        <div className="space-y-2">
                                            <Label htmlFor="targetVendorId" className="text-orange-800 font-medium">Target Vendor ID</Label>
                                            <Input
                                                id="targetVendorId"
                                                placeholder="Enter vendor ID"
                                                value={formData.targetVendorId}
                                                onChange={(e) => handleInputChange("targetVendorId", e.target.value)}
                                                className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                            />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <Card className="border-orange-200 bg-white shadow-lg">
                                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                                    <CardTitle className="text-balance">Scheduling</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="schedule"
                                            checked={formData.scheduleForLater}
                                            onCheckedChange={(checked) => handleInputChange("scheduleForLater", checked)}
                                            className="data-[state=checked]:bg-orange-500"
                                        />
                                        <Label htmlFor="schedule" className="text-orange-800 font-medium">Schedule for later</Label>
                                    </div>

                                    {formData.scheduleForLater && (
                                        <div className="space-y-2">
                                            <Label className="text-orange-800 font-medium">Scheduled Date & Time</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        className={cn(
                                                            "w-full justify-start text-left font-normal border-orange-200 hover:bg-orange-50 hover:border-orange-300",
                                                            !formData.scheduledAt && "text-muted-foreground",
                                                        )}
                                                    >
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {formData.scheduledAt ? format(formData.scheduledAt, "PPP") : "Pick a date"}
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 bg-white border-orange-200">
                                                    <Calendar
                                                        mode="single"
                                                        selected={formData.scheduledAt}
                                                        onSelect={(date) => handleInputChange("scheduledAt", date)}
                                                        initialFocus
                                                        className="rounded-md border-0"
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Preview Sidebar */}
                        <div className="space-y-6">
                            <Card className="border-orange-200 bg-white shadow-lg">
                                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                                    <CardTitle className="text-balance">Preview</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4 p-6">
                                    <div className="rounded-lg border border-orange-200 p-4 space-y-2 bg-orange-50">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">{formData.category}</Badge>
                                            <Badge variant={formData.priority === NotificationPriority.urgent ? "destructive" : "default"}>
                                                {formData.priority}
                                            </Badge>
                                        </div>
                                        <h4 className="font-semibold text-pretty text-orange-900">{formData.title || "Notification Title"}</h4>
                                        <p className="text-sm text-orange-700 text-pretty">
                                            {formData.message || "Notification message will appear here..."}
                                        </p>
                                        {formData.linkTo && <div className="text-xs text-orange-600">Link: {formData.linkTo}</div>}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-orange-200 bg-white shadow-lg">
                                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                                    <CardTitle className="text-balance">Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3 p-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-orange-600">Recipients:</span>
                                        <span className="font-medium text-orange-800">{getRecipientCount()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-orange-600">Type:</span>
                                        <span className="font-medium text-orange-800">{formData.type.replace("_", " ")}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-orange-600">Delivery:</span>
                                        <span className="font-medium text-orange-800">{formData.scheduleForLater ? "Scheduled" : "Immediate"}</span>
                                    </div>
                                    {formData.scheduleForLater && formData.scheduledAt && (
                                        <div className="flex justify-between text-sm">
                                            <span className="text-orange-600">Send at:</span>
                                            <span className="font-medium text-xs text-orange-800">{format(formData.scheduledAt, "MMM d, yyyy")}</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            <div className="space-y-2">
                                <Button
                                    onClick={() => handleSubmit("send")}
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white border-0"
                                    disabled={!formData.title || !formData.message}
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    {formData.scheduleForLater ? "Schedule" : "Send Now"}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => handleSubmit("save")}
                                    className="w-full border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400"
                                    disabled={!formData.title || !formData.message}
                                >
                                    <Save className="mr-2 h-4 w-4" />
                                    Save as Draft
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
