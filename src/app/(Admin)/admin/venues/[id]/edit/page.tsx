"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save, Plus, X } from "lucide-react"

// Mock data - in real app, this would come from API
const mockVenue = {
  id: "1",
  vendorId: "vendor-1",
  name: "Grand Ballroom",
  location: "Downtown Plaza, New York",
  description: "Elegant ballroom perfect for weddings and corporate events",
  imageUrl: "/placeholder.svg?height=400&width=600",
  price: 2500,
  tags: ["Wedding", "Corporate", "Luxury"],
  amenities: ["WiFi", "Parking", "Catering", "Sound System"],
  minPersonLimit: 50,
  maxPersonLimit: 300,
  isAvailable: true,
  rating: 4.8,
  reviewCount: 124,
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-20T14:30:00Z",
}

export default function EditVenuePage() {
  const params = useParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: mockVenue.name,
    vendorId: mockVenue.vendorId,
    location: mockVenue.location,
    description: mockVenue.description,
    imageUrl: mockVenue.imageUrl,
    price: mockVenue.price.toString(),
    minPersonLimit: mockVenue.minPersonLimit.toString(),
    maxPersonLimit: mockVenue.maxPersonLimit.toString(),
    isAvailable: mockVenue.isAvailable,
    tags: [...mockVenue.tags],
    amenities: [...mockVenue.amenities],
  })

  const [newTag, setNewTag] = useState("")
  const [newAmenity, setNewAmenity] = useState("")

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }))
  }

  const addAmenity = () => {
    if (newAmenity.trim() && !formData.amenities.includes(newAmenity.trim())) {
      setFormData((prev) => ({ ...prev, amenities: [...prev.amenities, newAmenity.trim()] }))
      setNewAmenity("")
    }
  }

  const removeAmenity = (amenityToRemove: string) => {
    setFormData((prev) => ({ ...prev, amenities: prev.amenities.filter((amenity) => amenity !== amenityToRemove) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, this would make an API call
    console.log("Updating venue:", formData)
    router.push(`/admin/venues/${params.id}`)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href={`/admin/venues/${params.id}`}>
            <Button
              variant="outline"
              size="sm"
              className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Venue
            </Button>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">Edit Venue</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card className="border-orange-200">
            <CardHeader className="bg-orange-50 border-b border-orange-200">
              <CardTitle className="text-orange-800">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="name">Venue Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="border-orange-200 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="vendorId">Vendor ID *</Label>
                <Input
                  id="vendorId"
                  value={formData.vendorId}
                  onChange={(e) => handleInputChange("vendorId", e.target.value)}
                  className="border-orange-200 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="border-orange-200 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                  className="border-orange-200 focus:border-orange-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="border-orange-200 focus:border-orange-500"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Capacity */}
          <Card className="border-orange-200">
            <CardHeader className="bg-orange-50 border-b border-orange-200">
              <CardTitle className="text-orange-800">Pricing & Capacity</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className="border-orange-200 focus:border-orange-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minPersonLimit">Min Capacity *</Label>
                  <Input
                    id="minPersonLimit"
                    type="number"
                    value={formData.minPersonLimit}
                    onChange={(e) => handleInputChange("minPersonLimit", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="maxPersonLimit">Max Capacity *</Label>
                  <Input
                    id="maxPersonLimit"
                    type="number"
                    value={formData.maxPersonLimit}
                    onChange={(e) => handleInputChange("maxPersonLimit", e.target.value)}
                    className="border-orange-200 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => handleInputChange("isAvailable", checked)}
                  className="data-[state=checked]:bg-orange-500"
                />
                <Label htmlFor="isAvailable">Available for booking</Label>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="border-orange-200">
            <CardHeader className="bg-orange-50 border-b border-orange-200">
              <CardTitle className="text-orange-800">Tags</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="border-orange-200 focus:border-orange-500"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-orange-500 hover:text-orange-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card className="border-orange-200">
            <CardHeader className="bg-orange-50 border-b border-orange-200">
              <CardTitle className="text-orange-800">Amenities</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  placeholder="Add an amenity"
                  className="border-orange-200 focus:border-orange-500"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAmenity())}
                />
                <Button type="button" onClick={addAmenity} className="bg-orange-500 hover:bg-orange-600">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-1 rounded-md text-sm"
                  >
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeAmenity(amenity)}
                      className="text-orange-500 hover:text-orange-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex gap-4">
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
            <Save className="w-4 h-4 mr-2" />
            Update Venue
          </Button>
          <Link href={`/admin/venues/${params.id}`}>
            <Button
              type="button"
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
