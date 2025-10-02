"use client"

import React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, Phone, Globe, Edit, Mail, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { useGraphQLAuth } from "@/hooks/useGraphQLAuth"

// Vendor profile display interface
interface VendorProfileData {
  id: string;
  vendorName: string;
  vendorEmail: string;
  vendorPhone?: string;
  vendorAddress?: string;
  vendorProfileDescription?: string;
  vendorWebsite?: string;
  vendorSocialLinks?: string[];
  profileImage?: string;
  bannerImage?: string;
  vendorType: string;
  vendorStatus: string;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function VendorProfile() {

  const { toast } = useToast()

  // Get authenticated vendor data from Zustand (primary source) and GraphQL (fallback)
  const { currentVendor, isLoading: vendorLoading } = useGraphQLAuth()
  const { isAuthenticated, userType, vendorData } = useAuth()

  // Debug logging
  React.useEffect(() => {
    console.log('=== VENDOR PROFILE DEBUG ===');
    console.log('isAuthenticated:', isAuthenticated);
    console.log('userType:', userType);
    console.log('vendorLoading:', vendorLoading);
    console.log('vendorData (from Zustand):', vendorData);
    console.log('currentVendor (from GraphQL):', currentVendor);
    console.log('localStorage auth_token:', typeof window !== 'undefined' ? localStorage.getItem('auth_token') : 'N/A');
    console.log('===========================');
  }, [isAuthenticated, userType, vendorLoading, currentVendor, vendorData]);

  // Use vendorData from Zustand first (persisted from login), then fall back to GraphQL query
  const vendorSource = vendorData || currentVendor;
  
  // Map vendor data to VendorProfileData interface
  const displayVendor: VendorProfileData | null = vendorSource ? {
    id: vendorSource.id,
    vendorName: vendorSource.vendorName,
    vendorEmail: vendorSource.vendorEmail,
    vendorPhone: vendorSource.vendorPhone || '',
    vendorAddress: vendorSource.vendorAddress || '',
    vendorProfileDescription: vendorSource.vendorProfileDescription || '',
    vendorWebsite: vendorSource.vendorWebsite || '',
    vendorSocialLinks: vendorSource.vendorSocialLinks || [],
    profileImage: vendorSource.profileImage,
    bannerImage: vendorSource.bannerImage,
    vendorType: vendorSource.vendorType,
    vendorStatus: vendorSource.vendorStatus,
    createdAt: vendorSource.createdAt,
    updatedAt: vendorSource.updatedAt,
    rating: vendorSource.rating,
    reviewCount: vendorSource.reviewCount,
  } : null

  const isLoading = vendorLoading
  const error = !isAuthenticated ? 'Not authenticated' : null


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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-orange-500 mb-4" />
          <p className="text-gray-600">Loading vendor profile...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Profile</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <div className="flex gap-2 justify-center">
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-red-500 hover:bg-red-600"
              >
                Reload Page
              </Button>
              <Link href="/login">
                <Button 
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  Go to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // No vendor data state - only show this if we're not a vendor at all
  if (userType !== 'Vendor' || (!displayVendor && !isLoading)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold text-orange-800 mb-2">No Vendor Profile Found</h3>
            <p className="text-orange-600 mb-4">Unable to load vendor profile information.</p>
            <Link href="/vendor">
              <Button className="bg-orange-500 hover:bg-orange-600">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Banner Section */}
      <div className="relative h-64 bg-gradient-to-r from-orange-400 to-orange-600">
        {displayVendor?.bannerImage ? (
          <img
            src={displayVendor.bannerImage}
            alt="Vendor Banner"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-orange-400 to-orange-600" />
        )}
        <div className="absolute inset-0 bg-orange-600 bg-opacity-30" />
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-16 relative z-10">
        {/* Profile Header */}
        <Card className="mb-6 border-orange-100 shadow-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                  <AvatarImage 
                    src={displayVendor?.profileImage || "/placeholder.svg"} 
                    alt={displayVendor?.vendorName} 
                  />
                  <AvatarFallback className="bg-orange-100 text-orange-600">
                    {displayVendor?.vendorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{displayVendor?.vendorName}</h1>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                        {displayVendor?.vendorType}
                      </Badge>
                      <Badge className={getStatusColor(displayVendor?.vendorStatus || 'Pending')}>
                        {displayVendor?.vendorStatus || 'Pending'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                      <span className="font-medium text-gray-900">
                        {displayVendor?.rating ? displayVendor.rating.toFixed(1) : 'No rating'}
                      </span>
                      <span className="text-gray-500">
                        ({displayVendor?.reviewCount || 0} reviews)
                      </span>
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
                    <p className="text-gray-900">{displayVendor?.vendorName}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Vendor Type</h3>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                      {displayVendor?.vendorType}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Description</h3>
                  <p className="text-gray-900 leading-relaxed">
                    {displayVendor?.vendorProfileDescription || 'No description provided'}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-700">Address</h3>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-orange-500 mt-1 flex-shrink-0" />
                    <p className="text-gray-900">
                      {displayVendor?.vendorAddress || 'No address provided'}
                    </p>
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
                      <a href={`mailto:${displayVendor?.vendorEmail}`} className="text-orange-600 hover:underline">
                        {displayVendor?.vendorEmail}
                      </a>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Phone</h3>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-orange-500" />
                      {displayVendor?.vendorPhone ? (
                        <a href={`tel:${displayVendor?.vendorPhone}`} className="text-orange-600 hover:underline">
                          {displayVendor?.vendorPhone}
                        </a>
                      ) : (
                        <span className="text-gray-500">No phone provided</span>
                      )}
                    </div>
                  </div>
                </div>

                {displayVendor?.vendorWebsite && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Website</h3>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-orange-500" />
                      <a
                        href={displayVendor?.vendorWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline"
                      >
                        {displayVendor?.vendorWebsite}
                      </a>
                    </div>
                  </div>
                )}

                {displayVendor?.vendorSocialLinks && displayVendor?.vendorSocialLinks.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Social Media</h3>
                    <div className="space-y-2">
                      {displayVendor?.vendorSocialLinks.map((link: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-2 w-2 bg-orange-400 rounded-full"></div>
                          <span className="text-gray-900">{link}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                    <Badge className={getStatusColor(displayVendor?.vendorStatus || 'Pending')}>
                      {displayVendor?.vendorStatus || 'Pending'}
                    </Badge>
                  </div>

                  {displayVendor?.vendorStatus === "Pending" && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-800">
                        Your account is pending approval. You'll receive an email once it's reviewed.
                      </p>
                    </div>
                  )}

                  {displayVendor?.vendorStatus === "Approved" && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-800">Your account is approved and active!</p>
                    </div>
                  )}

                  {displayVendor?.vendorStatus === "Rejected" && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-sm text-red-800">
                        Your account was rejected. Please contact support for more information.
                      </p>
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
                      <span className="font-medium text-gray-900">
                        {displayVendor?.rating ? displayVendor.rating.toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Reviews</span>
                    <span className="font-medium text-gray-900">{displayVendor?.reviewCount || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Member Since</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(displayVendor?.createdAt || new Date().toISOString())}
                    </span>
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
