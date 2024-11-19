'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Hero() {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Ensure the server and client render the same structure
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl">Loading....</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <Image
        src="/hero-bg.jpg"
        alt="Luxurious hotel exterior"
        fill
        priority
        className="absolute inset-0 z-0 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/70 to-gray-200/70 z-10"></div>
      <div className="relative z-20 text-center text-orange-500 px-4 sm:px-6 lg:px-8 w-full max-w-6xl">
        <h1 className="text-5xl md:text-6xl font-medium text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 drop-shadow-lg">
          Welcome to EvOrgs
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8">
          Plan and organize your perfect event with ease
        </p>
        <div className="bg-white/90 p-4 sm:p-6 rounded-lg shadow-lg">
          <form className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 min-w-[120px]">
              <Input
                id="destination"
                placeholder="Destination"
                className="w-full rounded-full"
                aria-label="Destination"
              />
            </div>
            <div className="flex-1 min-w-[120px]">
              <Input
                type="date"
                id="check-in"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                min={today}
                className="w-full rounded-full"
                aria-label="Check-in date"
              />
            </div>
            <div className="flex-1 min-w-[120px]">
              <Input
                type="date"
                id="check-out"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                min={checkIn}
                className="w-full rounded-full"
                aria-label="Check-out date"
              />
            </div>
            <div className="flex-1 min-w-[120px]">
              <Select>
                <SelectTrigger
                  id="category"
                  className="w-full text-gray-600 rounded-full"
                  aria-label="Category"
                >
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="resort">Resort</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-none w-full sm:w-auto">
              <Button
                type="submit"
                className="flex justify-center items-center w-full sm:w-max px-6 rounded-md outline-none relative overflow-hidden border duration-300 ease-linear after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-600 hover:after:opacity-100 hover:after:scale-[2.5] bg-orange-500 border-transparent hover:border-orange-500"
              >
                <span className="relative z-10 text-white">Search</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
