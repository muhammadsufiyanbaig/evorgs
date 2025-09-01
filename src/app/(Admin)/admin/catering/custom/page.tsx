import { AdminListCustomPackages, DeleteCustomPackage } from "@/app/(Admin)/admin/catering/action"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeleteDialog } from "@/app/components/Admin/delete-dailog"

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-orange-100 text-orange-800",
    confirmed: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
    fulfilled: "bg-sky-100 text-sky-800",
  }
  return <Badge className={map[status] || "bg-muted text-foreground"}>{status}</Badge>
}

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const resolvedSearchParams = await searchParams
  const q = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q : ""
  const status = typeof resolvedSearchParams.status === "string" ? (resolvedSearchParams.status as any) : undefined
  const data = await AdminListCustomPackages({ q, status })

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-orange-700">Custom Orders</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-orange-700">Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Input name="q" placeholder="Search by id, user, vendor, details..." defaultValue={q} />
            <Input name="status" placeholder="Filter by status (pending, confirmed...)" defaultValue={status || ""} />
            <div className="sm:col-span-2">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white" type="submit">
                Apply Filters
              </Button>
            </div>
          </form>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.packages.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="font-medium">{o.id}</TableCell>
                    <TableCell>{o.userId}</TableCell>
                    <TableCell>{o.vendorId}</TableCell>
                    <TableCell>{o.guestCount}</TableCell>
                    <TableCell>{new Date(o.eventDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <StatusBadge status={o.status} />
                    </TableCell>
                    <TableCell className="text-right">${o.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <DeleteDialog
                        title="Delete Custom Order"
                        description="Are you sure you want to delete this custom order? This action cannot be undone."
                        action={DeleteCustomPackage}
                        id={o.id}
                        buttonText="Delete"
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {data.packages.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground">
                      No custom orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
