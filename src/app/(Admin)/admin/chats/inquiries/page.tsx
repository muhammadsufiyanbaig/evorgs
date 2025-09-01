"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { MoreHorizontal, Eye, Send, CheckCircle, Copy, User, Megaphone, Calendar, DollarSign } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const mockInquiries = [
  {
    id: "1",
    user: "Alice Brown",
    vendor: "Premium Catering",
    service: "Wedding Catering",
    status: "Pending",
    createdAt: "2024-01-15 11:00",
    details: {
      eventDate: "2024-06-15",
      guestCount: 150,
      budget: "$5000-7000",
      requirements: "Vegetarian options required, outdoor setup",
    },
  },
  {
    id: "2",
    user: "Bob Wilson",
    vendor: "Photo Studio Pro",
    service: "Event Photography",
    status: "In Progress",
    createdAt: "2024-01-15 10:30",
    details: {
      eventDate: "2024-02-20",
      duration: "4 hours",
      budget: "$800-1200",
      requirements: "Corporate headshots and event coverage",
    },
  },
  {
    id: "3",
    user: "Carol Davis",
    vendor: "Grand Venues",
    service: "Wedding Venue",
    status: "Closed",
    createdAt: "2024-01-15 09:45",
    details: {
      eventDate: "2024-08-10",
      guestCount: 200,
      budget: "$3000-5000",
      requirements: "Garden setting with indoor backup option",
    },
  },
]

const mockAdInquiries = [
  {
    id: "ad-1",
    advertiser: "Golden Events Co.",
    adTitle: "Premium Wedding Planning Services",
    campaign: "Summer Wedding Campaign",
    status: "Active",
    budget: "$2000",
    createdAt: "2024-01-14 14:30",
    details: {
      duration: "30 days",
      targetAudience: "Engaged couples, 25-40 years",
      adType: "Banner + Featured Listing",
      clicks: 1250,
      impressions: 15000,
      description: "Promote premium wedding planning services with exclusive summer packages",
    },
  },
  {
    id: "ad-2",
    advertiser: "Bloom Florists",
    adTitle: "Valentine's Day Special Arrangements",
    campaign: "Valentine's 2024",
    status: "Pending Review",
    budget: "$800",
    createdAt: "2024-01-13 16:45",
    details: {
      duration: "14 days",
      targetAudience: "Couples, 20-50 years",
      adType: "Sponsored Post",
      clicks: 0,
      impressions: 0,
      description: "Special Valentine's Day flower arrangements and romantic packages",
    },
  },
  {
    id: "ad-3",
    advertiser: "Luxury Venues Ltd",
    adTitle: "Corporate Event Spaces",
    campaign: "Business Events Q1",
    status: "Completed",
    budget: "$1500",
    createdAt: "2024-01-10 10:15",
    details: {
      duration: "45 days",
      targetAudience: "Corporate event planners",
      adType: "Premium Listing",
      clicks: 890,
      impressions: 8500,
      description: "Premium corporate venue spaces for conferences and business events",
    },
  },
]

export default function InquiriesPage() {
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null)
  const [selectedAdInquiry, setSelectedAdInquiry] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Pending: "bg-orange-100 text-orange-800 border-orange-200",
      "In Progress": "bg-orange-50 text-orange-600 border-orange-300",
      Closed: "bg-gray-100 text-gray-800 border-gray-200",
      Active: "bg-green-100 text-green-800 border-green-200",
      "Pending Review": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Completed: "bg-blue-100 text-blue-800 border-blue-200",
    }
    return (
      <Badge 
        className={`${variants[status] || "bg-gray-100 text-gray-800 border-gray-200"} border text-xs`}
        variant="outline"
      >
        {status}
      </Badge>
    )
  }

  const openInquiryDialog = (inquiry: any) => {
    setSelectedInquiry(inquiry)
  }

  const openAdInquiryDialog = (inquiry: any) => {
    setSelectedAdInquiry(inquiry)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-25 to-white">
      <div className="space-y-4 sm:space-y-6 p-3 sm:p-6">
        <div className="flex flex-col gap-3 sm:gap-4">
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-orange-900 mb-1 sm:mb-2">
              Service Inquiries
            </h2>
            <p className="text-sm sm:text-base text-orange-700">
              Track and manage customer service requests
            </p>
          </div>
        </div>

        <Tabs defaultValue="service" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white border-2 border-orange-200 h-auto">
            <TabsTrigger 
              value="service" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700 py-2 px-3 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Service Inquiries</span>
              <span className="sm:hidden">Services</span>
            </TabsTrigger>
            <TabsTrigger 
              value="ad" 
              className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-700 py-2 px-3 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">Ad Inquiries</span>
              <span className="sm:hidden">Ads</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="service" className="space-y-4 mt-4">
            <Card className="border-orange-200 shadow-lg bg-white">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-orange-50">
                      <TableRow className="border-orange-200">
                        <TableHead className="text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          User
                        </TableHead>
                        <TableHead className="text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          Vendor
                        </TableHead>
                        <TableHead className="hidden lg:table-cell text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          Service
                        </TableHead>
                        <TableHead className="text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          Status
                        </TableHead>
                        <TableHead className="hidden xl:table-cell text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          Created
                        </TableHead>
                        <TableHead className="text-right text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockInquiries.map((inquiry) => (
                        <TableRow key={inquiry.id} className="border-orange-100 hover:bg-orange-25">
                          <TableCell className="font-medium text-orange-900 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">
                            <div className="truncate max-w-[100px] sm:max-w-none">
                              {inquiry.user}
                            </div>
                          </TableCell>
                          <TableCell className="text-orange-800 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">
                            <div className="truncate max-w-[120px] sm:max-w-none">
                              {inquiry.vendor}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-orange-700 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">
                            {inquiry.service}
                          </TableCell>
                          <TableCell className="px-2 sm:px-4 py-2 sm:py-4">
                            {getStatusBadge(inquiry.status)}
                          </TableCell>
                          <TableCell className="hidden xl:table-cell text-xs text-orange-600 px-2 sm:px-4 py-2 sm:py-4">
                            <div className="whitespace-nowrap">
                              {inquiry.createdAt}
                            </div>
                          </TableCell>
                          <TableCell className="text-right px-2 sm:px-4 py-2 sm:py-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="hover:bg-orange-100 text-orange-700 h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="border-orange-200">
                                <DropdownMenuItem 
                                  onClick={() => openInquiryDialog(inquiry)}
                                  className="hover:bg-orange-50 text-orange-700 text-sm"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-orange-50 text-orange-700 text-sm">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Mark Resolved
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

          <TabsContent value="ad" className="space-y-4 mt-4">
            <Card className="border-orange-200 shadow-lg bg-white">
              <CardHeader className="bg-orange-50 border-b border-orange-200 p-3 sm:p-6">
                <CardTitle className="text-orange-900 flex items-center gap-2 text-lg sm:text-xl">
                  <Megaphone className="h-4 w-4 sm:h-5 sm:w-5" />
                  Advertisement Inquiries
                </CardTitle>
                <CardDescription className="text-orange-700 text-sm sm:text-base">
                  Manage inquiries and campaigns for service advertisements
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-orange-50">
                      <TableRow className="border-orange-200">
                        <TableHead className="text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          Advertiser
                        </TableHead>
                        <TableHead className="text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          Ad Title
                        </TableHead>
                        <TableHead className="hidden lg:table-cell text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          Campaign
                        </TableHead>
                        <TableHead className="text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          Status
                        </TableHead>
                        <TableHead className="hidden xl:table-cell text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          Budget
                        </TableHead>
                        <TableHead className="hidden 2xl:table-cell text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          Created
                        </TableHead>
                        <TableHead className="text-right text-orange-900 font-semibold text-xs sm:text-sm px-2 sm:px-4">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAdInquiries.map((inquiry) => (
                        <TableRow key={inquiry.id} className="border-orange-100 hover:bg-orange-25">
                          <TableCell className="font-medium text-orange-900 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">
                            <div className="truncate max-w-[100px] sm:max-w-none">
                              {inquiry.advertiser}
                            </div>
                          </TableCell>
                          <TableCell className="text-orange-800 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">
                            <div className="truncate max-w-[120px] sm:max-w-none">
                              {inquiry.adTitle}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-orange-700 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">
                            <div className="truncate">
                              {inquiry.campaign}
                            </div>
                          </TableCell>
                          <TableCell className="px-2 sm:px-4 py-2 sm:py-4">
                            {getStatusBadge(inquiry.status)}
                          </TableCell>
                          <TableCell className="hidden xl:table-cell text-orange-700 font-medium text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">
                            {inquiry.budget}
                          </TableCell>
                          <TableCell className="hidden 2xl:table-cell text-xs text-orange-600 px-2 sm:px-4 py-2 sm:py-4">
                            <div className="whitespace-nowrap">
                              {inquiry.createdAt}
                            </div>
                          </TableCell>
                          <TableCell className="text-right px-2 sm:px-4 py-2 sm:py-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="hover:bg-orange-100 text-orange-700 h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="border-orange-200">
                                <DropdownMenuItem 
                                  onClick={() => openAdInquiryDialog(inquiry)}
                                  className="hover:bg-orange-50 text-orange-700 text-sm"
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-orange-50 text-orange-700 text-sm">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve Ad
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
        </Tabs>

        {/* Service Inquiry Dialog */}
        <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh] border-orange-200 bg-white mx-4">
            <DialogHeader className="border-b border-orange-200 pb-4">
              <DialogTitle className="flex items-center gap-2 text-orange-900 text-lg sm:text-xl">
                <User className="h-4 w-4 sm:h-5 sm:w-5" />
                Service Inquiry Details
              </DialogTitle>
              <DialogDescription className="text-orange-700 text-sm sm:text-base">
                View detailed information about this service inquiry
              </DialogDescription>
            </DialogHeader>

            {selectedInquiry && (
              <ScrollArea className="max-h-[60vh] sm:max-h-[60vh]">
                <div className="space-y-4 pr-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div>
                      <p className="text-sm font-medium text-orange-900">User</p>
                      <p className="text-sm text-orange-700 break-words">{selectedInquiry.user}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-900">Vendor</p>
                      <p className="text-sm text-orange-700 break-words">{selectedInquiry.vendor}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-900">Service</p>
                      <p className="text-sm text-orange-700 break-words">{selectedInquiry.service}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-900">Status</p>
                      <div className="mt-1">
                        {getStatusBadge(selectedInquiry.status)}
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-orange-200" />

                  <div className="space-y-3">
                    <h4 className="font-medium text-orange-900 text-base sm:text-lg">Inquiry Details</h4>
                    {selectedInquiry.details && (
                      <div className="grid grid-cols-1 gap-3">
                        <div className="p-3 rounded-lg bg-orange-25 border border-orange-100">
                          <p className="text-sm font-medium text-orange-900">Event Date</p>
                          <p className="text-sm text-orange-700">{selectedInquiry.details.eventDate}</p>
                        </div>
                        {selectedInquiry.details.guestCount && (
                          <div className="p-3 rounded-lg bg-orange-25 border border-orange-100">
                            <p className="text-sm font-medium text-orange-900">Guest Count</p>
                            <p className="text-sm text-orange-700">{selectedInquiry.details.guestCount}</p>
                          </div>
                        )}
                        {selectedInquiry.details.duration && (
                          <div className="p-3 rounded-lg bg-orange-25 border border-orange-100">
                            <p className="text-sm font-medium text-orange-900">Duration</p>
                            <p className="text-sm text-orange-700">{selectedInquiry.details.duration}</p>
                          </div>
                        )}
                        <div className="p-3 rounded-lg bg-orange-25 border border-orange-100">
                          <p className="text-sm font-medium text-orange-900">Budget</p>
                          <p className="text-sm text-orange-700">{selectedInquiry.details.budget}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-orange-25 border border-orange-100">
                          <p className="text-sm font-medium text-orange-900">Requirements</p>
                          <p className="text-sm text-orange-700 break-words">{selectedInquiry.details.requirements}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 w-full sm:w-auto"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Mark Resolved
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 w-full sm:w-auto"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Inquiry ID
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>

        {/* Ad Inquiry Dialog */}
        <Dialog open={!!selectedAdInquiry} onOpenChange={() => setSelectedAdInquiry(null)}>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] sm:max-h-[80vh] border-orange-200 bg-white mx-4">
            <DialogHeader className="border-b border-orange-200 pb-4">
              <DialogTitle className="flex items-center gap-2 text-orange-900 text-lg sm:text-xl">
                <Megaphone className="h-4 w-4 sm:h-5 sm:w-5" />
                Advertisement Inquiry Details
              </DialogTitle>
              <DialogDescription className="text-orange-700 text-sm sm:text-base">
                View detailed information about this advertisement campaign
              </DialogDescription>
            </DialogHeader>

            {selectedAdInquiry && (
              <ScrollArea className="max-h-[60vh] sm:max-h-[60vh]">
                <div className="space-y-4 pr-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div>
                      <p className="text-sm font-medium text-orange-900">Advertiser</p>
                      <p className="text-sm text-orange-700 break-words">{selectedAdInquiry.advertiser}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-900">Campaign</p>
                      <p className="text-sm text-orange-700 break-words">{selectedAdInquiry.campaign}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-900">Ad Title</p>
                      <p className="text-sm text-orange-700 break-words">{selectedAdInquiry.adTitle}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-orange-900">Status</p>
                      <div className="mt-1">
                        {getStatusBadge(selectedAdInquiry.status)}
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-orange-200" />

                  <div className="space-y-3">
                    <h4 className="font-medium text-orange-900 text-base sm:text-lg">Campaign Details</h4>
                    {selectedAdInquiry.details && (
                      <div className="grid grid-cols-1 gap-3">
                        <div className="p-3 rounded-lg bg-orange-25 border border-orange-100">
                          <p className="text-sm font-medium text-orange-900">Description</p>
                          <p className="text-sm text-orange-700 break-words">{selectedAdInquiry.details.description}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-orange-25 border border-orange-100">
                            <p className="text-sm font-medium text-orange-900">Duration</p>
                            <p className="text-sm text-orange-700">{selectedAdInquiry.details.duration}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-orange-25 border border-orange-100">
                            <p className="text-sm font-medium text-orange-900">Budget</p>
                            <p className="text-sm text-orange-700">{selectedAdInquiry.budget}</p>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-orange-25 border border-orange-100">
                          <p className="text-sm font-medium text-orange-900">Target Audience</p>
                          <p className="text-sm text-orange-700 break-words">{selectedAdInquiry.details.targetAudience}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-orange-25 border border-orange-100">
                          <p className="text-sm font-medium text-orange-900">Ad Type</p>
                          <p className="text-sm text-orange-700">{selectedAdInquiry.details.adType}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-orange-25 border border-orange-100">
                            <p className="text-sm font-medium text-orange-900 flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              Impressions
                            </p>
                            <p className="text-sm text-orange-700">{selectedAdInquiry.details.impressions.toLocaleString()}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-orange-25 border border-orange-100">
                            <p className="text-sm font-medium text-orange-900">Clicks</p>
                            <p className="text-sm text-orange-700">{selectedAdInquiry.details.clicks.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 w-full sm:w-auto"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Ad
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 w-full sm:w-auto"
                    >
                      <DollarSign className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 w-full sm:w-auto"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Ad ID
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
