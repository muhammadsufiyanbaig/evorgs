"use client";

import { useState, useCallback, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client/react';
import { useAuth } from './useAuth';
import { toast } from 'sonner';
import {
  // Queries
  GET_CATERING_PACKAGES,
  GET_CATERING_PACKAGE,
  GET_VENDOR_CATERING_PACKAGES,
  SEARCH_CATERING_PACKAGES,
  GET_CATERING_PACKAGES_BY_LOCATION,
  GET_FEATURED_CATERING_PACKAGES,
  GET_POPULAR_CATERING_PACKAGES,
  
  // Mutations
  CREATE_CATERING_PACKAGE,
  UPDATE_CATERING_PACKAGE,
  DELETE_CATERING_PACKAGE,
  TOGGLE_CATERING_PACKAGE_STATUS,
  UPLOAD_CATERING_PACKAGE_IMAGES,
  REMOVE_CATERING_PACKAGE_IMAGE,
  ADD_CATERING_PACKAGE_REVIEW,
  UPDATE_CATERING_PACKAGE_REVIEW,
  DELETE_CATERING_PACKAGE_REVIEW,
  BOOK_CATERING_PACKAGE,
  
  // Types
  type CateringPackage,
  type CreateCateringPackageInput,
  type UpdateCateringPackageInput,
  type CateringPackageFiltersInput,
  type CateringPackageSortInput,
  type BookCateringPackageInput,
  type AddReviewInput,
  type UpdateReviewInput,
  type PaginationInput,
} from '@/lib/graphQL/services/catering';

// ============== HOOK INTERFACES ==============

interface UseGraphQLServicesReturn {
  // User Operations
  user: {
    getCateringPackages: (filters?: CateringPackageFiltersInput, pagination?: PaginationInput, sortBy?: CateringPackageSortInput) => void;
    getCateringPackage: (id: string) => void;
    searchCateringPackages: (searchTerm: string, filters?: CateringPackageFiltersInput, pagination?: PaginationInput) => void;
    getCateringPackagesByLocation: (location: string, radius?: number, filters?: CateringPackageFiltersInput, pagination?: PaginationInput) => void;
    getFeaturedPackages: (limit?: number) => void;
    getPopularPackages: (limit?: number) => void;
    bookCateringPackage: (input: BookCateringPackageInput) => Promise<any>;
    addReview: (input: AddReviewInput) => Promise<any>;
    updateReview: (id: string, input: UpdateReviewInput) => Promise<any>;
    deleteReview: (id: string) => Promise<any>;
    loading: boolean;
    data: any;
  };
  
  // Vendor Operations
  vendor: {
    getMyPackages: (filters?: CateringPackageFiltersInput, pagination?: PaginationInput) => void;
    getPackageDetails: (id: string) => void;
    createPackage: (input: CreateCateringPackageInput) => Promise<any>;
    updatePackage: (id: string, input: UpdateCateringPackageInput) => Promise<any>;
    deletePackage: (id: string) => Promise<any>;
    togglePackageStatus: (id: string) => Promise<any>;
    uploadImages: (packageId: string, images: File[]) => Promise<any>;
    removeImage: (packageId: string, imageUrl: string) => Promise<any>;
    loading: boolean;
    data: any;
  };
  
  // Admin Operations
  admin: {
    getAllPackages: (filters?: CateringPackageFiltersInput, pagination?: PaginationInput, sortBy?: CateringPackageSortInput) => void;
    getPackageDetails: (id: string) => void;
    searchPackages: (searchTerm: string, filters?: CateringPackageFiltersInput, pagination?: PaginationInput) => void;
    deletePackage: (id: string) => Promise<any>;
    togglePackageStatus: (id: string) => Promise<any>;
    loading: boolean;
    data: any;
  };
}

// ============== MAIN HOOK ==============

export const useGraphQLServices = (): UseGraphQLServicesReturn => {
  const { userType, isAuthenticated } = useAuth();
  const [currentData, setCurrentData] = useState<any>(null);

  // ============== LAZY QUERIES ==============
  
  const [getCateringPackagesQuery, { loading: getCateringPackagesLoading, data: cateringPackagesData }] = useLazyQuery(GET_CATERING_PACKAGES);
  const [getCateringPackageQuery, { loading: getCateringPackageLoading, data: cateringPackageData }] = useLazyQuery(GET_CATERING_PACKAGE);
  const [getVendorPackagesQuery, { loading: getVendorPackagesLoading, data: vendorPackagesData }] = useLazyQuery(GET_VENDOR_CATERING_PACKAGES);
  const [searchPackagesQuery, { loading: searchPackagesLoading, data: searchPackagesData }] = useLazyQuery(SEARCH_CATERING_PACKAGES);
  const [getPackagesByLocationQuery, { loading: getPackagesByLocationLoading, data: locationPackagesData }] = useLazyQuery(GET_CATERING_PACKAGES_BY_LOCATION);
  const [getFeaturedPackagesQuery, { loading: getFeaturedPackagesLoading, data: featuredPackagesData }] = useLazyQuery(GET_FEATURED_CATERING_PACKAGES);
  const [getPopularPackagesQuery, { loading: getPopularPackagesLoading, data: popularPackagesData }] = useLazyQuery(GET_POPULAR_CATERING_PACKAGES);

  // ============== SYNC QUERY DATA TO STATE ==============
  
  // Update currentData when vendor packages are fetched
  useEffect(() => {
    if (vendorPackagesData) {
      console.log('🍽️ Catering vendor data updated:', vendorPackagesData);
      setCurrentData(vendorPackagesData);
    }
  }, [vendorPackagesData]);
  
  // Update currentData for other queries
  useEffect(() => {
    if (cateringPackagesData) setCurrentData(cateringPackagesData);
    else if (cateringPackageData) setCurrentData(cateringPackageData);
    else if (searchPackagesData) setCurrentData(searchPackagesData);
    else if (locationPackagesData) setCurrentData(locationPackagesData);
    else if (featuredPackagesData) setCurrentData(featuredPackagesData);
    else if (popularPackagesData) setCurrentData(popularPackagesData);
  }, [cateringPackagesData, cateringPackageData, searchPackagesData, locationPackagesData, featuredPackagesData, popularPackagesData]);

  // ============== MUTATIONS ==============

  // ============== MUTATIONS ==============
  
  // Vendor Mutations
  const [createPackageMutation, { loading: createPackageLoading }] = useMutation(CREATE_CATERING_PACKAGE);
  const [updatePackageMutation, { loading: updatePackageLoading }] = useMutation(UPDATE_CATERING_PACKAGE);
  const [deletePackageMutation, { loading: deletePackageLoading }] = useMutation(DELETE_CATERING_PACKAGE);
  const [togglePackageStatusMutation, { loading: toggleStatusLoading }] = useMutation(TOGGLE_CATERING_PACKAGE_STATUS);
  const [uploadImagesMutation, { loading: uploadImagesLoading }] = useMutation(UPLOAD_CATERING_PACKAGE_IMAGES);
  const [removeImageMutation, { loading: removeImageLoading }] = useMutation(REMOVE_CATERING_PACKAGE_IMAGE);

  // User Mutations
  const [bookPackageMutation, { loading: bookPackageLoading }] = useMutation(BOOK_CATERING_PACKAGE);
  const [addReviewMutation, { loading: addReviewLoading }] = useMutation(ADD_CATERING_PACKAGE_REVIEW);
  const [updateReviewMutation, { loading: updateReviewLoading }] = useMutation(UPDATE_CATERING_PACKAGE_REVIEW);
  const [deleteReviewMutation, { loading: deleteReviewLoading }] = useMutation(DELETE_CATERING_PACKAGE_REVIEW);

  // ============== USER OPERATIONS ==============

  const getCateringPackages = useCallback((
    filters?: CateringPackageFiltersInput,
    pagination?: PaginationInput,
    sortBy?: CateringPackageSortInput
  ) => {
    // Backend uses searchCateringPackages with empty string to get all
    getCateringPackagesQuery({ 
      variables: { 
        searchTerm: "",
        limit: pagination?.limit || 20,
        skip: pagination?.page ? (pagination.page - 1) * (pagination.limit || 20) : 0
      } 
    });
  }, [getCateringPackagesQuery]);

  const getCateringPackage = useCallback((id: string) => {
    getCateringPackageQuery({ variables: { id } });
  }, [getCateringPackageQuery]);

  const searchCateringPackages = useCallback((
    searchTerm: string,
    filters?: CateringPackageFiltersInput,
    pagination?: PaginationInput
  ) => {
    searchPackagesQuery({ 
      variables: { 
        searchTerm,
        limit: pagination?.limit || 20,
        skip: pagination?.page ? (pagination.page - 1) * (pagination.limit || 20) : 0
      } 
    });
  }, [searchPackagesQuery]);

  const getCateringPackagesByLocation = useCallback((
    location: string,
    radius?: number,
    filters?: CateringPackageFiltersInput,
    pagination?: PaginationInput
  ) => {
    getPackagesByLocationQuery({ variables: { location, radius, filters, pagination } });
  }, [getPackagesByLocationQuery]);

  const getFeaturedPackages = useCallback((limit?: number) => {
    getFeaturedPackagesQuery({ variables: { limit } });
  }, [getFeaturedPackagesQuery]);

  const getPopularPackages = useCallback((limit?: number) => {
    getPopularPackagesQuery({ variables: { limit } });
  }, [getPopularPackagesQuery]);

  const bookCateringPackage = useCallback(async (input: BookCateringPackageInput) => {
    if (!isAuthenticated || userType !== 'User') {
      toast.error('Please login as a user to book packages');
      return null;
    }
    
    try {
      const { data } = await bookPackageMutation({ variables: { input } });
      toast.success('Catering package booked successfully!');
      console.log('✅ Package Booked:', data);
      return (data as any)?.bookCateringPackage;
    } catch (error: any) {
      console.error('❌ Book Package Error:', error);
      toast.error(error.message || 'Failed to book catering package');
      return null;
    }
  }, [bookPackageMutation, isAuthenticated, userType]);

  const addReview = useCallback(async (input: AddReviewInput) => {
    if (!isAuthenticated || userType !== 'User') {
      toast.error('Please login as a user to add reviews');
      return null;
    }
    
    try {
      const { data } = await addReviewMutation({ variables: { input } });
      toast.success('Review added successfully!');
      console.log('✅ Review Added:', data);
      return (data as any)?.addCateringPackageReview;
    } catch (error: any) {
      console.error('❌ Add Review Error:', error);
      toast.error(error.message || 'Failed to add review');
      return null;
    }
  }, [addReviewMutation, isAuthenticated, userType]);

  const updateReview = useCallback(async (id: string, input: UpdateReviewInput) => {
    if (!isAuthenticated || userType !== 'User') {
      toast.error('Please login as a user to update reviews');
      return null;
    }
    
    try {
      const { data } = await updateReviewMutation({ variables: { id, input } });
      toast.success('Review updated successfully!');
      console.log('✅ Review Updated:', data);
      return (data as any)?.updateCateringPackageReview;
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
      return (data as any)?.deleteCateringPackageReview;
    } catch (error: any) {
      console.error('❌ Delete Review Error:', error);
      toast.error(error.message || 'Failed to delete review');
      return null;
    }
  }, [deleteReviewMutation, isAuthenticated, userType]);

  // ============== VENDOR OPERATIONS ==============

  const getMyPackages = useCallback((
    filters?: CateringPackageFiltersInput,
    pagination?: PaginationInput
  ) => {
    if (userType !== 'Vendor') {
      toast.error('Vendor access required');
      return;
    }
    // Backend doesn't support filters/pagination yet, call without variables
    getVendorPackagesQuery();
  }, [getVendorPackagesQuery, userType]);

  const getPackageDetails = useCallback((id: string) => {
    getCateringPackageQuery({ variables: { id } });
  }, [getCateringPackageQuery]);

  const createPackage = useCallback(async (input: CreateCateringPackageInput) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to create packages');
      return null;
    }
    
    try {
      console.log('🚀 Sending createCateringPackage mutation with input:', input);
      const result = await createPackageMutation({ variables: { input } });
      
      console.log('📦 Mutation result:', result);
      
      toast.success('Catering package created successfully!');
      console.log('✅ Package Created:', result.data);
      return (result.data as any)?.createCateringPackage;
    } catch (error: any) {
      console.error('❌ Create Package Error (Full):', error);
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
      
      toast.error(error.message || 'Failed to create catering package');
      return null;
    }
  }, [createPackageMutation, isAuthenticated, userType]);

  const updatePackage = useCallback(async (id: string, input: UpdateCateringPackageInput) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to update packages');
      return null;
    }
    
    try {
      const { data } = await updatePackageMutation({ variables: { id, input } });
      toast.success('Catering package updated successfully!');
      console.log('✅ Package Updated:', data);
      return (data as any)?.updateCateringPackage;
    } catch (error: any) {
      console.error('❌ Update Package Error:', error);
      toast.error(error.message || 'Failed to update catering package');
      return null;
    }
  }, [updatePackageMutation, isAuthenticated, userType]);

  const deletePackage = useCallback(async (id: string) => {
    if (!isAuthenticated || (userType !== 'Vendor' && userType !== 'Admin')) {
      toast.error('Authorization required');
      return null;
    }
    
    try {
      const { data } = await deletePackageMutation({ variables: { id } });
      toast.success('Catering package deleted successfully!');
      console.log('✅ Package Deleted:', data);
      return (data as any)?.deleteCateringPackage;
    } catch (error: any) {
      console.error('❌ Delete Package Error:', error);
      toast.error(error.message || 'Failed to delete catering package');
      return null;
    }
  }, [deletePackageMutation, isAuthenticated, userType]);

  const togglePackageStatus = useCallback(async (id: string) => {
    if (!isAuthenticated || (userType !== 'Vendor' && userType !== 'Admin')) {
      toast.error('Authorization required');
      return null;
    }
    
    try {
      const { data } = await togglePackageStatusMutation({ variables: { id } });
      toast.success('Package status updated successfully!');
      console.log('✅ Package Status Toggled:', data);
      return (data as any)?.toggleCateringPackageStatus;
    } catch (error: any) {
      console.error('❌ Toggle Status Error:', error);
      toast.error(error.message || 'Failed to toggle package status');
      return null;
    }
  }, [togglePackageStatusMutation, isAuthenticated, userType]);

  const uploadImages = useCallback(async (packageId: string, images: File[]) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to upload images');
      return null;
    }
    
    try {
      const { data } = await uploadImagesMutation({ variables: { packageId, images } });
      toast.success('Images uploaded successfully!');
      console.log('✅ Images Uploaded:', data);
      return (data as any)?.uploadCateringPackageImages;
    } catch (error: any) {
      console.error('❌ Upload Images Error:', error);
      toast.error(error.message || 'Failed to upload images');
      return null;
    }
  }, [uploadImagesMutation, isAuthenticated, userType]);

  const removeImage = useCallback(async (packageId: string, imageUrl: string) => {
    if (!isAuthenticated || userType !== 'Vendor') {
      toast.error('Please login as a vendor to remove images');
      return null;
    }
    
    try {
      const { data } = await removeImageMutation({ variables: { packageId, imageUrl } });
      toast.success('Image removed successfully!');
      console.log('✅ Image Removed:', data);
      return (data as any)?.removeCateringPackageImage;
    } catch (error: any) {
      console.error('❌ Remove Image Error:', error);
      toast.error(error.message || 'Failed to remove image');
      return null;
    }
  }, [removeImageMutation, isAuthenticated, userType]);

  // ============== ADMIN OPERATIONS ==============

  const getAllPackages = useCallback((
    filters?: CateringPackageFiltersInput,
    pagination?: PaginationInput,
    sortBy?: CateringPackageSortInput
  ) => {
    if (userType !== 'Admin') {
      toast.error('Admin access required');
      return;
    }
    getCateringPackagesQuery({ variables: { filters, pagination, sortBy } });
  }, [getCateringPackagesQuery, userType]);

  const searchPackages = useCallback((
    searchTerm: string,
    filters?: CateringPackageFiltersInput,
    pagination?: PaginationInput
  ) => {
    if (userType !== 'Admin') {
      toast.error('Admin access required');
      return;
    }
    searchPackagesQuery({ variables: { searchTerm, filters, pagination } });
  }, [searchPackagesQuery, userType]);

  // Calculate combined loading states
  const userLoading = getCateringPackagesLoading || getCateringPackageLoading || 
                      searchPackagesLoading || getPackagesByLocationLoading || 
                      getFeaturedPackagesLoading || getPopularPackagesLoading ||
                      bookPackageLoading || addReviewLoading || updateReviewLoading || deleteReviewLoading;

  const vendorLoading = getVendorPackagesLoading || getCateringPackageLoading || 
                        createPackageLoading || updatePackageLoading || 
                        deletePackageLoading || toggleStatusLoading ||
                        uploadImagesLoading || removeImageLoading;

  const adminLoading = getCateringPackagesLoading || getCateringPackageLoading || 
                       searchPackagesLoading || deletePackageLoading || toggleStatusLoading;

  return {
    user: {
      getCateringPackages,
      getCateringPackage,
      searchCateringPackages,
      getCateringPackagesByLocation,
      getFeaturedPackages,
      getPopularPackages,
      bookCateringPackage,
      addReview,
      updateReview,
      deleteReview,
      loading: userLoading,
      data: currentData,
    },
    vendor: {
      getMyPackages,
      getPackageDetails,
      createPackage,
      updatePackage,
      deletePackage,
      togglePackageStatus,
      uploadImages,
      removeImage,
      loading: vendorLoading,
      data: currentData,
    },
    admin: {
      getAllPackages,
      getPackageDetails,
      searchPackages,
      deletePackage,
      togglePackageStatus,
      loading: adminLoading,
      data: currentData,
    },
  };
};

// ============== TYPED HOOK EXPORTS ==============

/**
 * Hook for User operations on catering services
 */
export const useUserCatering = () => {
  const services = useGraphQLServices();
  return services.user;
};

/**
 * Hook for Vendor operations on catering services
 */
export const useVendorCatering = () => {
  const services = useGraphQLServices();
  return services.vendor;
};

/**
 * Hook for Admin operations on catering services
 */
export const useAdminCatering = () => {
  const services = useGraphQLServices();
  return services.admin;
};
