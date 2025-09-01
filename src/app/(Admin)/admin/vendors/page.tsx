"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { VendorTable } from "@/app/components/Admin/vendor-table"
import { type Vendor, graphqlClient } from "@/utils/data"
import { useToast } from "@/hooks/use-toast"

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchVendors = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await graphqlClient.adminListAllVendors()
      setVendors(response.vendors)
    } catch (err) {
      setError("Failed to fetch vendors.")
      toast({
        title: "Error",
        description: "Failed to load vendors. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVendors()
  }, [])

  const handleVendorStatusChange = async (id: string, status: boolean) => {
    const originalVendors = [...vendors]
    setVendors((prev) => prev.map((vendor) => (vendor.id === id ? { ...vendor, vendorStatus: status } : vendor)))
    try {
      await graphqlClient.updateVendor(id, { vendorStatus: status })
    } catch (err) {
      setVendors(originalVendors) // Revert on error
      toast({
        title: "Error",
        description: `Failed to update vendor status for ${id}.`,
        variant: "destructive",
      })
    }
  }

  const handleVendorDelete = (id: string) => {
    setVendors((prev) => prev.filter((vendor) => vendor.id !== id))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)] bg-white">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-orange-600 font-medium">Loading vendors...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] bg-white">
        <div className="text-center bg-orange-50 p-8 rounded-lg border border-orange-200">
          <p className="text-orange-700 mb-4 font-medium">{error}</p>
          <Button 
            onClick={fetchVendors} 
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 bg-white min-h-screen p-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="font-bold text-lg md:text-3xl">Vendors</h1>
        <Button 
          asChild 
          size="sm" 
          className="h-10 gap-2 bg-white text-orange-600 hover:bg-orange-50 border border-orange-200"
        >
          <Link href="/admin/vendors/create">
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap font-medium">Add Vendor</span>
          </Link>
        </Button>
      </div>
      <Card className="border-orange-200 shadow-lg">
        <CardHeader className="bg-orange-50 border-b border-orange-100">
          <CardTitle className="text-orange-800 text-xl">All Vendors</CardTitle>
          <CardDescription className="text-orange-600">
            Manage your vendor list and their verification status.
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white p-6">
          <VendorTable
            vendors={vendors}
            onVendorStatusChange={handleVendorStatusChange}
            onDeleteVendor={handleVendorDelete}
          />
        </CardContent>
      </Card>
    </div>
  )
}
