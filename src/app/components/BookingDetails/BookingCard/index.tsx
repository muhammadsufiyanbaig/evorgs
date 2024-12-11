import React from "react";

const BookingCard = () => {
  return (
    <div className=" rounded-xl mt-5 bg-white p-4 shadow-lg sticky top-20">
      {/* Hotel Info Section */}
      <div className="flex items-start gap-6">
        <div className="aspect-square w-[20%] lg:w-[30%] rounded bg-gray-200"></div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
            CVK Park Bosphorus...
          </h3>
          <p className="text-lg font-bold text-gray-600">
            Superior room – 1 double bed or 2 twin beds
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded bg-orange-500 px-2 py-1 text-xs font-bold text-white">
              4.2
            </span>
            <span className="text-xs text-gray-500">Very Good</span>
            <span className="text-xs text-gray-500">54 reviews</span>
          </div>
        </div>
      </div>

      {/* Protection Info */}
      <p className="mt-4 border-t border-gray-200 pt-4 text-sm">
        Your booking is protected by <span className="font-bold">golobe</span>
      </p>

      {/* Price Details */}
      <div className="mt-4 border-t border-gray-200 pt-4 text-sm space-y-2">
        <div className="flex justify-start">
          <span className="font-bold">Price Details</span>
        </div>
        <div className="flex justify-between">
          <span className="">Base Fare</span>
          <span className="font-medium text-gray-800">$240</span>
        </div>
        <div className="flex justify-between">
          <span className="">Discount</span>
          <span className="font-medium text-gray-800">$0</span>
        </div>
        <div className="flex justify-between">
          <span className="">Taxes</span>
          <span className="font-medium text-gray-800">$20</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Fee</span>
          <span className="font-medium text-gray-800">$5</span>
        </div>
        <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-semibold">
          <span className="text-gray-800">Total</span>
          <span className="text-gray-800">$265</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
