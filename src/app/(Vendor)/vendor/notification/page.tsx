"use client"

import { useState } from "react"
import { Bell, Check, CheckCheck, Filter, Search, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NotificationCard } from "@/app/components/Home/Notifications/Card"
import { NotificationFilters } from "@/app/components/Home/Notifications/filter"


// Mock data types based on your schema
type NotificationCategory = "Booking" | "Payment" | "System" | "Chat" | "Promotion"
type NotificationPriority = "low" | "medium" | "high" | "urgent"

interface Notification {
  id: string
  title: string
  message: string
  category: NotificationCategory
  priority: NotificationPriority
  linkTo?: string
  relatedId?: string
  relatedType?: string
  isRead: boolean
  createdAt: string
  scheduledAt?: string
  data?: any
}

// Mock API functions - replace with your actual API calls
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Booking Confirmed",
    message: "Your booking for Wedding Photography has been confirmed for December 15, 2024.",
    category: "Booking",
    priority: "high",
    linkTo: "/bookings/1",
    relatedId: "1",
    relatedType: "Booking",
    isRead: false,
    createdAt: "2024-01-10T10:30:00Z",
  },
  {
    id: "2",
    title: "Payment Received",
    message: "Payment of $500 has been successfully processed for your booking.",
    category: "Payment",
    priority: "medium",
    linkTo: "/payments/2",
    relatedId: "2",
    relatedType: "Payment",
    isRead: false,
    createdAt: "2024-01-10T09:15:00Z",
  },
  {
    id: "3",
    title: "New Message",
    message: "You have received a new message from John's Photography Studio.",
    category: "Chat",
    priority: "medium",
    linkTo: "/chat/3",
    relatedId: "3",
    relatedType: "Chat",
    isRead: true,
    createdAt: "2024-01-09T16:45:00Z",
  },
  {
    id: "4",
    title: "System Maintenance",
    message: "Scheduled maintenance will occur on January 15th from 2:00 AM to 4:00 AM EST.",
    category: "System",
    priority: "low",
    isRead: false,
    createdAt: "2024-01-09T14:20:00Z",
  },
  {
    id: "5",
    title: "Special Promotion",
    message: "Get 20% off on all photography packages this month! Limited time offer.",
    category: "Promotion",
    priority: "medium",
    linkTo: "/promotions/5",
    isRead: true,
    createdAt: "2024-01-08T11:00:00Z",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    priority: "all",
    readStatus: "all",
    dateRange: "all",
  })

  // Mock API functions
  const getMyNotifications = async () => {
    // Replace with actual API call
    return mockNotifications
  }

  const getUnreadCount = () => {
    return notifications.filter((n) => !n.isRead).length
  }

  const markAsRead = async (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n)))
  }

  const markMultipleAsRead = async (notificationIds: string[]) => {
    setNotifications((prev) => prev.map((n) => (notificationIds.includes(n.id) ? { ...n, isRead: true } : n)))
    setSelectedNotifications([])
  }

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
    setSelectedNotifications([])
  }

  // Filter notifications
  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === "all" || notification.category.toLowerCase() === activeCategory

    const matchesPriority = filters.priority === "all" || notification.priority === filters.priority

    const matchesReadStatus =
      filters.readStatus === "all" ||
      (filters.readStatus === "read" && notification.isRead) ||
      (filters.readStatus === "unread" && !notification.isRead)

    return matchesSearch && matchesCategory && matchesPriority && matchesReadStatus
  })

  const unreadCount = getUnreadCount()
  const categories = ["all", "booking", "payment", "system", "chat", "promotion"]

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id)
    }
    setSelectedNotification(notification)
  }

  const handleSelectNotification = (notificationId: string, checked: boolean) => {
    if (checked) {
      setSelectedNotifications((prev) => [...prev, notificationId])
    } else {
      setSelectedNotifications((prev) => prev.filter((id) => id !== notificationId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedNotifications(filteredNotifications.map((n) => n.id))
    } else {
      setSelectedNotifications([])
    }
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
          <h1 className="text-xl sm:text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <Badge variant="default" className="bg-orange-500 hover:bg-orange-600 text-xs">
              {unreadCount} unread
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="text-xs sm:text-sm"
          >
            <Filter className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Filters
          </Button>

          {selectedNotifications.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm bg-transparent">
                  Actions ({selectedNotifications.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => markMultipleAsRead(selectedNotifications)}>
                  <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                  Mark as Read
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="text-xs sm:text-sm bg-transparent"
          >
            <CheckCheck className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Mark All Read</span>
            <span className="sm:hidden">All Read</span>
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-orange-200 focus:border-orange-500 focus:ring-orange-500 text-sm"
          />
        </div>
      </div>

      {/* Filters */}
      {showFilters && <NotificationFilters filters={filters} onFiltersChange={setFilters} className="mb-4" />}

      {/* Category Tabs */}
      <div className="mb-6">
        <div className="overflow-x-auto">
          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full min-w-max">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="capitalize text-xs sm:text-sm px-2 sm:px-4">
                  <span className="truncate">{category}</span>
                  {category !== "all" && (
                    <Badge variant="secondary" className="ml-1 sm:ml-2 text-xs hidden sm:inline-flex">
                      {notifications.filter((n) => category === "all" || n.category.toLowerCase() === category).length}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Bulk Selection */}
      {filteredNotifications.length > 0 && (
        <div className="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-lg">
          <Checkbox
            checked={selectedNotifications.length === filteredNotifications.length}
            onCheckedChange={handleSelectAll}
          />
          <span className="text-xs sm:text-sm text-muted-foreground">
            {selectedNotifications.length > 0 ? `${selectedNotifications.length} selected` : "Select all"}
          </span>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
              <Bell className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">No notifications found</h3>
              <p className="text-muted-foreground text-center text-sm">
                {searchQuery || activeCategory !== "all" || filters.readStatus !== "all"
                  ? "Try adjusting your search or filters"
                  : "You're all caught up! New notifications will appear here."}
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification) => (
            <NotificationCard 
              key={notification.id}
              notification={notification}
              isSelected={selectedNotifications.includes(notification.id)}
              onSelect={(checked) => handleSelectNotification(notification.id, checked)}
              onClick={() => handleNotificationClick(notification)}
            />
          ))
        )}
      </div>

      {/* Notification Detail Modal */}
      <Dialog open={!!selectedNotification} onOpenChange={() => setSelectedNotification(null)}>
        <DialogContent className="max-w-2xl mx-4 sm:mx-auto">
          <DialogHeader>
            <DialogTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-base sm:text-lg">
              <span className="break-words">{selectedNotification?.title}</span>
              <Badge
                variant={selectedNotification?.priority === "urgent" ? "destructive" : "secondary"}
                className="self-start sm:self-auto"
              >
                {selectedNotification?.priority}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          {selectedNotification && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 text-sm sm:text-base">Message</h4>
                <p className="text-muted-foreground text-sm sm:text-base">{selectedNotification.message}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Category:</span>
                  <Badge variant="outline" className="ml-2">
                    {selectedNotification.category}
                  </Badge>
                </div>
                <div>
                  <span className="font-semibold">Created:</span>
                  <span className="ml-2 text-xs sm:text-sm">
                    {new Date(selectedNotification.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {selectedNotification.linkTo && (
                <div className="flex gap-2">
                  <Button asChild className="w-full sm:w-auto">
                    <a href={selectedNotification.linkTo}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </a>
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
