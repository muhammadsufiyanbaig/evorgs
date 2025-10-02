import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/utils/provider";

export const metadata: Metadata = {
  title: "Evorgs - Event Management Platform",
  description: "Your one-stop solution for event planning and management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className="antialiased"
        suppressHydrationWarning={true}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
