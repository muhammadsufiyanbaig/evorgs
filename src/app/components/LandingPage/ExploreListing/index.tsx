import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Circle, Shape, CheckIcon, RightArrow } from "@/utils/Icons";
import Image from "next/image";
import React from "react";

const ExploreListing = () => {
  return (
    <section className="my-32">
      <div className="container px-4 lg:px-10">
        <div className="max-w-5xl mx-auto relative">
          <div className="hidden lg:block absolute top-[35%]  -left-[9%]">
            <Circle height={200} width={200} />
          </div>
          <div className="grid md:grid-cols-2 gap-6 relative">
            <div className="grid sm:grid-rows-[55%_auto] gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Image
                    src={"/venue-category.jpg"}
                    alt=""
                    height={1000}
                    width={1000}
                    className="rounded-lg object-cover h-full"
                  />
                </div>
                <div className="grid sm:grid-rows-[25%_auto] gap-4">
                  <div className="relative  hidden sm:block">
                    <div className="absolute -bottom-[0%] sm:-bottom-[50%] right-[70%] sm:right-[55%] md:-left-[18%]">
                      <Shape height={180} width={180} />
                    </div>
                  </div>
                  <div className="overflow-hidden">
                    <Image
                      src={"/venue-category.jpg"}
                      alt=""
                      height={1000}
                      width={1000}
                      className="rounded-lg h-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <Image
                  src={"/venue-category.jpg"}
                  alt=""
                  height={1000}
                  width={1000}
                  className="rounded-lg h-full w-[90%] lg:w-[70%] object-cover"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-4 max-w-md">
                <h3 className="text-orange-600 font-bold">WHAT WE DO</h3>
                <h2 className="text-3xl font-bold">
                  Explore Listings on Evorgs
                </h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio
                  egestas enim, sed consectetur etiam mauris id egestas.
                  Ullamcorper neque adipiscing ullamcorper.
                </p>
                <div className="flex justify-between my-4">
                  <ul className="space-y-2">
                    {[
                      "Stay connected",
                      "Modern Listings",
                      "Verified Properties",
                      "Well Organized Theme",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <div className="p-1 bg-orange-600 rounded-full">
                        <CheckIcon color="#ffffff"/>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Card className="border border-gray-300">
                    <CardContent className="flex items-center gap-4">
                      <div>
                        <p className="text-2xl font-bold">35K+</p>
                        <p className="text-gray-600">Positive Reviews</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-gray-600">
                  Dorem ipsum dolor sit amet, consectetur adipiscing elit. Odio
                  egestas enim, sed consectetur etiam.
                </p>
                <Button className="bg-orange-600 hover:scale-110 hover:bg-orange-700 text-white rounded-full w-fit px-6 py-2">
                  Get started with us
                  <div className="p-1 border border-white  rounded-full hover:scale-105">
                  <RightArrow color="#ffffff"/>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreListing;