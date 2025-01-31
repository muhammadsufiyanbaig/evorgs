import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ActiveSectionContextProvider from "./context/active-section-context";
import HeaderFooterWrapper from "./components/HeaderFooterWrapper";

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
  title: "Evorgs",
  description: "",
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
          <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
        </body>
      </ActiveSectionContextProvider>
    </html>
  );
}
