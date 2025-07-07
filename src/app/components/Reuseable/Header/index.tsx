'use client';
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Menu, Plus, UserCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";


export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = () => {
    router.push("/login");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md border-b-2 border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="">
            <Link href="/" className="flex items-center">
              <Image
                width={32}
                height={32}
                src={"/logo.svg"} // Replace with your event planning site logo
                className="h-16 w-28"
                alt="Evorgs™"
              />
              {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Evorgs™
              </span> */}
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden flex items-center">
            <Button
              onClick={toggleMenu}
              className="p-2 border bg-transparent hover:bg-gray-100 rounded-full"
            >
              {menuOpen ? (
                <X className="h-6 w-6 text-orange-500" />
              ) : (
                <Menu className="h-6 w-6 text-orange-500" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav
            className={`${
              menuOpen ? "block" : "hidden"
            } absolute top-16 left-0 right-0 bg-white shadow-lg md:static md:flex md:items-center md:space-y-0 md:space-x-20 md:bg-transparent md:shadow-none p-4 md:p-0 space-y-4`}
          >
            <Link
              href="/"
              className="block text-sm font-medium hover:scale-105 text-orange-500"
            >
              Home
            </Link>
            
            <Link
              href="/blog"
              className="block text-sm font-medium hover:scale-105 text-orange-500"
            >
              Blog
            </Link>  
            <Link
              href="/contact"
              className="block text-sm font-medium hover:scale-105 text-orange-500"
            >
              Contact Us
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              onClick={handleClick}
              className="border bg-transparent hover:bg-transparent hover:scale-105 hover:border-orange-500 rounded-full"
            >
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
