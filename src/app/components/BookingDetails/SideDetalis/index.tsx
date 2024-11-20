"use client";

import {
  Apple,
  Arrow,
  Building,
  Email,
  Facebook,
  Google,
  LocationIcon,
} from "@/utils/Icons/icons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function SideDetails() {
  const [selectedOption, setSelectedOption] = useState("full");
  const [selectedCard, setSelectedCard] = useState("card1");
  const [showCardSection, setShowCardSection] = useState(false);

  return (
    <div className="flex flex-col leading-[normal] tracking-[0px] text-neutral-800 mt-6 space-y-6">
      {/* Room Details */}
      <div className="flex flex-col justify-start gap-6 rounded-xl bg-white px-4 py-6 drop-shadow-lg md:px-6 md:py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-shrink-0 text-xl font-bold text-center">
            Superior room - 1 double bed or 2 twin beds
          </div>
          <div className="text-cyan-950 text-right">
            <p>
              <span className="text-2xl font-bold">$240</span>
              <span className="text-sm"> /night</span>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 border rounded-lg border-orange-700 bg-white p-4">
          <div className="h-16 w-16 flex-shrink-0 rounded-lg bg-gray-200"></div>
          <div className="flex flex-col items-start gap-y-2">
            <div className="text-lg font-semibold">
              CVK Park Bosphorus Hotel Istanbul
            </div>
            <div className="flex items-center text-sm font-medium gap-1">
              <LocationIcon width={18} height={18} />
              Gümüssuyu Mah. Inönü Cad. No:8, Istanbul 34437
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-start">
            <div className="text-lg font-semibold">Thursday, Dec 8</div>
            <div className="text-sm font-medium">Check-In</div>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="h-2">
              <Arrow height={35} width={35} />
            </span>
            <Building height={35} width={35} />
            <span className="h-2 rotate-180">
              <Arrow height={35} width={35} />
            </span>
          </div>
          <div className="text-center md:text-end">
            <div className="text-lg font-semibold">Friday, Dec 9</div>
            <div className="text-sm font-medium">Check-Out</div>
          </div>
        </div>
      </div>

      {/* Payment Options */}
      <div className="flex flex-col gap-y-3 rounded-xl bg-white p-4 text-sm leading-normal drop-shadow-lg">
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
                Pay part now, part later
              </Label>
              <p className="mt-2">
                Pay $207.43 now, and the rest ($207.43) will be automatically
                charged to the same payment method on Nov 14, 2022. No extra
                fees.
              </p>
            </div>
            <div className="w-6 h-6 flex items-center justify-center">
              <RadioGroupItem value="partial" id="partial" />
            </div>
          </div>
        </RadioGroup>
        <div className="text-xs underline font-medium mt-2">More info</div>
      </div>

      {/* Login section */}
      {!showCardSection && (
        <div className="">
          <div className="flex flex-col gap-4 rounded-xl bg-white p-4 md:p-6 drop-shadow-lg">
            <div className="text-xl font-bold">Login or Sign up to book</div>
            <Input
              placeholder="Phone Number"
              className="py-3 shadow-none border-black"
            />
            <p className="text-xs">
              We’ll call or text you to confirm your number. Standard message and
              data rates apply.{" "}
              <span className="font-medium underline">Privacy Policy</span>
            </p>
            <button
              className="w-full py-3 text-center text-white bg-orange-700 rounded"
              onClick={() => setShowCardSection(true)}
            >
              Continue
            </button>
            <div className="flex items-center justify-center gap-x-2 text-sm">
              <span className="font-medium">Or</span>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center justify-center flex-1 border border-orange-700 py-2 rounded">
                <Facebook color="#4267B2" width="20px" height="20px" />
              </button>
              <button className="flex items-center justify-center flex-1 border border-orange-700 py-2 rounded">
                <Google width={25} height={25} />
              </button>
              <button className="flex items-center justify-center flex-1 border border-orange-700 py-2 rounded">
                <Apple width={20} height={20} />
              </button>
            </div>
            <button className="flex items-center justify-center gap-x-2 border border-orange-700 py-2 rounded mt-4 w-full">
              <Email color="#000000" />
              <span>Continue with email</span>
            </button>
          </div>
        </div>
      )}

      {/* Card Section */}
      {showCardSection && (
        <div>
          <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-lg">
            {/* Card 1 */}
            <div
              className={`flex items-center justify-between gap-4 p-4 rounded-lg cursor-pointer ${
                selectedCard === "card1"
                  ? "bg-orange-700 text-white"
                  : "bg-gray-100"
              }`}
              onClick={() => setSelectedCard("card1")}
            >
              <div className="flex items-center gap-4">
                <div className="h-8 w-12 bg-gray-200 rounded"></div>{" "}
                {/* VISA Logo */}
                <div className="font-medium">
                  <span className="mr-2">**** 4321</span>
                  <span>02/27</span>
                </div>
              </div>
              <div className="h-5 w-5 flex items-center justify-center border border-white rounded-full">
                {selectedCard === "card1" && (
                  <div className="h-3 w-3 bg-white rounded-full"></div>
                )}
              </div>
            </div>

            {/* Add New Card */}
            <div
              className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-700"
              onClick={() => setSelectedCard("newCard")}
            >
              <div className="h-8 w-8 flex items-center justify-center rounded-full border border-gray-400 text-gray-500">
                +
              </div>
              <div className="text-sm text-gray-500">Add a new card</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
