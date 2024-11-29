"use client"

import { useState } from "react"
import { Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

// Sample data for demonstration
const bookings = [
  { id: 1, service: "Wedding Venue", date: "2024-04-20T18:00:00Z", status: "upcoming", image: "/venue-category.jpg" },
  { id: 2, service: "Luxury Farmhouse", date: "2024-05-05T12:00:00Z", status: "upcoming", image: "/farmHouse-category.jpg" },
  { id: 3, service: "Wedding Photography", date: "2024-03-15T15:00:00Z", status: "completed", image: "/photography-category.jpg" },
  { id: 4, service: "Corporate Catering", date: "2024-02-10T13:00:00Z", status: "completed", image: "/catering-category.jpg" },
  { id: 5, service: "Birthday Venue", date: "2024-04-01T14:30:00Z", status: "upcoming", image: "/venue-category.jpg" },
  { id: 6, service: "Engagement Photography", date: "2024-03-01T16:00:00Z", status: "completed", image: "/photography-category.jpg" },
  { id: 7, service: "Event Catering", date: "2024-02-20T17:00:00Z", status: "completed", image: "/catering-category.jpg" },
]

export default function BookingHistory() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "completed">("all")
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filteredBookings = bookings.filter(booking => 
    filter === "all" || booking.status === filter
  )

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="w-full min-h-screen max-w-screen mt-10 p-8 bg-gradient-to-br from-orange-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-orange-500 dark:text-orange-400 mb-6 text-center">Your Booking History</h2>
      
      <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)} className="mb-6">
        <TabsList className="flex justify-center space-x-5 bg-transparent p-1">
          <TabsTrigger 
            value="all" 
            className="px-6 py-2 font-semibold text-sm transition-all duration-300 rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white shadow-md data-[state=active]:shadow-orange-300 hover:bg-orange-100 hover:scale-105 dark:hover:bg-orange-800"
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="upcoming" 
            className="px-6 py-2 font-semibold text-sm transition-all duration-300 rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white shadow-md data-[state=active]:shadow-orange-300 hover:bg-orange-100 hover:scale-105 dark:hover:bg-orange-800"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger 
            value="completed" 
            className="px-6 py-2 font-semibold text-sm transition-all duration-300 rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white shadow-md data-[state=active]:shadow-orange-300 hover:bg-orange-100 hover:scale-105 dark:hover:bg-orange-800"
          >
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 transition-opacity duration-300 ease-in-out">
          No bookings found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={booking.image}
                  alt={booking.service}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge 
                    variant="outline"
                    className={`text-xs font-semibold ${
                      booking.status === "upcoming"
                        ? "bg-green-500 text-white border-green-600"
                        : "bg-blue-500 text-white border-blue-600"
                    }`}
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{booking.service}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>{new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(booking.date))}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>{new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(new Date(booking.date))}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-4 text-orange-500 hover:text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-900/30 w-full justify-between"
                  onClick={() => toggleExpand(booking.id)}
                >
                  {expandedId === booking.id ? "Less details" : "More details"}
                  {expandedId === booking.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
                <div 
                  className={`mt-4 text-sm text-gray-600 dark:text-gray-300 overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedId === booking.id ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <p>Additional booking details can be displayed here, such as:</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Organizer name</li>
                    <li>Contact details</li>
                    <li>Special instructions</li>
                    <li>Booking reference number</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
