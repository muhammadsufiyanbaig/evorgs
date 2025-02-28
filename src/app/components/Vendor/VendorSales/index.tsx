"use client";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import VenderDailySales from "./VendorDailySales";
import VendorAppointments from "./VendorAppointments";
import VendorPayments from "./VendorPayment";
import Sales from "./Sales";
import SalesSidebar from "./SalesSidebar";

export default function VendorSales() {
  const [activeComponent, setActiveComponent] = useState("daily-sales");

  const renderComponent = () => {
    switch (activeComponent) {
      case "daily-sales":
        return <VenderDailySales />;
      case "appointments":
        return <VendorAppointments />;
      case "sales":
        return <Sales />;
      case "payments":
        return <VendorPayments />;
      default:
        return <VenderDailySales />;
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SalesSidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />

      {/* Main Content */}
      <div className="flex-1 bg-white">

        {/* Page Content */}
        <div className="p-6">{renderComponent()}</div>
      </div>
    </div>
  );
}
