import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ActiveSectionContextProvider from "./context/active-section-context";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Evorgs - Your Event Organizer",
  description: "Evorgs helps you organize and manage your events seamlessly. Discover the best tools and tips for event planning.",
  keywords: "event organizer, event planning, event management, Evorgs",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ActiveSectionContextProvider>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
      </body>
        </ActiveSectionContextProvider>
    </html>
  );
}
