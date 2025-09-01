"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Eye,
  MoreHorizontal,
  Search,
  Trash2,
  UserCheck,
  UserX,
  Plus,
} from "lucide-react"

// Mock data based on your GraphQL structure
const mockUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    profileImage: "/placeholder.svg?height=40&width=40",
    dateOfBirth: "1990-05-15",
    gender: "Male",
    createdAt: "2024-01-15T10:30:00Z",
    isVerified: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Los Angeles, CA 90210",
    profileImage: "/placeholder.svg?height=40&width=40",
    dateOfBirth: "1985-08-22",
    gender: "Female",
    createdAt: "2024-01-10T14:20:00Z",
    isVerified: true,
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 456-7890",
    address: "789 Pine St, Chicago, IL 60601",
    profileImage: "/placeholder.svg?height=40&width=40",
    dateOfBirth: "1992-12-03",
    gender: "Male",
    createdAt: "2024-01-08T09:15:00Z",
    isVerified: false,
  },
  {
    id: "4",
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 321-0987",
    address: "321 Elm St, Miami, FL 33101",
    profileImage: "/placeholder.svg?height=40&width=40",
    dateOfBirth: "1988-03-18",
    gender: "Female",
    createdAt: "2024-01-05T16:45:00Z",
    isVerified: true,
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 654-3210",
    address: "654 Maple Dr, Seattle, WA 98101",
    profileImage: "/placeholder.svg?height=40&width=40",
    dateOfBirth: "1995-07-11",
    gender: "Male",
    createdAt: "2024-01-03T11:30:00Z",
    isVerified: false,
  },
]

// Mock pagination data
const mockPaginationData = {
  total: 247,
  page: 1,
  limit: 10,
  totalPages: 25,
}

export default function UsersPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState("10")
  const [verificationFilter, setVerificationFilter] = useState("all")

  // Filter users based on search term and verification status
  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesVerification =
      verificationFilter === "all" ||
      (verificationFilter === "verified" && user.isVerified) ||
      (verificationFilter === "unverified" && !user.isVerified)

    return matchesSearch && matchesVerification
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`
  }

  const handleDeleteUser = (userId: string) => {
    // In a real app, you would call your delete API
    console.log("Delete user:", userId)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Users Management</h1>
          <p className="text-gray-600">Manage and monitor all registered users in your system</p>
        </div>
        <Link href="/admin/users/create">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2">
            <Plus className="h-4 w-4" />
            Add New User
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="bg-gradient-to-r from-orange-50 to-white border-b border-orange-100">
          <CardTitle className="text-orange-900">All Users</CardTitle>
          <CardDescription className="text-orange-700">
            A comprehensive list of all registered users with their details and verification status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 h-4 w-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Show:</span>
              <Select value={pageSize} onValueChange={setPageSize}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow className="bg-orange-50 hover:bg-orange-50">
                  <TableHead className="text-orange-900 font-semibold">User</TableHead>
                  <TableHead className="text-orange-900 font-semibold">Contact</TableHead>
                  <TableHead className="text-orange-900 font-semibold">Personal Info</TableHead>
                  <TableHead className="text-orange-900 font-semibold">Address</TableHead>
                  <TableHead className="text-orange-900 font-semibold">Status</TableHead>
                  <TableHead className="text-orange-900 font-semibold">Joined</TableHead>
                  <TableHead className="text-right text-orange-900 font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-orange-50/50">
                    <TableCell>
                      <Link href={`/admin/users/${user.id}`} className="block">
                        <div className="flex items-center gap-3 hover:bg-orange-50 rounded-lg p-2 -m-2 transition-colors cursor-pointer">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={user.profileImage || "/placeholder.svg"}
                              alt={`${user.firstName} ${user.lastName}`}
                            />
                            <AvatarFallback>{getInitials(user.firstName, user.lastName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-orange-700 hover:text-orange-900 transition-colors">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-muted-foreground">ID: {user.id}</div>
                          </div>
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{user.email}</div>
                        <div className="text-sm text-muted-foreground">{user.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">Born: {formatDate(user.dateOfBirth)}</div>
                        <div className="text-sm text-muted-foreground">{user.gender}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm max-w-48 truncate" title={user.address}>
                        {user.address}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={user.isVerified ? "default" : "secondary"}
                        className={`gap-1 ${
                          user.isVerified
                            ? "bg-orange-600 hover:bg-orange-700 text-white"
                            : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                        }`}
                      >
                        {user.isVerified ? (
                          <>
                            <UserCheck className="h-3 w-3" />
                            Verified
                          </>
                        ) : (
                          <>
                            <UserX className="h-3 w-3" />
                            Unverified
                          </>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(user.createdAt)}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${user.id}`} className="gap-2 cursor-pointer">
                              <Eye className="h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${user.id}/edit`} className="gap-2 cursor-pointer">
                              <Edit className="h-4 w-4" />
                              Edit User
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="gap-2 text-destructive cursor-pointer"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * Number.parseInt(pageSize) + 1} to{" "}
              {Math.min(currentPage * Number.parseInt(pageSize), mockPaginationData.total)} of{" "}
              {mockPaginationData.total} users
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="gap-1 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, mockPaginationData.totalPages) }, (_, i) => {
                  const pageNum = i + 1
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 p-0 ${
                        currentPage === pageNum
                          ? "bg-orange-600 hover:bg-orange-700 text-white"
                          : "border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800"
                      }`}
                    >
                      {pageNum}
                    </Button>
                  )
                })}
                {mockPaginationData.totalPages > 5 && (
                  <>
                    <span className="text-muted-foreground px-2">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(mockPaginationData.totalPages)}
                      className="w-8 h-8 p-0"
                    >
                      {mockPaginationData.totalPages}
                    </Button>
                  </>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(mockPaginationData.totalPages, currentPage + 1))}
                disabled={currentPage === mockPaginationData.totalPages}
                className="gap-1 border-orange-200 text-orange-700 hover:bg-orange-50 hover:text-orange-800"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
