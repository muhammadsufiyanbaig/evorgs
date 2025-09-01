"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Star, MoreHorizontal, Eye, Edit, Trash2, CheckCircle, XCircle, Flag, MessageSquare } from "lucide-react"
import type { Review } from "@/utils/interfaces"

interface ReviewsTableProps {
  reviews: Review[]
  selectedReviews: string[]
  onSelectReview: (reviewId: string) => void
  onSelectAll: (selected: boolean) => void
  onViewReview: (reviewId: string) => void
  onEditReview: (reviewId: string) => void
  onDeleteReview: (reviewId: string) => void
  onVerifyReview: (reviewId: string) => void
  onUnverifyReview: (reviewId: string) => void
  onPublishReview: (reviewId: string) => void
  onUnpublishReview: (reviewId: string) => void
  onFlagReview: (reviewId: string) => void
}

export function ReviewsTable({
  reviews,
  selectedReviews,
  onSelectReview,
  onSelectAll,
  onViewReview,
  onEditReview,
  onDeleteReview,
  onVerifyReview,
  onUnverifyReview,
  onPublishReview,
  onUnpublishReview,
  onFlagReview,
}: ReviewsTableProps) {
  const allSelected = reviews.length > 0 && selectedReviews.length === reviews.length
  const someSelected = selectedReviews.length > 0 && selectedReviews.length < reviews.length

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${star <= rating ? "fill-orange-500 text-orange-500" : "text-orange-200"}`}
          />
        ))}
      </div>
    )
  }

  const getStatusBadge = (review: Review) => {
    if (!review.isPublished) {
      return <Badge className="bg-orange-100 text-orange-800 border-orange-200">Draft</Badge>
    }
    if (review.moderationStatus === "PENDING") {
      return <Badge className="bg-orange-50 text-orange-600 border-orange-300">Pending</Badge>
    }
    if (review.moderationStatus === "FLAGGED") {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Flagged</Badge>
    }
    if (review.moderationStatus === "UNDER_REVIEW") {
      return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Under Review</Badge>
    }
    if (review.isVerified) {
      return <Badge className="bg-orange-500 text-white border-orange-500">Verified</Badge>
    }
    return <Badge className="bg-orange-200 text-orange-800 border-orange-300">Published</Badge>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const truncateText = (text: string, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div className="rounded-md border border-orange-200 bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-orange-50 border-b border-orange-200 hover:bg-orange-100">
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={onSelectAll}
                ref={(el) => {
                  if (el) {
                    const input = el.querySelector('input[type="checkbox"]') as HTMLInputElement
                    if (input) input.indeterminate = someSelected
                  }
                }}
                aria-label="Select all reviews"
                className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
            </TableHead>
            <TableHead className="text-orange-800 font-semibold">Review</TableHead>
            <TableHead className="text-orange-800 font-semibold">Rating</TableHead>
            <TableHead className="text-orange-800 font-semibold">User</TableHead>
            <TableHead className="text-orange-800 font-semibold">Vendor</TableHead>
            <TableHead className="text-orange-800 font-semibold">Service</TableHead>
            <TableHead className="text-orange-800 font-semibold">Status</TableHead>
            <TableHead className="text-orange-800 font-semibold">Date</TableHead>
            <TableHead className="w-16 text-orange-800 font-semibold">Edit</TableHead>
            <TableHead className="w-16 text-orange-800 font-semibold">Remove</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id} className="group bg-white hover:bg-orange-25 border-b border-orange-100">
              <TableCell>
                <Checkbox
                  checked={selectedReviews.includes(review.id)}
                  onCheckedChange={() => onSelectReview(review.id)}
                  aria-label={`Select review ${review.id}`}
                  className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                />
              </TableCell>
              <TableCell className="max-w-xs">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{truncateText(review.comment, 80)}</p>
                  <div className="flex items-center gap-2 text-xs text-orange-600">
                    {review.response && (
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        <span>Has Response</span>
                      </div>
                    )}
                    {review.flaggedCount && review.flaggedCount > 0 && (
                      <div className="flex items-center gap-1 text-red-600">
                        <Flag className="h-3 w-3" />
                        <span>{review.flaggedCount} flags</span>
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>{renderStars(review.rating)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-orange-200">
                    <AvatarImage src={review.user?.profileImage || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs bg-orange-100 text-orange-800">
                      {review.user?.firstName?.[0]}
                      {review.user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {review.user?.firstName} {review.user?.lastName}
                    </p>
                    <p className="text-xs text-orange-600">{review.user?.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8 border-2 border-orange-200">
                    <AvatarImage src={review.vendor?.logo || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs bg-orange-100 text-orange-800">{review.vendor?.vendorName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{review.vendor?.vendorName}</p>
                    <p className="text-xs text-orange-600">{review.vendor?.businessType}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className="bg-orange-100 text-orange-800 border-orange-200 capitalize">
                  {review.serviceType.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell>{getStatusBadge(review)}</TableCell>
              <TableCell className="text-sm text-orange-600">{formatDate(review.createdAt)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditReview(review.id)}
                  className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-100"
                  title="Edit review"
                >
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit review</span>
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteReview(review.id)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
                  title="Delete review"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete review</span>
                </Button>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-orange-600 hover:text-orange-700 hover:bg-orange-100">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white border-orange-200">
                    <DropdownMenuLabel className="text-orange-800">Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onViewReview(review.id)} className="text-gray-700 hover:bg-orange-50 hover:text-orange-700">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-orange-200" />
                    {review.isVerified ? (
                      <DropdownMenuItem onClick={() => onUnverifyReview(review.id)} className="text-gray-700 hover:bg-orange-50 hover:text-orange-700">
                        <XCircle className="mr-2 h-4 w-4" />
                        Unverify
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onVerifyReview(review.id)} className="text-gray-700 hover:bg-orange-50 hover:text-orange-700">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verify
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="bg-orange-200" />
                    <DropdownMenuItem onClick={() => onFlagReview(review.id)} className="text-gray-700 hover:bg-orange-50 hover:text-orange-700">
                      <Flag className="mr-2 h-4 w-4" />
                      Flag for Review
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteReview(review.id)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Permanently
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
