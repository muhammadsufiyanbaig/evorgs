// Client-side GraphQL Queries for Booking Service

import { gql } from '@apollo/client';

// Fragment for Booking fields
export const BOOKING_FIELDS = gql`
  fragment BookingFields on Booking {
    id
    userId
    vendorId
    serviceType
    serviceId
    eventDate
    eventStartTime
    eventEndTime
    numberOfGuests
    totalAmount
    advanceAmount
    balanceAmount
    status
    paymentStatus
    visitRequested
    visitStatus
    visitScheduledFor
    specialRequests
    createdAt
    updatedAt
    canceledAt
    cancellationReason
    bookingReference
    isReviewed
  }
`;

// Fragment for Vendor Info
export const VENDOR_INFO_FIELDS = gql`
  fragment VendorInfoFields on VendorInfo {
    id
    vendorName
    vendorEmail
    vendorPhone
    profileImage
  }
`;

// Fragment for Venue Service Details
export const VENUE_FIELDS = gql`
  fragment VenueFields on Venue {
    id
    name
    location
    description
    imageUrl
    price
    tags
    amenities
    minPersonLimit
    maxPersonLimit
    isAvailable
    rating
    reviewCount
  }
`;

// Fragment for FarmHouse Service Details
export const FARMHOUSE_FIELDS = gql`
  fragment FarmHouseFields on FarmHouse {
    id
    name
    location
    description
    imageUrl
    perNightPrice
    minNights
    maxNights
    maxGuests
    amenities
    isAvailable
    rating
    reviewCount
  }
`;

// Fragment for Catering Package Details
export const CATERING_PACKAGE_FIELDS = gql`
  fragment CateringPackageFields on CateringPackage {
    id
    packageName
    serviceArea
    description
    imageUrl
    price
    minGuests
    maxGuests
    menuItems
    dietaryOptions
    amenities
    isAvailable
    rating
    reviewCount
  }
`;

// Fragment for Photography Package Details
export const PHOTOGRAPHY_PACKAGE_FIELDS = gql`
  fragment PhotographyPackageFields on PhotographyPackage {
    id
    packageName
    serviceArea
    description
    imageUrl
    price
    duration
    photographerCount
    deliverables
    amenities
    isAvailable
    rating
    reviewCount
  }
`;

// Complete Booking with Service Details
export const BOOKING_WITH_DETAILS = gql`
  ${BOOKING_FIELDS}
  ${VENDOR_INFO_FIELDS}
  ${VENUE_FIELDS}
  ${FARMHOUSE_FIELDS}
  ${CATERING_PACKAGE_FIELDS}
  ${PHOTOGRAPHY_PACKAGE_FIELDS}
  
  fragment BookingWithDetails on Booking {
    ...BookingFields
    vendor {
      ...VendorInfoFields
    }
    service {
      ... on Venue {
        ...VenueFields
      }
      ... on FarmHouse {
        ...FarmHouseFields
      }
      ... on CateringPackage {
        ...CateringPackageFields
      }
      ... on PhotographyPackage {
        ...PhotographyPackageFields
      }
    }
  }
`;

// ============================================
// QUERIES
// ============================================

/**
 * Get a single booking by ID
 * @auth Required - User/Vendor/Admin (owner of booking)
 * @role 👤 USER | 🏪 VENDOR | 👔 ADMIN
 */
export const GET_BOOKING = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetBooking($id: ID!) {
    booking(id: $id) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Get bookings with filters (context dependent)
 * @auth Required - User/Vendor/Admin
 * @role 👤 USER | 🏪 VENDOR | 👔 ADMIN
 * @note Returns bookings based on authenticated user role
 */
export const GET_BOOKINGS = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetBookings($filters: BookingFiltersInput) {
    bookings(filters: $filters) {
      ...BookingWithDetails
    }
  }
`;

// ============================================
// 👤 USER QUERIES
// ============================================

/**
 * Get user's own bookings
 * @auth Required - User only
 * @role 👤 USER
 */
export const GET_MY_BOOKINGS = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetMyBookings($filters: BookingFiltersInput) {
    myBookings(filters: $filters) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Get pending bookings for user
 * @auth Required - User only
 * @role 👤 USER
 */
export const GET_PENDING_BOOKINGS = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetPendingBookings {
    myBookings(filters: { status: Pending, limit: 20 }) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Get confirmed bookings for user
 * @auth Required - User only
 * @role 👤 USER
 */
export const GET_CONFIRMED_BOOKINGS = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetConfirmedBookings {
    myBookings(filters: { status: Confirmed, limit: 20 }) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Get bookings within date range (user)
 * @auth Required - User only
 * @role 👤 USER
 */
export const GET_BOOKINGS_BY_DATE_RANGE = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetBookingsByDateRange($from: String!, $to: String!, $limit: Int) {
    myBookings(filters: { from: $from, to: $to, limit: $limit }) {
      ...BookingWithDetails
    }
  }
`;

// ============================================
// 🏪 VENDOR QUERIES
// ============================================

/**
 * Get vendor's bookings
 * @auth Required - Vendor only
 * @role 🏪 VENDOR
 */
export const GET_VENDOR_BOOKINGS = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetVendorBookings($filters: BookingFiltersInput) {
    vendorBookings(filters: $filters) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Get vendor bookings by service type
 * @auth Required - Vendor only
 * @role 🏪 VENDOR
 */
export const GET_VENDOR_BOOKINGS_BY_SERVICE = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetVendorBookingsByService($serviceType: ServiceType!, $limit: Int) {
    vendorBookings(filters: { serviceType: $serviceType, limit: $limit }) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Get vendor visiting requests (awaiting vendor response)
 * @auth Required - Vendor only
 * @role 🏪 VENDOR
 */
export const GET_VENDOR_VISITING_REQUESTS = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetVendorVisitingRequests($filters: BookingFiltersInput) {
    vendorVisitingRequests(filters: $filters) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Get vendor scheduled visits
 * @auth Required - Vendor only
 * @role 🏪 VENDOR
 */
export const GET_VENDOR_SCHEDULED_VISITS = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetVendorScheduledVisits($filters: BookingFiltersInput) {
    vendorScheduledVisits(filters: $filters) {
      ...BookingWithDetails
    }
  }
`;

// ============================================
// 👔 ADMIN QUERIES
// ============================================

/**
 * Get all bookings (admin)
 * @auth Required - Admin only
 * @role 👔 ADMIN
 */
export const GET_ALL_BOOKINGS = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetAllBookings($filters: BookingFiltersInput) {
    allBookings(filters: $filters) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Get all visiting requests (admin)
 * @auth Required - Admin only
 * @role 👔 ADMIN
 */
export const GET_ALL_VISITING_REQUESTS = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetAllVisitingRequests($filters: BookingFiltersInput) {
    allVisitingRequests(filters: $filters) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Get all scheduled visits (admin)
 * @auth Required - Admin only
 * @role 👔 ADMIN
 */
export const GET_ALL_SCHEDULED_VISITS = gql`
  ${BOOKING_WITH_DETAILS}
  
  query GetAllScheduledVisits($filters: BookingFiltersInput) {
    allScheduledVisits(filters: $filters) {
      ...BookingWithDetails
    }
  }
`;
