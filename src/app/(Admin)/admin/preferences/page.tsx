"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Store,
    Search,
    Filter,
    Download,
    Bell,
    Mail,
    MoreHorizontal,
    Edit,
    Trash2,
    RefreshCw,
    Eye,
    EyeOff,
    Clock,
    Star,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data - in real app this would come from GraphQL
const mockVendors = [
    {
        id: "1",
        vendorId: "vendor_001",
        businessName: "Tech Solutions Inc",
        email: "contact@techsolutions.com",
        category: "Technology",
        pushNotifications: true,
        emailNotifications: true,
        visibleInSearch: true,
        visibleReviews: true,
        workingHoursStart: "09:00",
        workingHoursEnd: "17:00",
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        rating: 4.8,
        totalReviews: 124,
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-20T14:45:00Z",
        lastActive: "2024-01-25T09:15:00Z",
    },
    {
        id: "2",
        vendorId: "vendor_002",
        businessName: "Creative Design Studio",
        email: "hello@creativedesign.com",
        category: "Design",
        pushNotifications: false,
        emailNotifications: true,
        visibleInSearch: true,
        visibleReviews: false,
        workingHoursStart: "10:00",
        workingHoursEnd: "18:00",
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        rating: 4.6,
        totalReviews: 89,
        createdAt: "2024-01-10T08:20:00Z",
        updatedAt: "2024-01-22T16:30:00Z",
        lastActive: "2024-01-25T11:45:00Z",
    },
    {
        id: "3",
        vendorId: "vendor_003",
        businessName: "Local Restaurant",
        email: "orders@localrestaurant.com",
        category: "Food & Beverage",
        pushNotifications: true,
        emailNotifications: false,
        visibleInSearch: true,
        visibleReviews: true,
        workingHoursStart: "11:00",
        workingHoursEnd: "22:00",
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        rating: 4.2,
        totalReviews: 256,
        createdAt: "2024-01-05T12:15:00Z",
        updatedAt: "2024-01-18T10:20:00Z",
        lastActive: "2024-01-24T15:30:00Z",
    },
    {
        id: "4",
        vendorId: "vendor_004",
        businessName: "Fitness Center Pro",
        email: "info@fitnesscenter.com",
        category: "Health & Fitness",
        pushNotifications: true,
        emailNotifications: true,
        visibleInSearch: false,
        visibleReviews: true,
        workingHoursStart: "06:00",
        workingHoursEnd: "21:00",
        workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        rating: 4.9,
        totalReviews: 178,
        createdAt: "2024-01-12T14:45:00Z",
        updatedAt: "2024-01-19T09:10:00Z",
        lastActive: "2024-01-25T08:20:00Z",
    },
]

const vendorStats = [
    {
        name: "Search Visible",
        value: "967",
        percentage: 78,
        icon: Eye,
        color: "text-green-600",
    },
    {
        name: "Reviews Visible",
        value: "892",
        percentage: 72,
        icon: Star,
        color: "text-yellow-600",
    },
    {
        name: "Working Hours Set",
        value: "1,134",
        percentage: 92,
        icon: Clock,
        color: "text-blue-600",
    },
    {
        name: "Notifications On",
        value: "756",
        percentage: 61,
        icon: Bell,
        color: "text-orange-600",
    },
]

const workingDaysOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function VendorPreferencesPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [filterType, setFilterType] = useState("all")
    const [selectedVendors, setSelectedVendors] = useState<string[]>([])
    const [editingVendor, setEditingVendor] = useState<any>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const filteredVendors = mockVendors.filter((vendor) => {
        const matchesSearch =
            vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vendor.category.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter =
            filterType === "all" ||
            (filterType === "search-visible" && vendor.visibleInSearch) ||
            (filterType === "search-hidden" && !vendor.visibleInSearch) ||
            (filterType === "reviews-visible" && vendor.visibleReviews) ||
            (filterType === "reviews-hidden" && !vendor.visibleReviews) ||
            (filterType === "notifications-on" && (vendor.pushNotifications || vendor.emailNotifications)) ||
            (filterType === "notifications-off" && !vendor.pushNotifications && !vendor.emailNotifications)

        return matchesSearch && matchesFilter
    })

    const handleSelectVendor = (vendorId: string) => {
        setSelectedVendors((prev) => (prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]))
    }

    const handleSelectAll = () => {
        setSelectedVendors(
            selectedVendors.length === filteredVendors.length ? [] : filteredVendors.map((vendor) => vendor.id),
        )
    }

    const handleBulkUpdate = (field: string, value: boolean) => {
        // In real app, this would call GraphQL mutation
        console.log(`Bulk updating ${field} to ${value} for vendors:`, selectedVendors)
        setSelectedVendors([])
    }

    const handleEditVendor = (vendor: any) => {
        setEditingVendor({ ...vendor })
        setIsEditDialogOpen(true)
    }

    const handleSaveVendor = () => {
        // In real app, this would call GraphQL mutation
        console.log("Saving vendor:", editingVendor)
        setIsEditDialogOpen(false)
        setEditingVendor(null)
    }

    const handleWorkingDayToggle = (day: string) => {
        if (!editingVendor) return
        const currentDays = editingVendor.workingDays || []
        const updatedDays = currentDays.includes(day) ? currentDays.filter((d: string) => d !== day) : [...currentDays, day]
        setEditingVendor({ ...editingVendor, workingDays: updatedDays })
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        })
    }

    const formatWorkingHours = (start: string, end: string) => {
        return `${start} - ${end}`
    }

    const formatWorkingDays = (days: string[]) => {
        if (days.length === 7) return "Every day"
        if (days.length === 5 && !days.includes("Saturday") && !days.includes("Sunday")) return "Weekdays"
        if (days.length === 2 && days.includes("Saturday") && days.includes("Sunday")) return "Weekends"
        return days.slice(0, 3).join(", ") + (days.length > 3 ? "..." : "")
    }

    const handleExportToPDF = () => {
        const printContent = `
            <html>
                <head>
                    <title>Vendor Preferences Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; background-color: #fff; color: #f97316; }
                        h1 { color: #f97316; margin-bottom: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #fed7aa; padding: 8px; text-align: left; }
                        th { background-color: #f97316; color: white; }
                        .stats { display: flex; gap: 20px; margin: 20px 0; }
                        .stat-card { border: 1px solid #fed7aa; padding: 15px; border-radius: 5px; background-color: #fff7ed; }
                        .visible { color: #16a34a; font-weight: bold; }
                        .hidden { color: #dc2626; font-weight: bold; }
                        .rating { color: #eab308; font-weight: bold; }
                    </style>
                </head>
                <body>
                    <h1>Vendor Preferences Report</h1>
                    <p>Generated on: ${new Date().toLocaleDateString()}</p>
                    
                    <div class="stats">
                        ${vendorStats
                            .map(
                                (stat) => `
                            <div class="stat-card">
                                <h3>${stat.name}</h3>
                                <p>${stat.value} (${stat.percentage}%)</p>
                            </div>
                        `,
                            )
                            .join("")}
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Business Name</th>
                                <th>Email</th>
                                <th>Category</th>
                                <th>Search Visibility</th>
                                <th>Reviews Visibility</th>
                                <th>Working Hours</th>
                                <th>Working Days</th>
                                <th>Notifications</th>
                                <th>Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filteredVendors
                                .map(
                                    (vendor) => `
                                <tr>
                                    <td>${vendor.businessName}</td>
                                    <td>${vendor.email}</td>
                                    <td>${vendor.category}</td>
                                    <td class="${vendor.visibleInSearch ? "visible" : "hidden"}">
                                        ${vendor.visibleInSearch ? "Visible" : "Hidden"}
                                    </td>
                                    <td class="${vendor.visibleReviews ? "visible" : "hidden"}">
                                        ${vendor.visibleReviews ? "Visible" : "Hidden"}
                                    </td>
                                    <td>${formatWorkingHours(vendor.workingHoursStart, vendor.workingHoursEnd)}</td>
                                    <td>${formatWorkingDays(vendor.workingDays)}</td>
                                    <td>
                                        ${vendor.pushNotifications ? "Push " : ""}
                                        ${vendor.emailNotifications ? "Email" : ""}
                                        ${!vendor.pushNotifications && !vendor.emailNotifications ? "None" : ""}
                                    </td>
                                    <td class="rating">${vendor.rating} (${vendor.totalReviews} reviews)</td>
                                </tr>
                            `,
                                )
                                .join("")}
                        </tbody>
                    </table>
                </body>
            </html>
        `

        const printWindow = window.open("", "_blank")
        if (printWindow) {
            printWindow.document.write(printContent)
            printWindow.document.close()
            printWindow.print()
        }
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="space-y-8 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-orange-600 text-balance">Vendor Preferences Management</h1>
                    <p className="mt-2 text-orange-500 text-pretty">
                        Manage vendor settings, working hours, visibility preferences, and notification configurations.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {vendorStats.map((stat) => {
                        const Icon = stat.icon
                        return (
                            <Card key={stat.name} className="border-orange-200 bg-orange-50">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-orange-600">{stat.name}</CardTitle>
                                    <Icon className={`h-4 w-4 ${stat.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-orange-700">{stat.value}</div>
                                    <div className="flex items-center space-x-2 text-xs">
                                            <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700 border-orange-300">
                                                {stat.percentage}%
                                            </Badge>
                                            <span className="text-orange-500">of total vendors</span>
                                        </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Main Content */}
                <Card className="border-orange-200 bg-white">
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <CardTitle className="flex items-center gap-2 text-orange-700">
                                    <Store className="w-5 h-5 text-orange-600" />
                                    Vendor Preferences ({filteredVendors.length})
                                </CardTitle>
                                <CardDescription className="text-orange-500">View and manage preferences for all vendors in the system</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={handleExportToPDF} className="border-orange-300 text-orange-600 hover:bg-orange-50">
                                    <Download className="w-4 h-4 mr-2" />
                                    Export PDF
                                </Button>
                                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Refresh
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {/* Filters and Search */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search vendors by name, email, or category..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                    />
                                </div>
                            </div>
                            <Select value={filterType} onValueChange={setFilterType}>
                                <SelectTrigger className="w-full sm:w-56 border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                                    <Filter className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Filter by preference" />
                                </SelectTrigger>
                                <SelectContent className="border-orange-200">
                                    <SelectItem value="all">All Vendors</SelectItem>
                                    <SelectItem value="search-visible">Search Visible</SelectItem>
                                    <SelectItem value="search-hidden">Search Hidden</SelectItem>
                                    <SelectItem value="reviews-visible">Reviews Visible</SelectItem>
                                    <SelectItem value="reviews-hidden">Reviews Hidden</SelectItem>
                                    <SelectItem value="notifications-on">Notifications On</SelectItem>
                                    <SelectItem value="notifications-off">Notifications Off</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Bulk Actions */}
                        {selectedVendors.length > 0 && (
                            <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <span className="text-sm font-medium text-orange-700">
                                        {selectedVendors.length} vendor{selectedVendors.length > 1 ? "s" : ""} selected
                                    </span>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Button size="sm" variant="outline" onClick={() => handleBulkUpdate("visibleInSearch", true)} className="border-orange-300 text-orange-600 hover:bg-orange-50">
                                            Show in Search
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => handleBulkUpdate("visibleInSearch", false)} className="border-orange-300 text-orange-600 hover:bg-orange-50">
                                            Hide from Search
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => handleBulkUpdate("visibleReviews", true)} className="border-orange-300 text-orange-600 hover:bg-orange-50">
                                            Show Reviews
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => handleBulkUpdate("visibleReviews", false)} className="border-orange-300 text-orange-600 hover:bg-orange-50">
                                            Hide Reviews
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Vendors Table */}
                        <div className="rounded-md border border-orange-200">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-orange-200">
                                        <TableHead className="w-12">
                                            <Checkbox
                                                checked={selectedVendors.length === filteredVendors.length && filteredVendors.length > 0}
                                                onCheckedChange={handleSelectAll}
                                                className="border-orange-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                                            />
                                        </TableHead>
                                        <TableHead className="text-orange-700">Vendor</TableHead>
                                        <TableHead className="text-orange-700">Category</TableHead>
                                        <TableHead className="text-orange-700">Search Visibility</TableHead>
                                        <TableHead className="text-orange-700">Reviews</TableHead>
                                        <TableHead className="text-orange-700">Working Hours</TableHead>
                                        <TableHead className="text-orange-700">Notifications</TableHead>
                                        <TableHead className="text-orange-700">Rating</TableHead>
                                        <TableHead className="w-12"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredVendors.map((vendor) => (
                                        <TableRow key={vendor.id} className="border-orange-200 hover:bg-orange-50">
                                            <TableCell>
                                                <Checkbox
                                                    checked={selectedVendors.includes(vendor.id)}
                                                    onCheckedChange={() => handleSelectVendor(vendor.id)}
                                                    className="border-orange-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium text-orange-700">{vendor.businessName}</div>
                                                    <div className="text-sm text-orange-500">{vendor.email}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="border-orange-300 text-orange-600 bg-orange-50">{vendor.category}</Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {vendor.visibleInSearch ? (
                                                        <Eye className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <EyeOff className="w-4 h-4 text-red-600" />
                                                    )}
                                                    <Badge variant={vendor.visibleInSearch ? "default" : "secondary"} className={vendor.visibleInSearch ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-700 border-orange-300"}>
                                                        {vendor.visibleInSearch ? "Visible" : "Hidden"}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={vendor.visibleReviews ? "default" : "secondary"} className={vendor.visibleReviews ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-700 border-orange-300"}>
                                                    {vendor.visibleReviews ? "Visible" : "Hidden"}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="text-sm">
                                                    <div className="text-orange-700">{formatWorkingHours(vendor.workingHoursStart, vendor.workingHoursEnd)}</div>
                                                    <div className="text-orange-500">{formatWorkingDays(vendor.workingDays)}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    {vendor.pushNotifications && <Bell className="w-3 h-3 text-orange-600" />}
                                                    {vendor.emailNotifications && <Mail className="w-3 h-3 text-orange-600" />}
                                                    {!vendor.pushNotifications && !vendor.emailNotifications && (
                                                        <span className="text-xs text-orange-500">None</span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span className="text-sm font-medium text-orange-700">{vendor.rating}</span>
                                                    <span className="text-xs text-orange-500">({vendor.totalReviews})</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="hover:bg-orange-50">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end" className="border-orange-200">
                                                        <DropdownMenuLabel className="text-orange-700">Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem onClick={() => handleEditVendor(vendor)} className="hover:bg-orange-50">
                                                            <Edit className="w-4 h-4 mr-2" />
                                                            Edit Preferences
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator className="bg-orange-200" />
                                                        <DropdownMenuItem className="text-destructive hover:bg-orange-50">
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            Reset to Default
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Edit Vendor Dialog */}
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto border-orange-200 bg-white">
                        <DialogHeader>
                            <DialogTitle className="text-orange-700">Edit Vendor Preferences</DialogTitle>
                            <DialogDescription className="text-orange-500">Update preferences and settings for {editingVendor?.businessName}</DialogDescription>
                        </DialogHeader>
                        {editingVendor && (
                            <Tabs defaultValue="general" className="w-full">
                                <TabsList className="grid w-full grid-cols-3 bg-orange-50 border-orange-200">
                                    <TabsTrigger value="general" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">General</TabsTrigger>
                                    <TabsTrigger value="visibility" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Visibility</TabsTrigger>
                                    <TabsTrigger value="schedule" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">Schedule</TabsTrigger>
                                </TabsList>
                                <TabsContent value="general" className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-orange-700">Vendor Information</Label>
                                        <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                            <div className="font-medium text-orange-700">{editingVendor.businessName}</div>
                                            <div className="text-sm text-orange-500">{editingVendor.email}</div>
                                            <div className="text-sm text-orange-500">{editingVendor.category}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label className="text-sm font-medium text-orange-700">Push Notifications</Label>
                                                <div className="text-xs text-orange-500">Receive notifications on mobile devices</div>
                                            </div>
                                            <Switch
                                                checked={editingVendor.pushNotifications}
                                                onCheckedChange={(checked) => setEditingVendor({ ...editingVendor, pushNotifications: checked })}
                                                className="data-[state=checked]:bg-orange-600"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label className="text-sm font-medium text-orange-700">Email Notifications</Label>
                                                <div className="text-xs text-orange-500">Receive notifications via email</div>
                                            </div>
                                            <Switch
                                                checked={editingVendor.emailNotifications}
                                                onCheckedChange={(checked) => setEditingVendor({ ...editingVendor, emailNotifications: checked })}
                                                className="data-[state=checked]:bg-orange-600"
                                            />
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="visibility" className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label className="text-sm font-medium text-orange-700">Visible in Search Results</Label>
                                                <div className="text-xs text-orange-500">Allow customers to find this vendor in search</div>
                                            </div>
                                            <Switch
                                                checked={editingVendor.visibleInSearch}
                                                onCheckedChange={(checked) => setEditingVendor({ ...editingVendor, visibleInSearch: checked })}
                                                className="data-[state=checked]:bg-orange-600"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label className="text-sm font-medium text-orange-700">Show Reviews</Label>
                                                <div className="text-xs text-orange-500">Display customer reviews publicly</div>
                                            </div>
                                            <Switch
                                                checked={editingVendor.visibleReviews}
                                                onCheckedChange={(checked) => setEditingVendor({ ...editingVendor, visibleReviews: checked })}
                                                className="data-[state=checked]:bg-orange-600"
                                            />
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="schedule" className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-orange-700">Start Time</Label>
                                                <Input
                                                    type="time"
                                                    value={editingVendor.workingHoursStart}
                                                    onChange={(e) => setEditingVendor({ ...editingVendor, workingHoursStart: e.target.value })}
                                                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-orange-700">End Time</Label>
                                                <Input
                                                    type="time"
                                                    value={editingVendor.workingHoursEnd}
                                                    onChange={(e) => setEditingVendor({ ...editingVendor, workingHoursEnd: e.target.value })}
                                                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium text-orange-700">Working Days</Label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {workingDaysOptions.map((day) => (
                                                    <div key={day} className="flex items-center space-x-2">
                                                        <Checkbox
                                                            id={day}
                                                            checked={editingVendor.workingDays?.includes(day) || false}
                                                            onCheckedChange={() => handleWorkingDayToggle(day)}
                                                            className="border-orange-300 data-[state=checked]:bg-orange-600 data-[state=checked]:border-orange-600"
                                                        />
                                                        <Label htmlFor={day} className="text-sm text-orange-700">
                                                            {day}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        )}
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-orange-300 text-orange-600 hover:bg-orange-50">
                                Cancel
                            </Button>
                            <Button onClick={handleSaveVendor} className="bg-orange-600 hover:bg-orange-700 text-white">Save Changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}
