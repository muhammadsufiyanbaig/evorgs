"use client";

import {
  Apple,
  Arrow,
  Building,
  Email,
  Facebook,
  Google,
  LocationIcon,
} from "@/utils/Icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

interface SideDetailsProps {
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

export default function SideDetails({ 
  serviceId, 
  serviceType, 
  serviceData, 
  onCreateBooking, 
  loading 
}: SideDetailsProps) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("full");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Booking form state
  const [bookingDetails, setBookingDetails] = useState({
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    guestCount: 50,
    numberOfNights: 1, // For farmhouse
    duration: 1, // For photography
    specialRequests: "",
    phoneNumber: "",
  });

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== 'undefined') {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          const token = parsed?.state?.token;
          const user = parsed?.state?.user;
          if (token && user) {
            setIsAuthenticated(true);
          }
        }
      }
    };
    checkAuth();
  }, []);

  // Handle booking submission
  const handleBookingSubmit = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book this service');
      router.push(`/login?redirect=/services/${serviceId}/book`);
      return;
    }

    if (!bookingDetails.eventDate) {
      toast.error('Please select an event date');
      return;
    }

    try {
      let result;

      if (serviceType === 'venue') {
        result = await onCreateBooking.venue({
          vendorId: serviceData?.vendorId?.id || serviceData?.vendorId || "",
          serviceId: serviceId,
          eventDate: bookingDetails.eventDate,
          eventTime: bookingDetails.eventTime || "10:00",
          eventLocation: bookingDetails.eventLocation || "TBD",
          guestCount: bookingDetails.guestCount,
          specialRequests: bookingDetails.specialRequests,
        });
      } else if (serviceType === 'farmhouse') {
        result = await onCreateBooking.farmhouse({
          vendorId: serviceData?.vendorId?.id || serviceData?.vendorId || "",
          serviceId: serviceId,
          checkInDate: bookingDetails.eventDate,
          checkOutDate: new Date(new Date(bookingDetails.eventDate).getTime() + bookingDetails.numberOfNights * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          numberOfGuests: bookingDetails.guestCount,
          numberOfNights: bookingDetails.numberOfNights,
          specialRequests: bookingDetails.specialRequests,
        });
      } else if (serviceType === 'catering') {
        result = await onCreateBooking.catering({
          vendorId: serviceData?.vendorId?.id || serviceData?.vendorId || "",
          serviceId: serviceId,
          eventDate: bookingDetails.eventDate,
          eventTime: bookingDetails.eventTime || "10:00",
          eventLocation: bookingDetails.eventLocation || "TBD",
          guestCount: bookingDetails.guestCount,
          specialRequests: bookingDetails.specialRequests,
        });
      } else if (serviceType === 'photography') {
        result = await onCreateBooking.photography({
          vendorId: serviceData?.vendorId?.id || serviceData?.vendorId || "",
          serviceId: serviceId,
          eventDate: bookingDetails.eventDate,
          eventTime: bookingDetails.eventTime || "10:00",
          eventLocation: bookingDetails.eventLocation || "TBD",
          duration: bookingDetails.duration,
          specialRequests: bookingDetails.specialRequests,
        });
      }

      if (result) {
        toast.success('Booking created successfully!');
        router.push('/my-bookings');
      }
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to create booking');
    }
  };

  if (!serviceData || !serviceType) {
    return null;
  }

  // Extract service details
  const serviceName = serviceData.packageName || 
                     serviceData.venueName || 
                     serviceData.farmHouseName || 
                     serviceData.name || 
                     'Service';
  
  const location = serviceData.location || 
                  serviceData.address || 
                  `${serviceData.city || ''}${serviceData.state ? ', ' + serviceData.state : ''}` ||
                  'Location not specified';
  
  const price = serviceType === 'farmhouse' 
    ? (serviceData.perNightPrice || serviceData.perDayPrice || 0)
    : (serviceData.price || serviceData.pricePerPerson || 0);

  const priceLabel = serviceType === 'farmhouse' 
    ? '/night'
    : serviceType === 'photography'
    ? '/package'
    : serviceType === 'catering'
    ? '/person'
    : '/event';

  const imageUrl = serviceData.imageUrl?.[0] || 
                   serviceData.images?.[0] || 
                   serviceData.imageUrl || 
                   '/placeholder.svg';

  return (
    <div className="flex flex-col leading-[normal] tracking-[0px] text-neutral-800 mt-6 space-y-6">
      {/* Service Details */}
      <div className="flex flex-col justify-start gap-6 rounded-xl bg-white px-4 py-6 drop-shadow-lg md:px-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-shrink-0 text-xl font-bold text-center">
            {serviceName}
          </div>
          <div className="text-cyan-950 text-right">
            <p>
              <span className="text-2xl font-bold">₹{price.toLocaleString()}</span>
              <span className="text-sm">{priceLabel}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 border rounded-lg border-orange-700 bg-white p-4">
          <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-200 relative overflow-hidden">
            <Image 
              src={imageUrl} 
              alt={serviceName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-y-2">
            <div className="text-lg font-semibold">
              {serviceName}
            </div>
            <div className="flex items-center text-sm font-medium gap-1">
              <LocationIcon width={18} height={18} />
              {location}
            </div>
          </div>
        </div>

        {/* Booking Form Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="eventDate" className="font-semibold">
                {serviceType === 'farmhouse' ? 'Check-In Date' : 'Event Date'} *
              </Label>
              <Input
                id="eventDate"
                type="date"
                value={bookingDetails.eventDate}
                onChange={(e) => setBookingDetails({...bookingDetails, eventDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1"
                required
              />
            </div>
            {serviceType !== 'farmhouse' && (
              <div>
                <Label htmlFor="eventTime" className="font-semibold">Event Time</Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={bookingDetails.eventTime}
                  onChange={(e) => setBookingDetails({...bookingDetails, eventTime: e.target.value})}
                  className="mt-1"
                />
              </div>
            )}
          </div>

          {serviceType === 'farmhouse' && (
            <div>
              <Label htmlFor="numberOfNights" className="font-semibold">Number of Nights</Label>
              <Input
                id="numberOfNights"
                type="number"
                min="1"
                value={bookingDetails.numberOfNights}
                onChange={(e) => setBookingDetails({...bookingDetails, numberOfNights: parseInt(e.target.value)})}
                className="mt-1"
              />
            </div>
          )}

          {serviceType === 'photography' && (
            <div>
              <Label htmlFor="duration" className="font-semibold">Duration (hours)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                value={bookingDetails.duration}
                onChange={(e) => setBookingDetails({...bookingDetails, duration: parseInt(e.target.value)})}
                className="mt-1"
              />
            </div>
          )}

          {serviceType !== 'farmhouse' && (
            <div>
              <Label htmlFor="eventLocation" className="font-semibold">Event Location</Label>
              <Input
                id="eventLocation"
                type="text"
                value={bookingDetails.eventLocation}
                onChange={(e) => setBookingDetails({...bookingDetails, eventLocation: e.target.value})}
                placeholder="Enter event location"
                className="mt-1"
              />
            </div>
          )}

          {(serviceType === 'venue' || serviceType === 'catering' || serviceType === 'farmhouse') && (
            <div>
              <Label htmlFor="guestCount" className="font-semibold">
                {serviceType === 'farmhouse' ? 'Number of Guests' : 'Guest Count'}
              </Label>
              <Input
                id="guestCount"
                type="number"
                min="1"
                value={bookingDetails.guestCount}
                onChange={(e) => setBookingDetails({...bookingDetails, guestCount: parseInt(e.target.value)})}
                className="mt-1"
              />
            </div>
          )}

          <div>
            <Label htmlFor="specialRequests" className="font-semibold">Special Requests (Optional)</Label>
            <textarea
              id="specialRequests"
              value={bookingDetails.specialRequests}
              onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
              placeholder="Any special requirements or notes..."
              className="mt-1 w-full border border-gray-300 rounded-md p-2 min-h-[80px]"
            />
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div className="flex flex-col gap-y-3 rounded-xl bg-white p-4 text-sm leading-normal drop-shadow-lg">
        <h3 className="font-bold text-base">Payment Options</h3>
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
          <div
            className={`flex flex-row items-center justify-between gap-4 rounded-xl p-4 cursor-pointer ${
              selectedOption === "full"
                ? "bg-orange-700 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setSelectedOption("full")}
          >
            <div className="flex-grow">
              <Label htmlFor="full" className="font-bold">
                Pay in full
              </Label>
              <p>Pay the total and you are all set</p>
            </div>
            <div className="w-6 h-6 flex items-center justify-center">
              <RadioGroupItem value="full" id="full" />
            </div>
          </div>

          <div
            className={`flex flex-row items-center justify-between gap-4 rounded-xl p-4 cursor-pointer mt-3 ${
              selectedOption === "partial"
                ? "bg-orange-700 text-white"
                : "bg-gray-100"
            }`}
            onClick={() => setSelectedOption("partial")}
          >
            <div className="flex-grow">
              <Label htmlFor="partial" className="font-bold">
                Pay advance (30%)
              </Label>
              <p className="mt-2">
                Pay 30% advance now, and the rest will be paid later before the event
              </p>
            </div>
            <div className="w-6 h-6 flex items-center justify-center">
              <RadioGroupItem value="partial" id="partial" />
            </div>
          </div>
        </RadioGroup>
        <div className="text-xs underline font-medium mt-2 cursor-pointer">More info</div>
      </div>

      {/* Login section */}
      {!isAuthenticated && (
        <div className="">
          <div className="flex flex-col gap-4 rounded-xl bg-white p-4 md:p-6 drop-shadow-lg">
            <div className="text-xl font-bold">Login or Sign up to book</div>
            <Input
              placeholder="Phone Number"
              value={bookingDetails.phoneNumber}
              onChange={(e) => setBookingDetails({...bookingDetails, phoneNumber: e.target.value})}
              className="py-3 shadow-none border-black"
            />
            <p className="text-xs">
              We'll call or text you to confirm your number. Standard message and
              data rates apply.{" "}
              <span className="font-medium underline">Privacy Policy</span>
            </p>
            <button
              className="w-full py-3 text-center text-white bg-orange-700 rounded hover:bg-orange-800"
              onClick={() => router.push(`/login?redirect=/services/${serviceId}/book`)}
            >
              Continue to Login
            </button>
            <div className="flex items-center justify-center gap-x-2 text-sm">
              <span className="font-medium">Or</span>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center justify-center flex-1 border border-orange-700 py-2 rounded hover:bg-orange-50">
                <Facebook color="#4267B2" width="20px" height="20px" />
              </button>
              <button className="flex items-center justify-center flex-1 border border-orange-700 py-2 rounded hover:bg-orange-50">
                <Google width={25} height={25} />
              </button>
              <button className="flex items-center justify-center flex-1 border border-orange-700 py-2 rounded hover:bg-orange-50">
                <Apple width={20} height={20} />
              </button>
            </div>
            <button 
              className="flex items-center justify-center gap-x-2 border border-orange-700 py-2 rounded mt-4 w-full hover:bg-orange-50"
              onClick={() => router.push(`/register?redirect=/services/${serviceId}/book`)}
            >
              <Email color="#000000" />
              <span>Sign up with email</span>
            </button>
          </div>
        </div>
      )}

      {/* Booking Confirmation Section */}
      {isAuthenticated && (
        <div>
          <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
            <div className="text-xl font-bold mb-2">Confirm Your Booking</div>
            <p className="text-sm text-gray-600">
              Review your booking details above and click below to confirm
            </p>
            
            <button
              className={`w-full py-3 text-center text-white rounded font-semibold ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-orange-700 hover:bg-orange-800'
              }`}
              onClick={handleBookingSubmit}
              disabled={loading || !bookingDetails.eventDate}
            >
              {loading ? 'Creating Booking...' : 'Confirm Booking'}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By confirming, you agree to our terms and conditions
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
