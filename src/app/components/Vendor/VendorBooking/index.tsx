import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Check, ClipboardList, ShoppingBag } from "lucide-react";
import Image from "next/image";

const VendorBookingTabContent = ({ activeTab }: { activeTab: string }) => {
  if (activeTab === "link-builder") {
    return (
        <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2 text-orange-500">Link builder</h1>
          <p className="text-gray-500">
            Create shareable links and QR codes for anything that your clients can book or buy online.{" "}
            <button className="text-orange-600 hover:underline">Learn more</button>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-orange-100 w-12 h-12 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Link to everything</h3>
              <p className="text-gray-500">
                One simple link covering everything your clients can book or buy online.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create link</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="rounded-full bg-orange-100 w-12 h-12 flex items-center justify-center mb-4">
                <ClipboardList className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Link to services</h3>
              <p className="text-gray-500">Booking links for certain services, locations or team members.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Create link</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  if (activeTab === "marketplace")
    return (
    <div className="bg-gray-50 flex justify-center items-center py-12">
    <div className="flex flex-col lg:flex-row gap-12 items-center max-w-6xl mx-auto">
     <div className="flex-1 space-y-6">
       <h1 className="text-4xl font-bold text-orange-500">
         Attract new clients with online bookings
       </h1>
       <p className="text-xl text-gray-500">
         Join the world's largest beauty and wellness marketplace
       </p>
       <ul className="space-y-4">
         {[
        "Get listed on the Fresha app",
        "Reach thousands of new clients",
        "Enable 24/7 online bookings",
         ].map((item) => (
        <li key={item} className="flex items-center gap-2">
          <Check className="h-5 w-5 text-green-500" /> {item}
        </li>
         ))}
       </ul>
       <div className="flex gap-4">
         <Button className="bg-orange-500 hover:bg-orange-600" size="lg">Start now</Button>
         <Button size="lg" variant="outline">
        Learn more
         </Button>
       </div>
     </div>
     <div className="flex-1">
       <Image
         width={800}
         height={600}
         src=""
         alt="Booking Platform Interface"
         className="w-full"
       />
     </div>
      </div>
      </div>
      );
  if (activeTab === "google")
    return <h1 className="text-2xl font-bold text-orange-500">Reserve with Google</h1>;
  if (activeTab === "social")
    return <h1 className="text-2xl font-bold text-orange-500">Social Media Bookings</h1>;


};
export default VendorBookingTabContent;
