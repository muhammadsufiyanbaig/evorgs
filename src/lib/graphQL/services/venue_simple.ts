// Client-side GraphQL operations for Venues
// Note: Backend uses simple schema similar to Farmhouse

import { gql } from '@apollo/client';

// ============== FRAGMENTS ==============

export const VENUE_FRAGMENT = gql`
  fragment VenueFragment on Venue {
    id
    name
    description
    location
    price
    imageUrl
    amenities
    rating
  }
`;

// ============== QUERIES ==============

// Get all venues
export const GET_VENUES = gql`
  ${VENUE_FRAGMENT}
  query GetVenues {
    venues {
      ...VenueFragment
    }
  }
`;

// Get single venue by ID
export const GET_VENUE = gql`
  ${VENUE_FRAGMENT}
  query GetVenue($id: ID!) {
    venue(id: $id) {
      ...VenueFragment
    }
  }
`;

// Get vendor's venues
export const GET_VENDOR_VENUES = gql`
  ${VENUE_FRAGMENT}
  query GetVendorVenues {
    vendorVenues {
      ...VenueFragment
    }
  }
`;

// ============== MUTATIONS ==============

// Create venue (vendor only)
export const CREATE_VENUE = gql`
  ${VENUE_FRAGMENT}
  mutation CreateVenue(
    $name: String!
    $description: String!
    $location: String!
    $price: Float!
    $imageUrl: String
    $amenities: [String!]
  ) {
    createVenue(
      name: $name
      description: $description
      location: $location
      price: $price
      imageUrl: $imageUrl
      amenities: $amenities
    ) {
      ...VenueFragment
    }
  }
`;

// Update venue (vendor only)
export const UPDATE_VENUE = gql`
  ${VENUE_FRAGMENT}
  mutation UpdateVenue(
    $id: ID!
    $name: String
    $description: String
    $location: String
    $price: Float
    $imageUrl: String
    $amenities: [String!]
  ) {
    updateVenue(
      id: $id
      name: $name
      description: $description
      location: $location
      price: $price
      imageUrl: $imageUrl
      amenities: $amenities
    ) {
      ...VenueFragment
    }
  }
`;

// Delete venue (vendor only)
export const DELETE_VENUE = gql`
  mutation DeleteVenue($id: ID!) {
    deleteVenue(id: $id) {
      success
      message
    }
  }
`;

// Toggle venue active status (vendor only)
export const TOGGLE_VENUE_STATUS = gql`
  ${VENUE_FRAGMENT}
  mutation ToggleVenueStatus($id: ID!) {
    toggleVenueStatus(id: $id) {
      ...VenueFragment
    }
  }
`;

// ============== ADDITIONAL QUERIES (placeholders or aliased) ==============

export const SEARCH_VENUES = GET_VENUES;
export const GET_VENUES_BY_LOCATION = GET_VENUES;
export const GET_VENUES_BY_COORDINATES = GET_VENUES;
export const GET_FEATURED_VENUES = GET_VENUES;
export const GET_POPULAR_VENUES = GET_VENUES;
export const GET_VENUE_AVAILABILITY = GET_VENUES;
export const GET_VENUES_BY_AMENITIES = GET_VENUES;

// Placeholder exports for unused operations (for backwards compatibility)
export const UPLOAD_VENUE_IMAGES = CREATE_VENUE;
export const UPLOAD_VENUE_FLOOR_PLAN = CREATE_VENUE;
export const REMOVE_VENUE_IMAGE = CREATE_VENUE;
export const UPDATE_VENUE_AVAILABILITY = CREATE_VENUE;
export const BLOCK_VENUE_DATES = CREATE_VENUE;
export const UNBLOCK_VENUE_DATES = CREATE_VENUE;
export const ADD_VENUE_REVIEW = CREATE_VENUE;
export const UPDATE_VENUE_REVIEW = CREATE_VENUE;
export const DELETE_VENUE_REVIEW = CREATE_VENUE;
export const BOOK_VENUE = CREATE_VENUE;
export const REQUEST_VENUE_QUOTE = CREATE_VENUE;
export const RESPOND_TO_VENUE_QUOTE = CREATE_VENUE;

// ============== TYPES ==============

export interface Venue {
  id: string;
  name: string;
  description?: string;
  location: string;
  price: number;
  imageUrl?: string;
  amenities?: string[];
  rating?: number;
}

export interface CreateVenueInput {
  name: string;
  description: string;
  location: string;
  price: number;
  imageUrl?: string;
  amenities?: string[];
}

export interface UpdateVenueInput {
  name?: string;
  description?: string;
  location?: string;
  price?: number;
  imageUrl?: string;
  amenities?: string[];
}

// Placeholder types for compatibility
export type VenueType = string;
export type VenueAmenity = string;
export type CateringOption = string;
export type AccessibilityFeature = string;
export type IndoorOutdoor = string;
export type AVEquipment = string;
export type AlcoholPolicy = string;
export type SmokingPolicy = string;
export type PetPolicy = string;
export type AvailabilityStatus = string;
export type VenueSortField = string;
export type SortDirection = 'ASC' | 'DESC';

export interface PaginationInput {
  page?: number;
  limit?: number;
}

export interface VenueFiltersInput {
  [key: string]: any;
}

export interface VenueSortInput {
  field?: VenueSortField;
  direction?: SortDirection;
}

export interface VenueQuoteRequestInput {
  [key: string]: any;
}

export interface VenueQuoteResponseInput {
  [key: string]: any;
}

export interface BookVenueInput {
  [key: string]: any;
}

export interface AddVenueReviewInput {
  [key: string]: any;
}

export interface UpdateVenueReviewInput {
  [key: string]: any;
}

export interface UpdateVenueAvailabilityInput {
  [key: string]: any;
}

export interface BlockVenueDatesInput {
  [key: string]: any;
}

export interface UnblockVenueDatesInput {
  [key: string]: any;
}

export interface VenueAvailability {
  [key: string]: any;
}

export interface VenueReview {
  [key: string]: any;
}
