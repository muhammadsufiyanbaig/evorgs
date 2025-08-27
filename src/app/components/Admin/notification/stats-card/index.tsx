"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Send, Eye, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardsProps {
    stats?: {
        totalNotifications: number
        totalSentToday: number
        totalReadToday: number
        totalUnread: number
    }
}

export function StatsCards({ stats }: StatsCardsProps) {
    const defaultStats = {
        totalNotifications: 1247,
        totalSentToday: 89,
        totalReadToday: 156,
        totalUnread: 23,
    }

    const data = stats || defaultStats

    const cards = [
        {
            title: "Total Notifications",
            value: data.totalNotifications.toLocaleString(),
            icon: Bell,
            trend: "+12%",
            trendUp: true,
            description: "All time notifications",
        },
        {
            title: "Sent Today",
            value: data.totalSentToday.toLocaleString(),
            icon: Send,
            trend: "+5%",
            trendUp: true,
            description: "Notifications sent today",
        },
        {
            title: "Read Today",
            value: data.totalReadToday.toLocaleString(),
            icon: Eye,
            trend: "+8%",
            trendUp: true,
            description: "Notifications read today",
        },
        {
            title: "Unread",
            value: data.totalUnread.toLocaleString(),
            icon: AlertTriangle,
            trend: "-3%",
            trendUp: false,
            description: "Pending notifications",
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cards.map((card, index) => (
                <Card key={index} className="relative overflow-hidden bg-white border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-orange-50">
                        <CardTitle className="text-sm font-medium text-pretty text-orange-900">{card.title}</CardTitle>
                        <card.icon className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent className="bg-white">
                        <div className="text-2xl font-bold text-orange-800">{card.value}</div>
                        <div className="flex items-center gap-2 text-xs">
                            <div className="flex items-center gap-1">
                                {card.trendUp ? (
                                    <TrendingUp className="h-3 w-3 text-green-500" />
                                ) : (
                                    <TrendingDown className="h-3 w-3 text-red-500" />
                                )}
                                <span className={card.trendUp ? "text-green-500" : "text-red-500"}>{card.trend}</span>
                            </div>
                            <span className="text-orange-700">{card.description}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
