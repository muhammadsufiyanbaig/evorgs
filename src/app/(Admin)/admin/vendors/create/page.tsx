import { VendorForm } from "@/app/components/Admin/vendor-form";

export default function CreateVendorPage()

{
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">Create New Vendor</h1>
      </div>
      <VendorForm />
    </div>
  )

}
