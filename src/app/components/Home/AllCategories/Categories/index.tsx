import { Card } from "@/components/ui/card";
import { Camera, Hotel, School, Utensils } from "lucide-react";
import React from "react";

interface Category {
  name: string;
  count: number;
  icon: React.ReactNode;
}

const categories = [
  { name: "Photography", icon: Camera, count: 10 },
  { name: "Catring", icon: Utensils, count: 3 },
  { name: "Farm House", icon: Hotel, count: 4 },
  { name: "Venue", icon: School, count: 3 },
];

const CategoriesCard = () => {
  return (
    <section className="py-28">
      <div className="container px-4 lg:px-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:w-[85%] mx-auto ">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.name}
                className="p-6 text-center hover:bg-orange-200 group hover:border-orange-600 transition-colors duration-150 cursor-pointer bg-white/90 backdrop-blur-sm"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 group-hover:bg-white transition-colors duration-150 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
                <h3 className="font-medium mb-1">{category.name}</h3>
                <p className="text-muted-foreground text-sm">
                  ({category.count})
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesCard;
