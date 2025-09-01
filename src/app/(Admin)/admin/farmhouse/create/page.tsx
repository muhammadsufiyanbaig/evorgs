import { FarmhouseForm } from "@/app/components/Admin/farmhouse-form";

export default function NewFarmhousePage() {
  return (
    <div className="container mx-auto py-10 max-w-3xl bg-white min-h-screen">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-orange-600">
        Create New Farmhouse
      </h1>
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <FarmhouseForm />
      </div>
    </div>
  );
}
