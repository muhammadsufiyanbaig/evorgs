"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ReviewsTable } from "@/app/components/Admin/Reviews/tables"
import { ReviewsFilters } from "@/app/components/Admin/Reviews/filters"
import { Download, Plus, Trash2, CheckCircle, Flag } from "lucide-react"
import type { Review, ReviewFilters, Pagination } from "@/utils/interfaces"

// Mock data - in real app, this would come from GraphQL queries
const mockReviews: Review[] = [
  {
    id: "1",
    rating: 5,
    comment:
      "Absolutely amazing venue! The staff was incredibly helpful and the location was perfect for our wedding. Everything exceeded our expectations and we couldn't be happier with our choice.",
    serviceType: "VENUE",
    serviceId: "venue-123",
    userId: "user-1",
    vendorId: "vendor-1",
    isVerified: true,
    isPublished: true,
    moderationStatus: "APPROVED",
    flaggedCount: 0,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    user: {
        id: "user-1",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah@example.com",
        profileImage: "/placeholder.svg?height=32&width=32",
        isActive: true,
        isVerified: true,
        name: ""
    },
    vendor: {
        id: "vendor-1",
        vendorName: "Sunset Gardens Venue",
        email: "info@sunsetgardens.com",
        logo: "/placeholder.svg?height=32&width=32",
        businessType: "Wedding Venue",
        isActive: true,
        isVerified: true,
        businessName: ""
    },
    response: {
      id: "response-1",
      responseText: "Thank you so much for your wonderful review! We're thrilled that your wedding day was perfect.",
      reviewId: "1",
      vendorId: "vendor-1",
      createdAt: "2024-01-15T14:30:00Z",
      updatedAt: "2024-01-15T14:30:00Z",
    },
  },
  {
    id: "2",
    rating: 4,
    comment:
      "Great catering service with delicious food. The presentation was beautiful and guests loved the variety of options available. Would definitely recommend to others.",
    serviceType: "CATERING",
    serviceId: "catering-456",
    userId: "user-2",
    vendorId: "vendor-2",
    isVerified: false,
    isPublished: true,
    moderationStatus: "PENDING",
    flaggedCount: 0,
    createdAt: "2024-01-14T15:45:00Z",
    updatedAt: "2024-01-14T15:45:00Z",
    user: {
        id: "user-2",
        firstName: "Michael",
        lastName: "Chen",
        email: "michael@example.com",
        profileImage: "/placeholder.svg?height=32&width=32",
        isActive: true,
        isVerified: false,
        name: ""
    },
    vendor: {
        id: "vendor-2",
        vendorName: "Gourmet Catering Co",
        email: "info@gourmetcatering.com",
        logo: "/placeholder.svg?height=32&width=32",
        businessType: "Catering Service",
        isActive: true,
        isVerified: true,
        businessName: ""
    },
  },
  {
    id: "3",
    rating: 2,
    comment:
      "The photography was disappointing. Many shots were blurry and the photographer seemed unprofessional. Not worth the money we paid.",
    serviceType: "PHOTOGRAPHY",
    serviceId: "photo-789",
    userId: "user-3",
    vendorId: "vendor-3",
    isVerified: true,
    isPublished: true,
    moderationStatus: "FLAGGED",
    flaggedCount: 2,
    createdAt: "2024-01-13T09:20:00Z",
    updatedAt: "2024-01-13T09:20:00Z",
    user: {
        id: "user-3",
        firstName: "Emily",
        lastName: "Rodriguez",
        email: "emily@example.com",
        profileImage: "/placeholder.svg?height=32&width=32",
        isActive: true,
        isVerified: true,
        name: ""
    },
    vendor: {
        id: "vendor-3",
        vendorName: "Capture Moments Photography",
        email: "info@capturemoments.com",
        logo: "/placeholder.svg?height=32&width=32",
        businessType: "Photography Service",
        isActive: true,
        isVerified: true,
        businessName: ""
    },
  },
  {
    id: "4",
    rating: 5,
    comment:
      "Beautiful farmhouse with amazing amenities. Perfect for our family reunion. The location is peaceful and the facilities are top-notch.",
    serviceType: "FARMHOUSE",
    serviceId: "farmhouse-101",
    userId: "user-4",
    vendorId: "vendor-4",
    isVerified: true,
    isPublished: false,
    moderationStatus: "UNDER_REVIEW",
    flaggedCount: 0,
    createdAt: "2024-01-12T16:15:00Z",
    updatedAt: "2024-01-12T16:15:00Z",
    user: {
        id: "user-4",
        firstName: "David",
        lastName: "Wilson",
        email: "david@example.com",
        profileImage: "/placeholder.svg?height=32&width=32",
        isActive: true,
        isVerified: true,
        name: ""
    },
    vendor: {
        id: "vendor-4",
        vendorName: "Countryside Farmhouse",
        email: "info@countrysidefarhouse.com",
        logo: "/placeholder.svg?height=32&width=32",
        businessType: "Farmhouse Rental",
        isActive: true,
        isVerified: true,
        businessName: ""
    },
  },
]

const mockPagination: Pagination = {
  page: 1,
  limit: 10,
  total: 2847,
  totalPages: 285,
  hasNextPage: true,
  hasPrevPage: false,
}

export default function ReviewsPage() {
  const router = useRouter()
  const [selectedReviews, setSelectedReviews] = useState<string[]>([])
  const [filters, setFilters] = useState<ReviewFilters>({})
  const [pagination, setPagination] = useState<Pagination>(mockPagination)
  const [bulkDialog, setBulkDialog] = useState<{
    open: boolean
    action: "verify" | "unverify" | "publish" | "unpublish" | "flag" | "delete" | null
  }>({
    open: false,
    action: null,
  })

  const handleSelectReview = (reviewId: string) => {
    setSelectedReviews((prev) => (prev.includes(reviewId) ? prev.filter((id) => id !== reviewId) : [...prev, reviewId]))
  }

  const handleSelectAll = (selected: boolean) => {
    setSelectedReviews(selected ? mockReviews.map((review) => review.id) : [])
  }

  const handleClearFilters = () => {
    setFilters({})
  }

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, page }))
  }

  const handlePageSizeChange = (limit: number) => {
    setPagination((prev) => ({ ...prev, limit, page: 1 }))
  }

  const handleViewReview = (reviewId: string) => {
    router.push(`/admin/reviews/${reviewId}`)
  }

  const handleEditReview = (reviewId: string) => {
    router.push(`/admin/reviews/${reviewId}/edit`)
  }

  const handleDeleteReview = (reviewId: string) => {
    console.log("Delete review:", reviewId)
  }

  const handleVerifyReview = (reviewId: string) => {
    console.log("Verify review:", reviewId)
  }

  const handleUnverifyReview = (reviewId: string) => {
    console.log("Unverify review:", reviewId)
  }

  const handlePublishReview = (reviewId: string) => {
    console.log("Publish review:", reviewId)
  }

  const handleUnpublishReview = (reviewId: string) => {
    console.log("Unpublish review:", reviewId)
  }

  const handleFlagReview = (reviewId: string) => {
    console.log("Flag review:", reviewId)
  }

  const handleBulkAction = (action: string) => {
    setBulkDialog({
      open: true,
      action: action as "verify" | "unverify" | "publish" | "unpublish" | "flag" | "delete",
    })
  }

  const handleBulkActionConfirm = (notes?: string, reason?: string) => {
    console.log(`Bulk ${bulkDialog.action}:`, selectedReviews, notes, reason)
    setSelectedReviews([])
    setBulkDialog({ open: false, action: null })
  }

  return (
    <div className="space-y-6 bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between bg-orange-50 p-6 rounded-lg border border-orange-200">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-orange-900">Reviews</h1>
        <p className="text-orange-700">Manage and moderate all reviews in your system</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="border-orange-300 text-orange-700 hover:bg-orange-100">
        <Download className="mr-2 h-4 w-4" />
        Export
        </Button>
        <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white">
        <Plus className="mr-2 h-4 w-4" />
        Add Review
        </Button>
      </div>
      </div>

      {/* Filters */}
      <Card className="border-orange-200 bg-white">
      <CardHeader className="bg-orange-50 border-b border-orange-200">
        <CardTitle className="text-lg text-orange-900">Filters</CardTitle>
        <CardDescription className="text-orange-700">Filter and search through reviews</CardDescription>
      </CardHeader>
      <CardContent className="bg-white">
        <ReviewsFilters filters={filters} onFiltersChange={setFilters} onClearFilters={handleClearFilters} />
      </CardContent>
      </Card>

      {/* Reviews Table */}
      <Card className="border-orange-200 bg-white">
      <CardContent className="p-0 bg-white">
        <ReviewsTable
        reviews={mockReviews}
        selectedReviews={selectedReviews}
        onSelectReview={handleSelectReview}
        onSelectAll={handleSelectAll}
        onViewReview={handleViewReview}
        onEditReview={handleEditReview}
        onDeleteReview={handleDeleteReview}
        onVerifyReview={handleVerifyReview}
        onUnverifyReview={handleUnverifyReview}
        onPublishReview={handlePublishReview}
        onUnpublishReview={handleUnpublishReview}
        onFlagReview={handleFlagReview}
        />
      </CardContent>
      </Card>
    </div>
  )
}
