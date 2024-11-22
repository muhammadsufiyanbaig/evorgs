import Image from "next/image";
import { RightArrow } from "@/utils/Icons";
import { Button } from "@/components/ui/button";

export default function CTABanner() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="max-w-5xl w-full">
        <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-orange-600 sm:rounded-lg text-white">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4 md:mb-0">
            <div className="relative w-64 h-56">
              {/* Background div */}
              <div className="absolute inset-0 bg-white rotate-45 rounded-full shadow-xl"></div>

              {/* Image */}
              <Image
                src="/CTABanner.png"
                alt="Person"
                width={144} // Explicit pixel value for width (matches w-36)
                height={500} // Explicit pixel value for height (matches h-56)
                className="rounded-full relative z-10 w-36 h-56 object-cover "
              />
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">Do You Have Any Questions?</h2>
              <p className="text-sm mt-2">
                Nemo enim ipsam voluptatem quia voluptas hen an unknown printer
                wtnd scrambled it to makeive centuriesbut also.
              </p>
            </div>
          </div>
          <Button className="flex hover:bg-white shadow-xl items-center justify-center gap-2 px-4 py-2 bg-white text-orange-600 rounded-full hover:bg-opacity-90 scale-105 transition-colors w-full md:w-auto max-w-fit">
            Contact With Us
            <RightArrow color="#EA580C" height={`20px`} width={`20px`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
