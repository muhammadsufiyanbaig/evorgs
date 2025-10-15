"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useVendorCatering } from "@/hooks/useGraphQLServices"
import { useVendorFarmhouse } from "@/hooks/useGraphQLFarmhouse"
import { useVendorVenue } from "@/hooks/useGraphQLVenue"
import { useVendorPhotography } from "@/hooks/useGraphQLPhotography"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Building, 
  Home, 
  ChefHat, 
  Camera, 
  Plus, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  DollarSign,
  Users,
  Loader2,
  Calendar,
  Star,
  AlertCircle
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

type ServiceType = "all" | "catering" | "farmhouse" | "photography" | "venue"

interface Service {
  id: string
  name: string
  type: ServiceType
  location: string
  price: number
  imageUrl: string
  isActive: boolean
  rating?: number
  reviewCount?: number
  bookings?: number
  capacity?: number
}

export default function VendorServicesPage() {
  const router = useRouter()
  const { toast } = useToast()
  
  // State
  const [selectedType, setSelectedType] = useState<ServiceType>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [services, setServices] = useState<Service[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null)
  
  // GraphQL Hooks
  const { 
    getMyPackages, 
    deletePackage: deleteCateringPackage,
    togglePackageStatus: toggleCateringStatus,
    loading: cateringLoading,
    data: cateringData 
  } = useVendorCatering()
  
  const { 
    getMyFarmhouses, 
    deleteFarmhouse,
    toggleFarmhouseStatus,
    loading: farmhouseLoading,
    data: farmhouseData 
  } = useVendorFarmhouse()

  const { 
    getMyVenues, 
    deleteVenue,
    toggleVenueStatus,
    loading: venueLoading,
    data: venueData 
  } = useVendorVenue()

  const {
    getMyPhotographyPackages,
    deletePhotographyPackage,
    togglePhotographyPackageStatus,
    createLoading: photographyLoading,
    data: photographyData
  } = useVendorPhotography()

  // Fetch services on mount
  useEffect(() => {
    getMyPackages()
    getMyFarmhouses()
    getMyVenues()
    getMyPhotographyPackages()
  }, [])

  // Update services when data changes
  useEffect(() => {
    const allServices: Service[] = []

    console.log('📊 All Service Data:', {
      catering: cateringData,
      farmhouse: farmhouseData,
      venue: venueData,
      photography: photographyData
    })

    // Add catering packages
    if (cateringData?.vendorCateringPackages) {
      const cateringServices = cateringData.vendorCateringPackages.map((pkg: any) => ({
        id: pkg.id,
        name: pkg.packageName,
        type: 'catering' as ServiceType,
        location: pkg.serviceArea?.join(', ') || 'Multiple locations',
        price: pkg.price || 0,
        imageUrl: pkg.imageUrl?.[0] || '/placeholder.svg',
        isActive: pkg.isActive !== false,
        rating: pkg.rating || 0,
        reviewCount: pkg.reviewCount || 0,
        bookings: pkg.bookingCount || 0,
        capacity: pkg.maxGuests || 0,
      }))
      console.log('🍽️ Catering services:', cateringServices.length)
      allServices.push(...cateringServices)
    }

    // Add farmhouses
    if (farmhouseData?.vendorFarmhouses) {
      const farmhouseServices = farmhouseData.vendorFarmhouses.map((house: any) => ({
        id: house.id,
        name: house.name,
        type: 'farmhouse' as ServiceType,
        location: house.location || 'Location not specified',
        price: house.perNightPrice || 0,
        imageUrl: house.imageUrl || '/placeholder.svg',
        isActive: house.isActive !== false,
        rating: house.rating || 0,
        reviewCount: house.reviewCount || 0,
        bookings: house.bookingCount || 0,
        capacity: house.maxGuests || 0,
      }))
      console.log('🏡 Farmhouse services:', farmhouseServices.length)
      allServices.push(...farmhouseServices)
    }

    // Add venues
    const vData = venueData as any;
    if (vData?.vendorVenues) {
      const venueServices = vData.vendorVenues.map((venue: any) => ({
        id: venue.id,
        name: venue.name,
        type: 'venue' as ServiceType,
        location: venue.location || 'Location not specified',
        price: parseFloat(venue.price) || 0,
        imageUrl: venue.imageUrl || '/placeholder.svg',
        isActive: venue.isActive !== false,
        rating: venue.rating || 0,
        reviewCount: venue.reviewCount || 0,
        bookings: 0,
        capacity: venue.maxPersonLimit || 0,
      }))
      console.log('🏛️ Venue services:', venueServices.length)
      allServices.push(...venueServices)
    }

    // Add photography packages (direct array, not paginated)
    const pData = photographyData as any;
    if (pData?.vendorPhotographPackages && Array.isArray(pData.vendorPhotographPackages)) {
      const photographyServices = pData.vendorPhotographPackages.map((pkg: any) => ({
        id: pkg.id,
        name: pkg.packageName,
        type: 'photography' as ServiceType,
        location: 'Photography Service',
        price: pkg.price || 0,
        imageUrl: pkg.imageUrl?.[0] || '/placeholder.svg',
        isActive: pkg.isActive !== false,
        rating: pkg.rating || 0,
        reviewCount: pkg.reviewCount || 0,
        bookings: pkg.bookingCount || 0,
        capacity: pkg.duration ? `${pkg.duration}hrs` : 0,
      }))
      console.log('📸 Photography services:', photographyServices.length)
      allServices.push(...photographyServices)
    }

    console.log('✅ Total merged services:', allServices.length)
    setServices(allServices)
  }, [cateringData, farmhouseData, venueData, photographyData])

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesType = selectedType === "all" || service.type === selectedType
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesSearch
  })

  // Service type icons
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
      default:
        return <Building className="w-5 h-5" />
    }
  }

  // Handle delete service
  const handleDeleteClick = (service: Service) => {
    setServiceToDelete(service)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!serviceToDelete) return

    try {
      if (serviceToDelete.type === 'catering') {
        await deleteCateringPackage(serviceToDelete.id)
      } else if (serviceToDelete.type === 'farmhouse') {
        await deleteFarmhouse(serviceToDelete.id)
      } else if (serviceToDelete.type === 'venue') {
        await deleteVenue(serviceToDelete.id)
      } else if (serviceToDelete.type === 'photography') {
        await deletePhotographyPackage(serviceToDelete.id)
      }
      
      // Refresh data
      getMyPackages()
      getMyFarmhouses()
      getMyVenues()
      getMyPhotographyPackages()
      
      setDeleteDialogOpen(false)
      setServiceToDelete(null)
      
      toast({
        title: "Success",
        description: `${serviceToDelete.type} service deleted successfully`,
      })
    } catch (error) {
      console.error('Delete failed:', error)
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      })
    }
  }

  // Handle toggle status
  const handleToggleStatus = async (service: Service) => {
    try {
      if (service.type === 'catering') {
        await toggleCateringStatus(service.id)
      } else if (service.type === 'farmhouse') {
        await toggleFarmhouseStatus(service.id)
      } else if (service.type === 'venue') {
        await toggleVenueStatus(service.id)
      } else if (service.type === 'photography') {
        await togglePhotographyPackageStatus(service.id)
      }
      
      // Refresh data
      getMyPackages()
      getMyFarmhouses()
      getMyVenues()
      getMyPhotographyPackages()
      
      toast({
        title: "Success",
        description: `Service status updated successfully`,
      })
    } catch (error) {
      console.error('Toggle status failed:', error)
      toast({
        title: "Error",
        description: "Failed to update service status",
        variant: "destructive",
      })
    }
  }

  const loading = cateringLoading || farmhouseLoading || venueLoading

  // Stats calculation
  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    inactive: services.filter(s => !s.isActive).length,
    totalBookings: services.reduce((sum, s) => sum + (s.bookings || 0), 0),
  }

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Services</h1>
            <p className="text-gray-600">Manage your service listings and availability</p>
          </div>
          <Button
            onClick={() => router.push("/vendor/services/create")}
            className="bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Service
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-orange-200 bg-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-600">Total Services</CardDescription>
              <CardTitle className="text-3xl text-orange-600">{stats.total}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-orange-200 bg-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-600">Active Services</CardDescription>
              <CardTitle className="text-3xl text-green-600">{stats.active}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-orange-200 bg-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-600">Inactive Services</CardDescription>
              <CardTitle className="text-3xl text-gray-600">{stats.inactive}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-orange-200 bg-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-gray-600">Total Bookings</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{stats.totalBookings}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-orange-200 bg-white">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search services by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-orange-200 focus:border-orange-400"
                />
              </div>

              {/* Service Type Filter */}
              <Tabs value={selectedType} onValueChange={(value) => setSelectedType(value as ServiceType)}>
                <TabsList className="bg-orange-100">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="catering">Catering</TabsTrigger>
                  <TabsTrigger value="farmhouse">Farmhouse</TabsTrigger>
                  <TabsTrigger value="photography">Photography</TabsTrigger>
                  <TabsTrigger value="venue">Venue</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Services Grid */}
        {loading && services.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-orange-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading your services...</p>
            </div>
          </div>
        ) : filteredServices.length === 0 ? (
          <Card className="border-orange-200 bg-white">
            <CardContent className="py-12">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No services found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || selectedType !== "all" 
                    ? "Try adjusting your filters" 
                    : "Get started by adding your first service"}
                </p>
                {!searchQuery && selectedType === "all" && (
                  <Button
                    onClick={() => router.push("/vendor/services/create")}
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Service
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <Card key={service.id} className="border-orange-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
                {/* Service Image */}
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={service.imageUrl || "/placeholder.svg"}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={`${service.isActive ? 'bg-green-600' : 'bg-gray-600'} text-white`}>
                      {service.isActive ? (
                        <>
                          <Eye className="w-3 h-3 mr-1" />
                          Active
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3 mr-1" />
                          Inactive
                        </>
                      )}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-blue-100 text-blue-800 capitalize">
                      <div className="flex items-center gap-1">
                        {getServiceIcon(service.type)}
                        {service.type}
                      </div>
                    </Badge>
                  </div>
                </div>

                {/* Service Details */}
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-1">{service.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {service.location}
                      </CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push(`/vendor/services/${service.id}`)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/vendor/services/${service.id}/edit`)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleToggleStatus(service)}>
                          {service.isActive ? (
                            <>
                              <EyeOff className="w-4 h-4 mr-2" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Eye className="w-4 h-4 mr-2" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClick(service)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className="pb-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-orange-600" />
                      <span className="font-semibold text-orange-600">
                        ${service.price}
                        <span className="text-xs text-gray-500">
                          {service.type === 'farmhouse' ? '/night' : service.type === 'catering' ? '/person' : ''}
                        </span>
                      </span>
                    </div>
                    {service.capacity && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{service.capacity} guests</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{service.rating?.toFixed(1) || '0.0'} ({service.reviewCount || 0})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{service.bookings || 0} bookings</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-3 border-t border-orange-100">
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/vendor/services/${service.id}/edit`)}
                      className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => router.push(`/vendor/services/${service.id}`)}
                      className="flex-1 border-orange-200 text-orange-700 hover:bg-orange-50"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{serviceToDelete?.name}</strong>? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="border-orange-200"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Service
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
