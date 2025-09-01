"use client"

import { EditReviewForm } from "@/app/components/Admin/Reviews/edit"
import { type Review } from "@/utils/interfaces"

// Mock review data - replace with actual data fetching
const mockReview: Review = {
    id: "1",
    rating: 5,
    comment: "I had an amazing experience with this restaurant. The food was delicious, the service was prompt, and the staff was very friendly. I would definitely recommend this place to others.",
    serviceType: "VENUE",
    serviceId: "venue1",
    userId: "user1",
    vendorId: "vendor1",
    isPublished: false,
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    user: {
        id: "user1",
        name: "John Doe",
        email: "john.doe@example.com",
        firstName: "",
        lastName: "",
        isActive: false
    },
    vendor: {
      id: "vendor1",
      email: "contact@deliciousbites.com",
      businessName: "",
      vendorName: "",
      businessType: "",
      isActive: false,
      isVerified: false,
      vendorEmail: "",
      vendorType: ""
    },
    response: undefined,
    helpfulCount: 12,

    isVerified: true,
}

interface EditReviewPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditReviewPage({ params }: EditReviewPageProps) {
  const { id } = await params
  
  const handleSave = (updatedReview: Partial<Review>) => {
    console.log("[v0] Saving review updates for ID:", id, updatedReview)
    // Here you would typically call your GraphQL mutation
    // Example: updateReview({ variables: { id, input: updatedReview } })
  }

  return <EditReviewForm review={mockReview} onSave={handleSave} />
}
