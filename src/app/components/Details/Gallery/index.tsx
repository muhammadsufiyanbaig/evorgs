import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  HalfStarFill,
  Heart,
  LocationIcon,
  Star,
  StarFill,
} from "@/utils/Icons/icons";
import Image from "next/image";
import Link from "next/link";

const hotels = [
  {
    name: "Grand Royale Hotel",
    location: "New York City",
    rating: 4.2,
    price: 240,
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    name: "Beachfront Paradise",
    location: "Miami Beach",
    rating: 4.7,
    price: 320,
    imageUrl: "https://via.placeholder.com/400x300",
  },
  {
    name: "Mountain View Resort",
    location: "Aspen, Colorado",
    rating: 4.5,
    price: 280,
    imageUrl: "https://via.placeholder.com/400x300",
  },
];

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {Array.from({ length: fullStars }).map((_, index) => (
        <StarFill
          key={`full-${index}`}
          height={15}
          width={15}
          color="#FFFF00"
        />
      ))}
      {halfStar && <HalfStarFill height={15} width={15} color="#FFFF00" />}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <Star key={`empty-${index}`} height={15} width={15} color="#FFFF00" />
      ))}
    </>
  );
};

const Gallery = () => {
  return (
    <section className="mt-32">
      <div className="container">
        <div className="flex justify-between items-end">
          <div className="space-y-3">
            <div className="breadcrumb">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/components">
                      Components
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>

            <div className="title flex gap-4">
              <h2 className="text-2xl font-bold">{hotels[0].name}</h2>
              <div className="flex items-center justify-center sm:justify-start space-x-2">
                <span className="text-yellow-500 text-xl flex items-center">
                  {renderStars(hotels[0].rating)}
                </span>
              </div>
            </div>

            <div className="location flex gap-2 items-center">
              <LocationIcon height={15} width={15} />
              {hotels[0].location}
            </div>

            <div className="reviews flex items-center gap-2">
              <p className="border border-orange-600 px-2 py-1 rounded-lg">
                {" "}
                {hotels[0].rating}
              </p>
              <strong className="text-xs">Very Good</strong>
              <span className="text-gray-500 text-sm">
                ({Math.floor(Math.random() * 500) + 100} reviews)
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-end text-orange-600">
              ${hotels[0].price}/<span className="text-sm">night</span>
            </h2>

            <div className="btns flex gap-2 items-center ">
              <button className="border border-orange-600 rounded-md p-3">
                <Heart height={20} width={20} color="#000000" />
              </button>
              <button className="border border-orange-600 rounded-md p-3">
                <Heart height={20} width={20} color="#000000" />
              </button>
              <button className="px-6 py-3 w-full bg-orange-600 text-white text-center rounded-md hover:bg-orange-700 transition-colors duration-300 mt-0">
                View Place
              </button>
            </div>
          </div>
        </div>

        <div className="gallery pt-6 relative">
          <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
            <div>
              <Image
                src={"https://via.placeholder.com/400x300"}
                alt=""
                width={1000}
                height={1000}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 grid-flow-row">
              <div>
                <Image
                  src={"https://via.placeholder.com/400x300"}
                  alt=""
                  width={1000}
                  height={1000}
                />
              </div>
              <div>
                <Image
                  src={"https://via.placeholder.com/400x300"}
                  alt=""
                  width={1000}
                  height={1000}
                />
              </div>
              <div>
                <Image
                  src={"https://via.placeholder.com/400x300"}
                  alt=""
                  width={1000}
                  height={1000}
                />
              </div>
              <div>
                <Image
                  src={"https://via.placeholder.com/400x300"}
                  alt=""
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
          </div>

          <button className="px-6 py-3 w-fit bg-orange-600 text-white text-center rounded-md hover:bg-orange-700 transition-colors duration-300 absolute bottom-2 right-2">
            View Place
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
