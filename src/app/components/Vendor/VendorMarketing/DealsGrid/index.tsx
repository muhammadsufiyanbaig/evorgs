"use client";

import React from "react";
import DealCard from "@/app/components/Vendor/VendorMarketing/DealCard";
import { useStore } from "@/utils/store";
import { Button } from "@/components/ui/button";

const DealsGrid: React.FC = () => {
  const { selectedCategory, sponsoredDeals, featuredDeals } = useStore();
  const deals =
    selectedCategory === "Sponsored" ? sponsoredDeals : featuredDeals;

  return (
    <div className="flex-1 p-6">
     <div className="flex justify-between">
      <h2
        className={`text-2xl font-semibold mb-6 ${
          selectedCategory === "Sponsored"
            ? "text-purple-600"
            : "text-green-600"
        }`}
      >
        {selectedCategory} Deals
      </h2>
      <Button onClick={()=>{}}>
        Add Deal
      </Button>
      </div>
     
      {deals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No deals available</p>
      )}
    </div>
  );
};

export default DealsGrid;
