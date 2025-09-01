import Link from "next/link";
import { getFarmhouses } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';
import { FarmhousesTable } from "@/app/components/Admin/farmhouse-table";

export default async function FarmhousesPage() {
const farmhouses = await getFarmhouses();

return (
  <div className="container mx-auto py-10 bg-white min-h-screen">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight text-orange-600">Farmhouses</h1>
      <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
        <Link href="/admin/farmhouse/create">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Farmhouse
        </Link>
      </Button>
    </div>
    <FarmhousesTable data={farmhouses} />
  </div>
);
}
