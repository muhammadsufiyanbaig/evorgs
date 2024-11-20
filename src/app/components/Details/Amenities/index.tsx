
import { Button } from "@/components/ui/button";
import { Fitness, Glass, Pool, Restaurant, RoomServices, Span, TEA, Wifi } from "@/utils/Icons/icons";

export default function Amenities() {
  const amenities = [
    { icon: <Pool height={15} width={15} />, label: "Outdoor pool" },
    { icon: <Pool height={15} width={15} />, label: "Indoor pool" },
    { icon: <Span height={15} width={15} />, label: "Spa and wellness center" },
    { icon: <Restaurant height={15} width={15} />, label: "Restaurant" },
    { icon: <RoomServices height={15} width={15} />, label: "Room service" },
    { icon: <Fitness height={15} width={15} />, label: "Fitness center" },
    { icon: <Glass height={15} width={15} />, label: "Bar/Lounge" },
    { icon: <Wifi height={15} width={15} />, label: "Free Wi-Fi" },
    { icon: <TEA height={15} width={15} />, label: "Tea/coffee machine" },
  ];

  return (
    <section className="pt-8">
      <div className="contaniner pt-8 border-t space-y-4 ">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
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
