"use client";

import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Globe,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone,
  Clipboard,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Calendar from "../../Calender/calender";

interface RightSectionProps {
  serviceData?: any;
  serviceType?: 'catering' | 'farmhouse' | 'venue' | null;
}

const RightSection = ({ serviceData, serviceType }: RightSectionProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dialogTimeLeft, setDialogTimeLeft] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState("");
  const events = [new Date("2024-12-25"), new Date("2024-11-15")]; // Add your custom event dates here

  const calculateTimeLeft = (targetDate: Date | undefined) => {
    if (!targetDate) return "";
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      return `${days} Days, ${hours} Hours, ${minutes} Minutes, ${seconds} Seconds`;
    } else {
      return "The selected date has passed.";
    }
  };

  const handleSelect = (date: Date | undefined) => {
    setDate(date);
    setIsPopupOpen(true);
  };

  const copyLink = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => setCopySuccess("Link copied!"))
      .catch(() => setCopySuccess("Failed to copy."));
  };

  useEffect(() => {
    if (date) {
      setTimeLeft(calculateTimeLeft(date));
      const timer = setInterval(() => {
        setTimeLeft(calculateTimeLeft(date));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [date]);

  useEffect(() => {
    if (isPopupOpen && date) {
      const timer = setInterval(() => {
        setDialogTimeLeft(calculateTimeLeft(date));
      }, 1000);

      return () => clearInterval(timer); // Cleanup on dialog close
    }
  }, [isPopupOpen, date]);

  const isEventDate = (date: Date | undefined) => {
    return events.some(
      (event) =>
        event.getDate() === date?.getDate() &&
        event.getMonth() === date?.getMonth()
    );
  };

  return (
    <div className="space-y-4 w-full lg:w-[30%]">
      <div className="flex flex-col gap-4">
        <Button className="bg-orange-600 hover:bg-orange-500 py-6 text-lg">
          <MessageCircleMore /> Please login for Chat
        </Button>
        <Button className="py-6 text-lg">
          <Mail /> Message
        </Button>
      </div>

      <div className="bg-white rounded-lg px-6">
        <h2 className="py-6 text-xl font-bold">Upcoming Event</h2>
        <div className="py-6 relative border-t">
          <div className="absolute h-[2px] bg-orange-600 w-1/6 -top-[1px]" />
          <Calendar events={events} onSelect={handleSelect} />

          <p className="mt-4 text-center text-sm text-gray-600"></p>
          {date && (
            <p className="mt-2 text-center text-sm text-gray-600">
              {isEventDate(date) ? "Not Available" : "Available for this date."}
            </p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg px-6">
        <h2 className="py-6 text-xl font-bold">Booking</h2>
        <div className="py-6 relative border-t">
          <div className="absolute h-[2px] bg-orange-600 w-1/6 -top-[1px]" />
          <div className="space-y-2">
            <label htmlFor="guests" className="text-gray-600 ">
              Number of Guest
            </label>
            <Input
              type="number"
              id="guests"
              defaultValue="1"
              min="1"
              className="bg-gray-50"
            />
          </div>

          <Button className="w-fit bg-orange-600 hover:bg-orange-500 my-4 text-white">
            Login to Book
          </Button>

          <p className="text-gray-600 text-sm">Booking Fee $10</p>
        </div>
      </div>

      <div className="bg-white rounded-lg px-6">
        <h2 className="py-6 text-xl font-bold">Posted By</h2>
        <div className="py-6 relative border-t">
          <div className="absolute h-[2px] bg-orange-600 w-1/6 -top-[1px]" />

          <div className="flex items-center gap-3">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="rounded-full w-20 h-20 object-cover"
            />
            <div>
              <h3 className="text-lg font-bold">Kian Bailey</h3>
              <p className="text-sm font-semibold text-gray-500">Offline Now</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-2 mt-4 text-gray-700">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              <p>The Square Plaza, NJ, USA</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-5 h-5 text-orange-600" />
              <p>012548963</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="23"
                  height="23"
                  viewBox="0 0 32 32"
                  fill="#EA580C"
                >
                  <path
                    fillRule="evenodd"
                    d="M 24.503906 7.503906 C 22.246094 5.246094 19.246094 4 16.050781 4 C 9.464844 4 4.101563 9.359375 4.101563 15.945313 C 4.097656 18.050781 4.648438 20.105469 5.695313 21.917969 L 4 28.109375 L 10.335938 26.445313 C 12.078125 27.398438 14.046875 27.898438 16.046875 27.902344 L 16.050781 27.902344 C 22.636719 27.902344 27.996094 22.542969 28 15.953125 C 28 12.761719 26.757813 9.761719 24.503906 7.503906 Z M 16.050781 25.882813 L 16.046875 25.882813 C 14.265625 25.882813 12.515625 25.402344 10.992188 24.5 L 10.628906 24.285156 L 6.867188 25.269531 L 7.871094 21.605469 L 7.636719 21.230469 C 6.640625 19.648438 6.117188 17.820313 6.117188 15.945313 C 6.117188 10.472656 10.574219 6.019531 16.054688 6.019531 C 18.707031 6.019531 21.199219 7.054688 23.074219 8.929688 C 24.949219 10.808594 25.980469 13.300781 25.980469 15.953125 C 25.980469 21.429688 21.523438 25.882813 16.050781 25.882813 Z M 21.496094 18.445313 C 21.199219 18.296875 19.730469 17.574219 19.457031 17.476563 C 19.183594 17.375 18.984375 17.328125 18.785156 17.625 C 18.585938 17.925781 18.015625 18.597656 17.839844 18.796875 C 17.667969 18.992188 17.492188 19.019531 17.195313 18.871094 C 16.894531 18.722656 15.933594 18.40625 14.792969 17.386719 C 13.90625 16.597656 13.304688 15.617188 13.132813 15.320313 C 12.957031 15.019531 13.113281 14.859375 13.261719 14.710938 C 13.398438 14.578125 13.5625 14.363281 13.710938 14.1875 C 13.859375 14.015625 13.910156 13.890625 14.011719 13.691406 C 14.109375 13.492188 14.058594 13.316406 13.984375 13.167969 C 13.910156 13.019531 13.3125 11.546875 13.0625 10.949219 C 12.820313 10.367188 12.574219 10.449219 12.390625 10.4375 C 12.21875 10.429688 12.019531 10.429688 11.820313 10.429688 C 11.621094 10.429688 11.296875 10.503906 11.023438 10.804688 C 10.75 11.101563 9.980469 11.824219 9.980469 13.292969 C 9.980469 14.761719 11.050781 16.183594 11.199219 16.382813 C 11.347656 16.578125 13.304688 19.59375 16.300781 20.886719 C 17.011719 21.195313 17.566406 21.378906 18 21.515625 C 18.714844 21.742188 19.367188 21.710938 19.882813 21.636719 C 20.457031 21.550781 21.648438 20.914063 21.898438 20.214844 C 22.144531 19.519531 22.144531 18.921875 22.070313 18.796875 C 21.996094 18.671875 21.796875 18.597656 21.496094 18.445313 Z"
                  ></path>
                </svg>
              </span>{" "}
              <p>0125489634566</p>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-orange-600" />
              <a
                href="https://www.restaurant.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                www.restaurant.com
              </a>
            </div>
          </div>

          <div className="flex gap-2 items-center mt-4">
            <div className="font-semibold">Follow Us On:</div>
            <div className="flex space-x-2">
              <a
                href="#"
                className="bg-[#1877F2] text-white p-1.5 rounded-sm hover:opacity-90"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-[#1DA1F2] text-white p-1.5 rounded-sm hover:opacity-90"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a
                href="#"
                className="bg-[#E4405F] text-white p-1.5 rounded-sm hover:opacity-90"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden h-96">
        <Image
          src={"/banner.jpg"}
          alt="Advertisement"
          height={1000}
          width={1000}
          className="object-cover h-full"
        />
      </div>

      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Event Countdown</DialogTitle>
            <DialogDescription>
              The timer below shows the remaining time until your selected date.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="text-center text-lg font-bold text-orange-600">
              {isEventDate(date) ? "Not Available" : "Available for this date."}
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-orange-600 hover:bg-orange-500"
              type="button"
              onClick={() => setIsPopupOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RightSection;
