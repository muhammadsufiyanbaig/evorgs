import React from 'react';

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
  <div className="flex flex-col space-y-8 w-full max-w-6xl mx-auto p-6">
    {hotels.map((hotel, idx) => (
      <div
        key={idx}
        className="flex justify-between bg-white p-6 rounded-lg shadow-xl "
      >
        <div className="flex space-x-6">
          <div className="w-36 h-36 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <img
              src={hotel.imageUrl}
              alt={hotel.name}
              className="object-cover w-full h-full transform scale-110 hover:scale-100 transition-all duration-500"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-semibold text-gray-800 hover:text-orange-600 transition-colors duration-300">{hotel.name}</h3>
            <p className="text-gray-600">{hotel.location}</p>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-yellow-500 text-xl">⭐ {hotel.rating}</span>
              <span className="text-gray-500 text-sm">({Math.floor(Math.random() * 500) + 100} reviews)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <p className="text-3xl font-bold text-gray-800">${hotel.price}/night</p>
          <button className="px-6 py-3 bg-orange-600 text-white rounded-full hover:bg-orange-700 transition-colors duration-300 mt-6">
            View Place
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default HotelList;
