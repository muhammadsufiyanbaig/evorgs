"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Save, X, Calendar, DollarSign, Target, ImageIcon, Settings, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default async function EditAd({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const resolvedParams = await params
    const adId = Number.parseInt(resolvedParams.id)

    // Mock ad data for editing
    const [adData, setAdData] = useState({
        id: adId,
        title: "Premium Cloud Hosting",
        vendor: "CloudTech Inc",
        type: "featured",
        status: "active",
        description: "High-performance cloud hosting solutions with 99.9% uptime guarantee and 24/7 support.",
        startDate: "2024-01-15",
        endDate: "2024-02-15",
        budget: 2500,
        dailyBudget: 100,
        targetAudience: "Tech professionals, developers, startups",
        adFormat: "banner",
        placement: "homepage",
        keywords: "cloud hosting, web hosting, server hosting",
        ageRange: "25-45",
        location: "United States, Canada",
        deviceTargeting: "all",
        bidStrategy: "cpc",
        maxCpc: 2.5,
        isActive: true,
        autoRenew: false,
        priority: "high",
    })

    const [isLoading, setIsLoading] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)

    const handleInputChange = (field: string, value: any) => {
        setAdData((prev) => ({ ...prev, [field]: value }))
        setHasChanges(true)
    }

    const handleSave = async () => {
        setIsLoading(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setIsLoading(false)
        setHasChanges(false)
        // Show success message or redirect
        router.push(`/admin/ads/${adId}`)
    }

    const handleCancel = () => {
        if (hasChanges) {
            if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
                router.back()
            }
        } else {
            router.back()
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={handleCancel} className="hover:bg-orange-100 hover:text-orange-800">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back
                        </Button>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-orange-900">Edit Ad</h1>
                            <p className="text-orange-600">ID: {adId}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge 
                            variant={adData.status === "active" ? "default" : "secondary"}
                            className={adData.status === "active" ? "bg-orange-600 hover:bg-orange-700" : "bg-orange-200 text-orange-800"}
                        >
                            {adData.status}
                        </Badge>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={handleCancel} className="border-orange-300 text-orange-700 hover:bg-orange-50">
                                <X className="w-4 h-4 mr-2" />
                                Cancel
                            </Button>
                            <Button 
                                onClick={handleSave} 
                                disabled={isLoading || !hasChanges}
                                className="bg-orange-600 hover:bg-orange-700 text-white"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </div>
                </div>

                {hasChanges && (
                    <Alert className="border-orange-200 bg-orange-50">
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                        <AlertDescription className="text-orange-800">
                            You have unsaved changes. Don't forget to save before leaving.
                        </AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <Card className="border-orange-200 bg-white/80 backdrop-blur-sm shadow-lg">
                            <CardHeader className="border-b border-orange-100">
                                <CardTitle className="flex items-center gap-2 text-orange-900">
                                    <Settings className="w-5 h-5 text-orange-600" />
                                    Basic Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="title" className="text-orange-800">Ad Title</Label>
                                        <Input
                                            id="title"
                                            value={adData.title}
                                            onChange={(e) => handleInputChange("title", e.target.value)}
                                            placeholder="Enter ad title"
                                            className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="type" className="text-orange-800">Ad Type</Label>
                                        <Select value={adData.type} onValueChange={(value) => handleInputChange("type", value)}>
                                            <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-orange-200">
                                                <SelectItem value="featured">Featured</SelectItem>
                                                <SelectItem value="sponsored">Sponsored</SelectItem>
                                                <SelectItem value="external">External</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-orange-800">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={adData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        placeholder="Enter ad description"
                                        rows={3}
                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="keywords" className="text-orange-800">Keywords</Label>
                                    <Input
                                        id="keywords"
                                        value={adData.keywords}
                                        onChange={(e) => handleInputChange("keywords", e.target.value)}
                                        placeholder="Enter keywords separated by commas"
                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Campaign Settings */}
                        <Card className="border-orange-200 bg-white/80 backdrop-blur-sm shadow-lg">
                            <CardHeader className="border-b border-orange-100">
                                <CardTitle className="flex items-center gap-2 text-orange-900">
                                    <Calendar className="w-5 h-5 text-orange-600" />
                                    Campaign Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="startDate" className="text-orange-800">Start Date</Label>
                                        <Input
                                            id="startDate"
                                            type="date"
                                            value={adData.startDate}
                                            onChange={(e) => handleInputChange("startDate", e.target.value)}
                                            className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="endDate" className="text-orange-800">End Date</Label>
                                        <Input
                                            id="endDate"
                                            type="date"
                                            value={adData.endDate}
                                            onChange={(e) => handleInputChange("endDate", e.target.value)}
                                            className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="status" className="text-orange-800">Status</Label>
                                        <Select value={adData.status} onValueChange={(value) => handleInputChange("status", value)}>
                                            <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-orange-200">
                                                <SelectItem value="active">Active</SelectItem>
                                                <SelectItem value="paused">Paused</SelectItem>
                                                <SelectItem value="pending">Pending</SelectItem>
                                                <SelectItem value="expired">Expired</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="priority" className="text-orange-800">Priority</Label>
                                        <Select value={adData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                                            <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-orange-200">
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200">
                                    <div className="space-y-0.5">
                                        <Label className="text-orange-800">Auto Renew</Label>
                                        <p className="text-sm text-orange-600">Automatically renew this ad when it expires</p>
                                    </div>
                                    <Switch
                                        checked={adData.autoRenew}
                                        onCheckedChange={(checked) => handleInputChange("autoRenew", checked)}
                                        className="data-[state=checked]:bg-orange-600"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Budget & Bidding */}
                        <Card className="border-orange-200 bg-white/80 backdrop-blur-sm shadow-lg">
                            <CardHeader className="border-b border-orange-100">
                                <CardTitle className="flex items-center gap-2 text-orange-900">
                                    <DollarSign className="w-5 h-5 text-orange-600" />
                                    Budget & Bidding
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="budget" className="text-orange-800">Total Budget ($)</Label>
                                        <Input
                                            id="budget"
                                            type="number"
                                            value={adData.budget}
                                            onChange={(e) => handleInputChange("budget", Number(e.target.value))}
                                            placeholder="0.00"
                                            className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dailyBudget" className="text-orange-800">Daily Budget ($)</Label>
                                        <Input
                                            id="dailyBudget"
                                            type="number"
                                            value={adData.dailyBudget}
                                            onChange={(e) => handleInputChange("dailyBudget", Number(e.target.value))}
                                            placeholder="0.00"
                                            className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="bidStrategy" className="text-orange-800">Bid Strategy</Label>
                                        <Select value={adData.bidStrategy} onValueChange={(value) => handleInputChange("bidStrategy", value)}>
                                            <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-orange-200">
                                                <SelectItem value="cpc">Cost Per Click (CPC)</SelectItem>
                                                <SelectItem value="cpm">Cost Per Mille (CPM)</SelectItem>
                                                <SelectItem value="cpa">Cost Per Acquisition (CPA)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="maxCpc" className="text-orange-800">Max CPC ($)</Label>
                                        <Input
                                            id="maxCpc"
                                            type="number"
                                            step="0.01"
                                            value={adData.maxCpc}
                                            onChange={(e) => handleInputChange("maxCpc", Number(e.target.value))}
                                            placeholder="0.00"
                                            className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Targeting */}
                        <Card className="border-orange-200 bg-white/80 backdrop-blur-sm shadow-lg">
                            <CardHeader className="border-b border-orange-100">
                                <CardTitle className="flex items-center gap-2 text-orange-900">
                                    <Target className="w-5 h-5 text-orange-600" />
                                    Targeting Options
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="targetAudience" className="text-orange-800">Target Audience</Label>
                                    <Textarea
                                        id="targetAudience"
                                        value={adData.targetAudience}
                                        onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                                        placeholder="Describe your target audience"
                                        rows={2}
                                        className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="ageRange" className="text-orange-800">Age Range</Label>
                                        <Input
                                            id="ageRange"
                                            value={adData.ageRange}
                                            onChange={(e) => handleInputChange("ageRange", e.target.value)}
                                            placeholder="e.g., 25-45"
                                            className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="location" className="text-orange-800">Location</Label>
                                        <Input
                                            id="location"
                                            value={adData.location}
                                            onChange={(e) => handleInputChange("location", e.target.value)}
                                            placeholder="e.g., United States, Canada"
                                            className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="deviceTargeting" className="text-orange-800">Device Targeting</Label>
                                    <Select
                                        value={adData.deviceTargeting}
                                        onValueChange={(value) => handleInputChange("deviceTargeting", value)}
                                    >
                                        <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-orange-200">
                                            <SelectItem value="all">All Devices</SelectItem>
                                            <SelectItem value="desktop">Desktop Only</SelectItem>
                                            <SelectItem value="mobile">Mobile Only</SelectItem>
                                            <SelectItem value="tablet">Tablet Only</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Ad Format & Placement */}
                        <Card className="border-orange-200 bg-white/80 backdrop-blur-sm shadow-lg">
                            <CardHeader className="border-b border-orange-100">
                                <CardTitle className="flex items-center gap-2 text-orange-900">
                                    <ImageIcon className="w-5 h-5 text-orange-600" />
                                    Format & Placement
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4 pt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="adFormat" className="text-orange-800">Ad Format</Label>
                                    <Select value={adData.adFormat} onValueChange={(value) => handleInputChange("adFormat", value)}>
                                        <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-orange-200">
                                            <SelectItem value="banner">Banner</SelectItem>
                                            <SelectItem value="text">Text Only</SelectItem>
                                            <SelectItem value="video">Video</SelectItem>
                                            <SelectItem value="carousel">Carousel</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="placement" className="text-orange-800">Placement</Label>
                                    <Select value={adData.placement} onValueChange={(value) => handleInputChange("placement", value)}>
                                        <SelectTrigger className="border-orange-200 focus:border-orange-500 focus:ring-orange-500">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-orange-200">
                                            <SelectItem value="homepage">Homepage</SelectItem>
                                            <SelectItem value="category">Category Pages</SelectItem>
                                            <SelectItem value="search">Search Results</SelectItem>
                                            <SelectItem value="sidebar">Sidebar</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="border-orange-200 bg-white/80 backdrop-blur-sm shadow-lg">
                            <CardHeader className="border-b border-orange-100">
                                <CardTitle className="text-orange-900">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 pt-6">
                                <Button variant="outline" className="w-full justify-start bg-transparent border-orange-300 text-orange-700 hover:bg-orange-50">
                                    Preview Ad
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent border-orange-300 text-orange-700 hover:bg-orange-50">
                                    Duplicate Ad
                                </Button>
                                <Button variant="outline" className="w-full justify-start bg-transparent border-orange-300 text-orange-700 hover:bg-orange-50">
                                    View Analytics
                                </Button>
                                <Separator className="bg-orange-200" />
                                <Button variant="destructive" className="w-full justify-start bg-red-600 hover:bg-red-700">
                                    Delete Ad
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Ad Status */}
                        <Card className="border-orange-200 bg-white/80 backdrop-blur-sm shadow-lg">
                            <CardHeader className="border-b border-orange-100">
                                <CardTitle className="text-orange-900">Current Status</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 pt-6">
                                <div className="flex justify-between">
                                    <span className="text-sm text-orange-600">Status</span>
                                    <Badge 
                                        variant={adData.status === "active" ? "default" : "secondary"}
                                        className={adData.status === "active" ? "bg-orange-600 hover:bg-orange-700" : "bg-orange-200 text-orange-800"}
                                    >
                                        {adData.status}
                                    </Badge>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-orange-600">Type</span>
                                    <span className="text-sm font-medium capitalize text-orange-800">{adData.type}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-sm text-orange-600">Vendor</span>
                                    <span className="text-sm font-medium text-orange-800">{adData.vendor}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
