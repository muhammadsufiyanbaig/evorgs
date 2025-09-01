"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis, Area, AreaChart } from "recharts"
import { DollarSign, AlertTriangle, Download, Target, Shield, Activity } from "lucide-react"

// Mock analytics data based on GraphQL schema
const systemAnalytics = {
    totalSystemVouchers: 2847,
    totalSystemUsage: 18492,
    totalSystemDiscountGiven: 245670,
    totalSystemRevenueLost: 189340,
    averageDiscountPerVoucher: 86.3,
    fraudulentUsageCount: 23,
}

const monthlyTrends = [
    { month: "Jan", year: 2024, vouchersCreated: 245, vouchersUsed: 1420, totalDiscountGiven: 18500, uniqueUsers: 890 },
    { month: "Feb", year: 2024, vouchersCreated: 289, vouchersUsed: 1680, totalDiscountGiven: 22100, uniqueUsers: 1050 },
    { month: "Mar", year: 2024, vouchersCreated: 312, vouchersUsed: 1890, totalDiscountGiven: 25800, uniqueUsers: 1180 },
    { month: "Apr", year: 2024, vouchersCreated: 298, vouchersUsed: 1750, totalDiscountGiven: 23400, uniqueUsers: 1090 },
    { month: "May", year: 2024, vouchersCreated: 356, vouchersUsed: 2100, totalDiscountGiven: 28900, uniqueUsers: 1340 },
    { month: "Jun", year: 2024, vouchersCreated: 387, vouchersUsed: 2340, totalDiscountGiven: 32200, uniqueUsers: 1520 },
]

const voucherDistribution = [
    { discountType: "PERCENTAGE", count: 1245, totalValue: 89500, percentage: 44, color: "#ea580c" },
    { discountType: "FIXED_AMOUNT", count: 892, totalValue: 67800, percentage: 31, color: "#fb923c" },
    { discountType: "BOGO", count: 456, totalValue: 45200, percentage: 16, color: "#fed7aa" },
    { discountType: "FREE_SHIPPING", count: 254, totalValue: 23400, percentage: 9, color: "#ffedd5" },
]

const topPerformingVendors = [
    {
        vendorId: "vendor-1",
        vendorName: "Restaurant ABC",
        totalVouchers: 45,
        totalUsage: 892,
        totalDiscountGiven: 12450,
        averageVoucherValue: 276.7,
        successRate: 89,
    },
    {
        vendorId: "vendor-2",
        vendorName: "Shop XYZ",
        totalVouchers: 38,
        totalUsage: 756,
        totalDiscountGiven: 9870,
        averageVoucherValue: 259.7,
        successRate: 82,
    },
    {
        vendorId: "vendor-4",
        vendorName: "Store DEF",
        totalVouchers: 28,
        totalUsage: 521,
        totalDiscountGiven: 6890,
        averageVoucherValue: 246.1,
        successRate: 71,
    },
]

const suspiciousActivities = [
    {
        id: "1",
        type: "UNUSUAL_USAGE_PATTERN",
        description: "Multiple voucher uses from same IP within 5 minutes",
        voucherId: "voucher-123",
        userId: "user-456",
        vendorId: "vendor-2",
        severity: "HIGH",
        detectedAt: "2024-01-20T14:30:00Z",
        status: "INVESTIGATING",
    },
    {
        id: "2",
        type: "DUPLICATE_USAGE",
        description: "Same voucher code used multiple times by different users",
        voucherId: "voucher-789",
        userId: null,
        vendorId: "vendor-3",
        severity: "MEDIUM",
        detectedAt: "2024-01-19T09:15:00Z",
        status: "RESOLVED",
    },
]

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState("30d")
    const [selectedMetric, setSelectedMetric] = useState("usage")

    const getMetricData = () => {
        switch (selectedMetric) {
            case "usage":
                return monthlyTrends.map((item) => ({ ...item, value: item.vouchersUsed }))
            case "revenue":
                return monthlyTrends.map((item) => ({ ...item, value: item.totalDiscountGiven }))
            case "users":
                return monthlyTrends.map((item) => ({ ...item, value: item.uniqueUsers }))
            default:
                return monthlyTrends.map((item) => ({ ...item, value: item.vouchersCreated }))
        }
    }

    const getMetricLabel = () => {
        switch (selectedMetric) {
            case "usage":
                return "Vouchers Used"
            case "revenue":
                return "Revenue ($)"
            case "users":
                return "Unique Users"
            case "created":
                return "Vouchers Created"
            default:
                return "Vouchers Used"
        }
    }

    const getSeverityBadge = (severity: string) => {
        switch (severity) {
            case "HIGH":
                return <Badge className="bg-red-100 text-red-800 border-red-200">High</Badge>
            case "MEDIUM":
                return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Medium</Badge>
            case "LOW":
                return <Badge className="bg-green-100 text-green-800 border-green-200">Low</Badge>
            default:
                return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{severity}</Badge>
        }
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "INVESTIGATING":
                return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Investigating</Badge>
            case "RESOLVED":
                return <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>
            case "PENDING":
                return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>
            default:
                return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>
        }
    }

    const exportToPDF = () => {
        const printWindow = window.open('', '_blank');
        if (!printWindow) return;

        const htmlContent = `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Analytics Report</title>
                    <style>
                        * { margin: 0; padding: 0; box-sizing: border-box; }
                        body { 
                            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                            line-height: 1.6;
                            color: #333;
                            background: white;
                            padding: 20px;
                        }
                        .header { 
                            text-align: center; 
                            margin-bottom: 30px;
                            border-bottom: 3px solid #ea580c;
                            padding-bottom: 20px;
                        }
                        .header h1 { 
                            color: #ea580c; 
                            font-size: 28px; 
                            margin-bottom: 10px;
                            font-weight: bold;
                        }
                        .header p { 
                            color: #666; 
                            font-size: 14px;
                        }
                        .metrics-grid { 
                            display: grid; 
                            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
                            gap: 20px; 
                            margin-bottom: 30px;
                        }
                        .metric-card { 
                            border: 2px solid #fed7aa; 
                            border-radius: 8px; 
                            padding: 20px; 
                            text-align: center;
                            background: #fff7ed;
                        }
                        .metric-card h3 { 
                            color: #ea580c; 
                            font-size: 24px; 
                            margin-bottom: 5px;
                            font-weight: bold;
                        }
                        .metric-card p { 
                            color: #666; 
                            font-size: 14px;
                        }
                        .section { 
                            margin-bottom: 30px; 
                            page-break-inside: avoid;
                        }
                        .section h2 { 
                            color: #ea580c; 
                            font-size: 20px; 
                            margin-bottom: 15px;
                            border-bottom: 2px solid #fed7aa;
                            padding-bottom: 5px;
                        }
                        .vendor-item { 
                            border: 1px solid #fed7aa; 
                            border-radius: 6px; 
                            padding: 15px; 
                            margin-bottom: 10px;
                            background: #fef2e2;
                        }
                        .vendor-item h4 { 
                            color: #ea580c; 
                            margin-bottom: 10px;
                            font-weight: 600;
                        }
                        .vendor-stats { 
                            display: grid; 
                            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); 
                            gap: 10px; 
                            font-size: 12px;
                            color: #666;
                        }
                        .alert-item { 
                            border: 1px solid #fecaca; 
                            border-radius: 6px; 
                            padding: 15px; 
                            margin-bottom: 10px;
                            background: #fef2f2;
                        }
                        .alert-item h4 { 
                            color: #dc2626; 
                            margin-bottom: 8px;
                            font-weight: 600;
                        }
                        .alert-item p { 
                            font-size: 12px; 
                            color: #666;
                            margin-bottom: 8px;
                        }
                        .badge { 
                            display: inline-block; 
                            padding: 2px 8px; 
                            border-radius: 4px; 
                            font-size: 10px; 
                            font-weight: 500;
                            margin-right: 5px;
                        }
                        .badge-high { background: #fee2e2; color: #dc2626; }
                        .badge-medium { background: #fed7aa; color: #ea580c; }
                        .badge-resolved { background: #dcfce7; color: #16a34a; }
                        .badge-investigating { background: #fed7aa; color: #ea580c; }
                        @media print {
                            body { padding: 10px; }
                            .section { page-break-inside: avoid; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Analytics & Insights Report</h1>
                        <p>Generated on ${new Date().toLocaleDateString()}</p>
                        <p>Date Range: ${dateRange === '7d' ? 'Last 7 days' : dateRange === '30d' ? 'Last 30 days' : dateRange === '90d' ? 'Last 90 days' : 'Last year'}</p>
                    </div>

                    <div class="metrics-grid">
                        <div class="metric-card">
                            <h3>${systemAnalytics.totalSystemVouchers.toLocaleString()}</h3>
                            <p>Total Vouchers</p>
                        </div>
                        <div class="metric-card">
                            <h3>${systemAnalytics.totalSystemUsage.toLocaleString()}</h3>
                            <p>Total Usage</p>
                        </div>
                        <div class="metric-card">
                            <h3>$${systemAnalytics.totalSystemDiscountGiven.toLocaleString()}</h3>
                            <p>Discount Given</p>
                        </div>
                        <div class="metric-card">
                            <h3>${systemAnalytics.fraudulentUsageCount}</h3>
                            <p>Fraud Incidents</p>
                        </div>
                    </div>

                    <div class="section">
                        <h2>Top Performing Vendors</h2>
                        ${topPerformingVendors.map(vendor => `
                            <div class="vendor-item">
                                <h4>${vendor.vendorName}</h4>
                                <div class="vendor-stats">
                                    <div>Vouchers: ${vendor.totalVouchers}</div>
                                    <div>Usage: ${vendor.totalUsage}</div>
                                    <div>Revenue: $${vendor.totalDiscountGiven.toLocaleString()}</div>
                                    <div>Success Rate: ${vendor.successRate}%</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <div class="section">
                        <h2>Security Alerts</h2>
                        ${suspiciousActivities.map(activity => `
                            <div class="alert-item">
                                <h4>${activity.type.replace('_', ' ')}</h4>
                                <p>${activity.description}</p>
                                <div>
                                    <span class="badge badge-${activity.severity.toLowerCase()}">${activity.severity}</span>
                                    <span class="badge badge-${activity.status.toLowerCase()}">${activity.status}</span>
                                </div>
                                <p style="margin-top: 8px;">Detected: ${new Date(activity.detectedAt).toLocaleString()}</p>
                            </div>
                        `).join('')}
                    </div>

                    <div class="section">
                        <h2>Revenue Analysis</h2>
                        <div class="metrics-grid">
                            <div class="metric-card">
                                <h3>$${systemAnalytics.totalSystemDiscountGiven.toLocaleString()}</h3>
                                <p>Total Discounts Given</p>
                            </div>
                            <div class="metric-card">
                                <h3>$${systemAnalytics.totalSystemRevenueLost.toLocaleString()}</h3>
                                <p>Revenue Impact</p>
                            </div>
                            <div class="metric-card">
                                <h3>$${systemAnalytics.averageDiscountPerVoucher.toFixed(2)}</h3>
                                <p>Avg Discount/Voucher</p>
                            </div>
                            <div class="metric-card">
                                <h3>${((systemAnalytics.totalSystemUsage / systemAnalytics.totalSystemVouchers) * 100).toFixed(1)}%</h3>
                                <p>Usage Efficiency</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        `;

        printWindow.document.write(htmlContent);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
            <div className="p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-2">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                            Analytics & Insights
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600">Comprehensive system analytics and performance metrics</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <Select value={dateRange} onValueChange={setDateRange}>
                            <SelectTrigger className="w-full sm:w-[140px] border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="7d">Last 7 days</SelectItem>
                                <SelectItem value="30d">Last 30 days</SelectItem>
                                <SelectItem value="90d">Last 90 days</SelectItem>
                                <SelectItem value="1y">Last year</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button 
                            onClick={exportToPDF}
                            className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white border-0"
                            size="sm"
                        >
                            <Download className="h-4 w-4 mr-2" />
                            Export PDF
                        </Button>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
                                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">Total Vouchers</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold font-montserrat text-orange-600">
                                        {systemAnalytics.totalSystemVouchers.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
                                    <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">Total Usage</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold font-montserrat text-orange-600">
                                        {systemAnalytics.totalSystemUsage.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 sm:p-3 bg-orange-100 rounded-lg">
                                    <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">Discount Given</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold font-montserrat text-orange-600">
                                        ${systemAnalytics.totalSystemDiscountGiven.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4 sm:p-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 sm:p-3 bg-red-100 rounded-lg">
                                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-xs sm:text-sm text-gray-600 truncate">Fraud Incidents</p>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-bold font-montserrat text-red-600">
                                        {systemAnalytics.fraudulentUsageCount}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                    {/* Trends Chart */}
                    <Card className="border-orange-200 shadow-sm">
                        <CardHeader className="pb-4">
                            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="font-montserrat text-orange-600 text-lg sm:text-xl">Performance Trends</CardTitle>
                                    <CardDescription className="text-xs sm:text-sm">Monthly performance metrics over time</CardDescription>
                                </div>
                                <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                                    <SelectTrigger className="w-full sm:w-[120px] border-orange-200 focus:border-orange-500">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="usage">Usage</SelectItem>
                                        <SelectItem value="revenue">Revenue</SelectItem>
                                        <SelectItem value="users">Users</SelectItem>
                                        <SelectItem value="created">Created</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <ChartContainer
                                config={{
                                    value: {
                                        label: getMetricLabel(),
                                        color: "#ea580c",
                                    },
                                }}
                                className="h-[250px] sm:h-[300px]"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={getMetricData()}>
                                        <XAxis 
                                            dataKey="month" 
                                            fontSize={12}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <YAxis 
                                            fontSize={12}
                                            axisLine={false}
                                            tickLine={false}
                                        />
                                        <ChartTooltip
                                            content={({ active, payload, label }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-white border border-orange-200 rounded-lg p-2 shadow-lg">
                                                            <p className="font-medium text-orange-600">{label}</p>
                                                            <p className="text-sm text-gray-600">
                                                                {getMetricLabel()}: {payload[0].value?.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    )
                                                }
                                                return null
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke="#ea580c"
                                            fill="#ea580c"
                                            fillOpacity={0.2}
                                            strokeWidth={2}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    {/* Voucher Distribution */}
                    <Card className="border-orange-200 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="font-montserrat text-orange-600 text-lg sm:text-xl">Voucher Distribution</CardTitle>
                            <CardDescription className="text-xs sm:text-sm">Breakdown by discount type</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <ChartContainer
                                config={{
                                    count: {
                                        label: "Count",
                                        color: "#ea580c",
                                    },
                                }}
                                className="h-[250px] sm:h-[300px]"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={voucherDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={5}
                                            dataKey="count"
                                            nameKey="discountType"
                                        >
                                            {voucherDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <ChartTooltip
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    const data = payload[0].payload
                                                    return (
                                                        <div className="bg-white border border-orange-200 rounded-lg p-2 shadow-lg">
                                                            <p className="font-medium text-orange-600">{data.discountType.replace("_", " ")}</p>
                                                            <p className="text-sm text-gray-600">
                                                                Count: {data.count} ({data.percentage}%)
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Value: ${data.totalValue.toLocaleString()}
                                                            </p>
                                                        </div>
                                                    )
                                                }
                                                return null
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                                {voucherDistribution.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 text-xs sm:text-sm">
                                        <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                                        <span className="text-gray-600 truncate">{item.discountType.replace("_", " ")}</span>
                                        <span className="font-medium ml-auto text-orange-600">{item.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Analytics */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                    {/* Top Performing Vendors */}
                    <Card className="border-orange-200 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="font-montserrat text-orange-600 text-lg sm:text-xl">Top Performing Vendors</CardTitle>
                            <CardDescription className="text-xs sm:text-sm">Vendors with highest success rates and revenue impact</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="space-y-3 sm:space-y-4">
                                {topPerformingVendors.map((vendor, index) => (
                                    <div key={vendor.vendorId} className="p-3 sm:p-4 rounded-lg bg-orange-50 border border-orange-100">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                                            <h4 className="font-medium text-orange-600 text-sm sm:text-base truncate">{vendor.vendorName}</h4>
                                            <Badge className="bg-orange-100 text-orange-800 border-orange-200 w-fit">{vendor.successRate}%</Badge>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs text-gray-600 mb-3">
                                            <div className="text-center sm:text-left">
                                                <div className="font-medium text-orange-600">{vendor.totalVouchers}</div>
                                                <div>vouchers</div>
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <div className="font-medium text-orange-600">{vendor.totalUsage}</div>
                                                <div>uses</div>
                                            </div>
                                            <div className="text-center sm:text-left">
                                                <div className="font-medium text-orange-600">${vendor.totalDiscountGiven.toLocaleString()}</div>
                                                <div>revenue</div>
                                            </div>
                                        </div>
                                        <Progress 
                                            value={vendor.successRate} 
                                            className="h-2 bg-orange-100"
                                            style={{
                                                '--progress-background': '#fed7aa',
                                                '--progress-foreground': '#ea580c'
                                            } as React.CSSProperties}
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Alerts */}
                    <Card className="border-orange-200 shadow-sm">
                        <CardHeader className="pb-4">
                            <CardTitle className="font-montserrat flex items-center gap-2 text-lg sm:text-xl">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                                <span className="text-orange-600">Security Alerts</span>
                            </CardTitle>
                            <CardDescription className="text-xs sm:text-sm">Suspicious activities and fraud detection</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="space-y-3 sm:space-y-4">
                                {suspiciousActivities.map((activity) => (
                                    <div key={activity.id} className="p-3 sm:p-4 rounded-lg border border-orange-200 bg-orange-50">
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm text-orange-600 truncate">
                                                    {activity.type.replace("_", " ")}
                                                </h4>
                                                <p className="text-xs text-gray-600 mt-1 break-words">{activity.description}</p>
                                            </div>
                                            <div className="flex gap-2 flex-wrap">
                                                {getSeverityBadge(activity.severity)}
                                                {getStatusBadge(activity.status)}
                                            </div>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 text-xs text-gray-600">
                                            <span>Detected: {new Date(activity.detectedAt).toLocaleDateString()}</span>
                                            <span>Vendor: {activity.vendorId}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Revenue Analysis */}
                <Card className="border-orange-200 shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="font-montserrat text-orange-600 text-lg sm:text-xl">Revenue Impact Analysis</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">Financial metrics and revenue trends</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                            <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100">
                                <p className="text-lg sm:text-2xl font-bold font-montserrat text-orange-600">
                                    ${systemAnalytics.totalSystemDiscountGiven.toLocaleString()}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">Total Discounts Given</p>
                            </div>
                            <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100">
                                <p className="text-lg sm:text-2xl font-bold font-montserrat text-orange-600">
                                    ${systemAnalytics.totalSystemRevenueLost.toLocaleString()}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">Revenue Impact</p>
                            </div>
                            <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100">
                                <p className="text-lg sm:text-2xl font-bold font-montserrat text-orange-600">
                                    ${systemAnalytics.averageDiscountPerVoucher.toFixed(2)}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">Avg Discount/Voucher</p>
                            </div>
                            <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-100">
                                <p className="text-lg sm:text-2xl font-bold font-montserrat text-orange-600">
                                    {((systemAnalytics.totalSystemUsage / systemAnalytics.totalSystemVouchers) * 100).toFixed(1)}%
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 mt-1">Usage Efficiency</p>
                            </div>
                        </div>

                        <ChartContainer
                            config={{
                                totalDiscountGiven: {
                                    label: "Discount Given ($)",
                                    color: "#ea580c",
                                },
                            }}
                            className="h-[200px] sm:h-[250px]"
                        >
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyTrends}>
                                    <XAxis 
                                        dataKey="month" 
                                        fontSize={12}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <YAxis 
                                        fontSize={12}
                                        axisLine={false}
                                        tickLine={false}
                                    />
                                    <ChartTooltip
                                        content={({ active, payload, label }) => {
                                            if (active && payload && payload.length) {
                                                return (
                                                    <div className="bg-white border border-orange-200 rounded-lg p-2 shadow-lg">
                                                        <p className="font-medium text-orange-600">{label}</p>
                                                        <p className="text-sm text-gray-600">
                                                            Discount Given: ${payload[0].value?.toLocaleString()}
                                                        </p>
                                                    </div>
                                                )
                                            }
                                            return null
                                        }}
                                    />
                                    <Bar dataKey="totalDiscountGiven" fill="#ea580c" radius={[2, 2, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
