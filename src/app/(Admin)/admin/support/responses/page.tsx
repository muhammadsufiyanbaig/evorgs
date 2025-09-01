"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MessageSquareIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  SendIcon,
  ClockIcon,
  UserIcon,
  MoreHorizontalIcon,
  SearchIcon,
  ReplaceIcon as TemplateIcon,
  TrendingUpIcon,
} from "lucide-react"

interface ResponseTemplate {
  id: string
  name: string
  subject: string
  content: string
  category: string
  isActive: boolean
  usageCount: number
  createdAt: string
}

interface PendingResponse {
  id: string
  ticketId: string
  ticketSubject: string
  responseText: string
  isInternal: boolean
  createdBy: string
  createdAt: string
  priority: "Low" | "Medium" | "High" | "Urgent"
}

// Mock data
const responseTemplates: ResponseTemplate[] = [
  {
    id: "tpl-1",
    name: "Payment Issue Resolution",
    subject: "Payment Issue Resolved",
    content:
      "Thank you for reporting the payment issue. Our technical team has identified and resolved the problem. You should now be able to complete your payment successfully. If you continue to experience any issues, please don't hesitate to contact us.",
    category: "Payment",
    isActive: true,
    usageCount: 45,
    createdAt: "2024-01-10T10:00:00Z",
  },
  {
    id: "tpl-2",
    name: "Account Access Help",
    subject: "Account Access Assistance",
    content:
      "We understand you're having trouble accessing your account. I've sent you a secure password reset link to your registered email address. Please check your inbox and follow the instructions to regain access to your account.",
    category: "Account",
    isActive: true,
    usageCount: 32,
    createdAt: "2024-01-08T14:30:00Z",
  },
  {
    id: "tpl-3",
    name: "Booking Confirmation",
    subject: "Booking Confirmed",
    content:
      "Great news! Your booking has been confirmed. You'll receive a confirmation email shortly with all the details. If you need to make any changes or have questions, please contact us at least 24 hours before your scheduled time.",
    category: "Booking",
    isActive: true,
    usageCount: 28,
    createdAt: "2024-01-05T09:15:00Z",
  },
  {
    id: "tpl-4",
    name: "Technical Issue Escalation",
    subject: "Technical Issue Under Investigation",
    content:
      "Thank you for reporting this technical issue. I've escalated your case to our development team for immediate attention. We'll keep you updated on our progress and notify you as soon as the issue is resolved.",
    category: "Technical",
    isActive: true,
    usageCount: 19,
    createdAt: "2024-01-03T16:45:00Z",
  },
]

const mockPendingResponses: PendingResponse[] = [
  {
    id: "resp-1",
    ticketId: "TK-001",
    ticketSubject: "Payment processing issue with credit card",
    responseText: "I've identified the issue with your payment processing. Our team is working on a fix.",
    isInternal: false,
    createdBy: "Sarah Johnson",
    createdAt: "2024-01-15T10:30:00Z",
    priority: "High",
  },
  {
    id: "resp-2",
    ticketId: "TK-003",
    ticketSubject: "Feature request: Dark mode support",
    responseText: "Internal note: This feature is planned for Q2 release.",
    isInternal: true,
    createdBy: "Tech Team",
    createdAt: "2024-01-15T09:15:00Z",
    priority: "Low",
  },
]

export default function ResponseManagement() {
  const [templates, setTemplates] = useState<ResponseTemplate[]>(responseTemplates)
  const [pendingResponses] = useState<PendingResponse[]>(mockPendingResponses)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    content: "",
    category: "",
  })
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const categories = ["Account", "Payment", "Booking", "Technical", "Feature", "Other"]

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory
    return matchesSearch && matchesCategory && template.isActive
  })

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.content) return

    const template: ResponseTemplate = {
      id: `tpl-${Date.now()}`,
      ...newTemplate,
      isActive: true,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    }

    setTemplates([...templates, template])
    setNewTemplate({ name: "", subject: "", content: "", category: "" })
    setIsCreateDialogOpen(false)
  }

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter((t) => t.id !== templateId))
  }

  const handleUseTemplate = (template: ResponseTemplate) => {
    // Here you would typically open a compose dialog or navigate to ticket
    console.log("Using template:", template.name)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const priorityColors = {
    Low: "bg-green-100 text-green-800 border-green-200",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    High: "bg-orange-100 text-orange-800 border-orange-200",
    Urgent: "bg-red-100 text-red-800 border-red-200",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Response Management</h1>
          <p className="text-muted-foreground">Manage response templates and track response analytics</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <TrendingUpIcon className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <PlusIcon className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Response Template</DialogTitle>
                <DialogDescription>Create a reusable template for common support responses</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="template-name">Template Name</Label>
                    <Input
                      id="template-name"
                      placeholder="e.g., Payment Issue Resolution"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="template-category">Category</Label>
                    <Select
                      value={newTemplate.category}
                      onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="template-subject">Email Subject (Optional)</Label>
                  <Input
                    id="template-subject"
                    placeholder="e.g., Payment Issue Resolved"
                    value={newTemplate.subject}
                    onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="template-content">Response Content</Label>
                  <Textarea
                    id="template-content"
                    placeholder="Enter your response template content..."
                    rows={6}
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate}>Create Template</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Templates</p>
                <p className="text-2xl font-bold text-foreground">{templates.filter((t) => t.isActive).length}</p>
              </div>
              <TemplateIcon className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Responses</p>
                <p className="text-2xl font-bold text-foreground">{pendingResponses.length}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Responses Today</p>
                <p className="text-2xl font-bold text-foreground">24</p>
              </div>
              <SendIcon className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold text-foreground">2.4h</p>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">Response Templates</TabsTrigger>
          <TabsTrigger value="pending">Pending Responses</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search templates..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Templates Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{template.category}</Badge>
                        <span className="text-xs text-muted-foreground">Used {template.usageCount} times</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleUseTemplate(template)}>
                          <SendIcon className="h-4 w-4 mr-2" />
                          Use Template
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <EditIcon className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteTemplate(template.id)}
                          className="text-destructive"
                        >
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {template.subject && (
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Subject:</p>
                        <p className="text-sm text-foreground">{template.subject}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Content:</p>
                      <p className="text-sm text-foreground line-clamp-3">{template.content}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">Created {formatDate(template.createdAt)}</span>
                      <Button size="sm" onClick={() => handleUseTemplate(template)}>
                        <SendIcon className="h-3 w-3 mr-1" />
                        Use
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <TemplateIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Templates Found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || selectedCategory !== "all"
                    ? "No templates match your search criteria."
                    : "Create your first response template to get started."}
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Responses</CardTitle>
              <CardDescription>Responses waiting to be sent or approved</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingResponses.map((response) => (
                  <div
                    key={response.id}
                    className="flex items-start space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">{response.ticketId}</span>
                        <Badge className={priorityColors[response.priority]}>{response.priority}</Badge>
                        {response.isInternal && (
                          <Badge variant="secondary" className="text-xs">
                            Internal
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium text-foreground">{response.ticketSubject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2">{response.responseText}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <UserIcon className="h-3 w-3" />
                          <span>{response.createdBy}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="h-3 w-3" />
                          <span>{formatDate(response.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm">
                        <SendIcon className="h-3 w-3 mr-1" />
                        Send
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {pendingResponses.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquareIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Pending Responses</h3>
                  <p className="text-muted-foreground">All responses have been sent.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
                <CardDescription>Average response times over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <TrendingUpIcon className="h-12 w-12 mx-auto mb-2" />
                    <p>Response time chart would go here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Template Usage</CardTitle>
                <CardDescription>Most frequently used response templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates
                    .sort((a, b) => b.usageCount - a.usageCount)
                    .slice(0, 5)
                    .map((template) => (
                      <div key={template.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{template.name}</p>
                          <p className="text-sm text-muted-foreground">{template.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-foreground">{template.usageCount}</p>
                          <p className="text-xs text-muted-foreground">uses</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
