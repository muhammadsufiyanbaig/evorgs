import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
import SideDetails from "./SideDetalis";
import BookingCard from "./BookingCard";

const BookingDetails = () => {
  return (
    <div className="px-4 lg:px-10 container !mt-32 !mb-8">
      <div className="breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">TUrkey</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Istanbul</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>CVK Park Bosphorus Hotel Istanbul</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid lg:grid-cols-[65%_auto] gap-10">
        <div>
          <SideDetails />
        </div>
        <div className="relative">
          <BookingCard />
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
