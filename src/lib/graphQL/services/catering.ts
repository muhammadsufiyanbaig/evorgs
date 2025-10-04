// Client-side GraphQL operations for Catering Packages

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

export const CATERING_PACKAGE_SUMMARY_FRAGMENT = gql`
  fragment CateringPackageSummaryFragment on CateringPackage {
    id
    vendorId
    packageName
    description
    price
    minGuests
    maxGuests
    serviceArea
    rating
    reviewCount
    imageUrl
  }
`;

// ============== QUERIES ==============

// Get all catering packages with filters
export const GET_CATERING_PACKAGES = gql`
  ${CATERING_PACKAGE_SUMMARY_FRAGMENT}
  query GetCateringPackages(
    $filters: CateringPackageFiltersInput
    $pagination: PaginationInput
    $sortBy: CateringPackageSortInput
  ) {
    cateringPackages(
      filters: $filters
      pagination: $pagination
      sortBy: $sortBy
    ) {
      packages {
        ...CateringPackageSummaryFragment
      }
      totalCount
      hasMore
      currentPage
      totalPages
    }
  }
`;

// Get single catering package by ID
export const GET_CATERING_PACKAGE = gql`
  ${CATERING_PACKAGE_FRAGMENT}
  query GetCateringPackage($id: ID!) {
    cateringPackage(id: $id) {
      ...CateringPackageFragment
      reviews {
        id
        userId
        rating
        comment
        createdAt
        user {
          id
          userName
        }
      }
    }
  }
`;

// Get vendor's catering packages (simplified - matches backend schema)
export const GET_VENDOR_CATERING_PACKAGES = gql`
  ${CATERING_PACKAGE_FRAGMENT}
  query GetVendorCateringPackages {
    vendorCateringPackages {
      ...CateringPackageFragment
    }
  }
`;

// Search catering packages
export const SEARCH_CATERING_PACKAGES = gql`
  ${CATERING_PACKAGE_SUMMARY_FRAGMENT}
  query SearchCateringPackages(
    $searchTerm: String!
    $filters: CateringPackageFiltersInput
    $pagination: PaginationInput
  ) {
    searchCateringPackages(
      searchTerm: $searchTerm
      filters: $filters
      pagination: $pagination
    ) {
      packages {
        ...CateringPackageSummaryFragment
      }
      totalCount
      hasMore
      currentPage
      totalPages
    }
  }
`;

// Get catering packages by location
export const GET_CATERING_PACKAGES_BY_LOCATION = gql`
  ${CATERING_PACKAGE_SUMMARY_FRAGMENT}
  query GetCateringPackagesByLocation(
    $location: String!
    $radius: Float
    $filters: CateringPackageFiltersInput
    $pagination: PaginationInput
  ) {
    cateringPackagesByLocation(
      location: $location
      radius: $radius
      filters: $filters
      pagination: $pagination
    ) {
      packages {
        ...CateringPackageSummaryFragment
        distance
      }
      totalCount
      hasMore
      currentPage
      totalPages
    }
  }
`;

// Get featured catering packages
export const GET_FEATURED_CATERING_PACKAGES = gql`
  ${CATERING_PACKAGE_SUMMARY_FRAGMENT}
  query GetFeaturedCateringPackages($limit: Int) {
    featuredCateringPackages(limit: $limit) {
      ...CateringPackageSummaryFragment
    }
  }
`;

// Get popular catering packages
export const GET_POPULAR_CATERING_PACKAGES = gql`
  ${CATERING_PACKAGE_SUMMARY_FRAGMENT}
  query GetPopularCateringPackages($limit: Int) {
    popularCateringPackages(limit: $limit) {
      ...CateringPackageSummaryFragment
    }
  }
`;

// ============== MUTATIONS ==============

// Create catering package (vendor only)
export const CREATE_CATERING_PACKAGE = gql`
  ${CATERING_PACKAGE_FRAGMENT}
  mutation CreateCateringPackage($input: CateringPackageInput!) {
    createCateringPackage(input: $input) {
      ...CateringPackageFragment
    }
  }
`;

// Update catering package (vendor only)
export const UPDATE_CATERING_PACKAGE = gql`
  ${CATERING_PACKAGE_FRAGMENT}
  mutation UpdateCateringPackage($id: ID!, $input: CateringPackageInput!) {
    updateCateringPackage(id: $id, input: $input) {
      ...CateringPackageFragment
    }
  }
`;

// Delete catering package (vendor only)
export const DELETE_CATERING_PACKAGE = gql`
  mutation DeleteCateringPackage($id: ID!) {
    deleteCateringPackage(id: $id) {
      success
      message
    }
  }
`;

// Toggle catering package active status (vendor only)
export const TOGGLE_CATERING_PACKAGE_STATUS = gql`
  ${CATERING_PACKAGE_FRAGMENT}
  mutation ToggleCateringPackageStatus($id: ID!) {
    toggleCateringPackageStatus(id: $id) {
      ...CateringPackageFragment
    }
  }
`;

// Upload catering package images (vendor only)
export const UPLOAD_CATERING_PACKAGE_IMAGES = gql`
  mutation UploadCateringPackageImages($packageId: ID!, $images: [Upload!]!) {
    uploadCateringPackageImages(packageId: $packageId, images: $images) {
      id
      images
    }
  }
`;

// Remove catering package image (vendor only)
export const REMOVE_CATERING_PACKAGE_IMAGE = gql`
  mutation RemoveCateringPackageImage($packageId: ID!, $imageUrl: String!) {
    removeCateringPackageImage(packageId: $packageId, imageUrl: $imageUrl) {
      id
      images
    }
  }
`;

// Add catering package review (user only)
export const ADD_CATERING_PACKAGE_REVIEW = gql`
  mutation AddCateringPackageReview($input: AddReviewInput!) {
    addCateringPackageReview(input: $input) {
      id
      userId
      packageId
      rating
      comment
      createdAt
      user {
        id
        userName
      }
    }
  }
`;

// Update catering package review (user only)
export const UPDATE_CATERING_PACKAGE_REVIEW = gql`
  mutation UpdateCateringPackageReview($id: ID!, $input: UpdateReviewInput!) {
    updateCateringPackageReview(id: $id, input: $input) {
      id
      rating
      comment
      updatedAt
    }
  }
`;

// Delete catering package review (user only)
export const DELETE_CATERING_PACKAGE_REVIEW = gql`
  mutation DeleteCateringPackageReview($id: ID!) {
    deleteCateringPackageReview(id: $id) {
      success
      message
    }
  }
`;

// Book catering package (user only)
export const BOOK_CATERING_PACKAGE = gql`
  mutation BookCateringPackage($input: BookCateringPackageInput!) {
    bookCateringPackage(input: $input) {
      id
      userId
      vendorId
      serviceType
      serviceId
      eventDate
      eventTime
      eventDuration
      guestCount
      specialRequests
      totalAmount
      advanceAmount
      remainingAmount
      paymentStatus
      bookingStatus
      createdAt
    }
  }
`;

// ============== TYPESCRIPT INTERFACES ==============

export interface CateringPackage {
  id: string;
  vendorId: string;
  packageName: string;
  description?: string;
  price: number;
  minGuests: number;
  maxGuests?: number;
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

// This is the actual backend input type (renamed from CreateCateringPackageInput)
export interface CreateCateringPackageInput {
  packageName: string;
  description?: string;
  price: number;
  minGuests: number;
  maxGuests?: number;
  imageUrl: string[]; // REQUIRED - array of image URLs
  menuItems?: string[];
  dietaryOptions?: string[];
  serviceArea?: string[];
  amenities?: string[];
}

export interface UpdateCateringPackageInput {
  packageName?: string;
  description?: string;
  price?: number;
  minGuests?: number;
  maxGuests?: number;
  menuItems?: string[];
  dietaryOptions?: string[];
  serviceArea?: string[];
  amenities?: string[];
}

export interface CateringPackageFiltersInput {
  vendorId?: string;
  cuisineType?: CuisineType[];
  servingStyle?: ServingStyle[];
  dietaryOptions?: DietaryOption[];
  minPrice?: number;
  maxPrice?: number;
  minPersons?: number;
  maxPersons?: number;
  minRating?: number;
  availabilityStatus?: AvailabilityStatus[];
  isActive?: boolean;
  location?: string;
  radius?: number; // in km
}

export interface CateringPackageSortInput {
  field: CateringPackageSortField;
  direction: SortDirection;
}

export interface BookCateringPackageInput {
  packageId: string;
  eventDate: string;
  eventTime: string;
  guestCount: number;
  specialRequests?: string;
  eventDuration?: number;
}

export type ServingStyle = 
  | 'Buffet'
  | 'PlatedService'
  | 'FamilyStyle'
  | 'Cocktail'
  | 'BoxedMeals';

export type CuisineType = 
  | 'Pakistani'
  | 'Indian'
  | 'Chinese'
  | 'Continental'
  | 'Italian'
  | 'Mexican'
  | 'Mediterranean'
  | 'Fusion'
  | 'BBQ'
  | 'Desserts';

export type DietaryOption = 
  | 'Vegetarian'
  | 'Vegan'
  | 'Halal'
  | 'GlutenFree'
  | 'DairyFree'
  | 'NutFree'
  | 'LowCarb'
  | 'Keto';

export type AvailabilityStatus = 
  | 'Available'
  | 'Busy'
  | 'Unavailable';

export type CateringPackageSortField = 
  | 'packageName'
  | 'pricePerPerson'
  | 'rating'
  | 'reviewCount'
  | 'createdAt'
  | 'distance';

export type SortDirection = 'ASC' | 'DESC';

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
