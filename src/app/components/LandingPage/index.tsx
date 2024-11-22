import React from "react";
import Hero from "./Hero";
import ExploreListing from "./ExploreListing";

import LatestListing from "./LatestListing";
import Testimonial from "./Testimonials";
import StatsBanner from "./StatsBanner";
import CTABanner from "./CTABanner";
import DownloadBanner from "./DownloadBanner";
import HIWBanner from "./HIWBanner";

const LandingPage = () => {
  // function to handle the form submission
  return (
    <div className="bg-gray-100">
      <Hero />
      <LatestListing/>
      <ExploreListing />
      <StatsBanner/>
      <Testimonial/>
      <CTABanner/>
      <HIWBanner/>
      <DownloadBanner/>
    </div>
  );
};

export default LandingPage;
