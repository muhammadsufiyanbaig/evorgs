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
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-orange-500 text-orange-500" : "text-orange-200"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/reviews">
            <Button variant="outline" size="sm" className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Reviews
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-orange-800">Edit Review</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Review Form */}
          <div className="lg:col-span-2">
            <Card className="border-orange-200 shadow-lg bg-white">
              <CardHeader className="bg-orange-50 border-b border-orange-100">
                <CardTitle className="text-orange-800">Review Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-orange-700 font-medium">Review Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Enter review title..."
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-orange-700 font-medium">Review Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Enter review content..."
                      rows={6}
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rating" className="text-orange-700 font-medium">Rating</Label>
                      <Select
                        value={formData.rating.toString()}
                        onValueChange={(value) => setFormData({ ...formData, rating: Number.parseInt(value) })}
                      >
                        <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-orange-200">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <SelectItem key={rating} value={rating.toString()} className="hover:bg-orange-50">
                              <div className="flex items-center gap-2">
                                <span className="text-orange-700">{rating}</span>
                                <div className="flex">{renderStars(rating)}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="serviceType" className="text-orange-700 font-medium">Service Type</Label>
                      <Select
                        value={formData.serviceType}
                        onValueChange={(value) => setFormData({ ...formData, serviceType: value as ServiceType })}
                      >
                        <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-orange-200">
                          <SelectItem value="DELIVERY" className="hover:bg-orange-50">Delivery</SelectItem>
                          <SelectItem value="PICKUP" className="hover:bg-orange-50">Pickup</SelectItem>
                          <SelectItem value="DINE_IN" className="hover:bg-orange-50">Dine In</SelectItem>
                          <SelectItem value="CATERING" className="hover:bg-orange-50">Catering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="moderationStatus" className="text-orange-700 font-medium">Moderation Status</Label>
                    <Select
                      value={formData.moderationStatus}
                      onValueChange={(value) => setFormData({ ...formData, moderationStatus: value as ModerationStatus })}
                    >
                      <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-orange-200">
                        <SelectItem value="PENDING" className="hover:bg-orange-50">Pending</SelectItem>
                        <SelectItem value="APPROVED" className="hover:bg-orange-50">Approved</SelectItem>
                        <SelectItem value="REJECTED" className="hover:bg-orange-50">Rejected</SelectItem>
                        <SelectItem value="FLAGGED" className="hover:bg-orange-50">Flagged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Link href="/admin/reviews">
                      <Button type="button" variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
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
            <Card className="border-orange-200 shadow-lg bg-white">
              <CardHeader className="bg-orange-50 border-b border-orange-100">
                <CardTitle className="text-orange-800">Review Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div>
                  <Label className="text-sm font-medium text-orange-700">Review ID</Label>
                  <p className="text-sm text-orange-600">{review.id}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-orange-700">Customer</Label>
                  <p className="text-sm text-gray-800">{review.user?.name || 'N/A'}</p>
                  <p className="text-xs text-orange-500">{review.user?.email || 'N/A'}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-orange-700">Vendor</Label>
                  <p className="text-sm text-gray-800">{review.vendor?.businessName || 'N/A'}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-orange-700">Current Status</Label>
                  <Badge
                    className={
                      review.moderationStatus === "APPROVED"
                        ? "bg-orange-500 text-white"
                        : review.moderationStatus === "PENDING"
                        ? "bg-orange-200 text-orange-800"
                        : review.moderationStatus === "FLAGGED"
                        ? "bg-red-500 text-white"
                        : "bg-orange-100 text-orange-600 border border-orange-300"
                    }
                  >
                    {review.moderationStatus}
                  </Badge>
                </div>

                <div>
                  <Label className="text-sm font-medium text-orange-700">Created</Label>
                  <p className="text-sm text-orange-600">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-orange-700">Last Updated</Label>
                  <p className="text-sm text-orange-600">{new Date(review.updatedAt).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
