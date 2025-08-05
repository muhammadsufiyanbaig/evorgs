"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { type Vendor, graphqlClient } from "@/utils/data"
import { useToast } from "@/hooks/use-toast"
const vendorSchema = z.object({
    vendorName: z.string().min(1, "Vendor name is required"),
    vendorEmail: z.string().email("Valid email is required"),
    vendorPhone: z.string().min(1, "Phone number is required"),
    vendorAddress: z.string().min(1, "Address is required"),
    vendorProfileDescription: z.string().optional(),
    vendorWebsite: z.string().url("Valid URL is required").optional().or(z.literal("")),
    vendorSocialLinks: z.string().optional(),
    profileImage: z.string().optional(),
    bannerImage: z.string().optional(),
    vendorType: z.string().min(1, "Vendor type is required"),
    vendorStatus: z.boolean(),
    vendorTypeId: z.string().min(1, "Vendor type ID is required"),
})

type VendorFormData = z.infer<typeof vendorSchema>

interface VendorFormProps {
    initialData?: Vendor
}

export function VendorForm({ initialData }: VendorFormProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<VendorFormData>({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
            vendorName: initialData?.vendorName || "",
            vendorEmail: initialData?.vendorEmail || "",
            vendorPhone: initialData?.vendorPhone || "",
            vendorAddress: initialData?.vendorAddress || "",
            vendorProfileDescription: initialData?.vendorProfileDescription || "",
            vendorWebsite: initialData?.vendorWebsite || "",
            vendorSocialLinks: initialData?.vendorSocialLinks?.join(", ") || "",
            profileImage: initialData?.profileImage || "",
            bannerImage: initialData?.bannerImage || "",
            vendorType: initialData?.vendorType || "",
            vendorStatus: initialData?.vendorStatus || false,
            vendorTypeId: initialData?.vendorTypeId || "",
        },
    })

    const onSubmit = async (values: VendorFormData) => {
        setIsSubmitting(true)
        try {
            const socialLinksArray = values.vendorSocialLinks
                ? values.vendorSocialLinks.split(",").map((link: string) => link.trim())
                : []

            const dataToSubmit = {
                ...values,
                vendorSocialLinks: socialLinksArray,
                vendorProfileDescription: values.vendorProfileDescription || "",
                vendorWebsite: values.vendorWebsite || "",
                profileImage: values.profileImage || "",
                bannerImage: values.bannerImage || "",
                rating: 0,
                reviewCount: 0,
            }

            if (initialData) {
                // Edit existing vendor
                await graphqlClient.updateVendor(initialData.id, dataToSubmit)
                toast({
                    title: "Vendor Updated",
                    description: `${values.vendorName} has been updated successfully.`,
                })
            } else {
                // Create new vendor
                await graphqlClient.createVendor(dataToSubmit)
                toast({
                    title: "Vendor Created",
                    description: `${values.vendorName} has been created successfully.`,
                })
            }
            router.push("/admin/vendors")
            router.refresh() // Refresh data on the list page
        } catch (error) {
            console.error("Failed to save vendor:", error)
            toast({
                title: "Error",
                description: `Failed to save vendor. ${error instanceof Error ? error.message : ""}`,
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-4">
            <Card className="w-full max-w-3xl mx-auto border-orange-200 shadow-xl bg-white">
                <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                    <CardTitle className="text-2xl font-bold text-white">
                        {initialData ? "Edit Vendor" : "Create New Vendor"}
                    </CardTitle>
                    <CardDescription className="text-orange-100">
                        {initialData ? "Update the details for this vendor." : "Fill in the details to create a new vendor."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="vendorName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-700 font-semibold">Vendor Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="Acme Corp" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-orange-600" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vendorEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-700 font-semibold">Vendor Email</FormLabel>
                                        <FormControl>
                                            <Input 
                                                type="email" 
                                                placeholder="contact@example.com" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-orange-600" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vendorPhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-700 font-semibold">Vendor Phone</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="123-456-7890" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-orange-600" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vendorAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-700 font-semibold">Vendor Address</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="123 Business Rd, City, State" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-orange-600" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vendorProfileDescription"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-700 font-semibold">Profile Description</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                placeholder="A brief description of the vendor..." 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-orange-600" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vendorWebsite"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-700 font-semibold">Website URL</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="https://www.example.com" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-orange-600" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vendorSocialLinks"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-700 font-semibold">Social Links (comma-separated)</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="https://twitter.com/example, https://linkedin.com/example" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-orange-600">Separate multiple links with a comma.</FormDescription>
                                        <FormMessage className="text-orange-600" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="profileImage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-700 font-semibold">Profile Image URL</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="/placeholder.svg?height=64&width=64" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-orange-600" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bannerImage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-700 font-semibold">Banner Image URL</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="/placeholder.svg?height=200&width=800" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-orange-600" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vendorType"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-700 font-semibold">Vendor Type</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="e.g., Software, Consulting, Retail" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-orange-600" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vendorStatus"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-orange-200 p-4 bg-orange-50">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-base text-orange-700 font-semibold">Vendor Status</FormLabel>
                                            <FormDescription className="text-orange-600">Toggle to mark vendor as verified or unverified.</FormDescription>
                                        </div>
                                        <FormControl>
                                            <Switch 
                                                checked={field.value} 
                                                onCheckedChange={field.onChange}
                                                className="data-[state=checked]:bg-orange-500"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vendorTypeId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-700 font-semibold">Vendor Type ID</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="e.g., type_1" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-orange-600">Internal ID for vendor type.</FormDescription>
                                        <FormMessage className="text-orange-600" />
                                    </FormItem>
                                )}
                            />
                            <Button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 transition-all duration-200 shadow-lg hover:shadow-xl" 
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Saving..." : initialData ? "Save Changes" : "Create Vendor"}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
