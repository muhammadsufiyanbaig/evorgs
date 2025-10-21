// Simplified Farmhouse GraphQL - Matches actual backend schema
import { gql } from '@apollo/client';

// ============== FRAGMENTS ==============

export const FARMHOUSE_FRAGMENT = gql`
  fragment FarmhouseFragment on Farmhouse {
    id
    vendorId
    farmHouseName
    description
    location
    perNightPrice
    imageUrl
    amenities
    rating
    reviewCount
    capacity
    createdAt
    updatedAt
  }
`;

// ============== QUERIES ==============

// Get all farmhouses (may return null if database is empty)
export const GET_ALL_FARMHOUSES = gql`
  ${FARMHOUSE_FRAGMENT}
  query GetAllFarmhouses {
    farmhouses {
      ...FarmhouseFragment
    }
  }
`;

// Get single farmhouse by ID
export const GET_FARMHOUSE = gql`
  ${FARMHOUSE_FRAGMENT}
  query GetFarmhouse($id: ID!) {
    farmhouse(id: $id) {
      ...FarmhouseFragment
    }
  }
`;

// Get vendor's own farmhouses (requires auth)
export const GET_VENDOR_FARMHOUSES = gql`
  ${FARMHOUSE_FRAGMENT}
  query GetVendorFarmhouses {
    vendorFarmhouses {
      ...FarmhouseFragment
    }
  }
`;

// ============== TYPES ==============

export interface Farmhouse {
  id: string;
  vendorId: string;
  farmHouseName: string;
  description?: string;
  location: string;
  perNightPrice: number;
  imageUrl?: string[];
  amenities?: string[];
  rating?: number;
  reviewCount?: number;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
}
