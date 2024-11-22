import { LocationIcon } from "@/utils/Icons";
import Link from "next/link";

export default function Map() {
  const address = "Gümüşsuyu Mah. İnönü Cad. No:8, İstanbul 34437";

  return (
    <section className="mt-8">
      <div className="container pt-8 border-t space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Location/Map</h2>
          <Link
            href={"#"}
            //   onClick={() => window.open(googleMapsUrl, '_blank')}
            className="bg-orange-600 hover:bg-orange-500 text-white rounded-lg py-3 px-4 text-xs sm:text-sm"
          >
            View on google maps
          </Link>
        </div>
        <div className="relative aspect-[16/9] w-full rounded-lg bg-muted">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14475.799247228457!2d67.1095609!3d24.8996935!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb339e74fb94d59%3A0x1f060e0c084792f8!2sInnovative%20Widget%20-%20One%20Window%20Digital%20Solution-%20Best%20Digital%20Marketing%20Agency%20-%20Best%20Digital%20Marketing%20Company!5e0!3m2!1sen!2s!4v1732093315281!5m2!1sen!2s`}
            className="absolute inset-0 h-full w-full rounded-lg"
            allowFullScreen
            loading="lazy"
            no-referrer-when-downgrade="no-referrer-when-loaded"
          />
        </div>
        <div className="flex items-start gap-2 text-sm">
        <LocationIcon height={15} width={15} />
        <span>{address}</span>
        </div>
      </div>
    </section>
  );
}
