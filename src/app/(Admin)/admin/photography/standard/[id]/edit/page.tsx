import { notFound } from "next/navigation"
import { findPackageById, getVendors } from "@/utils/data"
import { updatePackageAction } from "@/app/(Admin)/admin/photography/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

export default async function EditPackagePage({ params }: { params: { id: string } }) {
  const pkg = findPackageById(params.id)
  const vendors = getVendors()
  if (!pkg) return notFound()

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader className="bg-orange-50 border-b border-orange-100">
          <CardTitle className="text-orange-700">Edit Package</CardTitle>
        </CardHeader>
        <form action={updatePackageAction}>
          <input type="hidden" name="id" value={pkg.id} />
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="packageName">Package Name</Label>
              <Input id="packageName" name="packageName" defaultValue={pkg.packageName} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="vendorId">Vendor</Label>
              <select
                id="vendorId"
                name="vendorId"
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                defaultValue={pkg.vendorId}
                required
              >
                {vendors.map((v: { id: string | number; vendorName: string; vendorEmail: string }) => (
                  <option key={v.id} value={String(v.id)}>
                    {v.vendorName} ({v.vendorEmail})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input id="price" name="price" type="number" min="0" step="0.01" defaultValue={pkg.price} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  step="1"
                  defaultValue={pkg.duration}
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="isAvailable"
                name="isAvailable"
                type="checkbox"
                className="h-4 w-4 rounded border-orange-300 text-orange-600 focus:ring-orange-500"
                defaultChecked={pkg.isAvailable}
              />
              <Label htmlFor="isAvailable" className="select-none">
                Available
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
              asChild
            >
              <a href={`/admin/photography/standard/${pkg.id}`}>Cancel</a>
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
