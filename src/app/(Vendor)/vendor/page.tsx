"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart"
import { MapPin, TrendingUp } from "lucide-react"
import { Bar, BarChart, Line, LineChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

// Mock data for favorite services - updated with new services
const servicesData = [
  { month: "Jan", photography: 45, catering: 35 },
  { month: "Feb", photography: 52, catering: 40 },
  { month: "Mar", photography: 48, catering: 38 },
  { month: "Apr", photography: 61, catering: 45 },
  { month: "May", photography: 55, catering: 42 },
  { month: "Jun", photography: 67, catering: 48 },
]

// Mock data for bookings over time
const bookingsData = [
  { month: "Jan", bookings: 45 },
  { month: "Feb", bookings: 52 },
  { month: "Mar", bookings: 48 },
  { month: "Apr", bookings: 61 },
  { month: "May", bookings: 55 },
  { month: "Jun", bookings: 67 },
]

// Mock data for revenue
const revenueData = [
  { month: "Jan", revenue: 4500 },
  { month: "Feb", revenue: 5200 },
  { month: "Mar", revenue: 4800 },
  { month: "Apr", revenue: 6100 },
  { month: "May", revenue: 5500 },
  { month: "Jun", revenue: 6700 },
]

// Mock data for today's visit requests - updated theme
const visitRequests = [
  { time: "9:00 AM", client: "Sarah Johnson", service: "Photography", location: "Downtown Studio" },
  { time: "10:30 AM", client: "Mike Chen", service: "Venue", location: "Garden Hall" },
  { time: "2:00 PM", client: "Emma Davis", service: "Catering", location: "Corporate Event" },
  { time: "3:30 PM", client: "John Smith", service: "Farmhouse", location: "Countryside Estate" },
]

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "#f97316",
  },
  revenue: {
    label: "Revenue",
    color: "#f97316",
  },
  photography: {
    label: "Photography",
    color: "#f97316",
  },
  catering: {
    label: "Catering",
    color: "#71717a",
  },
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl bg-zinc-50 min-h-screen">
      {/* Mobile-first responsive grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Favorite Services Chart - Area Chart with Gradient */}
        <Card className="border-zinc-200 bg-white shadow-sm">
          <CardHeader className="pb-2 sm:pb-6">
            <CardTitle className="text-sm sm:text-base font-medium text-zinc-900">Popular Services</CardTitle>
            <CardDescription className="text-zinc-600">
              Showing service popularity for the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
              <AreaChart
                accessibilityLayer
                data={servicesData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} stroke="#e4e4e7" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  stroke="#71717a"
                  fontSize={12}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <defs>
                  <linearGradient id="fillPhotography" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#f97316"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#f97316"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillCatering" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="#71717a"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#71717a"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="catering"
                  type="natural"
                  fill="url(#fillCatering)"
                  fillOpacity={0.4}
                  stroke="#71717a"
                  stackId="a"
                />
                <Area
                  dataKey="photography"
                  type="natural"
                  fill="url(#fillPhotography)"
                  fillOpacity={0.4}
                  stroke="#f97316"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none font-medium text-zinc-900">
                  Trending up by 12.3% this month <TrendingUp className="h-4 w-4 text-orange-500" />
                </div>
                <div className="text-zinc-600 flex items-center gap-2 leading-none">
                  January - June 2024
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Bookings Chart */}
        <Card className="border-zinc-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 sm:pb-6">
            <CardTitle className="text-sm sm:text-base font-medium text-zinc-900">Monthly Bookings</CardTitle>
            <button className="h-8 w-8 rounded-lg hover:bg-zinc-100 text-zinc-500 flex items-center justify-center">
              ⋮
            </button>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bookingsData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickMargin={5} />
                  <YAxis stroke="#71717a" fontSize={12} tickMargin={5} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="bookings" fill="#f97316" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card className="border-zinc-200 bg-white shadow-sm">
          <CardHeader className="pb-2 sm:pb-6">
            <CardTitle className="text-sm sm:text-base font-medium text-zinc-900">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" />
                  <XAxis dataKey="month" stroke="#71717a" fontSize={12} tickMargin={5} />
                  <YAxis stroke="#71717a" fontSize={12} tickMargin={5} />
                  <ChartTooltip content={<ChartTooltipContent />} formatter={(value) => [`$${value}`, "Revenue"]} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f97316"
                    strokeWidth={3}
                    dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Today's Visit Requests */}
        <Card className="border-zinc-200 bg-white shadow-sm">
          <CardHeader className="pb-2 sm:pb-6">
            <CardTitle className="text-sm sm:text-base font-medium text-zinc-900">Today&apos;s Visit Requests</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 sm:space-y-4">
              {visitRequests.map((request, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-2 sm:space-y-0"
                >
                  <div className="flex items-start sm:items-center space-x-3">
                    <MapPin className="h-4 w-4 text-orange-500 mt-0.5 sm:mt-0 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-zinc-900 truncate">{request.client}</p>
                      <p className="text-xs text-orange-600">{request.service}</p>
                      <p className="text-xs text-zinc-600 truncate sm:hidden lg:block">{request.location}</p>
                    </div>
                  </div>
                  <div className="flex justify-between sm:justify-end items-center">
                    <p className="text-xs text-zinc-600 sm:hidden lg:hidden">{request.location}</p>
                    <span className="text-sm font-medium text-zinc-900 bg-white px-2 py-1 rounded border border-zinc-200 whitespace-nowrap">
                      {request.time}
                    </span>
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