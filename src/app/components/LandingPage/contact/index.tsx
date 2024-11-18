'use client'
import { ContactFormData } from "@/utils/interfaces/LandingPage";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Call, Email } from "@/utils/Icons/LandingPage";


const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    senderName: "",
    senderEmail: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Uncomment and use your axios instance for real API requests
      // const response = await axiosInstance.post("/contact/send-email", formData);
      alert("Message sent successfully!");
      setFormData({ senderName: "", senderEmail: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-24">
          <div className="flex items-center lg:mb-0 mb-10">
            <div className="">
              <h1 className="text-gray-900 font-medium leading-6 mb-4 lg:text-left text-2xl text-center">
                Contact Us
              </h1>
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500 drop-shadow-lg font-manrope text-4xl font-semibold leading-10 mb-9 lg:text-left text-center">
                Reach Out To Us
              </h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  className="w-full h-14 bg-gray-100 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-lg border border-gray-200 focus:outline-none py-2 px-4 mb-8"
                  placeholder="Name"
                />
                <input
                  type="email"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  className="w-full h-14 bg-gray-100 shadow-sm text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-lg border border-gray-200 focus:outline-none py-2 px-4 mb-8"
                  placeholder="Email"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full h-48  bg-gray-100 shadow-sm resize-none text-gray-600 placeholder-text-400 text-lg font-normal leading-7 rounded-xl border border-gray-200 focus:outline-none px-4 py-4 mb-8"
                  placeholder="Message"
                />
                <Button className="w-full h-12 text-center text-white text-base font-semibold leading-6 rounded-xl bg-orange-600  shadow transition-all duration-700 hover:bg-orange-700">
                  Submit
                </Button>
              </form>
            </div>
          </div>
          <div
            className={`lg:max-w-xl w-full h-96 md:h-[600px] flex items-center justify-center rounded-lg`}
          >
            <div className="">
              <div className="lg:w-96 w-auto h-auto rounded-lg bg-white shadow-xl lg:p-6 p-4">
                <Link href="tel:+92-3123352687" className="flex items-center mb-6">
                  <Call color="#f97316" />
                  <h5 className="text-black text-base font-normal leading-6 ml-5">
                    +92-3123352687
                  </h5>
                </Link>
                <Link
                  href="mailto:send.sufiyan@gmail.com"
                  className="flex items-center mb-6"
                >
                  <Email color="#f97316" />
                  <h5 className="text-black text-base font-normal leading-6 ml-5">
                    send.sufiyan@gmail.com
                  </h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
