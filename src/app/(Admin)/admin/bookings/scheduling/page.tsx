"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

// Mock data for scheduling
const mockScheduledVisits = [
  {
    id: "1",
    date: "2024-01-15",
    time: "10:00 AM",
    customer: "John Doe",
    vendor: "Elite Photography",
    service: "Wedding Photography",
    status: "scheduled",
  },
  {
    id: "2",
    date: "2024-01-20",
    time: "2:00 PM",
    customer: "Sarah Johnson",
    vendor: "Garden Venues",
    service: "Venue Visit",
    status: "scheduled",
  },
]

export default function SchedulingPage() {
  return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Visit Scheduling</h1>
          <p className="text-gray-600 mt-2">Schedule and manage vendor visits</p>
        </div>

        {/* Scheduled Visits */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Scheduled Visits</CardTitle>
            <CardDescription>Upcoming vendor visits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockScheduledVisits.map((visit) => (
                <div key={visit.id} className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{visit.customer}</p>
                      <p className="text-sm text-gray-600">{visit.vendor}</p>
                      <p className="text-sm text-gray-500">{visit.service}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {visit.date}
                        <Clock className="w-4 h-4 ml-3 mr-1" />
                        {visit.time}
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{visit.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Scheduling */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="text-gray-900">Pending Scheduling</CardTitle>
            <CardDescription>Visit requests that need to be scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <p className="text-gray-500">No pending visit requests to schedule</p>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
