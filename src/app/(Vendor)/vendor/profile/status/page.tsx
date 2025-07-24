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
} from "lucide-react"

// Mock vendor data
const mockVendor = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  vendorName: "Sunset Gardens Venue",
  vendorEmail: "contact@sunsetgardens.com",
  vendorPhone: "+1 (555) 123-4567",
  profileImage: "/placeholder.svg?height=80&width=80",
  vendorType: "Venue" as const,
  vendorStatus: "Pending" as "Pending" | "Approved" | "Rejected",
  createdAt: "2024-03-15",
  submittedDocuments: [
    { name: "Business License", status: "verified", uploadedAt: "2024-03-15" },
    { name: "Insurance Certificate", status: "verified", uploadedAt: "2024-03-15" },
    { name: "Tax Registration", status: "pending", uploadedAt: "2024-03-16" },
    { name: "Portfolio/Gallery", status: "verified", uploadedAt: "2024-03-15" },
  ],
  applicationProgress: 75,
  estimatedApprovalTime: "2-3 business days",
  rejectionReason:
    "Missing required insurance documentation. Please upload a valid insurance certificate and resubmit your application.",
  approvedAt: "2024-03-20",
  lastUpdated: "2024-03-18",
}

export default function VendorStatus() {
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
              <AvatarImage src={mockVendor.profileImage || "/placeholder.svg"} alt={mockVendor.vendorName} />
              <AvatarFallback className="bg-white text-orange-600 text-xl font-bold">
                {mockVendor.vendorName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">{mockVendor.vendorName}</h1>
              <p className="text-orange-100 mt-1">Account Status Dashboard</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-white text-orange-600">{mockVendor.vendorType}</Badge>
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
              <div className="flex justify-center mb-4">{getStatusIcon(mockVendor.vendorStatus)}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Account Status:{" "}
                <span className={`${getStatusColor(mockVendor.vendorStatus).split(" ")[1]}`}>
                  {mockVendor.vendorStatus}
                </span>
              </h2>

              {mockVendor.vendorStatus === "Pending" && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Your application is currently under review. We'll notify you once a decision is made.
                  </p>
                  <div className="max-w-md mx-auto">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Application Progress</span>
                      <span>{mockVendor.applicationProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${mockVendor.applicationProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-sm text-orange-600">Estimated approval time: {mockVendor.estimatedApprovalTime}</p>
                </div>
              )}

              {mockVendor.vendorStatus === "Approved" && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Congratulations! Your vendor account has been approved and is now active.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 font-medium">
                      Approved on:{" "}
                      {new Date(mockVendor.approvedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Button className="bg-orange-500 hover:bg-orange-600">Access Vendor Dashboard</Button>
                </div>
              )}

              {mockVendor.vendorStatus === "Rejected" && (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Unfortunately, your application has been rejected. Please review the feedback below.
                  </p>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                    <h4 className="font-medium text-red-800 mb-2 flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Rejection Reason:
                    </h4>
                    <p className="text-red-700">{mockVendor.rejectionReason}</p>
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
                        {new Date(mockVendor.createdAt).toLocaleDateString("en-US", {
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
                    <span className="text-sm font-mono text-gray-900">#{mockVendor.id.slice(-8)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Vendor Type</span>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">{mockVendor.vendorType}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Submitted</span>
                    <span className="text-sm text-gray-900">{new Date(mockVendor.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <span className="text-sm text-gray-900">
                      {new Date(mockVendor.lastUpdated).toLocaleDateString()}
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

            {mockVendor.vendorStatus === "Pending" && (
              <Card className="border-orange-100">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Calendar className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                    <h3 className="font-medium text-gray-900 mb-2">What's Next?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Our team will review your application within {mockVendor.estimatedApprovalTime}. You'll receive an
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
