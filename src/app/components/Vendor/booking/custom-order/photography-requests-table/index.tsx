"use client"

import { useState } from "react"
import { MoreHorizontal, FileText, Check, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { PhotographyCustomOrder } from "@/utils/interfaces"
import { mockUsers } from "@/utils/data"

interface PhotographyRequestsTableProps {
  requests: PhotographyCustomOrder[]
}

export function PhotographyRequestsTable({ requests }: PhotographyRequestsTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<PhotographyCustomOrder | null>(null)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [quotePrice, setQuotePrice] = useState("")

  const handleOpenQuoteModal = (request: PhotographyCustomOrder) => {
    setSelectedRequest(request)
    setQuotePrice(request.price > 0 ? String(request.price) : "")
    setIsQuoteModalOpen(true)
  }

  const handleQuoteSubmit = () => {
    if (!selectedRequest) return
    console.log(`Quoting ${quotePrice} for request ${selectedRequest.id}`)
    alert(`Quote of $${quotePrice} submitted for request ${selectedRequest.id}`)
    setIsQuoteModalOpen(false)
  }

  const getStatusBadge = (status: PhotographyCustomOrder["status"]) => {
    const map = {
      Requested: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Quoted: "bg-blue-100 text-blue-800 border-blue-200",
      Accepted: "bg-green-100 text-green-800 border-green-200",
      Rejected: "bg-red-100 text-red-800 border-red-200",
    }
    return map[status]
  }

  const getUserById = (userId: string) => mockUsers.find((u) => u.id === userId)

  return (
    <>
      <Card className="border-orange-200 bg-white">
        <CardHeader>
          <CardTitle>Custom Photography Orders</CardTitle>
          <CardDescription>Requests for custom photography services from users.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Event Date</TableHead>
                  <TableHead>Duration (hrs)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => {
                  const user = getUserById(request.userId)
                  return (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="font-medium">{user?.name || "Unknown User"}</div>
                        <div className="text-sm text-gray-500">{user?.email}</div>
                      </TableCell>
                      <TableCell>{new Date(request.eventDate).toLocaleDateString()}</TableCell>
                      <TableCell>{request.eventDuration}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusBadge(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleOpenQuoteModal(request)}>
                              <FileText className="mr-2 h-4 w-4" /> View & Quote
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-green-600">
                              <Check className="mr-2 h-4 w-4" /> Mark as Accepted
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <X className="mr-2 h-4 w-4" /> Mark as Rejected
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedRequest && (
        <Dialog open={isQuoteModalOpen} onOpenChange={setIsQuoteModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Photography Request Details</DialogTitle>
              <p className="text-sm text-muted-foreground">From: {getUserById(selectedRequest.userId)?.name}</p>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <Label className="font-semibold">Order Details</Label>
                <p className="text-sm p-3 bg-gray-50 rounded-md border mt-1">{selectedRequest.orderDetails}</p>
              </div>
              <div>
                <Label className="font-semibold">Event Date</Label>
                <p className="text-sm">{new Date(selectedRequest.eventDate).toLocaleDateString()}</p>
              </div>
              <div>
                <Label className="font-semibold">Event Duration</Label>
                <p className="text-sm">{selectedRequest.eventDuration} hours</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote-price" className="font-semibold">
                  Quote Price ($)
                </Label>
                <Input
                  id="quote-price"
                  type="number"
                  placeholder="Enter your quoted price"
                  value={quotePrice}
                  onChange={(e) => setQuotePrice(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsQuoteModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleQuoteSubmit} className="bg-orange-600 hover:bg-orange-700 text-white">
                {selectedRequest.status === "Requested" ? "Submit Quote" : "Update Quote"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
