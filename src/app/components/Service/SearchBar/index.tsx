"use client"

import { Search, MapPin, Grid3X3, Camera, Utensils, Hotel, School, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"

const categories = [
  { name: "Photography", icon: Camera, count: 10, value: "photography" },
  { name: "Catering", icon: Utensils, count: 3, value: "catering" },
  { name: "Farm House", icon: Hotel, count: 4, value: "farmhouse" },
  { name: "Venue", icon: School, count: 3, value: "venue" },
]

interface SearchBarProps {
  onCategoryChange?: (category: string) => void
  onSearchChange?: (query: string) => void
  onLocationChange?: (location: string) => void
  selectedCategory?: string
  searchQuery?: string
  selectedLocation?: string
  showRedirect?: boolean
}

export default function SearchBar({
  onCategoryChange,
  onSearchChange,
  onLocationChange,
  selectedCategory = "",
  searchQuery = "",
  selectedLocation = "",
  showRedirect = false,
}: SearchBarProps) {
  const router = useRouter()

  const handleSearch = () => {
    if (showRedirect) {
      // Redirect to services page with filters
      const params = new URLSearchParams()
      if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory)
      if (searchQuery) params.set("search", searchQuery)
      if (selectedLocation && selectedLocation !== "all") params.set("location", selectedLocation)
      router.push(`/services?${params.toString()}`)
    }
  }

  const handleCategorySelect = (value: string) => {
    if (onCategoryChange) {
      onCategoryChange(value)
    }
    if (showRedirect && value && value !== "all") {
      // Immediately redirect when category is selected in hero
      router.push(`/services?category=${value}`)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 p-6 backdrop-blur-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          {/* Search Input */}
          <div className="flex-1 flex items-center px-6 py-4 bg-orange-50 rounded-2xl group focus-within:bg-white focus-within:shadow-lg transition-all duration-300 min-h-[60px]">
            <Search className="w-5 h-5 text-orange-400 mr-4 group-focus-within:text-orange-500 transition-colors duration-300 flex-shrink-0" />
            <Input
              type="text"
              placeholder="What are you looking for?"
              className="border-0 bg-transparent focus-visible:ring-0 text-gray-700 placeholder:text-gray-500 text-lg h-auto p-0"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>

          {/* Location Select */}
          <div className="lg:w-[250px]">
            <Select value={selectedLocation} onValueChange={onLocationChange}>
              <SelectTrigger className="w-full border-0 bg-orange-50 rounded-2xl focus:ring-2 focus:ring-orange-200 py-4 px-6 text-lg hover:bg-white transition-all duration-300 h-[60px]">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <SelectValue placeholder="Select Location" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="karachi">Karachi</SelectItem>
                <SelectItem value="lahore">Lahore</SelectItem>
                <SelectItem value="islamabad">Islamabad</SelectItem>
                <SelectItem value="peshawar">Peshawar</SelectItem>
                <SelectItem value="quetta">Quetta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Category Select */}
          <div className="lg:w-[250px]">
            <Select value={selectedCategory} onValueChange={handleCategorySelect}>
              <SelectTrigger className="w-full border-0 bg-orange-50 rounded-2xl focus:ring-2 focus:ring-orange-200 py-4 px-6 text-lg hover:bg-white transition-all duration-300 h-[60px]">
                <div className="flex items-center gap-3">
                  <Grid3X3 className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <SelectValue placeholder="Select Category" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    <div className="flex items-center gap-3">
                      <category.icon className="w-4 h-4" />
                      {category.name}
                      <span className="text-xs text-gray-500 ml-2">({category.count})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="lg:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 text-lg font-semibold group h-[60px] flex-shrink-0"
          >
            <Search className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
            Search
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  )
}
