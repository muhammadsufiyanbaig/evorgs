// Centralized GraphQL exports for all services

// Service-specific operation groups for organized imports
export * as AuthGraphQL from './auth';
export * as CateringGraphQL from './catering';
export * as FarmHouseGraphQL from './farmhouse';
export * as PhotographyGraphQL from './photography';
export * as VenueGraphQL from './venues';
export * as SharedTypes from './shared';

// Direct exports for commonly used types
export type { 
  PaginationInput, 
  Vendor, 
  Review, 
  AvailabilityStatus, 
  SortDirection 
} from './shared';
