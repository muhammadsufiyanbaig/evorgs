import Link from "next/link"
import Image from "next/image"
import { GetAllCateringPackages, DeleteStandardPackage } from "@/app/(Admin)/admin/catering/action"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeleteDialog } from "@/app/components/Admin/delete-dailog"

export default async function Page() {
  const data = await GetAllCateringPackages(1, 20)

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-orange-700">Standard Packages</h1>
        <Link href="/admin/catering/standard/create">
          <Button className="bg-orange-600 hover:bg-orange-700 text-white">Create Package</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-orange-700">All Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package</TableHead>
                  <TableHead>Service Area</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Available</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.packages.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="max-w-[300px]">
                      <div className="flex items-center gap-3">
                        <Image
                          src={p.imageUrl || "/placeholder.svg?height=48&width=86&query=catering%20thumb"}
                          alt={`Image of ${p.packageName}`}
                          width={86}
                          height={48}
                          className="h-12 w-[86px] rounded object-cover"
                        />
                        <div className="min-w-0">
                          <Link href={`/admin/catering/standard/${p.id}`} className="font-medium hover:underline">
                            {p.packageName}
                          </Link>
                          <div className="truncate text-sm text-muted-foreground">{p.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{p.serviceArea}</TableCell>
                    <TableCell>${p.price.toFixed(2)}</TableCell>
                    <TableCell>
                      {p.minGuests} - {p.maxGuests}
                    </TableCell>
                    <TableCell>{p.isAvailable ? "Yes" : "No"}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/admin/catering/standard/${p.id}/edit`}>
                        <Button
                          variant="outline"
                          className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                        >
                          Edit
                        </Button>
                      </Link>
                      <DeleteDialog
                        title="Delete Package"
                        description="Are you sure you want to delete this package? This action cannot be undone."
                        action={DeleteStandardPackage}
                        id={p.id}
                        buttonText="Delete"
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {data.packages.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground">
                      No packages found.
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
