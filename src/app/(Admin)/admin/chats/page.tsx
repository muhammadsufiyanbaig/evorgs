"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Users, BarChart3, TrendingUp, CheckCircle, Clock, Eye } from "lucide-react"

const mockStats = {
  totalMessages: 1247,
  totalInquiries: 89,
  activeConversations: 34,
  resolvedToday: 8,
}

const mockRecentActivity = [
  {
    id: "1",
    sender: "John Doe",
    receiver: "Vendor A",
    message: "Interested in your catering service for my wedding on June 15th. Can you provide a quote for 150 guests?",
    status: "Read",
    sentAt: "2024-01-15 10:30",
    type: "Service",
  },
  {
    id: "2",
    sender: "Jane Smith",
    receiver: "Vendor B",
    message: "Can you provide photography for our corporate event next month?",
    status: "Delivered",
    sentAt: "2024-01-15 09:15",
    type: "Service",
  },
  {
    id: "3",
    sender: "Mike Johnson",
    receiver: "Vendor C",
    message: "Looking for venue rental for a birthday party. Do you have availability?",
    status: "Sent",
    sentAt: "2024-01-15 08:45",
    type: "Ad",
  },
]

export default function DashboardPage() {
  const getStatusBadge = (status: string) => {
    return (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          status === "Read"
            ? "bg-green-100 text-green-700 border border-green-200"
            : status === "Delivered"
              ? "bg-blue-100 text-blue-700 border border-blue-200"
              : "bg-gray-100 text-gray-700 border border-gray-200"
        }`}
      >
        {status}
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Section */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-orange-900 mb-2">
            Dashboard Overview
          </h2>
          <p className="text-sm sm:text-base text-orange-700/80">
            Monitor your chat system performance and key metrics
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-white border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-xs sm:text-sm font-semibold text-orange-800">Total Messages</CardTitle>
              <div className="p-2 bg-orange-100 rounded-full">
                <MessageSquare className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-900">
                {mockStats.totalMessages.toLocaleString()}
              </div>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-xs sm:text-sm font-semibold text-orange-800">Active Inquiries</CardTitle>
              <div className="p-2 bg-orange-100 rounded-full">
                <Users className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-900">
                {mockStats.totalInquiries}
              </div>
              <p className="text-xs text-amber-600 mt-2 flex items-center">
                <Clock className="inline h-3 w-3 mr-1" />
                23 pending review
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-xs sm:text-sm font-semibold text-orange-800">Active Conversations</CardTitle>
              <div className="p-2 bg-orange-100 rounded-full">
                <BarChart3 className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-900">
                {mockStats.activeConversations}
              </div>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <CheckCircle className="inline h-3 w-3 mr-1" />
                {mockStats.resolvedToday} resolved today
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-xs sm:text-sm font-semibold text-orange-800">Response Rate</CardTitle>
              <div className="p-2 bg-orange-100 rounded-full">
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-900">94%</div>
              <p className="text-xs text-green-600 mt-2 flex items-center">
                <CheckCircle className="inline h-3 w-3 mr-1" />
                Above target
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-white border-orange-200 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg sm:text-xl font-serif font-bold text-orange-900">
              Recent Activity
            </CardTitle>
            <CardDescription className="text-sm text-orange-700/80">
              Latest messages and inquiries from your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              {mockRecentActivity.map((activity) => (
                <div 
                  key={activity.id} 
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-orange-200 rounded-lg bg-orange-50/30 hover:bg-orange-50/50 transition-colors duration-200"
                >
                  <div className="flex-1 space-y-2 sm:space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-orange-900 text-sm">{activity.sender}</span>
                        <span className="text-orange-600">→</span>
                        <span className="font-medium text-orange-900 text-sm">{activity.receiver}</span>
                      </div>
                      {getStatusBadge(activity.status)}
                    </div>
                    <p className="text-xs sm:text-sm text-orange-800/80 line-clamp-2 sm:line-clamp-1">
                      {activity.message}
                    </p>
                    <p className="text-xs text-orange-600/80">{activity.sentAt}</p>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-4 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-orange-700 hover:text-orange-900 hover:bg-orange-100 p-2"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
