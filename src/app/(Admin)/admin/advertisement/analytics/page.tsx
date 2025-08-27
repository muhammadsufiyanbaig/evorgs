"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { DollarSign, TrendingUp, Users, Download, Eye, MousePointer, Zap } from "lucide-react"

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30d")

  // Mock analytics data
  const revenueData = [
    { month: "Jan", revenue: 3200, ads: 45, users: 120 },
    { month: "Feb", revenue: 3800, ads: 52, users: 145 },
    { month: "Mar", revenue: 4200, ads: 58, users: 167 },
    { month: "Apr", revenue: 3900, ads: 55, users: 189 },
    { month: "May", revenue: 4500, ads: 62, users: 203 },
    { month: "Jun", revenue: 5100, ads: 68, users: 234 },
  ]

  const adPerformanceData = [
    { date: "Jan 15", impressions: 45000, clicks: 890, ctr: 1.98 },
    { date: "Jan 16", impressions: 48000, clicks: 920, ctr: 1.92 },
    { date: "Jan 17", impressions: 52000, clicks: 1050, ctr: 2.02 },
    { date: "Jan 18", impressions: 49000, clicks: 980, ctr: 2.0 },
    { date: "Jan 19", impressions: 51000, clicks: 1020, ctr: 2.0 },
    { date: "Jan 20", impressions: 47000, clicks: 940, ctr: 2.0 },
  ]

  const adTypesData = [
    { name: "Featured", value: 45, revenue: 18500, color: "#ea580c" },
    { name: "Sponsored", value: 35, revenue: 14200, color: "#fb923c" },
    { name: "External", value: 20, revenue: 12978, color: "#fdba74" },
  ]

  const topPerformers = [
    { name: "CloudTech Inc", type: "vendor", revenue: 2499, ads: 22, ctr: 2.57 },
    { name: "TechCorp Solutions", type: "vendor", revenue: 1299, ads: 15, ctr: 2.22 },
    { name: "External Banner Campaign", type: "external", revenue: 599, ads: 1, ctr: 2.71 },
    { name: "MarketPro Agency", type: "vendor", revenue: 199, ads: 3, ctr: 1.85 },
  ]

  const userEngagement = {
    totalUsers: 5432,
    activeUsers: 3456,
    newUsers: 234,
    retentionRate: 78.5,
    avgSessionTime: "4m 32s",
    bounceRate: 23.4,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="space-y-6 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-900">Analytics & Reporting</h2>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-32 border-orange-200 bg-white text-orange-900 focus:ring-orange-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white border-orange-200">
                <SelectItem value="7d" className="text-orange-900 focus:bg-orange-50">Last 7 days</SelectItem>
                <SelectItem value="30d" className="text-orange-900 focus:bg-orange-50">Last 30 days</SelectItem>
                <SelectItem value="90d" className="text-orange-900 focus:bg-orange-50">Last 90 days</SelectItem>
                <SelectItem value="1y" className="text-orange-900 focus:bg-orange-50">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full sm:w-auto bg-white border-orange-500 text-orange-600 hover:bg-orange-50">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-white border-orange-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">$45,678</div>
              <p className="text-xs text-orange-600">+12.5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">Total Impressions</CardTitle>
              <Eye className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">2.46M</div>
              <p className="text-xs text-orange-600">+8.2% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">Total Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">45,678</div>
              <p className="text-xs text-orange-600">Average CTR: 1.86%</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-orange-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">Conversion Rate</CardTitle>
              <Zap className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">3.2%</div>
              <p className="text-xs text-orange-600">+0.4% from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-orange-100 border-orange-200">
            <TabsTrigger value="revenue" className="text-xs sm:text-sm text-orange-800 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Revenue
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-xs sm:text-sm text-orange-800 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Ad Performance
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm text-orange-800 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              User Analytics
            </TabsTrigger>
            <TabsTrigger value="top-performers" className="text-xs sm:text-sm text-orange-800 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
              Top Performers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-orange-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-orange-900">Revenue Trends</CardTitle>
                  <CardDescription className="text-orange-700">Monthly revenue over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: {
                        label: "Revenue",
                        color: "#ea580c",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                        <XAxis dataKey="month" stroke="#9a3412" />
                        <YAxis stroke="#9a3412" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="revenue" stroke="#ea580c" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-white border-orange-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-orange-900">Ad Types Distribution</CardTitle>
                  <CardDescription className="text-orange-700">Revenue by ad type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      featured: {
                        label: "Featured",
                        color: "#ea580c",
                      },
                      sponsored: {
                        label: "Sponsored",
                        color: "#fb923c",
                      },
                      external: {
                        label: "External",
                        color: "#fdba74",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={adTypesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {adTypesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload
                              return (
                                <div className="bg-white border border-orange-200 rounded-lg p-2 shadow-md">
                                  <p className="font-medium text-orange-900">{data.name}</p>
                                  <p className="text-sm text-orange-700">
                                    Revenue: ${data.revenue.toLocaleString()}
                                  </p>
                                  <p className="text-sm text-orange-700">Count: {data.value}</p>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <Card className="bg-white border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-orange-900">Ad Performance Metrics</CardTitle>
                <CardDescription className="text-orange-700">Daily impressions and click-through rates</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    impressions: {
                      label: "Impressions",
                      color: "#ea580c",
                    },
                    clicks: {
                      label: "Clicks",
                      color: "#fb923c",
                    },
                  }}
                  className="h-[400px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={adPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                      <XAxis dataKey="date" stroke="#9a3412" />
                      <YAxis stroke="#9a3412" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="impressions" fill="#ea580c" />
                      <Bar dataKey="clicks" fill="#fb923c" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-white border-orange-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-900">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900">{userEngagement.totalUsers.toLocaleString()}</div>
                  <p className="text-xs text-orange-600">Platform users</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-orange-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-900">Active Users</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900">{userEngagement.activeUsers.toLocaleString()}</div>
                  <p className="text-xs text-orange-600">{userEngagement.retentionRate}% retention rate</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-orange-200 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-900">New Users</CardTitle>
                  <Users className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900">{userEngagement.newUsers}</div>
                  <p className="text-xs text-orange-600">This month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-orange-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-orange-900">Session Metrics</CardTitle>
                  <CardDescription className="text-orange-700">User engagement statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-900">Average Session Time</span>
                    <span className="text-sm text-orange-700">{userEngagement.avgSessionTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-900">Bounce Rate</span>
                    <span className="text-sm text-orange-700">{userEngagement.bounceRate}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-orange-900">Retention Rate</span>
                    <span className="text-sm text-orange-700">{userEngagement.retentionRate}%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-orange-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-orange-900">User Growth</CardTitle>
                  <CardDescription className="text-orange-700">Monthly user acquisition</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      users: {
                        label: "Users",
                        color: "#fb923c",
                      },
                    }}
                    className="h-[200px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                        <XAxis dataKey="month" stroke="#9a3412" />
                        <YAxis stroke="#9a3412" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="users" stroke="#fb923c" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="top-performers" className="space-y-4">
            <Card className="bg-white border-orange-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-orange-900">Top Performing Campaigns</CardTitle>
                <CardDescription className="text-orange-700">Highest revenue generating ads and vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-orange-200 rounded-lg bg-orange-50">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                          <span className="text-sm font-medium text-white">#{index + 1}</span>
                        </div>
                        <div>
                          <div className="font-medium text-orange-900">{performer.name}</div>
                          <div className="text-sm text-orange-700 capitalize">{performer.type}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-orange-900">${performer.revenue.toLocaleString()}</div>
                        <div className="text-sm text-orange-700">
                          {performer.ads} ads • {performer.ctr}% CTR
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
