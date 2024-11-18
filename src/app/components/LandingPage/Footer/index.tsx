import { Facebook, Instagram, Twitter } from "@/utils/Icons/LandingPage";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image
                width={32}
                height={32}
                src={"https://your-logo-url.com/logo.svg"} // Replace with your event planning site logo
                className="h-8 me-3"
                alt="Evorgs™"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Evorgs™
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Services
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/wedding-planning" className="hover:underline">
                    Wedding Planning
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/corporate-events" className="hover:underline">
                    Corporate Events
                  </Link>
                </li>
                <li>
                  <Link href="/birthday-parties" className="hover:underline">
                    Birthday Parties
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Event Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/event-ideas" className="hover:underline">
                    Event Ideas
                  </Link>
                </li>
                <li>
                  <Link href="/vendor-directory" className="hover:underline">
                    Vendor Directory
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Contact Us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Get in Touch
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            ©{new Date().getFullYear()}{" "}
            <Link
              href="/"
              target="_blank"
              className="hover:underline hover:text-orange-500"
            >
              Evorgs™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link
              target="_blank"
              href="https://www.facebook.com/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <Facebook color="#f97316" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://twitter.com/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <Twitter color="#f97316" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              target="_blank"
              href="https://www.instagram.com/"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <Instagram color="#f97316" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
