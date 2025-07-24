"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  MessageCircle,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Paperclip,
  Calendar,
  User,
} from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual API calls
const mockTickets = [
  {
    id: "TICKET-ABC123",
    subject: "Unable to access my account",
    description: "I'm having trouble logging into my account. The password reset isn't working.",
    ticketType: "Account",
    priority: "High",
    status: "In Progress",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    resolvedAt: null,
    closedAt: null,
    attachments: ["screenshot.png"],
    responseCount: 3,
    lastResponse: "2024-01-16T14:20:00Z",
  },
  {
    id: "TICKET-DEF456",
    subject: "Payment not processed",
    description: "My payment was charged but the booking wasn't confirmed.",
    ticketType: "Payment",
    priority: "Urgent",
    status: "Open",
    createdAt: "2024-01-14T09:15:00Z",
    updatedAt: "2024-01-14T09:15:00Z",
    resolvedAt: null,
    closedAt: null,
    attachments: ["receipt.pdf", "bank_statement.pdf"],
    responseCount: 0,
    lastResponse: null,
  },
  {
    id: "TICKET-GHI789",
    subject: "Feature request: Dark mode",
    description: "Would love to see a dark mode option in the app.",
    ticketType: "Feature",
    priority: "Low",
    status: "Resolved",
    createdAt: "2024-01-10T16:45:00Z",
    updatedAt: "2024-01-13T11:30:00Z",
    resolvedAt: "2024-01-13T11:30:00Z",
    closedAt: null,
    attachments: [],
    responseCount: 2,
    lastResponse: "2024-01-13T11:30:00Z",
  },
  {
    id: "TICKET-JKL012",
    subject: "Booking cancellation issue",
    description: "Cannot cancel my booking through the app.",
    ticketType: "Booking",
    priority: "Medium",
    status: "Closed",
    createdAt: "2024-01-08T13:20:00Z",
    updatedAt: "2024-01-12T10:15:00Z",
    resolvedAt: "2024-01-11T15:45:00Z",
    closedAt: "2024-01-12T10:15:00Z",
    attachments: [],
    responseCount: 4,
    lastResponse: "2024-01-12T10:15:00Z",
  },
]

const statusConfig = {
  Open: { color: "bg-blue-100 text-blue-800", icon: AlertCircle },
  "In Progress": { color: "bg-yellow-100 text-yellow-800", icon: Clock },
  Resolved: { color: "bg-green-100 text-green-800", icon: CheckCircle },
  Closed: { color: "bg-gray-100 text-gray-800", icon: XCircle },
  Reopened: { color: "bg-purple-100 text-purple-800", icon: AlertCircle },
}

const priorityConfig = {
  Low: { color: "bg-green-100 text-green-800" },
  Medium: { color: "bg-yellow-100 text-yellow-800" },
  High: { color: "bg-orange-100 text-orange-800" },
  Urgent: { color: "bg-red-100 text-red-800" },
}

const typeConfig = {
  Account: { color: "bg-blue-50 text-blue-700", icon: User },
  Booking: { color: "bg-purple-50 text-purple-700", icon: Calendar },
  Payment: { color: "bg-green-50 text-green-700", icon: AlertCircle },
  Technical: { color: "bg-red-50 text-red-700", icon: AlertCircle },
  Feature: { color: "bg-indigo-50 text-indigo-700", icon: AlertCircle },
  Other: { color: "bg-gray-50 text-gray-700", icon: AlertCircle },
}

export default function MyTickets() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const filteredAndSortedTickets = useMemo(() => {
    const filtered = mockTickets.filter((ticket) => {
      const matchesSearch =
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
      const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter
      const matchesType = typeFilter === "all" || ticket.ticketType === typeFilter

      return matchesSearch && matchesStatus && matchesPriority && matchesType
    })

    // Sort tickets
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "updated":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        case "priority":
          const priorityOrder = { Urgent: 4, High: 3, Medium: 2, Low: 1 }
          return (
            priorityOrder[b.priority as keyof typeof priorityOrder] -
            priorityOrder[a.priority as keyof typeof priorityOrder]
          )
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, statusFilter, priorityFilter, typeFilter, sortBy])

  const ticketStats = useMemo(() => {
    const stats = {
      total: mockTickets.length,
      open: mockTickets.filter((t) => t.status === "Open").length,
      inProgress: mockTickets.filter((t) => t.status === "In Progress").length,
      resolved: mockTickets.filter((t) => t.status === "Resolved").length,
      closed: mockTickets.filter((t) => t.status === "Closed").length,
    }
    return stats
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "Yesterday"
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  return (
    <div className="max-w-7xl mt-16 mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Support Tickets</h1>
          <p className="text-gray-600 mt-1">Track and manage your support requests</p>
        </div>
        <Link href="/support/create">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{ticketStats.total}</div>
            <div className="text-sm text-gray-600">Total Tickets</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{ticketStats.open}</div>
            <div className="text-sm text-gray-600">Open</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{ticketStats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{ticketStats.resolved}</div>
            <div className="text-sm text-gray-600">Resolved</div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-gray-500">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-gray-600">{ticketStats.closed}</div>
            <div className="text-sm text-gray-600">Closed</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search tickets by subject, description, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                  <SelectItem value="Reopened">Reopened</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[140px]">
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

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
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

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="updated">Recently Updated</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredAndSortedTickets.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <MessageCircle className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery || statusFilter !== "all" || priorityFilter !== "all" || typeFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "You haven't created any support tickets yet"}
              </p>
              <Link href="/support/create">
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Ticket
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          filteredAndSortedTickets.map((ticket) => {
            const StatusIcon = statusConfig[ticket.status as keyof typeof statusConfig].icon
            const TypeIcon = typeConfig[ticket.ticketType as keyof typeof typeConfig].icon

            return (
              <Card key={ticket.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">{ticket.subject}</h3>
                            <Badge variant="outline" className="text-xs font-mono">
                              {ticket.id}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">{ticket.description}</p>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Created {getRelativeTime(ticket.createdAt)}
                            </span>
                            {ticket.lastResponse && (
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                Last reply {getRelativeTime(ticket.lastResponse)}
                              </span>
                            )}
                            {ticket.attachments.length > 0 && (
                              <span className="flex items-center gap-1">
                                <Paperclip className="h-3 w-3" />
                                {ticket.attachments.length} attachment{ticket.attachments.length > 1 ? "s" : ""}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col lg:items-end gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge
                          className={`${statusConfig[ticket.status as keyof typeof statusConfig].color} flex items-center gap-1`}
                        >
                          <StatusIcon className="h-3 w-3" />
                          {ticket.status}
                        </Badge>
                        <Badge className={priorityConfig[ticket.priority as keyof typeof priorityConfig].color}>
                          {ticket.priority}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`${typeConfig[ticket.ticketType as keyof typeof typeConfig].color} flex items-center gap-1`}
                        >
                          <TypeIcon className="h-3 w-3" />
                          {ticket.ticketType}
                        </Badge>
                      </div>

                    
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Results Summary */}
      {filteredAndSortedTickets.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Showing {filteredAndSortedTickets.length} of {mockTickets.length} tickets
        </div>
      )}
    </div>
  )
}
