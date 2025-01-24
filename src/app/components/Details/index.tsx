import React from "react";
import Gallery from "./Gallery";
import Overview from "./Overview";
import Available from "./Available";
import Map from "./Map";
import Amenities from "./Amenities";
import Reviews from "./Reviews";
import Grid from "./Grid";

const Details = () => {
  return (
    <div className="px-4 lg:px-10">
      <Gallery />
      <Grid />
    </div>
  );
};

export default Details;
