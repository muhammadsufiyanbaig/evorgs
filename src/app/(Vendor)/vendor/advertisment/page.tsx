"use client"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  DollarSign,
  Eye,
  MousePointer,
  Plus,
  Search,
  TrendingUp,
  Users,
  MoreHorizontal,
  Edit,
  Pause,
  Play,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

export default function VendorAdDashboard() {
  
const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("overview")
  // Mock data - in real app, this would come from your database
  const dashboardStats = {
    totalAds: 12,
    activeAds: 8,
    totalImpressions: 45230,
    totalClicks: 1250,
    totalSpent: 2450.0,
    conversionRate: 3.2,
  }

  const myAds = [
    {
      id: "1",
      title: "Luxury Wedding Venue - Garden Paradise",
      type: "Featured",
      entityType: "Venue",
      status: "Active",
      price: 299.99,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      impressions: 12500,
      clicks: 340,
      conversions: 12,
    },
    {
      id: "2",
      title: "Professional Wedding Photography",
      type: "Sponsored",
      entityType: "Photography Package",
      status: "Pending",
      price: 199.99,
      startDate: "2024-01-20",
      endDate: "2024-02-20",
      impressions: 0,
      clicks: 0,
      conversions: 0,
    },
    {
      id: "3",
      title: "Rustic Farmhouse Experience",
      type: "Premium",
      entityType: "Farmhouse",
      status: "Expired",
      price: 399.99,
      startDate: "2023-12-01",
      endDate: "2024-01-01",
      impressions: 8900,
      clicks: 210,
      conversions: 8,
    },
  ]

  const payments = [
    {
      id: "1",
      adTitle: "Luxury Wedding Venue",
      amount: 299.99,
      status: "Paid",
      method: "Credit Card",
      date: "2024-01-15",
      invoiceNumber: "INV-001",
    },
    {
      id: "2",
      adTitle: "Professional Wedding Photography",
      amount: 199.99,
      status: "Pending",
      method: "Credit Card",
      date: "2024-01-20",
      invoiceNumber: "INV-002",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Expired":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      Active: "default",
      Pending: "secondary",
      Expired: "destructive",
      Rejected: "destructive",
    }
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>
  }
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-orange-50 border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Advertisement Dashboard</h1>
              <p className="text-gray-600">Manage your service advertisements and track performance</p>
            </div>
            <Button onClick={() => router.push("/vendor/advertisment/create")} className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Create Ad Request
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ads">My Ads</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Ads</CardTitle>
                  <BarChart3 className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalAds}</div>
                  <p className="text-xs text-muted-foreground">{dashboardStats.activeAds} currently active</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Impressions</CardTitle>
                  <Eye className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalImpressions.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                  <MousePointer className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.totalClicks.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{dashboardStats.conversionRate}% conversion rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${dashboardStats.totalSpent.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardStats.activeAds}</div>
                  <p className="text-xs text-muted-foreground">2 ending this week</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg. CTR</CardTitle>
                  <Users className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.76%</div>
                  <p className="text-xs text-muted-foreground">Above industry average</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Ad Activity</CardTitle>
                <CardDescription>Your latest advertisement updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myAds.slice(0, 3).map((ad) => (
                    <div key={ad.id} className="flex items-center space-x-4">
                      {getStatusIcon(ad.status)}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{ad.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {ad.type} • {ad.entityType} • ${ad.price}
                        </p>
                      </div>
                      {getStatusBadge(ad.status)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Ads Tab */}
          <TabsContent value="ads" className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search ads..." className="pl-8 w-64" />
                </div>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="sponsored">Sponsored</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myAds.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell className="font-medium">{ad.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{ad.type}</Badge>
                        </TableCell>
                        <TableCell>{ad.entityType}</TableCell>
                        <TableCell>{getStatusBadge(ad.status)}</TableCell>
                        <TableCell>${ad.price}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{ad.impressions.toLocaleString()} views</div>
                            <div className="text-muted-foreground">{ad.clicks} clicks</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{ad.startDate}</div>
                            <div className="text-muted-foreground">to {ad.endDate}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              {ad.status === "Active" ? (
                                <DropdownMenuItem>
                                  <Pause className="mr-2 h-4 w-4" />
                                  Pause
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <Play className="mr-2 h-4 w-4" />
                                  Resume
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Impressions</span>
                      <span className="text-sm text-muted-foreground">45,230</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Clicks</span>
                      <span className="text-sm text-muted-foreground">1,250</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-400 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Conversions</span>
                      <span className="text-sm text-muted-foreground">40</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Ads</CardTitle>
                  <CardDescription>Based on conversion rate</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myAds
                      .filter((ad) => ad.conversions > 0)
                      .map((ad) => (
                        <div key={ad.id} className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">{ad.title}</p>
                            <p className="text-xs text-muted-foreground">{ad.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">{ad.conversions} conversions</p>
                            <p className="text-xs text-muted-foreground">
                              {((ad.conversions / ad.clicks) * 100).toFixed(1)}% CVR
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Ad Performance Comparison</CardTitle>
                <CardDescription>Compare your ads side by side</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ad Title</TableHead>
                      <TableHead>Impressions</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>CTR</TableHead>
                      <TableHead>Conversions</TableHead>
                      <TableHead>CVR</TableHead>
                      <TableHead>Cost per Click</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myAds.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell className="font-medium">{ad.title}</TableCell>
                        <TableCell>{ad.impressions.toLocaleString()}</TableCell>
                        <TableCell>{ad.clicks}</TableCell>
                        <TableCell>
                          {ad.clicks > 0 ? ((ad.clicks / ad.impressions) * 100).toFixed(2) : "0.00"}%
                        </TableCell>
                        <TableCell>{ad.conversions}</TableCell>
                        <TableCell>
                          {ad.clicks > 0 ? ((ad.conversions / ad.clicks) * 100).toFixed(1) : "0.0"}%
                        </TableCell>
                        <TableCell>${ad.clicks > 0 ? (ad.price / ad.clicks).toFixed(2) : "0.00"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                  <DollarSign className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2,450.00</div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                  <Clock className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$199.99</div>
                  <p className="text-xs text-muted-foreground">1 payment pending</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <Calendar className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$499.98</div>
                  <p className="text-xs text-muted-foreground">2 transactions</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>All your advertisement payments</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice</TableHead>
                      <TableHead>Ad Campaign</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Payment Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.invoiceNumber}</TableCell>
                        <TableCell>{payment.adTitle}</TableCell>
                        <TableCell>${payment.amount}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <Badge variant={payment.status === "Paid" ? "default" : "secondary"}>{payment.status}</Badge>
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Invoice
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
