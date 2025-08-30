"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Star, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { type Review, type ServiceType, type ModerationStatus } from "@/utils/interfaces"

interface EditReviewFormProps {
  review: Review
  onSave?: (updatedReview: Partial<Review>) => void
}

export function EditReviewForm({ review, onSave }: EditReviewFormProps) {
  const [formData, setFormData] = useState({
    title: (review as any).title || "",
    content: (review as any).content || "",
    rating: review.rating,
    serviceType: review.serviceType,
    moderationStatus: review.moderationStatus,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave?.(formData)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/reviews">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Reviews
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Edit Review</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Review Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Review Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Review Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter review title..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Review Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Enter review content..."
                    rows={6}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating</Label>
                    <Select
                      value={formData.rating.toString()}
                      onValueChange={(value) => setFormData({ ...formData, rating: Number.parseInt(value) })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <SelectItem key={rating} value={rating.toString()}>
                            <div className="flex items-center gap-2">
                              <span>{rating}</span>
                              <div className="flex">{renderStars(rating)}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Type</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData({ ...formData, serviceType: value as ServiceType })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DELIVERY">Delivery</SelectItem>
                        <SelectItem value="PICKUP">Pickup</SelectItem>
                        <SelectItem value="DINE_IN">Dine In</SelectItem>
                        <SelectItem value="CATERING">Catering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moderationStatus">Moderation Status</Label>
                  <Select
                    value={formData.moderationStatus}
                    onValueChange={(value) => setFormData({ ...formData, moderationStatus: value as ModerationStatus })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="APPROVED">Approved</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                      <SelectItem value="FLAGGED">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button type="submit" className="flex-1">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Link href="/admin/reviews">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Review Info Sidebar */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Review Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Review ID</Label>
                <p className="text-sm text-muted-foreground">{review.id}</p>
              </div>

              <div>
                <Label className="text-sm font-medium">Customer</Label>
                <p className="text-sm">{review.user?.name || 'N/A'}</p>
                <p className="text-xs text-muted-foreground">{review.user?.email || 'N/A'}</p>
              </div>

              <div>
                <Label className="text-sm font-medium">Vendor</Label>
                <p className="text-sm">{review.vendor?.businessName || 'N/A'}</p>
              </div>

              <div>
                <Label className="text-sm font-medium">Current Status</Label>
                <Badge
                  variant={
                    review.moderationStatus === "APPROVED"
                      ? "default"
                      : review.moderationStatus === "PENDING"
                        ? "secondary"
                        : review.moderationStatus === "FLAGGED"
                          ? "destructive"
                          : "outline"
                  }
                >
                  {review.moderationStatus}
                </Badge>
              </div>

              <div>
                <Label className="text-sm font-medium">Created</Label>
                <p className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>

              <div>
                <Label className="text-sm font-medium">Last Updated</Label>
                <p className="text-sm text-muted-foreground">{new Date(review.updatedAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
