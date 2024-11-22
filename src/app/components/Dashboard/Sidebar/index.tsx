"use client";
import { CloseIcon } from "@/utils/Icons";
import { FilterIcon } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const Sidebar: React.FC = () => {
  const [price, setPrice] = useState<number>(50); // State to track the price
  const [selectedRating, setSelectedRating] = useState<number | null>(null); // State to track the selected rating
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // State to manage off-canvas menu visibility
  const sidebarRef = useRef<HTMLDivElement>(null);
  const karachiAreas = [
    "North Karachi",
    "Gulshan-e-Iqbal",
    "Gulistan-e-Jauhar",
    "Clifton",
    "Defence (DHA)",
    "Nazimabad",
    "Federal B Area (F.B. Area)",
    "PECHS (Pakistan Employees Cooperative Housing Society)",
    "Korangi",
    "Landhi",
    "Surjani Town",
    "Malir Cantt",
    "Saadi Town",
    "Saddar",
    "Shahrah-e-Faisal",
    "Tariq Road",
    "Bahadurabad",
    "Zamzama",
    "Boat Basin",
    "Karachi Port Area",
    "SITE Area (Sindh Industrial Trading Estate)",
    "Korangi Industrial Area",
    "Landhi Industrial Area",
    "Lyari",
    "Keamari",
    "Garden West",
    "Kharadar",
    "Mithadar",
    "Gadap Town",
    "Malir",
    "Bin Qasim Town",
    "Hawksbay",
    "Emaar Crescent Bay (Clifton)",
    "Bahria Town Karachi",
    "ASF Housing Scheme",
    "Falaknaz Dream Villas",
  ];

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <button
        className="lg:hidden bg-orange-600 text-white rounded-full flex justify-center w-fit p-4 fixed z-10 bottom-4 right-4"
        onClick={() => setIsMenuOpen(true)}
      >
        <FilterIcon />
        
      </button>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative lg:bg-transparent lg:z-auto overflow-y-auto lg:overflow-y-visible`}
      >
        <div
          ref={sidebarRef}
          className="w-3/4 lg:w-auto p-6  bg-gray-50 shadow-md rounded-xl sticky top-2"
        >
          <div className="flex justify-between mt-14 lg:mt-auto  border-b">
            <h3 className="text-lg font-semibold text-gray-800 mb- pb-2">
              Filters
            </h3>
            <button
              className="lg:hidden p-2 border text-white rounded-md mb-4"
              onClick={() => setIsMenuOpen(false)}
            >
              <CloseIcon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            </button>
          </div>

          {/* Price Slider */}
          <div className="mb-6">
            <h4 className="text-gray-700 font-medium mb-3">Price</h4>
            <input
              type="range"
              min="50"
              max="1200"
              value={price}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(Number(e.target.value))
              }
              className="w-full accent-orange-600"
            />
            <div className="flex justify-between items-center mt-3 text-sm text-gray-600">
              <span>$50</span>
              <span className="text-orange-600 font-bold">${price}</span>
              <span>$1200</span>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h4 className="text-gray-700 font-medium mb-3">Rating</h4>
            <div className="flex space-x-3">
              {[1, 2, 3, 4].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  className={`p-2 rounded-full border shadow-sm hover:shadow-md transition-transform transform ${
                    selectedRating && selectedRating >= rating
                      ? "bg-orange-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-orange-100"
                  }`}
                >
                  {rating}★
                </button>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div className="lg:h-[50vh] overflow-y-auto custom-scrollbar">
            <h4 className="text-gray-700 font-medium mb-3">Area</h4>
            <div className="grid grid-cols-1 gap-3">
              {karachiAreas.map((item) => (
                <div key={item} className="flex items-center">
                  <input
                    type="checkbox"
                    id={item}
                    className="accent-orange-600 w-5 h-5 focus:ring-orange-500"
                  />
                  <label
                    htmlFor={item}
                    className="ml-3 text-gray-700 hover:text-orange-500 transition-colors cursor-pointer"
                  >
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
