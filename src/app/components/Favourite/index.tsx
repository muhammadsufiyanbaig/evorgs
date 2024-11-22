"use client";

import { Heart, LocationIcon } from "@/utils/Icons/icons";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
const hotels = [
  {
    name: "Grand Royale Hotel",
    location: "New York City",
    rating: 4.2,
    price: 240,
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    name: "Beachfront Paradise",
    location: "Miami Beach",
    rating: 4.7,
    price: 320,
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    name: "Mountain View Resort",
    location: "Aspen, Colorado",
    rating: 4.5,
    price: 280,
    imageUrl: "https://via.placeholder.com/400x300",
  },
];
const Favourite = () => {
  const [activeTab, setActiveTab] = useState("Flights");

  return (
    <div className="mt-32 mb-10 ">
      <div className="container px-4 lg:px-10 space-y-8">
        <h1 className="font-bold text-3xl">Favourites</h1>
        <div className="space-y-8">
          <div className="shadow-lg rounded-lg overflow-hidden">
            <div className="flex justify-between px-2 w-full ">
              {/* Flights Tab */}
              <button
                className={`flex-1 text-start px-4 py-2 ${
                  activeTab === "Flights"
                    ? "text-orange-500 font-bold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("Flights")}
              >
                Flights
                <span className="block text-sm text-gray-400 font-normal">
                  {activeTab === "Flights" ? "2 marked" : ""}
                </span>
              </button>

              {/* Places Tab */}
              <button
                className={`flex-1 text-start px-4 py-2 ${
                  activeTab === "Places"
                    ? "text-orange-500 font-bold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("Places")}
              >
                Places
                <span className="block text-sm text-gray-400 font-normal">
                  {activeTab === "Places" ? "3 marked" : ""}
                </span>
              </button>
            </div>

            {/* Highlighted Active Tab */}
            <div
              className={`h-1 bg-orange-500 transition-transform duration-300 ${
                activeTab === "Flights" ? "translate-x-0" : "translate-x-full"
              }`}
              style={{ width: "50%" }}
            />
          </div>
          {hotels.map((hotel, idx) => (
            <div
              key={idx}
              className="grid lg:grid-cols-[30%_auto]  bg-white overflow-hidden rounded-lg shadow-md "
            >
              <div className="overflow-hidden relative">
                <Image
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  height={1000}
                  width={1000}
                  className="object-cover w-full h-full transform scale-110 hover:scale-100 transition-all duration-500"
                />
                <div className="bg-gray-200 absolute top-4 right-4 px-2 py-1 rounded-md">
                  9 images
                </div>
              </div>
              <div className="flex flex-col justify-between  py-6 px-2 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between pb-6">
                  <div className="space-y-4 text-center md:text-start">
                    <h3 className="text-2xl sm:text-3xl font-semibold text-gray-800 hover:text-orange-600 transition-colors duration-300">
                      {hotel.name}
                    </h3>

                    <p className="text-gray-600 flex gap-2 justify-center sm:justify-start">
                      <LocationIcon height={20} width={20} />
                      {hotel.location}
                    </p>

                    <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                      <span className="text-yellow-500 text-xl">
                        ⭐ {hotel.rating}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ({Math.floor(Math.random() * 500) + 100} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end mx-auto sm:mx-0 mt-4">
                    <span className="block w-full">starting from</span>
                    <p className="text-xl font-semibold lg:text-3xl lg:font-bold text-gray-800">
                      ${hotel.price}/night
                    </p>
                    <span>excl. tax</span>
                  </div>
                </div>

                <div className="flex items-end border-t gap-6">
                  <button className="border border-orange-600 rounded-md p-3">
                    <Heart height={20} width={20} color="#000000" />
                  </button>
                  <Link
                    href={"/details"}
                    className="px-6 py-3 w-full bg-orange-600 text-white text-center rounded-md hover:bg-orange-700 transition-colors duration-300 mt-6"
                  >
                    View Place
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourite;
