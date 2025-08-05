import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { graphqlClient } from "@/utils/data"
import { VendorForm } from "@/app/components/Admin/vendor-form"

interface EditVendorPageProps {
    params: {
        id: string
    }
}

export default async function EditVendorPage({ params }: EditVendorPageProps) {
    const vendor = await graphqlClient.getVendorById(params.id)

    if (!vendor) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 shadow-lg">
                <div className="flex flex-col gap-4 max-w-6xl mx-auto">
                    <div className="flex items-center gap-4">
                        <Button 
                            variant="outline" 
                            size="icon" 
                            asChild
                            className="bg-white border-white text-orange-600 hover:bg-orange-50 hover:border-orange-200"
                        >
                            <Link href="/admin/vendors">
                                <ArrowLeft className="h-4 w-4" />
                                <span className="sr-only">Back to vendors</span>
                            </Link>
                        </Button>
                        <h1 className="font-semibold text-lg md:text-2xl text-white">
                            Edit Vendor: {vendor.vendorName}
                        </h1>
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="bg-white rounded-lg shadow-md border border-orange-100 p-6">
                    <VendorForm initialData={vendor} />
                </div>
            </div>
        </div>
    )
}
