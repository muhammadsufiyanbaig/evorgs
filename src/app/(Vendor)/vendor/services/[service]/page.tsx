"use client"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import {
  Star,
  Edit,
  ArrowLeft,
  MapPin,
  Users,
  Camera,
  ChefHat,
  Home,
  Building,
  CheckCircle,
  CalendarIcon,
  DollarSign,
  MessageSquare,
} from "lucide-react"

// Mock service data
const mockService = {
  id: "venue1",
  type: "venue" as const,
  name: "Grand Ballroom",
  location: "Downtown Convention Center, New York",
  description:
    "Elegant ballroom perfect for weddings and corporate events with stunning chandeliers and marble floors. This magnificent venue offers a timeless setting for your special occasions with its classic architecture and modern amenities.",
  imageUrl: [
    "/placeholder.svg?height=400&width=600&text=Grand+Ballroom+Main",
    "/placeholder.svg?height=300&width=400&text=Ballroom+Interior",
    "/placeholder.svg?height=300&width=400&text=Chandelier+Detail",
    "/placeholder.svg?height=300&width=400&text=Dance+Floor",
  ],
  price: "$2,500",
  tags: ["Wedding", "Corporate", "Elegant", "Indoor"],
  amenities: [
    "Air Conditioning",
    "Sound System",
    "Professional Lighting",
    "Catering Kitchen",
    "Valet Parking",
    "Bridal Suite",
    "Dance Floor",
    "Stage Area",
  ],
  minPersonLimit: 50,
  maxPersonLimit: 300,
  isAvailable: true,
  rating: 4.8,
  reviewCount: 45,
  createdAt: "2024-01-01T00:00:00Z",
  updatedAt: "2024-01-15T00:00:00Z",
}

const mockReviews = [
  {
    id: "1",
    userName: "Sarah Johnson",
    userAvatar: "/placeholder-user.jpg",
    rating: 5,
    reviewText:
      "Absolutely stunning venue! The Grand Ballroom exceeded all our expectations for our wedding. The staff was incredibly helpful and the decorations were perfect. Our guests are still talking about how beautiful everything was.",
    createdAt: "2024-01-15T10:30:00Z",
    isVerified: true,
    images: ["/placeholder.svg?height=100&width=100&text=Wedding+Photo"],
  },
  {
    id: "2",
    userName: "Michael Chen",
    userAvatar: "/placeholder-user.jpg",
    rating: 4,
    reviewText:
      "Great venue for our corporate gala. Professional service and beautiful ambiance. The sound system was excellent and the lighting created the perfect atmosphere. Would definitely recommend for business events.",
    createdAt: "2024-01-12T14:20:00Z",
    isVerified: false,
    images: [],
  },
  {
    id: "3",
    userName: "Emily Rodriguez",
    userAvatar: "/placeholder-user.jpg",
    rating: 5,
    reviewText:
      "Perfect venue for our anniversary celebration. The chandeliers are breathtaking and the dance floor was spacious. The bridal suite was a nice touch for getting ready. Highly recommend!",
    createdAt: "2024-01-10T16:45:00Z",
    isVerified: true,
    images: [],
  },
]

const mockAvailability = {
  bookedDates: [new Date(2024, 1, 14), new Date(2024, 1, 21), new Date(2024, 1, 28)],
  availableDates: [new Date(2024, 1, 7), new Date(2024, 1, 15), new Date(2024, 1, 22)],
}

export default function ServiceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.id as string

  const [selectedImage, setSelectedImage] = useState(0)
  const [date, setDate] = useState<Date | undefined>(new Date())

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "venue":
        return <Building className="w-6 h-6" />
      case "farmhouse":
        return <Home className="w-6 h-6" />
      case "catering":
        return <ChefHat className="w-6 h-6" />
      case "photography":
        return <Camera className="w-6 h-6" />
      default:
        return <Building className="w-6 h-6" />
    }
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
            onClick={() => router.push("/vendor/services")}
            className="border-orange-200 text-orange-700 hover:bg-orange-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Services
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white">
              {getServiceIcon(mockService.type)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{mockService.name}</h1>
              <p className="text-orange-600 capitalize">{mockService.type} Service</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="border-orange-200 bg-white overflow-hidden">
              <div className="relative">
                <img
                  src={mockService.imageUrl[selectedImage] || "/placeholder.svg"}
                  alt={mockService.name}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={mockService.isAvailable ? "default" : "secondary"}
                    className={mockService.isAvailable ? "bg-green-600 text-white" : "bg-gray-500 text-white"}
                  >
                    {mockService.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {mockService.imageUrl.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`${mockService.name} ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                        selectedImage === index ? "border-orange-400" : "border-gray-200"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
            </Card>

            {/* Service Details */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-gray-900">Service Details</CardTitle>
                  <Button
                    onClick={() => router.push(`/vendor/services/${serviceId}/edit`)}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Service
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{mockService.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Basic Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-600">{mockService.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-600">{mockService.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-600">
                          {mockService.minPersonLimit}-{mockService.maxPersonLimit} guests
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-orange-600" />
                        <div className="flex items-center gap-1">
                          {renderStars(Math.round(mockService.rating))}
                          <span className="text-sm text-gray-600">
                            {mockService.rating} ({mockService.reviewCount} reviews)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Availability Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Service Available</span>
                        <Switch checked={mockService.isAvailable} className="data-[state=checked]:bg-orange-600" />
                      </div>
                      <div className="text-xs text-gray-500">
                        Last updated: {new Date(mockService.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockService.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="border-orange-200 text-orange-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Amenities & Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {mockService.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-900">Recent Reviews</CardTitle>
                    <CardDescription className="text-gray-600">Latest customer feedback</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => router.push(`/vendor/services/${serviceId}/reviews`)}
                    className="border-orange-200 text-orange-700 hover:bg-orange-50"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View All Reviews
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockReviews.slice(0, 3).map((review) => (
                  <div key={review.id} className="flex items-start gap-4 p-4 border border-orange-100 rounded-lg">
                    <Avatar>
                      <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-orange-100 text-orange-700">
                        {review.userName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{review.userName}</span>
                          {review.isVerified && <CheckCircle className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="flex items-center gap-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review.reviewText}</p>
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image || "/placeholder.svg"}
                              alt={`Review image ${index + 1}`}
                              className="w-16 h-16 object-cover rounded-lg border border-orange-200"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Reviews</span>
                  <span className="font-semibold text-gray-900">{mockService.reviewCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Rating</span>
                  <span className="font-semibold text-gray-900">{mockService.rating}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Capacity</span>
                  <span className="font-semibold text-gray-900">
                    {mockService.minPersonLimit}-{mockService.maxPersonLimit}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge
                    variant={mockService.isAvailable ? "default" : "secondary"}
                    className={mockService.isAvailable ? "bg-green-600 text-white" : "bg-gray-500 text-white"}
                  >
                    {mockService.isAvailable ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Availability Calendar */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5" />
                  Availability Calendar
                </CardTitle>
                <CardDescription className="text-gray-600">Manage your service availability</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border border-orange-200"
                  modifiers={{
                    booked: mockAvailability.bookedDates,
                    available: mockAvailability.availableDates,
                  }}
                  modifiersStyles={{
                    booked: { backgroundColor: "#ef4444", color: "white" },
                    available: { backgroundColor: "#22c55e", color: "white" },
                  }}
                />
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span className="text-gray-600">Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-gray-600">Available</span>
                  </div>
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
                  onClick={() => router.push(`/vendor/services/${serviceId}/edit`)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Service
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/vendor/services/${serviceId}/reviews`)}
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Manage Reviews
                </Button>
                <Button
                  onClick={() => router.push(`/vendor/services/${serviceId}/availability`)}
                  variant="outline"
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Manage Availability
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
