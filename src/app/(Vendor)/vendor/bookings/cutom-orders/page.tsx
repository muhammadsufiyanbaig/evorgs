"use client"
import { useRouter } from "next/navigation"
import { ArrowLeft, Utensils, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CateringRequestsTable } from "@/app/components/Vendor/booking/custom-order/catring-requests-table"
import { PhotographyRequestsTable } from "@/app/components/Vendor/booking/custom-order/photography-requests-table"
import { mockCateringRequests, mockPhotographyRequests } from "@/utils/data"

export default function CustomOrdersPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-orange-50/50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.push("/vendor/bookings")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Custom Order Requests</h1>
            <p className="text-gray-600 mt-1">Manage and quote custom catering and photography orders.</p>
          </div>
        </div>

        <Tabs defaultValue="catering" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-orange-200/50 p-1 rounded-lg">
            <TabsTrigger
              value="catering"
              className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-md"
            >
              <Utensils className="w-4 h-4 mr-2" />
              Catering Requests
            </TabsTrigger>
            <TabsTrigger
              value="photography"
              className="data-[state=active]:bg-orange-600 data-[state=active]:text-white rounded-md"
            >
              <Camera className="w-4 h-4 mr-2" />
              Photography Requests
            </TabsTrigger>
          </TabsList>
          <TabsContent value="catering" className="mt-4">
            <CateringRequestsTable requests={mockCateringRequests} />
          </TabsContent>
          <TabsContent value="photography" className="mt-4">
            <PhotographyRequestsTable requests={mockPhotographyRequests} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
