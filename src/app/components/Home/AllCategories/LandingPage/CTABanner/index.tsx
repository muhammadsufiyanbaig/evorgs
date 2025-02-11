import { Button } from "@/components/ui/button";
import { RightArrow } from "@/utils/Icons";
// import { ArrowRight } from 'lucide-react'
import Image from "next/image";

export default function CTABanner() {
  return (
    <section className="relative -mb-[70px]">
      <div className="container px-4">
        <div className="lg:max-w-[90%] w-full mx-auto relative overflow-hidden bg-orange-600 rounded-3xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 px-8 lg:px-12 lg:pb-0">
            <div className="flex flex-col lg:flex-row items-center gap-2 flex-1">
              <div className="relative w-48 h-48 lg:w-52 lg:h-52 flex-shrink-0">
                <div className="absolute inset-5 aspect-square bg-white rounded-3xl rotate-45 -top-[10%]" />
                <Image
                  src="/CTABanner.png"
                  alt="Friendly representative"
                  width={1000}
                  height={1000}
                  className="relative z-10 w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="text-center lg:text-left lg:pl-8">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  Do You Have Any Questions ?
                </h2>
                <p className="text-white/90 text-lg">
                  Nemo enim ipsam voluptatem quia voluptas hen an unknown
                  printer wtnd scrambled it to makeive centuriesbut also.
                </p>
              </div>
            </div>
            <Button
              className="bg-white scale-105 shadow-lg hover:bg-white/90 text-orange-600 rounded-full px-8 py-4 h-auto text-base font-semibold"
              size="lg"
            >
              CONTACT WITH US
              <RightArrow color="#ea580c" className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
