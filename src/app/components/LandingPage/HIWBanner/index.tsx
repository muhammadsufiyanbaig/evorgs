import { LocationPin } from "@/utils/Icons";
import { Book, BookIcon, BookImage, GridIcon, Package, Package2Icon, Star, Stars } from "lucide-react";
import React from "react";

const HIWBanner = () => {
  return (
    <section
      className="py-28 bg-cover min-h-[80vh] flex items-center justify-center "
      style={{
        backgroundImage:
          "url('https://radiustheme.com/demo/wordpress/themes/listygo/wp-content/uploads/2022/09/img-18-min.png')",
      }}
    >
      <div className="container px-4">
        <div className="flex flex-col items-center gap-2">
          <h5 className="uppercase text-orange-600 text-sm font-semibold">
            Find Out Here
          </h5>
          <h2 className="text-2xl text-center sm:text-3xl font-bold">How It Works Step by Step</h2>
          <p className="text-sm text-center  text-gray-600">
            Lorem Ipsum is simply dummying text of the printing and typesetting
            industry.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-[90%] gap-6 mt-8">
            <div className="flex flex-col gap-3 px-6 items-center group">
              <div
                className="w-fit mb-6 flex justify-center p-6 rounded-xl relative z-10 
                      before:absolute before:inset-0 before:rounded-xl before:bg-[#F9F9F9] before:transition-colors before:duration-300 group-hover:before:bg-orange-600
                      after:absolute after:inset-0 after:-z-10 after:rounded-xl after:bg-[#ececec] after:rotate-[-8deg] after:origin-top-right after:transition-colors after:duration-300 group-hover:after:bg-orange-600"
              >
                <GridIcon className="relative text-orange-600 h-10 w-10 group-hover:text-white transition-colors duration-150" />
              </div>
              <h3 className="text-center font-bold text-xl">
              Select your desired category
              </h3>
              <p className="text-center text-sm text-gray-600">
              "Choose from a wide variety of categories to find exactly what you're looking for."
              </p>
            </div>
            <div className="flex flex-col gap-3 px-6 items-center group">
              <div
                className="w-fit mb-6 flex justify-center p-6 rounded-xl relative z-10 
                      before:absolute before:inset-0 before:rounded-xl before:bg-[#F9F9F9] before:transition-colors before:duration-300 group-hover:before:bg-orange-600
                      after:absolute after:inset-0 after:-z-10 after:rounded-xl after:bg-[#ececec] after:rotate-[-8deg] after:origin-top-right after:transition-colors after:duration-300 group-hover:after:bg-orange-600"
              >
                <Package className="relative w-10 h-10 text-orange-600 group-hover:text-white transition-colors duration-150" />
              </div>
              <h3 className="text-center font-bold text-xl">
              Choose your preferred vendor
              </h3>
              <p className="text-center text-sm text-gray-600">
              "Pick a trusted vendor that best suits your needs and preferences."
              </p>
            </div>
            <div className="flex flex-col gap-3 px-6 items-center group">
              <div
                className="w-fit mb-6 flex justify-center p-6 rounded-xl relative z-10 
                      before:absolute before:inset-0 before:rounded-xl before:bg-[#F9F9F9] before:transition-colors before:duration-300 group-hover:before:bg-orange-600
                      after:absolute after:inset-0 after:-z-10 after:rounded-xl after:bg-[#ececec] after:rotate-[-8deg] after:origin-top-right after:transition-colors after:duration-300 group-hover:after:bg-orange-600"
              >
                <Stars className="relative w-10 h-10  text-orange-600 group-hover:text-white transition-colors duration-150" />
              </div>
              <h3 className="text-center font-bold text-xl">
              Check reviews
              </h3>
              <p className="text-center text-sm text-gray-600">
              "Read customer reviews to make an informed decision before booking."
              </p>
            </div>
            <div className="flex flex-col gap-3 px-6 items-center group">
              <div
                className="w-fit mb-6 flex justify-center p-6 rounded-xl relative z-10 
                      before:absolute before:inset-0 before:rounded-xl before:bg-[#F9F9F9] before:transition-colors before:duration-300 group-hover:before:bg-orange-600
                      after:absolute after:inset-0 after:-z-10 after:rounded-xl after:bg-[#ececec] after:rotate-[-8deg] after:origin-top-right after:transition-colors after:duration-300 group-hover:after:bg-orange-600"
              >
                <BookImage className="relative w-10 h-10 text-orange-600 group-hover:text-white transition-colors duration-150" />
              </div>
              <h3 className="text-center font-bold text-xl">
              Book your reservation
              </h3>
              <p className="text-center text-sm text-gray-600">
              "Easily reserve your spot and secure your booking with just a few clicks."
              </p>
            </div>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default HIWBanner;