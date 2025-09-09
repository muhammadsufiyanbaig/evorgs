"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Save, X, ArrowLeft, Plus, Trash2, Loader2 } from "lucide-react"
import { useQuery } from "@apollo/client/react"
import { GET_VENDOR_PROFILE, type Vendor } from '@/utils/graphql/auth'
import { useAuthUser, useAuthUserType } from "@/hooks/useAuth"
import { useToast } from "@/hooks/use-toast"

export default function EditVendorProfile() {
  const router = useRouter()
  const authUser = useAuthUser()
  const userType = useAuthUserType()
  const { toast } = useToast()

  // GraphQL query for vendor profile
  const { 
    data: vendorProfileData, 
    loading: profileLoading, 
    error: profileError,
    refetch 
  } = useQuery<{ vendorProfile: Vendor }>(GET_VENDOR_PROFILE, {
    skip: userType !== 'Vendor' || !authUser,
    errorPolicy: 'all'
  })

  // Use GraphQL data if available, fallback to auth data
  const vendor = vendorProfileData?.vendorProfile || (userType === 'Vendor' ? authUser : null) as Vendor | null

  const [formData, setFormData] = useState({
    vendorName: '',
    vendorEmail: '',
    vendorPhone: '',
    vendorAddress: '',
    vendorProfileDescription: '',
    vendorWebsite: '',
    vendorSocialLinks: [] as string[],
    profileImage: '',
    bannerImage: '',
    vendorType: 'Venue' as Vendor['vendorType']
  })

  // Update form data when vendor data is loaded
  useEffect(() => {
    if (vendor) {
      setFormData({
        vendorName: vendor.vendorName || '',
        vendorEmail: vendor.vendorEmail || '',
        vendorPhone: vendor.vendorPhone || '',
        vendorAddress: vendor.vendorAddress || '',
        vendorProfileDescription: vendor.vendorProfileDescription || '',
        vendorWebsite: vendor.vendorWebsite || '',
        vendorSocialLinks: vendor.vendorSocialLinks || [],
        profileImage: vendor.profileImage || '',
        bannerImage: vendor.bannerImage || '',
        vendorType: vendor.vendorType || 'Venue'
      })
    }
  }, [vendor])

  const [updating, setUpdating] = useState(false)

  const handleSave = async () => {
    if (!vendor?.id) return

    setUpdating(true)
    
    // TODO: Implement UPDATE_VENDOR_PROFILE mutation when available
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    
    toast({
      title: "Coming Soon",
      description: "Profile update functionality will be available soon.",
    })
    
    setUpdating(false)
    
    // For now, just go back to profile
    // router.push('/vendor/profile')
  }

  const handleCancel = () => {
    router.push("/vendor/profile")
  }

  const addSocialLink = () => {
    setFormData({
      ...formData,
      vendorSocialLinks: [...formData.vendorSocialLinks, ""],
    })
  }

  const removeSocialLink = (index: number) => {
    const newLinks = formData.vendorSocialLinks.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      vendorSocialLinks: newLinks,
    })
  }

  const updateSocialLink = (index: number, value: string) => {
    const newLinks = [...formData.vendorSocialLinks]
    newLinks[index] = value
    setFormData({
      ...formData,
      vendorSocialLinks: newLinks,
    })
  }

  // Loading state
  if (profileLoading) {
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
  if (profileError || !vendor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Profile</h3>
            <p className="text-red-600 mb-4">{profileError?.message || 'No vendor data available'}</p>
            <Button onClick={() => router.push('/vendor/profile')} className="bg-red-500 hover:bg-red-600">
              Back to Profile
            </Button>
          </div>
        </div>
      </div>
    )
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
                      <AvatarImage src={formData.profileImage || "/placeholder.svg"} alt={formData.vendorName} />
                      <AvatarFallback className="bg-orange-100 text-orange-600 text-xl">
                        {formData.vendorName.charAt(0) || 'V'}
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
                      value={formData.vendorName}
                      onChange={(e) => setFormData({ ...formData, vendorName: e.target.value })}
                      className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                      placeholder="Enter your business name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendorType" className="text-gray-700">
                      Vendor Type *
                    </Label>
                    <Select
                      value={formData.vendorType}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          vendorType: value as Vendor['vendorType'],
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
                    value={formData.vendorProfileDescription}
                    onChange={(e) => setFormData({ ...formData, vendorProfileDescription: e.target.value })}
                    rows={4}
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    placeholder="Describe your business, services, and what makes you unique..."
                  />
                  <p className="text-xs text-gray-500">{formData.vendorProfileDescription.length}/500 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-700">
                    Business Address *
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.vendorAddress}
                    onChange={(e) => setFormData({ ...formData, vendorAddress: e.target.value })}
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
                      value={formData.vendorEmail}
                      onChange={(e) => setFormData({ ...formData, vendorEmail: e.target.value })}
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
                      value={formData.vendorPhone}
                      onChange={(e) => setFormData({ ...formData, vendorPhone: e.target.value })}
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
                    value={formData.vendorWebsite}
                    onChange={(e) => setFormData({ ...formData, vendorWebsite: e.target.value })}
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
                    {formData.vendorSocialLinks.map((link, index) => (
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
                    <Badge className="bg-green-50 text-green-700 border-green-200">{vendor?.vendorStatus || 'Pending'}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Vendor Type</span>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">{vendor?.vendorType || 'Venue'}</Badge>
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
                    disabled={updating}
                    className="w-full bg-orange-500 hover:bg-orange-600"
                  >
                    {updating ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
                    disabled={updating}
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
