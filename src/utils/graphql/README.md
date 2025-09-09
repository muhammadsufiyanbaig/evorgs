# GraphQL Services Integration

This directory contains organized GraphQL operations for all services in the Evorgs platform.

## File Structure

```
src/utils/graphql/
├── index.ts          # Central export file
├── shared.ts         # Shared types and interfaces
├── auth.ts           # Authentication operations
├── catering.ts       # Catering package operations
├── farmhouse.ts      # Farm house operations
├── photography.ts    # Photography package operations
└── venues.ts         # Venue operations
```

## Usage Examples

### Import Patterns

```typescript
// Import specific service operations
import { CateringGraphQL, VenueGraphQL } from '@/utils/graphql';

// Import specific queries/mutations
import { GET_CATERING_PACKAGES } from '@/utils/graphql/catering';
import { GET_VENUES } from '@/utils/graphql/venues';

// Import shared types
import { PaginationInput, AvailabilityStatus } from '@/utils/graphql';
```

### Service Operations

#### Catering Services
```typescript
import { CateringGraphQL } from '@/utils/graphql';

// Get catering packages with filters
const { data } = await apolloClient.query({
  query: CateringGraphQL.GET_CATERING_PACKAGES,
  variables: {
    filters: {
      cuisineType: ['Pakistani', 'Italian'],
      minPrice: 50,
      maxPrice: 200
    },
    pagination: { page: 1, limit: 10 }
  }
});

// Create new catering package (vendor only)
const { data } = await apolloClient.mutate({
  mutation: CateringGraphQL.CREATE_CATERING_PACKAGE,
  variables: {
    input: {
      packageName: "Deluxe Wedding Package",
      pricePerPerson: 150,
      minPersons: 50,
      servingStyle: "Buffet",
      cuisineType: "Pakistani"
    }
  }
});
```

#### Farm House Services
```typescript
import { FarmHouseGraphQL } from '@/utils/graphql';

// Search farm houses by location
const { data } = await apolloClient.query({
  query: FarmHouseGraphQL.GET_FARMHOUSES_BY_LOCATION,
  variables: {
    location: "Islamabad",
    radius: 50,
    filters: {
      farmHouseType: ['ModernFarmHouse'],
      minCapacity: 20,
      amenities: ['Pool', 'BBQ']
    }
  }
});

// Book a farm house
const { data } = await apolloClient.mutate({
  mutation: FarmHouseGraphQL.BOOK_FARMHOUSE,
  variables: {
    input: {
      farmHouseId: "farmhouse-123",
      checkInDate: "2024-12-01",
      checkOutDate: "2024-12-03",
      guestCount: 15
    }
  }
});
```

#### Photography Services
```typescript
import { PhotographyGraphQL } from '@/utils/graphql';

// Get photographer's portfolio
const { data } = await apolloClient.query({
  query: PhotographyGraphQL.GET_PHOTOGRAPHER_PORTFOLIO,
  variables: {
    vendorId: "vendor-123"
  }
});

// Request custom photography quote
const { data } = await apolloClient.mutate({
  mutation: PhotographyGraphQL.REQUEST_PHOTOGRAPHY_QUOTE,
  variables: {
    input: {
      vendorId: "vendor-123",
      eventType: "Wedding",
      eventDate: "2024-12-15",
      eventLocation: "Karachi",
      duration: 8,
      requirements: "Traditional + candid shots"
    }
  }
});
```

#### Venue Services
```typescript
import { VenueGraphQL } from '@/utils/graphql';

// Get venues by amenities
const { data } = await apolloClient.query({
  query: VenueGraphQL.GET_VENUES_BY_AMENITIES,
  variables: {
    amenities: ['WiFi', 'Parking', 'AirConditioning'],
    filters: {
      city: ['Lahore'],
      minCapacity: 100,
      venueType: ['BanquetHall']
    }
  }
});

// Check venue availability
const { data } = await apolloClient.query({
  query: VenueGraphQL.GET_VENUE_AVAILABILITY,
  variables: {
    venueId: "venue-123",
    startDate: "2024-12-01",
    endDate: "2024-12-31"
  }
});
```

### Authentication Integration

All services integrate with your existing authentication system:

```typescript
import { AuthGraphQL } from '@/utils/graphql';

// User authentication is handled automatically via Apollo Client headers
// Vendor-specific operations require vendor authentication
// Admin operations require admin authentication
```

## Service-Specific Features

### Catering Packages
- **CRUD Operations**: Create, read, update, delete packages
- **Advanced Filtering**: By cuisine, dietary options, price, location
- **Reviews & Ratings**: User feedback system
- **Image Management**: Upload/remove package images
- **Booking System**: Event-based booking with guest count

### Farm Houses
- **Property Management**: Detailed property information with amenities
- **Availability Calendar**: Date-based availability system
- **Location Services**: GPS coordinates and distance calculations
- **Activity Filters**: Indoor/outdoor activities filtering
- **Quote System**: Custom pricing requests
- **Virtual Tours**: 360° virtual tour support

### Photography Packages
- **Portfolio Management**: Showcase previous work by category
- **Style Filtering**: Traditional, candid, artistic styles
- **Package Types**: Wedding, corporate, portrait packages
- **Equipment Tracking**: Camera and lighting equipment lists
- **Quote Requests**: Custom event photography quotes

### Venues
- **Capacity Management**: Guest count and space requirements
- **Amenity Filtering**: Comprehensive facility filtering
- **Time Slot Management**: Hourly booking system
- **Floor Plans**: Venue layout visualization
- **Policy Management**: Alcohol, pet, smoking policies
- **Accessibility**: Wheelchair access and other features

## Type Safety

All operations include comprehensive TypeScript interfaces:

```typescript
// Service-specific types
type CateringPackage = CateringGraphQL.CateringPackage;
type FarmHouse = FarmHouseGraphQL.FarmHouse;
type PhotographyPackage = PhotographyGraphQL.PhotographyPackage;
type Venue = VenueGraphQL.Venue;

// Shared types
type PaginationInput = SharedTypes.PaginationInput;
type AvailabilityStatus = SharedTypes.AvailabilityStatus;
```

## Error Handling

```typescript
import { useMutation } from '@apollo/client';
import { CateringGraphQL } from '@/utils/graphql';

const [createPackage] = useMutation(CateringGraphQL.CREATE_CATERING_PACKAGE, {
  onError: (error) => {
    console.error('Failed to create catering package:', error);
    // Handle authentication, validation, or network errors
  },
  onCompleted: (data) => {
    console.log('Package created successfully:', data);
  }
});
```

## Best Practices

1. **Use Fragments**: Leverage the provided fragments for consistent data fetching
2. **Pagination**: Always implement pagination for list queries
3. **Error Handling**: Implement proper error handling for all operations
4. **Loading States**: Show loading indicators during GraphQL operations
5. **Caching**: Utilize Apollo Client caching for better performance
6. **Type Safety**: Use TypeScript interfaces for all data structures

## Integration with Existing Auth System

These GraphQL operations seamlessly integrate with your existing authentication system. The Apollo Client automatically includes authentication headers, and all role-based access control is handled at the GraphQL level.
