"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Eye, Check, X } from "lucide-react"

// Mock data for visit requests
const mockVisitRequests = [
  {
    id: "1",
    user: { firstName: "John", lastName: "Doe", email: "john@example.com" },
    vendor: { businessName: "Elite Photography", email: "contact@elitephoto.com" },
    service: { packageName: "Wedding Premium Package", name: "Photography" },
    serviceType: "PhotographyPackage",
    eventDate: "2024-03-15",
    eventTime: "10:00 AM",
    visitStatus: "pending",
  },
  {
    id: "2",
    user: { firstName: "Sarah", lastName: "Johnson", email: "sarah@example.com" },
    vendor: { businessName: "Garden Venues", email: "info@gardenvenues.com" },
    service: { packageName: "Outdoor Wedding Package", name: "Venue" },
    serviceType: "VenuePackage",
    eventDate: "2024-04-20",
    eventTime: "2:00 PM",
    visitStatus: "scheduled",
  },
]

export default function VisitsPage() {
  const [visitSearchTerm, setVisitSearchTerm] = useState("")
  const [visitStatusFilter, setVisitStatusFilter] = useState("all")

  const getVisitStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-100"
      case "rejected":
        return "bg-red-100 text-red-800 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  const handleVisitAction = (id: string, action: string) => {
    console.log(`${action} visit request ${id}`)
  }

  const filteredVisitRequests = mockVisitRequests.filter((request) => {
    const matchesSearch =
      request.user.firstName.toLowerCase().includes(visitSearchTerm.toLowerCase()) ||
      request.user.lastName.toLowerCase().includes(visitSearchTerm.toLowerCase()) ||
      request.vendor.businessName.toLowerCase().includes(visitSearchTerm.toLowerCase())

    const matchesStatus = visitStatusFilter === "all" || request.visitStatus === visitStatusFilter

    return matchesSearch && matchesStatus
  })

  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visit Requests</h1>
          <p className="text-gray-600 mt-2">Handle vendor visit requests and approvals</p>
        </div>

        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-gray-900">All Visit Requests</CardTitle>
            <CardDescription>Manage vendor visit requests and scheduling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search visit requests..."
                    value={visitSearchTerm}
                    onChange={(e) => setVisitSearchTerm(e.target.value)}
                    className="pl-10 border-orange-200 focus:border-orange-500"
                  />
                </div>
                <Select value={visitStatusFilter} onValueChange={setVisitStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48 border-orange-200">
                    <SelectValue placeholder="Filter by visit status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Visit Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="border border-orange-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-orange-50">
                    <TableRow>
                      <TableHead className="text-gray-900 font-semibold">Customer</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Vendor</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Service</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Event Date</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Visit Status</TableHead>
                      <TableHead className="text-gray-900 font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVisitRequests.map((request) => (
                      <TableRow key={request.id} className="hover:bg-orange-25">
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {request.user.firstName} {request.user.lastName}
                            </p>
                            <p className="text-sm text-gray-500">{request.user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{request.vendor.businessName}</p>
                            <p className="text-sm text-gray-500">{request.vendor.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">
                              {request.service.packageName || request.service.name}
                            </p>
                            <p className="text-sm text-gray-500 capitalize">
                              {request.serviceType.replace("Package", "")}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-gray-900">{request.eventDate}</p>
                            <p className="text-sm text-gray-500">{request.eventTime}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getVisitStatusColor(request.visitStatus)}>{request.visitStatus}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Link href={`/visits/${request.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-orange-200 hover:bg-orange-50 bg-transparent"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </Link>
                            {request.visitStatus === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                  onClick={() => handleVisitAction(request.id, "approve")}
                                >
                                  <Check className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleVisitAction(request.id, "reject")}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
