"use client"

import { useState, useMemo } from "react"
import { Calendar, Search, Filter, Tag, TrendingDown, Receipt, MapPin, Sparkles, Gift, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Types based on the schema
type ServiceType = "FarmHouse" | "Venue" | "Catering" | "Photography"
type DiscountType = "Percentage" | "Fixed Amount"

interface VoucherUsageRecord {
  id: string
  voucherId: string
  userId: string
  bookingId: string
  originalAmount: number
  discountAmount: number
  finalAmount: number
  serviceType: ServiceType
  serviceId: string
  appliedAt: string
  // Additional voucher details for display
  voucher: {
    couponCode: string
    title: string
    description: string
    discountType: DiscountType
    discountValue: number
  }
  // Additional service details
  service: {
    name: string
    location?: string
  }
}

export default function VoucherHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("recent")

  // Mock data for voucher usage history
  const mockVoucherHistory: VoucherUsageRecord[] = [
    {
      id: "usage-1",
      voucherId: "voucher-1",
      userId: "user-123",
      bookingId: "booking-1",
      originalAmount: 25000,
      discountAmount: 5000,
      finalAmount: 20000,
      serviceType: "Venue",
      serviceId: "venue-1",
      appliedAt: "2024-01-15T10:30:00Z",
      voucher: {
        couponCode: "SAVE20",
        title: "20% Off All Services",
        description: "Get 20% discount on all bookings",
        discountType: "Percentage",
        discountValue: 20,
      },
      service: {
        name: "Grand Ballroom",
        location: "Mumbai, Maharashtra",
      },
    },
    {
      id: "usage-2",
      voucherId: "voucher-2",
      userId: "user-123",
      bookingId: "booking-2",
      originalAmount: 15000,
      discountAmount: 500,
      finalAmount: 14500,
      serviceType: "Photography",
      serviceId: "photo-1",
      appliedAt: "2024-01-10T14:20:00Z",
      voucher: {
        couponCode: "PHOTO500",
        title: "₹500 Off Photography",
        description: "Fixed discount on photography services",
        discountType: "Fixed Amount",
        discountValue: 500,
      },
      service: {
        name: "Professional Wedding Photography",
        location: "Delhi, India",
      },
    },
    {
      id: "usage-3",
      voucherId: "voucher-3",
      userId: "user-123",
      bookingId: "booking-3",
      originalAmount: 35000,
      discountAmount: 3500,
      finalAmount: 31500,
      serviceType: "Catering",
      serviceId: "catering-1",
      appliedAt: "2024-01-05T16:45:00Z",
      voucher: {
        couponCode: "FEAST10",
        title: "10% Off Catering",
        description: "Special discount on catering services",
        discountType: "Percentage",
        discountValue: 10,
      },
      service: {
        name: "Premium Wedding Catering",
        location: "Bangalore, Karnataka",
      },
    },
    {
      id: "usage-4",
      voucherId: "voucher-4",
      userId: "user-123",
      bookingId: "booking-4",
      originalAmount: 45000,
      discountAmount: 4500,
      finalAmount: 40500,
      serviceType: "FarmHouse",
      serviceId: "farm-1",
      appliedAt: "2023-12-20T12:15:00Z",
      voucher: {
        couponCode: "FARM10",
        title: "10% Off Farm House",
        description: "Discount on farm house bookings",
        discountType: "Percentage",
        discountValue: 10,
      },
      service: {
        name: "Luxury Farm House Resort",
        location: "Gurgaon, Haryana",
      },
    },
    {
      id: "usage-5",
      voucherId: "voucher-5",
      userId: "user-123",
      bookingId: "booking-5",
      originalAmount: 18000,
      discountAmount: 1000,
      finalAmount: 17000,
      serviceType: "Venue",
      serviceId: "venue-2",
      appliedAt: "2023-12-15T09:30:00Z",
      voucher: {
        couponCode: "VENUE1000",
        title: "₹1000 Off Venue",
        description: "Fixed discount on venue bookings",
        discountType: "Fixed Amount",
        discountValue: 1000,
      },
      service: {
        name: "Elegant Banquet Hall",
        location: "Pune, Maharashtra",
      },
    },
  ]

  // Calculate statistics
  const totalSavings = mockVoucherHistory.reduce((sum, record) => sum + record.discountAmount, 0)
  const totalBookings = mockVoucherHistory.length
  const averageSavings = totalBookings > 0 ? totalSavings / totalBookings : 0

  // Filter and sort data
  const filteredAndSortedHistory = useMemo(() => {
    const filtered = mockVoucherHistory.filter((record) => {
      const matchesSearch =
        record.voucher.couponCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.voucher.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.service.name.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesService = serviceFilter === "all" || record.serviceType === serviceFilter

      return matchesSearch && matchesService
    })

    // Sort data
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime()
        case "oldest":
          return new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime()
        case "savings-high":
          return b.discountAmount - a.discountAmount
        case "savings-low":
          return a.discountAmount - b.discountAmount
        default:
          return 0
      }
    })

    return filtered
  }, [searchTerm, serviceFilter, sortBy])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getServiceIcon = (serviceType: ServiceType) => {
    switch (serviceType) {
      case "Venue":
        return "🏛️"
      case "FarmHouse":
        return "🏡"
      case "Catering":
        return "🍽️"
      case "Photography":
        return "📸"
      default:
        return "🎉"
    }
  }

  const getServiceColor = (serviceType: ServiceType) => {
    switch (serviceType) {
      case "Venue":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "FarmHouse":
        return "bg-orange-50 text-orange-600 border-orange-100"
      case "Catering":
        return "bg-orange-200 text-orange-800 border-orange-300"
      case "Photography":
        return "bg-orange-150 text-orange-700 border-orange-200"
      default:
        return "bg-orange-100 text-orange-700 border-orange-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="space-y-8">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-3xl p-8 shadow-lg border border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white rounded-2xl shadow-md">
              <Gift className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">My Voucher History</h1>
              <p className="text-gray-600 mt-2 text-lg">Track all your amazing savings and voucher usage</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-orange-600">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">You're saving smart! Keep it up! 🎉</span>
          </div>
        </div>

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-orange-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 opacity-10 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                  <TrendingDown className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Savings</p>
                  <p className="text-3xl font-bold text-orange-600">₹{totalSavings.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">Money saved with vouchers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-orange-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 opacity-10 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                  <Receipt className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Bookings</p>
                  <p className="text-3xl font-bold text-orange-600">{totalBookings}</p>
                  <p className="text-sm text-gray-500 mt-1">Bookings with vouchers</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-white to-orange-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 opacity-10 rounded-full -mr-10 -mt-10"></div>
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Avg. Savings</p>
                  <p className="text-3xl font-bold text-orange-600">₹{Math.round(averageSavings).toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">Per booking average</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                  <Input
                    placeholder="Search by voucher code, title, or service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 border-2 border-orange-100 focus:border-orange-300 rounded-xl bg-orange-50/30"
                  />
                </div>
              </div>

              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-full sm:w-56 h-12 border-2 border-orange-100 focus:border-orange-300 rounded-xl bg-orange-50/30">
                  <Filter className="h-5 w-5 mr-2 text-orange-500" />
                  <SelectValue placeholder="Filter by service" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-orange-100">
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="Venue">🏛️ Venue</SelectItem>
                  <SelectItem value="FarmHouse">🏡 Farm House</SelectItem>
                  <SelectItem value="Catering">🍽️ Catering</SelectItem>
                  <SelectItem value="Photography">📸 Photography</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-56 h-12 border-2 border-orange-100 focus:border-orange-300 rounded-xl bg-orange-50/30">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-orange-100">
                  <SelectItem value="recent">📅 Most Recent</SelectItem>
                  <SelectItem value="oldest">⏰ Oldest First</SelectItem>
                  <SelectItem value="savings-high">💰 Highest Savings</SelectItem>
                  <SelectItem value="savings-low">💸 Lowest Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Voucher History List */}
        <div className="space-y-6">
          {filteredAndSortedHistory.length === 0 ? (
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-16 text-center">
                <div className="p-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Tag className="h-12 w-12 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">No vouchers found</h3>
                <p className="text-gray-600 text-lg">
                  {searchTerm || serviceFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "You haven't used any vouchers yet. Start saving today!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAndSortedHistory.map((record, index) => (
              <Card
                key={record.id}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/95 backdrop-blur-sm hover:bg-white transform hover:-translate-y-1 group"
              >
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-gradient-to-r from-orange-100 to-orange-200 rounded-xl">
                              <span className="text-2xl">{getServiceIcon(record.serviceType)}</span>
                            </div>
                            <div>
                              <h3 className="font-bold text-xl text-gray-900 group-hover:text-orange-600 transition-colors">
                                {record.voucher.title}
                              </h3>
                              <Badge
                                variant="secondary"
                                className="mt-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-3 py-1 rounded-full"
                              >
                                {record.voucher.couponCode}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-gray-600 text-base leading-relaxed">{record.voucher.description}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <Badge
                          className={`${getServiceColor(record.serviceType)} font-medium px-4 py-2 rounded-full border`}
                        >
                          {record.serviceType}
                        </Badge>

                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                          <MapPin className="h-4 w-4" />
                          <span className="font-medium">{record.service.name}</span>
                        </div>

                        {record.service.location && (
                          <div className="text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                            📍 {record.service.location}
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-4 py-2 rounded-full">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(record.appliedAt)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="lg:text-right space-y-3 bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-2xl min-w-[200px]">
                      <div className="text-sm text-gray-600 font-medium">
                        Original: <span className="line-through">₹{record.originalAmount.toLocaleString()}</span>
                      </div>
                      <div className="text-2xl font-bold text-orange-600">
                        💰 ₹{record.discountAmount.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">SAVED</div>
                      <div className="text-lg font-bold text-gray-900 border-t border-orange-300 pt-3">
                        Paid: ₹{record.finalAmount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 bg-white/50 px-3 py-1 rounded-full">
                        ID: {record.bookingId}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Enhanced Load More Section */}
        {filteredAndSortedHistory.length > 0 && (
          <div className="text-center py-8">
            <div className="bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl p-6 inline-block">
              <p className="text-orange-700 font-semibold text-lg">
                🎉 Showing all {filteredAndSortedHistory.length} voucher
                {filteredAndSortedHistory.length !== 1 ? "s" : ""}
              </p>
              <p className="text-orange-600 text-sm mt-1">You're doing great with your savings!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
