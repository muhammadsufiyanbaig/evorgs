
import { Button } from "@/components/ui/button";
import { SquareCheckBig } from "lucide-react";

export default function Amenities() {
  const amenities = [
    { icon: <SquareCheckBig className="h-4 w-4 text-orange-600"/>, label: "Outdoor pool" },
    { icon: <SquareCheckBig className="h-4 w-4 text-orange-600"/>, label: "Indoor pool" },
    { icon: <SquareCheckBig className="h-4 w-4 text-orange-600"/>, label: "Spa and wellness center" },
    { icon: <SquareCheckBig className="h-4 w-4 text-orange-600"/>, label: "Restaurant" },
    { icon: <SquareCheckBig className="h-4 w-4 text-orange-600"/>, label: "Room service" },
    { icon: <SquareCheckBig className="h-4 w-4 text-orange-600"/>, label: "Fitness center" },
    { icon: <SquareCheckBig className="h-4 w-4 text-orange-600"/>, label: "Bar/Lounge" },
    { icon: <SquareCheckBig className="h-4 w-4 text-orange-600"/>, label: "Free Wi-Fi" },
    { icon: <SquareCheckBig className="h-4 w-4 text-orange-600"/>, label: "Tea/coffee machine" },
  ];

  return (
    <section className=" bg-white rounded-lg px-6">
          <h2 className="py-6 text-xl font-bold">Amenities</h2>
        <div className="w-full max-w-4xl">
          <div className="py-6 relative border-t">
          <div className="absolute h-[2px] bg-orange-600 w-1/12 -top-[1px]" />
          <div className="grid gap-4 sm:grid-cols-2">
            {amenities.map((amenity, index) => (
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
