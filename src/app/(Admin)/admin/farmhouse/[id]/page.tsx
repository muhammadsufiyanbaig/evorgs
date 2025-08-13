import { getFarmhouseById } from "@/utils/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Bed, Calendar, DollarSign, Wifi, ParkingSquare, Utensils, Bath } from 'lucide-react';

export default async function FarmhouseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
const resolvedParams = await params;
const farmhouse = await getFarmhouseById(resolvedParams.id);

if (!farmhouse) {
    notFound();
}

const amenityIcons: { [key: string]: React.ReactNode } = {
    'WiFi': <Wifi className="h-5 w-5 text-orange-600" />,
    'Pool': <Bath className="h-5 w-5 text-orange-600" />,
    'Kitchen': <Utensils className="h-5 w-5 text-orange-600" />,
    'Free Parking': <ParkingSquare className="h-5 w-5 text-orange-600" />,
};

return (
    <div className="container mx-auto py-10 bg-white min-h-screen">
        <div className="mb-6">
            <Button variant="outline" asChild className="border-orange-500 text-orange-600 hover:bg-orange-50">
                <Link href="/">&larr; Back to List</Link>
            </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <Card className="border-orange-200 bg-white shadow-lg">
                    <CardHeader>
                        <Image
                            src={farmhouse.imageUrl || "/placeholder.svg"}
                            alt={farmhouse.name}
                            width={800}
                            height={500}
                            className="rounded-lg object-cover w-full border-2 border-orange-100"
                        />
                    </CardHeader>
                    <CardContent>
                        <h1 className="text-4xl font-bold mt-4 text-orange-800">{farmhouse.name}</h1>
                        <p className="text-lg text-orange-600 mt-1">{farmhouse.location}</p>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="flex items-center gap-1">
                                <Star className="w-5 h-5 text-orange-400 fill-orange-400" />
                                <span className="font-bold text-orange-700">{farmhouse.rating}</span>
                                <span className="text-sm text-orange-500">({farmhouse.reviewCount} reviews)</span>
                            </div>
                            <Badge variant={farmhouse.isAvailable ? "default" : "destructive"} 
                                         className={farmhouse.isAvailable ? "bg-orange-500 text-white hover:bg-orange-600" : ""}>
                                {farmhouse.isAvailable ? "Available" : "Unavailable"}
                            </Badge>
                        </div>
                        <p className="mt-6 text-lg text-gray-700">{farmhouse.description}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-8">
                <Card className="border-orange-200 bg-white shadow-lg">
                    <CardHeader className="bg-orange-50">
                        <CardTitle className="text-orange-800">Booking Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-orange-600"><DollarSign className="w-5 h-5" /> Price per night</span>
                            <span className="font-bold text-lg text-orange-700">${farmhouse.perNightPrice}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-orange-600"><Users className="w-5 h-5" /> Max Guests</span>
                            <span className="font-bold text-orange-700">{farmhouse.maxGuests}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-orange-600"><Bed className="w-5 h-5" /> Min Nights</span>
                            <span className="font-bold text-orange-700">{farmhouse.minNights}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-2 text-orange-600"><Calendar className="w-5 h-5" /> Max Nights</span>
                            <span className="font-bold text-orange-700">{farmhouse.maxNights}</span>
                        </div>
                        <Button size="lg" className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white">
                            <Link href={`/admin/farmhouse/${farmhouse.id}/edit`}>Edit Farmhouse</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="border-orange-200 bg-white shadow-lg">
                    <CardHeader className="bg-orange-50">
                        <CardTitle className="text-orange-800">Amenities</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4">
                        {farmhouse.amenities.map(amenity => (
                            <div key={amenity} className="flex items-center gap-2">
                                {amenityIcons[amenity] || <Star className="h-5 w-5 text-orange-600" />}
                                <span className="text-orange-700">{amenity}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
);
}
