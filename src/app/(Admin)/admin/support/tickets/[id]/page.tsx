"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ArrowLeftIcon,
  MoreHorizontalIcon,
  SendIcon,
  PaperclipIcon,
  UserIcon,
  ClockIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  RefreshCwIcon,
  XCircleIcon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
} from "lucide-react"
import type { SupportTicket, Priority, TicketStatus } from "@/utils/interfaces"

interface TicketDetailProps {
  ticketId: string
}

// Mock ticket data with responses
const mockTicket: SupportTicket = {
  id: "TK-001",
  subject: "Payment processing issue with credit card",
  description:
    "Customer unable to complete payment using Visa card ending in 1234. The error occurs during the final step of checkout process. Customer has tried multiple times with the same result. This is affecting their ability to complete their booking.",
  ticketType: "Payment",
  priority: "High",
  status: "InProgress",
  attachments: ["error-screenshot.png", "payment-log.txt"],
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T14:45:00Z",
  creator: {
    id: "user-1",
    firstName: "John",
    lastName: "Doe",
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: "/diverse-user-avatars.png",
    isActive: true,
  },
  responses: [
    {
      id: "resp-1",
      ticketId: "TK-001",
      adminId: "admin-1",
      responseText:
        "Thank you for reporting this issue. I've escalated this to our payment processing team and they are investigating the problem with Visa card transactions.",
      attachments: [],
      isInternal: false,
      createdAt: "2024-01-15T11:15:00Z",
      updatedAt: "2024-01-15T11:15:00Z",
      responder: {
        id: "admin-1",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@company.com",
        profileImage: "/admin-avatar.png",
      },
    },
    {
      id: "resp-2",
      ticketId: "TK-001",
      adminId: "admin-2",
      responseText: "Internal note: Payment gateway logs show intermittent connection issues with Visa's API.",
      attachments: ["gateway-logs.txt"],
      isInternal: true,
      createdAt: "2024-01-15T12:30:00Z",
      updatedAt: "2024-01-15T12:30:00Z",
      responder: {
        id: "admin-2",
        firstName: "Tech",
        lastName: "Support",
        email: "tech@company.com",
        profileImage: "/tech-avatar.png",
      },
    },
    {
      id: "resp-3",
      ticketId: "TK-001",
      userId: "user-1",
      responseText:
        "Hi Sarah, thank you for the quick response. I tried again this morning and still getting the same error. Is there an estimated time for when this will be fixed?",
      attachments: [],
      isInternal: false,
      createdAt: "2024-01-15T14:45:00Z",
      updatedAt: "2024-01-15T14:45:00Z",
      responder: {
        id: "user-1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        profileImage: "/diverse-user-avatars.png",
      },
    },
  ],
}

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

export default function TicketDetail() {
  const [ticket] = useState<SupportTicket>(mockTicket)
  const [newResponse, setNewResponse] = useState("")
  const [isInternalNote, setIsInternalNote] = useState(false)
  const [showInternalNotes, setShowInternalNotes] = useState(true)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
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

  const getResponderName = (responder: any) => {
    if (!responder) return "Unknown"
    if ("firstName" in responder) {
      return `${responder.firstName} ${responder.lastName}`
    }
    if ("vendorName" in responder) {
      return responder.vendorName
    }
    return "Unknown"
  }

  const getResponderInitials = (responder: any) => {
    if (!responder) return "?"
    if ("firstName" in responder) {
      return `${responder.firstName[0]}${responder.lastName[0]}`
    }
    if ("vendorName" in responder) {
      return responder.vendorName.substring(0, 2).toUpperCase()
    }
    return "?"
  }

  const handleSendResponse = () => {
    if (!newResponse.trim()) return
    // Here you would typically call your GraphQL mutation
    console.log("Sending response:", { text: newResponse, isInternal: isInternalNote })
    setNewResponse("")
  }

  const handleUpdatePriority = (priority: Priority) => {
    console.log("Updating priority to:", priority)
  }

  const handleUpdateStatus = (status: TicketStatus) => {
    console.log("Updating status to:", status)
  }

  const StatusIcon = statusIcons[ticket.status]

  const filteredResponses = ticket.responses?.filter((response) => showInternalNotes || !response.isInternal) || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/tickets">
          <Button variant="outline" size="sm">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Tickets
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{ticket.id}</h1>
          <p className="text-muted-foreground">Created {formatDate(ticket.createdAt)}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Export Ticket</DropdownMenuItem>
            <DropdownMenuItem>Print Details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Close Ticket</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Details */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{ticket.subject}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{ticket.ticketType}</Badge>
                    <Badge className={priorityColors[ticket.priority]}>{ticket.priority}</Badge>
                    <Badge className={statusColors[ticket.status]}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {ticket.status === "InProgress" ? "In Progress" : ticket.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{ticket.description}</p>
              {ticket.attachments.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-foreground mb-2">Attachments</h4>
                  <div className="space-y-2">
                    {ticket.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <PaperclipIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{attachment}</span>
                        <Button variant="ghost" size="sm">
                          <DownloadIcon className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Responses Timeline */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Conversation</CardTitle>
                <div className="flex items-center space-x-2">
                  <Switch id="show-internal" checked={showInternalNotes} onCheckedChange={setShowInternalNotes} />
                  <Label htmlFor="show-internal" className="text-sm">
                    Show internal notes
                  </Label>
                  {showInternalNotes ? (
                    <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredResponses.map((response, index) => (
                  <div key={response.id} className="flex space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={response.responder?.profileImage || "/placeholder.svg"} />
                      <AvatarFallback>{getResponderInitials(response.responder)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{getResponderName(response.responder)}</span>
                        <span className="text-sm text-muted-foreground">{formatDate(response.createdAt)}</span>
                        {response.isInternal && (
                          <Badge variant="secondary" className="text-xs">
                            Internal
                          </Badge>
                        )}
                      </div>
                      <div
                        className={`p-4 rounded-lg ${
                          response.isInternal
                            ? "bg-yellow-50 border border-yellow-200"
                            : "bg-muted border border-border"
                        }`}
                      >
                        <p className="text-foreground leading-relaxed">{response.responseText}</p>
                        {response.attachments.length > 0 && (
                          <div className="mt-3 space-y-1">
                            {response.attachments.map((attachment, attachIndex) => (
                              <div key={attachIndex} className="flex items-center space-x-2 text-sm">
                                <PaperclipIcon className="h-3 w-3 text-muted-foreground" />
                                <span className="text-foreground">{attachment}</span>
                                <Button variant="ghost" size="sm">
                                  <DownloadIcon className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Add Response */}
          <Card>
            <CardHeader>
              <CardTitle>Add Response</CardTitle>
              <CardDescription>Respond to this ticket or add an internal note</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Type your response here..."
                value={newResponse}
                onChange={(e) => setNewResponse(e.target.value)}
                rows={4}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="internal-note" checked={isInternalNote} onCheckedChange={setIsInternalNote} />
                    <Label htmlFor="internal-note" className="text-sm">
                      Internal note
                    </Label>
                  </div>
                  <Button variant="outline" size="sm">
                    <PaperclipIcon className="h-4 w-4 mr-2" />
                    Attach File
                  </Button>
                </div>
                <Button onClick={handleSendResponse} disabled={!newResponse.trim()}>
                  <SendIcon className="h-4 w-4 mr-2" />
                  Send Response
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ticket Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Ticket Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Priority</Label>
                <Select value={ticket.priority} onValueChange={handleUpdatePriority}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                <Select value={ticket.status} onValueChange={handleUpdateStatus}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="InProgress">In Progress</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                    <SelectItem value="Reopened">Reopened</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="text-foreground">{formatDate(ticket.createdAt)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span className="text-foreground">{formatDate(ticket.updatedAt)}</span>
                </div>
                {ticket.resolvedAt && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Resolved</span>
                    <span className="text-foreground">{formatDate(ticket.resolvedAt)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Creator Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Created By</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={ticket.creator?.profileImage || "/placeholder.svg"} />
                  <AvatarFallback>
                    {ticket.creator && "firstName" in ticket.creator
                      ? `${ticket.creator.firstName[0]}${ticket.creator.lastName[0]}`
                      : ticket.creator && "vendorName" in ticket.creator
                        ? ticket.creator.vendorName.substring(0, 2).toUpperCase()
                        : "?"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{getCreatorName(ticket.creator)}</p>
                  <p className="text-sm text-muted-foreground">
                    {ticket.creator
                      ? "email" in ticket.creator
                        ? ticket.creator.email
                        : "vendorEmail" in ticket.creator
                          ? (ticket.creator as any).vendorEmail
                          : ""
                      : ""}
                  </p>
                  {ticket.creator && "vendorType" in ticket.creator && (
                    <p className="text-xs text-muted-foreground">{ticket.creator.vendorType}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                Mark as Resolved
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <XCircleIcon className="h-4 w-4 mr-2" />
                Close Ticket
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <AlertTriangleIcon className="h-4 w-4 mr-2" />
                Escalate Priority
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <UserIcon className="h-4 w-4 mr-2" />
                Assign to Agent
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
