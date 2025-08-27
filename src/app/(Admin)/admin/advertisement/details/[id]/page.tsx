"use client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
    ArrowLeft,
    Star,
    Zap,
    ExternalLink,
    Eye,
    MousePointer,
    TrendingUp,
    DollarSign,
    BarChart3,
    Target,
    Clock,
    Edit,
    Play,
    Pause,
    Trash2,
} from "lucide-react"
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default async function AdDetails({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const resolvedParams = await params
    const adId = Number.parseInt(resolvedParams.id)

    // Mock detailed ad data
    const adData = {
        id: adId,
        title: "Premium Cloud Hosting",
        vendor: "CloudTech Inc",
        type: "featured",
        status: "active",
        description: "High-performance cloud hosting solutions with 99.9% uptime guarantee and 24/7 support.",
        startDate: "2024-01-15",
        endDate: "2024-02-15",
        budget: 2500,
        spent: 1850,
        impressions: 45000,
        clicks: 890,
        conversions: 45,
        ctr: 1.98,
        cpc: 2.08,
        cpm: 41.11,
        conversionRate: 5.06,
        roas: 3.2,
        targetAudience: "Tech professionals, developers, startups",
        adFormat: "Banner + Text",
        placement: "Homepage, Category pages",
        createdAt: "2024-01-10",
        lastModified: "2024-01-20",
    }

    // Mock performance data over time
    const performanceData = [
        { date: "Jan 15", impressions: 2500, clicks: 45, conversions: 2 },
        { date: "Jan 16", impressions: 3200, clicks: 62, conversions: 3 },
        { date: "Jan 17", impressions: 2800, clicks: 58, conversions: 4 },
        { date: "Jan 18", impressions: 3500, clicks: 71, conversions: 3 },
        { date: "Jan 19", impressions: 4100, clicks: 89, conversions: 5 },
        { date: "Jan 20", impressions: 3800, clicks: 76, conversions: 4 },
        { date: "Jan 21", impressions: 4200, clicks: 95, conversions: 6 },
    ]

    // Mock hourly performance data
    const hourlyData = [
        { hour: "00:00", impressions: 1200, clicks: 24 },
        { hour: "04:00", impressions: 800, clicks: 16 },
        { hour: "08:00", impressions: 2500, clicks: 52 },
        { hour: "12:00", impressions: 3200, clicks: 68 },
        { hour: "16:00", impressions: 2800, clicks: 58 },
        { hour: "20:00", impressions: 2100, clicks: 42 },
    ]

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200">Active</Badge>
            case "pending":
                return <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 border-orange-200">Pending</Badge>
            case "paused":
                return <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100 border-gray-200">Paused</Badge>
            case "expired":
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Expired</Badge>
            default:
                return <Badge className="bg-orange-100 text-orange-800 border-orange-200">{status}</Badge>
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "featured":
                return <Star className="w-5 h-5 text-orange-500" />
            case "sponsored":
                return <Zap className="w-5 h-5 text-orange-600" />
            case "external":
                return <ExternalLink className="w-5 h-5 text-orange-400" />
            default:
                return null
        }
    }

    return (
        <div className="space-y-6 bg-white min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-orange-50 p-6 rounded-lg border border-orange-100">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" onClick={() => router.back()} className="hover:bg-orange-100">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                    </Button>
                    <div className="flex items-center gap-3">
                        {getTypeIcon(adData.type)}
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-orange-900">{adData.title}</h1>
                            <p className="text-orange-700">by {adData.vendor}</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {getStatusBadge(adData.status)}
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/admin/ads/${adId}/edit`)} className="border-orange-200 text-orange-700 hover:bg-orange-50">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                        {adData.status === "active" ? (
                            <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                                <Pause className="w-4 h-4 mr-2" />
                                Pause
                            </Button>
                        ) : (
                            <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                                <Play className="w-4 h-4 mr-2" />
                                Resume
                            </Button>
                        )}
                        <Button variant="destructive" size="sm" className="bg-red-500 hover:bg-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <Card className="border-orange-100 bg-white">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-orange-500" />
                            <div>
                                <p className="text-xs text-orange-600">Impressions</p>
                                <p className="text-lg font-bold text-orange-900">{adData.impressions.toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-orange-100 bg-white">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <MousePointer className="w-4 h-4 text-orange-500" />
                            <div>
                                <p className="text-xs text-orange-600">Clicks</p>
                                <p className="text-lg font-bold text-orange-900">{adData.clicks.toLocaleString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-orange-100 bg-white">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <Target className="w-4 h-4 text-orange-500" />
                            <div>
                                <p className="text-xs text-orange-600">Conversions</p>
                                <p className="text-lg font-bold text-orange-900">{adData.conversions}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-orange-100 bg-white">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-orange-500" />
                            <div>
                                <p className="text-xs text-orange-600">CTR</p>
                                <p className="text-lg font-bold text-orange-900">{adData.ctr}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-orange-100 bg-white">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-orange-500" />
                            <div>
                                <p className="text-xs text-orange-600">CPC</p>
                                <p className="text-lg font-bold text-orange-900">${adData.cpc}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-orange-100 bg-white">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-orange-500" />
                            <div>
                                <p className="text-xs text-orange-600">ROAS</p>
                                <p className="text-lg font-bold text-orange-900">{adData.roas}x</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-orange-50 border-orange-200">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Overview</TabsTrigger>
                    <TabsTrigger value="performance" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Performance</TabsTrigger>
                    <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Analytics</TabsTrigger>
                    <TabsTrigger value="settings" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Ad Information */}
                        <Card className="border-orange-100 bg-white">
                            <CardHeader className="border-b border-orange-100">
                                <CardTitle className="text-orange-900">Ad Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-orange-600">Description</p>
                                    <p className="text-sm text-orange-800">{adData.description}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-orange-600">Start Date</p>
                                        <p className="text-sm text-orange-800">{adData.startDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-orange-600">End Date</p>
                                        <p className="text-sm text-orange-800">{adData.endDate}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-orange-600">Target Audience</p>
                                    <p className="text-sm text-orange-800">{adData.targetAudience}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-orange-600">Ad Format</p>
                                        <p className="text-sm text-orange-800">{adData.adFormat}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-orange-600">Placement</p>
                                        <p className="text-sm text-orange-800">{adData.placement}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Budget & Spending */}
                        <Card className="border-orange-100 bg-white">
                            <CardHeader className="border-b border-orange-100">
                                <CardTitle className="text-orange-900">Budget & Spending</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium text-orange-600">Budget Utilization</span>
                                        <span className="text-sm text-orange-700">
                                            ${adData.spent.toLocaleString()} / ${adData.budget.toLocaleString()}
                                        </span>
                                    </div>
                                    <Progress value={(adData.spent / adData.budget) * 100} className="h-2 bg-orange-100 [&>div]:bg-orange-500" />
                                    <p className="text-xs text-orange-600 mt-1">
                                        {Math.round((adData.spent / adData.budget) * 100)}% of budget used
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm font-medium text-orange-600">Cost Per Click</p>
                                        <p className="text-2xl font-bold text-orange-900">${adData.cpc}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-orange-600">Cost Per Mille</p>
                                        <p className="text-2xl font-bold text-orange-900">${adData.cpm}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-orange-600">Conversion Rate</p>
                                    <p className="text-2xl font-bold text-orange-900">{adData.conversionRate}%</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-6">
                    <Card className="border-orange-100 bg-white">
                        <CardHeader className="border-b border-orange-100">
                            <CardTitle className="text-orange-900">Performance Over Time</CardTitle>
                            <CardDescription className="text-orange-600">Daily performance metrics for the past 7 days</CardDescription>
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
                                    conversions: {
                                        label: "Conversions",
                                        color: "#fed7aa",
                                    },
                                }}
                                className="h-[300px]"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={performanceData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                                        <XAxis dataKey="date" stroke="#ea580c" />
                                        <YAxis stroke="#ea580c" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line type="monotone" dataKey="impressions" stroke="#ea580c" strokeWidth={2} />
                                        <Line type="monotone" dataKey="clicks" stroke="#fb923c" strokeWidth={2} />
                                        <Line type="monotone" dataKey="conversions" stroke="#f97316" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                    <Card className="border-orange-100 bg-white">
                        <CardHeader className="border-b border-orange-100">
                            <CardTitle className="text-orange-900">Hourly Performance</CardTitle>
                            <CardDescription className="text-orange-600">Performance breakdown by hour of day</CardDescription>
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
                                className="h-[300px]"
                            >
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={hourlyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
                                        <XAxis dataKey="hour" stroke="#ea580c" />
                                        <YAxis stroke="#ea580c" />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="impressions" fill="#ea580c" />
                                        <Bar dataKey="clicks" fill="#fb923c" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-orange-100 bg-white">
                            <CardHeader className="border-b border-orange-100">
                                <CardTitle className="text-orange-900">Top Performing Hours</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-orange-700">12:00 PM</span>
                                        <span className="text-sm font-medium text-orange-900">68 clicks</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-orange-700">4:00 PM</span>
                                        <span className="text-sm font-medium text-orange-900">58 clicks</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-orange-700">8:00 AM</span>
                                        <span className="text-sm font-medium text-orange-900">52 clicks</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-orange-100 bg-white">
                            <CardHeader className="border-b border-orange-100">
                                <CardTitle className="text-orange-900">Conversion Funnel</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-orange-700">Impressions</span>
                                        <span className="text-sm font-medium text-orange-900">{adData.impressions.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-orange-700">Clicks</span>
                                        <span className="text-sm font-medium text-orange-900">
                                            {adData.clicks} ({adData.ctr}%)
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-orange-700">Conversions</span>
                                        <span className="text-sm font-medium text-orange-900">
                                            {adData.conversions} ({adData.conversionRate}%)
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-6">
                    <Card className="border-orange-100 bg-white">
                        <CardHeader className="border-b border-orange-100">
                            <CardTitle className="text-orange-900">Ad Settings</CardTitle>
                            <CardDescription className="text-orange-600">Manage ad configuration and metadata</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-orange-600">Created</p>
                                    <p className="text-sm text-orange-800">{adData.createdAt}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-orange-600">Last Modified</p>
                                    <p className="text-sm text-orange-800">{adData.lastModified}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-orange-600">Ad ID</p>
                                <p className="text-sm font-mono text-orange-800">{adData.id}</p>
                            </div>
                            <div className="flex gap-2 pt-4">
                                <Button variant="outline" onClick={() => router.push(`/admin/ads/${adId}/edit`)} className="border-orange-200 text-orange-700 hover:bg-orange-50">
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Settings
                                </Button>
                                <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                                    <Clock className="w-4 h-4 mr-2" />
                                    Schedule Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
