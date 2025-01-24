import React from "react";
import Overview from "../Overview";
import Amenities from "../Amenities";
import Map from "../Map";
import Video from "../Video";
import Rating from "../Rating";

const LeftSection = () => {
  return (
    <div className="space-y-6 w-full lg:w-[70%]">
      <Overview />
      <Amenities />
      <Map />
      <Video />
      <Rating />
    </div>
  );
};

export default LeftSection;
