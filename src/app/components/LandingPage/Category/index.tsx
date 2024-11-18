"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CategoryCarousel() {
  const categories = [
    {
      name: "Venue",
      image: "/venue-category.jpg",
      description: "Explore top venues for your events.",
      details:
        "Find the perfect location with amazing facilities and beautiful surroundings.",
    },
    {
      name: "Farm House",
      image: "/farmHouse-category.jpg",
      description: "A perfect getaway for relaxation and family time.",
      details:
        "Choose from a variety of farmhouses with lush greenery and peaceful environments.",
    },
    {
      name: "Catering",
      image: "/catering-category.jpg",
      description: "Taste the best food with our catering services.",
      details:
        "Browse through different catering options to suit every occasion and budget.",
    },
    {
      name: "Photography",
      image: "/photography-category.jpg",
      description:
        "Capture your precious moments with professional photographers.",
      details:
        "Select photographers with specialized expertise in various event types.",
    },
  ];
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] bg-gray-100 px-4 sm:px-6 md:px-8">
      <h2 className="text-4xl sm:text-5xl font-medium text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 drop-shadow-lg">
        Category
      </h2>
      <Carousel setApi={setApi} className="w-full max-w-6xl">
        <CarouselContent>
          {categories.map((category, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="overflow-hidden shadow-lg md:shadow-none rounded-lg md:rounded-none">
                  <CardContent className="p-0 flex flex-col sm:flex-row">
                    {/* Image Section */}
                    <div className="relative w-full sm:w-1/2 cursor-grab h-[250px] sm:h-[400px] md:h-[600px]">
                      <Image
                        src={category.image}
                        alt={`${category.name} image`}
                        fill
                        className="object-cover transition-transform duration-300 ease-in-out rounded-xl transform hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t rounded-xl from-gray-800 to-transparent opacity-0 hover:opacity-50 transition-opacity duration-300 flex justify-center items-center">
                        <p className="text-white font-semibold text-lg sm:text-2xl md:text-4xl text-center">
                          {category.name}
                        </p>
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="w-full sm:w-1/2 flex flex-col justify-center p-6">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4">
                        {category.description}
                      </p>
                      <p className="text-xs sm:text-sm md:text-base text-gray-600">
                        {category.details}
                      </p>
                    </div>
                  </CardContent>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious />
          <CarouselNext />
        </div>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Testimonial {current} of {count}
        </div>
      </Carousel>
    </div>
  );
}
