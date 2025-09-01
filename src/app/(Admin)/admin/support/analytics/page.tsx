"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3Icon,
  TrendingUpIcon,
  TrendingDownIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  UsersIcon,
  MessageSquareIcon,
  DownloadIcon,
} from "lucide-react"

export default function Analytics() {
  const stats = [
    {
      title: "Total Tickets",
      value: "1,234",
      change: "+12%",
      changeType: "positive" as const,
      icon: BarChart3Icon,
      description: "vs last month",
    },
    {
      title: "Resolution Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: CheckCircleIcon,
      description: "vs last month",
    },
    {
      title: "Avg Response Time",
      value: "2.4h",
      change: "-0.3h",
      changeType: "positive" as const,
      icon: ClockIcon,
      description: "vs last month",
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      changeType: "positive" as const,
      icon: UsersIcon,
      description: "vs last month",
    },
  ]

  const ticketsByType = [
    { type: "Technical", count: 456, percentage: 37 },
    { type: "Payment", count: 321, percentage: 26 },
    { type: "Account", count: 234, percentage: 19 },
    { type: "Booking", count: 123, percentage: 10 },
    { type: "Feature", count: 67, percentage: 5 },
    { type: "Other", count: 33, percentage: 3 },
  ]

  const recentActivity = [
    {
      action: "Ticket TK-001 resolved",
      user: "Sarah Johnson",
      time: "2 minutes ago",
      type: "resolution",
    },
    {
      action: "New urgent ticket created",
      user: "System",
      time: "5 minutes ago",
      type: "urgent",
    },
    {
      action: "Response template updated",
      user: "Mike Wilson",
      time: "15 minutes ago",
      type: "update",
    },
    {
      action: "Bulk status update completed",
      user: "Admin",
      time: "1 hour ago",
      type: "bulk",
    },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "resolution":
        return CheckCircleIcon
      case "urgent":
        return AlertTriangleIcon
      case "update":
        return MessageSquareIcon
      default:
        return BarChart3Icon
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "resolution":
        return "text-green-600"
      case "urgent":
        return "text-red-600"
      case "update":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">Track performance and insights across your support system</p>
        </div>
        <div className="flex space-x-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                  {stat.changeType === "positive" ? (
                    <TrendingUpIcon className="inline h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDownIcon className="inline h-3 w-3 mr-1" />
                  )}
                  {stat.change}
                </span>{" "}
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tickets by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Tickets by Type</CardTitle>
            <CardDescription>Distribution of support tickets by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ticketsByType.map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full" />
                    <span className="font-medium text-foreground">{item.type}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-muted-foreground">{item.count} tickets</span>
                    <Badge variant="secondary">{item.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions and updates in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.type)
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`mt-1 ${getActivityColor(activity.type)}`}>
                      <ActivityIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">{activity.action}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>by {activity.user}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Response Time Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time Trends</CardTitle>
            <CardDescription>Average response times over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <BarChart3Icon className="h-12 w-12 mx-auto mb-2" />
                <p>Response time chart would go here</p>
                <p className="text-xs">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resolution Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Resolution Rate</CardTitle>
            <CardDescription>Percentage of tickets resolved over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <TrendingUpIcon className="h-12 w-12 mx-auto mb-2" />
                <p>Resolution rate chart would go here</p>
                <p className="text-xs">Integration with charting library needed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
          <CardDescription>Key performance indicators for the support team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border border-border rounded-lg">
              <ClockIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">2.4h</p>
              <p className="text-sm text-muted-foreground">Avg First Response</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <CheckCircleIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">18.5h</p>
              <p className="text-sm text-muted-foreground">Avg Resolution Time</p>
            </div>
            <div className="text-center p-4 border border-border rounded-lg">
              <UsersIcon className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">4.8/5</p>
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
