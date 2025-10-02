import type { Metadata } from "next";
import UserRouteWrapper from "./UserRouteWrapper";

export const metadata: Metadata = {
  title: "Evorgs - User Dashboard",
  description: "Manage your bookings, favorites, and profile on Evorgs",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserRouteWrapper>
      {children}
    </UserRouteWrapper>
  );
}
