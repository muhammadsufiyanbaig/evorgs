import { getVendors } from "@/utils/data"
import { createPackageAction } from "@/app/(Admin)/admin/photography/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default async function CreateStandardPackagePage() {
  const vendors = getVendors()

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader className="bg-orange-50 border-b border-orange-100">
          <CardTitle className="text-orange-700">Create Standard Package</CardTitle>
        </CardHeader>
        <form action={createPackageAction}>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="packageName">Package Name</Label>
              <Input id="packageName" name="packageName" placeholder="e.g., Wedding Gold" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="vendorId">Vendor</Label>
              <select
                id="vendorId"
                name="vendorId"
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                defaultValue={vendors[0]?.id}
                required
              >
                {vendors.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.vendorName} ({v.vendorEmail})
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input id="price" name="price" type="number" min="0" step="0.01" placeholder="0.00" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input id="duration" name="duration" type="number" min="1" step="1" placeholder="4" required />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="isAvailable"
                name="isAvailable"
                type="checkbox"
                className="h-4 w-4 rounded border-orange-300 text-orange-600 focus:ring-orange-500"
                defaultChecked
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
              <a href="/admin/photography/standard">Cancel</a>
            </Button>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
              Create
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
