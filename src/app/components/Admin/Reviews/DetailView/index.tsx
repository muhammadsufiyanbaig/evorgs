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
            className={`h-4 w-4 ${star <= rating ? "fill-orange-500 text-orange-500" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-orange-600">{rating}/5</span>
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
      return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Draft</Badge>
    }
    if (review.moderationStatus === "PENDING") {
      return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Pending</Badge>
    }
    if (review.moderationStatus === "FLAGGED") {
      return <Badge className="bg-red-100 text-red-700 border-red-200">Flagged</Badge>
    }
    if (review.moderationStatus === "UNDER_REVIEW") {
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Under Review</Badge>
    }
    if (review.isVerified) {
      return <Badge className="bg-orange-500 text-white">Verified</Badge>
    }
    return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Published</Badge>
  }

  return (
    <div className="space-y-6 bg-white min-h-screen p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-orange-600">Review Details</h1>
            {getStatusBadge(review)}
          </div>
          <p className="text-gray-600">Review ID: {review.id}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onEdit}
            className="border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onFlag}
            className="border-orange-200 text-orange-600 hover:bg-orange-50"
          >
            <Flag className="mr-2 h-4 w-4" />
            Flag
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-orange-50 border-orange-200">
          <TabsTrigger value="details" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-600">Details</TabsTrigger>
          <TabsTrigger value="user" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-600">User Info</TabsTrigger>
          <TabsTrigger value="vendor" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-600">Vendor Info</TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white text-orange-600">History</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          {/* Review Content */}
          <Card className="border-orange-100 bg-white">
            <CardHeader className="border-b border-orange-50">
              <CardTitle className="flex items-center justify-between text-orange-600">
                <span>Review Content</span>
                <div className="flex items-center gap-4">
                  {renderStars(review.rating)}
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 capitalize">
                    {review.serviceType.toLowerCase()}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>

              {review.serviceAspects && (
                <div className="space-y-3">
                  <h4 className="font-medium text-orange-600">Service Aspects</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(review.serviceAspects.venue || {}).map(([aspect, rating]) => (
                      <div key={aspect} className="flex items-center justify-between">
                        <span className="text-sm capitalize text-gray-600">
                          {aspect.replace(/([A-Z])/g, " $1").toLowerCase()}
                        </span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${star <= (rating as number) ? "fill-orange-500 text-orange-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <span>Created: {formatDate(review.createdAt)}</span>
                </div>
                {review.updatedAt !== review.createdAt && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-orange-500" />
                    <span>Updated: {formatDate(review.updatedAt)}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Engagement Stats */}
          <Card className="border-orange-100 bg-white">
            <CardHeader className="border-b border-orange-50">
              <CardTitle className="text-orange-600">Engagement</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{review.viewsCount || 0}</p>
                    <p className="text-xs text-gray-500">Views</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{review.likesCount || 0}</p>
                    <p className="text-xs text-gray-500">Likes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{review.flaggedCount || 0}</p>
                    <p className="text-xs text-gray-500">Flags</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">{review.response ? 1 : 0}</p>
                    <p className="text-xs text-gray-500">Responses</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vendor Response */}
          {review.response ? (
            <Card className="border-orange-100 bg-white">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="flex items-center gap-2 text-orange-600">
                  <MessageSquare className="h-5 w-5" />
                  Vendor Response
                </CardTitle>
                <CardDescription className="text-gray-600">Response from {review.vendor?.vendorName}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <p className="text-gray-700 leading-relaxed">{review.response.responseText}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Responded: {formatDate(review.response.createdAt)}</span>
                  {review.response.templateType && (
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200 capitalize">
                      {review.response.templateType.toLowerCase().replace("_", " ")}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-orange-100 bg-white">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <MessageSquare className="h-12 w-12 text-orange-300 mx-auto" />
                  <div>
                    <h3 className="font-medium text-orange-600">No Response Yet</h3>
                    <p className="text-sm text-gray-600">This review hasn't been responded to by the vendor.</p>
                  </div>
                  <Button 
                    onClick={onRespond} 
                    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Add Response
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card className="border-orange-100 bg-white">
            <CardHeader className="border-b border-orange-50">
              <CardTitle className="text-orange-600">Moderation Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2">
                {review.isVerified ? (
                  <Button 
                    variant="outline" 
                    onClick={onUnverify}
                    className="border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Unverify
                  </Button>
                ) : (
                  <Button 
                    onClick={onVerify}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify
                  </Button>
                )}
                {review.isPublished ? (
                  <Button 
                    variant="outline" 
                    onClick={onUnpublish}
                    className="border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Unpublish
                  </Button>
                ) : (
                  <Button 
                    onClick={onPublish}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Publish
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user" className="space-y-6">
          <Card className="border-orange-100 bg-white">
            <CardHeader className="border-b border-orange-50">
              <CardTitle className="text-orange-600">User Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-orange-200">
                  <AvatarImage src={review.user?.profileImage || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg bg-orange-100 text-orange-600">
                    {review.user?.firstName?.[0]}
                    {review.user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-orange-600">
                    {review.user?.firstName} {review.user?.lastName}
                  </h3>
                  <div className="flex items-center gap-2">
                    {review.user?.isVerified && (
                      <Badge className="bg-orange-500 text-white text-xs">
                        Verified
                      </Badge>
                    )}
                    <Badge className={`text-xs ${review.user?.isActive ? "bg-orange-100 text-orange-700 border-orange-200" : "bg-gray-100 text-gray-600 border-gray-200"}`}>
                      {review.user?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="bg-orange-100" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-700">{review.user?.email}</span>
                </div>
                {review.user?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-700">{review.user.phone}</span>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View User Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendor" className="space-y-6">
          <Card className="border-orange-100 bg-white">
            <CardHeader className="border-b border-orange-50">
              <CardTitle className="text-orange-600">Vendor Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-orange-200">
                  <AvatarImage src={review.vendor?.logo || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg bg-orange-100 text-orange-600">{review.vendor?.vendorName?.[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-orange-600">{review.vendor?.vendorName}</h3>
                  <p className="text-sm text-gray-600">{review.vendor?.businessType}</p>
                  <div className="flex items-center gap-2">
                    {review.vendor?.isVerified && (
                      <Badge className="bg-orange-500 text-white text-xs">
                        Verified
                      </Badge>
                    )}
                    <Badge className={`text-xs ${review.vendor?.isActive ? "bg-orange-100 text-orange-700 border-orange-200" : "bg-gray-100 text-gray-600 border-gray-200"}`}>
                      {review.vendor?.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="bg-orange-100" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-700">{review.vendor?.email}</span>
                </div>
                {review.vendor?.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-700">{review.vendor.phone}</span>
                  </div>
                )}
              </div>

              {review.vendor?.address && (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-orange-500 mt-0.5" />
                  <div className="text-sm text-gray-700">
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
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-orange-200 text-orange-600 hover:bg-orange-50"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View Vendor Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="border-orange-100 bg-white">
            <CardHeader className="border-b border-orange-50">
              <CardTitle className="text-orange-600">Review History</CardTitle>
              <CardDescription className="text-gray-600">Timeline of changes and actions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">Review created</p>
                    <p className="text-xs text-gray-500">{formatDate(review.createdAt)}</p>
                  </div>
                </div>

                {review.updatedAt !== review.createdAt && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-300 rounded-full mt-2"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700">Review updated</p>
                      <p className="text-xs text-gray-500">{formatDate(review.updatedAt)}</p>
                    </div>
                  </div>
                )}

                {review.response && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700">Vendor responded</p>
                      <p className="text-xs text-gray-500">{formatDate(review.response.createdAt)}</p>
                    </div>
                  </div>
                )}

                {review.moderatedAt && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-700">Moderated by {review.moderatedBy}</p>
                      <p className="text-xs text-gray-500">{formatDate(review.moderatedAt)}</p>
                      {review.moderationNotes && (
                        <p className="text-xs text-gray-500 italic">"{review.moderationNotes}"</p>
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
