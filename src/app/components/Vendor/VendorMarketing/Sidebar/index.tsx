"use client"
import React from "react";
import { Megaphone, Star } from "lucide-react";
import { useStore } from "@/utils/store";

const Sidebar: React.FC = () => {
  const { selectedCategory, setCategory } = useStore();

  return (
    <div className="w-64 bg-white shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <ul className="space-y-2">
        <li
          className={`flex items-center gap-2 p-3 cursor-pointer rounded-lg ${
            selectedCategory === "Sponsored" ? "bg-purple-100 text-purple-600" : "text-gray-700"
          }`}
          onClick={() => setCategory("Sponsored")}
        >
          <Megaphone size={20} />
          <span>Sponsored</span>
        </li>
        <li
          className={`flex items-center gap-2 p-3 cursor-pointer rounded-lg ${
            selectedCategory === "Featured" ? "bg-green-100 text-green-600" : "text-gray-700"
          }`}
          onClick={() => setCategory("Featured")}
        >
          <Star size={20} />
          <span>Featured</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
