import { Card, CardContent } from "@/components/ui/card";
import { Stars } from "@/utils/Icons";
import React from "react";

const hotels = [
  {
    name: "Grand Royale Hotel",
    location: "New York City",
    rating: 4.2,
    price: 240,
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    name: "Beachfront Paradise",
    location: "Miami Beach",
    rating: 4.7,
    price: 320,
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    name: "Mountain View Resort",
    location: "Aspen, Colorado",
    rating: 4.5,
    price: 280,
    imageUrl: "https://via.placeholder.com/400x300",
  },
];

const cardDetails = [
  { rating: hotels[0].rating, label: "Very Good", reviews: true },
  { icon: <Stars height={30} width={30} />, label: "New Park" },
  { icon: <Stars height={30} width={30} />, label: "Near nightlife" },
  { icon: <Stars height={30} width={30} />, label: "Near theater" },
  { icon: <Stars height={30} width={30} />, label: "Clean Hotel" },
];

const Overview = () => {
  return (
    <section className="mt-10">
      <div className="container py-8 border-t space-y-8">
        <h2 className="text-xl font-bold">Overview</h2>
        <p className="text-sm leading-relaxed">
          Located in Taksim Gmsuyu, the heart of Istanbul, the CVK Park
          Bosphorus Hotel Istanbul has risen from the ashes of the historic Park
          Hotel, which also served as Foreign Affairs Palace 120 years ago and
          is hosting its guests by assuming this hospitality mission. With its
          452 luxurious rooms and suites, 8500 m2 SPA and fitness area, 18
          meeting rooms including 4 dividable ones and 3 terraces with Bosphorus
          view, Istanbul's largest terrace with Bosphorus view (4500 m2) and
          latest technology infrastructure, CVK Park Bosphorus Hotel Istanbul is
          destined to be the popular attraction point of the city. Room and
          suite categories at various sizes with city and Bosphorus view, as
          well as 68 separate luxury suites, are offered to its special guests
          as a wide variety of selection.
        </p>
        <div className="w-full max-w-2xl grid grid-cols-2 min-[450px]:grid-cols-3 md:grid-cols-5 gap-3">
          {cardDetails.map((card, index) => (
            <Card
              key={index}
               className={`aspect-square shadow-none border-orange-600 ${index === 0 ? "bg-orange-600 text-white" : ""}`}
            >
              <CardContent className="p-3 h-full">
                <div className="flex flex-col justify-between h-full">
                  {card.rating ? (
                    <>
                      <p className="font-semibold text-2xl">{card.rating}</p>
                      <div className="">
                        <p className="font-semibold text-sm">{card.label}</p>
                        {card.reviews && (
                          <p className="font-semibold text-[8px]">
                            <span className="text-[10px]">
                              ({Math.floor(Math.random() * 500) + 100} reviews)
                            </span>
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {card.icon}
                      <div className="">
                        <p className="font-semibold text-sm">{card.label}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Overview;
