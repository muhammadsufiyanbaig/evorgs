import { Card, CardContent } from "@/components/ui/card";
import { Stars } from "@/utils/Icons";
import React from "react";

interface OverviewProps {
  serviceData?: any;
  serviceType?: 'catering' | 'farmhouse' | 'venue' | null;
}

const Overview = ({ serviceData, serviceType }: OverviewProps) => {
  const description = serviceType === 'farmhouse'
    ? serviceData?.description || 'Beautiful farmhouse property with amazing amenities.'
    : serviceData?.description || serviceData?.packageDescription || 'Premium service package with excellent features.';
  
  const rating = serviceData?.rating || 4.0;
  const reviewCount = serviceData?.reviewCount || 0;
  
  const cardDetails = [
    { rating: rating, label: rating >= 4.5 ? 'Excellent' : rating >= 4.0 ? 'Very Good' : 'Good', reviews: true },
    { icon: <Stars height={30} width={30} color="#C2410C" />, label: serviceType === 'farmhouse' ? 'Farmhouse' : 'Catering' },
    {
      icon: <Stars height={30} width={30} color="#C2410C" />,
      label: serviceData?.isActive ? "Available" : "Unavailable",
    },
    {
      icon: <Stars height={30} width={30} color="#C2410C" />,
      label: "High Quality",
    },
    {
      icon: <Stars height={30} width={30} color="#C2410C" />,
      label: "Clean Service",
    },
  ];
  return (
    <section className=" bg-white rounded-lg px-4 lg:px-6">
      <h2 className="py-6 text-xl font-bold">Overview</h2>
      <div className="py-6 relative border-t ">
        <div className="absolute h-[2px] bg-orange-600 w-1/12 -top-[1px]" />
       <div className="space-y-6">
       <p className="text-sm leading-relaxed">
          {description}
        </p>
        <div className="w-full max-w-2xl flex flex-wrap justify-around sm:justify-start gap-3">
          {cardDetails.map((card, index) => (
            <Card
              key={index}
              className={`aspect-square h-28 shadow-none border-orange-600 ${
                index === 0 ? "bg-orange-600 text-white" : ""
              }`}
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
                              ({reviewCount} reviews)
                            </span>
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {card.icon}
                      <div className="">
                        <p className="font-semibold text-xs">{card.label}</p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
       </div>
      </div>
    </section>
  );
};

export default Overview;
