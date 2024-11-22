"use client"

import { Star } from 'lucide-react'
import { useState, useEffect } from "react"
import { Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


interface Testimonial {
  quote: string;
  author: string;
  role: string;
  rating: number;
  avatarSrc: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "When an unknown printer galley of type awer awfnd scrambled it to a type specimen awe rvived not five centuries, but also the leap into",
    author: "Donald Simpsom",
    role: "CTO, RadiusTheme",
    rating: 4,
    avatarSrc: "/pic-1.png",
  },
  {
    quote: "When an unknown printer galley of type awer awfnd scrambled it to a type specimen awe rvived not five centuries, but also the leap into",
    author: "Donald Simpsom",
    role: "CTO, RadiusTheme",
    rating: 5,
    avatarSrc: "/pic-2.png",
  },
  {
    quote: "When an unknown printer galley of type awer awfnd scrambled it to a type specimen awe rvived not five centuries, but also the leap into",
    author: "Donald Simpsom",
    role: "CTO, RadiusTheme",
    rating: 3.5,
    avatarSrc: "/pic-1.png",
  },
  {
    quote: "When an unknown printer galley of type awer awfnd scrambled it to a type specimen awe rvived not five centuries, but also the leap into",
    author: "Donald Simpsom",
    role: "CTO, RadiusTheme",
    rating: 4,
    avatarSrc: "/pic-2.png",
  },
  {
    quote: "When an unknown printer galley of type awer awfnd scrambled it to a type specimen awe rvived not five centuries, but also the leap into",
    author: "Donald Simpsom",
    role: "CTO, RadiusTheme",
    rating: 4,
    avatarSrc: "/pic-1.png",
  },
  {
    quote: "When an unknown printer galley of type awer awfnd scrambled it to a type specimen awe rvived not five centuries, but also the leap into",
    author: "Donald Simpsom",
    role: "CTO, RadiusTheme",
    rating: 5,
    avatarSrc: "/pic-2.png",
  },
  // Add more testimonials as needed
]

export default function TestimonialCarousel() {
  const [api, setApi] = useState<any>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <div className="relative min-h-[60vh] max-w-screen w-full bg-orange-50 px-4 py-12">
      {/* Decorative avatars */}
      <div className="absolute left-4 top-4 -rotate-12 transform">
        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
          <img src="/pic-1.jpg" alt="Testimonial" className="object-cover" />
        </Avatar>
      </div>
      <div className="absolute right-4 top-4 rotate-12 transform">
        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
          <img src="/pic-2.jpg" alt="Testimonial" className="object-cover" />
        </Avatar>
      </div>
      <div className="absolute bottom-4 left-4 rotate-6 transform">
        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
          <img src="/pic-3.jpg" alt="Testimonial" className="object-cover" />
        </Avatar>
      </div>
      <div className="absolute bottom-4 right-4 -rotate-6 transform">
        <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
          <img src="/pic-4.jpg" alt="Testimonial" className="object-cover" />
        </Avatar>
      </div>

      {/* Main carousel */}
      <Carousel setApi={setApi} className="mx-auto max-w-xl">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <Card className="border-none bg-transparent shadow-none">
                <div className="flex flex-col items-center space-y-6 py-8 text-center">
                  {/* Rating stars */}
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <div className="rounded-lg border-2 border-orange-500 p-6">
                    <p className="text-lg text-gray-700">{testimonial.quote}</p>
                  </div>

                  {/* Author info */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {testimonial.author}
                    </h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                    {/* Decorative wave */}
                    <svg
                      className="mx-auto h-6 w-24"
                      viewBox="0 0 100 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0 10C20 5, 30 15, 50 10C70 5, 80 15, 100 10"
                        fill="none"
                        stroke="#f97316"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute -left-[0.5rem] sm:-left-8 md:-left-12 h-10 w-10 border-2 border-orange-500 bg-white text-orange-500 hover:bg-orange-50" />
        <CarouselNext className="absolute -right-[0.5rem] sm:-right-8 md:-right-12 h-10 w-10 border-2 border-orange-500 bg-white text-orange-500 hover:bg-orange-50" />
      </Carousel>
    </div>
  )
}

