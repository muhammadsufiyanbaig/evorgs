import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Plus, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-sm border-b-2 border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl text-black font-bold">
              EV<span className="text-orange-500">Orgs</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium hover:scale-105 text-orange-500"
            >
              Home
            </Link>
            <Link
              href="/listings"
              className="text-sm font-medium hover:scale-105 text-orange-500"
            >
              Listings
            </Link>
            <Link
              href="/pages"
              className="text-sm font-medium hover:scale-105 text-orange-500"
            >
              Pages
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium hover:scale-105 text-orange-500"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:scale-105 text-orange-500"
            >
              Contact Us
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button  className="border bg-transparent hover:bg-transparent hover:scale-105  hover:border-orange-500 rounded-full">
              <UserCircle className="h-10 w-10 text-orange-500" />
              <span className="sr-only">User profile</span>
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full hidden sm:flex">
              <Plus className="h-4 w-4 mr-2" />
              Add Listing
            </Button>
           
          </div>
        </div>
      </div>
    </header>
  );
}
