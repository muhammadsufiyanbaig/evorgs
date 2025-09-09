"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ReviewDetailView } from "@/app/components/Admin/Reviews/DetailView"
import { ResponseForm } from "@/app/components/Admin/Reviews/form"
import { ArrowLeft } from "lucide-react"
import type { Review } from "@/utils/interfaces"

// TODO: Replace with GraphQL query based on review ID
const mockReview: any = null

export default async function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const router = useRouter()
  const [showResponseForm, setShowResponseForm] = useState(false)
  const [review, setReview] = useState<any>(mockReview)

  const handleBack = () => {
    router.back()
  }

  // TODO: Add GraphQL query to fetch review by ID
  if (!review) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Reviews
          </Button>
        </div>
        <div className="text-center py-8">
          <p>Review not found</p>
        </div>
      </div>
    )
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
    setReview((prev: any) => ({ ...prev, isVerified: true }))
  }

  const handleUnverify = () => {
    console.log("Unverify review:", review.id)
    setReview((prev: any) => ({ ...prev, isVerified: false }))
  }

  const handlePublish = () => {
    console.log("Publish review:", review.id)
    setReview((prev: any) => ({ ...prev, isPublished: true }))
  }

  const handleUnpublish = () => {
    console.log("Unpublish review:", review.id)
    setReview((prev: any) => ({ ...prev, isPublished: false }))
  }

  const handleFlag = () => {
    console.log("Flag review:", review.id)
    setReview((prev: { flaggedCount: any }) => ({
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

    setReview((prev: any) => ({ ...prev, response: newResponse }))
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
