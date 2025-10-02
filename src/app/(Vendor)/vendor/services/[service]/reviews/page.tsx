"use client"

import { Key, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  ArrowLeft,
  Search,
  Reply,
  CheckCircle,
  Eye,
  EyeOff,
  MoreHorizontal,
  Building,
  MessageSquare,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// TODO: Replace with GraphQL data from useQuery based on service ID
const mockService: any = null

// TODO: Replace with GraphQL data from useQuery
const mockReviews: any[] = []

// TODO: Replace with GraphQL data from useQuery
const mockReviewStats = {
  totalReviews: 0,
  averageRating: 0,
  ratingDistribution: {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  },
  responseRate: 0,
  verifiedReviews: 0,
}

export default function ServiceReviewsPage() {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string

  const [filterRating, setFilterRating] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [responseText, setResponseText] = useState("")

  const filteredReviews = mockReviews.filter((review) => {
    const matchesRating = filterRating === "all" || review.rating.toString() === filterRating
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && review.isPublished) ||
      (filterStatus === "unpublished" && !review.isPublished) ||
      (filterStatus === "verified" && review.isVerified) ||
      (filterStatus === "unverified" && !review.isVerified)
    const matchesSearch =
      searchQuery === "" ||
      review.reviewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.userName.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesRating && matchesStatus && matchesSearch
  })

  const handleSubmitResponse = (reviewId: string) => {
    console.log("Submitting response for review:", reviewId, responseText)
    setResponseText("")
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${star <= rating ? "fill-orange-400 text-orange-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/vendor/services/${serviceId}`)}
            className="border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Service
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{mockService.name} - Reviews</h1>
              <p className="text-orange-600">Manage customer reviews and responses</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters */}
            <Card className="border-orange-200 bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-400 w-4 h-4" />
                      <Input
                        placeholder="Search reviews..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>
                  <Select value={filterRating} onValueChange={setFilterRating}>
                    <SelectTrigger className="w-[140px] border-orange-200">
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ratings</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="1">1 Star</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px] border-orange-200">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="unpublished">Unpublished</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="unverified">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <Card key={review.id} className="border-orange-200 bg-white">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Review Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-orange-100 text-orange-700">
                              {review.userName
                                .split(" ")
                                .map((n: any[]) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{review.userName}</span>
                              {review.isVerified && <CheckCircle className="w-4 h-4 text-green-500" />}
                              <Badge
                                variant={review.isPublished ? "default" : "secondary"}
                                className={
                                  review.isPublished ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-800"
                                }
                              >
                                {review.isPublished ? "Published" : "Draft"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              {renderStars(review.rating)}
                              <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orange-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              {review.isPublished ? (
                                <>
                                  <EyeOff className="w-4 h-4 mr-2" />
                                  Unpublish
                                </>
                              ) : (
                                <>
                                  <Eye className="w-4 h-4 mr-2" />
                                  Publish
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              {review.isVerified ? "Unverify" : "Verify"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Review Content */}
                      <div className="space-y-3">
                        <p className="text-gray-700">{review.reviewText}</p>

                        {/* Review Images */}
                        {review.images && review.images.length > 0 && (
                          <div className="flex gap-2">
                            {review.images.map((image: any, index: number) => (
                              <img
                                key={index}
                                src={image || "/placeholder.svg"}
                                alt={`Review image ${index + 1}`}
                                className="w-20 h-20 object-cover rounded-lg border border-orange-200"
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <Separator className="bg-orange-100" />

                      {/* Response Section */}
                      <div className="space-y-3">
                        {review.response ? (
                          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                            <div className="flex items-center gap-2 mb-2">
                              <Reply className="w-4 h-4 text-orange-600" />
                              <span className="font-medium text-orange-900">Your Response</span>
                              <span className="text-xs text-orange-600">
                                {new Date(review.response.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-orange-800">{review.response.responseText}</p>
                          </div>
                        ) : (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                              >
                                <Reply className="w-4 h-4 mr-2" />
                                Respond to Review
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[525px]">
                              <DialogHeader>
                                <DialogTitle className="text-gray-900">Respond to Review</DialogTitle>
                                <DialogDescription className="text-gray-600">
                                  Write a professional response to {review.userName}'s review
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="font-medium text-gray-900">{review.userName}</span>
                                    {renderStars(review.rating)}
                                  </div>
                                  <p className="text-sm text-gray-600">{review.reviewText}</p>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="response" className="text-gray-700">
                                    Your Response
                                  </Label>
                                  <Textarea
                                    id="response"
                                    placeholder="Thank you for your review..."
                                    value={responseText}
                                    onChange={(e) => setResponseText(e.target.value)}
                                    rows={4}
                                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  onClick={() => handleSubmitResponse(review.id)}
                                  disabled={!responseText.trim()}
                                  className="bg-orange-600 hover:bg-orange-700 text-white"
                                >
                                  Submit Response
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredReviews.length === 0 && (
              <Card className="border-orange-200 bg-white">
                <CardContent className="py-12 text-center">
                  <div className="text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No reviews found</h3>
                    <p className="text-sm">Try adjusting your filters</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Review Stats */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Review Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{mockReviewStats.averageRating}</div>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {renderStars(Math.round(mockReviewStats.averageRating))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{mockReviewStats.totalReviews} total reviews</p>
                </div>

                <Separator className="bg-orange-100" />

                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="flex items-center gap-1 w-12">
                        <span className="text-sm font-medium text-gray-700">{rating}</span>
                        <Star className="w-3 h-3 fill-orange-400 text-orange-400" />
                      </div>
                      <Progress
                        value={
                          (mockReviewStats.ratingDistribution[
                            rating as keyof typeof mockReviewStats.ratingDistribution
                          ] /
                            mockReviewStats.totalReviews) *
                          100
                        }
                        className="flex-1 [&>div]:bg-orange-600"
                      />
                      <span className="text-sm text-gray-600 w-8 text-right">
                        {mockReviewStats.ratingDistribution[rating as keyof typeof mockReviewStats.ratingDistribution]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Rate</span>
                  <span className="font-semibold text-gray-900">{mockReviewStats.responseRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verified Reviews</span>
                  <span className="font-semibold text-gray-900">{mockReviewStats.verifiedReviews}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending Responses</span>
                  <span className="font-semibold text-orange-600">{mockReviews.filter((r) => !r.response).length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => router.push(`/vendor/services/${serviceId}`)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Back to Service
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                >
                  Export Reviews
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
