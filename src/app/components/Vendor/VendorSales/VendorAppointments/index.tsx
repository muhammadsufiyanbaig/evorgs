import { CalendarIcon, Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function VendorAppointments() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Appointments
          </h2>
          <p className="text-sm text-muted-foreground">
            View, filter and export appointments booked by your clients.
          </p>
        </div>
        <Button>Add new</Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by Reference or Client" className="pl-9" />
        </div>
        <Button variant="outline">
          Month to date <CalendarIcon className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline">
          Filters <SlidersHorizontal className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="flex h-[450px] flex-col items-center justify-center gap-2">
        <div className="relative h-24 w-24">
          <Image
            src="/placeholder.svg?height=96&width=96"
            alt="Empty state illustration"
            fill
            className="object-contain"
          />
        </div>
        <h3 className="text-lg font-semibold">No appointments yet</h3>
        <p className="text-sm text-muted-foreground">Add a new appointment.</p>
        <Button onClick={() => {}} className="mt-4">
          Add new appointment
        </Button>
      </div>
    </div>
  );
}
