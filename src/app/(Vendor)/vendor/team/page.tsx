"use client";
import { useState } from "react";
import { Sidebar } from "@/app/components/Vendor/VendorTeam/TeamSidebar";
import { TeamMembers } from "@/app/components/Vendor/VendorTeam/TeamMember";
import { ScheduledShifts } from "@/app/components/Vendor/VendorTeam/ScheduledShifts";

export default function TeamScheduler() {
  const [view, setView] = useState<"members" | "shifts">("members");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setView={setView} currentView={view} />
      <main className="flex-1 overflow-auto p-8">
        {view === "members" ? <TeamMembers /> : <ScheduledShifts />}
      </main>
    </div>
  );
}
