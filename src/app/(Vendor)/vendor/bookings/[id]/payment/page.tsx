import { notFound } from "next/navigation"
import { mockBookings } from "@/utils/data"
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default async function BookingPaymentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const booking = mockBookings.find((b) => b.id === id)

  if (!booking) {
    notFound()
  }

  const paidAmount = booking.advanceAmount + booking.balanceAmount
  const progressValue = (paidAmount / booking.totalAmount) * 100

  const paymentBadge = (status: (typeof booking)["paymentStatus"]) => {
    const map = {
      "Awaiting Advance": "bg-gray-100 text-gray-800 border-gray-200",
      "Advance Paid": "bg-orange-100 text-orange-800 border-orange-200",
      "Partially Paid": "bg-purple-100 text-purple-800 border-purple-200",
      "Fully Paid": "bg-green-100 text-green-800 border-green-200",
      Refunded: "bg-pink-100 text-pink-800 border-pink-200",
      Canceled: "bg-red-100 text-red-800 border-red-200",
    } as const
    return map[status]
  }

  return (
    <>
      <CardHeader>
        <CardTitle>Payment Management</CardTitle>
        <CardDescription>Track and manage payments for this booking.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="p-6 border rounded-lg bg-gray-50">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800">Payment Overview</h4>
            <Badge variant="outline" className={paymentBadge(booking.paymentStatus)}>
              {booking.paymentStatus}
            </Badge>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Total Amount:</span>
              <span className="font-bold text-lg text-gray-900">${booking.totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid:</span>
              <span className="font-medium text-green-600">${paidAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Remaining Balance:</span>
              <span className="font-medium text-red-600">${(booking.totalAmount - paidAmount).toFixed(2)}</span>
            </div>
          </div>
          <Progress value={progressValue} className="mt-4 h-2 [&>*]:bg-orange-500" />
        </div>

        <div className="border-t pt-6">
          <h4 className="font-semibold text-gray-800 mb-4">Log a New Payment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="paymentAmount">Payment Amount</Label>
              <Input id="paymentAmount" type="number" placeholder="e.g., 500.00" />
            </div>
            <Button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600">Add Payment</Button>
          </div>
        </div>
      </CardContent>
    </>
  )
}
