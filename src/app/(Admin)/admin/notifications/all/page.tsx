"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2, Send } from "lucide-react"
import { NotificationCategory, NotificationPriority, NotificationType } from "@/utils/interfaces"
import Link from "next/link"

// Mock data - in real app this would come from GraphQL
const mockNotifications = [
    {
        id: "1",
        title: "System Maintenance Alert",
        message: "Scheduled maintenance will occur tonight from 2-4 AM EST. Please save your work.",
        category: NotificationCategory.System,
        priority: NotificationPriority.high,
        type: NotificationType.All_Users,
        recipients: 1250,
        sent: 1250,
        read: 890,
        createdAt: "2024-01-15T10:30:00Z",
        status: "sent",
    },
    {
        id: "2",
        title: "New Feature Release",
        message: "Check out our latest features in the dashboard including advanced analytics.",
        category: NotificationCategory.General,
        priority: NotificationPriority.medium,
        type: NotificationType.All_Users,
        recipients: 1250,
        sent: 0,
        read: 0,
        createdAt: "2024-01-15T09:15:00Z",
        status: "draft",
    },
    {
        id: "3",
        title: "Payment Reminder",
        message: "Your subscription will expire in 3 days. Please update your payment method.",
        category: NotificationCategory.Payment,
        priority: NotificationPriority.urgent,
        type: NotificationType.User_Personal,
        recipients: 45,
        sent: 45,
        read: 23,
        createdAt: "2024-01-15T08:00:00Z",
        status: "sent",
    },
    {
        id: "4",
        title: "Booking Confirmation",
        message: "Your booking has been confirmed for tomorrow at 2:00 PM.",
        category: NotificationCategory.Booking,
        priority: NotificationPriority.medium,
        type: NotificationType.User_Personal,
        recipients: 1,
        sent: 1,
        read: 1,
        createdAt: "2024-01-15T07:45:00Z",
        status: "sent",
    },
    {
        id: "5",
        title: "Weekly Promotion",
        message: "Get 20% off on all premium features this week only!",
        category: NotificationCategory.Promotion,
        priority: NotificationPriority.low,
        type: NotificationType.All_Users,
        recipients: 1250,
        sent: 0,
        read: 0,
        createdAt: "2024-01-15T06:00:00Z",
        status: "scheduled",
    },
]

const getPriorityColor = (priority: NotificationPriority) => {
    switch (priority) {
        case NotificationPriority.urgent:
            return "destructive"
        case NotificationPriority.high:
            return "default"
        case NotificationPriority.medium:
            return "secondary"
        case NotificationPriority.low:
            return "outline"
        default:
            return "secondary"
    }
}

const getCategoryColor = (category: NotificationCategory) => {
    switch (category) {
        case NotificationCategory.System:
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        case NotificationCategory.Payment:
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        case NotificationCategory.Booking:
            return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
        case NotificationCategory.Chat:
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        case NotificationCategory.Promotion:
            return "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "sent":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        case "draft":
            return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
        case "scheduled":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
    }
}

export default function NotificationsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [statusFilter, setStatusFilter] = useState<string>("all")

    const filteredNotifications = mockNotifications.filter((notification) => {
        const matchesSearch =
            notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.message.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = categoryFilter === "all" || notification.category === categoryFilter
        const matchesStatus = statusFilter === "all" || notification.status === statusFilter

        return matchesSearch && matchesCategory && matchesStatus
    })

    return (
        <>
            <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gradient-to-br from-orange-50 to-white min-h-screen">
                <div className="space-y-6">
                    {/* Filters and Actions */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-1 gap-2">
                            <div className="relative flex-1 max-w-sm">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-orange-600" />
                                <Input
                                    placeholder="Search notifications..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-8 border-orange-200 focus:border-orange-400 focus:ring-orange-400 bg-white"
                                />
                            </div>
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-[140px] border-orange-200 focus:border-orange-400 focus:ring-orange-400 bg-white">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-orange-200">
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value={NotificationCategory.System}>System</SelectItem>
                                    <SelectItem value={NotificationCategory.Payment}>Payment</SelectItem>
                                    <SelectItem value={NotificationCategory.Booking}>Booking</SelectItem>
                                    <SelectItem value={NotificationCategory.Chat}>Chat</SelectItem>
                                    <SelectItem value={NotificationCategory.Promotion}>Promotion</SelectItem>
                                    <SelectItem value={NotificationCategory.General}>General</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[120px] border-orange-200 focus:border-orange-400 focus:ring-orange-400 bg-white">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border-orange-200">
                                    <SelectItem value="all">All Status</SelectItem>
                                    <SelectItem value="sent">Sent</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="scheduled">Scheduled</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Link href="/admin/notifications/send">
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white border-orange-600">
                                <Plus className="mr-2 h-4 w-4" />
                                Send New Notification
                            </Button>
                        </Link>
                    </div>

                    {/* Notifications Table */}
                    <Card className="border-orange-200 bg-white shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                            <CardTitle className="text-balance text-white">Notifications ({filteredNotifications.length})</CardTitle>
                        </CardHeader>
                        <CardContent className="bg-white">
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="border-orange-100 hover:bg-orange-50">
                                            <TableHead className="text-orange-800 font-semibold">Title & Message</TableHead>
                                            <TableHead className="hidden md:table-cell text-orange-800 font-semibold">Category</TableHead>
                                            <TableHead className="hidden lg:table-cell text-orange-800 font-semibold">Priority</TableHead>
                                            <TableHead className="hidden lg:table-cell text-orange-800 font-semibold">Recipients</TableHead>
                                            <TableHead className="hidden sm:table-cell text-orange-800 font-semibold">Status</TableHead>
                                            <TableHead className="hidden xl:table-cell text-orange-800 font-semibold">Created</TableHead>
                                            <TableHead className="w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredNotifications.map((notification) => (
                                            <TableRow key={notification.id} className="border-orange-100 hover:bg-orange-50/50">
                                                <TableCell className="max-w-[300px]">
                                                    <div className="space-y-1">
                                                        <div className="font-medium text-pretty text-orange-900">{notification.title}</div>
                                                        <div className="text-sm text-orange-600 text-pretty line-clamp-2">
                                                            {notification.message}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    <Badge variant="outline" className={getCategoryColor(notification.category)}>
                                                        {notification.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden lg:table-cell">
                                                    <Badge variant={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                                                </TableCell>
                                                <TableCell className="hidden lg:table-cell">
                                                    <div className="text-sm">
                                                        <div className="font-medium text-orange-900">
                                                            {notification.sent}/{notification.recipients}
                                                        </div>
                                                        <div className="text-orange-600">{notification.read} read</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Badge variant="outline" className={getStatusColor(notification.status)}>
                                                        {notification.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden xl:table-cell text-sm text-orange-600">
                                                    {new Date(notification.createdAt).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="hover:bg-orange-100 text-orange-700">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="bg-white border-orange-200">
                                                            <DropdownMenuItem className="hover:bg-orange-50 text-orange-800">
                                                                <Eye className="mr-2 h-4 w-4" />
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="hover:bg-orange-50 text-orange-800">
                                                                <Edit className="mr-2 h-4 w-4" />
                                                                Edit
                                                            </DropdownMenuItem>
                                                            {notification.status === "draft" && (
                                                                <DropdownMenuItem className="hover:bg-orange-50 text-orange-800">
                                                                    <Send className="mr-2 h-4 w-4" />
                                                                    Send Now
                                                                </DropdownMenuItem>
                                                            )}
                                                            <DropdownMenuItem className="text-destructive hover:bg-red-50">
                                                                <Trash2 className="mr-2 h-4 w-4" />
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
                        </CardContent>
                    </Card>
                </div>
            </main>
        </>
    )
}
