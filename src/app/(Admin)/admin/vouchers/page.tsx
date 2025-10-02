'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Users, Ticket, AlertTriangle, CheckCircle, Clock, DollarSign, Plus, Eye } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"

const stats = [
    {
        title: "Total Vouchers",
        value: "2,847",
        change: "+12.5%",
        icon: Ticket,
        color: "text-orange-600",
        trend: "up",
    },
    {
        title: "Active Vendors",
        value: "156",
        change: "+3.2%",
        icon: Users,
        color: "text-orange-500",
        trend: "up",
    },
    {
        title: "Total Usage",
        value: "18,492",
        change: "+8.7%",
        icon: TrendingUp,
        color: "text-amber-600",
        trend: "up",
    },
    {
        title: "Revenue Impact",
        value: "$45,231",
        change: "-2.1%",
        icon: DollarSign,
        color: "text-orange-700",
        trend: "down",
    },
]

const monthlyData = [
    { month: "Jan", vouchers: 245, usage: 1420, revenue: 3200 },
    { month: "Feb", vouchers: 289, usage: 1680, revenue: 3800 },
    { month: "Mar", vouchers: 312, usage: 1890, revenue: 4100 },
    { month: "Apr", vouchers: 298, usage: 1750, revenue: 3900 },
    { month: "May", vouchers: 356, usage: 2100, revenue: 4600 },
    { month: "Jun", vouchers: 387, usage: 2340, revenue: 5200 },
]

const voucherTypeData = [
    { type: "Percentage", count: 1245, value: 45, color: "#ea580c" }, // orange-600
    { type: "Fixed Amount", count: 892, value: 32, color: "#f97316" }, // orange-500
    { type: "BOGO", count: 456, value: 16, color: "#fb923c" }, // orange-400
    { type: "Free Shipping", count: 254, value: 7, color: "#fed7aa" }, // orange-200
]

// TODO: Replace with GraphQL data from useQuery
const topVendors: any[] = []

// TODO: Replace with GraphQL data from useQuery  
const recentActivities: any[] = []

// TODO: Replace with GraphQL data from useQuery
const systemAlerts: any[] = []

export default function AdminDashboard() {
    return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold font-montserrat text-gray-800">Vouchers Dashboard</h1>
                            <p className="text-gray-600 mt-2">Monitor your voucher system performance and key metrics</p>
                        </div>
                    </div>

                    {/* System Alerts */}
                    {systemAlerts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {systemAlerts.map((alert, index) => (
                                <Card
                                    key={index}
                                    className={`border-l-4 bg-white shadow-md ${
                                        alert.severity === "error"
                                            ? "border-l-red-500"
                                            : alert.severity === "warning"
                                                ? "border-l-amber-500"
                                                : "border-l-orange-500"
                                    }`}
                                >
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle
                                                className={`h-4 w-4 ${
                                                    alert.severity === "error"
                                                        ? "text-red-500"
                                                        : alert.severity === "warning"
                                                            ? "text-amber-500"
                                                            : "text-orange-500"
                                                }`}
                                            />
                                            <span className="text-sm font-medium text-gray-700">{alert.message}</span>
                                            <Badge variant="secondary" className="ml-auto bg-orange-100 text-orange-700">
                                                {alert.count}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat) => (
                            <Card key={stat.title} className="bg-white border border-orange-100 shadow-md hover:shadow-lg transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-700">{stat.title}</CardTitle>
                                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold font-montserrat text-gray-800">{stat.value}</div>
                                    <p className="text-xs text-gray-600 flex items-center gap-1">
                                        <TrendingUp
                                            className={`h-3 w-3 ${stat.trend === "up" ? "text-orange-600" : "text-red-500"} ${stat.trend === "down" ? "rotate-180" : ""}`}
                                        />
                                        <span className={`font-medium ${stat.trend === "up" ? "text-orange-600" : "text-red-500"}`}>
                                            {stat.change}
                                        </span>{" "}
                                        from last month
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Monthly Trends */}
                        <Card className="bg-white border border-orange-100 shadow-md">
                            <CardHeader>
                                <CardTitle className="font-montserrat text-gray-800">Monthly Trends</CardTitle>
                                <CardDescription className="text-gray-600">Voucher creation and usage over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        vouchers: { label: "Vouchers", color: "#ea580c" }, // orange-600
                                        usage: { label: "Usage", color: "#f97316" }, // orange-500
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={monthlyData}>
                                            <XAxis dataKey="month" stroke="#6b7280" />
                                            <YAxis stroke="#6b7280" />
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                            <Line
                                                type="monotone"
                                                dataKey="vouchers"
                                                stroke="#ea580c"
                                                strokeWidth={3}
                                                dot={{ fill: "#ea580c", strokeWidth: 2, r: 4 }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="usage"
                                                stroke="#f97316"
                                                strokeWidth={3}
                                                dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Voucher Distribution */}
                        <Card className="bg-white border border-orange-100 shadow-md">
                            <CardHeader>
                                <CardTitle className="font-montserrat text-gray-800">Voucher Distribution</CardTitle>
                                <CardDescription className="text-gray-600">Breakdown by discount type</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer
                                    config={{
                                        percentage: { label: "Percentage", color: "#ea580c" },
                                        fixed: { label: "Fixed Amount", color: "#f97316" },
                                        bogo: { label: "BOGO", color: "#fb923c" },
                                        shipping: { label: "Free Shipping", color: "#fed7aa" },
                                    }}
                                    className="h-[300px]"
                                >
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={voucherTypeData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={100}
                                                paddingAngle={5}
                                                dataKey="count"
                                            >
                                                {voucherTypeData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <ChartTooltip content={<ChartTooltipContent />} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                                <div className="grid grid-cols-2 gap-2 mt-4">
                                    {voucherTypeData.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="text-xs text-gray-600">{item.type}</span>
                                            <span className="text-xs font-medium ml-auto text-gray-800">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Detailed Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Top Performing Vendors */}
                        <Card className="bg-white border border-orange-100 shadow-md">
                            <CardHeader>
                                <CardTitle className="font-montserrat text-gray-800">Top Performing Vendors</CardTitle>
                                <CardDescription className="text-gray-600">Vendors with highest voucher performance</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {topVendors.map((vendor, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-orange-50 border border-orange-100">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-medium text-gray-800">{vendor.name}</h4>
                                                    <Badge variant="secondary" className="bg-orange-100 text-orange-700">{vendor.performance}%</Badge>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
                                                    <span>{vendor.vouchers} vouchers</span>
                                                    <span>{vendor.usage} uses</span>
                                                    <span>{vendor.revenue}</span>
                                                </div>
                                                <Progress 
                                                    value={vendor.performance} 
                                                    className="mt-2 h-2 bg-orange-100"
                                                    style={{"--progress-foreground": "#ea580c"} as React.CSSProperties}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recent Activity */}
                        <Card className="bg-white border border-orange-100 shadow-md">
                            <CardHeader>
                                <CardTitle className="font-montserrat text-gray-800">Recent Activity</CardTitle>
                                <CardDescription className="text-gray-600">Latest voucher system activities</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentActivities.map((activity, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
                                            <div
                                                className={`p-1 rounded-full ${
                                                    activity.status === "success"
                                                        ? "bg-green-100"
                                                        : activity.status === "warning"
                                                            ? "bg-amber-100"
                                                            : "bg-red-100"
                                                }`}
                                            >
                                                {activity.status === "success" ? (
                                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                                ) : activity.status === "warning" ? (
                                                    <AlertTriangle className="h-3 w-3 text-amber-600" />
                                                ) : (
                                                    <AlertTriangle className="h-3 w-3 text-red-600" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                                                <p className="text-xs text-gray-600">{activity.vendor}</p>
                                                <div className="flex items-center gap-1 mt-1">
                                                    <Clock className="h-3 w-3 text-gray-500" />
                                                    <span className="text-xs text-gray-500">{activity.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
    )
}
