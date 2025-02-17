import { ChevronLeft, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function VenderDailySales() {
  const transactionData = [
    { type: "Services", salesQty: 0, refundQty: 0, total: "PKR 0.00" },
    { type: "Products", salesQty: 0, refundQty: 0, total: "PKR 0.00" },
    { type: "Shipping", salesQty: 0, refundQty: 0, total: "PKR 0.00" },
    { type: "Gift cards", salesQty: 0, refundQty: 0, total: "PKR 0.00" },
    { type: "Memberships", salesQty: 0, refundQty: 0, total: "PKR 0.00" },
    { type: "Late cancellation fees", salesQty: 0, refundQty: 0, total: "PKR 0.00" },
    { type: "No-show fees", salesQty: 0, refundQty: 0, total: "PKR 0.00" },
    { type: "Refund amount", salesQty: 0, refundQty: 0, total: "PKR 0.00" },
  ]

  const cashMovementData = [
    { type: "Cash", collected: "PKR 0.00", refunded: "PKR 0.00" },
    { type: "Other", collected: "PKR 0.00", refunded: "PKR 0.00" },
    { type: "Gift card redemptions", collected: "PKR 0.00", refunded: "PKR 0.00" },
    { type: "Payments collected", collected: "PKR 0.00", refunded: "PKR 0.00" },
    { type: "Of which tips", collected: "PKR 0.00", refunded: "PKR 0.00" },
  ]

  return (
    <div className="space-y-6 ">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Daily sales</h2>
          <p className="text-sm text-muted-foreground">
            View, filter and export the transactions and cash movement for the day.
          </p>
        </div>
        <Button variant="outline">
          Export <Download className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="sm">
          Today
        </Button>
        <Button variant="ghost" size="sm">
          Monday 17 Feb, 2025
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border">
          <div className="p-4">
            <h3 className="font-semibold">Transaction summary</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item type</TableHead>
                <TableHead className="text-right">Sales qty</TableHead>
                <TableHead className="text-right">Refund qty</TableHead>
                <TableHead className="text-right">Gross total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionData.map((row) => (
                <TableRow key={row.type}>
                  <TableCell>{row.type}</TableCell>
                  <TableCell className="text-right">{row.salesQty}</TableCell>
                  <TableCell className="text-right">{row.refundQty}</TableCell>
                  <TableCell className="text-right">{row.total}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-medium">Total Sales</TableCell>
                <TableCell className="text-right">0</TableCell>
                <TableCell className="text-right">0</TableCell>
                <TableCell className="text-right">PKR 0.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="rounded-lg border">
          <div className="p-4">
            <h3 className="font-semibold">Cash movement summary</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment type</TableHead>
                <TableHead className="text-right">Payments collected</TableHead>
                <TableHead className="text-right">Refunds paid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cashMovementData.map((row) => (
                <TableRow key={row.type}>
                  <TableCell>{row.type}</TableCell>
                  <TableCell className="text-right">{row.collected}</TableCell>
                  <TableCell className="text-right">{row.refunded}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

