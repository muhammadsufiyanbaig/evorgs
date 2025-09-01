"use client"

import { useState, useTransition } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { PencilIcon, EyeIcon } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { type Venue, updateVenueAvailability } from "@/utils/data"
import { toast } from "@/hooks/use-toast"

interface VenueTableProps {
  venues: Venue[]
}

export function VenueTable({ venues }: VenueTableProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [venueStates, setVenueStates] = useState(
    (venues || []).reduce(
      (acc, venue) => {
        acc[venue.id] = venue.isAvailable
        return acc
      },
      {} as Record<string, boolean>,
    ),
  )

  const handleAvailabilityChange = async (venueId: string, checked: boolean) => {
    setVenueStates((prev) => ({ ...prev, [venueId]: checked }))
    startTransition(async () => {
      const updatedVenue = await updateVenueAvailability(venueId, checked)
      if (updatedVenue) {
        toast({
          title: "Availability Updated",
          description: `Venue "${updatedVenue.name}" is now ${updatedVenue.isAvailable ? "available" : "unavailable"}.`,
        })
        router.refresh() // Revalidate data
      } else {
        toast({
          title: "Error",
          description: "Failed to update venue availability.",
          variant: "destructive",
        })
        setVenueStates((prev) => ({ ...prev, [venueId]: !checked })) // Revert on error
      }
    })
  }

  return (
    <div className="border shadow-sm rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {venues?.map((venue) => (
            <TableRow key={venue.id}>
              <TableCell>
                <Image
                  src={venue.imageUrl || "/placeholder.svg"}
                  width={64}
                  height={64}
                  alt={`Image of ${venue.name}`}
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>
              <TableCell className="font-medium">{venue.name}</TableCell>
              <TableCell>{venue.location}</TableCell>
              <TableCell>${venue.price}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`availability-${venue.id}`}
                    checked={venueStates[venue.id]}
                    onCheckedChange={(checked) => handleAvailabilityChange(venue.id, checked)}
                    disabled={isPending}
                    className="data-[state=checked]:bg-orange-500"
                  />
                  <Label htmlFor={`availability-${venue.id}`} className="sr-only">
                    Toggle availability for {venue.name}
                  </Label>
                </div>
              </TableCell>
              <TableCell className="flex justify-center gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600 bg-transparent"
                >
                  <Link href={`/admin/dashboard/venues/${venue.id}`}>
                    <EyeIcon className="h-4 w-4 mr-1" /> View
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="text-orange-500 border-orange-500 hover:bg-orange-50 hover:text-orange-600 bg-transparent"
                >
                  <Link href={`/admin/dashboard/venues/${venue.id}/edit`}>
                    <PencilIcon className="h-4 w-4 mr-1" /> Edit
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
