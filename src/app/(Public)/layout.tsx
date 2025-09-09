import type { Metadata } from "next";
import ActiveSectionContextProvider from "../context/active-section-context";
import HeaderFooterWrapper from "@/app/components/Home/HeaderFooterWrapper";

export const metadata: Metadata = {
  title: "Evorgs - Event Organization Platform",
  description: "Discover amazing venues, photographers, caterers, and farmhouses for your special events",
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ActiveSectionContextProvider>
      <HeaderFooterWrapper>{children}</HeaderFooterWrapper>
    </ActiveSectionContextProvider>
  );
}
