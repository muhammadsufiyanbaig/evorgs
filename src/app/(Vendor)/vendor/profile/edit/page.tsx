"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save, X, ArrowLeft, Plus, Trash2 } from "lucide-react"

// Mock vendor data based on your schema
type VendorType = "FarmHouse" | "Venue" | "Catering" | "Photography";
type VendorStatus = "Approved" | "Pending" | "Rejected";

const initialVendorData: {
  id: string;
  vendorName: string;
  vendorEmail: string;
  vendorPhone: string;
  vendorAddress: string;
  vendorProfileDescription: string;
  vendorWebsite: string;
  vendorSocialLinks: string[];
  profileImage: string;
  bannerImage: string;
  vendorType: VendorType;
  vendorStatus: VendorStatus;
} = {
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
  vendorType: "Venue",
  vendorStatus: "Approved",
}

export default function EditVendorProfile() {
  const router = useRouter()
  const [vendor, setVendor] = useState(initialVendorData)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Redirect back to profile page
    router.push("/vendor/profile")
  }

  const handleCancel = () => {
    router.push("/vendor/profile")
  }

  const addSocialLink = () => {
    setVendor({
      ...vendor,
      vendorSocialLinks: [...vendor.vendorSocialLinks, ""],
    })
  }

  const removeSocialLink = (index: number) => {
    const newLinks = vendor.vendorSocialLinks.filter((_, i) => i !== index)
    setVendor({
      ...vendor,
      vendorSocialLinks: newLinks,
    })
  }

  const updateSocialLink = (index: number, value: string) => {
    const newLinks = [...vendor.vendorSocialLinks]
    newLinks[index] = value
    setVendor({
      ...vendor,
      vendorSocialLinks: newLinks,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleCancel} className="text-white hover:bg-white/20 p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Edit Profile</h1>
              <p className="text-orange-100">Update your vendor information</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Banner and Profile Image Section */}
        <Card className="mb-6 border-orange-100">
          <CardHeader className="border-b border-orange-50">
            <CardTitle className="text-gray-900">Profile Images</CardTitle>
            <CardDescription className="text-gray-600">Update your profile and banner images</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Banner Image */}
              <div className="space-y-3">
                <Label className="text-gray-700">Banner Image</Label>
                <div className="relative h-32 bg-gradient-to-r from-orange-400 to-orange-600 rounded-lg overflow-hidden">
                  <img
                    src={vendor.bannerImage || "/placeholder.svg"}
                    alt="Banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <Button size="sm" className="bg-white text-orange-600 hover:bg-gray-100">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Banner
                    </Button>
                  </div>
                </div>
              </div>

              {/* Profile Image */}
              <div className="space-y-3">
                <Label className="text-gray-700">Profile Image</Label>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-orange-100">
                      <AvatarImage src={vendor.profileImage || "/placeholder.svg"} alt={vendor.vendorName} />
                      <AvatarFallback className="bg-orange-100 text-orange-600 text-xl">
                        {vendor.vendorName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full p-0 bg-orange-500 hover:bg-orange-600"
                    >
                      <Camera className="h-3 w-3" />
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Upload a new profile picture</p>
                    <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Edit Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-orange-100">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-gray-900">Basic Information</CardTitle>
                <CardDescription className="text-gray-600">Update your basic business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vendorName" className="text-gray-700">
                      Business Name *
                    </Label>
                    <Input
                      id="vendorName"
                      value={vendor.vendorName}
                      onChange={(e) => setVendor({ ...vendor, vendorName: e.target.value })}
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                      placeholder="Enter your business name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendorType" className="text-gray-700">
                      Vendor Type *
                    </Label>
                    <Select
                      value={vendor.vendorType}
                      onValueChange={(value) =>
                        setVendor({
                          ...vendor,
                          vendorType: value as "FarmHouse" | "Venue" | "Catering" | "Photography",
                        })
                      }
                    >
                      <SelectTrigger className="border-orange-200 focus:border-orange-400 focus:ring-orange-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FarmHouse">Farm House</SelectItem>
                        <SelectItem value="Venue">Venue</SelectItem>
                        <SelectItem value="Catering">Catering</SelectItem>
                        <SelectItem value="Photography">Photography</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">
                    Business Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={vendor.vendorProfileDescription}
                    onChange={(e) => setVendor({ ...vendor, vendorProfileDescription: e.target.value })}
                    rows={4}
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    placeholder="Describe your business, services, and what makes you unique..."
                  />
                  <p className="text-xs text-gray-500">{vendor.vendorProfileDescription.length}/500 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700">
                    Business Address *
                  </Label>
                  <Textarea
                    id="address"
                    value={vendor.vendorAddress}
                    onChange={(e) => setVendor({ ...vendor, vendorAddress: e.target.value })}
                    rows={2}
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    placeholder="Enter your complete business address..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-gray-900">Contact Information</CardTitle>
                <CardDescription className="text-gray-600">Update your contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={vendor.vendorEmail}
                      onChange={(e) => setVendor({ ...vendor, vendorEmail: e.target.value })}
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-700">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      value={vendor.vendorPhone}
                      onChange={(e) => setVendor({ ...vendor, vendorPhone: e.target.value })}
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-gray-700">
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={vendor.vendorWebsite}
                    onChange={(e) => setVendor({ ...vendor, vendorWebsite: e.target.value })}
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-700">Social Media Links</Label>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={addSocialLink}
                      className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Link
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {vendor.vendorSocialLinks.map((link, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={link}
                          onChange={(e) => updateSocialLink(index, e.target.value)}
                          className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                          placeholder="@username or https://social-link.com"
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => removeSocialLink(index)}
                          className="border-red-200 text-red-600 hover:bg-red-50 px-3"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
                <CardTitle className="text-gray-900">Current Status</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Account Status</span>
                    <Badge className="bg-green-50 text-green-700 border-green-200">{vendor.vendorStatus}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Vendor Type</span>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">{vendor.vendorType}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-gray-900">Save Changes</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-xs text-orange-700">
                    💡 Changes to your profile may require admin approval before they become visible to customers.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-100">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-gray-900">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm text-gray-600 mb-3">
                  Having trouble updating your profile? Our support team is here to help.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
