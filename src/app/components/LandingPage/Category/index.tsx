import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RightArrow } from "@/utils/Icons";
import { Check } from "lucide-react";
import Image from "next/image";

export default function Component() {
  return (
    <section className="w-full flex justify-center items-center py-16 md:py-28 lg:py-36 bg--gray-100">
      <div className="container px-4 md:px-8 xl:max-w-[1420px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:gap-20">
          {/* Text Section */}
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <div className="uppercase text-sm font-semibold text-orange-600 tracking-wide">
                What we do
              </div>
              <h2 className="text-2xl font-medium tracking-tight text-gray-900">
                Explore Listings on Evorgs
              </h2>
              <p className="text-gray-600 md:text-lg leading-relaxed dark:text-gray-400">
                Discover top-notch properties and opportunities curated for you. 
                Dive into an organized theme for seamless navigation.
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-3 py-6">
              {[
                "Stay connected",
                "Modern Listings",
                "Verified Properties",
                "Well Organized Theme",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 shadow-md">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-gray-800 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Join thousands of users worldwide who trust us to find their dream properties.
            </p>

            {/* Call to Action */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button className="bg-orange-500 hover:bg-orange-600 hover:opacity-90 shadow-lg text-white">
                Get started with us
                <RightArrow color="#ffffff"/>
              </Button>
              <Card className="flex items-center gap-3 p-4 shadow-lg">
                <div className="flex -space-x-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white overflow-hidden shadow-md"
                    >
                      <Image
                        alt={`User ${i + 1}`}
                        className="aspect-square h-full w-full object-cover"
                        height="40"
                        src={`/banner.jpg`}
                        width="40"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900">35K+</div>
                  <div className="text-sm text-gray-600">Positive Reviews</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Image Section */}
          <div className="grid gap-6 md:gap-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
                <Image
                  alt="Person working on laptop"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  fill
                  src="/farmHouse-category.jpg"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl shadow-lg">
                <Image
                  alt="People at a counter"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  fill
                  src="/photography-category.jpg"
                />
              </div>
            </div>
            <div className="relative aspect-[2/1] overflow-hidden rounded-xl shadow-lg">
              <Image
                alt="DJ performing"
                className="object-cover transition-transform duration-300 hover:scale-105"
                fill
                src="/venue-category.jpg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
