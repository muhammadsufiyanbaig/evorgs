'use client'

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from "next/image"
import useEmblaCarousel from 'embla-carousel-react'
import { LocationIcon, PhoneIcon } from '@/utils/Icons'

export default function LatestListing() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
      '(min-width: 1280px)': { slidesToScroll: 4 },
    }
  })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const [listings, setListings] = useState([
    {
      id: 1,
      category: "Venue",
      name: "Grand Ballroom",
      image: "/venue-category.jpg",
      profileImage: "/venue-category.jpg",
      description: "Elegant venue for weddings and corporate events.",
      price: "$2000",
      location: "Downtown, City Center",
      phone: "123-456-7890",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 2,
      category: "Farm House",
      name: "Rustic Retreat",
      image: "/farmHouse-category.jpg",
      profileImage: "/farmHouse-category.jpg",
      description: "Charming farm house for intimate gatherings.",
      price: "$1500",
      location: "Countryside, 30 miles from city",
      phone: "987-654-3210",
      status: "Booked",
      isWishlisted: false,
    },
    {
      id: 3,
      category: "Catering",
      name: "Gourmet Delights",
      image: "/catering-category.jpg",
      profileImage: "/catering-category.jpg",
      description: "Exquisite catering for all types of events.",
      price: "$50 per person",
      location: "Serves entire metro area",
      phone: "456-789-0123",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 4,
      category: "Photography",
      name: "Capture Moments",
      image: "/photography-category.jpg",
      profileImage: "/photography-category.jpg",
      description: "Professional photography for weddings and events.",
      price: "$1000",
      location: "Studio in Arts District",
      phone: "789-012-3456",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 5,
      category: "Venue",
      name: "Seaside Pavilion",
      image: "/venue-category.jpg",
      profileImage: "/venue-category.jpg",
      description: "Beautiful beachfront venue for memorable events.",
      price: "$2500",
      location: "Coastal Boulevard, Beach City",
      phone: "234-567-8901",
      status: "Booked",
      isWishlisted: false,
    },
    {
      id: 6,
      category: "Farm House",
      name: "Mountain View Lodge",
      image: "/farmHouse-category.jpg",
      profileImage: "/farmHouse-category.jpg",
      description: "Scenic farm house with panoramic mountain views.",
      price: "$1800",
      location: "Mountain Range, 50 miles from city",
      phone: "345-678-9012",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 7,
      category: "Venue",
      name: "Rooftop Gardens",
      image: "/venue-category.jpg",
      profileImage: "/venue-category.jpg",
      description: "Modern rooftop venue for urban chic events.",
      price: "$3000",
      location: "Downtown Skyline",
      phone: "456-123-7890",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 8,
      category: "Farm House",
      name: "Lakeside Haven",
      image: "/farmHouse-category.jpg",
      profileImage: "/farmHouse-category.jpg",
      description: "Tranquil farm house by the lake for peaceful getaways.",
      price: "$2000",
      location: "Lakeside Drive, 40 miles from city",
      phone: "567-123-8904",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 9,
      category: "Catering",
      name: "Classic Cuisine",
      image: "/catering-category.jpg",
      profileImage: "/catering-category.jpg",
      description: "Delicious meals for weddings and celebrations.",
      price: "$40 per person",
      location: "Entire City Area",
      phone: "321-456-0987",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 10,
      category: "Photography",
      name: "Golden Hour Studio",
      image: "/photography-category.jpg",
      profileImage: "/photography-category.jpg",
      description: "Specializing in golden hour outdoor photography.",
      price: "$1200",
      location: "Hillside View",
      phone: "123-654-7890",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 11,
      category: "Venue",
      name: "Historic Hall",
      image: "/venue-category.jpg",
      profileImage: "/venue-category.jpg",
      description: "Classic historic venue for vintage-themed events.",
      price: "$2200",
      location: "Old Town Square",
      phone: "789-456-0123",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 12,
      category: "Farm House",
      name: "Valley Orchard",
      image: "/farmHouse-category.jpg",
      profileImage: "/farmHouse-category.jpg",
      description: "Farm house surrounded by lush orchards.",
      price: "$1700",
      location: "Valley Road, 35 miles from city",
      phone: "789-012-6789",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 13,
      category: "Catering",
      name: "Savory Treats",
      image: "/catering-category.jpg",
      profileImage: "/catering-category.jpg",
      description: "Catering with a focus on gourmet and fusion cuisines.",
      price: "$60 per person",
      location: "Metro and Suburban Areas",
      phone: "654-321-8765",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 14,
      category: "Photography",
      name: "Studio One",
      image: "/photography-category.jpg",
      profileImage: "/photography-category.jpg",
      description: "Top-notch studio for event and portrait photography.",
      price: "$900",
      location: "Central Plaza",
      phone: "432-567-0987",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 15,
      category: "Venue",
      name: "Sunset Terrace",
      image: "/venue-category.jpg",
      profileImage: "/venue-category.jpg",
      description: "Charming terrace venue with breathtaking sunset views.",
      price: "$2600",
      location: "Hillside Avenue",
      phone: "890-345-6781",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 16,
      category: "Farm House",
      name: "Country Escape",
      image: "/farmHouse-category.jpg",
      profileImage: "/farmHouse-category.jpg",
      description: "Rustic yet modern farm house for private events.",
      price: "$1900",
      location: "Countryside, 20 miles from city",
      phone: "123-789-4560",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 17,
      category: "Catering",
      name: "Grand Banquets",
      image: "/catering-category.jpg",
      profileImage: "/catering-category.jpg",
      description: "High-end catering for luxury events and galas.",
      price: "$80 per person",
      location: "Metro Area",
      phone: "678-543-2109",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 18,
      category: "Photography",
      name: "Memories Captured",
      image: "/photography-category.jpg",
      profileImage: "/photography-category.jpg",
      description: "Expert event photography with an artistic touch.",
      price: "$1100",
      location: "Gallery District",
      phone: "321-890-6547",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 19,
      category: "Venue",
      name: "Crystal Hall",
      image: "/venue-category.jpg",
      profileImage: "/venue-category.jpg",
      description: "A luxurious venue with crystal chandeliers and grand design.",
      price: "$3200",
      location: "City Center",
      phone: "543-210-7896",
      status: "Open for Booking",
      isWishlisted: false,
    },
    {
      id: 20,
      category: "Farm House",
      name: "Meadow Bliss",
      image: "/farmHouse-category.jpg",
      profileImage: "/farmHouse-category.jpg",
      description: "Serene farm house perfect for relaxing getaways.",
      price: "$1800",
      location: "Meadow Lane, 45 miles from city",
      phone: "678-123-7890",
      status: "Open for Booking",
      isWishlisted: false,
    },
  ]);
  
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, onSelect])

  const toggleWishlist = (id: number) => {
    setListings(listings.map(listing =>
      listing.id === id ? { ...listing, isWishlisted: !listing.isWishlisted } : listing
    ))
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className='container mx-auto p-4 xl:max-w-[1420px]'>
      <div className="text-center mb-8">
        <p className="text-orange-500 mb-2">OUR LATEST LISTING</p>
        <h1 className="text-3xl font-bold">New Listings in Our Directory</h1>
        <p className="text-muted-foreground mt-2">
          Discover the perfect venues, services, and experiences for your next event.
        </p>
      </div>
      <div className="overflow-hidden cursor-grab" ref={emblaRef}>
        <div className="flex -ml-4">
          {listings.map((listing) => (
            <div key={listing.id} className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333333%] xl:flex-[0_0_25%]">
              <Card className="overflow-hidden h-full">
                <CardHeader className="p-0 relative">
                  <Image
                    src={listing.image}
                    alt={listing.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                    <Badge
                      variant="secondary"
                      className="bg-white hover:bg-white flex items-center gap-1"
                    >
                      {listing.category === "Venue" && "🏛️"}
                      {listing.category === "Farm House" && "🏡"}
                      {listing.category === "Catering" && "🍽️"}
                      {listing.category === "Photography" && "📸"}
                      {listing.category}
                    </Badge>
                    <Badge
                      variant={listing.status === "Booked" ? "destructive" : "secondary"}
                      className={listing.status === "Booked" ? "" : "bg-green-500 hover:bg-green-600 text-white"}
                    >
                      {listing.status}
                    </Badge>
                  </div>
                  <div className="absolute -bottom-6 left-4">
                    <Image
                      src={listing.profileImage}
                      alt="Profile"
                      width={48}
                      height={48}
                      className="rounded-full border-4 border-background"
                    />
                  </div>
                </CardHeader>

                <CardContent className="pt-8">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">{listing.name}</h2>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{listing.description}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span><LocationIcon color='#f97316' height={'20px'} width={'20px'}/></span>
                    {listing.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span><PhoneIcon color='#f97316' height={'20px'} width={'20px'}/></span>
                    {listing.phone}
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between items-center border-t p-4 mt-auto">
                  <div className="text-lg font-bold">{listing.price}</div>
                  <div className="flex gap-2">
                    
                    <Button
                      size="sm"
                      variant={listing.isWishlisted ? "default" : "ghost"}
                      onClick={() => toggleWishlist(listing.id)}
                      aria-label={listing.isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      className={listing.isWishlisted ? "bg-red-700 hover:bg-red-600" : "bg-transparent hover:bg-transparent"}
                    >
                      <Heart className={`w-4 h-4 ${listing.isWishlisted ? "fill-current" : ""}`} />
                    </Button>
                  
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mt-4 gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => emblaApi?.scrollPrev()}
          className="rounded-full p-2 bg-orange-500 text-white hover:bg-orange-600"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-2">
          {scrollSnaps.map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              onClick={() => scrollTo(index)}
              className={`w-2 h-2 rounded-full p-0 ${
                index === selectedIndex ? 'bg-orange-500' : 'bg-orange-200'
              }`}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </Button>
          ))}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => emblaApi?.scrollNext()}
          className="rounded-full p-2 bg-orange-500 text-white hover:bg-orange-600"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      </div>
    </div>
  )
}