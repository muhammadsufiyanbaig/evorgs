import { Email, LocationPin, Mobile } from "@/utils/Icons";
import React from "react";

const ContactDetailsCard = () => {
  return (
    <section className="py-20">
      <div className="container px-4 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 justify-center gap-6 mx-auto md:w-[85%]">
          <div className="aspect-square bg-white rounded-xl">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-[70%] text-center flex flex-col items-center gap-2">
                <LocationPin />
                <h3 className="text-2xl font-semibold">Office Address</h3>
                <hr className="w-full" />
                <p className="text-muted-foreground">
                  4517 Washington Ave. Chester, Kentucky 39495
                </p>
              </div>
            </div>
          </div>
          <div className="aspect-square bg-white rounded-xl">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-[70%] text-center flex flex-col items-center gap-2">
                <Mobile color="#EA580C" />
                <h3 className="text-2xl font-semibold">Call to us</h3>
                <hr className="w-full" />
                <ul className="text-muted-foreground">
                  <li className="whitespace-nowrap">Telephone: (603) 555-0123</li>
                  <li className="whitespace-nowrap">Mobile: (316) 555-0116</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="aspect-square bg-white rounded-xl">
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-[70%] text-center flex flex-col items-center gap-2">
                <Email color="#EA580C" height={60} width={60} />
                <h3 className="text-2xl font-semibold">Email Address </h3>
                <hr className="w-full" />
                <ul className="text-muted-foreground">
                  <li>directorylisting@example.com</li>
                  <li>cllisting2220@example.com</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactDetailsCard;
