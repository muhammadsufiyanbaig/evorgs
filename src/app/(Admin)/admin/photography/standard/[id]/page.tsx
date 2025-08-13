import Link from "next/link"
import { notFound } from "next/navigation"
import { findPackageById } from "@/utils/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)
}
function formatDate(iso: string) {
  return new Date(iso).toLocaleString()
}

export default async function PackageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pkg = findPackageById(id)
  if (!pkg) return notFound()

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          asChild
          className="border-orange-300 text-orange-700 hover:bg-orange-50 bg-transparent"
        >
          <Link href="/admin/photography/standard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">{pkg.packageName}</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="secondary">
            <Link href={`/admin/photography/standard/${pkg.id}/edit`}>Edit</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="bg-orange-50 border-b border-orange-100">
            <CardTitle className="text-orange-700">Package</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">ID</span>
              <span className="font-medium">{pkg.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{pkg.packageName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium">{formatCurrency(pkg.price)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{pkg.duration}h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Availability</span>
              {pkg.isAvailable ? (
                <Badge className="bg-green-100 text-green-700 border border-green-200">Available</Badge>
              ) : (
                <Badge className="bg-slate-100 text-slate-700 border border-slate-200">Unavailable</Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">{formatDate(pkg.createdAt)}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-orange-50 border-b border-orange-100">
            <CardTitle className="text-orange-700">Vendor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Vendor ID</span>
              <span className="font-medium">{pkg.vendor?.id ?? pkg.vendorId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{pkg.vendor?.vendorName ?? "-"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{pkg.vendor?.vendorEmail ?? "-"}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{pkg.vendor?.vendorPhone ?? "-"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
