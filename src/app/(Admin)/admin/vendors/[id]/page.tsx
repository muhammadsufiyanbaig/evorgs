import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Star } from "lucide-react" // Added Star import

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { graphqlClient } from "@/utils/data"

interface VendorDetailPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function VendorDetailPage({ params }: VendorDetailPageProps) {
    const { id } = await params
    const vendor = await graphqlClient.getVendorById(id)

    if (!vendor) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
            <div className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild className="border-orange-300 text-orange-600 hover:bg-orange-50">
                        <Link href="/admin/vendors">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to vendors</span>
                        </Link>
                    </Button>
                    <h1 className="font-semibold text-lg md:text-2xl text-orange-800">{vendor.vendorName} Details</h1>
                    <div className="ml-auto flex items-center gap-2">
                        <Button asChild variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                            <Link href={`/admin/vendors/${vendor.id}/edit`}>Edit Vendor</Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="lg:col-span-2 bg-white border-orange-200 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                            <CardTitle>Vendor Information</CardTitle>
                            <CardDescription className="text-orange-100">Basic details about the vendor.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-4 p-6">
                            <div className="flex items-center gap-4">
                                <Image
                                    src={vendor.profileImage || "/placeholder.svg?height=96&width=96&query=vendor profile"}
                                    width={96}
                                    height={96}
                                    alt={`${vendor.vendorName} profile`}
                                    className="aspect-square rounded-full object-cover border-4 border-orange-200"
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-orange-800">{vendor.vendorName}</h2>
                                    <p className="text-orange-600">{vendor.vendorEmail}</p>
                                    <Badge variant={vendor.vendorStatus ? "default" : "secondary"} 
                                                 className={`mt-1 ${vendor.vendorStatus ? 'bg-orange-500 hover:bg-orange-600' : 'bg-orange-200 text-orange-700'}`}>
                                        {vendor.vendorStatus ? "Verified" : "Unverified"}
                                    </Badge>
                                </div>
                            </div>
                            <Separator className="bg-orange-200" />
                            <div className="grid gap-2 text-gray-700">
                                <p>
                                    <strong className="text-orange-700">Phone:</strong> {vendor.vendorPhone || "N/A"}
                                </p>
                                <p>
                                    <strong className="text-orange-700">Address:</strong> {vendor.vendorAddress || "N/A"}
                                </p>
                                <p>
                                    <strong className="text-orange-700">Website:</strong>{" "}
                                    {vendor.vendorWebsite ? (
                                        <a
                                            href={vendor.vendorWebsite}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-orange-600 hover:text-orange-800 hover:underline"
                                        >
                                            {vendor.vendorWebsite}
                                        </a>
                                    ) : (
                                        "N/A"
                                    )}
                                </p>
                                <p>
                                    <strong className="text-orange-700">Type:</strong> {vendor.vendorType || "N/A"}
                                </p>
                                <p>
                                    <strong className="text-orange-700">Description:</strong> {vendor.vendorProfileDescription || "N/A"}
                                </p>
                                <p>
                                    <strong className="text-orange-700">Social Links:</strong>{" "}
                                    {vendor.vendorSocialLinks && vendor.vendorSocialLinks.length > 0 ? (
                                        <ul className="list-disc list-inside">
                                            {vendor.vendorSocialLinks.map((link, index) => (
                                                <li key={index}>
                                                    <a
                                                        href={link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-orange-600 hover:text-orange-800 hover:underline"
                                                    >
                                                        {link}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        "N/A"
                                    )}
                                </p>
                                <p>
                                    <strong className="text-orange-700">Created At:</strong> {new Date(vendor.createdAt).toLocaleString()}
                                </p>
                                <p>
                                    <strong className="text-orange-700">Last Updated:</strong> {new Date(vendor.updatedAt).toLocaleString()}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-orange-200 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                            <CardTitle>Rating & Reviews</CardTitle>
                            <CardDescription className="text-orange-100">Overall rating and review count.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-2 p-6">
                            <div className="flex items-center gap-2 text-xl font-bold">
                                <Star className="h-5 w-5 fill-orange-400 text-orange-400" />
                                <span className="text-orange-800">{vendor.rating.toFixed(1)}</span>
                                <span className="text-orange-600 text-sm">({vendor.reviewCount} reviews)</span>
                            </div>
                            <p className="text-orange-600 text-sm">Detailed reviews would be displayed here.</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-orange-200 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                            <CardTitle>Bookings</CardTitle>
                            <CardDescription className="text-orange-100">Recent bookings associated with this vendor.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {vendor.bookings && vendor.bookings.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-700">
                                    {vendor.bookings.map((booking, index) => (
                                        <li key={index} className="text-orange-700">
                                            {booking.service} on {booking.date} - <span className="font-semibold text-orange-800">${booking.amount}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-orange-600">No bookings found.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-orange-200 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                            <CardTitle>Vouchers</CardTitle>
                            <CardDescription className="text-orange-100">Vouchers offered by this vendor.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {vendor.vouchers && vendor.vouchers.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-700">
                                    {vendor.vouchers.map((voucher, index) => (
                                        <li key={index} className="text-orange-700">
                                            Code: <span className="font-semibold">{voucher.code}</span> - Value: <span className="font-semibold text-orange-800">${voucher.value}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-orange-600">No vouchers found.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-orange-200 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                            <CardTitle>POS Data</CardTitle>
                            <CardDescription className="text-orange-100">Point of Sale data for this vendor.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {vendor.posData && vendor.posData.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-700">
                                    {vendor.posData.map((data, index) => (
                                        <li key={index} className="text-orange-700">
                                            {data.month}: <span className="font-semibold text-orange-800">${data.sales}</span> in sales
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-orange-600">No POS data available.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="bg-white border-orange-200 shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-t-lg">
                            <CardTitle>Revenue</CardTitle>
                            <CardDescription className="text-orange-100">Revenue generated by this vendor.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {vendor.revenueData && vendor.revenueData.length > 0 ? (
                                <ul className="list-disc list-inside text-gray-700">
                                    {vendor.revenueData.map((data, index) => (
                                        <li key={index} className="text-orange-700">
                                            {data.month}: <span className="font-semibold text-orange-800">${data.revenue}</span> revenue
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-orange-600">No revenue data available.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
