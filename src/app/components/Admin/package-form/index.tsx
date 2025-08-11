"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import type { CateringPackage } from "@/utils/interfaces"

export function PackageForm({
  onSubmit,
  initial,
  submitLabel = "Create Package",
}: {
  onSubmit: (formData: FormData) => void
  initial?: Partial<CateringPackage>
  submitLabel?: string
}) {
  const [isAvailable, setIsAvailable] = useState<boolean>(initial?.isAvailable ?? true)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-orange-700">{submitLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="vendorId">Vendor ID</Label>
            <Input id="vendorId" name="vendorId" required defaultValue={initial?.vendorId || ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="packageName">Package Name</Label>
            <Input id="packageName" name="packageName" required defaultValue={initial?.packageName || ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceArea">Service Area</Label>
            <Input id="serviceArea" name="serviceArea" defaultValue={initial?.serviceArea || ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (per guest)</Label>
            <Input id="price" name="price" type="number" step="0.01" defaultValue={initial?.price ?? 0} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="minGuests">Min Guests</Label>
            <Input id="minGuests" name="minGuests" type="number" defaultValue={initial?.minGuests ?? 0} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="maxGuests">Max Guests</Label>
            <Input id="maxGuests" name="maxGuests" type="number" defaultValue={initial?.maxGuests ?? 0} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" rows={4} defaultValue={initial?.description || ""} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              defaultValue={initial?.imageUrl || "/placeholder.svg?height=240&width=480"}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="menuItems">Menu Items (comma-separated)</Label>
            <Input
              id="menuItems"
              name="menuItems"
              defaultValue={(initial?.menuItems || []).join(", ")}
              placeholder="e.g., Roast chicken, Caesar salad"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="dietaryOptions">Dietary Options (comma-separated)</Label>
            <Input
              id="dietaryOptions"
              name="dietaryOptions"
              defaultValue={(initial?.dietaryOptions || []).join(", ")}
              placeholder="e.g., Vegetarian, Vegan, Gluten-Free"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="amenities">Amenities (comma-separated)</Label>
            <Input
              id="amenities"
              name="amenities"
              defaultValue={(initial?.amenities || []).join(", ")}
              placeholder="e.g., Setup, Cleanup"
            />
          </div>
          <div className="flex items-center gap-2 md:col-span-2">
            <Switch id="isAvailable" checked={isAvailable} onCheckedChange={setIsAvailable} />
            <input type="hidden" name="isAvailable" value={isAvailable ? "true" : "false"} />
            <Label htmlFor="isAvailable">Available</Label>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reviewCount">Review Count</Label>
            <Input id="reviewCount" name="reviewCount" type="number" defaultValue={initial?.reviewCount ?? 0} />
          </div>
          <div className="md:col-span-2">
            <Button className="bg-orange-600 hover:bg-orange-700 text-white" type="submit">
              {submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
