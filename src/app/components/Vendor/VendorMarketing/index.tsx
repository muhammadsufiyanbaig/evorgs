import React from "react";
import Sidebar from "./Sidebar";
import DealsGrid from "./DealsGrid";

const VendorMarketing: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <DealsGrid />
    </div>
  );
};

export default VendorMarketing;
