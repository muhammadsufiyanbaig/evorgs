"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Calendar, CheckCircle, XCircle, Clock, User, TrendingUp } from "lucide-react"
import { mockAdInquiries, mockServiceInquiries } from "@/utils/data"


interface ServiceInquiry {
  id: string
  chatId: string
  serviceType: string
  serviceId: string
  inquiryText: string
  status: "Open" | "Answered" | "Converted" | "Closed"
  createdAt: string
  vendorId: string
}

interface AdInquiry {
  id: string
  chatId: string
  adId: string
  inquiryText: string
  status: "Open" | "Answered" | "Converted" | "Closed"
  createdAt: string
  vendorId: string
}

interface InquiriesTabProps {
  userId: string
}

export function InquiriesTab({ userId }: InquiriesTabProps) {
  const [serviceInquiries, setServiceInquiries] = useState<ServiceInquiry[]>([])
  const [adInquiries, setAdInquiries] = useState<AdInquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setServiceInquiries(mockServiceInquiries)
      setAdInquiries(mockAdInquiries)
      setLoading(false)
    }, 800)
  }, [userId])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border-blue-300"
      case "Answered":
        return "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-300"
      case "Converted":
        return "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-800 border-orange-300"
      case "Closed":
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300"
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-gray-300"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <MessageSquare className="w-4 h-4" />
      case "Answered":
        return <CheckCircle className="w-4 h-4" />
      case "Converted":
        return <TrendingUp className="w-4 h-4" />
      case "Closed":
        return <XCircle className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const getServiceTypeColor = (serviceType: string) => {
    const colors = {
      Venue: "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200",
      Farmhouse: "bg-gradient-to-r from-green-50 to-green-100 text-green-700 border-green-200",
      CateringPackage: "bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 border-purple-200",
      PhotographyPackage: "bg-gradient-to-r from-pink-50 to-pink-100 text-pink-700 border-pink-200",
    }
    return (
      colors[serviceType as keyof typeof colors] ||
      "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 border-gray-200"
    )
  }

  const renderServiceInquiry = (inquiry: ServiceInquiry) => (
    <Card
      key={inquiry.id}
      className="mb-4 hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-gradient-to-r from-white to-gray-50"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <Badge className={`${getServiceTypeColor(inquiry.serviceType)} border font-medium`}>
                {inquiry.serviceType}
              </Badge>
              <CardTitle className="text-sm font-semibold text-gray-900 mt-1">Service Inquiry</CardTitle>
            </div>
          </div>
          <Badge
            className={`${getStatusColor(inquiry.status)} flex items-center space-x-1 border font-medium shadow-sm`}
          >
            {getStatusIcon(inquiry.status)}
            <span>{inquiry.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 mb-4 leading-relaxed bg-white/50 p-3 rounded-lg">{inquiry.inquiryText}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border">
          <div className="flex items-center space-x-4">
            <span className="flex items-center font-medium">
              <User className="w-3 h-3 mr-1" />
              Service: {inquiry.serviceId.slice(0, 12)}...
            </span>
            <span className="flex items-center font-medium">
              <MessageSquare className="w-3 h-3 mr-1" />
              Vendor: {inquiry.vendorId.slice(0, 8)}...
            </span>
          </div>
          <span className="flex items-center font-medium">
            <Clock className="w-3 h-3 mr-1" />
            {new Date(inquiry.createdAt).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )

  const renderAdInquiry = (inquiry: AdInquiry) => (
    <Card
      key={inquiry.id}
      className="mb-4 hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-gradient-to-r from-white to-orange-50"
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <Badge className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-700 border border-orange-200 font-medium">
                Advertisement
              </Badge>
              <CardTitle className="text-sm font-semibold text-gray-900 mt-1">Ad Inquiry</CardTitle>
            </div>
          </div>
          <Badge
            className={`${getStatusColor(inquiry.status)} flex items-center space-x-1 border font-medium shadow-sm`}
          >
            {getStatusIcon(inquiry.status)}
            <span>{inquiry.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 mb-4 leading-relaxed bg-white/50 p-3 rounded-lg">{inquiry.inquiryText}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border">
          <div className="flex items-center space-x-4">
            <span className="flex items-center font-medium">
              <User className="w-3 h-3 mr-1" />
              Ad: {inquiry.adId.slice(0, 12)}...
            </span>
            <span className="flex items-center font-medium">
              <MessageSquare className="w-3 h-3 mr-1" />
              Vendor: {inquiry.vendorId.slice(0, 8)}...
            </span>
          </div>
          <span className="flex items-center font-medium">
            <Clock className="w-3 h-3 mr-1" />
            {(new Date(inquiry.createdAt)).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-100"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent absolute top-0"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-full p-6 rounded-lg">
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6 bg-white shadow-sm border-0">
          <TabsTrigger
            value="services"
            className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-100 data-[state=active]:to-orange-200 data-[state=active]:text-orange-700 font-medium"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Services ({serviceInquiries.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="ads"
            className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-100 data-[state=active]:to-orange-200 data-[state=active]:text-orange-700 font-medium"
          >
            <Calendar className="w-4 h-4" />
            <span>Ads ({adInquiries.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="mt-4">
          {serviceInquiries.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No service inquiries</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Your service inquiries will appear here when you contact vendors about their services.
              </p>
            </div>
          ) : (
            <div className="space-y-4">{serviceInquiries.map(renderServiceInquiry)}</div>
          )}
        </TabsContent>

        <TabsContent value="ads" className="mt-4">
          {adInquiries.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">No ad inquiries</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Your advertisement inquiries will appear here when you contact advertisers.
              </p>
            </div>
          ) : (
            <div className="space-y-4">{adInquiries.map(renderAdInquiry)}</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
