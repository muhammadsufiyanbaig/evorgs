import { notFound } from "next/navigation"
import { mockBookings } from "@/utils/data"
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export default async function BookingVisitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const booking = mockBookings.find((b) => b.id === id)

  if (!booking) {
    notFound()
  }

  const visitBadge = (status: (typeof booking)["visitStatus"]) => {
    const map = {
      "Not Requested": {
        className: "bg-gray-100 text-gray-800 border-gray-200",
        icon: <AlertTriangle className="h-4 w-4 mr-2" />,
      },
      Requested: {
        className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <Clock className="h-4 w-4 mr-2" />,
      },
      Scheduled: {
        className: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <Calendar className="h-4 w-4 mr-2" />,
      },
      Completed: {
        className: "bg-green-100 text-green-800 border-green-200",
        icon: <CheckCircle className="h-4 w-4 mr-2" />,
      },
    } as const
    return map[status || "Not Requested"]
  }

  const currentStatus = visitBadge(booking.visitStatus)

  return (
    <>
      <CardHeader>
        <CardTitle>Visit Request Management</CardTitle>
        <CardDescription>Schedule and track site visits for this booking.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="p-6 border rounded-lg bg-gray-50">
          <h4 className="font-semibold text-gray-800 mb-3">Current Status</h4>
          <Badge variant="outline" className={`text-base px-4 py-2 ${currentStatus.className}`}>
            {currentStatus.icon}
            {booking.visitStatus}
          </Badge>
          {booking.visitStatus === "Scheduled" && booking.visitScheduledFor && (
            <p className="text-sm text-gray-600 mt-3">
              Scheduled for:{" "}
              <span className="font-semibold">{new Date(booking.visitScheduledFor).toLocaleString()}</span>
            </p>
          )}
        </div>

        {booking.visitStatus === "Requested" && (
          <div className="border-t pt-6">
            <h4 className="font-semibold text-gray-800 mb-4">Schedule a Visit</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div className="space-y-2">
                <Label htmlFor="visitDateTime">Select Date and Time</Label>
                <Input id="visitDateTime" type="datetime-local" />
              </div>
              <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600">Schedule Visit</Button>
            </div>
          </div>
        )}
      </CardContent>
    </>
  )
}
