"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, Send } from "lucide-react"
import { NotificationCategory, NotificationPriority, NotificationType } from "@/utils/interfaces"

interface NotificationTableItem {
    id: string
    title: string
    message: string
    category: NotificationCategory
    priority: NotificationPriority
    type: NotificationType
    recipients: number
    sent: number
    read: number
    createdAt: string
    status: "draft" | "sent" | "scheduled"
}

const mockNotifications: NotificationTableItem[] = [
    {
        id: "1",
        title: "System Maintenance Alert",
        message: "Scheduled maintenance will occur tonight from 2-4 AM",
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
        message: "Check out our latest features in the dashboard",
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
        message: "Your subscription will expire in 3 days",
        category: NotificationCategory.Payment,
        priority: NotificationPriority.urgent,
        type: NotificationType.User_Personal,
        recipients: 45,
        sent: 45,
        read: 23,
        createdAt: "2024-01-15T08:00:00Z",
        status: "sent",
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
            return "bg-blue-100 text-blue-800"
        case NotificationCategory.Payment:
            return "bg-green-100 text-green-800"
        case NotificationCategory.Booking:
            return "bg-purple-100 text-purple-800"
        case NotificationCategory.Chat:
            return "bg-yellow-100 text-yellow-800"
        case NotificationCategory.Promotion:
            return "bg-pink-100 text-pink-800"
        default:
            return "bg-gray-100 text-gray-800"
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "sent":
            return "bg-orange-100 text-orange-800"
        case "draft":
            return "bg-orange-50 text-orange-600"
        case "scheduled":
            return "bg-orange-200 text-orange-900"
        default:
            return "bg-orange-50 text-orange-600"
    }
}

export function NotificationsTable() {
    const [notifications] = useState<NotificationTableItem[]>(mockNotifications)

    return (
        <Card className="border-orange-200 bg-white">
            <CardHeader className="bg-orange-50 border-b border-orange-200">
                <CardTitle className="text-balance text-orange-900">Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-orange-200 hover:bg-orange-50">
                                <TableHead className="text-orange-900 font-semibold">Title</TableHead>
                                <TableHead className="hidden md:table-cell text-orange-900 font-semibold">Category</TableHead>
                                <TableHead className="hidden lg:table-cell text-orange-900 font-semibold">Priority</TableHead>
                                <TableHead className="hidden lg:table-cell text-orange-900 font-semibold">Recipients</TableHead>
                                <TableHead className="hidden sm:table-cell text-orange-900 font-semibold">Status</TableHead>
                                <TableHead className="hidden xl:table-cell text-orange-900 font-semibold">Created</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {notifications.map((notification) => (
                                <TableRow key={notification.id} className="border-orange-100 hover:bg-orange-25">
                                    <TableCell>
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
                                            <div className="text-orange-900">
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
                                                <DropdownMenuItem className="text-orange-800 hover:bg-orange-50">
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-orange-800 hover:bg-orange-50">
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit
                                                </DropdownMenuItem>
                                                {notification.status === "draft" && (
                                                    <DropdownMenuItem className="text-orange-800 hover:bg-orange-50">
                                                        <Send className="mr-2 h-4 w-4" />
                                                        Send
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
    )
}
