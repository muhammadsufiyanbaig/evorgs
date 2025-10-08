import React from "react";
import Overview from "../Overview";
import Amenities from "../Amenities";
import Map from "../Map";
import Video from "../Video";
import Rating from "../Rating";

interface LeftSectionProps {
  serviceData?: any;
  serviceType?: 'catering' | 'farmhouse' | 'venue' | null;
}

const LeftSection = ({ serviceData, serviceType }: LeftSectionProps) => {
  return (
    <div className="space-y-6 w-full lg:w-[70%]">
      <Overview serviceData={serviceData} serviceType={serviceType} />
      <Amenities serviceData={serviceData} serviceType={serviceType} />
      <Map serviceData={serviceData} serviceType={serviceType} />
      <Video serviceData={serviceData} serviceType={serviceType} />
      <Rating serviceData={serviceData} serviceType={serviceType} />
    </div>
  );
};

export default LeftSection;
