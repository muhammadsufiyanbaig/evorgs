"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ReviewDetailView } from "@/app/components/Admin/Reviews/DetailView"
import { ResponseForm } from "@/app/components/Admin/Reviews/form"
import { ArrowLeft } from "lucide-react"
import type { Review } from "@/utils/interfaces"

// Mock data - in real app, this would come from GraphQL query based on ID
const mockReview: Review = {
  id: "1",
  rating: 5,
  comment:
    "Absolutely amazing venue! The staff was incredibly helpful and the location was perfect for our wedding. Everything exceeded our expectations and we couldn't be happier with our choice. The gardens were beautiful, the facilities were top-notch, and the coordination team made everything seamless. We received so many compliments from our guests about the venue. Highly recommend to anyone looking for a perfect wedding location!",
  serviceType: "VENUE",
  serviceId: "venue-123",
  userId: "user-1",
  vendorId: "vendor-1",
  isVerified: true,
  isPublished: true,
  moderationStatus: "APPROVED",
  flaggedCount: 0,
  viewsCount: 234,
  likesCount: 18,
  helpfulCount: 12,
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T10:30:00Z",
  moderatedAt: "2024-01-15T11:00:00Z",
  moderatedBy: "Admin User",
  moderationNotes: "Verified as legitimate review from actual customer",
  user: {
      id: "user-1",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@example.com",
      phone: "+1 (555) 123-4567",
      profileImage: "/placeholder.svg?height=64&width=64",
      isActive: true,
      isVerified: true,
      name: ""
  },
  vendor: {
    id: "vendor-1",
    vendorName: "Sunset Gardens Venue",
    email: "info@sunsetgardens.com",
    phone: "+1 (555) 987-6543",
    logo: "/placeholder.svg?height=64&width=64",
    businessType: "Wedding Venue",
    address: "123 Garden Lane",
    city: "Springfield",
    state: "CA",
    country: "United States",
    isActive: true,
    isVerified: true,
    businessName: "",
    vendorEmail: "",
    vendorType: ""
  },
  serviceAspects: {
    venue: {
      location: 5,
      ambiance: 5,
      cleanliness: 4,
      facilities: 5,
      staff: 5,
      valueForMoney: 4,
    },
  },
  response: {
    id: "response-1",
    responseText:
      "Thank you so much for your wonderful review, Sarah! We're absolutely thrilled that your wedding day was everything you dreamed of and more. Our team works hard to make every event special, and it means the world to us to hear that we exceeded your expectations. Congratulations on your marriage, and we wish you both a lifetime of happiness!",
    reviewId: "1",
    vendorId: "vendor-1",
    templateType: "THANK_YOU",
    createdAt: "2024-01-15T14:30:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
  },
}

export default async function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const router = useRouter()
  const [showResponseForm, setShowResponseForm] = useState(false)
  const [review, setReview] = useState<Review>(mockReview)

  const handleBack = () => {
    router.back()
  }

  const handleEdit = () => {
    console.log("Edit review:", review.id)
    // In real app, navigate to edit form
  }

  const handleDelete = () => {
    console.log("Delete review:", review.id)
    // In real app, show confirmation dialog and delete
  }

  const handleVerify = () => {
    console.log("Verify review:", review.id)
    setReview((prev) => ({ ...prev, isVerified: true }))
  }

  const handleUnverify = () => {
    console.log("Unverify review:", review.id)
    setReview((prev) => ({ ...prev, isVerified: false }))
  }

  const handlePublish = () => {
    console.log("Publish review:", review.id)
    setReview((prev) => ({ ...prev, isPublished: true }))
  }

  const handleUnpublish = () => {
    console.log("Unpublish review:", review.id)
    setReview((prev) => ({ ...prev, isPublished: false }))
  }

  const handleFlag = () => {
    console.log("Flag review:", review.id)
    setReview((prev) => ({
      ...prev,
      moderationStatus: "FLAGGED",
      flaggedCount: (prev.flaggedCount || 0) + 1,
    }))
  }

  const handleRespond = () => {
    setShowResponseForm(true)
  }

  const handleResponseSubmit = (responseData: {
    responseText: string
    templateType?: any
    actionPlan?: string
    offerCompensation?: boolean
  }) => {
    console.log("Submit response:", responseData)

    // Mock response creation
    const newResponse = {
      id: `response-${Date.now()}`,
      responseText: responseData.responseText,
      reviewId: review.id,
      vendorId: review.vendorId,
      templateType: responseData.templateType,
      actionPlan: responseData.actionPlan,
      offerCompensation: responseData.offerCompensation,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setReview((prev) => ({ ...prev, response: newResponse }))
    setShowResponseForm(false)
  }

  const handleResponseCancel = () => {
    setShowResponseForm(false)
  }

  if (showResponseForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reviews
          </Button>
        </div>

        <div className="flex justify-center">
          <ResponseForm
            reviewId={review.id}
            vendorName={review.vendor?.vendorName || "Vendor"}
            onSubmit={handleResponseSubmit}
            onCancel={handleResponseCancel}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Reviews
        </Button>
      </div>

      <ReviewDetailView
        review={review}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onVerify={handleVerify}
        onUnverify={handleUnverify}
        onPublish={handlePublish}
        onUnpublish={handleUnpublish}
        onFlag={handleFlag}
        onRespond={handleRespond}
      />
    </div>
  )
}
