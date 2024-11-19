'use client';
import React, { useState } from "react";

const Sidebar: React.FC = () => {
  const [price, setPrice] = useState<number>(50); // State to track the price
  const [selectedRating, setSelectedRating] = useState<number | null>(null); // State to track the selected rating
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

  return (
    <div className="w-1/4 h-screen p-6 bg-gray-50 shadow-md rounded-xl overflow-y-auto custom-scrollbar">
      <h3 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2">
        Filters
      </h3>

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
      <div>
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
  );
};

export default Sidebar;
