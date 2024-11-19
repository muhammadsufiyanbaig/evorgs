import React from "react";
import Hero from "./Hero";
import Category from "./Category";
import Contact from "./contact";
import Footer from "./Footer";
import Banner from "./Banner";
import Testimonial from "./Testimonials";
import RecentWork from "./RecentWork";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <Banner/>
      <Category />
      <RecentWork/>
      <Testimonial/>
      <Contact />
      <Footer/>
    </div>
  );
};

export default LandingPage;
