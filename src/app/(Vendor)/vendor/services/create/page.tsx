"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useVendorCatering } from "@/hooks/useGraphQLServices"
import { useVendorFarmhouse } from "@/hooks/useGraphQLFarmhouse"
import { useVendorVenue } from "@/hooks/useGraphQLVenue"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Building, Home, ChefHat, Camera, Upload, X, AlertCircle } from "lucide-react"
import { AuthDebugPanel } from "@/components/AuthDebugPanel"

type ServiceType = "venue" | "farmhouse" | "catering" | "photography"

// Mock implementation of useServiceCreation hook (kept for non-catering services)
function useServiceCreation({ serviceType, onSuccess, onError }: {
  serviceType: ServiceType
  onSuccess: () => void
  onError: (errorMessage: string) => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createService = async (data: any) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock success response
      console.log('Service created:', { serviceType, data })
      onSuccess()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create service'
      setError(errorMessage)
      onError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => setError(null)

  return { createService, isLoading, error, clearError }
}

export default function CreateServicePage() {
  const router = useRouter()
  const { toast } = useToast()
  const auth = useAuth()
  const [serviceType, setServiceType] = useState<ServiceType>("catering")
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    serviceArea: "",
    description: "",
    price: "",
    perNightPrice: "",
    perDayPrice: "",
    pricePerPerson: "",
    packagePrice: "",
    minPersonLimit: "",
    maxPersonLimit: "",
    minGuests: "",
    maxGuests: "",
    maxGuestsLimit: "",
    minNights: "",
    maxNights: "",
    duration: "",
    photographerCount: "",
    tags: "",
    amenities: "",
    activities: "",
    numberOfRooms: "",
    numberOfBathrooms: "",
    maxOccupancy: "",
    farmHouseType: "",
    menuItems: "",
    dietaryOptions: "",
    deliverables: "",
    isAvailable: true,
  })

  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  
  // GraphQL Hooks for Catering, Farmhouse, and Venue
  const { createPackage, loading: cateringLoading } = useVendorCatering()
  const { createFarmhouse, loading: farmhouseLoading } = useVendorFarmhouse()
  const { createVenue, loading: venueLoading } = useVendorVenue()

  // Mock hook for other service types (kept for future implementation)
  const { createService, isLoading, error, clearError } = useServiceCreation({
    serviceType,
    onSuccess: () => {
      toast({
        title: "Success!",
        description: `${serviceType} service created successfully.`,
      })
      router.push("/vendor/services")
    },
    onError: (errorMessage: string) => {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    },
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

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) clearError()
  }

  const handleImageUpload = () => {
    // Simulate image upload
    const newImage = `/placeholder.svg?height=200&width=300&text=Service+Image+${uploadedImages.length + 1}`
    setUploadedImages((prev) => [...prev, newImage])
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const transformVenueData = (data: typeof formData) => ({
    ...data,
    images: uploadedImages
  })

  const transformCateringData = (data: typeof formData) => ({
    ...data,
    images: uploadedImages
  })

  const transformPhotographyData = (data: typeof formData) => ({
    ...data,
    images: uploadedImages
  })

  const transformFarmhouseData = (data: typeof formData) => ({
    ...data,
    images: uploadedImages
  })

  const handleSubmit = async () => {
    console.log('🚀 handleSubmit called! Service type:', serviceType)
    
    try {
      // Debug: Check auth state
      console.log('🔐 Auth State Check:', {
        isAuthenticated: auth.isAuthenticated,
        userType: auth.userType,
        hasToken: !!auth.token,
        tokenPreview: auth.token ? auth.token.substring(0, 50) + '...' : 'NO TOKEN'
      })

      // Check localStorage
      const authStorage = localStorage.getItem('auth-storage')
      if (authStorage) {
        const parsed = JSON.parse(authStorage)
        console.log('📦 localStorage auth-storage:', {
          hasToken: !!parsed.state?.token,
          tokenPreview: parsed.state?.token ? parsed.state.token.substring(0, 50) + '...' : 'NO TOKEN',
          isAuthenticated: parsed.state?.isAuthenticated,
          userType: parsed.state?.userType
        })
      } else {
        console.error('❌ No auth-storage in localStorage!')
      }

      // Validate required fields
      if (!formData.name || !formData.description) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }

      if (serviceType === 'catering') {
        // Validate required imageUrl field
        if (uploadedImages.length === 0) {
          toast({
            title: "Validation Error",
            description: "Please upload at least one image for your catering package.",
            variant: "destructive",
          })
          return
        }

        // Use GraphQL for catering - FIXED to match actual backend schema
        const cateringInput = {
          packageName: formData.name,
          description: formData.description,
          price: parseFloat(formData.pricePerPerson) || 50,
          minGuests: parseInt(formData.minGuests) || 10,
          maxGuests: parseInt(formData.maxGuests) || 100,
          imageUrl: uploadedImages, // REQUIRED FIELD - array of image URLs
          menuItems: formData.menuItems ? formData.menuItems.split(',').map(item => item.trim()) : undefined,
          dietaryOptions: formData.dietaryOptions ? formData.dietaryOptions.split(',').map(item => item.trim()) : undefined,
          serviceArea: formData.serviceArea ? formData.serviceArea.split(',').map(item => item.trim()) : undefined,
          amenities: formData.amenities ? formData.amenities.split(',').map(item => item.trim()) : undefined,
        }

        console.log("Creating catering package with GraphQL:", cateringInput)
        const result = await createPackage(cateringInput)
        // GraphQL data will be loaded from useUserCatering hook

        if (result) {
          toast({
            title: "Success!",
            description: "Catering package created successfully.",
          })
          router.push("/vendor/services")
        }
      } else if (serviceType === 'farmhouse') {
        // Validate required fields for farmhouse
        if (uploadedImages.length === 0) {
          toast({
            title: "Validation Error",
            description: "Please upload at least one image for your farmhouse.",
            variant: "destructive",
          })
          return
        }

        if (!formData.city) {
          toast({
            title: "Validation Error",
            description: "Please provide city for your farmhouse.",
            variant: "destructive",
          })
          return
        }

        if (!formData.perNightPrice) {
          toast({
            title: "Validation Error",
            description: "Please provide per night price for your farmhouse.",
            variant: "destructive",
          })
          return
        }

        if (!formData.maxOccupancy) {
          toast({
            title: "Validation Error",
            description: "Please provide max occupancy (required by backend).",
            variant: "destructive",
          })
          return
        }

        // Use GraphQL for farmhouse - Match backend schema requirements
        // Backend expects: name, description, location, perNightPrice, maxGuests (REQUIRED), imageUrl (optional), amenities (optional)
        const farmhouseInput = {
          name: formData.name, // Changed from farmHouseName
          description: formData.description || "Beautiful farmhouse property",
          location: `${formData.city}${formData.state ? ', ' + formData.state : ''}${formData.country ? ', ' + formData.country : ''}`,
          perNightPrice: parseFloat(formData.perNightPrice) || 1000,
          maxGuests: parseInt(formData.maxOccupancy) || 10, // REQUIRED by backend
          imageUrl: uploadedImages.length > 0 ? uploadedImages[0] : undefined,
          amenities: formData.amenities 
            ? formData.amenities.split(',').map(item => item.trim()) 
            : undefined,
        }

        console.log("Creating farmhouse with GraphQL:", farmhouseInput)
        const result = await createFarmhouse(farmhouseInput)
        
        if (result) {
          toast({
            title: "Success!",
            description: "Farmhouse created successfully.",
          })
          router.push("/vendor/services")
        }
      } else if (serviceType === 'venue') {
        // Validate required fields for venue
        if (uploadedImages.length === 0) {
          toast({
            title: "Validation Error",
            description: "Please upload at least one image for your venue.",
            variant: "destructive",
          })
          return
        }

        if (!formData.city) {
          toast({
            title: "Validation Error",
            description: "Please provide city for your venue.",
            variant: "destructive",
          })
          return
        }

        if (!formData.price) {
          toast({
            title: "Validation Error",
            description: "Please provide pricing for your venue.",
            variant: "destructive",
          })
          return
        }

        if (!formData.maxGuestsLimit) {
          toast({
            title: "Validation Error",
            description: "Please provide maximum capacity for your venue.",
            variant: "destructive",
          })
          return
        }

        // Validate required backend fields
        if (!formData.minPersonLimit) {
          toast({
            title: "Validation Error",
            description: "Please provide minimum person limit for your venue.",
            variant: "destructive",
          })
          return
        }

        // Use GraphQL for venue - Match actual backend VenueInput schema
        const venueData = {
          name: formData.name,
          description: formData.description || "Beautiful venue for your events",
          location: `${formData.city}${formData.state ? ', ' + formData.state : ''}${formData.country ? ', ' + formData.country : ''}`,
          price: formData.price.toString(), // Backend expects STRING, not Float!
          imageUrl: uploadedImages.length > 0 ? uploadedImages[0] : undefined,
          amenities: formData.amenities 
            ? formData.amenities.split(',').map((item: string) => item.trim()).filter(item => item.length > 0)
            : [],
          tags: formData.tags 
            ? formData.tags.split(',').map((item: string) => item.trim()).filter(item => item.length > 0)
            : [], // Empty array, not default tag
          minPersonLimit: parseInt(formData.minPersonLimit) || 10, // REQUIRED by backend
          maxPersonLimit: parseInt(formData.maxGuestsLimit) || 100, // REQUIRED by backend
        }

        console.log("📤 Creating venue with GraphQL:")
        console.log("📋 Venue Data:", JSON.stringify(venueData, null, 2))
        console.log("🔧 Calling createVenue mutation...")
        console.log("⏰ Timestamp:", new Date().toISOString())
        
        try {
          console.log("🚀 About to call createVenue function...")
          const result = await createVenue(venueData)
          
          console.log("✅ Venue mutation completed!")
          console.log("📦 Full result object:", JSON.stringify(result, null, 2))
          console.log("🔍 Result type:", typeof result)
          console.log("🔍 Result keys:", result ? Object.keys(result) : 'null')
          
          // Check if result exists
          if (result) {
            console.log("✅ Result exists, redirecting...")
            toast({
              title: "Success!",
              description: "Venue created successfully.",
            })
            router.push("/vendor/services")
          } else {
            console.error("❌ createVenue returned null/undefined")
            console.error("❌ Result value:", result)
            toast({
              title: "Error",
              description: "Failed to create venue - no data returned",
              variant: "destructive",
            })
          }
        } catch (venueError) {
          console.error("❌ CAUGHT ERROR in createVenue mutation:")
          console.error("❌ Error object:", venueError)
          console.error("❌ Error message:", venueError instanceof Error ? venueError.message : 'Unknown error')
          console.error("❌ Error stack:", venueError instanceof Error ? venueError.stack : 'No stack')
          toast({
            title: "Error",
            description: venueError instanceof Error ? venueError.message : "Failed to create venue",
            variant: "destructive",
          })
        }
      } else {
        // Use mock implementation for photography service
        let transformedData
        switch (serviceType) {
          case 'photography':
            transformedData = transformPhotographyData(formData)
            break
          default:
            throw new Error('Invalid service type')
        }

        console.log("Creating service:", { serviceType, transformedData, uploadedImages })
        await createService(transformedData)
      }
    } catch (err) {
      console.error("Failed to submit service:", err)
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to create service",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <AuthDebugPanel />
      <div className="max-w-4xl mx-auto space-y-6">
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
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Service</h1>
            <p className="text-gray-600">Add a new service to your portfolio</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Type Selection */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Service Type</CardTitle>
                <CardDescription className="text-gray-600">
                  Choose the type of service you want to create
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(["venue", "farmhouse", "catering", "photography"] as ServiceType[]).map((type) => (
                    <div
                      key={type}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        serviceType === type
                          ? "border-orange-400 bg-orange-50"
                          : "border-gray-200 hover:border-orange-200"
                      }`}
                      onClick={() => setServiceType(type)}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            serviceType === type ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {getServiceIcon(type)}
                        </div>
                        <span
                          className={`text-sm font-medium capitalize ${serviceType === type ? "text-orange-600" : "text-gray-700"}`}
                        >
                          {type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Basic Information</CardTitle>
                <CardDescription className="text-gray-600">Provide basic details about your service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">
                      {serviceType === "catering" || serviceType === "photography" ? "Package Name" : "Service Name"}
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter service name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>

                  {(serviceType === "venue" || serviceType === "farmhouse") && (
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-700">
                        Location
                      </Label>
                      <Input
                        id="location"
                        placeholder="Enter location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  )}

                  {(serviceType === "catering" || serviceType === "photography") && (
                    <div className="space-y-2">
                      <Label htmlFor="serviceArea" className="text-gray-700">
                        Service Area
                      </Label>
                      <Input
                        id="serviceArea"
                        placeholder="Enter service areas (comma separated)"
                        value={formData.serviceArea}
                        onChange={(e) => handleInputChange("serviceArea", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your service in detail"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Catering-Specific Fields */}
            {serviceType === "catering" && (
              <Card className="border-orange-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-gray-900">Catering Details</CardTitle>
                  <CardDescription className="text-gray-600">
                    Provide specific details about your catering package
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pricePerPerson" className="text-gray-700">
                        Price per Person ($)
                      </Label>
                      <Input
                        id="pricePerPerson"
                        type="number"
                        placeholder="50"
                        value={formData.pricePerPerson}
                        onChange={(e) => handleInputChange("pricePerPerson", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minGuests" className="text-gray-700">
                        Min Guests
                      </Label>
                      <Input
                        id="minGuests"
                        type="number"
                        placeholder="10"
                        value={formData.minGuests}
                        onChange={(e) => handleInputChange("minGuests", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxGuests" className="text-gray-700">
                        Max Guests
                      </Label>
                      <Input
                        id="maxGuests"
                        type="number"
                        placeholder="100"
                        value={formData.maxGuests}
                        onChange={(e) => handleInputChange("maxGuests", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-gray-700">
                      Duration (hours)
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      placeholder="4"
                      value={formData.duration}
                      onChange={(e) => handleInputChange("duration", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="menuItems" className="text-gray-700">
                      Menu Items
                    </Label>
                    <Textarea
                      id="menuItems"
                      placeholder="Appetizers, Main Course, Desserts (comma separated)"
                      rows={3}
                      value={formData.menuItems}
                      onChange={(e) => handleInputChange("menuItems", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dietaryOptions" className="text-gray-700">
                      Dietary Options
                    </Label>
                    <Input
                      id="dietaryOptions"
                      placeholder="Vegetarian, Vegan, Halal (comma separated)"
                      value={formData.dietaryOptions}
                      onChange={(e) => handleInputChange("dietaryOptions", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amenities" className="text-gray-700">
                      Features/Amenities
                    </Label>
                    <Input
                      id="amenities"
                      placeholder="Tables, Chairs, Servers (comma separated)"
                      value={formData.amenities}
                      onChange={(e) => handleInputChange("amenities", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Farmhouse-Specific Fields */}
            {serviceType === "farmhouse" && (
              <Card className="border-orange-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-gray-900">Farmhouse Details</CardTitle>
                  <CardDescription className="text-gray-600">
                    Provide specific details about your farmhouse property
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Location Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-700">
                        Address *
                      </Label>
                      <Input
                        id="address"
                        placeholder="Street address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-700">
                        City *
                      </Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-gray-700">
                        State/Province
                      </Label>
                      <Input
                        id="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-gray-700">
                        Zip Code
                      </Label>
                      <Input
                        id="zipCode"
                        placeholder="12345"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-gray-700">
                        Country
                      </Label>
                      <Input
                        id="country"
                        placeholder="Pakistan"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="numberOfRooms" className="text-gray-700">
                        Number of Rooms
                      </Label>
                      <Input
                        id="numberOfRooms"
                        type="number"
                        placeholder="3"
                        value={formData.numberOfRooms}
                        onChange={(e) => handleInputChange("numberOfRooms", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="numberOfBathrooms" className="text-gray-700">
                        Number of Bathrooms
                      </Label>
                      <Input
                        id="numberOfBathrooms"
                        type="number"
                        placeholder="2"
                        value={formData.numberOfBathrooms}
                        onChange={(e) => handleInputChange("numberOfBathrooms", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxOccupancy" className="text-gray-700">
                        Max Occupancy *
                      </Label>
                      <Input
                        id="maxOccupancy"
                        type="number"
                        placeholder="10"
                        value={formData.maxOccupancy}
                        onChange={(e) => handleInputChange("maxOccupancy", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="perNightPrice" className="text-gray-700">
                        Price per Night ($) *
                      </Label>
                      <Input
                        id="perNightPrice"
                        type="number"
                        placeholder="1000"
                        value={formData.perNightPrice}
                        onChange={(e) => handleInputChange("perNightPrice", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="perDayPrice" className="text-gray-700">
                        Price per Day ($)
                      </Label>
                      <Input
                        id="perDayPrice"
                        type="number"
                        placeholder="800"
                        value={formData.perDayPrice}
                        onChange={(e) => handleInputChange("perDayPrice", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minNights" className="text-gray-700">
                        Minimum Stay (nights)
                      </Label>
                      <Input
                        id="minNights"
                        type="number"
                        placeholder="1"
                        value={formData.minNights}
                        onChange={(e) => handleInputChange("minNights", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmHouseType" className="text-gray-700">
                      Farmhouse Type
                    </Label>
                    <Input
                      id="farmHouseType"
                      placeholder="VILLA, COTTAGE, BUNGALOW, etc."
                      value={formData.farmHouseType}
                      onChange={(e) => handleInputChange("farmHouseType", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amenities" className="text-gray-700">
                      Amenities
                    </Label>
                    <Textarea
                      id="amenities"
                      placeholder="WIFI, PARKING, POOL, BBQ (comma separated)"
                      rows={3}
                      value={formData.amenities}
                      onChange={(e) => handleInputChange("amenities", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activities" className="text-gray-700">
                      Outdoor Activities
                    </Label>
                    <Input
                      id="activities"
                      placeholder="SWIMMING, HIKING, FISHING (comma separated)"
                      value={formData.activities}
                      onChange={(e) => handleInputChange("activities", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Venue-Specific Fields */}
            {serviceType === "venue" && (
              <Card className="border-orange-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-gray-900">Venue Details</CardTitle>
                  <CardDescription className="text-gray-600">
                    Provide specific details about your venue
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Location Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-gray-700">
                        Address
                      </Label>
                      <Input
                        id="address"
                        placeholder="Street address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-gray-700">
                        City *
                      </Label>
                      <Input
                        id="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-gray-700">
                        State/Province
                      </Label>
                      <Input
                        id="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-gray-700">
                        Zip Code
                      </Label>
                      <Input
                        id="zipCode"
                        placeholder="12345"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-gray-700">
                        Country
                      </Label>
                      <Input
                        id="country"
                        placeholder="Pakistan"
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minPersonLimit" className="text-gray-700">
                        Minimum Capacity *
                      </Label>
                      <Input
                        id="minPersonLimit"
                        type="number"
                        placeholder="10"
                        value={formData.minPersonLimit}
                        onChange={(e) => handleInputChange("minPersonLimit", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxGuestsLimit" className="text-gray-700">
                        Maximum Capacity *
                      </Label>
                      <Input
                        id="maxGuestsLimit"
                        type="number"
                        placeholder="100"
                        value={formData.maxGuestsLimit}
                        onChange={(e) => handleInputChange("maxGuestsLimit", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price" className="text-gray-700">
                        Price per Hour ($) *
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="500"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="perDayPrice" className="text-gray-700">
                        Price per Day ($)
                      </Label>
                      <Input
                        id="perDayPrice"
                        type="number"
                        placeholder="3000"
                        value={formData.perDayPrice}
                        onChange={(e) => handleInputChange("perDayPrice", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="packagePrice" className="text-gray-700">
                        Price per Event ($)
                      </Label>
                      <Input
                        id="packagePrice"
                        type="number"
                        placeholder="5000"
                        value={formData.packagePrice}
                        onChange={(e) => handleInputChange("packagePrice", e.target.value)}
                        className="border-orange-200 focus:border-orange-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amenities" className="text-gray-700">
                      Amenities
                    </Label>
                    <Textarea
                      id="amenities"
                      placeholder="Parking, Wifi, Air Conditioning, Stage, Sound System (comma separated)"
                      rows={3}
                      value={formData.amenities}
                      onChange={(e) => handleInputChange("amenities", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-gray-700">
                      Tags *
                    </Label>
                    <Input
                      id="tags"
                      placeholder="Wedding, Corporate, Party (comma separated)"
                      value={formData.tags}
                      onChange={(e) => handleInputChange("tags", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Image Upload */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Service Images</CardTitle>
                <CardDescription className="text-gray-600">Upload images to showcase your service</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-orange-200 rounded-lg p-6 text-center">
                  <Upload className="w-12 h-12 mx-auto text-orange-400 mb-4" />
                  <p className="text-gray-600 mb-4">Click to upload images or drag and drop</p>
                  <Button
                    onClick={handleImageUpload}
                    variant="outline"
                    className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Images
                  </Button>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Service image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          className="absolute -top-2 -right-2 w-6 h-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Service Preview */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Service Preview</CardTitle>
                <CardDescription className="text-gray-600">How your service will appear</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  {uploadedImages.length > 0 ? (
                    <img
                      src={uploadedImages[0] || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-gray-500">
                      <Upload className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">No image uploaded</p>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{formData.name || "Service Name"}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {formData.description || "Service description will appear here..."}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-800 capitalize">
                    <div className="flex items-center gap-1">
                      {getServiceIcon(serviceType)}
                      {serviceType}
                    </div>
                  </Badge>
                  <Badge variant={formData.isAvailable ? "default" : "secondary"} className="bg-green-600 text-white">
                    Available
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Service Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="availability" className="text-gray-700">
                      Service Available
                    </Label>
                    <p className="text-xs text-gray-500">Make this service bookable</p>
                  </div>
                  <Switch
                    id="availability"
                    checked={formData.isAvailable}
                    onCheckedChange={(checked) => handleInputChange("isAvailable", checked)}
                    className="data-[state=checked]:bg-orange-600"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="border-orange-200 bg-white">
              <CardContent className="pt-6 space-y-3">
                {error && (
                  <div className="p-3 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                    {error}
                  </div>
                )}
                <Button 
                  onClick={() => {
                    console.log('🎯 BUTTON CLICKED!', { serviceType, loading: { isLoading, cateringLoading, farmhouseLoading, venueLoading } })
                    handleSubmit()
                  }} 
                  disabled={isLoading || cateringLoading || farmhouseLoading || venueLoading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50"
                  type="button"
                >
                  {(isLoading || cateringLoading || farmhouseLoading || venueLoading) ? "Creating..." : "Create Service"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/vendor/services")}
                  disabled={isLoading || cateringLoading || farmhouseLoading || venueLoading}
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-50"
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
