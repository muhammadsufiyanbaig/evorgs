// Client-side GraphQL operations for Farmhouses
// Note: Backend uses lowercase "Farmhouse" not "FarmHouse"

import { gql } from '@apollo/client';

// ============== FRAGMENTS ==============

export const FARMHOUSE_FRAGMENT = gql`
  fragment FarmhouseFragment on Farmhouse {
    id
    name
    description
    location
    perNightPrice
    imageUrl
    amenities
    rating
  }
`;

// ============== QUERIES ==============

// Get all farmhouses
export const GET_FARMHOUSES = gql`
  ${FARMHOUSE_FRAGMENT}
  query GetFarmhouses {
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

// Get vendor's farmhouses
export const GET_VENDOR_FARMHOUSES = gql`
  ${FARMHOUSE_FRAGMENT}
  query GetVendorFarmhouses {
    vendorFarmhouses {
      ...FarmhouseFragment
    }
  }
`;

// ============== MUTATIONS ==============

// Create farmhouse (vendor only)
export const CREATE_FARMHOUSE = gql`
  ${FARMHOUSE_FRAGMENT}
  mutation CreateFarmhouse($input: CreateFarmhouseInput!) {
    createFarmhouse(input: $input) {
      ...FarmhouseFragment
    }
  }
`;

// Update farmhouse (vendor only)
export const UPDATE_FARMHOUSE = gql`
  ${FARMHOUSE_FRAGMENT}
  mutation UpdateFarmhouse($id: ID!, $input: UpdateFarmhouseInput!) {
    updateFarmhouse(id: $id, input: $input) {
      ...FarmhouseFragment
    }
  }
`;

// Delete farmhouse (vendor only)
export const DELETE_FARMHOUSE = gql`
  mutation DeleteFarmhouse($id: ID!) {
    deleteFarmhouse(id: $id) {
      success
      message
    }
  }
`;

// Toggle farmhouse active status (vendor only)
export const TOGGLE_FARMHOUSE_STATUS = gql`
  ${FARMHOUSE_FRAGMENT}
  mutation ToggleFarmhouseStatus($id: ID!) {
    toggleFarmhouseStatus(id: $id) {
      ...FarmhouseFragment
    }
  }
`;

// ============== PLACEHOLDER QUERIES (to be implemented) ==============

export const SEARCH_FARMHOUSES = GET_FARMHOUSES;
export const GET_FARMHOUSES_BY_LOCATION = GET_FARMHOUSES;
export const GET_FARMHOUSES_BY_COORDINATES = GET_FARMHOUSES;
export const GET_FEATURED_FARMHOUSES = GET_FARMHOUSES;
export const GET_POPULAR_FARMHOUSES = GET_FARMHOUSES;
export const GET_FARMHOUSE_AVAILABILITY = gql`
  query GetFarmhouseAvailability($farmhouseId: ID!, $startDate: String!, $endDate: String!) {
    farmhouseAvailability(farmhouseId: $farmhouseId, startDate: $startDate, endDate: $endDate) {
      date
      isAvailable
    }
  }
`;
export const GET_FARMHOUSES_BY_AMENITIES = GET_FARMHOUSES;
export const GET_FARMHOUSES_BY_ACTIVITIES = GET_FARMHOUSES;

export const UPLOAD_FARMHOUSE_IMAGES = gql`
  mutation UploadFarmhouseImages($farmhouseId: ID!, $images: [Upload!]!) {
    uploadFarmhouseImages(farmhouseId: $farmhouseId, images: $images) {
      id
      imageUrl
    }
  }
`;

export const UPLOAD_FARMHOUSE_VIRTUAL_TOUR = UPLOAD_FARMHOUSE_IMAGES;
export const UPLOAD_FARMHOUSE_FLOOR_PLAN = UPLOAD_FARMHOUSE_IMAGES;
export const REMOVE_FARMHOUSE_IMAGE = DELETE_FARMHOUSE;
export const UPDATE_FARMHOUSE_AVAILABILITY = UPDATE_FARMHOUSE;
export const SET_FARMHOUSE_PRICING = UPDATE_FARMHOUSE;
export const BLOCK_FARMHOUSE_DATES = UPDATE_FARMHOUSE;
export const UNBLOCK_FARMHOUSE_DATES = UPDATE_FARMHOUSE;

export const ADD_FARMHOUSE_REVIEW = gql`
  mutation AddFarmhouseReview($input: AddFarmhouseReviewInput!) {
    addFarmhouseReview(input: $input) {
      id
      rating
      comment
    }
  }
`;

export const UPDATE_FARMHOUSE_REVIEW = gql`
  mutation UpdateFarmhouseReview($id: ID!, $input: UpdateFarmhouseReviewInput!) {
    updateFarmhouseReview(id: $id, input: $input) {
      id
      rating
      comment
    }
  }
`;

export const DELETE_FARMHOUSE_REVIEW = DELETE_FARMHOUSE;
export const BOOK_FARMHOUSE = gql`
  mutation BookFarmhouse($input: BookFarmhouseInput!) {
    bookFarmhouse(input: $input) {
      id
      totalAmount
      bookingStatus
    }
  }
`;

export const REQUEST_FARMHOUSE_QUOTE = gql`
  mutation RequestFarmhouseQuote($input: FarmhouseQuoteRequestInput!) {
    requestFarmhouseQuote(input: $input) {
      id
      status
    }
  }
`;

export const RESPOND_TO_FARMHOUSE_QUOTE = gql`
  mutation RespondToFarmhouseQuote($id: ID!, $response: FarmhouseQuoteResponseInput!) {
    respondToFarmhouseQuote(id: $id, response: $response) {
      id
      status
    }
  }
`;

// ============== TYPESCRIPT INTERFACES ==============

export interface FarmHouse {
  id: string;
  name: string;
  description?: string;
  location: string;
  perNightPrice: number;
  imageUrl?: string;
  amenities?: string[];
  rating?: number;
}

export interface CreateFarmHouseInput {
  name: string;
  description?: string;
  location: string;
  perNightPrice: number;
  imageUrl?: string;
  amenities?: string[];
}

export interface UpdateFarmHouseInput {
  name?: string;
  description?: string;
  location?: string;
  perNightPrice?: number;
  imageUrl?: string;
  amenities?: string[];
}

export interface FarmHouseFiltersInput {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
}

export interface FarmHouseSortInput {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface BookFarmHouseInput {
  farmhouseId: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
}

export interface FarmHouseQuoteRequestInput {
  farmhouseId: string;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
}

export interface FarmHouseQuoteResponseInput {
  quotedPrice: number;
  message: string;
}

export interface UpdateFarmHouseAvailabilityInput {
  farmhouseId: string;
  startDate: string;
  endDate: string;
}

export interface FarmHousePricingInput {
  perNightPrice: number;
}

export interface BlockFarmHouseDatesInput {
  farmhouseId: string;
  startDate: string;
  endDate: string;
}

export interface UnblockFarmHouseDatesInput {
  farmhouseId: string;
  startDate: string;
  endDate: string;
}

export interface AddFarmHouseReviewInput {
  farmhouseId: string;
  rating: number;
  comment?: string;
}

export interface UpdateFarmHouseReviewInput {
  rating?: number;
  comment?: string;
}

export interface PaginationInput {
  page?: number;
  limit?: number;
}

export type FarmHouseAmenity = string;
export type Activity = string;
export type PetPolicy = string;
export type SmokingPolicy = string;
export type FarmHouseType = string;
