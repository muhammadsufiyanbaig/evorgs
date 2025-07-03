'use client';
import Link from "next/link"
import { usePathname } from "next/navigation";
import { Home, Calendar, Tag, Smile, GalleryVertical, Presentation, BellRing, CreditCard, Users, LineChart, Settings } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function VendorSidebar() {
  const pathname = usePathname();
  const links = [
    { href: "/vendor/dashboard", icon: Home, label: "Dashboard" }, // done
    { href: "/vendor/calendar", icon: Calendar, label: "Calendar" },// done
    { href: "/vendor/sales", icon: Tag, label: "Sales" },// done
    { href: "/vendor/clients", icon: Smile, label: "Clients" },// done
    { href: "/vendor/services", icon: GalleryVertical, label: "Services" }, //done
    { href: "/vendor/advertisment", icon: BellRing , label: "Advertisment" }, //done
    { href: "/vendor/team", icon: Users, label: "Team" },// done
    { href: "/vendor/report", icon: LineChart, label: "Report" }, //done
    { href: "/vendor/settings", icon: Settings, label: "Settings" }, //done
  ];

  return (
    <aside className="w-[4.5rem] bg-zinc-900 min-h-screen flex flex-col items-center py-4 space-y-4">
      <nav className="space-y-4 flex-1">
        {links.map(({ href, icon: Icon, label }, index) => (
            <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
              <Link href={href} className={`block p-2 text-white hover:bg-white/10 rounded-lg ${pathname === href ? 'bg-orange-600' : ''}`}>
                <Icon className="w-7 h-7" />
              </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="px-2 py-1 text-base ml-4">
                {label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </nav>
    </aside>
  )
}

