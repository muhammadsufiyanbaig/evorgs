import Link from "next/link"
import { getAllPackages } from "@/utils/data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Eye, Pencil, Trash2 } from "lucide-react"
import { deletePackageAction } from "@/app/(Admin)/admin/photography/actions"

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString()
}

export default async function StandardPackagesPage() {
  const { packages, total } = getAllPackages({ page: 1, pageSize: 100 })

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-xl font-semibold">Standard Packages</h1>
          <p className="text-sm text-muted-foreground">{total} total packages</p>
        </div>
        <Button asChild className="bg-orange-600 hover:bg-orange-700">
          <Link href="/admin/photography/standard/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Package
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="bg-orange-50 px-4 py-3 border-b border-orange-100">
          <h2 className="text-sm font-medium text-orange-700">AdminGetAllPackages</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-orange-50/60">
              <TableHead className="min-w-[120px]">Package ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {packages.map((p) => (
              <TableRow key={p.id} className="hover:bg-orange-50/30">
                <TableCell className="font-medium">{p.id}</TableCell>
                <TableCell>{p.packageName}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{p.vendor?.vendorName ?? p.vendorId}</span>
                    <span className="text-xs text-muted-foreground">{p.vendor?.vendorEmail}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(p.price)}</TableCell>
                <TableCell>{p.duration}h</TableCell>
                <TableCell>
                  {p.isAvailable ? (
                    <Badge className="bg-green-100 text-green-700 border border-green-200">Available</Badge>
                  ) : (
                    <Badge className="bg-slate-100 text-slate-700 border border-slate-200">Unavailable</Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(p.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="secondary" asChild>
                      <Link href={`/admin/photography/standard/${p.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      asChild
                      className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
                    >
                      <Link href={`/admin/photography/standard/${p.id}/edit`}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Link>
                    </Button>
                    <form action={deletePackageAction}>
                      <input type="hidden" name="id" value={p.id} />
                      <Button variant="destructive" size="icon" className="bg-red-600 hover:bg-red-700">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete package</span>
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {packages.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-10 text-sm text-muted-foreground">
                  No packages found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
