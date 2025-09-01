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
import {
  Users,
  Search,
  Filter,
  Download,
  Settings,
  Bell,
  Mail,
  MoreHorizontal,
  Edit,
  Trash2,
  RefreshCw,
  EyeIcon,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// Mock data - in real app this would come from GraphQL
const mockUsers = [
  {
    id: "1",
    userId: "user_001",
    email: "john.doe@example.com",
    name: "John Doe",
    pushNotifications: true,
    emailNotifications: false,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
    lastActive: "2024-01-25T09:15:00Z",
  },
  {
    id: "2",
    userId: "user_002",
    email: "jane.smith@example.com",
    name: "Jane Smith",
    pushNotifications: false,
    emailNotifications: true,
    createdAt: "2024-01-10T08:20:00Z",
    updatedAt: "2024-01-22T16:30:00Z",
    lastActive: "2024-01-25T11:45:00Z",
  },
  {
    id: "3",
    userId: "user_003",
    email: "mike.johnson@example.com",
    name: "Mike Johnson",
    pushNotifications: true,
    emailNotifications: true,
    createdAt: "2024-01-05T12:15:00Z",
    updatedAt: "2024-01-18T10:20:00Z",
    lastActive: "2024-01-24T15:30:00Z",
  },
  {
    id: "4",
    userId: "user_004",
    email: "sarah.wilson@example.com",
    name: "Sarah Wilson",
    pushNotifications: false,
    emailNotifications: false,
    createdAt: "2024-01-12T14:45:00Z",
    updatedAt: "2024-01-19T09:10:00Z",
    lastActive: "2024-01-25T08:20:00Z",
  },
  {
    id: "5",
    userId: "user_005",
    email: "david.brown@example.com",
    name: "David Brown",
    pushNotifications: true,
    emailNotifications: false,
    createdAt: "2024-01-08T16:30:00Z",
    updatedAt: "2024-01-21T13:25:00Z",
    lastActive: "2024-01-25T12:10:00Z",
  },
]

const preferenceStats = [
  {
    name: "Push Enabled",
    value: "1,847",
    percentage: 65,
    icon: Bell,
    color: "text-green-600",
  },
  {
    name: "Email Enabled",
    value: "1,234",
    percentage: 43,
    icon: Mail,
    color: "text-blue-600",
  },
  {
    name: "Both Enabled",
    value: "892",
    percentage: 31,
    icon: Settings,
    color: "text-orange-600",
  },
  {
    name: "All Disabled",
    value: "234",
    percentage: 8,
    icon: Users,
    color: "text-red-600",
  },
]

export default function UserPreferencesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [editingUser, setEditingUser] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterType === "all" ||
      (filterType === "push-enabled" && user.pushNotifications) ||
      (filterType === "email-enabled" && user.emailNotifications) ||
      (filterType === "both-enabled" && user.pushNotifications && user.emailNotifications) ||
      (filterType === "all-disabled" && !user.pushNotifications && !user.emailNotifications)

    return matchesSearch && matchesFilter
  })

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  const handleSelectAll = () => {
    setSelectedUsers(selectedUsers.length === filteredUsers.length ? [] : filteredUsers.map((user) => user.id))
  }

  const handleBulkUpdate = (field: string, value: boolean) => {
    // In real app, this would call GraphQL mutation
    console.log(`Bulk updating ${field} to ${value} for users:`, selectedUsers)
    setSelectedUsers([])
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setIsEditDialogOpen(true)
  }

  const handleSaveUser = () => {
    // In real app, this would call GraphQL mutation
    console.log("Saving user:", editingUser)
    setIsEditDialogOpen(false)
    setEditingUser(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleExportToPDF = () => {
    const printContent = `
      <html>
        <head>
          <title>User Preferences Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background-color: #fffbf5; }
            h1 { color: #ea580c; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; background-color: white; }
            th, td { border: 1px solid #fed7aa; padding: 8px; text-align: left; }
            th { background-color: #f97316; color: white; }
            .stats { display: flex; gap: 20px; margin: 20px 0; }
            .stat-card { border: 1px solid #fed7aa; padding: 15px; border-radius: 5px; background-color: white; }
            .enabled { color: #16a34a; font-weight: bold; }
            .disabled { color: #dc2626; font-weight: bold; }
          </style>
        </head>
        <body>
          <h1>User Preferences Report</h1>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
          
          <div class="stats">
            ${preferenceStats
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
                <th>Name</th>
                <th>Email</th>
                <th>Push Notifications</th>
                <th>Email Notifications</th>
                <th>Last Updated</th>
                <th>Last Active</th>
              </tr>
            </thead>
            <tbody>
              ${filteredUsers
                .map(
                  (user) => `
                <tr>
                  <td>${user.name}</td>
                  <td>${user.email}</td>
                  <td class="${user.pushNotifications ? "enabled" : "disabled"}">
                    ${user.pushNotifications ? "Enabled" : "Disabled"}
                  </td>
                  <td class="${user.emailNotifications ? "enabled" : "disabled"}">
                    ${user.emailNotifications ? "Enabled" : "Disabled"}
                  </td>
                  <td>${formatDate(user.updatedAt)}</td>
                  <td>${formatDate(user.lastActive)}</td>
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
    <div className="min-h-screen bg-orange-50">
      <div className="space-y-8 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-orange-900 text-balance">User Preferences Management</h1>
          <p className="mt-2 text-orange-700 text-pretty">
            Manage notification preferences and settings for all users in the system.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preferenceStats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.name} className="bg-white border-orange-200 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-700">{stat.name}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-900">{stat.value}</div>
                  <div className="flex items-center space-x-2 text-xs">
                    <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800 border-orange-200">
                      {stat.percentage}%
                    </Badge>
                    <span className="text-orange-600">of total users</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Main Content */}
        <Card className="bg-white border-orange-200 shadow-sm">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-orange-900">
                  <Users className="w-5 h-5 text-orange-600" />
                  User Preferences ({filteredUsers.length})
                </CardTitle>
                <CardDescription className="text-orange-700">
                  View and manage notification preferences for all users
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleExportToPDF}
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export PDF
                </Button>
                <Button 
                  size="sm" 
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
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
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48 border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                  <Filter className="w-4 h-4 mr-2 text-orange-600" />
                  <SelectValue placeholder="Filter by preference" />
                </SelectTrigger>
                <SelectContent className="bg-white border-orange-200">
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="push-enabled">Push Enabled</SelectItem>
                  <SelectItem value="email-enabled">Email Enabled</SelectItem>
                  <SelectItem value="both-enabled">Both Enabled</SelectItem>
                  <SelectItem value="all-disabled">All Disabled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bulk Actions */}
            {selectedUsers.length > 0 && (
              <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <span className="text-sm font-medium text-orange-900">
                    {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""} selected
                  </span>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleBulkUpdate("pushNotifications", true)}
                      className="border-orange-300 text-orange-700 hover:bg-orange-100"
                    >
                      Enable Push
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleBulkUpdate("pushNotifications", false)}
                      className="border-orange-300 text-orange-700 hover:bg-orange-100"
                    >
                      Disable Push
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleBulkUpdate("emailNotifications", true)}
                      className="border-orange-300 text-orange-700 hover:bg-orange-100"
                    >
                      Enable Email
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleBulkUpdate("emailNotifications", false)}
                      className="border-orange-300 text-orange-700 hover:bg-orange-100"
                    >
                      Disable Email
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Users Table */}
            <div className="rounded-md border border-orange-200">
              <Table>
                <TableHeader>
                  <TableRow className="bg-orange-50 border-orange-200">
                    <TableHead className="w-12 text-orange-900">
                      <Checkbox
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onCheckedChange={handleSelectAll}
                        className="border-orange-400 data-[state=checked]:bg-orange-600"
                      />
                    </TableHead>
                    <TableHead className="text-orange-900">User</TableHead>
                    <TableHead className="text-orange-900">Push Notifications</TableHead>
                    <TableHead className="text-orange-900">Email Notifications</TableHead>
                    <TableHead className="text-orange-900">Last Updated</TableHead>
                    <TableHead className="text-orange-900">Last Active</TableHead>
                    <TableHead className="w-12 text-orange-900"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-orange-100 hover:bg-orange-25">
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={() => handleSelectUser(user.id)}
                          className="border-orange-400 data-[state=checked]:bg-orange-600"
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-orange-900">{user.name}</div>
                          <div className="text-sm text-orange-600">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.pushNotifications ? "default" : "secondary"}
                          className={user.pushNotifications ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-800"}
                        >
                          {user.pushNotifications ? "Enabled" : "Disabled"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={user.emailNotifications ? "default" : "secondary"}
                          className={user.emailNotifications ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-800"}
                        >
                          {user.emailNotifications ? "Enabled" : "Disabled"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-orange-600">{formatDate(user.updatedAt)}</TableCell>
                      <TableCell className="text-sm text-orange-600">{formatDate(user.lastActive)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="hover:bg-orange-50">
                              <MoreHorizontal className="w-4 h-4 text-orange-600" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white border-orange-200">
                            <DropdownMenuLabel className="text-orange-900">Actions</DropdownMenuLabel>
                            <DropdownMenuItem 
                              onClick={() => handleEditUser(user)}
                              className="hover:bg-orange-50 text-orange-800"
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Preferences
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-orange-200" />
                            <DropdownMenuItem className="hover:bg-orange-50 text-orange-800">
                              <Link href={`/admin/preferences/user/${user.id}`} className="flex items-center">
                                <EyeIcon className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-orange-200" />
                            <DropdownMenuItem className="text-destructive hover:bg-red-50">
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

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md bg-white border-orange-200">
            <DialogHeader>
              <DialogTitle className="text-orange-900">Edit User Preferences</DialogTitle>
              <DialogDescription className="text-orange-700">
                Update notification preferences for {editingUser?.name}
              </DialogDescription>
            </DialogHeader>
            {editingUser && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-orange-900">User Information</Label>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="font-medium text-orange-900">{editingUser.name}</div>
                    <div className="text-sm text-orange-600">{editingUser.email}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium text-orange-900">Push Notifications</Label>
                      <div className="text-xs text-orange-600">Receive notifications on mobile devices</div>
                    </div>
                    <Switch
                      checked={editingUser.pushNotifications}
                      onCheckedChange={(checked) => setEditingUser({ ...editingUser, pushNotifications: checked })}
                      className="data-[state=checked]:bg-orange-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium text-orange-900">Email Notifications</Label>
                      <div className="text-xs text-orange-600">Receive notifications via email</div>
                    </div>
                    <Switch
                      checked={editingUser.emailNotifications}
                      onCheckedChange={(checked) => setEditingUser({ ...editingUser, emailNotifications: checked })}
                      className="data-[state=checked]:bg-orange-600"
                    />
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
                className="border-orange-300 text-orange-700 hover:bg-orange-50"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSaveUser}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
