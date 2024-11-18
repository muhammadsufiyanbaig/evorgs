import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner: React.FC = () => {
  return (
    <div className=" min-h-[40vh] flex items-center justify-center bg-gray-100 p-4 sm:p-0">
      <div className="flex flex-col mx-auto my-auto overflow-hidden justify-between rounded-xl sm:flex-row md:h-80 shadow-lg bg-orange-50 w-full max-w-4xl">
        {/* content - start */}
        <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8  lg:justify-center lg:items-start lg:w-1/2">
          <h2 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl md:text-2xl lg:text-3xl text-center lg:text-left">
            Plan Your Perfect Event With Us
          </h2>

          <p className="mb-8 max-w-md text-gray-400 text-center lg:text-left">
            From weddings to corporate events, we simplify your planning
            process.{" "}
            <Link
              href={"#"}
              className="duration-300 ease-linear hover:text-orange-600 font-bold"
            >
              Sign Up Now
            </Link>{" "}
            and start planning today!
          </p>

          <div className="mt-auto lg:mt-0">
            <Link
              href="#"
              className="flex justify-center items-center w-full sm:w-max px-6 h-12 rounded-md outline-none relative overflow-hidden border duration-300 ease-linear after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-600 hover:after:opacity-100 hover:after:scale-[2.5] bg-orange-500 border-transparent hover:border-orange-500"
            >
              <span className="relative z-10 text-white">Get Started</span>
            </Link>
          </div>
        </div>
        {/* content - end */}

        {/* Image Section - start */}
        <div className="relative cursor-grab order-first h-48 w-full sm:order-none sm:h-auto sm:w-1/2 lg:w-1/2">
          <Image
            width={500}
            height={500}
            src={"/banner.jpg"}
            loading="lazy"
            alt="Banner Image"
            className="h-full w-full object-cover object-center rounded-r-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t rounded-xl from-gray-800 to-transparent opacity-0 hover:opacity-50 transition-opacity duration-300 flex justify-center items-center">
            <p className="text-white font-semibold text-lg sm:text-2xl md:text-4xl text-center">
              Plan Your Perfect Event With Us
            </p>
          </div>
        </div>
        {/* Image Section - end */}
      </div>
    </div>
  );
};

export default Banner;
