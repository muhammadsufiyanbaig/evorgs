// Custom hooks for service bookings and mutations
"use client";

import { useMutation, useQuery } from '@apollo/client/react';
import { toast } from 'sonner';
import { 
  CateringGraphQL, 
  FarmHouseGraphQL, 
  PhotographyGraphQL, 
  VenueGraphQL 
} from '@/utils/graphql';

// Hook for catering operations
export const useCateringOperations = () => {
  // Create catering package (vendor only)
  const [createCateringPackage, { loading: creating }] = useMutation(
    CateringGraphQL.CREATE_CATERING_PACKAGE,
    {
      onCompleted: (data: any) => {
        toast.success('Catering package created successfully!');
        console.log('Created package:', data.createCateringPackage);
      },
      onError: (error) => {
        toast.error('Failed to create catering package');
        console.error('Creation error:', error);
      }
    }
  );

  // Book catering package (user only)
  const [bookCateringPackage, { loading: booking }] = useMutation(
    CateringGraphQL.BOOK_CATERING_PACKAGE,
    {
      onCompleted: (data: any) => {
        toast.success('Catering package booked successfully!');
        console.log('Booking confirmed:', data.bookCateringPackage);
      },
      onError: (error) => {
        toast.error('Failed to book catering package');
        console.error('Booking error:', error);
      }
    }
  );

  // Add review
  const [addCateringReview, { loading: reviewing }] = useMutation(
    CateringGraphQL.ADD_CATERING_PACKAGE_REVIEW,
    {
      onCompleted: () => {
        toast.success('Review added successfully!');
      },
      onError: (error) => {
        toast.error('Failed to add review');
        console.error('Review error:', error);
      }
    }
  );

  return {
    createCateringPackage,
    bookCateringPackage,
    addCateringReview,
    loading: { creating, booking, reviewing }
  };
};

// Hook for farmhouse operations
export const useFarmhouseOperations = () => {
  // Create farmhouse (vendor only)
  const [createFarmhouse, { loading: creating }] = useMutation(
    FarmHouseGraphQL.CREATE_FARMHOUSE,
    {
      onCompleted: (data: any) => {
        toast.success('Farmhouse created successfully!');
        console.log('Created farmhouse:', data.createFarmHouse);
      },
      onError: (error) => {
        toast.error('Failed to create farmhouse');
        console.error('Creation error:', error);
      }
    }
  );

  // Book farmhouse (user only)
  const [bookFarmhouse, { loading: booking }] = useMutation(
    FarmHouseGraphQL.BOOK_FARMHOUSE,
    {
      onCompleted: (data: any) => {
        toast.success('Farmhouse booked successfully!');
        console.log('Booking confirmed:', data.bookFarmHouse);
      },
      onError: (error) => {
        toast.error('Failed to book farmhouse');
        console.error('Booking error:', error);
      }
    }
  );

  // Request quote
  const [requestFarmhouseQuote, { loading: requesting }] = useMutation(
    FarmHouseGraphQL.REQUEST_FARMHOUSE_QUOTE,
    {
      onCompleted: (data: any) => {
        toast.success('Quote request sent successfully!');
        console.log('Quote request:', data.requestFarmHouseQuote);
      },
      onError: (error) => {
        toast.error('Failed to send quote request');
        console.error('Quote error:', error);
      }
    }
  );

  // Get farmhouse availability
  const getFarmhouseAvailability = (farmHouseId: string, startDate: string, endDate: string) => {
    return useQuery(FarmHouseGraphQL.GET_FARMHOUSE_AVAILABILITY, {
      variables: { farmHouseId, startDate, endDate },
      skip: !farmHouseId || !startDate || !endDate
    });
  };

  return {
    createFarmhouse,
    bookFarmhouse,
    requestFarmhouseQuote,
    getFarmhouseAvailability,
    loading: { creating, booking, requesting }
  };
};

// Hook for photography operations
export const usePhotographyOperations = () => {
  // Create photography package (vendor only)
  const [createPhotographyPackage, { loading: creating }] = useMutation(
    PhotographyGraphQL.CREATE_PHOTOGRAPHY_PACKAGE,
    {
      onCompleted: (data: any) => {
        toast.success('Photography package created successfully!');
        console.log('Created package:', data.createPhotographyPackage);
      },
      onError: (error) => {
        toast.error('Failed to create photography package');
        console.error('Creation error:', error);
      }
    }
  );

  // Book photography package (user only)
  const [bookPhotographyPackage, { loading: booking }] = useMutation(
    PhotographyGraphQL.BOOK_PHOTOGRAPHY_PACKAGE,
    {
      onCompleted: (data: any) => {
        toast.success('Photography package booked successfully!');
        console.log('Booking confirmed:', data.bookPhotographyPackage);
      },
      onError: (error) => {
        toast.error('Failed to book photography package');
        console.error('Booking error:', error);
      }
    }
  );

  // Request custom quote
  const [requestPhotographyQuote, { loading: requesting }] = useMutation(
    PhotographyGraphQL.REQUEST_PHOTOGRAPHY_QUOTE,
    {
      onCompleted: (data: any) => {
        toast.success('Photography quote request sent!');
        console.log('Quote request:', data.requestPhotographyQuote);
      },
      onError: (error) => {
        toast.error('Failed to send quote request');
        console.error('Quote error:', error);
      }
    }
  );

  // Add portfolio item (vendor only)
  const [addPortfolioItem, { loading: adding }] = useMutation(
    PhotographyGraphQL.ADD_PORTFOLIO_ITEM,
    {
      onCompleted: (data: any) => {
        toast.success('Portfolio item added successfully!');
        console.log('Portfolio item:', data.addPortfolioItem);
      },
      onError: (error) => {
        toast.error('Failed to add portfolio item');
        console.error('Portfolio error:', error);
      }
    }
  );

  // Get photographer portfolio
  const getPhotographerPortfolio = (vendorId: string) => {
    return useQuery(PhotographyGraphQL.GET_PHOTOGRAPHER_PORTFOLIO, {
      variables: { vendorId },
      skip: !vendorId
    });
  };

  return {
    createPhotographyPackage,
    bookPhotographyPackage,
    requestPhotographyQuote,
    addPortfolioItem,
    getPhotographerPortfolio,
    loading: { creating, booking, requesting, adding }
  };
};

// Hook for venue operations
export const useVenueOperations = () => {
  // Create venue (vendor only)
  const [createVenue, { loading: creating }] = useMutation(
    VenueGraphQL.CREATE_VENUE,
    {
      onCompleted: (data: any) => {
        toast.success('Venue created successfully!');
        console.log('Created venue:', data.createVenue);
      },
      onError: (error) => {
        toast.error('Failed to create venue');
        console.error('Creation error:', error);
      }
    }
  );

  // Book venue (user only)
  const [bookVenue, { loading: booking }] = useMutation(
    VenueGraphQL.BOOK_VENUE,
    {
      onCompleted: (data: any) => {
        toast.success('Venue booked successfully!');
        console.log('Booking confirmed:', data.bookVenue);
      },
      onError: (error) => {
        toast.error('Failed to book venue');
        console.error('Booking error:', error);
      }
    }
  );

  // Request venue quote
  const [requestVenueQuote, { loading: requesting }] = useMutation(
    VenueGraphQL.REQUEST_VENUE_QUOTE,
    {
      onCompleted: (data: any) => {
        toast.success('Venue quote request sent!');
        console.log('Quote request:', data.requestVenueQuote);
      },
      onError: (error) => {
        toast.error('Failed to send quote request');
        console.error('Quote error:', error);
      }
    }
  );

  // Get venue availability
  const getVenueAvailability = (venueId: string, startDate: string, endDate: string) => {
    return useQuery(VenueGraphQL.GET_VENUE_AVAILABILITY, {
      variables: { venueId, startDate, endDate },
      skip: !venueId || !startDate || !endDate
    });
  };

  // Update venue availability (vendor only)
  const [updateVenueAvailability, { loading: updating }] = useMutation(
    VenueGraphQL.UPDATE_VENUE_AVAILABILITY,
    {
      onCompleted: () => {
        toast.success('Venue availability updated!');
      },
      onError: (error) => {
        toast.error('Failed to update availability');
        console.error('Update error:', error);
      }
    }
  );

  return {
    createVenue,
    bookVenue,
    requestVenueQuote,
    getVenueAvailability,
    updateVenueAvailability,
    loading: { creating, booking, requesting, updating }
  };
};

// Combined hook for all service operations
export const useServiceOperations = () => {
  const catering = useCateringOperations();
  const farmhouse = useFarmhouseOperations();
  const photography = usePhotographyOperations();
  const venue = useVenueOperations();

  return {
    catering,
    farmhouse,
    photography,
    venue
  };
};

// Example usage functions for testing
export const createSampleCateringPackage = async (createFunction: any) => {
  try {
    await createFunction({
      variables: {
        input: {
          packageName: "Premium Wedding Package",
          description: "Complete catering solution for your special day",
          pricePerPerson: 150,
          minPersons: 50,
          maxPersons: 300,
          menuItems: [
            "Chicken Karahi",
            "Beef Biryani", 
            "Vegetable Pulao",
            "Mixed Salad",
            "Dessert Platter"
          ],
          servingStyle: "Buffet",
          cuisineType: "Pakistani",
          dietaryOptions: ["Halal", "Vegetarian"],
          duration: 4,
          setupTime: 60,
          cleanupTime: 45,
          features: [
            "Professional service staff",
            "Premium tableware",
            "Decorative food presentation",
            "24/7 coordinator support"
          ]
        }
      }
    });
  } catch (error) {
    console.error('Sample creation failed:', error);
  }
};

export const bookSampleService = async (bookFunction: any, serviceType: string) => {
  const bookingData = {
    catering: {
      packageId: "catering-123",
      eventDate: "2024-12-15",
      eventTime: "18:00",
      guestCount: 150,
      specialRequests: "Vegetarian options needed for 20 guests",
      eventDuration: 4
    },
    farmhouse: {
      farmHouseId: "farmhouse-123",
      checkInDate: "2024-12-20",
      checkOutDate: "2024-12-22",
      guestCount: 25,
      specialRequests: "Need early check-in at 12 PM",
      purpose: "Family reunion"
    },
    photography: {
      packageId: "photo-123",
      eventDate: "2024-12-18",
      eventTime: "10:00",
      eventLocation: "Karachi Convention Center",
      eventType: "Wedding",
      specialRequests: "Need drone photography",
      duration: 8
    },
    venue: {
      venueId: "venue-123",
      eventDate: "2024-12-25",
      startTime: "16:00",
      endTime: "22:00",
      eventType: "Wedding Reception",
      guestCount: 200,
      specialRequests: "Need sound system setup",
      setupRequired: true,
      cateringRequired: false
    }
  };

  try {
    await bookFunction({
      variables: {
        input: bookingData[serviceType as keyof typeof bookingData]
      }
    });
  } catch (error) {
    console.error('Sample booking failed:', error);
  }
};
