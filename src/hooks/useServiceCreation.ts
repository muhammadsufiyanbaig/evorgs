import { useState } from 'react';
import { useRouter } from 'next/navigation';
import client from '@/utils/client';
import { 
  CREATE_VENUE, 
  type CreateVenueInput,
  type VenueType
} from '@/utils/graphql/venues';
import { 
  CREATE_CATERING_PACKAGE, 
  type CreateCateringPackageInput,
  type ServingStyle,
  type CuisineType
} from '@/utils/graphql/catering';
import { 
  CREATE_PHOTOGRAPHY_PACKAGE, 
  type CreatePhotographyPackageInput,
  type PackageType
} from '@/utils/graphql/photography';
import { 
  CREATE_FARMHOUSE, 
  type CreateFarmHouseInput,
  type FarmHouseType
} from '@/utils/graphql/farmhouse';

type ServiceType = "venue" | "farmhouse" | "catering" | "photography";

interface UseServiceCreationProps {
  serviceType: ServiceType;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useServiceCreation = ({ 
  serviceType, 
  onSuccess, 
  onError 
}: UseServiceCreationProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the appropriate mutation based on service type
  const getMutation = () => {
    switch (serviceType) {
      case 'venue':
        return CREATE_VENUE;
      case 'catering':
        return CREATE_CATERING_PACKAGE;
      case 'photography':
        return CREATE_PHOTOGRAPHY_PACKAGE;
      case 'farmhouse':
        return CREATE_FARMHOUSE;
      default:
        throw new Error('Invalid service type');
    }
  };

  const createServiceHandler = async (input: any) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log(`Creating ${serviceType} service with data:`, input);

      const { data } = await client.mutate({
        mutation: getMutation(),
        variables: { input },
      });

      console.log(`${serviceType} service created successfully:`, data);

      if (onSuccess) {
        onSuccess();
      } else {
        // Default success behavior - redirect to services page
        router.push('/vendor/services');
      }
      
    } catch (err: any) {
      console.error(`Failed to create ${serviceType} service:`, err);
      const errorMessage = err.message || `Failed to create ${serviceType} service`;
      setError(errorMessage);
      
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createService: createServiceHandler,
    isLoading,
    error,
    clearError: () => setError(null),
  };
};

// Helper functions to transform form data to API input format
export const transformVenueData = (formData: any): CreateVenueInput => {
  return {
    venueName: formData.name,
    description: formData.description,
    venueType: 'BanquetHall' as VenueType, // Default type, can be made dynamic
    capacity: parseInt(formData.maxGuests) || 50,
    location: formData.location,
    address: formData.location,
    city: formData.location.split(',')[0] || formData.location,
    pricePerEvent: parseFloat(formData.price) || 0,
    availableAmenities: [], // Will be properly mapped from form data
    indoorOutdoor: 'Both',
    minimumBookingHours: parseInt(formData.minNights) || 1,
  };
};

export const transformCateringData = (formData: any): CreateCateringPackageInput => {
  return {
    packageName: formData.name,
    description: formData.description,
    pricePerPerson: parseFloat(formData.pricePerPerson) || 0,
    minPersons: parseInt(formData.minPersonLimit) || 10,
    maxPersons: parseInt(formData.maxPersonLimit) || 100,
    menuItems: formData.menuItems ? formData.menuItems.split(',').map((item: string) => item.trim()) : [],
    servingStyle: 'Buffet' as ServingStyle,
    cuisineType: 'Continental' as CuisineType,
    dietaryOptions: [], // Will be properly mapped
    duration: parseInt(formData.duration) || 4,
    features: formData.amenities ? formData.amenities.split(',').map((a: string) => a.trim()) : [],
  };
};

export const transformPhotographyData = (formData: any): CreatePhotographyPackageInput => {
  return {
    packageName: formData.name,
    description: formData.description,
    packageType: 'Event' as PackageType,
    duration: parseInt(formData.duration) || 4,
    numberOfPhotographers: parseInt(formData.photographerCount) || 1,
    price: parseFloat(formData.packagePrice) || 0,
    shootingStyle: [], // Default empty array
    deliveryTimeframe: 7, // Default 7 days
    numberOfEditedPhotos: 100, // Default value
    features: formData.deliverables ? formData.deliverables.split(',').map((d: string) => d.trim()) : [],
  };
};

export const transformFarmhouseData = (formData: any): CreateFarmHouseInput => {
  return {
    farmHouseName: formData.name,
    description: formData.description,
    location: formData.location,
    address: formData.location,
    city: formData.location.split(',')[0] || formData.location,
    capacity: parseInt(formData.maxGuestsLimit) || 20,
    perNightPrice: parseFloat(formData.perNightPrice) || 0,
    minimumStayNights: parseInt(formData.minNights) || 1,
    amenities: [], // Will be properly mapped from form data
    farmHouseType: 'TraditionalFarm' as FarmHouseType,
    numberOfRooms: 3, // Default value
    numberOfBathrooms: 2, // Default value
    checkInTime: '14:00', // Default check-in time
    checkOutTime: '11:00', // Default check-out time
    petPolicy: 'NotAllowed' as any, // Default pet policy
    smokingPolicy: 'NoSmoking' as any, // Default smoking policy
  };
};
