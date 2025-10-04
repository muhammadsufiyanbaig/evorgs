"use client"

import { Heart, MapPin, Star, Award, Clock, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Service } from "../../Service"
import { useUserCatering } from "@/hooks/useGraphQLServices"

type Category = keyof typeof categoryConfig;

// GraphQL data will be loaded from useUserCatering hook

const categoryConfig = {
  venue: {
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    icon: "🏛️",
  },
  photography: {
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    icon: "📸",
  },
  catering: {
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    icon: "🍽️",
  },
  farmhouse: {
    color: "bg-gradient-to-r from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-700",
    icon: "🏡",
  },
}

interface GridProps {
  selectedCategory: string
  searchQuery: string
  selectedLocation: string
}

const Grid = ({ selectedCategory, searchQuery, selectedLocation }: GridProps) => {
  const [likedServices, setLikedServices] = useState<Set<string>>(new Set())
  
  // GraphQL Hook Integration
  const { getCateringPackages, searchCateringPackages, loading, data } = useUserCatering()
  const [cateringPackages, setCateringPackages] = useState<any[]>([])

  // Load catering packages on component mount or when category changes
  useEffect(() => {
    if (selectedCategory === 'catering' || selectedCategory === '' || selectedCategory === 'all') {
      console.log('🔄 Loading catering packages...')
      
      // If there's a search query, use search, otherwise get all packages
      if (searchQuery && searchQuery.trim() !== '') {
        searchCateringPackages(
          searchQuery,
          { isActive: true },
          { page: 1, limit: 20 }
        )
      } else {
        getCateringPackages(
          { isActive: true },
          { page: 1, limit: 20 },
          { field: 'rating', direction: 'DESC' }
        )
      }
    }
  }, [selectedCategory, searchQuery])

  // Update local state when GraphQL data changes
  useEffect(() => {
    if (data?.packages) {
      console.log('✅ Catering packages loaded:', data.packages.length)
      setCateringPackages(data.packages)
    }
  }, [data])

  // Convert GraphQL catering packages to Service format
  const cateringServices: (Service & { category: Category })[] = useMemo(() => {
    return cateringPackages.map((pkg: any) => ({
      id: pkg.id,
      name: pkg.packageName,
      location: pkg.vendor?.vendorAddress || 'Location not specified',
      rating: pkg.rating || 0,
      price: pkg.pricePerPerson,
      imageUrl: pkg.images?.[0] || '/placeholder.svg',
      category: 'catering' as Category,
      description: pkg.description || 'Delicious catering package',
      reviews: pkg.reviewCount || 0,
    }))
  }, [cateringPackages])

  const toggleLike = (serviceId: string) => {
    setLikedServices((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId)
      } else {
        newSet.add(serviceId)
      }
      return newSet
    })
  }

  // Combine services (for now just catering, can add other services later)
  const allServices = useMemo(() => {
    // For now, we only have catering data from GraphQL
    // TODO: Add photography, venue, farmhouse when their hooks are ready
    return [...cateringServices]
  }, [cateringServices])

  const filteredServices = useMemo(() => {
    return allServices.filter((service) => {
      const matchesCategory = !selectedCategory || selectedCategory === "all" || service.category === selectedCategory
      const matchesSearch =
        !searchQuery ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesLocation =
        !selectedLocation ||
        selectedLocation === "all" ||
        service.location.toLowerCase().includes(selectedLocation.toLowerCase())

      return matchesCategory && matchesSearch && matchesLocation
    })
  }, [allServices, selectedCategory, searchQuery, selectedLocation])

  // Show loading state
  if (loading && cateringPackages.length === 0) {
    return (
      <div className="w-full">
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading catering packages...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Results Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {selectedCategory && selectedCategory !== "all"
              ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Services`
              : "Discover Amazing Services"}
          </h2>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <p className="text-gray-600 font-medium">
              {filteredServices.length} premium {filteredServices.length === 1 ? "service" : "services"} available
              {loading && <span className="ml-2 text-orange-500">(refreshing...)</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="space-y-8">
        {filteredServices.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center">
                <div className="text-6xl">🔍</div>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No services found</h3>
            <p className="text-gray-500 text-lg">Try adjusting your search criteria or explore different categories</p>
          </div>
        ) : (
          filteredServices.map((service, index) => (
            <Card
              key={service.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:-translate-y-1 bg-white"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] min-h-[320px]">
                {/* Enhanced Image Section */}
                <div className="relative overflow-hidden min-h-[220px] lg:min-h-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                <Image
                  src={service.imageUrl || "/placeholder.svg"}
                  alt={service.name}
                  height={400}
                  width={600}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 z-20">
                  <div
                  className={`${categoryConfig[service.category].color} text-white px-2 py-1 rounded-full text-xs lg:text-sm font-semibold shadow-lg flex items-center gap-2`}
                  >
                  <span>{categoryConfig[service.category].icon}</span>
                  {service.category.charAt(0).toUpperCase() + service.category.slice(1)}
                  </div>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => toggleLike(service.id)}
                  className="absolute top-3 right-3 z-20 p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:scale-110"
                >
                  <Heart
                  className={`w-5 h-5 transition-colors duration-300 ${
                    likedServices.has(service.id)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600 hover:text-red-500"
                  }`}
                  />
                </button>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-lg">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-gray-900 text-xs lg:text-sm">{service.rating}</span>
                </div>
                </div>

                {/* Enhanced Content Section */}
                <div className="flex flex-col justify-between p-4 sm:p-6 lg:p-10 relative">
                {/* Decorative Element */}
                <div className={`absolute top-0 left-0 w-1 h-full ${categoryConfig[service.category].color} hidden lg:block`}></div>

                <div className="space-y-4 lg:space-y-6">
                  <div className="space-y-2 lg:space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 leading-tight">
                    {service.name}
                    </h3>
                    {service.rating >= 4.5 && (
                    <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      <Award className="w-3 h-3" />
                      Top Rated
                    </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{service.description}</p>

                  <div className="flex items-center gap-2 text-gray-700">
                    <div className="p-1.5 bg-orange-100 rounded-full">
                    <MapPin className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="font-medium">{service.location}</span>
                  </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex flex-wrap items-center gap-4 lg:gap-8">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-yellow-100 rounded-full">
                    <Star className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                    <span className="font-bold text-gray-900">{service.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({service.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-orange-600">
                    <div className="p-1.5 bg-orange-100 rounded-full">
                    <Clock className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Available Now</span>
                  </div>
                  </div>
                </div>

                {/* Enhanced Price and Action Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between pt-6 lg:pt-8 border-t border-gray-100 gap-4">
                  <div className="space-y-1">
                  <p className="text-xs sm:text-sm text-gray-500 font-medium">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    ${service.price}
                    </span>
                    <span className="text-base sm:text-lg text-gray-600 font-medium">/day</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">Taxes may apply</p>
                  </div>

                  <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent hover:border-orange-300 transition-all duration-300 font-semibold w-full sm:w-auto"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold px-6 sm:px-8 w-full sm:w-auto"
                  >
                    <Link href={`/services/${service.id}`}>
                    View Details
                    <span className="ml-2">→</span>
                    </Link>
                  </Button>
                  </div>
                </div>
                </div>
              </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

export default Grid
