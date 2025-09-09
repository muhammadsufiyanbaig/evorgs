import type { Metadata } from "next";
import ActiveSectionContextProvider from "../context/active-section-context";

export const metadata: Metadata = {
  title: "Evorgs - Authentication",
  description: "Login or register to access your Evorgs account",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ActiveSectionContextProvider>
      {children}
    </ActiveSectionContextProvider>
  );
}
