"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  SearchIcon,
  FilterIcon,
  MoreHorizontalIcon,
  ArrowUpDownIcon,
  CheckCircleIcon,
  ClockIcon,
  AlertTriangleIcon,
  XCircleIcon,
  RefreshCwIcon,
  DownloadIcon,
  PlusIcon,
} from "lucide-react"
import type { SupportTicket, TicketStatus, Priority, TicketType } from "@/utils/interfaces"

// Mock data for demonstration
const mockTickets: SupportTicket[] = [
  {
    id: "TK-001",
    subject: "Payment processing issue with credit card",
    description: "Customer unable to complete payment using Visa card ending in 1234",
    ticketType: "Payment",
    priority: "High",
    status: "Open",
    attachments: [],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    creator: {
      id: "user-1",
      firstName: "John",
      lastName: "Doe",
      name: "John Doe",
      email: "john.doe@example.com",
      isActive: true,
    },
  },
  {
    id: "TK-002",
    subject: "Account login problems after password reset",
    description: "User cannot log in after resetting password multiple times",
    ticketType: "Account",
    priority: "Medium",
    status: "InProgress",
    attachments: ["screenshot.png"],
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T11:30:00Z",
    creator: {
      id: "user-2",
      firstName: "Jane",
      lastName: "Smith",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      isActive: true,
    },
  },
  {
    id: "TK-003",
    subject: "Feature request: Dark mode support",
    description: "Request to add dark mode theme option to the application",
    ticketType: "Feature",
    priority: "Low",
    status: "Open",
    attachments: [],
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
    creator: {
      id: "user-3",
      firstName: "Mike",
      lastName: "Johnson",
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      isActive: true,
    },
  },
  {
    id: "TK-004",
    subject: "Critical booking system failure",
    description: "Booking system is completely down, customers cannot make reservations",
    ticketType: "Technical",
    priority: "Urgent",
    status: "InProgress",
    attachments: ["error-log.txt", "system-status.png"],
    createdAt: "2024-01-15T07:30:00Z",
    updatedAt: "2024-01-15T12:00:00Z",
    creator: {
      id: "vendor-1",
      vendorEmail: "support@techcorp.com",
      email: "support@techcorp.com",
      isActive: true,
      vendorName: "TechCorp Solutions",
      businessName: "TechCorp Solutions",
      vendorType: "Technology Partner",
      businessType: "Technology Partner",
      isVerified: true,
    },
  },
  {
    id: "TK-005",
    subject: "Refund request for cancelled booking",
    description: "Customer requesting refund for booking cancelled due to weather",
    ticketType: "Booking",
    priority: "Medium",
    status: "Open",
    attachments: [],
    createdAt: "2024-01-13T16:45:00Z",
    updatedAt: "2024-01-13T16:45:00Z",
    creator: {
      id: "user-4",
      firstName: "Sarah",
      lastName: "Wilson",
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      isActive: true,
    },
  },
]

const priorityColors = {
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  Urgent: "bg-red-100 text-red-800 border-red-200",
}

const statusColors = {
  Open: "bg-blue-100 text-blue-800 border-blue-200",
  InProgress: "bg-purple-100 text-purple-800 border-purple-200",
  Resolved: "bg-green-100 text-green-800 border-green-200",
  Closed: "bg-gray-100 text-gray-800 border-gray-200",
  Reopened: "bg-orange-100 text-orange-800 border-orange-200",
}

const statusIcons = {
  Open: ClockIcon,
  InProgress: RefreshCwIcon,
  Resolved: CheckCircleIcon,
  Closed: XCircleIcon,
  Reopened: AlertTriangleIcon,
}

export default function TicketsOverview() {
  const [tickets] = useState<SupportTicket[]>(mockTickets)
  const [selectedTickets, setSelectedTickets] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<TicketStatus | "all">("all")
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all")
  const [typeFilter, setTypeFilter] = useState<TicketType | "all">("all")
  const [activeTab, setActiveTab] = useState("all")

  const getFilteredTickets = (tabFilter: string) => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ticket.creator &&
          "firstName" in ticket.creator &&
          `${ticket.creator.firstName} ${ticket.creator.lastName}`.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ticket.creator &&
          "vendorName" in ticket.creator &&
          ticket.creator.vendorName.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
      const matchesType = typeFilter === "all" || ticket.ticketType === typeFilter

      let matchesTabStatus = true
      if (tabFilter === "urgent") {
        matchesTabStatus = ticket.priority === "Urgent"
      } else if (tabFilter === "in-progress") {
        matchesTabStatus = ticket.status === "InProgress"
      } else if (tabFilter === "resolved") {
        matchesTabStatus = ticket.status === "Resolved"
      }

      const matchesStatus = statusFilter === "all" || ticket.status === statusFilter

      return matchesSearch && matchesStatus && matchesPriority && matchesType && matchesTabStatus
    })
  }

  const filteredTickets = getFilteredTickets(activeTab)

  const getAllTicketsCount = () => tickets.length
  const getUrgentTicketsCount = () => tickets.filter((t) => t.priority === "Urgent").length
  const getInProgressTicketsCount = () => tickets.filter((t) => t.status === "InProgress").length
  const getResolvedTicketsCount = () => tickets.filter((t) => t.status === "Resolved").length

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTickets(filteredTickets.map((ticket) => ticket.id))
    } else {
      setSelectedTickets([])
    }
  }

  const handleSelectTicket = (ticketId: string, checked: boolean) => {
    if (checked) {
      setSelectedTickets([...selectedTickets, ticketId])
    } else {
      setSelectedTickets(selectedTickets.filter((id) => id !== ticketId))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getCreatorName = (creator: any) => {
    if (!creator) return "Unknown"
    if ("firstName" in creator) {
      return `${creator.firstName} ${creator.lastName}`
    }
    if ("vendorName" in creator) {
      return creator.vendorName
    }
    return "Unknown"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Support Tickets</h1>
          <p className="text-muted-foreground">Manage and track all customer support requests</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <PlusIcon className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Tabs for status-based filtering */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            All Tickets
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              {getAllTicketsCount()}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="urgent" className="flex items-center gap-2">
            <AlertTriangleIcon className="h-4 w-4" />
            Urgent
            <Badge variant="secondary" className="bg-red-100 text-red-800">
              {getUrgentTicketsCount()}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="in-progress" className="flex items-center gap-2">
            <RefreshCwIcon className="h-4 w-4" />
            In Progress
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {getInProgressTicketsCount()}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="resolved" className="flex items-center gap-2">
            <CheckCircleIcon className="h-4 w-4" />
            Resolved
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {getResolvedTicketsCount()}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
              <CardDescription>Filter and search through all support tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search tickets by ID, subject, or creator..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as TicketStatus | "all")}>
                  <SelectTrigger className="w-full md:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="InProgress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Reopened">Reopened</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as Priority | "all")}>
                  <SelectTrigger className="w-full md:w-[140px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as TicketType | "all")}>
                  <SelectTrigger className="w-full md:w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Account">Account</SelectItem>
                    <SelectItem value="Booking">Booking</SelectItem>
                    <SelectItem value="Payment">Payment</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Feature">Feature</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bulk Actions */}
          {selectedTickets.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {selectedTickets.length} ticket{selectedTickets.length !== 1 ? "s" : ""} selected
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Update Priority
                    </Button>
                    <Button variant="outline" size="sm">
                      Update Status
                    </Button>
                    <Button variant="outline" size="sm">
                      Close Selected
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tickets Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>All Tickets ({filteredTickets.length})</span>
                <Button variant="outline" size="sm">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedTickets.length === filteredTickets.length && filteredTickets.length > 0}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>
                        <Button variant="ghost" size="sm" className="h-auto p-0 font-semibold">
                          Ticket ID
                          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Creator</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <Button variant="ghost" size="sm" className="h-auto p-0 font-semibold">
                          Created
                          <ArrowUpDownIcon className="ml-2 h-4 w-4" />
                        </Button>
                      </TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => {
                      const StatusIcon = statusIcons[ticket.status]
                      return (
                        <TableRow key={ticket.id} className="hover:bg-muted/50">
                          <TableCell>
                            <Checkbox
                              checked={selectedTickets.includes(ticket.id)}
                              onCheckedChange={(checked) => handleSelectTicket(ticket.id, checked as boolean)}
                            />
                          </TableCell>
                          <TableCell className="font-medium">{ticket.id}</TableCell>
                          <TableCell>
                            <div className="max-w-[300px]">
                              <p className="font-medium truncate">{ticket.subject}</p>
                              <p className="text-sm text-muted-foreground truncate">{ticket.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p className="font-medium">{getCreatorName(ticket.creator)}</p>
                              <p className="text-muted-foreground">
                                {ticket.creator && "email" in ticket.creator
                                  ? ticket.creator.email
                                  : ticket.creator && "vendorEmail" in ticket.creator
                                    ? (ticket.creator as any).vendorEmail
                                    : ""}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{ticket.ticketType}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={priorityColors[ticket.priority]}>{ticket.priority}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[ticket.status]}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {ticket.status === "InProgress" ? "In Progress" : ticket.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(ticket.createdAt)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Add Response</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Update Priority</DropdownMenuItem>
                                <DropdownMenuItem>Change Status</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Close Ticket</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
              {filteredTickets.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No tickets found matching your criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Individual tab content for each filter type */}
        <TabsContent value="urgent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangleIcon className="h-5 w-5" />
                Urgent Tickets ({getFilteredTickets("urgent").length})
              </CardTitle>
              <CardDescription>High priority tickets requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Creator</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredTickets("urgent").map((ticket) => {
                      const StatusIcon = statusIcons[ticket.status]
                      return (
                        <TableRow key={ticket.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{ticket.id}</TableCell>
                          <TableCell>
                            <div className="max-w-[300px]">
                              <p className="font-medium truncate">{ticket.subject}</p>
                              <p className="text-sm text-muted-foreground truncate">{ticket.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p className="font-medium">{getCreatorName(ticket.creator)}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={statusColors[ticket.status]}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {ticket.status === "InProgress" ? "In Progress" : ticket.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDate(ticket.createdAt)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Add Response</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Change Status</DropdownMenuItem>
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
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-600">
                <RefreshCwIcon className="h-5 w-5" />
                In Progress Tickets ({getFilteredTickets("in-progress").length})
              </CardTitle>
              <CardDescription>Tickets currently being worked on</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Creator</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredTickets("in-progress").map((ticket) => (
                      <TableRow key={ticket.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          <div className="max-w-[300px]">
                            <p className="font-medium truncate">{ticket.subject}</p>
                            <p className="text-sm text-muted-foreground truncate">{ticket.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p className="font-medium">{getCreatorName(ticket.creator)}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={priorityColors[ticket.priority]}>{ticket.priority}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{formatDate(ticket.updatedAt)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontalIcon className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Add Response</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Mark Resolved</DropdownMenuItem>
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

        <TabsContent value="resolved" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircleIcon className="h-5 w-5" />
                Resolved Tickets ({getFilteredTickets("resolved").length})
              </CardTitle>
              <CardDescription>Successfully resolved support tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Creator</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Resolved</TableHead>
                      <TableHead className="w-12"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredTickets("resolved").map((ticket) => (
                      <TableRow key={ticket.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>
                          <div className="max-w-[300px]">
                            <p className="font-medium truncate">{ticket.subject}</p>
                            <p className="text-sm text-muted-foreground truncate">{ticket.description}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p className="font-medium">{getCreatorName(ticket.creator)}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={priorityColors[ticket.priority]}>{ticket.priority}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {ticket.resolvedAt ? formatDate(ticket.resolvedAt) : formatDate(ticket.updatedAt)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontalIcon className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>Reopen Ticket</DropdownMenuItem>
                              <DropdownMenuItem>Close Ticket</DropdownMenuItem>
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
    </div>
  )
}
