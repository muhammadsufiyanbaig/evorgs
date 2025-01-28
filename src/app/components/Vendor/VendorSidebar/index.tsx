import Link from "next/link"
import { Home, Calendar, Tag, Smile, Book, Image, Bell, CreditCard, Users, BarChart, Settings } from "lucide-react"

export default function VendorSidebar() {
  const links = [
    { href: "/vendor/dashboard", icon: Home },
    { href: "/vendor/calendar", icon: Calendar },
    { href: "/vendor/sales", icon: Tag },
    { href: "/vendor/clients", icon: Smile },
    { href: "/vendor/catalog", icon: Book },
    { href: "/vendor/marketing", icon: Image },
    { href: "/vendor/notifications", icon: Bell },
    { href: "/vendor/payments", icon: CreditCard },
    { href: "/vendor/team", icon: Users },
    { href: "/vendor/reports", icon: BarChart },
  ];

  return (
    <aside className="w-16 bg-zinc-900 min-h-screen flex flex-col items-center py-4 space-y-4">
      <Link href="/" className="mb-6">
        <div className="w-8 h-8 bg-white rounded-full" />
      </Link>
      <nav className="space-y-4 flex-1">
        {links.map(({ href, icon: Icon }, index) => (
          <Link key={index} href={href} className="block p-2 text-white hover:bg-white/10 rounded-lg">
            <Icon className="w-5 h-5" />
          </Link>
        ))}
      </nav>
      <Link href="/settings" className="block p-2 text-white hover:bg-white/10 rounded-lg">
        <Settings className="w-5 h-5" />
      </Link>
    </aside>
  )
}

