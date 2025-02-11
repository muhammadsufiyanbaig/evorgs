import Image from "next/image";
import { Button } from "@/components/ui/button";

interface Room {
  id: number;
  image: string;
  name: string;
  description: string;
  price: number;
}

const rooms: Room[] = [
  {
    id: 1,
    image: "https://via.placeholder.com/400x300",
    name: "Superior room",
    description: "1 double bed or 2 twin beds",
    price: 240,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/400x300",
    name: "Superior room - City view",
    description: "1 double bed or 2 twin beds",
    price: 280,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/400x300",
    name: "Superior room - City view",
    description: "1 double bed or 2 twin beds",
    price: 320,
  },
  {
    id: 4,
    image: "https://via.placeholder.com/400x300",
    name: "Superior room - City view",
    description: "1 double bed or 2 twin beds",
    price: 350,
  },
];

export default function component() {
  return (
    <section className="mt-8">
      <div className="container pt-8 border-t">
        <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
        <div className="space-y-4">
          {rooms.map((room) => (
            <div key={room.id} className="py-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <Image
                    src={room.image}
                    alt=""
                    width={50}
                    height={50}
                    className="rounded-lg aspect-square"
                  />
                  <div className="flex justify-between w-full md:w-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-center md:gap-2">
                      <h3 className="font-medium">{room.name}</h3>
                      <span className="hidden md:block">-</span>
                      <p className="text-sm">{room.description}</p>
                    </div>
                    <div className="text-right md:hidden">
                    <span className="text-lg font-semibold">${room.price}</span>
                    <span className="text-sm">
                      /night
                    </span>
                  </div>
                  </div>
                </div>
                <div className="flex min[510px]:flex-col md:flex-row gap-2 items-center md:gap-6">
                  <div className="text-right hidden md:block">
                    <span className="text-lg font-semibold">${room.price}</span>
                    <span className="text-sm">/night</span>
                  </div>
                  <Button className="whitespace-nowrap bg-orange-600 w-full">
                    Book now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
