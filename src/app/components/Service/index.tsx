"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import SearchBar from "./SearchBar"
import Grid from "./Grid"


export interface Service {
  id: string
  name: string
  location: string
  rating: number
  price: number
  imageUrl: string
  category: "photography" | "catering" | "farmhouse" | "venue"
  description: string
  reviews: number
}

const Services = () => {
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("")

  // Get initial values from URL parameters
  useEffect(() => {
    const category = searchParams.get("category") || ""
    const search = searchParams.get("search") || ""
    const location = searchParams.get("location") || ""

    setSelectedCategory(category)
    setSearchQuery(search)
    setSelectedLocation(location)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12 mt-20">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            Find Your Perfect
            <span className="text-orange-500 block">Service</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing venues, photographers, caterers, and farmhouses for your special events
          </p>
        </div>

        {/* Reused Search Bar */}
        <div className="mb-12">
          <SearchBar
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchQuery}
            onLocationChange={setSelectedLocation}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            selectedLocation={selectedLocation}
            showRedirect={false}
          />
        </div>

        {/* Results Section */}
        <div className="flex flex-col lg:flex-row gap-8">
          <Grid selectedCategory={selectedCategory} searchQuery={searchQuery} selectedLocation={selectedLocation} />
        </div>
      </div>
    </div>
  )
}

export default Services
