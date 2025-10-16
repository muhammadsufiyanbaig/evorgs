import React from "react";
import Image from "next/image";

interface BookingCardProps {
  serviceData: any;
  serviceType: 'venue' | 'farmhouse' | 'catering' | 'photography' | null;
}

const BookingCard = ({ serviceData, serviceType }: BookingCardProps) => {
  if (!serviceData || !serviceType) {
    return null;
  }

  // Extract data based on service type
  const name = serviceData.packageName || 
               serviceData.venueName || 
               serviceData.farmHouseName || 
               serviceData.name || 
               'Service';
  
  const description = serviceData.description || '';
  const rating = serviceData.rating || 0;
  const reviewCount = serviceData.reviewCount || 0;
  const imageUrl = serviceData.imageUrl?.[0] || 
                   serviceData.images?.[0] || 
                   serviceData.imageUrl || 
                   '/placeholder.svg';
  
  const price = serviceType === 'farmhouse' 
    ? (serviceData.perNightPrice || serviceData.perDayPrice || 0)
    : (serviceData.price || serviceData.pricePerPerson || 0);

  const priceLabel = serviceType === 'farmhouse' 
    ? '/night'
    : serviceType === 'photography'
    ? `/package`
    : serviceType === 'catering'
    ? '/person'
    : '/event';

  return (
    <div className=" rounded-xl mt-5 bg-white p-4 shadow-lg sticky top-20">
      {/* Service Info Section */}
      <div className="flex items-start gap-6">
        <div className="aspect-square w-[20%] lg:w-[30%] rounded bg-gray-200 relative overflow-hidden">
          <Image 
            src={imageUrl} 
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-1">
            {name}
          </h3>
          <p className="text-lg font-bold text-gray-600 line-clamp-2">
            {description.substring(0, 60)}{description.length > 60 ? '...' : ''}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded bg-orange-500 px-2 py-1 text-xs font-bold text-white">
              {rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500">
              {rating >= 4.5 ? 'Excellent' : rating >= 4 ? 'Very Good' : rating >= 3 ? 'Good' : 'Average'}
            </span>
            <span className="text-xs text-gray-500">{reviewCount} reviews</span>
          </div>
        </div>
      </div>

      {/* Protection Info */}
      <p className="mt-4 border-t border-gray-200 pt-4 text-sm">
        Your booking is protected by <span className="font-bold">Evorgs</span>
      </p>

      {/* Price Details */}
      <div className="mt-4 border-t border-gray-200 pt-4 text-sm space-y-2">
        <div className="flex justify-start">
          <span className="font-bold">Price Details</span>
        </div>
        <div className="flex justify-between">
          <span className="">Base Price</span>
          <span className="font-medium text-gray-800">₹{price.toLocaleString()}{priceLabel}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Service Fee</span>
          <span className="font-medium text-gray-800">₹{Math.round(price * 0.05).toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="">Taxes & Charges</span>
          <span className="font-medium text-gray-800">₹{Math.round(price * 0.12).toLocaleString()}</span>
        </div>
        <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-semibold">
          <span className="text-gray-800">Estimated Total</span>
          <span className="text-gray-800">Rs. {Math.round(price * 1.17).toLocaleString()}</span>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          * Final price will be calculated based on your booking details
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
