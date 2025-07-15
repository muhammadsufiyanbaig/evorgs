"use client"

import { CreditCard, MessageSquare, Megaphone, Settings, ExternalLink, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function getTimeAgo(dateString: string): string {
  const now = new Date()
  const date = new Date(dateString)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return "just now"
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  return `${Math.floor(diffInSeconds / 2592000)}mo ago`
}

interface Notification {
  id: string
  title: string
  message: string
  category: "Booking" | "Payment" | "System" | "Chat" | "Promotion"
  priority: "low" | "medium" | "high" | "urgent"
  linkTo?: string
  relatedId?: string
  relatedType?: string
  isRead: boolean
  createdAt: string
  scheduledAt?: string
  data?: any
}

interface NotificationCardProps {
  notification: Notification
  isSelected: boolean
  onSelect: (checked: boolean) => void
  onClick: () => void
}

const categoryIcons = {
  Booking: Calendar,
  Payment: CreditCard,
  System: Settings,
  Chat: MessageSquare,
  Promotion: Megaphone,
}

const priorityColors = {
  low: "bg-orange-50 border-orange-200",
  medium: "bg-orange-100 border-orange-300",
  high: "bg-orange-200 border-orange-400",
  urgent: "bg-red-50 border-red-300",
}

export function NotificationCard({ notification, isSelected, onSelect, onClick }: NotificationCardProps) {
  const Icon = categoryIcons[notification.category]
  const timeAgo = getTimeAgo(notification.createdAt)

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg border-orange-200",
        !notification.isRead && "bg-gradient-to-r from-orange-50 to-white border-l-4 border-l-orange-400 shadow-sm",
        notification.priority === "urgent" && "bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-400",
        notification.priority === "high" &&
          "bg-gradient-to-r from-orange-100 to-orange-50 border-l-4 border-l-orange-500",
        notification.isRead && "bg-white hover:bg-orange-50",
      )}
      onClick={onClick}
    >
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          {/* Selection Checkbox */}
          <Checkbox
            checked={isSelected}
            onCheckedChange={onSelect}
            onClick={(e) => e.stopPropagation()}
            className="mt-1 border-orange-300 flex-shrink-0"
          />

          {/* Category Icon */}
          <div
            className={cn(
              "p-1.5 sm:p-2 rounded-full flex-shrink-0",
              notification.category === "Booking" && "bg-orange-100 text-orange-600",
              notification.category === "Payment" && "bg-orange-200 text-orange-700",
              notification.category === "System" && "bg-orange-50 text-orange-500",
              notification.category === "Chat" && "bg-orange-100 text-orange-600",
              notification.category === "Promotion" && "bg-orange-200 text-orange-800",
            )}
          >
            <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3
                className={cn(
                  "font-semibold text-sm sm:text-base leading-tight",
                  !notification.isRead && "text-foreground",
                  notification.isRead && "text-muted-foreground",
                )}
              >
                {notification.title}
              </h3>

              <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                {!notification.isRead && <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full" />}
                <Badge
                  variant={notification.priority === "urgent" ? "destructive" : "secondary"}
                  className="text-xs px-1 sm:px-2"
                >
                  {notification.priority}
                </Badge>
              </div>
            </div>

            <p
              className={cn(
                "text-xs sm:text-sm mb-2 line-clamp-2 leading-relaxed",
                !notification.isRead && "text-foreground",
                notification.isRead && "text-muted-foreground",
              )}
            >
              {notification.message}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
                <span className="truncate">{timeAgo}</span>
                <Badge variant="outline" className="text-xs px-1 sm:px-2 hidden sm:inline-flex">
                  {notification.category}
                </Badge>
              </div>

              {notification.linkTo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(notification.linkTo, "_blank")
                  }}
                  className="h-6 w-6 sm:h-8 sm:w-8 p-0 sm:px-2"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
