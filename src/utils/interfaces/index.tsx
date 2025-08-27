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


// ==================== ENUM TYPES ====================

export enum AdType {
  Featured = "Featured",
  Sponsored = "Sponsored",
  Premium = "Premium",
}

export enum ScheduleStatus {
  SCHEDULED = "Scheduled",
  RUNNING = "Running",
  COMPLETED = "Completed",
  FAILED = "Failed",
  CANCELLED = "Cancelled",
  PAUSED = "Paused",
}

export enum EntityType {
  Farmhouse = "Farmhouse",
  Venue = "Venue",
  PhotographyPackage = "PhotographyPackage",
  CateringPackage = "CateringPackage",
}

export enum RequestStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  Under_Review = "Under_Review",
}

export enum ServiceAdStatus {
  Scheduled = "Scheduled",
  Active = "Active",
  Paused = "Paused",
  Expired = "Expired",
  Cancelled = "Cancelled",
}

export enum AdsPaymentStatus {
  Pending = "Pending",
  Paid = "Paid",
  Failed = "Failed",
  Refunded = "Refunded",
}

// ==================== CORE ENTITY TYPES ====================

export interface AdRequest {
  id: string
  vendorId: string
  adType: AdType
  entityType: EntityType
  entityId: string
  adTitle: string
  adDescription?: string
  adImage?: string
  requestedPrice: number
  requestedStartDate: string
  requestedEndDate: string
  requestedDuration: number
  targetAudience?: string[]
  vendorNotes?: string
  status: RequestStatus
  adminNotes?: string
  reviewedBy?: string
  reviewedAt?: string
  createdAt: string
  updatedAt: string
}

export interface ServiceAd {
  id: string
  requestId: string
  vendorId: string
  adType: AdType
  entityType: EntityType
  entityId: string
  adTitle: string
  adDescription?: string
  adImage?: string
  finalPrice: number
  status: ServiceAdStatus
  adminStartDate: string
  adminEndDate: string
  impressions: number
  clicks: number
  conversions: number
  ctr: number
  createdAt: string
  updatedAt: string
}

export interface DashboardStats {
  totalAdRequests: number
  pendingRequests: number
  activeAds: number
  totalRevenue: number
  totalImpressions: number
  totalClicks: number
  averageCTR: number
}

export interface DailyRevenue {
  date: string
  revenue: number
  adCount: number
}

export interface RevenueAnalytics {
  totalRevenue: number
  dailyRevenue: DailyRevenue[]
  averageDailyRevenue: number
  revenueGrowth: number
}


// TypeScript types for Notification System Client-Side GraphQL Operations

export enum NotificationType {
  General = "General",
  All_Vendors = "All_Vendors",
  Vendor_Personal = "Vendor_Personal",
  All_Users = "All_Users",
  User_Personal = "User_Personal",
}

export enum NotificationCategory {
  Booking = "Booking",
  Payment = "Payment",
  System = "System",
  Chat = "Chat",
  Promotion = "Promotion",
  General = "General",
}

export enum NotificationPriority {
  low = "low",
  medium = "medium",
  high = "high",
  urgent = "urgent",
}

export enum RelatedType {
  Booking = "Booking",
  Payment = "Payment",
  Chat = "Chat",
  Review = "Review",
  User = "User",
  Vendor = "Vendor",
}

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

// ==================== CORE TYPES ====================

export interface Notification {
  id: string
  notificationType: NotificationType
  targetUserId?: string
  targetVendorId?: string
  title: string
  message: string
  category: NotificationCategory
  data?: any
  linkTo?: string
  relatedId?: string
  relatedType?: RelatedType
  priority: NotificationPriority
  isActive: boolean
  scheduledAt?: string
  sentAt?: string
  totalRecipients: number
  successfulSends: number
  failedSends: number
  createdBy?: string
  createdAt: string
  updatedAt: string
  isRead?: boolean
  readAt?: string
  targetUser?: User
  targetVendor?: Vendor
  creator?: Admin
}

export interface NotificationReadStatus {
  id: string
  notificationId: string
  userId?: string
  vendorId?: string
  adminId?: string
  readAt: string
  notification?: Notification
  user?: User
  vendor?: Vendor
  admin?: Admin
}

export interface NotificationStats {
  totalNotifications: number
  totalSentToday: number
  totalReadToday: number
  totalUnread: number
  byCategory: CategoryStats[]
  byType: TypeStats[]
}

export interface CategoryStats {
  category: NotificationCategory
  count: number
}

export interface TypeStats {
  type: NotificationType
  count: number
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  profileImage?: string
}

export interface Vendor {
  id: string
  businessName: string
  email: string
  logo?: string
}

export interface Admin {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface FCMResponse {
  success: boolean
  message: string
  failedTokens: string[]
  successCount: number
  failureCount: number
}

export interface NotificationResponse {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  notifications: Notification[]
}

export interface NotificationFilter {
  category?: NotificationCategory
  priority?: NotificationPriority
  isRead?: boolean
  dateFrom?: string
  dateTo?: string
  search?: string
}

export interface NotificationPaginationInput {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}

export interface CreateNotificationInput {
  notificationType: NotificationType
  targetUserId?: string
  targetVendorId?: string
  title: string
  message: string
  category: NotificationCategory
  data?: any
  linkTo?: string
  relatedId?: string
  relatedType?: RelatedType
  priority?: NotificationPriority
  scheduledAt?: string
}

export interface UpdateNotificationInput {
  id: string
  title?: string
  message?: string
  category?: NotificationCategory
  data?: any
  linkTo?: string
  priority?: NotificationPriority
  isActive?: boolean
  scheduledAt?: string
}
