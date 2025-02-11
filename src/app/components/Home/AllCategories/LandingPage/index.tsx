'use client'
import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import ExploreListing from "./ExploreListing";
import LatestListing from "./LatestListing";
import Testimonial from "./Testimonials";
import StatsBanner from "./StatsBanner";
import CTABanner from "./CTABanner";
import HIWBanner from "./HIWBanner";
import Loading from "@/app/loading";

const LandingPage = () => {
  const [isClient, setIsClient] = useState(false);

  // Ensure this component renders only on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <Loading/>;

  return (
    <div className="bg-gray-100">
      <Hero />
      <LatestListing />
      <ExploreListing />
      <StatsBanner />
      <Testimonial />
      <CTABanner />
      <HIWBanner />
    </div>
  );
};

export default LandingPage;
