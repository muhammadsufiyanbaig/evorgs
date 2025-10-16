// Simplified Venue GraphQL - Matches actual backend schema
import { gql } from '@apollo/client';

// ============== FRAGMENTS ==============

export const VENUE_FRAGMENT = gql`
  fragment VenueFragment on Venue {
    id
    vendorId
    venueName
    description
    location
    price
    imageUrl
    amenities
    rating
    reviewCount
    capacity
    venueType
    createdAt
    updatedAt
  }
`;

// ============== QUERIES ==============

// Get all venues (may return null if database is empty)
export const GET_ALL_VENUES = gql`
  ${VENUE_FRAGMENT}
  query GetAllVenues {
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

// Get vendor's own venues (requires auth)
export const GET_VENDOR_VENUES = gql`
  ${VENUE_FRAGMENT}
  query GetVendorVenues {
    vendorVenues {
      ...VenueFragment
    }
  }
`;

// ============== TYPES ==============

export interface Venue {
  id: string;
  vendorId: string;
  venueName: string;
  description?: string;
  location: string;
  price: number;
  imageUrl?: string[];
  amenities?: string[];
  rating?: number;
  reviewCount?: number;
  capacity?: number;
  venueType?: string;
  createdAt: string;
  updatedAt: string;
}
