"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useVendorCatering } from "@/hooks/useGraphQLServices"
import { useVendorFarmhouse } from "@/hooks/useGraphQLFarmhouse"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Building, Upload, X, Save, Loader2 } from "lucide-react"

type ServiceType = "catering" | "farmhouse"

export default function EditServicePage() {
  const router = useRouter()
  const params = useParams()
  const serviceId = params.service as string
  const { toast } = useToast()

  const [serviceType, setServiceType] = useState<ServiceType | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    city: "",
    state: "",
    description: "",
    price: "",
    perNightPrice: "",
    perDayPrice: "",
    minGuests: "",
    maxGuests: "",
    minPersonLimit: "",
    maxPersonLimit: "",
    numberOfRooms: "",
    numberOfBathrooms: "",
    maxOccupancy: "",
    tags: "",
    amenities: "",
    menuItems: "",
    dietaryOptions: "",
    serviceArea: "",
    isAvailable: true,
  })

  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  // GraphQL Hooks
  const { 
    getPackageDetails: getCateringDetails, 
    updatePackage: updateCatering, 
    loading: cateringLoading,
    data: cateringData 
  } = useVendorCatering()
  
  const { 
    getFarmhouseDetails, 
    updateFarmhouse, 
    loading: farmhouseLoading,
    data: farmhouseData 
  } = useVendorFarmhouse()

  // Fetch service data on mount
  useEffect(() => {
    if (serviceId) {
      // Try loading as both types - the backend will determine which exists
      getCateringDetails(serviceId)
      getFarmhouseDetails(serviceId)
    }
  }, [serviceId])

  // Populate form when data is loaded
  useEffect(() => {
    if (cateringData?.cateringPackage) {
      const pkg = cateringData.cateringPackage
      setServiceType('catering')
      setFormData({
        name: pkg.packageName || "",
        location: pkg.location || "",
        address: "",
        city: "",
        state: "",
        description: pkg.description || "",
        price: pkg.price?.toString() || "",
        perNightPrice: "",
        perDayPrice: "",
        minGuests: pkg.minGuests?.toString() || "",
        maxGuests: pkg.maxGuests?.toString() || "",
        minPersonLimit: "",
        maxPersonLimit: "",
        numberOfRooms: "",
        numberOfBathrooms: "",
        maxOccupancy: "",
        tags: "",
        amenities: pkg.amenities?.join(', ') || "",
        menuItems: pkg.menuItems?.join(', ') || "",
        dietaryOptions: pkg.dietaryOptions?.join(', ') || "",
        serviceArea: pkg.serviceArea?.join(', ') || "",
        isAvailable: pkg.isActive !== false,
      })
      setUploadedImages(pkg.imageUrl || [])
      setIsLoadingData(false)
    } else if (farmhouseData?.farmhouse) {
      const house = farmhouseData.farmhouse
      setServiceType('farmhouse')
      setFormData({
        name: house.farmHouseName || "",
        location: house.location || "",
        address: house.address || "",
        city: house.city || "",
        state: house.state || "",
        description: house.description || "",
        price: "",
        perNightPrice: house.perNightPrice?.toString() || "",
        perDayPrice: house.perDayPrice?.toString() || "",
        minGuests: "",
        maxGuests: "",
        minPersonLimit: "",
        maxPersonLimit: "",
        numberOfRooms: house.numberOfRooms?.toString() || "",
        numberOfBathrooms: house.numberOfBathrooms?.toString() || "",
        maxOccupancy: house.capacity?.toString() || "",
        tags: "",
        amenities: house.amenities?.join(', ') || "",
        menuItems: "",
        dietaryOptions: "",
        serviceArea: "",
        isAvailable: house.isActive !== false,
      })
      setUploadedImages(house.images || [])
      setIsLoadingData(false)
    }
  }, [cateringData, farmhouseData])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = () => {
    const newImage = `/placeholder.svg?height=200&width=300&text=New+Image+${uploadedImages.length + 1}`
    setUploadedImages((prev) => [...prev, newImage])
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    try {
      if (!serviceType) {
        toast({
          title: "Error",
          description: "Service type not determined",
          variant: "destructive",
        })
        return
      }

      if (serviceType === 'catering') {
        const updateInput = {
          packageName: formData.name || undefined,
          description: formData.description || undefined,
          price: formData.price ? parseFloat(formData.price) : undefined,
          minGuests: formData.minGuests ? parseInt(formData.minGuests) : undefined,
          maxGuests: formData.maxGuests ? parseInt(formData.maxGuests) : undefined,
          imageUrl: uploadedImages.length > 0 ? uploadedImages : undefined,
          menuItems: formData.menuItems ? formData.menuItems.split(',').map(item => item.trim()) : undefined,
          dietaryOptions: formData.dietaryOptions ? formData.dietaryOptions.split(',').map(item => item.trim()) : undefined,
          serviceArea: formData.serviceArea ? formData.serviceArea.split(',').map(item => item.trim()) : undefined,
          amenities: formData.amenities ? formData.amenities.split(',').map(item => item.trim()) : undefined,
        }

        const result = await updateCatering(serviceId, updateInput)
        if (result) {
          toast({
            title: "Success!",
            description: "Catering package updated successfully.",
          })
          router.push("/vendor/services")
        }
      } else if (serviceType === 'farmhouse') {
        const updateInput = {
          farmHouseName: formData.name || undefined,
          description: formData.description || undefined,
          address: formData.address || undefined,
          city: formData.city || undefined,
          state: formData.state || undefined,
          location: formData.location || undefined,
          perNightPrice: formData.perNightPrice ? parseFloat(formData.perNightPrice) : undefined,
          perDayPrice: formData.perDayPrice ? parseFloat(formData.perDayPrice) : undefined,
          numberOfRooms: formData.numberOfRooms ? parseInt(formData.numberOfRooms) : undefined,
          numberOfBathrooms: formData.numberOfBathrooms ? parseInt(formData.numberOfBathrooms) : undefined,
          capacity: formData.maxOccupancy ? parseInt(formData.maxOccupancy) : undefined,
          amenities: formData.amenities ? formData.amenities.split(',').map(item => item.trim() as any) : undefined,
        }

        const result = await updateFarmhouse(serviceId, updateInput)
        if (result) {
          toast({
            title: "Success!",
            description: "Farmhouse updated successfully.",
          })
          router.push("/vendor/services")
        }
      }
    } catch (error) {
      console.error("Failed to save service:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update service",
        variant: "destructive",
      })
    }
  }

  if (isLoadingData) {
    return (
      <div className="min-h-screen bg-orange-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    )
  }

  if (!serviceType) {
    return (
      <div className="min-h-screen bg-orange-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Service not found</p>
          <Button onClick={() => router.push("/vendor/services")} className="bg-orange-600 hover:bg-orange-700">
            Back to Services
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
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
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Service</h1>
                <p className="text-orange-600 capitalize">{serviceType} Service</p>
              </div>
            </div>
          </div>
          <Button 
            onClick={handleSave} 
            disabled={cateringLoading || farmhouseLoading}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            {(cateringLoading || farmhouseLoading) ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Basic Information</CardTitle>
                <CardDescription className="text-gray-600">Update your service details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">
                      Service Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-700">
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Pricing & Capacity */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Pricing & Capacity</CardTitle>
                <CardDescription className="text-gray-600">Update pricing and capacity information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-gray-700">
                      Price
                    </Label>
                    <Input
                      id="price"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minCapacity" className="text-gray-700">
                      Min Capacity
                    </Label>
                    <Input
                      id="minCapacity"
                      type="number"
                      value={formData.minPersonLimit}
                      onChange={(e) => handleInputChange("minPersonLimit", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxCapacity" className="text-gray-700">
                      Max Capacity
                    </Label>
                    <Input
                      id="maxCapacity"
                      type="number"
                      value={formData.maxPersonLimit}
                      onChange={(e) => handleInputChange("maxPersonLimit", e.target.value)}
                      className="border-orange-200 focus:border-orange-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Additional Details</CardTitle>
                <CardDescription className="text-gray-600">Update tags and amenities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tags" className="text-gray-700">
                    Tags
                  </Label>
                  <Input
                    id="tags"
                    placeholder="Enter tags (comma separated)"
                    value={formData.tags}
                    onChange={(e) => handleInputChange("tags", e.target.value)}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amenities" className="text-gray-700">
                    Amenities
                  </Label>
                  <Textarea
                    id="amenities"
                    placeholder="Enter amenities (comma separated)"
                    rows={3}
                    value={formData.amenities}
                    onChange={(e) => handleInputChange("amenities", e.target.value)}
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Image Management */}
            <Card className="border-orange-200 bg-white">
              <CardHeader>
                <CardTitle className="text-gray-900">Service Images</CardTitle>
                <CardDescription className="text-gray-600">Manage your service images</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Service image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
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
                  <div className="border-2 border-dashed border-orange-200 rounded-lg h-32 flex items-center justify-center">
                    <Button
                      onClick={handleImageUpload}
                      variant="outline"
                      className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Add Image
                    </Button>
                  </div>
                </div>
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
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  {uploadedImages.length > 0 ? (
                    <img
                      src={uploadedImages[0] || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">No image uploaded</p>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{formData.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{formData.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-800">
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      Venue
                    </div>
                  </Badge>
                  <Badge variant={formData.isAvailable ? "default" : "secondary"} className="bg-green-600 text-white">
                    {formData.isAvailable ? "Available" : "Unavailable"}
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
                <Button onClick={handleSave} className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push(`/vendor/services/${serviceId}`)}
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
