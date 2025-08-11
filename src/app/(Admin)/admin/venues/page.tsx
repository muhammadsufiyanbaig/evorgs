"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Edit, Star } from "lucide-react"

// Mock data based on the GraphQL schema
const mockVenues = [
  {
    id: "1",
    vendorId: "vendor-1",
    name: "Grand Ballroom",
    location: "Downtown Plaza, New York",
    description: "Elegant ballroom perfect for weddings and corporate events",
    imageUrl: "/placeholder.svg?height=100&width=100",
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
  },
  {
    id: "2",
    vendorId: "vendor-2",
    name: "Garden Pavilion",
    location: "Central Park, New York",
    description: "Beautiful outdoor venue with garden views",
    imageUrl: "/placeholder.svg?height=100&width=100",
    price: 1800,
    tags: ["Outdoor", "Garden", "Wedding"],
    amenities: ["Garden View", "Parking", "Catering"],
    minPersonLimit: 30,
    maxPersonLimit: 150,
    isAvailable: false,
    rating: 4.5,
    reviewCount: 89,
    createdAt: "2024-01-10T09:00:00Z",
    updatedAt: "2024-01-18T16:45:00Z",
  },
  {
    id: "3",
    vendorId: "vendor-3",
    name: "Modern Conference Center",
    location: "Business District, New York",
    description: "State-of-the-art conference facility",
    imageUrl: "/placeholder.svg?height=100&width=100",
    price: 3200,
    tags: ["Corporate", "Conference", "Modern"],
    amenities: ["WiFi", "AV Equipment", "Parking", "Catering"],
    minPersonLimit: 20,
    maxPersonLimit: 500,
    isAvailable: true,
    rating: 4.9,
    reviewCount: 156,
    createdAt: "2024-01-05T11:00:00Z",
    updatedAt: "2024-01-22T10:15:00Z",
  },
]

export default function VenuesPage() {
  const [venues, setVenues] = useState(mockVenues)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredVenues = venues.filter(
    (venue) =>
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleAvailability = (id: string) => {
    setVenues(venues.map((venue) => (venue.id === id ? { ...venue, isAvailable: !venue.isAvailable } : venue)))
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">All Venues</h1>
          <Link href="/admin/venues/create">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Venue
            </Button>
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search venues..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-orange-200 focus:border-orange-500"
            />
          </div>
        </div>

        <Card className="border-orange-200">
          <CardHeader className="bg-orange-50 border-b border-orange-200">
            <CardTitle className="text-orange-800">Venues Management</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-orange-100">
                  <TableHead>Venue</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVenues.map((venue) => (
                  <TableRow key={venue.id} className="border-orange-100">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src={venue.imageUrl || "/placeholder.svg"}
                          alt={venue.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{venue.name}</div>
                          <div className="flex gap-1 mt-1">
                            {venue.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-orange-100 text-orange-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">{venue.location}</TableCell>
                    <TableCell className="font-medium">${venue.price}</TableCell>
                    <TableCell className="text-gray-600">
                      {venue.minPersonLimit} - {venue.maxPersonLimit}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{venue.rating}</span>
                        <span className="text-gray-500">({venue.reviewCount})</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={venue.isAvailable}
                        onCheckedChange={() => toggleAvailability(venue.id)}
                        className="data-[state=checked]:bg-orange-500"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/venues/${venue.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/venues/${venue.id}/edit`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
