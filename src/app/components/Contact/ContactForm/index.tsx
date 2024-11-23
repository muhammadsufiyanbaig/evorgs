import React from "react";

const ContactForm = () => {
  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-4 lg:px-10 ">
        <div className="py-10 mx-auto flex gap-10 flex-col lg:flex-row lg:w-[85%]">
          <div className="lg:w-[40%]  aspect-square bg-gray-300 rounded-xl overflow-hidden p-10 flex items-center justify-center relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              title="map"
              src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
            ></iframe>
          </div>
          <div className="lg:w-[60%] bg-white rounded-xl flex flex-col p-8 mt-8  lg:mt-0">
            <h2 className="text-black text-3xl font-semibold title-font">
              Send Us Message
            </h2>
            <div className="relative my-4">
              <hr />
              <div className="bg-orange-600 h-[2px] w-[13%]">

              </div>
            </div>
            <div className="relative flex flex-col mt-2 md:flex-row gap-4 mb-4">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                className="w-full bg-gray-100 rounded-xl border-gray-300  text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your Email"
                className="w-full bg-gray-100 rounded-xl border-gray-300  text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="Subject"
                className="w-full bg-gray-100 rounded-xl border-gray-300  text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <textarea
                id="message"
                name="message"
                className="w-full bg-gray-100 rounded-xl border-gray-300  h-32 text-base outline-none py-1 px-3 leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
            <button className="text-white bg-orange-600 border-0 py-2 px-6 focus:outline-none hover:bg-orange-700 rounded-full w-fit text-lg">
              Submit Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
