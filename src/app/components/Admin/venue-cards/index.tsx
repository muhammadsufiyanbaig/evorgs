import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Venue } from "@/utils/data"

interface VenueDetailsCardProps {
  venue: Venue
}

export function VenueDetailsCard({ venue }: VenueDetailsCardProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <Image
          src={venue.imageUrl || "/placeholder.svg"}
          width={200}
          height={150}
          alt={`Image of ${venue.name}`}
          className="rounded-lg object-cover w-full md:w-[200px] h-[150px]"
        />
        <div className="flex-1">
          <CardTitle className="text-3xl font-bold text-orange-700">{venue.name}</CardTitle>
          <CardDescription className="text-lg text-gray-600 mt-1">{venue.location}</CardDescription>
          <div className="mt-2 flex items-center gap-2">
            <Badge
              variant={venue.isAvailable ? "default" : "destructive"}
              className={venue.isAvailable ? "bg-orange-500 hover:bg-orange-600" : ""}
            >
              {venue.isAvailable ? "Available" : "Unavailable"}
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
              Rating: {venue.rating} ({venue.reviewCount} reviews)
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div>
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Description</h3>
          <p className="text-gray-700 leading-relaxed">{venue.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2">Pricing & Capacity</h3>
            <p className="text-gray-700">
              <span className="font-medium">Price:</span> ${venue.price}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Min. Persons:</span> {venue.minPersonLimit}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Max. Persons:</span> {venue.maxPersonLimit}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-orange-600 mb-2">Details</h3>
            <p className="text-gray-700">
              <span className="font-medium">Vendor ID:</span> {venue.vendorId}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Created At:</span> {new Date(venue.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Last Updated:</span> {new Date(venue.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {venue.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-orange-50 text-orange-600">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-orange-600 mb-2">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {venue.amenities.map((amenity, index) => (
              <Badge key={index} variant="secondary" className="bg-orange-50 text-orange-600">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
