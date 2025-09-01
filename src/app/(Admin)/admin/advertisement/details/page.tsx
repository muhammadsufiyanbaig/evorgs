"use client"

import { useState } from "react"
import { useRouter } from "next/navigation" // Added useRouter import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  Zap,
  ExternalLink,
  Download,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdsManagement() {
  const router = useRouter() // Added router instance
  const [selectedAds, setSelectedAds] = useState<number[]>([])
  const [adFilter, setAdFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for ads
  const allAds = [
    {
      id: 1,
      title: "Premium Cloud Hosting",
      vendor: "CloudTech Inc",
      type: "featured",
      status: "active",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      budget: 2500,
      spent: 1850,
      impressions: 45000,
      clicks: 890,
      ctr: 1.98,
    },
    {
      id: 2,
      title: "AI Development Tools",
      vendor: "TechCorp Solutions",
      type: "sponsored",
      status: "pending",
      startDate: "2024-01-20",
      endDate: "2024-02-20",
      budget: 1500,
      spent: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
    },
    {
      id: 3,
      title: "External Banner Campaign",
      vendor: "Admin",
      type: "external",
      status: "active",
      startDate: "2024-01-10",
      endDate: "2024-03-10",
      budget: 5000,
      spent: 3200,
      impressions: 125000,
      clicks: 2500,
      ctr: 2.0,
    },
    {
      id: 4,
      title: "Marketing Automation Suite",
      vendor: "MarketPro Agency",
      type: "featured",
      status: "paused",
      startDate: "2024-01-05",
      endDate: "2024-02-05",
      budget: 3000,
      spent: 2100,
      impressions: 38000,
      clicks: 760,
      ctr: 2.0,
    },
  ]

  const filteredAds = allAds.filter((ad) => {
    const matchesSearch =
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.vendor.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = adFilter === "all" || ad.type === adFilter
    const matchesStatus = statusFilter === "all" || ad.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200">Active</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200">Pending</Badge>
      case "paused":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200">Paused</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100 border-red-200">Expired</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "featured":
        return <Star className="w-4 h-4 text-orange-500" />
      case "sponsored":
        return <Zap className="w-4 h-4 text-orange-600" />
      case "external":
        return <ExternalLink className="w-4 h-4 text-orange-400" />
      default:
        return null
    }
  }

  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for ads:`, selectedAds)
    setSelectedAds([])
  }

  const handleAdClick = (adId: number) => {
    router.push(`/admin/ads/${adId}`)
  }

  return (
    <div className="space-y-6 bg-white min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-orange-900">Ad Management</h2>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button variant="outline" className="w-full sm:w-auto bg-white border-orange-300 text-orange-700 hover:bg-orange-50">
            <Download className="w-4 h-4 mr-2" />
            Export Ads
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create External Ad
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto bg-white border-orange-200">
              <DialogHeader>
                <DialogTitle className="text-orange-900">Create External Ad</DialogTitle>
                <DialogDescription className="text-orange-700">Create a new external advertisement campaign</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ad-title" className="text-orange-800">Ad Title</Label>
                  <Input id="ad-title" placeholder="Enter ad title" className="border-orange-200 focus:border-orange-400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="advertiser" className="text-orange-800">Advertiser</Label>
                  <Input id="advertiser" placeholder="Company name" className="border-orange-200 focus:border-orange-400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-orange-800">Budget ($)</Label>
                    <Input id="budget" type="number" placeholder="5000" className="border-orange-200 focus:border-orange-400" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-orange-800">Duration (days)</Label>
                    <Input id="duration" type="number" placeholder="30" className="border-orange-200 focus:border-orange-400" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">Cancel</Button>
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">Create Ad</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <Card className="border-orange-200 bg-white">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-500 w-4 h-4" />
                <Input
                  placeholder="Search ads by title or vendor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-orange-200 focus:border-orange-400"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={adFilter} onValueChange={setAdFilter}>
                <SelectTrigger className="w-full sm:w-40 border-orange-200 focus:border-orange-400">
                  <SelectValue placeholder="Ad Type" />
                </SelectTrigger>
                <SelectContent className="bg-white border-orange-200">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="sponsored">Sponsored</SelectItem>
                  <SelectItem value="external">External</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 border-orange-200 focus:border-orange-400">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border-orange-200">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedAds.length > 0 && (
        <Card className="border-orange-200 bg-white">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-sm text-orange-700">
                {selectedAds.length} ad{selectedAds.length > 1 ? "s" : ""} selected
              </span>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => handleBulkAction("approve")}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve
                </Button>
                <Button size="sm" variant="destructive" onClick={() => handleBulkAction("reject")} className="bg-red-600 hover:bg-red-700">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleBulkAction("pause")} className="border-orange-300 text-orange-700 hover:bg-orange-50">
                  <Clock className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ads Table */}
      <Tabs defaultValue="all-ads" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-orange-100 border-orange-200">
          <TabsTrigger value="all-ads" className="text-xs sm:text-sm data-[state=active]:bg-orange-600 data-[state=active]:text-white text-orange-700">
            All Ads
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-xs sm:text-sm data-[state=active]:bg-orange-600 data-[state=active]:text-white text-orange-700">
            Pending ({allAds.filter((ad) => ad.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="active" className="text-xs sm:text-sm data-[state=active]:bg-orange-600 data-[state=active]:text-white text-orange-700">
            Active
          </TabsTrigger>
          <TabsTrigger value="external" className="text-xs sm:text-sm data-[state=active]:bg-orange-600 data-[state=active]:text-white text-orange-700">
            External
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-ads">
          <Card className="border-orange-200 bg-white">
            <CardHeader>
              <CardTitle className="text-orange-900">All Advertisements</CardTitle>
              <CardDescription className="text-orange-700">Manage all ad campaigns across the platform</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-orange-200">
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedAds.length === filteredAds.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedAds(filteredAds.map((ad) => ad.id))
                            } else {
                              setSelectedAds([])
                            }
                          }}
                          className="border-orange-300 data-[state=checked]:bg-orange-600"
                        />
                      </TableHead>
                      <TableHead className="text-orange-800">Ad Details</TableHead>
                      <TableHead className="hidden sm:table-cell text-orange-800">Type</TableHead>
                      <TableHead className="hidden md:table-cell text-orange-800">Status</TableHead>
                      <TableHead className="hidden lg:table-cell text-orange-800">Performance</TableHead>
                      <TableHead className="hidden xl:table-cell text-orange-800">Budget</TableHead>
                      <TableHead className="text-orange-800">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAds.map((ad) => (
                      <TableRow key={ad.id} className="border-orange-100 hover:bg-orange-50">
                        <TableCell>
                          <Checkbox
                            checked={selectedAds.includes(ad.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedAds([...selectedAds, ad.id])
                              } else {
                                setSelectedAds(selectedAds.filter((id) => id !== ad.id))
                              }
                            }}
                            className="border-orange-300 data-[state=checked]:bg-orange-600"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 cursor-pointer" onClick={() => handleAdClick(ad.id)}>
                            <div className="font-medium text-sm hover:text-orange-600 transition-colors text-orange-900">{ad.title}</div>
                            <div className="text-xs text-orange-600">{ad.vendor}</div>
                            <div className="text-xs text-orange-500 sm:hidden">
                              {ad.startDate} - {ad.endDate}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(ad.type)}
                            <span className="capitalize text-sm text-orange-800">{ad.type}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{getStatusBadge(ad.status)}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="space-y-1 text-xs text-orange-700">
                            <div>{ad.impressions.toLocaleString()} impressions</div>
                            <div>
                              {ad.clicks} clicks ({ad.ctr}% CTR)
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          <div className="space-y-1 text-xs text-orange-700">
                            <div>
                              ${ad.spent.toLocaleString()} / ${ad.budget.toLocaleString()}
                            </div>
                            <div className="text-orange-600">
                              {Math.round((ad.spent / ad.budget) * 100)}% spent
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="hover:bg-orange-100 text-orange-700">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white border-orange-200">
                              <DropdownMenuItem onClick={() => handleAdClick(ad.id)} className="text-orange-800 hover:bg-orange-50">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-orange-800 hover:bg-orange-50">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              {ad.status === "pending" && (
                                <DropdownMenuItem className="text-orange-800 hover:bg-orange-50">
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Approve
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
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
        </TabsContent>

        <TabsContent value="pending">
          <Card className="border-orange-200 bg-white">
            <CardHeader>
              <CardTitle className="text-orange-900">Pending Approval</CardTitle>
              <CardDescription className="text-orange-700">Review and approve vendor ad requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-orange-600">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No pending ads for approval</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card className="border-orange-200 bg-white">
            <CardHeader>
              <CardTitle className="text-orange-900">Active Campaigns</CardTitle>
              <CardDescription className="text-orange-700">Currently running advertisements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-orange-600">
                <p>Active ads will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external">
          <Card className="border-orange-200 bg-white">
            <CardHeader>
              <CardTitle className="text-orange-900">External Advertisements</CardTitle>
              <CardDescription className="text-orange-700">Third-party ads managed by admin</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-orange-600">
                <p>External ads will be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
