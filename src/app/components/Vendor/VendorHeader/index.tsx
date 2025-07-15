'use client'
import { Button } from "@/components/ui/button";
import { Bell, Search, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VendorHeader() {
  const router = useRouter();
  return (
    <header className="border-b px-6 py-3 flex items-center justify-between">
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
      <div className="flex items-center gap-4">
        <Button
          variant="default"
          className="bg-orange-500 hover:bg-orange-500/90"
          onClick={()=> router.push("/vendor/profile/status")}
        >
          <span className="mr-2 bg-white/20 px-2 py-0.5 rounded-full text-sm">
            75%
          </span>
          Status
        </Button>
        <Button variant="ghost" size="icon" onClick={()=> router.push("/vendor/profile/settings")}>
          <Settings className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon"  onClick={()=> router.push("/vendor/profile")}>
          <User className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={()=> router.push("/vendor/notification")}>
          <Bell className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
