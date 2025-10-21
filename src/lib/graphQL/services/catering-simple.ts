// Simplified Catering GraphQL - Matches actual backend schema
import { gql } from '@apollo/client';

// ============== FRAGMENTS ==============

export const CATERING_PACKAGE_FRAGMENT = gql`
  fragment CateringPackageFragment on CateringPackage {
    id
    vendorId
    packageName
    description
    price
    minGuests
    maxGuests
    menuItems
    dietaryOptions
    serviceArea
    amenities
    imageUrl
    rating
    reviewCount
    createdAt
    updatedAt
  }
`;

// ============== QUERIES ==============

// Get all catering packages (uses vendor packages as public listing)
export const GET_ALL_CATERING_PACKAGES = gql`
  ${CATERING_PACKAGE_FRAGMENT}
  query GetAllCateringPackages {
    vendorCateringPackages {
      ...CateringPackageFragment
    }
  }
`;

// Get single catering package by ID
export const GET_CATERING_PACKAGE = gql`
  ${CATERING_PACKAGE_FRAGMENT}
  query GetCateringPackage($id: ID!) {
    cateringPackage(id: $id) {
      ...CateringPackageFragment
    }
  }
`;

// Search catering packages - uses SearchResult type
export const SEARCH_CATERING_PACKAGES = gql`
  query SearchCateringPackages($input: SearchCateringPackagesInput!) {
    searchCateringPackages(input: $input) {
      id
      type
      score
      catering {
        id
        vendorId
        packageName
        description
        price
        minGuests
        maxGuests
        serviceArea
        amenities
        imageUrl
        rating
        reviewCount
      }
    }
  }
`;

// Get vendor's own packages (requires auth)
export const GET_VENDOR_PACKAGES = gql`
  ${CATERING_PACKAGE_FRAGMENT}
  query GetVendorPackages {
    vendorCateringPackages {
      ...CateringPackageFragment
    }
  }
`;

// ============== TYPES ==============

export interface CateringPackage {
  id: string;
  vendorId: string;
  packageName: string;
  description?: string;
  price: number;
  minGuests: number;
  maxGuests: number;
  menuItems?: string[];
  dietaryOptions?: string[];
  serviceArea?: string[];
  amenities?: string[];
  imageUrl?: string[];
  rating?: number;
  reviewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface SearchCateringPackagesInput {
  query: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minGuests?: number;
  maxGuests?: number;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  id: string;
  type: string;
  score: number;
  catering?: CateringPackage;
}
