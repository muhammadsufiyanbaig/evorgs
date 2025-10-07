"use client";

import { useState, useCallback } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client/react';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import {
  // Queries
  GET_FARMHOUSES,
  GET_FARMHOUSE,
  GET_VENDOR_FARMHOUSES,
  SEARCH_FARMHOUSES,
  GET_FARMHOUSES_BY_LOCATION,
  GET_FARMHOUSES_BY_COORDINATES,
  GET_FEATURED_FARMHOUSES,
  GET_POPULAR_FARMHOUSES,
  GET_FARMHOUSE_AVAILABILITY,
  GET_FARMHOUSES_BY_AMENITIES,
  GET_FARMHOUSES_BY_ACTIVITIES,
  
  // Mutations
  CREATE_FARMHOUSE,
  UPDATE_FARMHOUSE,
  DELETE_FARMHOUSE,
  TOGGLE_FARMHOUSE_STATUS,
  UPLOAD_FARMHOUSE_IMAGES,
  UPLOAD_FARMHOUSE_VIRTUAL_TOUR,
  UPLOAD_FARMHOUSE_FLOOR_PLAN,
  REMOVE_FARMHOUSE_IMAGE,
  UPDATE_FARMHOUSE_AVAILABILITY,
  SET_FARMHOUSE_PRICING,
  BLOCK_FARMHOUSE_DATES,
  UNBLOCK_FARMHOUSE_DATES,
  ADD_FARMHOUSE_REVIEW,
  UPDATE_FARMHOUSE_REVIEW,
  DELETE_FARMHOUSE_REVIEW,
  BOOK_FARMHOUSE,
  REQUEST_FARMHOUSE_QUOTE,
  RESPOND_TO_FARMHOUSE_QUOTE,
  
  // Types
  FarmHouse,
  CreateFarmHouseInput,
  UpdateFarmHouseInput,
  FarmHouseFiltersInput,
  FarmHouseSortInput,
  BookFarmHouseInput,
  AddFarmHouseReviewInput,
  UpdateFarmHouseReviewInput,
  PaginationInput,
  FarmHousePricingInput,
  UpdateFarmHouseAvailabilityInput,
  BlockFarmHouseDatesInput,
  UnblockFarmHouseDatesInput,
  FarmHouseQuoteRequestInput,
  FarmHouseQuoteResponseInput,
  FarmHouseAmenity,
  Activity,
} from '@/lib/graphQL/services/farmhouse';

// ============== HOOK INTERFACES ==============

interface UseGraphQLFarmhouseReturn {
  // User Operations
  user: {
    getFarmhouses: (filters?: FarmHouseFiltersInput, pagination?: PaginationInput, sortBy?: FarmHouseSortInput) => void;
    getFarmhouse: (id: string) => void;
    searchFarmhouses: (searchTerm: string, filters?: FarmHouseFiltersInput, pagination?: PaginationInput) => void;
    getFarmhousesByLocation: (location: string, radius?: number, filters?: FarmHouseFiltersInput, pagination?: PaginationInput) => void;
    getFarmhousesByCoordinates: (latitude: number, longitude: number, radius: number, filters?: FarmHouseFiltersInput, pagination?: PaginationInput) => void;
    getFeaturedFarmhouses: (limit?: number) => void;
    getPopularFarmhouses: (limit?: number) => void;
    getFarmhousesByAmenities: (amenities: FarmHouseAmenity[], filters?: FarmHouseFiltersInput, pagination?: PaginationInput) => void;
    getFarmhousesByActivities: (activities: Activity[], filters?: FarmHouseFiltersInput, pagination?: PaginationInput) => void;
    getFarmhouseAvailability: (farmHouseId: string, startDate: string, endDate: string) => void;
    bookFarmhouse: (input: BookFarmHouseInput) => Promise<any>;
    requestQuote: (input: FarmHouseQuoteRequestInput) => Promise<any>;
    addReview: (input: AddFarmHouseReviewInput) => Promise<any>;
    updateReview: (id: string, input: UpdateFarmHouseReviewInput) => Promise<any>;
    deleteReview: (id: string) => Promise<any>;
    loading: boolean;
    data: any;
  };
  
  // Vendor Operations
  vendor: {
    getMyFarmhouses: (filters?: FarmHouseFiltersInput, pagination?: PaginationInput) => void;
    getFarmhouseDetails: (id: string) => void;
    createFarmhouse: (input: CreateFarmHouseInput) => Promise<any>;
    updateFarmhouse: (id: string, input: UpdateFarmHouseInput) => Promise<any>;
    deleteFarmhouse: (id: string) => Promise<any>;
    toggleFarmhouseStatus: (id: string) => Promise<any>;
    uploadImages: (farmHouseId: string, images: File[]) => Promise<any>;
    uploadVirtualTour: (farmHouseId: string, virtualTour: File) => Promise<any>;
    uploadFloorPlan: (farmHouseId: string, floorPlan: File) => Promise<any>;
    removeImage: (farmHouseId: string, imageUrl: string) => Promise<any>;
    updateAvailability: (input: UpdateFarmHouseAvailabilityInput) => Promise<any>;
    setPricing: (id: string, pricing: FarmHousePricingInput) => Promise<any>;
    blockDates: (input: BlockFarmHouseDatesInput) => Promise<any>;
    unblockDates: (input: UnblockFarmHouseDatesInput) => Promise<any>;
    respondToQuote: (id: string, response: FarmHouseQuoteResponseInput) => Promise<any>;
    loading: boolean;
    data: any;
  };
  
  // Admin Operations
  admin: {
    getAllFarmhouses: (filters?: FarmHouseFiltersInput, pagination?: PaginationInput, sortBy?: FarmHouseSortInput) => void;
    getFarmhouseDetails: (id: string) => void;
    searchFarmhouses: (searchTerm: string, filters?: FarmHouseFiltersInput, pagination?: PaginationInput) => void;
    deleteFarmhouse: (id: string) => Promise<any>;
    toggleFarmhouseStatus: (id: string) => Promise<any>;
    loading: boolean;
    data: any;
  };
}

// ============== MAIN HOOK ==============

export const useGraphQLFarmhouse = (): UseGraphQLFarmhouseReturn => {
  const { userType, isAuthenticated } = useAuth();
  const [currentData, setCurrentData] = useState<any>(null);

  // ============== LAZY QUERIES ==============
  
  const [getFarmhousesQuery, { loading: getFarmhousesLoading, data: farmhousesData }] = useLazyQuery(GET_FARMHOUSES);
  const [getFarmhouseQuery, { loading: getFarmhouseLoading, data: farmhouseData }] = useLazyQuery(GET_FARMHOUSE);
  const [getVendorFarmhousesQuery, { loading: getVendorFarmhousesLoading, data: vendorFarmhousesData }] = useLazyQuery(GET_VENDOR_FARMHOUSES);
  const [searchFarmhousesQuery, { loading: searchFarmhousesLoading, data: searchFarmhousesData }] = useLazyQuery(SEARCH_FARMHOUSES);
  const [getFarmhousesByLocationQuery, { loading: getFarmhousesByLocationLoading, data: locationFarmhousesData }] = useLazyQuery(GET_FARMHOUSES_BY_LOCATION);
  const [getFarmhousesByCoordinatesQuery, { loading: getFarmhousesByCoordinatesLoading, data: coordinatesFarmhousesData }] = useLazyQuery(GET_FARMHOUSES_BY_COORDINATES);
  const [getFeaturedFarmhousesQuery, { loading: getFeaturedFarmhousesLoading, data: featuredFarmhousesData }] = useLazyQuery(GET_FEATURED_FARMHOUSES);
  const [getPopularFarmhousesQuery, { loading: getPopularFarmhousesLoading, data: popularFarmhousesData }] = useLazyQuery(GET_POPULAR_FARMHOUSES);
  const [getFarmhouseAvailabilityQuery, { loading: getFarmhouseAvailabilityLoading, data: availabilityData }] = useLazyQuery(GET_FARMHOUSE_AVAILABILITY);
  const [getFarmhousesByAmenitiesQuery, { loading: getFarmhousesByAmenitiesLoading, data: amenitiesFarmhousesData }] = useLazyQuery(GET_FARMHOUSES_BY_AMENITIES);
  const [getFarmhousesByActivitiesQuery, { loading: getFarmhousesByActivitiesLoading, data: activitiesFarmhousesData }] = useLazyQuery(GET_FARMHOUSES_BY_ACTIVITIES);

  // ============== MUTATIONS ==============
  
  // Vendor Mutations
  const [createFarmhouseMutation, { loading: createFarmhouseLoading }] = useMutation(CREATE_FARMHOUSE);
  const [updateFarmhouseMutation, { loading: updateFarmhouseLoading }] = useMutation(UPDATE_FARMHOUSE);
  const [deleteFarmhouseMutation, { loading: deleteFarmhouseLoading }] = useMutation(DELETE_FARMHOUSE);
  const [toggleFarmhouseStatusMutation, { loading: toggleStatusLoading }] = useMutation(TOGGLE_FARMHOUSE_STATUS);
  const [uploadImagesMutation, { loading: uploadImagesLoading }] = useMutation(UPLOAD_FARMHOUSE_IMAGES);
  const [uploadVirtualTourMutation, { loading: uploadVirtualTourLoading }] = useMutation(UPLOAD_FARMHOUSE_VIRTUAL_TOUR);
  const [uploadFloorPlanMutation, { loading: uploadFloorPlanLoading }] = useMutation(UPLOAD_FARMHOUSE_FLOOR_PLAN);
  const [removeImageMutation, { loading: removeImageLoading }] = useMutation(REMOVE_FARMHOUSE_IMAGE);
  const [updateAvailabilityMutation, { loading: updateAvailabilityLoading }] = useMutation(UPDATE_FARMHOUSE_AVAILABILITY);
  const [setPricingMutation, { loading: setPricingLoading }] = useMutation(SET_FARMHOUSE_PRICING);
  const [blockDatesMutation, { loading: blockDatesLoading }] = useMutation(BLOCK_FARMHOUSE_DATES);
  const [unblockDatesMutation, { loading: unblockDatesLoading }] = useMutation(UNBLOCK_FARMHOUSE_DATES);

  // User Mutations
  const [bookFarmhouseMutation, { loading: bookFarmhouseLoading }] = useMutation(BOOK_FARMHOUSE);
  const [requestQuoteMutation, { loading: requestQuoteLoading }] = useMutation(REQUEST_FARMHOUSE_QUOTE);
  const [addReviewMutation, { loading: addReviewLoading }] = useMutation(ADD_FARMHOUSE_REVIEW);
  const [updateReviewMutation, { loading: updateReviewLoading }] = useMutation(UPDATE_FARMHOUSE_REVIEW);
  const [deleteReviewMutation, { loading: deleteReviewLoading }] = useMutation(DELETE_FARMHOUSE_REVIEW);

  // Vendor-User Mutations
  const [respondToQuoteMutation, { loading: respondToQuoteLoading }] = useMutation(RESPOND_TO_FARMHOUSE_QUOTE);

  // ============== USER OPERATIONS ==============

  const getFarmhouses = useCallback((
    filters?: FarmHouseFiltersInput,
    pagination?: PaginationInput,
    sortBy?: FarmHouseSortInput
  ) => {
    getFarmhousesQuery({ variables: { filters, pagination, sortBy } });
  }, [getFarmhousesQuery]);

  const getFarmhouse = useCallback((id: string) => {
    getFarmhouseQuery({ variables: { id } });
  }, [getFarmhouseQuery]);

  const searchFarmhouses = useCallback((
    searchTerm: string,
    filters?: FarmHouseFiltersInput,
    pagination?: PaginationInput
  ) => {
    searchFarmhousesQuery({ variables: { searchTerm, filters, pagination } });
  }, [searchFarmhousesQuery]);

  const getFarmhousesByLocation = useCallback((
    location: string,
    radius?: number,
    filters?: FarmHouseFiltersInput,
    pagination?: PaginationInput
  ) => {
    getFarmhousesByLocationQuery({ variables: { location, radius, filters, pagination } });
  }, [getFarmhousesByLocationQuery]);

  const getFarmhousesByCoordinates = useCallback((
    latitude: number,
    longitude: number,
    radius: number,
    filters?: FarmHouseFiltersInput,
    pagination?: PaginationInput
  ) => {
    getFarmhousesByCoordinatesQuery({ variables: { latitude, longitude, radius, filters, pagination } });
  }, [getFarmhousesByCoordinatesQuery]);

  const getFeaturedFarmhouses = useCallback((limit?: number) => {
    getFeaturedFarmhousesQuery({ variables: { limit } });
  }, [getFeaturedFarmhousesQuery]);

  const getPopularFarmhouses = useCallback((limit?: number) => {
    getPopularFarmhousesQuery({ variables: { limit } });
  }, [getPopularFarmhousesQuery]);

  const getFarmhousesByAmenities = useCallback((
    amenities: FarmHouseAmenity[],
    filters?: FarmHouseFiltersInput,
    pagination?: PaginationInput
  ) => {
    getFarmhousesByAmenitiesQuery({ variables: { amenities, filters, pagination } });
  }, [getFarmhousesByAmenitiesQuery]);

  const getFarmhousesByActivities = useCallback((
    activities: Activity[],
    filters?: FarmHouseFiltersInput,
    pagination?: PaginationInput
  ) => {
    getFarmhousesByActivitiesQuery({ variables: { activities, filters, pagination } });
  }, [getFarmhousesByActivitiesQuery]);

  const getFarmhouseAvailability = useCallback((
    farmHouseId: string,
    startDate: string,
    endDate: string
  ) => {
    getFarmhouseAvailabilityQuery({ variables: { farmHouseId, startDate, endDate } });
  }, [getFarmhouseAvailabilityQuery]);

  const bookFarmhouse = useCallback(async (input: BookFarmHouseInput) => {
    if (!isAuthenticated || userType !== 'User') {
      toast.error('Please login as a user to book farmhouses');
      return null;
    }
    
    try {
      const { data } = await bookFarmhouseMutation({ variables: { input } });
      toast.success('Farmhouse booked successfully!');
      console.log('✅ Farmhouse Booked:', data);
      return (data as any)?.bookFarmHouse;
    } catch (error: any) {
      console.error('❌ Book Farmhouse Error:', error);
      toast.error(error.message || 'Failed to book farmhouse');
      return null;
    }
  }, [bookFarmhouseMutation, isAuthenticated, userType]);

  const requestQuote = useCallback(async (input: FarmHouseQuoteRequestInput) => {
    if (!isAuthenticated || userType !== 'User') {
      toast.error('Please login as a user to request quotes');
      return null;
    }
    
    try {
      const { data } = await requestQuoteMutation({ variables: { input } });
      toast.success('Quote request sent successfully!');
      console.log('✅ Quote Requested:', data);
      return (data as any)?.requestFarmHouseQuote;
    } catch (error: any) {
      console.error('❌ Request Quote Error:', error);
      toast.error(error.message || 'Failed to request quote');
      return null;
    }
  }, [requestQuoteMutation, isAuthenticated, userType]);

  const addReview = useCallback(async (input: AddFarmHouseReviewInput) => {
    if (!isAuthenticated || userType !== 'User') {
      toast.error('Please login as a user to add reviews');
      return null;
    }
    
    try {
      const { data } = await addReviewMutation({ variables: { input } });
      toast.success('Review added successfully!');
      console.log('✅ Review Added:', data);
      return (data as any)?.addFarmHouseReview;
    } catch (error: any) {
      console.error('❌ Add Review Error:', error);
      toast.error(error.message || 'Failed to add review');
      return null;
    }
  }, [addReviewMutation, isAuthenticated, userType]);

  const updateReview = useCallback(async (id: string, input: UpdateFarmHouseReviewInput) => {
    if (!isAuthenticated || userType !== 'User') {
      toast.error('Please login as a user to update reviews');
      return null;
    }
    
    try {
      const { data } = await updateReviewMutation({ variables: { id, input } });
      toast.success('Review updated successfully!');
      console.log('✅ Review Updated:', data);
      return (data as any)?.updateFarmHouseReview;
    } catch (error: any) {
      console.error('❌ Update Review Error:', error);
      toast.error(error.message || 'Failed to update review');
      return null;
    }
  }, [updateReviewMutation, isAuthenticated, userType]);

  const deleteReview = useCallback(async (id: string) => {
    if (!isAuthenticated || userType !== 'User') {
      toast.error('Please login as a user to delete reviews');
      return null;
    }
    
    try {
      const { data } = await deleteReviewMutation({ variables: { id } });
      toast.success('Review deleted successfully!');
      console.log('✅ Review Deleted:', data);
      return (data as any)?.deleteFarmHouseReview;
    } catch (error: any) {
      console.error('❌ Delete Review Error:', error);
      toast.error(error.message || 'Failed to delete review');
      return null;
    }
  }, [deleteReviewMutation, isAuthenticated, userType]);

  // ============== VENDOR OPERATIONS ==============

  const getMyFarmhouses = useCallback((
    filters?: FarmHouseFiltersInput,
    pagination?: PaginationInput
  ) => {
    if (userType !== 'Vendor') {
      toast.error('Vendor access required');
      return;
    }
    // Backend doesn't support filters/pagination yet, call without variables
    getVendorFarmhousesQuery();
  }, [getVendorFarmhousesQuery, userType]);

  const getFarmhouseDetails = useCallback((id: string) => {
    getFarmhouseQuery({ variables: { id } });
  }, [getFarmhouseQuery]);

  const createFarmhouse = useCallback(async (input: CreateFarmHouseInput) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to create farmhouses');
      return null;
    }
    
    try {
      console.log('🚀 Sending createFarmHouse mutation with input:', input);
      const result = await createFarmhouseMutation({ variables: { input } });
      
      console.log('📦 Mutation result:', result);
      
      toast.success('Farmhouse created successfully!');
      console.log('✅ Farmhouse Created:', result.data);
      return (result.data as any)?.createFarmHouse;
    } catch (error: any) {
      console.error('❌ Create Farmhouse Error (Full):', error);
      console.error('Error message:', error.message);
      console.error('Error network:', error.networkError);
      console.error('Error graphQL:', error.graphQLErrors);
      
      // Log detailed GraphQL errors
      if (error.graphQLErrors) {
        error.graphQLErrors.forEach((err: any, index: number) => {
          console.error(`GraphQL Error ${index + 1}:`, {
            message: err.message,
            extensions: err.extensions,
            path: err.path,
            locations: err.locations
          });
        });
      }
      
      toast.error(error.message || 'Failed to create farmhouse');
      return null;
    }
  }, [createFarmhouseMutation, isAuthenticated, userType]);

  const updateFarmhouse = useCallback(async (id: string, input: UpdateFarmHouseInput) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to update farmhouses');
      return null;
    }
    
    try {
      const { data } = await updateFarmhouseMutation({ variables: { id, input } });
      toast.success('Farmhouse updated successfully!');
      console.log('✅ Farmhouse Updated:', data);
      return (data as any)?.updateFarmHouse;
    } catch (error: any) {
      console.error('❌ Update Farmhouse Error:', error);
      toast.error(error.message || 'Failed to update farmhouse');
      return null;
    }
  }, [updateFarmhouseMutation, isAuthenticated, userType]);

  const deleteFarmhouse = useCallback(async (id: string) => {
    if (!isAuthenticated || (userType !== 'Vendor' && userType !== 'Admin')) {
      toast.error('Authorization required');
      return null;
    }
    
    try {
      const { data } = await deleteFarmhouseMutation({ variables: { id } });
      toast.success('Farmhouse deleted successfully!');
      console.log('✅ Farmhouse Deleted:', data);
      return (data as any)?.deleteFarmHouse;
    } catch (error: any) {
      console.error('❌ Delete Farmhouse Error:', error);
      toast.error(error.message || 'Failed to delete farmhouse');
      return null;
    }
  }, [deleteFarmhouseMutation, isAuthenticated, userType]);

  const toggleFarmhouseStatus = useCallback(async (id: string) => {
    if (!isAuthenticated || (userType !== 'Vendor' && userType !== 'Admin')) {
      toast.error('Authorization required');
      return null;
    }
    
    try {
      const { data } = await toggleFarmhouseStatusMutation({ variables: { id } });
      toast.success('Farmhouse status updated successfully!');
      console.log('✅ Farmhouse Status Toggled:', data);
      return (data as any)?.toggleFarmHouseStatus;
    } catch (error: any) {
      console.error('❌ Toggle Status Error:', error);
      toast.error(error.message || 'Failed to toggle farmhouse status');
      return null;
    }
  }, [toggleFarmhouseStatusMutation, isAuthenticated, userType]);

  const uploadImages = useCallback(async (farmHouseId: string, images: File[]) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to upload images');
      return null;
    }
    
    try {
      const { data } = await uploadImagesMutation({ variables: { farmHouseId, images } });
      toast.success('Images uploaded successfully!');
      console.log('✅ Images Uploaded:', data);
      return (data as any)?.uploadFarmHouseImages;
    } catch (error: any) {
      console.error('❌ Upload Images Error:', error);
      toast.error(error.message || 'Failed to upload images');
      return null;
    }
  }, [uploadImagesMutation, isAuthenticated, userType]);

  const uploadVirtualTour = useCallback(async (farmHouseId: string, virtualTour: File) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to upload virtual tour');
      return null;
    }
    
    try {
      const { data } = await uploadVirtualTourMutation({ variables: { farmHouseId, virtualTour } });
      toast.success('Virtual tour uploaded successfully!');
      console.log('✅ Virtual Tour Uploaded:', data);
      return (data as any)?.uploadFarmHouseVirtualTour;
    } catch (error: any) {
      console.error('❌ Upload Virtual Tour Error:', error);
      toast.error(error.message || 'Failed to upload virtual tour');
      return null;
    }
  }, [uploadVirtualTourMutation, isAuthenticated, userType]);

  const uploadFloorPlan = useCallback(async (farmHouseId: string, floorPlan: File) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to upload floor plan');
      return null;
    }
    
    try {
      const { data } = await uploadFloorPlanMutation({ variables: { farmHouseId, floorPlan } });
      toast.success('Floor plan uploaded successfully!');
      console.log('✅ Floor Plan Uploaded:', data);
      return (data as any)?.uploadFarmHouseFloorPlan;
    } catch (error: any) {
      console.error('❌ Upload Floor Plan Error:', error);
      toast.error(error.message || 'Failed to upload floor plan');
      return null;
    }
  }, [uploadFloorPlanMutation, isAuthenticated, userType]);

  const removeImage = useCallback(async (farmHouseId: string, imageUrl: string) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to remove images');
      return null;
    }
    
    try {
      const { data } = await removeImageMutation({ variables: { farmHouseId, imageUrl } });
      toast.success('Image removed successfully!');
      console.log('✅ Image Removed:', data);
      return (data as any)?.removeFarmHouseImage;
    } catch (error: any) {
      console.error('❌ Remove Image Error:', error);
      toast.error(error.message || 'Failed to remove image');
      return null;
    }
  }, [removeImageMutation, isAuthenticated, userType]);

  const updateAvailability = useCallback(async (input: UpdateFarmHouseAvailabilityInput) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to update availability');
      return null;
    }
    
    try {
      const { data } = await updateAvailabilityMutation({ variables: { input } });
      toast.success('Availability updated successfully!');
      console.log('✅ Availability Updated:', data);
      return (data as any)?.updateFarmHouseAvailability;
    } catch (error: any) {
      console.error('❌ Update Availability Error:', error);
      toast.error(error.message || 'Failed to update availability');
      return null;
    }
  }, [updateAvailabilityMutation, isAuthenticated, userType]);

  const setPricing = useCallback(async (id: string, pricing: FarmHousePricingInput) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to set pricing');
      return null;
    }
    
    try {
      const { data } = await setPricingMutation({ variables: { id, pricing } });
      toast.success('Pricing updated successfully!');
      console.log('✅ Pricing Updated:', data);
      return (data as any)?.setFarmHousePricing;
    } catch (error: any) {
      console.error('❌ Set Pricing Error:', error);
      toast.error(error.message || 'Failed to set pricing');
      return null;
    }
  }, [setPricingMutation, isAuthenticated, userType]);

  const blockDates = useCallback(async (input: BlockFarmHouseDatesInput) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to block dates');
      return null;
    }
    
    try {
      const { data } = await blockDatesMutation({ variables: { input } });
      toast.success('Dates blocked successfully!');
      console.log('✅ Dates Blocked:', data);
      return (data as any)?.blockFarmHouseDates;
    } catch (error: any) {
      console.error('❌ Block Dates Error:', error);
      toast.error(error.message || 'Failed to block dates');
      return null;
    }
  }, [blockDatesMutation, isAuthenticated, userType]);

  const unblockDates = useCallback(async (input: UnblockFarmHouseDatesInput) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to unblock dates');
      return null;
    }
    
    try {
      const { data } = await unblockDatesMutation({ variables: { input } });
      toast.success('Dates unblocked successfully!');
      console.log('✅ Dates Unblocked:', data);
      return (data as any)?.unblockFarmHouseDates;
    } catch (error: any) {
      console.error('❌ Unblock Dates Error:', error);
      toast.error(error.message || 'Failed to unblock dates');
      return null;
    }
  }, [unblockDatesMutation, isAuthenticated, userType]);

  const respondToQuote = useCallback(async (id: string, response: FarmHouseQuoteResponseInput) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to respond to quotes');
      return null;
    }
    
    try {
      const { data } = await respondToQuoteMutation({ variables: { id, response } });
      toast.success('Quote response sent successfully!');
      console.log('✅ Quote Response Sent:', data);
      return (data as any)?.respondToFarmHouseQuote;
    } catch (error: any) {
      console.error('❌ Respond to Quote Error:', error);
      toast.error(error.message || 'Failed to respond to quote');
      return null;
    }
  }, [respondToQuoteMutation, isAuthenticated, userType]);

  // ============== ADMIN OPERATIONS ==============

  const getAllFarmhouses = useCallback((
    filters?: FarmHouseFiltersInput,
    pagination?: PaginationInput,
    sortBy?: FarmHouseSortInput
  ) => {
    if (userType !== 'Admin') {
      toast.error('Admin access required');
      return;
    }
    getFarmhousesQuery({ variables: { filters, pagination, sortBy } });
  }, [getFarmhousesQuery, userType]);

  const searchFarmhousesAdmin = useCallback((
    searchTerm: string,
    filters?: FarmHouseFiltersInput,
    pagination?: PaginationInput
  ) => {
    if (userType !== 'Admin') {
      toast.error('Admin access required');
      return;
    }
    searchFarmhousesQuery({ variables: { searchTerm, filters, pagination } });
  }, [searchFarmhousesQuery, userType]);

  // Calculate combined loading states
  const userLoading = getFarmhousesLoading || getFarmhouseLoading || 
                      searchFarmhousesLoading || getFarmhousesByLocationLoading || 
                      getFarmhousesByCoordinatesLoading || getFeaturedFarmhousesLoading || 
                      getPopularFarmhousesLoading || getFarmhouseAvailabilityLoading ||
                      getFarmhousesByAmenitiesLoading || getFarmhousesByActivitiesLoading ||
                      bookFarmhouseLoading || requestQuoteLoading || addReviewLoading || 
                      updateReviewLoading || deleteReviewLoading;

  const vendorLoading = getVendorFarmhousesLoading || getFarmhouseLoading || 
                        createFarmhouseLoading || updateFarmhouseLoading || 
                        deleteFarmhouseLoading || toggleStatusLoading ||
                        uploadImagesLoading || uploadVirtualTourLoading ||
                        uploadFloorPlanLoading || removeImageLoading ||
                        updateAvailabilityLoading || setPricingLoading ||
                        blockDatesLoading || unblockDatesLoading || respondToQuoteLoading;

  const adminLoading = getFarmhousesLoading || getFarmhouseLoading || 
                       searchFarmhousesLoading || deleteFarmhouseLoading || toggleStatusLoading;

  return {
    user: {
      getFarmhouses,
      getFarmhouse,
      searchFarmhouses,
      getFarmhousesByLocation,
      getFarmhousesByCoordinates,
      getFeaturedFarmhouses,
      getPopularFarmhouses,
      getFarmhousesByAmenities,
      getFarmhousesByActivities,
      getFarmhouseAvailability,
      bookFarmhouse,
      requestQuote,
      addReview,
      updateReview,
      deleteReview,
      loading: userLoading,
      data: currentData,
    },
    vendor: {
      getMyFarmhouses,
      getFarmhouseDetails,
      createFarmhouse,
      updateFarmhouse,
      deleteFarmhouse,
      toggleFarmhouseStatus,
      uploadImages,
      uploadVirtualTour,
      uploadFloorPlan,
      removeImage,
      updateAvailability,
      setPricing,
      blockDates,
      unblockDates,
      respondToQuote,
      loading: vendorLoading,
      data: currentData,
    },
    admin: {
      getAllFarmhouses,
      getFarmhouseDetails,
      searchFarmhouses: searchFarmhousesAdmin,
      deleteFarmhouse,
      toggleFarmhouseStatus,
      loading: adminLoading,
      data: currentData,
    },
  };
};

// ============== TYPED HOOK EXPORTS ==============

/**
 * Hook for User operations on farmhouse services
 */
export const useUserFarmhouse = () => {
  const services = useGraphQLFarmhouse();
  return services.user;
};

/**
 * Hook for Vendor operations on farmhouse services
 */
export const useVendorFarmhouse = () => {
  const services = useGraphQLFarmhouse();
  return services.vendor;
};

/**
 * Hook for Admin operations on farmhouse services
 */
export const useAdminFarmhouse = () => {
  const services = useGraphQLFarmhouse();
  return services.admin;
};
