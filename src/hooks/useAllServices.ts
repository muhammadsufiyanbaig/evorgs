// Simplified hooks for fetching all services - Matches actual backend schema
import { useLazyQuery } from '@apollo/client/react';
import { 
  GET_ALL_CATERING_PACKAGES,
  CateringPackage 
} from '@/lib/graphQL/services/catering-simple';
import { 
  GET_ALL_FARMHOUSES,
  Farmhouse 
} from '@/lib/graphQL/services/farmhouse-simple';
import { 
  GET_ALL_VENUES,
  Venue 
} from '@/lib/graphQL/services/venue-simple';
import { 
  GET_ALL_PHOTOGRAPHY,
  Photography 
} from '@/lib/graphQL/services/photography-simple';

// ============== CATERING HOOKS ==============

export const useAllCateringPackages = () => {
  const [getCateringPackages, { data, loading, error }] = useLazyQuery<{
    vendorCateringPackages: CateringPackage[];
  }>(GET_ALL_CATERING_PACKAGES, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all', // Don't throw on errors
  });

  return {
    packages: data?.vendorCateringPackages || [],
    loading,
    error,
    refetch: getCateringPackages,
  };
};

// ============== FARMHOUSE HOOKS ==============

export const useAllFarmhouses = () => {
  const [getFarmhouses, { data, loading, error }] = useLazyQuery<{
    farmhouses: Farmhouse[] | null;
  }>(GET_ALL_FARMHOUSES, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all', // Don't throw on errors
  });

  return {
    farmhouses: data?.farmhouses || [], // Handle null from backend
    loading,
    error,
    refetch: getFarmhouses,
  };
};

// ============== VENUE HOOKS ==============

export const useAllVenues = () => {
  const [getVenues, { data, loading, error }] = useLazyQuery<{
    venues: Venue[] | null;
  }>(GET_ALL_VENUES, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all', // Don't throw on errors
  });

  return {
    venues: data?.venues || [], // Handle null from backend
    loading,
    error,
    refetch: getVenues,
  };
};

// ============== PHOTOGRAPHY HOOKS ==============

export const useAllPhotography = () => {
  const [getPhotography, { data, loading, error }] = useLazyQuery<{
    photographyPackages: Photography[] | null;
  }>(GET_ALL_PHOTOGRAPHY, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all', // Don't throw on errors
  });

  return {
    packages: data?.photographyPackages || [], // Handle null from backend
    loading,
    error,
    refetch: getPhotography,
  };
};

// ============== COMBINED HOOK ==============

export const useAllServices = () => {
  const catering = useAllCateringPackages();
  const farmhouses = useAllFarmhouses();
  const venues = useAllVenues();
  const photography = useAllPhotography();

  return {
    catering: {
      data: catering.packages,
      loading: catering.loading,
      error: catering.error,
    },
    farmhouses: {
      data: farmhouses.farmhouses,
      loading: farmhouses.loading,
      error: farmhouses.error,
    },
    venues: {
      data: venues.venues,
      loading: venues.loading,
      error: venues.error,
    },
    photography: {
      data: photography.packages,
      loading: photography.loading,
      error: photography.error,
    },
    isLoading: catering.loading || farmhouses.loading || venues.loading || photography.loading,
    hasError: !!(catering.error || farmhouses.error || venues.error || photography.error),
  };
};
