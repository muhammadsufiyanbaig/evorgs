// Shared GraphQL types and interfaces used across multiple services

export interface PaginationInput {
  page?: number;
  limit?: number;
}

export interface Vendor {
  id: string;
  vendorName: string;
  vendorEmail: string;
  vendorPhone?: string;
  vendorAddress?: string;
  vendorType: string;
  vendorStatus: string;
  rating?: number;
  reviewCount?: number;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: {
    id: string;
    userName: string;
  };
}

export interface AddReviewInput {
  packageId: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewInput {
  rating?: number;
  comment?: string;
}

export type AvailabilityStatus = 
  | 'Available'
  | 'Busy'
  | 'Unavailable';

export type SortDirection = 'ASC' | 'DESC';

export type AccessibilityFeature = 
  | 'WheelchairAccessible'
  | 'RampAccess'
  | 'WideDoorbells'
  | 'AccessibleBathroom'
  | 'GrabBars'
  | 'LoweredCounters'
  | 'AccessibleParking'
  | 'ElevatorAccess'
  | 'BrailleSignage'
  | 'HearingLoop'
  | 'ServiceAnimalsWelcome'
  | 'AccessibleSwimmingPool'
  | 'RollInShower'
  | 'AccessibleBedroom'
  | 'Elevator'
  | 'HandicapParking'
  | 'AccessibleRestrooms'
  | 'Braille'
  | 'ServiceAnimalsAllowed';

export type PetPolicy = 
  | 'PetsWelcome'
  | 'DogsOnly'
  | 'CatsOnly'
  | 'SmallPetsOnly'
  | 'ServiceAnimalsOnly'
  | 'PetFeeRequired'
  | 'PetDepositRequired'
  | 'PetsOnLeash'
  | 'IndoorPetsOnly'
  | 'OutdoorPetsOnly'
  | 'NoPets'
  | 'Allowed'
  | 'CaseByCase'
  | 'NotAllowed';

export type SmokingPolicy = 
  | 'SmokingAllowed'
  | 'OutdoorSmokingOnly'
  | 'DesignatedSmokingAreas'
  | 'NoSmoking'
  | 'Allowed'
  | 'DesignatedAreas'
  | 'OutdoorOnly'
  | 'NotAllowed';

// Booking-related interfaces
export interface BookingBase {
  id: string;
  userId: string;
  vendorId: string;
  serviceType: string;
  serviceId: string;
  eventDate: string;
  eventTime?: string;
  eventDuration?: number;
  guestCount: number;
  specialRequests?: string;
  totalAmount: number;
  advanceAmount: number;
  remainingAmount: number;
  paymentStatus: string;
  bookingStatus: string;
  createdAt: string;
}

// Quote-related interfaces
export interface QuoteBase {
  id: string;
  userId: string;
  vendorId?: string;
  status: string;
  createdAt: string;
}

export interface QuoteResponseBase {
  id: string;
  vendorResponse: string;
  quotedPrice: number;
  status: string;
  respondedAt: string;
}
