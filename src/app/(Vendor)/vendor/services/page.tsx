"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Star,
  Plus,
  Edit,
  Eye,
  MapPin,
  Users,
  Camera,
  ChefHat,
  Home,
  Building,
  MoreHorizontal,
  ImageIcon,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Service type definitions based on schema
type ServiceType = "venue" | "farmhouse" | "catering" | "photography"

interface BaseService {
  id: string
  name: string
  description: string
  imageUrl: string[]
  isAvailable: boolean
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

interface VenueService extends BaseService {
  type: "venue"
  location: string
  price: string
  tags: string[]
  amenities: string[]
  minPersonLimit: number
  maxPersonLimit: number
}

interface FarmhouseService extends BaseService {
  type: "farmhouse"
  location: string
  perNightPrice: number
  minNights: number
  maxNights: number
  maxGuests: number
  amenities: string[]
}

interface CateringService extends BaseService {
  type: "catering"
  packageName: string
  serviceArea: string[]
  price: number
  minGuests: number
  maxGuests: number
  menuItems: string[]
  dietaryOptions: string[]
  amenities: string[]
}

interface PhotographyService extends BaseService {
  type: "photography"
  packageName: string
  serviceArea: string[]
  price: number
  duration: number
  photographerCount: number
  deliverables: string[]
  amenities: string[]
}

type Service = VenueService | FarmhouseService | CateringService | PhotographyService

// TODO: Replace with GraphQL data from useQuery
const mockServices: Service[] = []

// TODO: Replace with GraphQL data from useQuery  
const mockRecentReviews: any[] = []

export default function ServicesPage() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("services")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredServices = mockServices.filter((service) => {
    const matchesType = filterType === "all" || service.type === filterType
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "available" && service.isAvailable) ||
      (filterStatus === "unavailable" && !service.isAvailable)
    const matchesSearch =
      searchQuery === "" ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesType && matchesStatus && matchesSearch
  })

  const getServiceIcon = (type: ServiceType) => {
    switch (type) {
      case "venue":
        return <Building className="w-5 h-5" />
      case "farmhouse":
        return <Home className="w-5 h-5" />
      case "catering":
        return <ChefHat className="w-5 h-5" />
      case "photography":
        return <Camera className="w-5 h-5" />
    }
  }

  const getServiceTypeColor = (type: ServiceType) => {
    switch (type) {
      case "venue":
        return "bg-blue-100 text-blue-800"
      case "farmhouse":
        return "bg-green-100 text-green-800"
      case "catering":
        return "bg-purple-100 text-purple-800"
      case "photography":
        return "bg-pink-100 text-pink-800"
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

  const formatPrice = (service: Service) => {
    switch (service.type) {
      case "venue":
        return service.price
      case "farmhouse":
        return `$${service.perNightPrice}/night`
      case "catering":
        return `$${service.price}/person`
      case "photography":
        return `$${service.price}`
    }
  }

  const getCapacityInfo = (service: Service) => {
    switch (service.type) {
      case "venue":
        return `${service.minPersonLimit}-${service.maxPersonLimit} guests`
      case "farmhouse":
        return `Up to ${service.maxGuests} guests`
      case "catering":
        return `${service.minGuests}-${service.maxGuests} guests`
      case "photography":
        return `${service.duration} hours`
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
            <p className="text-gray-600 mt-1">Manage your services and monitor their performance</p>
          </div>
          <Button
            onClick={() => router.push("/vendor/services/create")}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-[300px] bg-white border border-orange-200">
            <TabsTrigger value="services" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              My Services
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Recent Reviews
            </TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            {/* Filters */}
            <Card className="border-orange-200 bg-white">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Input
                        placeholder="Search services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[140px] border-orange-200">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="venue">Venues</SelectItem>
                      <SelectItem value="farmhouse">Farmhouses</SelectItem>
                      <SelectItem value="catering">Catering</SelectItem>
                      <SelectItem value="photography">Photography</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[140px] border-orange-200">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => (
                <Card key={service.id} className="border-orange-200 bg-white overflow-hidden">
                  <div className="relative">
                    <img
                      src={service.imageUrl[0] || "/placeholder.svg"}
                      alt={service.name}
                      className="w-full h-48 object-cover cursor-pointer"
                      onClick={() => router.push(`/vendor/services/${service.id}`)}
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={`${getServiceTypeColor(service.type)} capitalize`}>
                        <div className="flex items-center gap-1">
                          {getServiceIcon(service.type)}
                          {service.type}
                        </div>
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant={service.isAvailable ? "default" : "secondary"}
                        className={service.isAvailable ? "bg-green-600 text-white" : "bg-gray-500 text-white"}
                      >
                        {service.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3
                          className="font-semibold text-gray-900 line-clamp-1 cursor-pointer hover:text-orange-600"
                          onClick={() => router.push(`/vendor/services/${service.id}`)}
                        >
                          {service.name}
                        </h3>
                        {(service.type === "venue" || service.type === "farmhouse") && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">{service.location}</span>
                          </div>
                        )}
                        {(service.type === "catering" || service.type === "photography") && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">{service.serviceArea.join(", ")}</span>
                          </div>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-orange-600">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/vendor/services/${service.id}`)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/vendor/services/${service.id}/edit`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Service
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/vendor/services/${service.id}/reviews`)}>
                            <Star className="w-4 h-4 mr-2" />
                            View Reviews
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2">{service.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {renderStars(Math.round(service.rating))}
                        <span className="text-sm text-gray-600">
                          {service.rating} ({service.reviewCount})
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-orange-600">{formatPrice(service)}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {getCapacityInfo(service)}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {service.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-orange-200 text-orange-700">
                          {amenity}
                        </Badge>
                      ))}
                      {service.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                          +{service.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <Separator className="bg-orange-100" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Switch checked={service.isAvailable} className="data-[state=checked]:bg-orange-600" />
                        <span className="text-sm text-gray-600">Available</span>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                        onClick={() => router.push(`/vendor/services/${service.id}`)}
                      >
                        View Details
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredServices.length === 0 && (
              <Card className="border-orange-200 bg-white">
                <CardContent className="py-12 text-center">
                  <div className="text-gray-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No services found</h3>
                    <p className="text-sm">Try adjusting your filters or create a new service</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Recent Reviews</CardTitle>
                <CardDescription className="text-gray-600">
                  Latest customer feedback across all services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockRecentReviews.map((review) => (
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
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="text-xs border-orange-200 text-orange-700 cursor-pointer hover:bg-orange-50"
                          onClick={() => router.push(`/vendor/services/${review.serviceId}/reviews`)}
                        >
                          {review.serviceName}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                          onClick={() => router.push(`/vendor/services/${review.serviceId}/reviews`)}
                        >
                          View All Reviews
                          <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
