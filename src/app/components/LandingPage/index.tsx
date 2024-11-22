import React from "react";
import Hero from "./Hero";
import ExploreListing from "./ExploreListing";
import Contact from "./contact";
import Footer from "./Footer";
import LatestListing from "./LatestListing";
import Testimonial from "./Testimonials";
import StatsBanner from "./StatsBanner";
import CTABanner from "./CTABanner";
import DownloadBanner from "./DownloadBanner";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <LatestListing/>
      <ExploreListing />
      <StatsBanner/>
      <Testimonial/>
      <CTABanner/>
      <DownloadBanner/>
      <Contact />
      <Footer/>
    </div>
  );
};

export default LandingPage;
