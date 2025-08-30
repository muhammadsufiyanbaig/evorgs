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
            className={`h-3 w-3 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
          />
        ))}
      </div>
    )
  }

  const getStatusBadge = (review: Review) => {
    if (!review.isPublished) {
      return <Badge variant="secondary">Draft</Badge>
    }
    if (review.moderationStatus === "PENDING") {
      return <Badge variant="outline">Pending</Badge>
    }
    if (review.moderationStatus === "FLAGGED") {
      return <Badge variant="destructive">Flagged</Badge>
    }
    if (review.moderationStatus === "UNDER_REVIEW") {
      return <Badge variant="secondary">Under Review</Badge>
    }
    if (review.isVerified) {
      return <Badge variant="default">Verified</Badge>
    }
    return <Badge variant="secondary">Published</Badge>
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
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
              />
            </TableHead>
            <TableHead>Review</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="w-16">Edit</TableHead>
            <TableHead className="w-16">Remove</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id} className="group">
              <TableCell>
                <Checkbox
                  checked={selectedReviews.includes(review.id)}
                  onCheckedChange={() => onSelectReview(review.id)}
                  aria-label={`Select review ${review.id}`}
                />
              </TableCell>
              <TableCell className="max-w-xs">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-foreground line-clamp-2">{truncateText(review.comment, 80)}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.user?.profileImage || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">
                      {review.user?.firstName?.[0]}
                      {review.user?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {review.user?.firstName} {review.user?.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">{review.user?.email}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={review.vendor?.logo || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{review.vendor?.vendorName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{review.vendor?.vendorName}</p>
                    <p className="text-xs text-muted-foreground">{review.vendor?.businessType}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {review.serviceType.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell>{getStatusBadge(review)}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{formatDate(review.createdAt)}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditReview(review.id)}
                  className="h-8 w-8 p-0 text-primary hover:text-primary hover:bg-primary/10"
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
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                  title="Delete review"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete review</span>
                </Button>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onViewReview(review.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {review.isVerified ? (
                      <DropdownMenuItem onClick={() => onUnverifyReview(review.id)}>
                        <XCircle className="mr-2 h-4 w-4" />
                        Unverify
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem onClick={() => onVerifyReview(review.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verify
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onFlagReview(review.id)}>
                      <Flag className="mr-2 h-4 w-4" />
                      Flag for Review
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDeleteReview(review.id)}
                      className="text-destructive focus:text-destructive"
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
