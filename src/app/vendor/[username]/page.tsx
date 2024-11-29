'use client'
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const VendorProfile = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const stars = [1, 2, 3, 4, 5];

  const tabData = {
    tab1: [
      { id: 1, image: '/aboutbanner.jpg', title: 'Image 1' },
      { id: 2, image: '/banner.jpg', title: 'Image 2' },
      { id: 3, image: '/Bg-download.png', title: 'Image 3' },
    ],
    tab2: [
      { id: 1, image: '/catering-category.jpg', title: 'Image 4' },
      { id: 2, image: '/CTABanner.png', title: 'Image 5' },
      { id: 3, image: '/venue-category.jpg', title: 'Image 6' },
    ],
    tab3: [
      { id: 1, image: '/farmHouse-category.jpg', title: 'Image 7' },
      { id: 2, image: '/photography-category.jpg', title: 'Image 8' },
      { id: 3, image: '/hero-bg.jpg', title: 'Image 9' },
    ],
  };

  return (
    <div className="max-w-screen min-h-screen mx-auto mt-10 p-6 bg-gray-50 shadow-md rounded-lg">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="https://github.com/nutlope.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
        </div>
        <div className="w-full md:w-2/3 flex flex-col items-center md:items-start">
          {/* Star Rating */}
          <div className="flex gap-2">
            {stars.map((star, index) => (
              <button
                key={index}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none"
              >
                {hoverRating >= star || rating >= star ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6">
        {Object.keys(tabData).map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'default' : 'ghost'}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg font-medium ${
              activeTab === tab
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            {tab.toUpperCase()}
          </Button>
        ))}
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tabData[activeTab as keyof typeof tabData].map((item: { id: number; image: string; title: string; }) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <Image
            height={200}
            width={200}
              src={item.image}
              alt={item.title}
              className="w-full h-64 rounded-t-lg object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorProfile;
