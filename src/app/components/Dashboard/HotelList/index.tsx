import { Heart, LocationIcon } from "@/utils/Icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

const HotelList = () => (
  <div className="flex flex-col space-y-8 container lg:px-6 py-0">
    {hotels.map((hotel, idx) => (
      <div
        key={idx}
        className="grid  lg:grid-cols-[30%_auto] bg-white overflow-hidden rounded-lg shadow-md "
      >
        <div className="overflow-hidden">
          <Image
            src={hotel.imageUrl}
            alt={hotel.name}
            height={1000}
            width={1000}
            className="object-cover w-full h-full transform scale-110 hover:scale-100 transition-all duration-500"
          />
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
            <Link href={"/details"} className="px-6 py-3 w-full bg-orange-600 text-white text-center rounded-md hover:bg-orange-700 transition-colors duration-300 mt-6">
              View Place
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default HotelList;
