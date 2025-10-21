// Simplified Photography GraphQL - Matches expected backend schema
import { gql } from '@apollo/client';

// ============== FRAGMENTS ==============

export const PHOTOGRAPHY_FRAGMENT = gql`
  fragment PhotographyFragment on Photography {
    id
    vendorId
    packageName
    description
    price
    duration
    deliveryTime
    photosCount
    videosCount
    equipmentIncluded
    serviceArea
    portfolioUrl
    imageUrl
    rating
    reviewCount
    createdAt
    updatedAt
  }
`;

// ============== QUERIES ==============

// Get all photography packages
export const GET_ALL_PHOTOGRAPHY = gql`
  ${PHOTOGRAPHY_FRAGMENT}
  query GetAllPhotography {
    photographyPackages {
      ...PhotographyFragment
    }
  }
`;

// Get single photography package by ID
export const GET_PHOTOGRAPHY = gql`
  ${PHOTOGRAPHY_FRAGMENT}
  query GetPhotography($id: ID!) {
    photographyPackage(id: $id) {
      ...PhotographyFragment
    }
  }
`;

// Get vendor's own photography packages (requires auth)
export const GET_VENDOR_PHOTOGRAPHY = gql`
  ${PHOTOGRAPHY_FRAGMENT}
  query GetVendorPhotography {
    vendorPhotographyPackages {
      ...PhotographyFragment
    }
  }
`;

// ============== TYPES ==============

export interface Photography {
  id: string;
  vendorId: string;
  packageName: string;
  description?: string;
  price: number;
  duration?: number;
  deliveryTime?: string;
  photosCount?: number;
  videosCount?: number;
  equipmentIncluded?: string[];
  serviceArea?: string[];
  portfolioUrl?: string;
  imageUrl?: string[];
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}
