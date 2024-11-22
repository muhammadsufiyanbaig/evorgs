import Image from "next/image";
import React from "react";

const DownloadBanner = () => {
  return (
    <section className="relative p-4 lg:py-0 lg:h-[60vh] overflow-hidden lg:px-10  bg-orange-600 text-white">
      <div className="container  font-medium">
        {/* Background Image */}
        <div className="absolute top-0 left-0 inset-0">
          <Image
            src={"/Bg-download.png"}
            alt="background"
            height={1000}
            width={1000}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-[60vh]  relative">
          {/* Left Column */}
          <div className="flex flex-col gap-4 items-center lg:items-start justify-center lg:h-[60vh] px-4 lg:px-10">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
              Looking for the Best Apps?
            </h1>
            <p className="text-sm md:text-base text-center lg:text-start">
              When an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not.
            </p>
            <div className="mt-4">
              <button className="bg-white text-orange-600 px-4 py-2 rounded-md text-sm md:text-base">
                Download Now
              </button>
            </div>
            <div className="flex justify-center lg:justify-start flex-wrap gap-6">
            <Image 
              src={"/android.svg"}
              alt="Apple Store"
              height={1000}
              width={1000}
              className="w-[35%] aspect-video"
            />
            <Image 
              src={"/apple.svg"}
              alt="Apple Store"
              height={1000}
              width={1000}
              className="w-[35%] aspect-video"
            />
            </div>
          </div>

          {/* Right Column */}
          <div className=" flex justify-center items-center">
            <Image
              src={"/DownloadBanner.png"}
              alt="mockup"
              height={1000}
              width={1000}
              className="w-56 -mb-[200px] md:w-[50%] lg:w-[65%] mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadBanner;
