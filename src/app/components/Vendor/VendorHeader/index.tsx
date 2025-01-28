import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";
import Link from "next/link";

export default function VendorHeader() {
  return (
    <header className="border-b px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl text-black font-bold">
            EV<span className="text-orange-500">Orgs</span>
          </span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button
          variant="default"
          className="bg-orange-500 hover:bg-orange-500/90"
        >
          <span className="mr-2 bg-white/20 px-2 py-0.5 rounded-full text-sm">
            100%
          </span>
          Complete Setup
        </Button>
        <Button variant="ghost" size="icon">
          <Search className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="w-5 h-5" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-gray-200" />
      </div>
    </header>
  );
}
