"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Building, Home, ChefHat, Camera, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type ServiceType = "venue" | "farmhouse" | "catering" | "photography"

// Mock implementation of useServiceCreation hook
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
  const [serviceType, setServiceType] = useState<ServiceType>("venue")
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    serviceArea: "",
    description: "",
    price: "",
    perNightPrice: "",
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
    menuItems: "",
    dietaryOptions: "",
    deliverables: "",
    isAvailable: true,
  })

  const [uploadedImages, setUploadedImages] = useState<string[]>([])

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
    try {
      // Validate required fields
      if (!formData.name || !formData.location || !formData.description) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }

      // Transform form data based on service type
      let transformedData
      switch (serviceType) {
        case 'venue':
          transformedData = transformVenueData(formData)
          break
        case 'catering':
          transformedData = transformCateringData(formData)
          break
        case 'photography':
          transformedData = transformPhotographyData(formData)
          break
        case 'farmhouse':
          transformedData = transformFarmhouseData(formData)
          break
        default:
          throw new Error('Invalid service type')
      }

      console.log("Creating service:", { serviceType, transformedData, uploadedImages })
      await createService(transformedData)
    } catch (err) {
      console.error("Failed to submit service:", err)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
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
                  onClick={handleSubmit} 
                  disabled={isLoading}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-50"
                >
                  {isLoading ? "Creating..." : "Create Service"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push("/vendor/services")}
                  disabled={isLoading}
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
