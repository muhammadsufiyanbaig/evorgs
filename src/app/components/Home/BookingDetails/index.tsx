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

interface BookingDetailsProps {
  serviceId: string;
  serviceType: 'venue' | 'farmhouse' | 'catering' | 'photography' | null;
  serviceData: any;
  onCreateBooking: {
    venue: (variables: any) => Promise<any>;
    farmhouse: (variables: any) => Promise<any>;
    catering: (variables: any) => Promise<any>;
    photography: (variables: any) => Promise<any>;
  };
  loading: boolean;
}

const BookingDetails = ({ 
  serviceId, 
  serviceType, 
  serviceData, 
  onCreateBooking, 
  loading 
}: BookingDetailsProps) => {
  // Extract service name based on type
  const serviceName = serviceData?.packageName || 
                     serviceData?.venueName || 
                     serviceData?.farmHouseName || 
                     serviceData?.name || 
                     'Service';
  
  const location = serviceData?.location || 
                  serviceData?.address || 
                  serviceData?.city || 
                  'Location';
  
  return (
    <div className="px-4 lg:px-10 container !mt-32 !mb-8">
      <div className="breadcrumb">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/services?category=${serviceType}`}>
                {serviceType ? serviceType.charAt(0).toUpperCase() + serviceType.slice(1) : 'Services'}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{serviceName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="grid lg:grid-cols-[65%_auto] gap-10">
        <div>
          <SideDetails 
            serviceId={serviceId}
            serviceType={serviceType}
            serviceData={serviceData}
            onCreateBooking={onCreateBooking}
            loading={loading}
          />
        </div>
        <div className="relative">
          <BookingCard 
            serviceData={serviceData}
            serviceType={serviceType}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
