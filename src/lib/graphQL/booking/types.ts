// TypeScript Types for Booking Service

// Enums
export enum ServiceType {
  FARMHOUSE = 'FarmHouse',
  VENUE = 'Venue',
  CATERING = 'Catering',
  PHOTOGRAPHY = 'Photography',
}

export enum BookingStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

export enum PaymentStatus {
  AWAITING_ADVANCE = 'Awaiting_Advance',
  ADVANCE_PAID = 'Advance_Paid',
  PARTIALLY_PAID = 'Partially_Paid',
  FULLY_PAID = 'Fully_Paid',
  REFUNDED = 'Refunded',
  CANCELED = 'Canceled',
}

export enum VisitStatus {
  NOT_REQUESTED = 'Not_Requested',
  REQUESTED = 'Requested',
  SCHEDULED = 'Scheduled',
  COMPLETED = 'Completed',
}

// Input Types
export interface CreateBookingInput {
  vendorId: string;
  serviceType: ServiceType;
  serviceId: string;
  eventDate?: string;
  eventStartTime?: string;
  eventEndTime?: string;
  numberOfGuests?: number;
  specialRequests?: string;
  visitRequested?: boolean;
}

export interface RequestVisitInput {
  bookingId: string;
  preferredDate: string;
  preferredTime: string;
}

export interface ScheduleVisitInput {
  bookingId: string;
  scheduledDate: string;
  scheduledTime: string;
}

export interface UpdatePaymentInput {
  bookingId: string;
  advanceAmount?: number;
  balanceAmount?: number;
  paymentStatus?: PaymentStatus;
}

export interface CancelBookingInput {
  bookingId: string;
  cancellationReason: string;
}

export interface BookingFiltersInput {
  status?: BookingStatus;
  serviceType?: ServiceType;
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}

// Service Types
export interface Venue {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string[];
  price: string;
  tags: string[];
  amenities: string[];
  minPersonLimit: number;
  maxPersonLimit: number;
  isAvailable: boolean;
  rating?: number;
  reviewCount: number;
}

export interface FarmHouse {
  id: string;
  name: string;
  location: string;
  description: string;
  imageUrl: string[];
  perNightPrice: number;
  minNights: number;
  maxNights?: number;
  maxGuests: number;
  amenities: string[];
  isAvailable: boolean;
  rating?: number;
  reviewCount: number;
}

export interface CateringPackage {
  id: string;
  packageName: string;
  serviceArea: string[];
  description: string;
  imageUrl: string[];
  price: number;
  minGuests: number;
  maxGuests: number;
  menuItems?: string[];
  dietaryOptions?: string[];
  amenities: string[];
  isAvailable: boolean;
  rating?: number;
  reviewCount: number;
}

export interface PhotographyPackage {
  id: string;
  packageName: string;
  serviceArea: string[];
  description: string;
  imageUrl: string[];
  price: number;
  duration: number;
  photographerCount: number;
  deliverables?: string[];
  amenities: string[];
  isAvailable: boolean;
  rating?: number;
  reviewCount: number;
}

export type ServiceDetails = Venue | FarmHouse | CateringPackage | PhotographyPackage;

export interface VendorInfo {
  id: string;
  vendorName: string;
  vendorEmail: string;
  vendorPhone?: string;
  profileImage?: string;
}

// Booking Type
export interface Booking {
  id: string;
  userId: string;
  vendorId: string;
  serviceType: ServiceType;
  serviceId: string;
  eventDate?: string;
  eventStartTime?: string;
  eventEndTime?: string;
  numberOfGuests?: number;
  totalAmount: number;
  advanceAmount?: number;
  balanceAmount?: number;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  visitRequested: boolean;
  visitStatus?: VisitStatus;
  visitScheduledFor?: string;
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
  canceledAt?: string;
  cancellationReason?: string;
  bookingReference?: string;
  isReviewed: boolean;
  service?: ServiceDetails;
  vendor?: VendorInfo;
}
