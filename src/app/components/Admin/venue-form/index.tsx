"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import type { Venue } from "@/utils/data"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  imageUrl: z
    .string()
    .url({
      message: "Image URL must be a valid URL.",
    }),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
  tags: z.string().optional(), // Comma-separated string
  amenities: z.string().optional(), // Comma-separated string
  minPersonLimit: z.number().min(1, {
    message: "Minimum person limit must be at least 1.",
  }),
  maxPersonLimit: z.number().min(1, {
      message: "Maximum person limit must be at least 1.",
    }),
  isAvailable: z.boolean(),
  vendorId: z.string().min(1, {
    message: "Vendor ID is required.",
  }),
}).refine((data) => data.maxPersonLimit >= data.minPersonLimit, {
  message: "Max person limit must be greater than or equal to min person limit.",
  path: ["maxPersonLimit"],
})

interface VenueFormProps {
  initialData?: Venue
  onSubmit: (data: z.infer<typeof formSchema>) => Promise<void>
  isEditing?: boolean
}

export function VenueForm({ initialData, onSubmit, isEditing = false }: VenueFormProps) {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      location: initialData?.location || "",
      description: initialData?.description || "",
      imageUrl: initialData?.imageUrl || "/placeholder.svg?height=200&width=300",
      price: initialData?.price || 0,
      tags: initialData?.tags.join(", ") || "",
      amenities: initialData?.amenities.join(", ") || "",
      minPersonLimit: initialData?.minPersonLimit || 1,
      maxPersonLimit: initialData?.maxPersonLimit || 1,
      isAvailable: initialData?.isAvailable ?? true,
      vendorId: initialData?.vendorId || "",
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await onSubmit(values)
        toast({
          title: isEditing ? "Venue Updated" : "Venue Created",
          description: isEditing
            ? `"${values.name}" has been updated successfully.`
            : `"${values.name}" has been created successfully.`,
        })
        router.push("/dashboard")
        router.refresh()
      } catch (error) {
        toast({
          title: "Error",
          description: `Failed to ${isEditing ? "update" : "create"} venue.`,
          variant: "destructive",
        })
        console.error(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">{isEditing ? "Edit Venue" : "Create New Venue"}</h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Grand Ballroom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="vendorId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vendor ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g., vendor-a" {...field} />
              </FormControl>
              <FormDescription>This identifies the vendor associated with the venue.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 123 Event St, Cityville" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="A spacious and elegant ballroom..." {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="/placeholder.svg?height=200&width=300" {...field} />
              </FormControl>
              <FormDescription>Provide a direct URL to the venue's image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 1500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minPersonLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Min. Persons</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxPersonLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max. Persons</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="e.g., ballroom, luxury, wedding" {...field} />
              </FormControl>
              <FormDescription>Comma-separated values (e.g., tag1, tag2)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amenities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amenities</FormLabel>
              <FormControl>
                <Input placeholder="e.g., catering, sound system, parking" {...field} />
              </FormControl>
              <FormDescription>Comma-separated values (e.g., amenity1, amenity2)</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Availability</FormLabel>
                <FormDescription>Set the current availability status of the venue.</FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                  className="data-[state=checked]:bg-orange-500"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isPending}>
          {isPending ? "Saving..." : isEditing ? "Save Changes" : "Create Venue"}
        </Button>
      </form>
    </Form>
  )
}
