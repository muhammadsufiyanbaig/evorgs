"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Flag,
  Eye,
  ThumbsUp,
  MessageSquare,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  ExternalLink,
} from "lucide-react"
import type { Review } from "@/utils/interfaces"

interface ReviewDetailViewProps {
  review: Review
  onEdit: () => void
  onDelete: () => void
  onVerify: () => void
  onUnverify: () => void
  onPublish: () => void
  onUnpublish: () => void
  onFlag: () => void
  onRespond: () => void
}

export function ReviewDetailView({
  review,
  onEdit,
  onDelete,
  onVerify,
  onUnverify,
  onPublish,
  onUnpublish,
  onFlag,
  onRespond,
}: ReviewDetailViewProps) {
  const [activeTab, setActiveTab] = useState("details")

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
          />
        ))}
        <span className="ml-2 text-sm font-medium">{rating}/5</span>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Review Details</h1>
            {getStatusBadge(review)}
          </div>
          <p className="text-muted-foreground">Review ID: {review.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={onFlag}>
            <Flag className="mr-2 h-4 w-4" />
            Flag
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="user">User Info</TabsTrigger>
          <TabsTrigger value="vendor">Vendor Info</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          {/* Review Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Review Content</span>
                <div className="flex items-center gap-4">
                  {renderStars(review.rating)}
                  <Badge variant="outline" className="capitalize">
                    {review.serviceType.toLowerCase()}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <p className="text-foreground leading-relaxed">{review.comment}</p>
              </div>

              {review.serviceAspects && (
                <div className="space-y-3">
                  <h4 className="font-medium text-foreground">Service Aspects</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(review.serviceAspects.venue || {}).map(([aspect, rating]) => (
                      <div key={aspect} className="flex items-center justify-between">
                        <span className="text-sm capitalize text-muted-foreground">
                          {aspect.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${star <= (rating as number) ? "fill-primary text-primary" : "text-muted-foreground"}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Created: {formatDate(review.createdAt)}</span>
                </div>
                {review.updatedAt !== review.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Updated: {formatDate(review.updatedAt)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Engagement Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{review.viewsCount || 0}</p>
                    <p className="text-xs text-muted-foreground">Views</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{review.likesCount || 0}</p>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{review.flaggedCount || 0}</p>
                    <p className="text-xs text-muted-foreground">Flags</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{review.response ? 1 : 0}</p>
                    <p className="text-xs text-muted-foreground">Responses</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Response */}
          {review.response ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Vendor Response
                </CardTitle>
                <CardDescription>Response from {review.vendor?.vendorName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">{review.response.responseText}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>Responded: {formatDate(review.response.createdAt)}</span>
                  {review.response.templateType && (
                    <Badge variant="outline" className="capitalize">
                      {review.response.templateType.toLowerCase().replace("_", " ")}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="font-medium text-foreground">No Response Yet</h3>
                    <p className="text-sm text-muted-foreground">This review hasn't been responded to by the vendor.</p>
                  </div>
                  <Button onClick={onRespond} className="mt-4">
                    Add Response
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Moderation Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {review.isVerified ? (
                  <Button variant="outline" onClick={onUnverify}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Unverify
                  </Button>
                ) : (
                  <Button onClick={onVerify}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify
                  </Button>
                )}
                {review.isPublished ? (
                  <Button variant="outline" onClick={onUnpublish}>
                    <XCircle className="mr-2 h-4 w-4" />
                    Unpublish
                  </Button>
                ) : (
                  <Button onClick={onPublish}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Publish
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={review.user?.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">
                    {review.user?.firstName?.[0]}
                    {review.user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-foreground">
                    {review.user?.firstName} {review.user?.lastName}
                  </h3>
                  <div className="flex items-center gap-2">
                    {review.user?.isVerified && (
                      <Badge variant="default" className="text-xs">
                        Verified
                      </Badge>
                    )}
                    <Badge variant={review.user?.isActive ? "default" : "secondary"} className="text-xs">
                      {review.user?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{review.user?.email}</span>
                </div>
                {review.user?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{review.user.phone}</span>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View User Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendor" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={review.vendor?.logo || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg">{review.vendor?.vendorName?.[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-foreground">{review.vendor?.vendorName}</h3>
                  <p className="text-sm text-muted-foreground">{review.vendor?.businessType}</p>
                  <div className="flex items-center gap-2">
                    {review.vendor?.isVerified && (
                      <Badge variant="default" className="text-xs">
                        Verified
                      </Badge>
                    )}
                    <Badge variant={review.vendor?.isActive ? "default" : "secondary"} className="text-xs">
                      {review.vendor?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{review.vendor?.email}</span>
                </div>
                {review.vendor?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{review.vendor.phone}</span>
                  </div>
                )}
              </div>

              {review.vendor?.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="text-sm">
                    <p>{review.vendor.address}</p>
                    {review.vendor.city && review.vendor.state && (
                      <p>
                        {review.vendor.city}, {review.vendor.state}
                      </p>
                    )}
                    {review.vendor.country && <p>{review.vendor.country}</p>}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Vendor Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review History</CardTitle>
              <CardDescription>Timeline of changes and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Review created</p>
                    <p className="text-xs text-muted-foreground">{formatDate(review.createdAt)}</p>
                  </div>
                </div>

                {review.updatedAt !== review.createdAt && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Review updated</p>
                      <p className="text-xs text-muted-foreground">{formatDate(review.updatedAt)}</p>
                    </div>
                  </div>
                )}

                {review.response && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Vendor responded</p>
                      <p className="text-xs text-muted-foreground">{formatDate(review.response.createdAt)}</p>
                    </div>
                  </div>
                )}

                {review.moderatedAt && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Moderated by {review.moderatedBy}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(review.moderatedAt)}</p>
                      {review.moderationNotes && (
                        <p className="text-xs text-muted-foreground italic">"{review.moderationNotes}"</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
