import type { Metadata } from "next";
import { Inter } from "next/font/google";
import VendorHeader from "@/app/components/Vendor/VendorHeader";
import VendorSidebar from "@/app/components/Vendor/VendorSidebar";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evorgs Vendor Dashboard",
  description: "Business management platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <VendorHeader />
        <div className="min-h-screen flex">
          <VendorSidebar />
          <div className="flex-1">
            <main className="">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
