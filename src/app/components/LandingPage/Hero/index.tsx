'use client'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


export default function Hero() {
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <Image
        src="/hero-bg.jpg"
        alt="Luxurious hotel exterior"
        layout="fill"
        objectFit="cover"
        priority
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-orange-100/70 to-gray-200/70 z-10"></div>
      <div className="relative z-20 text-center text-orange-500 px-4 sm:px-6 lg:px-8 w-full max-w-6xl">
        <h1 className="text-5xl md:text-6xl font-medium text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 drop-shadow-lg">
          Welcome to EvOrgs
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8">
          Discover comfort and luxury at its finest
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="check-in"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-full",
                      !checkIn && "text-muted-foreground"
                    )}
                    aria-label="Check-in date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkIn ? format(checkIn, "PP") : <span>Check-in</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1 min-w-[120px]">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="check-out"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal rounded-full",
                      !checkOut && "text-muted-foreground"
                    )}
                    aria-label="Check-out date"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOut ? format(checkOut, "PP") : <span>Check-out</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1 min-w-[120px]">
              <Select>
                <SelectTrigger id="category" className="w-full text-gray-600 rounded-full" aria-label="Category">
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
              <Button type="submit"  className="flex justify-center items-center w-full sm:w-max px-6 rounded-md outline-none relative overflow-hidden border duration-300 ease-linear after:absolute after:inset-x-0 after:aspect-square after:scale-0 after:opacity-70 after:origin-center after:duration-300 after:ease-linear after:rounded-full after:top-0 after:left-0 after:bg-orange-600 hover:after:opacity-100 hover:after:scale-[2.5] bg-orange-500 border-transparent hover:border-orange-500"
           >
              <span className="relative z-10 text-white">Search</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
