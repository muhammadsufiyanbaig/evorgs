import Image from "next/image"
import Link from "next/link"
import { GetStandardPackageById } from "@/app/(Admin)/admin/catering/action"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default async function Page({ params }: { params: { id: string } }) {
  const pkg = await GetStandardPackageById(params.id)
  if (!pkg) {
    return <div className="text-muted-foreground">Package not found.</div>
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-orange-700">{pkg.packageName}</h1>
        <Link href={`/admin/catering/standard/${pkg.id}/edit`}>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">Edit</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-orange-700">Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            <Image
              src={pkg.imageUrl || "/placeholder.svg?height=240&width=480&query=catering%20package"}
              alt={`Image of ${pkg.packageName}`}
              width={960}
              height={480}
              className="h-auto w-full rounded border object-cover"
            />
            <p className="leading-relaxed">{pkg.description}</p>
            <div className="grid grid-cols-2 gap-4 rounded border p-4">
              <div>
                <div className="text-sm text-muted-foreground">Service Area</div>
                <div className="font-medium">{pkg.serviceArea}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Price</div>
                <div className="font-medium">${pkg.price.toFixed(2)} per guest</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Guests</div>
                <div className="font-medium">
                  {pkg.minGuests} - {pkg.maxGuests}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Availability</div>
                <Badge className={pkg.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                  {pkg.isAvailable ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </div>
            <div>
              <div className="mb-2 font-semibold text-orange-700">Menu Items</div>
              <ul className="list-inside list-disc space-y-1">
                {pkg.menuItems.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-2 font-semibold text-orange-700">Dietary Options</div>
              <div className="flex flex-wrap gap-2">
                {pkg.dietaryOptions.map((d, i) => (
                  <Badge key={i} variant="secondary" className="bg-orange-100 text-orange-800">
                    {d}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="mb-2 font-semibold text-orange-700">Amenities</div>
              <div className="flex flex-wrap gap-2">
                {pkg.amenities.map((a, i) => (
                  <Badge key={i} variant="outline" className="border-orange-200 text-orange-800">
                    {a}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4 rounded border p-4">
            <div>
              <div className="text-sm text-muted-foreground">Vendor ID</div>
              <div className="font-medium">{pkg.vendorId}</div>
            </div>
            <Separator />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Created</div>
                <div className="font-medium">{new Date(pkg.createdAt).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Updated</div>
                <div className="font-medium">{new Date(pkg.updatedAt).toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Reviews</div>
                <div className="font-medium">{pkg.reviewCount}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
