'use client';

import VendorBookingTabContent from "@/app/components/Vendor/VendorBooking";
import VendorBookingSidebar from "@/app/components/Vendor/VendorBooking/BookingSidebar";
import { useState } from "react";

export default function BookingPlatform() {
    const [activeTab, setActiveTab] = useState("marketplace")
  
    return (
      <div className="flex min-h-screen bg-gray-50">
        <VendorBookingSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-8">
          <VendorBookingTabContent activeTab={activeTab} />
        </main>
      </div>
    )
  }
  