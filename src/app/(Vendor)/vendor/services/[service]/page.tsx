"use client"

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useEffect } from "react"
import { useVendorCatering } from "@/hooks/useGraphQLServices"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Building,
  Home,
  ChefHat,
  Camera,
  Edit,
  MapPin,
  Users,
  Star,
  Calendar as CalendarIcon,
  MessageSquare,
  DollarSign,
  Clock,
  Eye,
  CheckCircle,
} from "lucide-react"

export default function ServiceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const serviceId = params.service as string

  const [selectedImage, setSelectedImage] = useState(0)
  const [date, setDate] = useState<Date | undefined>(new Date())
  
  // GraphQL Hook Integration
  const { getPackageDetails, togglePackageStatus, deletePackage, loading, data } = useVendorCatering()
  const [cateringPackage, setCateringPackage] = useState<any>(null)

  // Load package details on mount
  useEffect(() => {
    if (serviceId) {
      console.log('🔄 Loading package details for ID:', serviceId)
      getPackageDetails(serviceId)
    }
  }, [serviceId])

  // Update local state when GraphQL data changes
  useEffect(() => {
    if (data?.package) {
      console.log('✅ Package details loaded:', data.package)
      setCateringPackage(data.package)
    }
  }, [data])

  // Handle toggle status
  const handleToggleStatus = async () => {
    try {
      await togglePackageStatus(serviceId)
      toast({
        title: "Success",
        description: "Package status updated successfully",
      })
      // Reload package details
      getPackageDetails(serviceId)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update package status",
        variant: "destructive",
      })
    }
  }

  // Handle delete
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this package?")) return
    
    try {
      await deletePackage(serviceId)
      toast({
        title: "Success",
        description: "Package deleted successfully",
      })
      router.push("/vendor/services")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete package",
        variant: "destructive",
      })
    }
  }

  // Show loading state
  if (loading && !cateringPackage) {
    return (
      <div className="min-h-screen bg-orange-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
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
          </div>
          <Card className="border-orange-200 bg-white">
            <CardContent className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading package details...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Show not found state
  if (!loading && !cateringPackage) {
    return (
      <div className="min-h-screen bg-orange-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
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
          </div>
          <Card className="border-orange-200 bg-white">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">Package not found.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Transform package data for display
  const mockService = cateringPackage ? {
    type: 'catering',
    name: cateringPackage.packageName,
    description: cateringPackage.description,
    imageUrl: cateringPackage.images || ['/placeholder.svg'],
    isAvailable: cateringPackage.isActive,
    rating: cateringPackage.rating || 0,
    reviewCount: cateringPackage.reviewCount || 0,
    price: cateringPackage.pricePerPerson,
    minGuests: cateringPackage.minGuests,
    maxGuests: cateringPackage.maxGuests,
    menuItems: cateringPackage.menuItems || [],
    dietaryOptions: cateringPackage.dietaryOptions || [],
    serviceArea: cateringPackage.serviceArea || [],
    amenities: cateringPackage.amenities || [],
    tags: [], // Not in GraphQL schema yet
  } : null

  const mockReviews: any[] = [] // TODO: Implement reviews fetching
  const mockAvailability = {
    bookedDates: [],
    availableDates: [],
  }

  if (!mockService) {
    return null
  }

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
                  {mockService.imageUrl.map((image: any, index: number) => (
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
                        <span className="text-sm text-gray-600">
                          {mockService.serviceArea?.join(', ') || 'Service area not specified'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-600">${mockService.price}/person</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-600">
                          {mockService.minGuests}-{mockService.maxGuests} guests
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
                        <Switch 
                          checked={mockService.isAvailable} 
                          onCheckedChange={handleToggleStatus}
                          className="data-[state=checked]:bg-orange-600" 
                        />
                      </div>
                      <div className="text-xs text-gray-500">
                        Last updated: {cateringPackage.updatedAt ? new Date(cateringPackage.updatedAt).toLocaleDateString() : 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {mockService.tags.map((tag: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
                      <Badge key={index} variant="outline" className="border-orange-200 text-orange-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Amenities & Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {mockService.amenities.map((amenity: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: Key | null | undefined) => (
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
                          .map((n: any[]) => n[0])
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
                          {review.images.map((image: any, index: number) => (
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
                    {mockService.minGuests}-{mockService.maxGuests} guests
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
