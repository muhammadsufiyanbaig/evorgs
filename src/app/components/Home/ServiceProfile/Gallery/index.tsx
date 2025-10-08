"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HalfStarFill,
  Heart,
  LocationIcon,
  Share,
  Star,
  StarFill,
} from "@/utils/Icons";
import Image from "next/image";
import Link from "next/link";

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array.from({ length: fullStars }).map((_, index) => (
        <StarFill
          key={`full-${index}`}
          height={15}
          width={15}
          color="#FB923C"
        />
      ))}
      {halfStar && <HalfStarFill height={15} width={15} color="#FB923C" />}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} height={15} width={15} color="#FB923C" />
      ))}
    </>
  );
};

interface GalleryProps {
  serviceData?: any;
  serviceType?: 'catering' | 'farmhouse' | 'venue' | null;
}

const Gallery = ({ serviceData, serviceType }: GalleryProps) => {
  // Extract data based on service type
  const serviceName = serviceType === 'farmhouse' 
    ? serviceData?.farmHouseName 
    : serviceData?.packageName || 'Service Name';
  
  const location = serviceType === 'farmhouse'
    ? `${serviceData?.address}, ${serviceData?.city}${serviceData?.state ? ', ' + serviceData?.state : ''}`
    : serviceData?.location || 'Location';
  
  const rating = serviceData?.rating || 4.0;
  const price = serviceType === 'farmhouse'
    ? (serviceData?.perNightPrice || serviceData?.perDayPrice || 0)
    : (serviceData?.price || 0);
  
  const images = serviceData?.images || [];
  const vendorName = serviceData?.vendorId?.name || serviceData?.vendor?.name || 'Vendor';
  const reviewCount = serviceData?.reviewCount || 0;
  
  const priceLabel = serviceType === 'farmhouse' 
    ? (serviceData?.perNightPrice ? 'night' : 'day')
    : 'package';
  const handleShare = () => {
    const url = window.location.href; // Get the current page URL
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy URL:", error);
      });
  };

  return (
    <section className="mt-32">
      <div className="container">
        <div className="flex items-center gap-4 mb-4">
          <Link href={"/vendor/profile"} className="rounded-full aspect-square h-24 sm:h-28 overflow-hidden p-1  bg-white">
            <Image
              src={serviceData?.vendorId?.profileImage || serviceData?.vendor?.profileImage || "/pic-4.jpg"}
              alt={vendorName}
              height={1000}
              width={1000}
              className="h-full w-full object-cover rounded-full"
            />
          </Link>
          <div>
            <Link href={"/vendor/profile"} className="text-2xl sm:text-3xl font-bold">{vendorName}</Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between md:items-end">
          <div className="space-y-3">
            <div className="breadcrumb">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">
                      Components
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="title flex flex-wrap gap-4">
              <h2 className="text-2xl font-bold">{serviceName}</h2>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <span className="text-orange-500 text-xl flex items-center">
                  {renderStars(rating)}
                </span>
              </div>
            </div>

            <div className="location flex gap-2 items-center">
              <LocationIcon height={15} width={15} />
              {location}
            </div>

            <div className="reviews flex items-center gap-2">
              <p className="border border-orange-600 px-2 py-1 rounded-lg">
                {" "}
                {rating.toFixed(1)}
              </p>
              <strong className="text-xs">
                {rating >= 4.5 ? 'Excellent' : rating >= 4.0 ? 'Very Good' : rating >= 3.5 ? 'Good' : 'Average'}
              </strong>
              <span className="text-gray-500 text-sm">
                ({reviewCount} reviews)
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-end text-orange-600">
              ${price}/<span className="text-sm">{priceLabel}</span>
            </h2>

            <div className="btns flex gap-2 items-center ">
              <button className="border border-orange-600 rounded-md p-3">
                <Heart height={20} width={20} color="#000000" />
              </button>
              <button
                className="border border-orange-600 rounded-md p-3"
                onClick={handleShare} // Attach the click handler
              >
                <Share height={20} width={20} color="#000000" />
              </button>
              <button className="px-6 py-3 w-full bg-orange-600 text-white text-center rounded-md hover:bg-orange-700 transition-colors duration-300 mt-0">
                Book Now
              </button>
            </div>
          </div>
        </div>

        <div className="gallery pt-6 relative">
          <div className="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-2 rounded-xl overflow-hidden">
            <div>
              <Image
                src={images[0] || "https://via.placeholder.com/400x300"}
                alt={serviceName}
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-2 grid-flow-row">
              {images.slice(1, 5).map((image: string, index: number) => (
                <div key={index}>
                  <Image
                    src={image || "https://via.placeholder.com/400x300"}
                    alt={`${serviceName} ${index + 2}`}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {images.length < 5 && Array.from({ length: 5 - images.length }).map((_, index) => (
                <div key={`placeholder-${index}`}>
                  <Image
                    src="https://via.placeholder.com/400x300"
                    alt="Placeholder"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {images.length > 5 && (
            <button className="px-4 py-2 text-sm w-fit bg-orange-600 text-white text-center rounded-md hover:bg-orange-700 transition-colors duration-300 absolute bottom-2 right-2">
              View All {images.length} Photos
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
