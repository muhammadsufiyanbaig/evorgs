import Link from "next/link"
import { Home, Calendar, Tag, Smile, Book, Presentation, BellDotIcon, CreditCard, Users, LineChart, Settings } from "lucide-react"

export default function VendorSidebar() {
  const links = [
    { href: "/vendor/dashboard", icon: Home },
    { href: "/vendor/calendar", icon: Calendar },
    { href: "/vendor/sales", icon: Tag },
    { href: "/vendor/clients", icon: Smile },
    { href: "/vendor/catalog", icon: Book },
    { href: "/vendor/marketing", icon: Presentation },
    { href: "/vendor/notifications", icon: BellDotIcon },
    { href: "/vendor/payments", icon: CreditCard },
    { href: "/vendor/team", icon: Users },
    { href: "/vendor/reports", icon: LineChart },
    { href: "/vendor/settings", icon: Settings },
  ];

  return (
    <aside className="w-16 bg-zinc-900 min-h-screen flex flex-col items-center py-4 space-y-4">
      <nav className="pt-4 space-y-4 flex-1">
        {links.map(({ href, icon: Icon }, index) => (
          <Link key={index} href={href} className="block p-2 text-white hover:bg-white/10 rounded-lg">
            <Icon className="w-7 h-7" />
          </Link>
        ))}
      </nav>
     
    </aside>
  )
}

