"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Search, Calendar, Edit, Trash2, Play, Pause, ChevronDown, ChevronRight } from "lucide-react"
import type { NotificationPriority, NotificationCategory } from "@/utils/interfaces"
import Link from "next/link"

const scheduledNotifications = [
    {
        id: "1",
        title: "Weekly Newsletter",
        message: "Your weekly update with the latest features and improvements is ready!",
        category: "General" as NotificationCategory,
        priority: "medium" as NotificationPriority,
        scheduledFor: "2024-01-15T10:00:00Z",
        status: "active",
        recipientCount: 1250,
    },
    {
        id: "2",
        title: "Payment Reminder",
        message: "Your subscription payment is due tomorrow. Please ensure your payment method is up to date.",
        category: "Payment" as NotificationCategory,
        priority: "high" as NotificationPriority,
        scheduledFor: "2024-01-15T14:30:00Z",
        status: "active",
        recipientCount: 45,
    },
    {
        id: "3",
        title: "System Maintenance Alert",
        message: "Scheduled maintenance will occur tonight from 11 PM to 2 AM EST.",
        category: "System" as NotificationCategory,
        priority: "urgent" as NotificationPriority,
        scheduledFor: "2024-01-15T23:00:00Z",
        status: "active",
        recipientCount: 5000,
    },
    {
        id: "4",
        title: "Booking Confirmation",
        message: "Your booking has been confirmed for tomorrow at 3 PM.",
        category: "Booking" as NotificationCategory,
        priority: "medium" as NotificationPriority,
        scheduledFor: "2024-01-16T09:00:00Z",
        status: "paused",
        recipientCount: 120,
    },
    {
        id: "5",
        title: "Promotional Offer",
        message: "Limited time offer: 50% off on all premium features!",
        category: "Promotion" as NotificationCategory,
        priority: "low" as NotificationPriority,
        scheduledFor: "2024-01-16T12:00:00Z",
        status: "active",
        recipientCount: 2500,
    },
    {
        id: "6",
        title: "Security Update",
        message: "Important security update available. Please update your app.",
        category: "System" as NotificationCategory,
        priority: "high" as NotificationPriority,
        scheduledFor: "2024-01-17T08:00:00Z",
        status: "active",
        recipientCount: 4800,
    },
    {
        id: "7",
        title: "Chat Message Reminder",
        message: "You have unread messages from your support team.",
        category: "Chat" as NotificationCategory,
        priority: "medium" as NotificationPriority,
        scheduledFor: "2024-01-17T16:00:00Z",
        status: "active",
        recipientCount: 85,
    },
]

const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
}

const statusColors = {
    active: "bg-green-100 text-green-800",
    paused: "bg-gray-100 text-gray-800",
    completed: "bg-blue-100 text-blue-800",
}

const groupNotificationsByDate = (notifications: typeof scheduledNotifications) => {
    const grouped = notifications.reduce(
        (acc, notification) => {
            const date = new Date(notification.scheduledFor).toDateString()
            if (!acc[date]) {
                acc[date] = []
            }
            acc[date].push(notification)
            return acc
        },
        {} as Record<string, typeof scheduledNotifications>,
    )

    // Sort notifications within each date by time
    Object.keys(grouped).forEach((date) => {
        grouped[date].sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime())
    })

    return grouped
}

export default function ScheduledNotificationsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({})

    const filteredNotifications = scheduledNotifications.filter((notification) => {
        const matchesSearch =
            notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === "all" || notification.category === categoryFilter
        const matchesStatus = statusFilter === "all" || notification.status === statusFilter

        return matchesSearch && matchesCategory && matchesStatus
    })

    const groupedNotifications = groupNotificationsByDate(filteredNotifications)
    const sortedDates = Object.keys(groupedNotifications).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

    const toggleDateExpansion = (date: string) => {
        setExpandedDates((prev) => ({
            ...prev,
            [date]: !prev[date],
        }))
    }

    const formatDateHeader = (dateString: string) => {
        const date = new Date(dateString)
        const today = new Date()
        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        if (date.toDateString() === today.toDateString()) {
            return "Today"
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return "Tomorrow"
        } else {
            return date.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-orange-900">Scheduled Notifications</h1>
                        <p className="text-orange-700">
                            Manage and monitor your scheduled notifications organized by date and time
                        </p>
                    </div>
                    <Link href="/admin/notifications/send">
                        <Button className="bg-orange-600 hover:bg-orange-700 text-white border-orange-600">
                            <Calendar className="mr-2 h-4 w-4" />
                            Send New Notification
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-4">
                    <Card className="bg-white border-orange-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-orange-900">Total Scheduled</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-900">{scheduledNotifications.length}</div>
                            <p className="text-xs text-orange-600">+3 from last week</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-orange-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-orange-900">Active</CardTitle>
                            <Play className="h-4 w-4 text-green-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-900">
                                {scheduledNotifications.filter((n) => n.status === "active").length}
                            </div>
                            <p className="text-xs text-orange-600">Ready to send</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-orange-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-orange-900">Paused</CardTitle>
                            <Pause className="h-4 w-4 text-yellow-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-900">
                                {scheduledNotifications.filter((n) => n.status === "paused").length}
                            </div>
                            <p className="text-xs text-orange-600">Temporarily stopped</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-white border-orange-200 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-orange-900">Today</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-900">
                                {
                                    scheduledNotifications.filter(
                                        (n) => new Date(n.scheduledFor).toDateString() === new Date().toDateString(),
                                    ).length
                                }
                            </div>
                            <p className="text-xs text-orange-600">Scheduled for today</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="bg-white border-orange-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-orange-900">Filter Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search notifications..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                />
                            </div>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-full md:w-[180px] border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-orange-200">
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="General">General</SelectItem>
                                    <SelectItem value="Payment">Payment</SelectItem>
                                    <SelectItem value="System">System</SelectItem>
                                    <SelectItem value="Booking">Booking</SelectItem>
                                    <SelectItem value="Promotion">Promotion</SelectItem>
                                    <SelectItem value="Chat">Chat</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-[180px] border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-orange-200">
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="paused">Paused</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-4">
                    {sortedDates.map((date) => {
                        const notifications = groupedNotifications[date]
                        const isExpanded = expandedDates[date] ?? true

                        return (
                            <Card key={date} className="bg-white border-orange-200 shadow-sm">
                                <CardHeader
                                    className="cursor-pointer hover:bg-orange-50 transition-colors"
                                    onClick={() => toggleDateExpansion(date)}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {isExpanded ? (
                                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                            )}
                                            <div>
                                                <CardTitle className="text-lg text-orange-900">{formatDateHeader(date)}</CardTitle>
                                                <CardDescription className="text-orange-700">
                                                    {notifications.length} notification{notifications.length !== 1 ? "s" : ""} scheduled
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className="ml-auto border-orange-300 text-orange-700">
                                            {notifications.filter((n) => n.status === "active").length} active
                                        </Badge>
                                    </div>
                                </CardHeader>

                                {isExpanded && (
                                    <CardContent className="pt-0">
                                        <div className="overflow-x-auto">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow className="hover:bg-orange-50">
                                                        <TableHead className="text-orange-900">Time</TableHead>
                                                        <TableHead className="text-orange-900">Title</TableHead>
                                                        <TableHead className="hidden md:table-cell text-orange-900">Category</TableHead>
                                                        <TableHead className="hidden md:table-cell text-orange-900">Priority</TableHead>
                                                        <TableHead className="hidden sm:table-cell text-orange-900">Recipients</TableHead>
                                                        <TableHead className="text-orange-900">Status</TableHead>
                                                        <TableHead className="text-right text-orange-900">Actions</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {notifications.map((notification) => (
                                                        <TableRow key={notification.id} className="hover:bg-orange-50">
                                                            <TableCell>
                                                                <div className="font-mono text-sm text-orange-800">
                                                                    {new Date(notification.scheduledFor).toLocaleTimeString("en-US", {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                        hour12: true,
                                                                    })}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div>
                                                                    <div className="font-medium text-orange-900">{notification.title}</div>
                                                                    <div className="text-sm text-orange-600 max-w-xs truncate">
                                                                        {notification.message}
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <Badge variant="outline">{notification.category}</Badge>
                                                            </TableCell>
                                                            <TableCell className="hidden md:table-cell">
                                                                <Badge className={priorityColors[notification.priority]}>{notification.priority}</Badge>
                                                            </TableCell>
                                                            <TableCell className="hidden sm:table-cell text-orange-800">
                                                                {notification.recipientCount.toLocaleString()}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge className={statusColors[notification.status as keyof typeof statusColors]}>
                                                                    {notification.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex justify-end gap-2">
                                                                    <Button variant="ghost" size="sm" className="hover:bg-orange-100">
                                                                        <Edit className="h-4 w-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm" className="hover:bg-orange-100">
                                                                        {notification.status === "active" ? (
                                                                            <Pause className="h-4 w-4" />
                                                                        ) : (
                                                                            <Play className="h-4 w-4" />
                                                                        )}
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm" className="text-destructive hover:bg-orange-100">
                                                                        <Trash2 className="h-4 w-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardContent>
                                )}
                            </Card>
                        )
                    })}

                    {sortedDates.length === 0 && (
                        <Card className="bg-white border-orange-200 shadow-sm">
                            <CardContent className="py-12 text-center">
                                <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold mb-2 text-orange-900">No scheduled notifications found</h3>
                                <p className="text-orange-700 mb-4">
                                    {searchTerm || categoryFilter !== "all" || statusFilter !== "all"
                                        ? "Try adjusting your filters to see more results."
                                        : "Create your first scheduled notification to get started."}
                                </p>
                                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Schedule Notification
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
