"use client"

import { GetStandardPackageById, UpdateStandardPackageAction } from "@/app/(Admin)/admin/catering/action"
import { PackageForm } from "@/app/components/Admin/package-form"

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pkg = await GetStandardPackageById(id)
  if (!pkg) {
    return <div className="text-muted-foreground">Package not found.</div>
  }

  const onSubmit = async (formData: FormData) => {
    await UpdateStandardPackageAction(id, formData)
  }

  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold text-orange-700">Edit Package</h1>
      <PackageForm onSubmit={onSubmit} initial={pkg} submitLabel="Save Changes" />
    </section>
  )
}
