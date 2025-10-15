import React from "react";
import Gallery from "./Gallery";
import Overview from "./Overview";
import Available from "./Available";
import Map from "./Map";
import Amenities from "./Amenities";
import Reviews from "./Reviews";
import Grid from "./Grid";

interface ServiceProfileProps {
  serviceId?: string;
  serviceData?: any;
  serviceType?: 'catering' | 'farmhouse' | 'venue' | 'photography' | null;
}

const Details = ({ serviceId, serviceData, serviceType }: ServiceProfileProps) => {
  return (
    <div className="px-4 lg:px-10">
      <Gallery serviceData={serviceData} serviceType={serviceType} />
      <Grid serviceId={serviceId} serviceData={serviceData} serviceType={serviceType} />
    </div>
  );
};

export default Details;
