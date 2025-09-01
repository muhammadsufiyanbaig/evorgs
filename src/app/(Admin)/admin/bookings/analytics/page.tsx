"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, DollarSign, CheckCircle, MapPin } from "lucide-react"

export default function AnalyticsPage() {
  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-600 mt-2">Business insights and performance metrics</p>
        </div>

        {/* Revenue Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 border-orange-200">
            <CardHeader>
              <CardTitle className="text-gray-900">Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue performance over the last 12 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium">Revenue Chart</p>
                  <p className="text-sm text-gray-500">Interactive chart showing monthly trends</p>
                  <div className="mt-4 flex justify-center space-x-8 text-sm">
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">$125K</p>
                      <p className="text-gray-500">This Month</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-900">$115K</p>
                      <p className="text-gray-500">Last Month</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-green-600">+8.7%</p>
                      <p className="text-gray-500">Growth</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Top Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Avg. Booking Value</p>
                    <p className="text-2xl font-bold text-gray-900">$2,340</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold text-gray-900">68%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Visit Success Rate</p>
                    <p className="text-2xl font-bold text-gray-900">92%</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Service Performance */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Service Type Performance</CardTitle>
            <CardDescription>Breakdown by service categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="font-medium text-gray-900">Photography</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">45 bookings</p>
                  <p className="text-sm text-gray-500">$67,500 revenue</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="font-medium text-gray-900">Venues</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">32 bookings</p>
                  <p className="text-sm text-gray-500">$48,000 revenue</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="font-medium text-gray-900">Catering</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">28 bookings</p>
                  <p className="text-sm text-gray-500">$25,200 revenue</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
