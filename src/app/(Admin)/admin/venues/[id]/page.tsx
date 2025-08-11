"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Edit, MapPin, Users, Star, Calendar, DollarSign } from "lucide-react"

// Mock data - in real app, this would come from API
const mockVenue = {
  id: "1",
  vendorId: "vendor-1",
  name: "Grand Ballroom",
  location: "Downtown Plaza, New York",
  description:
    "Elegant ballroom perfect for weddings and corporate events. Features high ceilings, crystal chandeliers, and a spacious dance floor. The venue can accommodate both intimate gatherings and large celebrations with its flexible layout options.",
  imageUrl: "/placeholder.svg?height=400&width=600",
  price: 2500,
  tags: ["Wedding", "Corporate", "Luxury"],
  amenities: ["WiFi", "Parking", "Catering", "Sound System", "Dance Floor", "Bar Area", "Bridal Suite"],
  minPersonLimit: 50,
  maxPersonLimit: 300,
  isAvailable: true,
  rating: 4.8,
  reviewCount: 124,
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-20T14:30:00Z",
}

export default function VenueDetailsPage() {
  const params = useParams()
  const [venue] = useState(mockVenue) // In real app, fetch by params.id

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/admin/venues">
            <Button
              variant="outline"
              size="sm"
              className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Venues
            </Button>
          </Link>
          <Link href={`/admin/venues/${venue.id}/edit`}>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit Venue
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-orange-200">
              <CardContent className="p-0">
                <img
                  src={venue.imageUrl || "/placeholder.svg"}
                  alt={venue.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{venue.name}</h1>
                      <div className="flex items-center gap-2 text-gray-600 mb-3">
                        <MapPin className="w-4 h-4" />
                        {venue.location}
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-lg">{venue.rating}</span>
                          <span className="text-gray-500">({venue.reviewCount} reviews)</span>
                        </div>
                        <Badge
                          variant={venue.isAvailable ? "default" : "secondary"}
                          className={venue.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {venue.isAvailable ? "Available" : "Unavailable"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-4">
                    {venue.tags.map((tag) => (
                      <Badge key={tag} className="bg-orange-100 text-orange-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed">{venue.description}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader className="bg-orange-50 border-b border-orange-200">
                <CardTitle className="text-orange-800">Amenities</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {venue.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-orange-200">
              <CardHeader className="bg-orange-50 border-b border-orange-200">
                <CardTitle className="text-orange-800">Venue Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="font-semibold text-lg">${venue.price}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="text-sm text-gray-500">Capacity</div>
                    <div className="font-semibold">
                      {venue.minPersonLimit} - {venue.maxPersonLimit} people
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="text-sm text-gray-500">Created</div>
                    <div className="font-semibold">{new Date(venue.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-orange-500" />
                  <div>
                    <div className="text-sm text-gray-500">Last Updated</div>
                    <div className="font-semibold">{new Date(venue.updatedAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader className="bg-orange-50 border-b border-orange-200">
                <CardTitle className="text-orange-800">Vendor Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-sm text-gray-500 mb-1">Vendor ID</div>
                <div className="font-semibold">{venue.vendorId}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
