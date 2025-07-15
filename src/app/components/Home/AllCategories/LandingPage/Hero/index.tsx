"use client"

import { Camera, Utensils, Hotel, School, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { useRouter } from "next/navigation"
import SearchBar from "@/app/components/Service/SearchBar"


export default function Hero() {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const router = useRouter()

  const categories = [
    { name: "Photography", icon: Camera, count: 10, value: "photography" },
    { name: "Catering", icon: Utensils, count: 3, value: "catering" },
    { name: "Farm House", icon: Hotel, count: 4, value: "farmhouse" },
    { name: "Venue", icon: School, count: 3, value: "venue" },
  ]

  const handleCategoryClick = (categoryValue: string) => {
    router.push(`/services?category=${categoryValue}`)
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 overflow-hidden">
      {/* Decorative Elements - Only Orange */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-gradient-to-r from-orange-300 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-25 animate-pulse delay-2000"></div>

      {/* Content */}
      <div className="relative px-4 pt-32 pb-20 space-y-16">
        {/* Hero Text */}
        <div className="flex justify-center items-center">
          <div className="text-center space-y-6 max-w-4xl">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
              <p className="text-orange-600 font-semibold text-lg tracking-wide">
                Discover & Connect With Great Places Around The World
              </p>
              <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent leading-tight">
              Let's Discover This
              <span className="block bg-gradient-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent">
                Amazing City
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Find the perfect venues, photographers, caterers, and farmhouses for your special moments
            </p>
          </div>
        </div>

        {/* Reused Search Bar */}
        <SearchBar
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          selectedLocation={selectedLocation}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearchQuery}
          onLocationChange={setSelectedLocation}
          showRedirect={true}
        />

        {/* Quick Filter Buttons */}
        <div className="flex justify-center gap-3 flex-wrap max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => router.push("/services")}
            className="text-gray-600 bg-white/80 backdrop-blur-sm hover:bg-white hover:text-orange-600 transition-all duration-300 rounded-full px-6 py-3 shadow-md hover:shadow-lg border border-orange-200"
          >
            All Categories
          </Button>
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Button
                key={category.value}
                variant="ghost"
                onClick={() => handleCategoryClick(category.value)}
                className="text-gray-600 bg-white/80 backdrop-blur-sm hover:bg-white hover:text-orange-600 transition-all duration-300 rounded-full px-6 py-3 shadow-md hover:shadow-lg border border-orange-200 group"
              >
                <Icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                {category.name}
              </Button>
            )
          })}
        </div>

        {/* Enhanced Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card
                key={category.value}
                onClick={() => handleCategoryClick(category.value)}
                className="group p-8 text-center hover:shadow-2xl transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:-translate-y-2 rounded-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-sm font-medium">{category.count} Available Services</p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-6">
          <p className="text-gray-600 text-lg">Ready to find your perfect service?</p>
          <Button
            size="lg"
            onClick={() => router.push("/services")}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group"
          >
            Explore All Services
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </div>
    </div>
  )
}
