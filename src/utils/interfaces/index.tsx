import { links } from "../data";

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

export type SectionName = (typeof links)[number]["name"];
export type Event = {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime?: string;
  location?: string;
  color: "blue" | "pink";
};

export type ViewType = "day" | "week" | "month" | "year";

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