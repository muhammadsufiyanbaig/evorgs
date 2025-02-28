import React from "react";
import { DealCardProps } from "@/utils/interfaces";
import Image from "next/image";


const DealCard: React.FC<DealCardProps> = ({ deal }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-3">
      <Image src={deal.image} alt={deal.title} width={500} height={250} className="w-full h-60 object-cover rounded-md mb-4" />
      <h3 className="text-lg font-semibold">{deal.title}</h3>
      <p className="text-gray-600 text-sm mb-3">{deal.description}</p>
    </div>
  );
};

export default DealCard;
