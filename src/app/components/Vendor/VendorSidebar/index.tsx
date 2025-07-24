'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Megaphone,
  BookImage,
  CalendarCheck,
  Receipt,
  Home,
  Users,
  LineChart,
  Settings,
  Ticket,
  MailCheck,
  User,
  Layers,
  Newspaper,
  MessageSquare,
  X,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useSidebar } from "@/components/ui/sidebar"; // context managing sidebar state

export default function VendorSidebar() {
  const pathname = usePathname();
  const { open: isOpen, setOpen: setIsOpen } = useSidebar(); // requires setter for closing

  const links = [
    { href: "/vendor/", icon: LineChart, label: "Dashboard" },
    { href: "/vendor/bookings", icon: CalendarCheck, label: "Bookings" },
    { href: "/vendor/pos", icon: Receipt, label: "POS" },
    { href: "/vendor/messages", icon: MessageSquare, label: "Messages" },
    { href: "/vendor/services", icon: Layers, label: "Services" },
    { href: "/vendor/vouchers", icon: Ticket, label: "Vouchers" },
    { href: "/vendor/advertisment", icon: Megaphone, label: "Advertisment" },
    { href: "/vendor/blogs", icon: Newspaper, label: "Blogs" },
    { href: "/vendor/profile", icon: User, label: "Profile" },
  ];

  return (
    <aside
      className={`
        static top-16 left-0 z-50 h-[calc(100vh-4rem)] w-48 bg-zinc-900 text-white transform transition-transform duration-300
        md:fixed md:translate-x-0 md:w-20 md:flex md:flex-col md:items-center 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Close Button - visible only on mobile */}
      <div className="flex justify-end p-4 md:hidden">
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-300 transition"
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex flex-col items-center md:space-y-4 p-4 space-y-2">
        {links.map(({ href, icon: Icon, label }) => (
          <TooltipProvider key={href} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={href}
                  className={`flex items-center gap-3 md:justify-center p-2 rounded-lg transition w-full hover:bg-white/10 ${
                    pathname === href ? "bg-orange-600" : ""
                  }`}
                  onClick={() => setIsOpen(false)} // optional: auto-close sidebar on mobile when navigating
                >
                  <Icon className="w-5 h-5" />
                  <span className="md:hidden text-sm">{label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="hidden md:block px-2 py-1 text-sm">
                {label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
    </aside>
  );
}
