
import { Button } from "@/components/ui/button";
import { SquareCheckBig } from "lucide-react";

interface AmenitiesProps {
  serviceData?: any;
  serviceType?: 'catering' | 'farmhouse' | 'venue' | null;
}

export default function Amenities({ serviceData, serviceType }: AmenitiesProps) {
  // Extract amenities based on service type
  const serviceAmenities = serviceType === 'farmhouse'
    ? serviceData?.amenities || []
    : serviceData?.amenities || serviceData?.features || [];
  
  const defaultAmenities = [
    "Outdoor pool",
    "Indoor pool",
    "Spa and wellness center",
    "Restaurant",
    "Room service",
    "Fitness center",
    "Bar/Lounge",
    "Free Wi-Fi",
    "Tea/coffee machine",
  ];
  
  const amenitiesList = serviceAmenities.length > 0 ? serviceAmenities : defaultAmenities;
  
  const amenities = amenitiesList.map((label: string) => ({
    icon: <SquareCheckBig className="h-4 w-4 text-orange-600"/>,
    label
  }));

  return (
    <section className=" bg-white rounded-lg px-6">
          <h2 className="py-6 text-xl font-bold">Amenities</h2>
        <div className="w-full max-w-4xl">
          <div className="py-6 relative border-t">
          <div className="absolute h-[2px] bg-orange-600 w-1/12 -top-[1px]" />
          <div className="grid gap-4 sm:grid-cols-2">
            {amenities.map((amenity: any, index: number) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                {amenity.icon}
                {amenity.label}
              </div>
            ))}
            <Button
              variant="link"
              className="text-sm hover:text-primary justify-start px-0"
            >
              +24 more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
