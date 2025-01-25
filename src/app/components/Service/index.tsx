import React from "react";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import HotelList from "./HotelList";

const Service = () => {
  return (
    <div className="p-4 lg:p-6 container">
      <SearchBar />
      <div className="flex flex-col lg:flex-row mt-10 relative">
        <Sidebar />
        <HotelList />
      </div>
    </div>
  );
};

export default Service;
  