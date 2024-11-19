import React from "react";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import HotelList from "./HotelList";

const Dashboard = () => {
  return (
    <div className="p-6">
      <SearchBar />
      <div className="flex mt-4">
        <Sidebar />
        <HotelList />
      </div>
    </div>
  );
};

export default Dashboard;
