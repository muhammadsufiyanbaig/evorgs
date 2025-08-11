"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Farmhouse } from "@/utils/interfaces";
import { createFarmhouse, updateFarmhouse } from "@/utils/data";

import { Button } from "@/components/ui/button";
import {
Form,
FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const formSchema = z.object({
name: z.string().min(2, { message: "Name must be at least 2 characters." }),
location: z.string().min(5, { message: "Location must be at least 5 characters." }),
description: z.string().min(10, { message: "Description must be at least 10 characters." }),
imageUrl: z.string().url({ message: "Please enter a valid URL." }),
perNightPrice: z.number().positive(),
minNights: z.number().int().positive(),
maxNights: z.number().int().positive(),
maxGuests: z.number().int().positive(),
amenities: z.string().min(3, { message: "Please list at least one amenity." }),
isAvailable: z.boolean(),
});

interface FarmhouseFormProps {
farmhouse?: Farmhouse;
}

export function FarmhouseForm({ farmhouse }: FarmhouseFormProps) {
const router = useRouter();
const isEditMode = !!farmhouse;

const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: farmhouse?.name || "",
        location: farmhouse?.location || "",
        description: farmhouse?.description || "",
        imageUrl: farmhouse?.imageUrl || "",
        perNightPrice: farmhouse?.perNightPrice || 100,
        minNights: farmhouse?.minNights || 1,
        maxNights: farmhouse?.maxNights || 30,
        maxGuests: farmhouse?.maxGuests || 2,
        amenities: farmhouse?.amenities.join(", ") || "",
        isAvailable: farmhouse?.isAvailable ?? true,
    },
});

async function onSubmit(values: z.infer<typeof formSchema>) {
    const farmhouseData = {
        ...values,
        amenities: values.amenities.split(",").map(a => a.trim()),
        vendorId: farmhouse?.vendorId || 'vendor-new', // Placeholder
        rating: farmhouse?.rating || 0,
        reviewCount: farmhouse?.reviewCount || 0,
    };

    try {
        if (isEditMode) {
            await updateFarmhouse(farmhouse.id, farmhouseData);
            toast.success("Farmhouse updated successfully.");
            router.push(`/admin/farmhouse/${farmhouse.id}`);
        } else {
            const newFarmhouse = await createFarmhouse(farmhouseData);
            toast.success("Farmhouse created successfully.");
            router.push(`/admin/farmhouse/${newFarmhouse.id}`);
        }
        router.refresh();
    } catch (error) {
        toast.error("Something went wrong. Please try again.");
    }
}

return (
    <div className="bg-gradient-to-br from-orange-50 to-white min-h-screen p-4">
        <Card className="border-orange-200 shadow-lg max-w-4xl mx-auto bg-white">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <CardContent className="pt-6">
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-800 font-semibold">Farmhouse Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="e.g., Sunset Valley Farm" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-800 font-semibold">Location</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="e.g., Napa, California" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
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
                                        <FormLabel className="text-orange-800 font-semibold">Description</FormLabel>
                                        <FormControl>
                                            <Textarea 
                                                placeholder="A beautiful farmhouse..." 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
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
                                        <FormLabel className="text-orange-800 font-semibold">Image URL</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="https://example.com/image.jpg" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="perNightPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-800 font-semibold">Price per Night ($)</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    {...field} 
                                                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="maxGuests"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-800 font-semibold">Max Guests</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    {...field} 
                                                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="minNights"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-800 font-semibold">Minimum Nights</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    {...field} 
                                                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="maxNights"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-orange-800 font-semibold">Maximum Nights</FormLabel>
                                            <FormControl>
                                                <Input 
                                                    type="number" 
                                                    {...field} 
                                                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="amenities"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-orange-800 font-semibold">Amenities</FormLabel>
                                        <FormControl>
                                            <Input 
                                                placeholder="WiFi, Pool, Kitchen" 
                                                {...field} 
                                                className="border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                                            />
                                        </FormControl>
                                        <FormDescription className="text-orange-600">
                                            Enter a comma-separated list of amenities.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="isAvailable"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border border-orange-200 p-4 bg-orange-50">
                                        <div className="space-y-0.5">
                                            <FormLabel className="text-orange-800 font-semibold">Is Available</FormLabel>
                                            <FormDescription className="text-orange-600">
                                                Set whether this farmhouse is currently available for booking.
                                            </FormDescription>
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
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2 bg-orange-50 border-t border-orange-200">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => router.back()}
                            className="border-orange-300 text-orange-700 hover:bg-orange-100"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            className="bg-orange-500 hover:bg-orange-600 text-white border-0"
                        >
                            {isEditMode ? "Save Changes" : "Create Farmhouse"}
                        </Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    </div>
);
}
