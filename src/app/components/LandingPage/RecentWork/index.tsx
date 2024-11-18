import Image from "next/image";
import React from "react";

const RecentWork = () => {
  const images = [
    "/banner.jpg",
    "/catering-category.jpg",
    "/farmHouse-category.jpg",
    "/photography-category.jpg",
    "/venue-category.jpg",
    "/hero-bg.jpg",
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8">
      <h2 className="text-4xl py-4 sm:text-5xl font-medium text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 drop-shadow-lg">
        Recent Events
      </h2>

      <div className="flex gap-10 flex-col lg:flex-row lg:w-[80%]">
        <div className="grid grid-rows-2  lg:grid-rows-[60%_auto] gap-4 py-10">
          <div className="overflow-hidden rounded-xl h-full">
            <Image
              width={500}
              height={500}
              src={"/banner.jpg"}
              alt={`Travel`}
              className="object-cover transition-transform duration-300 ease-in-out rounded-xl transform hover:scale-105 h-full"
            />
          </div>
          <div className="overflow-hidden rounded-xl h-full">
            <Image
              width={500}
              height={500}
              src={"/photography-category.jpg"}
              alt={`Travel`}
              className="object-cover transition-transform duration-300 ease-in-out rounded-xl transform hover:scale-105 h-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-center  scale-100 lg:scale-[1.1] relative z-10">
          <div className="overflow-hidden rounded-xl h-full">
            <Image
              width={500}
              height={500}
              src={"/banner.jpg"}
              alt={`Travel`}
              className="object-cover transition-transform duration-300 ease-in-out rounded-xl transform hover:scale-105 h-full"
            />
          </div>
          <div className="overflow-hidden rounded-xl h-full">
            <Image
              width={500}
              height={500}
              src={"/banner.jpg"}
              alt={`Travel`}
              className="object-cover transition-transform duration-300 ease-in-out rounded-xl transform hover:scale-105 h-full"
            />
          </div>
        </div>

        <div className="grid grid-rows-2 lg:grid-rows-[40%_auto] gap-4 py-10">
          <div className="overflow-hidden rounded-xl h-full">
            <Image
              width={500}
              height={500}
              src={"/banner.jpg"}
              alt={`Travel`}
              className="object-cover transition-transform duration-300 ease-in-out rounded-xl transform hover:scale-105 h-full"
            />
          </div>
          <div className="overflow-hidden rounded-xl h-full">
            <Image
              width={500}
              height={500}
              src={"/banner.jpg"}
              alt={`Travel`}
              className="object-cover transition-transform duration-300 ease-in-out rounded-xl transform hover:scale-105 h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentWork;
