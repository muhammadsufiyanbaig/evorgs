"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { Quotes } from "@/utils/Icons/icons";
interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarSrc: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "The product is amazing! It has completely transformed how we work.",
    author: "Jane Doe",
    role: "CEO, Tech Corp",
    avatarSrc: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "I can't imagine running my business without this tool. It's a game-changer!",
    author: "John Smith",
    role: "Founder, StartUp Inc.",
    avatarSrc: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "The customer support is top-notch. They're always there when you need them.",
    author: "Emily Brown",
    role: "CTO, Innovation Labs",
    avatarSrc: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "This product has increased our team's productivity by 200%. Highly recommended!",
    author: "Michael Johnson",
    role: "Director of Operations, BigCorp",
    avatarSrc: "/placeholder.svg?height=100&width=100",
  },
  {
    quote:
      "The intuitive interface makes it easy for even non-tech savvy team members to use.",
    author: "Sarah Lee",
    role: "HR Manager, Global Solutions",
    avatarSrc: "/placeholder.svg?height=100&width=100",
  },
];

export default function Testimonial() {
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
    <div className="flex justify-center min-h-[60vh] items-center w-full bg-gray-100">
      <div className=" mx-auto  ">
        <h2 className="text-4xl sm:text-5xl font-medium text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 drop-shadow-lg">
          Clinet Testimonials
        </h2>
        <Carousel setApi={setApi} className="w-full max-w-80 sm:max-w-sm">
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Quotes color="#f97316" />
                      <p className="text-lg mb-4">{testimonial.quote}</p>
                      <Avatar className="h-16 w-16 mb-2">
                        <AvatarImage
                          src={testimonial.avatarSrc}
                          alt={testimonial.author}
                        />
                        <AvatarFallback>
                          {testimonial.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{testimonial.author}</h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Testimonial {current} of {count}
        </div>
      </div>
    </div>
  );
}
