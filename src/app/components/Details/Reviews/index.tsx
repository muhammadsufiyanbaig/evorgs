import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Flag } from "@/utils/Icons/icons";
import Link from "next/link";

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  initials: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Omar Siphron",
    rating: 5.0,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    initials: "OS",
  },
  {
    id: 2,
    author: "Cristofer Ekström Bothman",
    rating: 5.0,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    initials: "CE",
  },
  {
    id: 3,
    author: "Kaiya Lubin",
    rating: 5.0,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    initials: "KL",
  },
  {
    id: 4,
    author: "Erin Septimus",
    rating: 5.0,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    initials: "ES",
  },
  {
    id: 5,
    author: "Terry George",
    rating: 5.0,
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    initials: "TG",
  },
];

export default function Reviews() {
  return (
    <section className="py-8">
      <div className="contaniner pt-8 border-t">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <Link
            href={"#"}
            //   onClick={() => window.open(googleMapsUrl, '_blank')}
            className="bg-orange-600 hover:bg-orange-500 text-white rounded-lg py-3 px-4 text-xs sm:text-sm"
          >
            Get your review 
          </Link>
        </div>
            <div className="flex gap-2">
              <span className="text-4xl font-bold">4.2</span>
              <div className="flex flex-col">
              <span className="text-lg">Very good</span>
              <span className="text-sm text-muted-foreground">
                371 verified reviews
              </span>
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex gap-4 items-start border-t pt-4 first:border-t-0 first:pt-0"
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback>{review.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center sm:gap-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {review.rating.toFixed(1)}
                        </span>
                        <span>Amazing</span>
                      </div>
                      <span className="hidden sm:block">|</span>
                      <p className="text-sm font-medium text-muted-foreground">{review.author}</p>
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                      <Flag height={15} width={15} color="#7F7F88" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
