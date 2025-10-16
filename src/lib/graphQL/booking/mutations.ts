// Client-side GraphQL Mutations for Booking Service

import { gql } from '@apollo/client';
import { BOOKING_WITH_DETAILS } from './queries';

// ============================================
// MUTATIONS
// ============================================

// ============================================
// 👤 USER MUTATIONS - BOOKING CREATION
// ============================================

/**
 * Create a new booking (generic - any service type)
 * @auth Required - User only
 * @role 👤 USER
 */
export const CREATE_BOOKING = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation CreateBooking($input: CreateBookingInput!) {
    createBooking(input: $input) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Create booking for venue
 * @auth Required - User only
 * @role 👤 USER
 */
export const CREATE_VENUE_BOOKING = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation CreateVenueBooking(
    $vendorId: ID!
    $serviceId: ID!
    $eventDate: String!
    $eventStartTime: String!
    $eventEndTime: String!
    $numberOfGuests: Int!
    $specialRequests: String
    $visitRequested: Boolean
  ) {
    createBooking(
      input: {
        vendorId: $vendorId
        serviceType: Venue
        serviceId: $serviceId
        eventDate: $eventDate
        eventStartTime: $eventStartTime
        eventEndTime: $eventEndTime
        numberOfGuests: $numberOfGuests
        specialRequests: $specialRequests
        visitRequested: $visitRequested
      }
    ) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Create booking for farmhouse
 * @auth Required - User only
 * @role 👤 USER
 */
export const CREATE_FARMHOUSE_BOOKING = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation CreateFarmhouseBooking(
    $vendorId: ID!
    $serviceId: ID!
    $eventDate: String!
    $eventStartTime: String
    $eventEndTime: String
    $numberOfGuests: Int
    $specialRequests: String
    $visitRequested: Boolean
  ) {
    createBooking(
      input: {
        vendorId: $vendorId
        serviceType: FarmHouse
        serviceId: $serviceId
        eventDate: $eventDate
        eventStartTime: $eventStartTime
        eventEndTime: $eventEndTime
        numberOfGuests: $numberOfGuests
        specialRequests: $specialRequests
        visitRequested: $visitRequested
      }
    ) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Create booking for catering
 * @auth Required - User only
 * @role 👤 USER
 */
export const CREATE_CATERING_BOOKING = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation CreateCateringBooking(
    $vendorId: ID!
    $serviceId: ID!
    $eventDate: String!
    $eventStartTime: String!
    $eventEndTime: String!
    $numberOfGuests: Int!
    $specialRequests: String
  ) {
    createBooking(
      input: {
        vendorId: $vendorId
        serviceType: Catering
        serviceId: $serviceId
        eventDate: $eventDate
        eventStartTime: $eventStartTime
        eventEndTime: $eventEndTime
        numberOfGuests: $numberOfGuests
        specialRequests: $specialRequests
        visitRequested: false
      }
    ) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Create booking for photography
 * @auth Required - User only
 * @role 👤 USER
 */
export const CREATE_PHOTOGRAPHY_BOOKING = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation CreatePhotographyBooking(
    $vendorId: ID!
    $serviceId: ID!
    $eventDate: String!
    $eventStartTime: String!
    $eventEndTime: String!
    $specialRequests: String
  ) {
    createBooking(
      input: {
        vendorId: $vendorId
        serviceType: Photography
        serviceId: $serviceId
        eventDate: $eventDate
        eventStartTime: $eventStartTime
        eventEndTime: $eventEndTime
        specialRequests: $specialRequests
        visitRequested: false
      }
    ) {
      ...BookingWithDetails
    }
  }
`;

// ============================================
// 👤 USER MUTATIONS - VISIT MANAGEMENT
// ============================================

/**
 * Request a visit for venue or farmhouse
 * @auth Required - User only
 * @role 👤 USER
 * @note Only applicable for Venue and FarmHouse bookings
 */
export const REQUEST_VISIT = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation RequestVisit($input: RequestVisitInput!) {
    requestVisit(input: $input) {
      ...BookingWithDetails
    }
  }
`;

// ============================================
// 👤 USER MUTATIONS - PAYMENT MANAGEMENT
// ============================================

/**
 * Update payment details
 * @auth Required - User/Vendor/Admin
 * @role 👤 USER | 🏪 VENDOR | 👔 ADMIN
 */
export const UPDATE_PAYMENT = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation UpdatePayment($input: UpdatePaymentInput!) {
    updatePayment(input: $input) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Mark advance payment as paid (30% typically)
 * @auth Required - User only
 * @role 👤 USER
 */
export const PAY_ADVANCE = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation PayAdvance($bookingId: ID!, $advanceAmount: Float!) {
    updatePayment(
      input: {
        bookingId: $bookingId
        advanceAmount: $advanceAmount
        paymentStatus: Advance_Paid
      }
    ) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Mark full payment as completed (100%)
 * @auth Required - User only
 * @role 👤 USER
 */
export const PAY_FULL = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation PayFull($bookingId: ID!) {
    updatePayment(
      input: {
        bookingId: $bookingId
        paymentStatus: Fully_Paid
      }
    ) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Pay remaining balance
 * @auth Required - User only
 * @role 👤 USER
 */
export const PAY_BALANCE = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation PayBalance($bookingId: ID!, $balanceAmount: Float!) {
    updatePayment(
      input: {
        bookingId: $bookingId
        balanceAmount: $balanceAmount
        paymentStatus: Fully_Paid
      }
    ) {
      ...BookingWithDetails
    }
  }
`;

// ============================================
// 👤 USER MUTATIONS - CANCELLATION
// ============================================

/**
 * Cancel a booking with reason
 * @auth Required - User/Vendor/Admin
 * @role 👤 USER | 🏪 VENDOR | 👔 ADMIN
 */
export const CANCEL_BOOKING = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation CancelBooking($input: CancelBookingInput!) {
    cancelBooking(input: $input) {
      ...BookingWithDetails
    }
  }
`;

// ============================================
// 🏪 VENDOR MUTATIONS - VISIT MANAGEMENT
// ============================================

/**
 * Schedule a visit for a booking with visit request
 * @auth Required - Vendor/Admin only
 * @role 🏪 VENDOR | 👔 ADMIN
 */
export const SCHEDULE_VISIT = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation ScheduleVisit($input: ScheduleVisitInput!) {
    scheduleVisit(input: $input) {
      ...BookingWithDetails
    }
  }
`;

/**
 * Mark a visit as completed
 * @auth Required - Vendor/Admin only
 * @role 🏪 VENDOR | 👔 ADMIN
 */
export const COMPLETE_VISIT = gql`
  ${BOOKING_WITH_DETAILS}
  
  mutation CompleteVisit($bookingId: ID!) {
    completeVisit(bookingId: $bookingId) {
      ...BookingWithDetails
    }
  }
`;
