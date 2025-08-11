"use client"

import { CreateStandardPackageAction } from "@/app/(Admin)/admin/catering/action"
import { PackageForm } from "@/app/components/Admin/package-form"

export default function Page() {
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold text-orange-700">Create Standard Package</h1>
      <PackageForm onSubmit={CreateStandardPackageAction} submitLabel="Create Package" />
    </section>
  )
}
