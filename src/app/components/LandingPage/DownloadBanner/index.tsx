import Image from "next/image";
import React from "react";

const DownloadBanner = () => {
  return (
    <section className="mt-32">
      <div className="container px-4  h-[60vh] lg:px-10 bg-orange-600 text-white relative font-medium">
        <div className="absolute top-0 left-0 inset-0">
        <Image
              src={"/Bg-download.png"}
              alt="mockup"
              height={1000}
              width={1000}
              className="w-full h-full object-cover"
            />
        </div>
        <div className="grid grid-cols-2 h-[60vh] relative">
          <div className="flex flex-col gap-4 justify-center h-full">
            <h1 className="text-3xl font-bold">Looking for the Best Apps?</h1>
            <p>
              When an unknown printer took a galley of type and scrambled it to
              make a type specimen book. It has survived not.
            </p>
            <div className="">

            </div>
          </div>
          <div className="h-full overflow-hidden">
            <Image
              src={"/DownloadBanner.png"}
              alt="mockup"
              height={1000}
              width={1000}
              className="w-[65%] mx-auto mt-[-10%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadBanner;