"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Star, Zap, ExternalLink, Users, DollarSign, TrendingUp, Activity } from "lucide-react"

export default function AdminDashboard() {
  // Mock data for ad counts
  const adStats = {
    total: 156,
    featured: 45,
    sponsored: 67,
    external: 44,
    active: 134,
    pending: 22,
  }

  const userStats = {
    total: 5432,
    vendors: 234,
    active: 3456,
  }

  const revenueStats = {
    total: 45678,
    growth: 12.5,
    monthly: 8945,
  }

  return (
    <div className="space-y-6 bg-white min-h-screen p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-600">Dashboard Overview</h2>
        <div className="text-sm text-orange-500">Last updated: {new Date().toLocaleDateString()}</div>
      </div>

      {/* Ad Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-orange-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Total Ads</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{adStats.total}</div>
            <p className="text-xs text-orange-500">
              {adStats.active} active, {adStats.pending} pending
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Featured Ads</CardTitle>
            <Star className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{adStats.featured}</div>
            <p className="text-xs text-orange-500">Premium placement ads</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Sponsored Ads</CardTitle>
            <Zap className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{adStats.sponsored}</div>
            <p className="text-xs text-orange-500">Vendor promotional ads</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">External Ads</CardTitle>
            <ExternalLink className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{adStats.external}</div>
            <p className="text-xs text-orange-500">Third-party advertisements</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card className="border-orange-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Total Users</CardTitle>
            <Users className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{userStats.total.toLocaleString()}</div>
            <p className="text-xs text-orange-500">
              {userStats.vendors} vendors, {userStats.active} active
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${revenueStats.total.toLocaleString()}</div>
            <p className="text-xs text-orange-500">+{revenueStats.growth}% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700">Monthly Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${revenueStats.monthly.toLocaleString()}</div>
            <p className="text-xs text-orange-500">Current month earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-orange-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-orange-700">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border border-orange-200 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="font-medium text-orange-700">Manage Ads</div>
                  <div className="text-sm text-orange-500">Review and approve ads</div>
                </div>
              </div>
            </div>
            <div className="p-4 border border-orange-200 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="font-medium text-orange-700">User Management</div>
                  <div className="text-sm text-orange-500">Manage users and vendors</div>
                </div>
              </div>
            </div>
            <div className="p-4 border border-orange-200 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="font-medium text-orange-700">Analytics</div>
                  <div className="text-sm text-orange-500">View performance metrics</div>
                </div>
              </div>
            </div>
            <div className="p-4 border border-orange-200 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="font-medium text-orange-700">System Health</div>
                  <div className="text-sm text-orange-500">Monitor system status</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
