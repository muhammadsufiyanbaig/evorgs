'use client'

import { useMutation, useLazyQuery } from '@apollo/client/react';
import { 
  GET_PHOTOGRAPHY_PACKAGE,
  GET_VENDOR_PHOTOGRAPHY_PACKAGES,
  CREATE_PHOTOGRAPHY_PACKAGE,
  UPDATE_PHOTOGRAPHY_PACKAGE,
  DELETE_PHOTOGRAPHY_PACKAGE,
  TOGGLE_PHOTOGRAPHY_PACKAGE_STATUS,
  ADD_PHOTOGRAPHY_PACKAGE_REVIEW,
  BOOK_PHOTOGRAPHY_PACKAGE,
  type CreatePhotographyPackageInput,
  type UpdatePhotographyPackageInput,
  type BookPhotographyPackageInput,
  type AddReviewInput
} from '@/lib/graphQL/services/photography';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

export const useUserPhotography = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [getPackageQuery, { loading, data: packageData }] = useLazyQuery(
    GET_PHOTOGRAPHY_PACKAGE
  );

  const getPhotographyPackage = async (id: string) => {
    try {
      const result = await getPackageQuery({ variables: { id } });
      if (result.data) {
        setData(result.data);
        return (result.data as any).photographyPackage;
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch photography package",
        variant: "destructive",
      });
      throw err;
    }
  };

  const [bookPackageMutation, { loading: bookingLoading }] = useMutation(
    BOOK_PHOTOGRAPHY_PACKAGE
  );

  const bookPhotographyPackage = async (input: BookPhotographyPackageInput) => {
    try {
      const result = await bookPackageMutation({
        variables: { input },
      });
      
      toast({
        title: "Success!",
        description: "Photography package booked successfully.",
      });
      
      return (result.data as any)?.bookPhotographyPackage;
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to book photography package",
        variant: "destructive",
      });
      throw err;
    }
  };

  const [addReviewMutation, { loading: reviewLoading }] = useMutation(
    ADD_PHOTOGRAPHY_PACKAGE_REVIEW
  );

  const addPhotographyPackageReview = async (input: AddReviewInput) => {
    try {
      const result = await addReviewMutation({
        variables: { input },
      });
      
      toast({
        title: "Success!",
        description: "Review added successfully.",
      });
      
      return (result.data as any)?.addPhotographyPackageReview;
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to add review",
        variant: "destructive",
      });
      throw err;
    }
  };

  return {
    data: data || packageData,
    loading: loading,
    error,
    getPhotographyPackage,
    bookPhotographyPackage,
    bookingLoading,
    addPhotographyPackageReview,
    reviewLoading,
  };
};

export const useVendorPhotography = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getToken = () => {
    if (typeof window !== 'undefined') {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        return parsed?.state?.token || null;
      }
    }
    return null;
  };

  const token = getToken();

  // Query to get vendor's photography packages
  const [getPackagesQuery, { loading: queryLoading }] = useLazyQuery(
    GET_VENDOR_PHOTOGRAPHY_PACKAGES
  );

  const getMyPhotographyPackages = async () => {
    try {
      const result = await getPackagesQuery({
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      
      if (result.data) {
        console.log('📸 Photography packages fetched:', result.data);
        setData(result.data);
        return (result.data as any).vendorPhotographPackages;
      }
    } catch (err: any) {
      setError(err.message);
      console.error('❌ Error fetching vendor photography packages:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to fetch photography packages",
        variant: "destructive",
      });
      throw err;
    }
  };

  const [createPackageMutation, { loading: createLoading }] = useMutation(
    CREATE_PHOTOGRAPHY_PACKAGE
  );

  const createPhotographyPackage = async (photographyData: CreatePhotographyPackageInput) => {
    try {
      console.log("📸 Creating photography package with data:", photographyData);
      
      const result = await createPackageMutation({
        variables: { input: photographyData },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      
      console.log("✅ Photography package created:", result.data);
      
      toast({
        title: "Success!",
        description: "Photography package created successfully.",
      });
      
      return (result.data as any)?.createPhotographyPackage;
    } catch (err: any) {
      console.error("❌ Error creating photography package:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to create photography package",
        variant: "destructive",
      });
      throw err;
    }
  };

  const [updatePackageMutation, { loading: updateLoading }] = useMutation(
    UPDATE_PHOTOGRAPHY_PACKAGE
  );

  const updatePhotographyPackage = async (
    id: string,
    photographyData: UpdatePhotographyPackageInput
  ) => {
    try {
      const result = await updatePackageMutation({
        variables: { id, input: photographyData },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      
      toast({
        title: "Success!",
        description: "Photography package updated successfully.",
      });
      
      return (result.data as any)?.updatePhotographyPackage;
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to update photography package",
        variant: "destructive",
      });
      throw err;
    }
  };

  const [deletePackageMutation, { loading: deleteLoading }] = useMutation(
    DELETE_PHOTOGRAPHY_PACKAGE
  );

  const deletePhotographyPackage = async (id: string) => {
    try {
      const result = await deletePackageMutation({
        variables: { id },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      
      toast({
        title: "Success!",
        description: "Photography package deleted successfully.",
      });
      
      return (result.data as any)?.deletePhotographyPackage;
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to delete photography package",
        variant: "destructive",
      });
      throw err;
    }
  };

  // Toggle photography package status
  const [toggleStatusMutation, { loading: toggleLoading }] = useMutation(
    TOGGLE_PHOTOGRAPHY_PACKAGE_STATUS
  );

  const togglePhotographyPackageStatus = async (id: string) => {
    try {
      const result = await toggleStatusMutation({
        variables: { id },
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
      
      toast({
        title: "Success!",
        description: "Photography package status updated successfully.",
      });
      
      return (result.data as any)?.togglePhotographyPackageStatus;
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to toggle photography package status",
        variant: "destructive",
      });
      throw err;
    }
  };

  return {
    data,
    error,
    loading: loading || queryLoading || createLoading || updateLoading || deleteLoading || toggleLoading,
    getMyPhotographyPackages,
    createPhotographyPackage,
    createLoading,
    updatePhotographyPackage,
    updateLoading,
    deletePhotographyPackage,
    deleteLoading,
    togglePhotographyPackageStatus,
    toggleLoading,
  };
};
