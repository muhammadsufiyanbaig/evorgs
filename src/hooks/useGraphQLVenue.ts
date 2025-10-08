"use client";

import { useState } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client/react';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import {
  // Queries
  GET_VENUES,
  GET_VENUE,
  GET_VENDOR_VENUES,
  SEARCH_VENUES,
  GET_VENUES_BY_LOCATION,
  GET_VENUES_BY_COORDINATES,
  GET_FEATURED_VENUES,
  GET_POPULAR_VENUES,
  GET_VENUE_AVAILABILITY,
  GET_VENUES_BY_AMENITIES,
  
  // Mutations
  CREATE_VENUE,
  UPDATE_VENUE,
  DELETE_VENUE,
  TOGGLE_VENUE_STATUS,
  UPLOAD_VENUE_IMAGES,
  UPLOAD_VENUE_FLOOR_PLAN,
  REMOVE_VENUE_IMAGE,
  UPDATE_VENUE_AVAILABILITY,
  BLOCK_VENUE_DATES,
  UNBLOCK_VENUE_DATES,
  ADD_VENUE_REVIEW,
  UPDATE_VENUE_REVIEW,
  DELETE_VENUE_REVIEW,
  BOOK_VENUE,
  REQUEST_VENUE_QUOTE,
  RESPOND_TO_VENUE_QUOTE,
  
  // Types
  Venue,
  CreateVenueInput,
  UpdateVenueInput,
  VenueFiltersInput,
  VenueSortInput,
  BookVenueInput,
  AddVenueReviewInput,
  UpdateVenueReviewInput,
  PaginationInput,
  UpdateVenueAvailabilityInput,
  BlockVenueDatesInput,
  UnblockVenueDatesInput,
  VenueQuoteRequestInput,
  VenueQuoteResponseInput,
  VenueAmenity,
} from '@/lib/graphQL/services/venue';

// ============== USER HOOK (Public) ==============

export const useUserVenue = () => {
  const [getFarmhousesQuery, { loading: getVenuesLoading, data: venuesData }] = useLazyQuery(GET_VENUES);
  const [getVenueQuery, { loading: getVenueLoading, data: venueData }] = useLazyQuery(GET_VENUE);
  const [searchVenuesQuery, { loading: searchVenuesLoading, data: searchVenuesData }] = useLazyQuery(SEARCH_VENUES);
  const [getVenuesByLocationQuery, { loading: getVenuesByLocationLoading, data: locationVenuesData }] = useLazyQuery(GET_VENUES_BY_LOCATION);
  const [getFeaturedVenuesQuery, { loading: getFeaturedVenuesLoading, data: featuredVenuesData }] = useLazyQuery(GET_FEATURED_VENUES);
  const [getPopularVenuesQuery, { loading: getPopularVenuesLoading, data: popularVenuesData }] = useLazyQuery(GET_POPULAR_VENUES);
  const [getVenueAvailabilityQuery, { loading: getVenueAvailabilityLoading, data: availabilityData }] = useLazyQuery(GET_VENUE_AVAILABILITY);
  
  const [bookVenueMutation, { loading: bookVenueLoading }] = useMutation(BOOK_VENUE);
  const [requestQuoteMutation, { loading: requestQuoteLoading }] = useMutation(REQUEST_VENUE_QUOTE);
  const [addReviewMutation, { loading: addReviewLoading }] = useMutation(ADD_VENUE_REVIEW);
  const [updateReviewMutation, { loading: updateReviewLoading }] = useMutation(UPDATE_VENUE_REVIEW);
  const [deleteReviewMutation, { loading: deleteReviewLoading }] = useMutation(DELETE_VENUE_REVIEW);

  // Get all venues
  const getVenues = (filters?: VenueFiltersInput, pagination?: PaginationInput, sortBy?: VenueSortInput) => {
    getFarmhousesQuery({
      variables: { filters, pagination, sortBy }
    });
  };

  // Get single venue
  const getVenue = (id: string) => {
    getVenueQuery({
      variables: { id }
    });
  };

  // Search venues
  const searchVenues = (searchTerm: string, filters?: VenueFiltersInput, pagination?: PaginationInput) => {
    searchVenuesQuery({
      variables: { searchTerm, filters, pagination }
    });
  };

  // Get venues by location
  const getVenuesByLocation = (location: string, radius?: number, filters?: VenueFiltersInput, pagination?: PaginationInput) => {
    getVenuesByLocationQuery({
      variables: { location, radius, filters, pagination }
    });
  };

  // Get featured venues
  const getFeaturedVenues = (limit?: number) => {
    getFeaturedVenuesQuery({
      variables: { limit }
    });
  };

  // Get popular venues
  const getPopularVenues = (limit?: number) => {
    getPopularVenuesQuery({
      variables: { limit }
    });
  };

  // Get venue availability
  const getVenueAvailability = (venueId: string, startDate: string, endDate: string) => {
    getVenueAvailabilityQuery({
      variables: { venueId, startDate, endDate }
    });
  };

  // Book venue
  const bookVenue = async (input: BookVenueInput) => {
    try {
      const result = await bookVenueMutation({
        variables: { input }
      });
      toast.success('Venue booked successfully!');
      return (result.data as any)?.bookVenue;
    } catch (error: any) {
      toast.error(error.message || 'Failed to book venue');
      throw error;
    }
  };

  // Request quote
  const requestQuote = async (input: VenueQuoteRequestInput) => {
    try {
      const result = await requestQuoteMutation({
        variables: { input }
      });
      toast.success('Quote request submitted successfully!');
      return (result.data as any)?.requestVenueQuote;
    } catch (error: any) {
      toast.error(error.message || 'Failed to request quote');
      throw error;
    }
  };

  // Add review
  const addReview = async (input: AddVenueReviewInput) => {
    try {
      const result = await addReviewMutation({
        variables: { input }
      });
      toast.success('Review added successfully!');
      return (result.data as any)?.addVenueReview;
    } catch (error: any) {
      toast.error(error.message || 'Failed to add review');
      throw error;
    }
  };

  // Update review
  const updateReview = async (id: string, input: UpdateVenueReviewInput) => {
    try {
      const result = await updateReviewMutation({
        variables: { id, input }
      });
      toast.success('Review updated successfully!');
      return (result.data as any)?.updateVenueReview;
    } catch (error: any) {
      toast.error(error.message || 'Failed to update review');
      throw error;
    }
  };

  // Delete review
  const deleteReview = async (id: string) => {
    try {
      const result = await deleteReviewMutation({
        variables: { id }
      });
      toast.success('Review deleted successfully!');
      return (result.data as any)?.deleteVenueReview;
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete review');
      throw error;
    }
  };

  const loading = 
    getVenuesLoading || 
    getVenueLoading || 
    searchVenuesLoading || 
    getVenuesByLocationLoading ||
    getFeaturedVenuesLoading ||
    getPopularVenuesLoading ||
    getVenueAvailabilityLoading ||
    bookVenueLoading ||
    requestQuoteLoading ||
    addReviewLoading ||
    updateReviewLoading ||
    deleteReviewLoading;

  const data = 
    venuesData || 
    venueData || 
    searchVenuesData || 
    locationVenuesData ||
    featuredVenuesData ||
    popularVenuesData ||
    availabilityData;

  return {
    getVenues,
    getVenue,
    searchVenues,
    getVenuesByLocation,
    getFeaturedVenues,
    getPopularVenues,
    getVenueAvailability,
    bookVenue,
    requestQuote,
    addReview,
    updateReview,
    deleteReview,
    loading,
    data,
  };
};

// ============== VENDOR HOOK ==============

export const useVendorVenue = () => {
  const { token } = useAuth();
  
  const [getVendorVenuesQuery, { loading: getVendorVenuesLoading, data: vendorVenuesData }] = useLazyQuery(GET_VENDOR_VENUES);
  const [getVenueQuery, { loading: getVenueLoading, data: venueData }] = useLazyQuery(GET_VENUE);
  
  const [createVenueMutation, { loading: createVenueLoading }] = useMutation(CREATE_VENUE);
  const [updateVenueMutation, { loading: updateVenueLoading }] = useMutation(UPDATE_VENUE);
  const [deleteVenueMutation, { loading: deleteVenueLoading }] = useMutation(DELETE_VENUE);
  const [toggleVenueStatusMutation, { loading: toggleStatusLoading }] = useMutation(TOGGLE_VENUE_STATUS);
  const [uploadImagesMutation, { loading: uploadImagesLoading }] = useMutation(UPLOAD_VENUE_IMAGES);
  const [uploadFloorPlanMutation, { loading: uploadFloorPlanLoading }] = useMutation(UPLOAD_VENUE_FLOOR_PLAN);
  const [removeImageMutation, { loading: removeImageLoading }] = useMutation(REMOVE_VENUE_IMAGE);
  const [updateAvailabilityMutation, { loading: updateAvailabilityLoading }] = useMutation(UPDATE_VENUE_AVAILABILITY);
  const [blockDatesMutation, { loading: blockDatesLoading }] = useMutation(BLOCK_VENUE_DATES);
  const [unblockDatesMutation, { loading: unblockDatesLoading }] = useMutation(UNBLOCK_VENUE_DATES);
  const [respondToQuoteMutation, { loading: respondToQuoteLoading }] = useMutation(RESPOND_TO_VENUE_QUOTE);

  // Get vendor's venues
  const getMyVenues = (filters?: VenueFiltersInput, pagination?: PaginationInput) => {
    getVendorVenuesQuery({
      variables: { filters, pagination },
      context: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    });
  };

  // Get venue details
  const getVenueDetails = (id: string) => {
    getVenueQuery({
      variables: { id },
      context: {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      },
    });
  };

  // Create venue
  const createVenue = async (venueData: any) => {
    try {
      const result = await createVenueMutation({
        variables: { input: venueData },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      toast.success('Venue created successfully!');
      return (result.data as any)?.createVenue;
    } catch (error: any) {
      toast.error(error.message || 'Failed to create venue');
      throw error;
    }
  };

  // Update venue
  const updateVenue = async (id: string, input: UpdateVenueInput) => {
    try {
      const result = await updateVenueMutation({
        variables: { id, input },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      toast.success('Venue updated successfully!');
      return (result.data as any)?.updateVenue;
    } catch (error: any) {
      toast.error(error.message || 'Failed to update venue');
      throw error;
    }
  };

  // Delete venue
  const deleteVenue = async (id: string) => {
    try {
      const result = await deleteVenueMutation({
        variables: { id },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      toast.success('Venue deleted successfully!');
      return (result.data as any)?.deleteVenue;
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete venue');
      throw error;
    }
  };

  // Toggle venue status
  const toggleVenueStatus = async (id: string) => {
    try {
      const result = await toggleVenueStatusMutation({
        variables: { id },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      toast.success('Venue status updated successfully!');
      return (result.data as any)?.toggleVenueStatus;
    } catch (error: any) {
      toast.error(error.message || 'Failed to update venue status');
      throw error;
    }
  };

  // Upload images
  const uploadImages = async (venueId: string, images: File[]) => {
    try {
      const result = await uploadImagesMutation({
        variables: { venueId, images },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      toast.success('Images uploaded successfully!');
      return (result.data as any)?.uploadVenueImages;
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload images');
      throw error;
    }
  };

  // Upload floor plan
  const uploadFloorPlan = async (venueId: string, floorPlan: File) => {
    try {
      const result = await uploadFloorPlanMutation({
        variables: { venueId, floorPlan },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      toast.success('Floor plan uploaded successfully!');
      return (result.data as any)?.uploadVenueFloorPlan;
    } catch (error: any) {
      toast.error(error.message || 'Failed to upload floor plan');
      throw error;
    }
  };

  // Remove image
  const removeImage = async (venueId: string, imageUrl: string) => {
    try {
      const result = await removeImageMutation({
        variables: { venueId, imageUrl },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      toast.success('Image removed successfully!');
      return (result.data as any)?.removeVenueImage;
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove image');
      throw error;
    }
  };

  // Update availability
  const updateAvailability = async (input: UpdateVenueAvailabilityInput) => {
    try {
      const result = await updateAvailabilityMutation({
        variables: { input },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      toast.success('Availability updated successfully!');
      return (result.data as any)?.updateVenueAvailability;
    } catch (error: any) {
      toast.error(error.message || 'Failed to update availability');
      throw error;
    }
  };

  // Block dates
  const blockDates = async (input: BlockVenueDatesInput) => {
    try {
      const result = await blockDatesMutation({
        variables: { input },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      toast.success('Dates blocked successfully!');
      return (result.data as any)?.blockVenueDates;
    } catch (error: any) {
      toast.error(error.message || 'Failed to block dates');
      throw error;
    }
  };

  // Unblock dates
  const unblockDates = async (input: UnblockVenueDatesInput) => {
    try {
      const result = await unblockDatesMutation({
        variables: { input },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      toast.success('Dates unblocked successfully!');
      return (result.data as any)?.unblockVenueDates;
    } catch (error: any) {
      toast.error(error.message || 'Failed to unblock dates');
      throw error;
    }
  };

  // Respond to quote
  const respondToQuote = async (id: string, response: VenueQuoteResponseInput) => {
    try {
      const result = await respondToQuoteMutation({
        variables: { id, response },
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        },
      });
      toast.success('Quote response sent successfully!');
      return (result.data as any)?.respondToVenueQuote;
    } catch (error: any) {
      toast.error(error.message || 'Failed to send quote response');
      throw error;
    }
  };

  const loading = 
    getVendorVenuesLoading ||
    getVenueLoading ||
    createVenueLoading ||
    updateVenueLoading ||
    deleteVenueLoading ||
    toggleStatusLoading ||
    uploadImagesLoading ||
    uploadFloorPlanLoading ||
    removeImageLoading ||
    updateAvailabilityLoading ||
    blockDatesLoading ||
    unblockDatesLoading ||
    respondToQuoteLoading;

  const data = vendorVenuesData || venueData;

  return {
    getMyVenues,
    getVenueDetails,
    createVenue,
    updateVenue,
    deleteVenue,
    toggleVenueStatus,
    uploadImages,
    uploadFloorPlan,
    removeImage,
    updateAvailability,
    blockDates,
    unblockDates,
    respondToQuote,
    loading,
    data,
  };
};
