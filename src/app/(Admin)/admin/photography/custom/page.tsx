import { getAllCustomOrders, findVendorById } from "@/utils/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2 } from "lucide-react"
import { deleteCustomOrderAction } from "@/app/(Admin)/admin/photography/actions"
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react"

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString()
}

function statusBadgeColor(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-orange-100 text-orange-700 border border-orange-200"
    case "CONFIRMED":
      return "bg-amber-100 text-amber-700 border border-amber-200"
    case "COMPLETED":
      return "bg-green-100 text-green-700 border border-green-200"
    case "CANCELLED":
      return "bg-red-100 text-red-700 border border-red-200"
    default:
      return "bg-slate-100 text-slate-700 border border-slate-200"
  }
}

export default async function CustomOrdersPage() {
  const { orders, total } = getAllCustomOrders({ page: 1, pageSize: 100 })

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold">Custom Orders</h1>
          <p className="text-sm text-muted-foreground">{total} total custom orders</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="bg-orange-50 px-4 py-3 border-b border-orange-100">
          <h2 className="text-sm font-medium text-orange-700">AdminGetAllCustomOrders</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-orange-50/60">
              <TableHead className="min-w-[120px]">Order ID</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>User ID</TableHead>
              <TableHead className="max-w-[280px]">Details</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o: { vendorId: string; id: string; userId: string; orderDetails: string; eventDate: string; eventDuration: number; price: number; status: string; createdAt: string; updatedAt: string }) => {
              const vendor = findVendorById(o.vendorId)
              return (
                <TableRow key={o.id} className="hover:bg-orange-50/30">
                  <TableCell className="font-medium">{o.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{vendor?.vendorName ?? o.vendorId}</span>
                      <span className="text-xs text-muted-foreground">{vendor?.vendorEmail}</span>
                    </div>
                  </TableCell>
                  <TableCell>{o.userId}</TableCell>
                  <TableCell className="max-w-[280px]">
                    <div className="line-clamp-2 text-sm">{o.orderDetails}</div>
                  </TableCell>
                  <TableCell>{formatDate(o.eventDate)}</TableCell>
                  <TableCell>{o.eventDuration}h</TableCell>
                  <TableCell className="text-right">{formatCurrency(o.price)}</TableCell>
                  <TableCell>
                    <Badge className={statusBadgeColor(o.status)}>{o.status}</Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{formatDate(o.createdAt)}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{formatDate(o.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <form action={deleteCustomOrderAction}>
                      <input type="hidden" name="id" value={o.id} />
                      <Button variant="destructive" size="icon" className="bg-red-600 hover:bg-red-700">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete order</span>
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              )
            })}
            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-10 text-sm text-muted-foreground">
                  No custom orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
