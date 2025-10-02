"use client"

import { EditReviewForm } from "@/app/components/Admin/Reviews/edit"
import { type Review } from "@/utils/interfaces"

// TODO: Replace with GraphQL query based on review ID
const mockReview: any = null

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
