"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  FileText,
  User,
  Building,
  MessageSquare,
  Loader2,
  RefreshCw,
} from "lucide-react"

// Simple vendor type
type Vendor = {
  id?: string
  vendorName: string
  vendorEmail: string
  vendorStatus: string
  vendorType?: string
  profileImage?: string
  rating?: number
  reviewCount?: number
  createdAt: string
}

export default function VendorStatus() {
  // Mock vendor data - replace with actual auth context/hook
  const authUser = null // Replace with your auth hook
  const userType = null // Replace with your auth context

  // Use auth data as vendor
  const vendor = (userType === 'Vendor' && authUser) ? authUser as Vendor : null

  // Mock data for features not yet in GraphQL schema
  const mockData = {
    submittedDocuments: [
      { name: "Business License", status: "verified", uploadedAt: "2024-03-15" },
      { name: "Insurance Certificate", status: "verified", uploadedAt: "2024-03-15" },
      { name: "Tax Registration", status: "pending", uploadedAt: "2024-03-16" },
      { name: "Portfolio/Gallery", status: "verified", uploadedAt: "2024-03-15" },
    ],
    applicationProgress: 75,
    estimatedApprovalTime: "2-3 business days",
    rejectionReason: "Missing required insurance documentation. Please upload a valid insurance certificate and resubmit your application.",
    lastUpdated: "2024-03-18",
  }

  // Error state - redirect if not vendor
  if (!vendor) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Access Denied</h3>
            <p className="text-red-600 mb-4">Please login as vendor to access this page.</p>
            <Button onClick={() => window.location.href = '/login'} className="bg-red-500 hover:bg-red-600">
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-8 w-8 text-green-500" />
      case "Pending":
        return <Clock className="h-8 w-8 text-orange-500" />
      case "Rejected":
        return <XCircle className="h-8 w-8 text-red-500" />
      default:
        return <AlertCircle className="h-8 w-8 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-50 text-green-700 border-green-200"
      case "Pending":
        return "bg-orange-50 text-orange-700 border-orange-200"
      case "Rejected":
        return "bg-red-50 text-red-700 border-red-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20 border-4 border-white">
              <AvatarImage src={vendor.profileImage || "/placeholder.svg"} alt={vendor.vendorName} />
              <AvatarFallback className="bg-white text-orange-600 text-xl font-bold">
                {vendor.vendorName?.charAt(0) || 'V'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{vendor.vendorName}</h1>
              <p className="text-orange-100 mt-1">Account Status Dashboard</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-white text-orange-600">{vendor.vendorType}</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-6 relative z-10">
        {/* Main Status Card */}
        <Card className="mb-8 border-orange-100 shadow-lg">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="flex justify-center mb-4">{getStatusIcon(vendor.vendorStatus)}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Account Status:{" "}
                <span className={`${getStatusColor(vendor.vendorStatus).split(" ")[1]}`}>
                  {vendor.vendorStatus}
                </span>
              </h2>

              {vendor.vendorStatus === "Pending" && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Your application is currently under review. We'll notify you once a decision is made.
                  </p>
                  <div className="max-w-md mx-auto">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Application Progress</span>
                      <span>{mockData.applicationProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${mockData.applicationProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-orange-600">Estimated approval time: {mockData.estimatedApprovalTime}</p>
                </div>
              )}

              {vendor.vendorStatus === "Approved" && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Congratulations! Your vendor account has been approved and is now active.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-medium">
                      Approved on:{" "}
                      {new Date(vendor.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">Access Vendor Dashboard</Button>
                </div>
              )}

              {vendor.vendorStatus === "Rejected" && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Unfortunately, your application has been rejected. Please review the feedback below.
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                    <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Rejection Reason:
                    </h4>
                    <p className="text-red-700">{mockData.rejectionReason}</p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button className="bg-orange-500 hover:bg-orange-600">Resubmit Application</Button>
                    <Button
                      variant="outline"
                      className="border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                    >
                      Contact Support
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Application Details */}
          <div className="lg:col-span-2 space-y-6">

            <Card className="border-orange-100">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-orange-500" />
                  Application Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Application Submitted</p>
                      <p className="text-sm text-gray-500">
                        {new Date(vendor.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Documents Uploaded</p>
                      <p className="text-sm text-gray-500">All required documents submitted</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Under Review</p>
                      <p className="text-sm text-gray-500">Admin team is reviewing your application</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Clock className="h-4 w-4 text-gray-400" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-400">Final Decision</p>
                      <p className="text-sm text-gray-400">Pending review completion</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
             <Card className="border-orange-100">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Building className="h-5 w-5 text-orange-500" />
                  Application Info
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Application ID</span>
                    <span className="text-sm font-mono text-gray-900">#{vendor.id?.slice(-8) || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Vendor Type</span>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">{vendor.vendorType}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Submitted</span>
                    <span className="text-sm text-gray-900">{new Date(vendor.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <span className="text-sm text-gray-900">
                      {new Date(mockData.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
           

            <Card className="border-orange-100">
              <CardHeader className="border-b border-orange-50">
                <CardTitle className="text-gray-900">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                <Button
                  variant="outline"
                  className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Support
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Support
                </Button>
              </CardContent>
            </Card>

            {vendor.vendorStatus === "Pending" && (
              <Card className="border-orange-100">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Calendar className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                    <h3 className="font-medium text-gray-900 mb-2">What's Next?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Our team will review your application within {mockData.estimatedApprovalTime}. You'll receive an
                      email notification once a decision is made.
                    </p>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <p className="text-xs text-orange-700">
                        💡 Tip: Make sure your email notifications are enabled to receive updates promptly.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
