"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Phone, Globe, Edit, Mail } from "lucide-react"

// Mock vendor data based on your schema
const mockVendor = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  vendorName: "Sunset Gardens Venue",
  vendorEmail: "contact@sunsetgardens.com",
  vendorPhone: "+1 (555) 123-4567",
  vendorAddress: "123 Garden Lane, Beverly Hills, CA 90210",
  vendorProfileDescription:
    "Premier wedding venue with stunning sunset views and elegant gardens. We specialize in creating unforgettable moments for your special day.",
  vendorWebsite: "https://sunsetgardens.com",
  vendorSocialLinks: ["@sunsetgardens", "facebook.com/sunsetgardens"],
  profileImage: "/placeholder.svg?height=120&width=120",
  bannerImage: "/placeholder.svg?height=300&width=800",
  vendorType: "Venue" as const,
  vendorStatus: "Pending" as "Approved" | "Pending" | "Rejected",
  rating: "4.8",
  reviewCount: 127,
  createdAt: "2024-01-15",
  updatedAt: "2024-03-10",
}

export default function VendorProfile() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 text-green-700 border-green-200"
      case "Pending":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="relative h-64 bg-gradient-to-r from-orange-400 to-orange-600">
        <img
          src={mockVendor.bannerImage || "/placeholder.svg"}
          alt="Vendor Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-orange-600 bg-opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        {/* Profile Header */}
        <Card className="mb-6 border-orange-100 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage src={mockVendor.profileImage || "/placeholder.svg"} alt={mockVendor.vendorName} />
                  <AvatarFallback className="bg-orange-100 text-orange-600">
                    {mockVendor.vendorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{mockVendor.vendorName}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200">{mockVendor.vendorType}</Badge>
                      <Badge className={getStatusColor(mockVendor.vendorStatus)}>{mockVendor.vendorStatus}</Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                      <span className="font-medium text-gray-900">{mockVendor.rating}</span>
                      <span className="text-gray-500">({mockVendor.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <Link href="/vendor/profile/edit">
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-orange-100">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-gray-900">Profile Information</CardTitle>
                <CardDescription className="text-gray-600">Your vendor profile details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Business Name</h3>
                    <p className="text-gray-900">{mockVendor.vendorName}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Vendor Type</h3>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">{mockVendor.vendorType}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Description</h3>
                  <p className="text-gray-900 leading-relaxed">{mockVendor.vendorProfileDescription}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Address</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-900">{mockVendor.vendorAddress}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-gray-900">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Email</h3>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-orange-500" />
                      <a href={`mailto:${mockVendor.vendorEmail}`} className="text-orange-600 hover:underline">
                        {mockVendor.vendorEmail}
                      </a>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Phone</h3>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-orange-500" />
                      <a href={`tel:${mockVendor.vendorPhone}`} className="text-orange-600 hover:underline">
                        {mockVendor.vendorPhone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Website</h3>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-orange-500" />
                    <a
                      href={mockVendor.vendorWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline"
                    >
                      {mockVendor.vendorWebsite}
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Social Media</h3>
                  <div className="space-y-2">
                    {mockVendor.vendorSocialLinks.map((link, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-orange-400 rounded-full"></div>
                        <span className="text-gray-900">{link}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-orange-100">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-gray-900">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Status</span>
                    <Badge className={getStatusColor(mockVendor.vendorStatus)}>{mockVendor.vendorStatus}</Badge>
                  </div>

                  {mockVendor.vendorStatus === "Pending" && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-800">
                        Your account is pending approval. You'll receive an email once it's reviewed.
                      </p>
                    </div>
                  )}

                  {mockVendor.vendorStatus === "Approved" && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">Your account is approved and active!</p>
                    </div>
                  )}

                  <Link href="/vendor/profile/status">
                    <Button
                      variant="outline"
                      className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                    >
                      View Detailed Status
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-gray-900">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                      <span className="font-medium text-gray-900">{mockVendor.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reviews</span>
                    <span className="font-medium text-gray-900">{mockVendor.reviewCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="font-medium text-gray-900">Jan 2024</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-6">
                <Button
                  variant="outline"
                  className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  View on Map
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Preview Public Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
