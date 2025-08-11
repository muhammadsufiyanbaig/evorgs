import { FarmhouseForm } from "@/app/components/Admin/farmhouse-form";
import { getFarmhouseById } from "@/utils/data";
import { notFound } from "next/navigation";

export default async function EditFarmhousePage({ params }: { params: { id: string } }) {
    const farmhouse = await getFarmhouseById(params.id);

    if (!farmhouse) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto py-10 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight mb-8 text-orange-600 border-b-2 border-orange-200 pb-4">
                    Edit: {farmhouse.name}
                </h1>
                <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                    <FarmhouseForm farmhouse={farmhouse} />
                </div>
            </div>
        </div>
    );
}
