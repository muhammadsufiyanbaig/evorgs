"use client";
import { Home, Calendar, ArrowLeftRight, CreditCard } from "lucide-react";

interface SalesSidebarProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

export default function SalesSidebar({
  activeComponent,
  setActiveComponent,
}: SalesSidebarProps) {
  const menuItems = [
    { title: "Daily Sales", icon: Home, id: "daily-sales" },
    { title: "Appointments", icon: Calendar, id: "appointments" },
    { title: "Sales", icon: ArrowLeftRight, id: "sales" },
    { title: "Payments", icon: CreditCard, id: "payments" },
  ];

  return (
    <aside className="w-64 h-screen bg-white text-gray-700 shadow-lg flex flex-col border-r">
      {/* Sidebar Header */}
      <div className="p-6 font-bold text-xl border-b border-white">
        Sales
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveComponent(item.id)}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-300 ${
              activeComponent === item.id
                ? "bg-orange-500/20 text-zinc-500 shadow-sm"
                : "hover:bg-gray-100"
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
