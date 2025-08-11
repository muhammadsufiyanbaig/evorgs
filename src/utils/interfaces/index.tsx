import { links } from "../data";

export type AdminCustomPackage = {
  id: string
  userId: string
  vendorId: string
  orderDetails: string
  guestCount: number
  eventDate: string // ISO date
  price: number
  status: "pending" | "confirmed" | "canceled" | "fulfilled"
  createdAt: string
  updatedAt: string
}

export type AdminCustomPackageFilters = {
  status?: AdminCustomPackage["status"]
  q?: string
  page?: number
  pageSize?: number
}

export type AdminCustomPackageList = {
  packages: AdminCustomPackage[]
  total: number
  page: number
  totalPages: number
}

export type CateringPackage = {
  id: string
  vendorId: string
  packageName: string
  serviceArea: string
  description: string
  imageUrl: string
  price: number
  minGuests: number
  maxGuests: number
  menuItems: string[]
  dietaryOptions: string[]
  amenities: string[]
  isAvailable: boolean
  reviewCount: number
  createdAt: string
  updatedAt: string
}

export type CateringPackageList = {
  packages: CateringPackage[]
  total: number
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

export interface ContactFormData {
  senderName: string;
  senderEmail: string;
  message: string;
}
export interface IconInterface {
  color?: string; // Color for the icon (optional)
  className?: string; // Color for the icon (optional)
  height?: string | number; // Height of the icon (optional)
  width?: string | number; // Width of the icon (optional)
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  sex: string;
  dateOfBirth: string;
  profileImage: File | null;
}
export type Farmhouse = {
  id: string;
  vendorId: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  perNightPrice: number;
  minNights: number;
  maxNights: number;
  maxGuests: number;
  amenities: string[];
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
};

export type SectionName = (typeof links)[number]["name"];
export type CalendarEvent = {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime?: string;
  location?: string;
  color: "blue" | "pink";
};


export type Client = {
  id: string;
  name: string;
  email: string;
  mobileNumber: string | null;
  reviews: number;
  sales: number;
  createdAt: Date;
};

export interface TeamMember {
  id: string;
  name: string;
  image: string;
  email?: string;
  phone?: string;
  reviews?: number;
}

export interface Shift {
  start: string;
  end: string;
  memberId: string;
}

export interface WeeklySchedule {
  startDate: Date;
  endDate: Date;
  shifts: Record<string, Shift[]>;
}

export interface TeamMember {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  image: string;
}

export interface Shift {
  start: string;
  end: string;
}

export interface TeamMemberShift extends TeamMember {
  shifts: Shift[];
}

export interface Report {
  id: string;
  title: string;
  description: string;
  type: "dashboard" | "report";
  category: Category;
  isFavorite: boolean;
  createdBy: string;
  icon: "chart" | "tag";
}

export type Category =
  | "All reports"
  | "Sales"
  | "Finance"
  | "Appointments"
  | "Team"
  | "Clients"
  | "Inventory";


type View = "all" | "favourites" | "dashboards" | "standard"

export interface ReportsState {
  reports: Report[]
  favorites: Set<string>
  activeCategory: Category
  searchQuery: string
  createdByFilter: string | null
  currentView: View
  toggleFavorite: (id: string) => void
  setActiveCategory: (category: Category) => void
  setSearchQuery: (query: string) => void
  setCreatedByFilter: (creator: string | null) => void
  setCurrentView: (view: View) => void
}

// Define types
interface Deal {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface StoreState {
  selectedCategory: "Sponsored" | "Featured";
  sponsoredDeals: Deal[];
  featuredDeals: Deal[];
  setCategory: (category: "Sponsored" | "Featured") => void;
}
export interface DealCardProps {
  deal: {
    id: number;
    title: string;
    description: string;
    image: string;
  };
}

export type ServiceType = "FarmHouse" | "Venue" | "Catering" | "Photography"
export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Canceled"
export type PaymentStatus =
  | "Awaiting Advance"
  | "Advance Paid"
  | "Partially Paid"
  | "Fully Paid"
  | "Refunded"
  | "Canceled"
export type VisitStatus = "Not Requested" | "Requested" | "Scheduled" | "Completed" | null
export type CustomOrderStatus = "Requested" | "Quoted" | "Accepted" | "Rejected"

export interface User {
  id: string
  name: string
  email: string
}

export interface Booking {
  id: string
  bookingReference: string
  userId: string
  userName: string
  userAvatar: string
  serviceType: ServiceType
  serviceName: string
  serviceId: string
  eventDate: string
  numberOfGuests: number
  totalAmount: number
  advanceAmount: number
  balanceAmount: number
  status: BookingStatus
  paymentStatus: PaymentStatus
  visitRequested: boolean
  visitStatus: VisitStatus
  visitScheduledFor: string | null
  specialRequests: string
  createdAt: string
}

export interface Service {
  id: string
  name: string
  category: "Venue" | "Catering" | "Photography" | "FarmHouse"
  location: string
  price: number
  rating: number
  reviewCount: number
  imageUrl: string
}

export interface CateringCustomPackage {
  id: string
  vendorId: string
  userId: string
  orderDetails: string
  guestCount: number
  eventDate: string
  price: number
  status: CustomOrderStatus
  createdAt: string
  updatedAt: string
}

export interface PhotographyCustomOrder {
  id: string
  vendorId: string
  userId: string
  orderDetails: string
  eventDate: string
  eventDuration: number
  price: number
  status: CustomOrderStatus
  createdAt: string
  updatedAt: string
}

export type ViewType = "day" | "week" | "month"

export interface Event {
  id: string
  title: string
  date: Date
  startTime: string
  location: string
  color: "blue" | "pink" | "gray"
  bookingId?: string
}
