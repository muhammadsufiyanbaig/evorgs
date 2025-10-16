"use client";

import { useState, useCallback, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client/react';
import { toast } from 'sonner';
import {
  // Queries
  GET_BOOKING,
  GET_BOOKINGS,
  GET_MY_BOOKINGS,
  GET_PENDING_BOOKINGS,
  GET_CONFIRMED_BOOKINGS,
  GET_BOOKINGS_BY_DATE_RANGE,
  GET_VENDOR_BOOKINGS,
  GET_VENDOR_BOOKINGS_BY_SERVICE,
  GET_VENDOR_VISITING_REQUESTS,
  GET_VENDOR_SCHEDULED_VISITS,
  GET_ALL_BOOKINGS,
  GET_ALL_VISITING_REQUESTS,
  GET_ALL_SCHEDULED_VISITS,
} from '@/lib/graphQL/booking/queries';

import {
  // Mutations
  CREATE_BOOKING,
  CREATE_VENUE_BOOKING,
  CREATE_FARMHOUSE_BOOKING,
  CREATE_CATERING_BOOKING,
  CREATE_PHOTOGRAPHY_BOOKING,
  REQUEST_VISIT,
  UPDATE_PAYMENT,
  PAY_ADVANCE,
  PAY_FULL,
  PAY_BALANCE,
  CANCEL_BOOKING,
  SCHEDULE_VISIT,
  COMPLETE_VISIT,
} from '@/lib/graphQL/booking/mutations';

import type {
  Booking,
  CreateBookingInput,
  RequestVisitInput,
  ScheduleVisitInput,
  UpdatePaymentInput,
  CancelBookingInput,
  BookingFiltersInput,
} from '@/lib/graphQL/booking/types';

// ============================================
// HELPER: Get Auth Token
// ============================================
const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      return parsed?.state?.token || null;
    }
  }
  return null;
};

// ============================================
// USER BOOKING HOOK
// ============================================
export const useUserBooking = () => {
  const [currentData, setCurrentData] = useState<any>(null);
  const token = getAuthToken();

  // ============== QUERIES ==============
  
  const [getBookingQuery, { loading: getBookingLoading, data: bookingData }] = useLazyQuery(GET_BOOKING);
  const [getMyBookingsQuery, { loading: getMyBookingsLoading, data: myBookingsData }] = useLazyQuery(GET_MY_BOOKINGS);
  const [getPendingBookingsQuery, { loading: getPendingLoading, data: pendingData }] = useLazyQuery(GET_PENDING_BOOKINGS);
  const [getConfirmedBookingsQuery, { loading: getConfirmedLoading, data: confirmedData }] = useLazyQuery(GET_CONFIRMED_BOOKINGS);
  const [getBookingsByDateRangeQuery, { loading: getDateRangeLoading, data: dateRangeData }] = useLazyQuery(GET_BOOKINGS_BY_DATE_RANGE);

  // Sync query data to state
  useEffect(() => {
    if (bookingData) setCurrentData(bookingData);
    else if (myBookingsData) setCurrentData(myBookingsData);
    else if (pendingData) setCurrentData(pendingData);
    else if (confirmedData) setCurrentData(confirmedData);
    else if (dateRangeData) setCurrentData(dateRangeData);
  }, [bookingData, myBookingsData, pendingData, confirmedData, dateRangeData]);

  // ============== MUTATIONS ==============
  
  const [createBookingMutation, { loading: createLoading }] = useMutation(CREATE_BOOKING);
  const [createVenueBookingMutation, { loading: createVenueLoading }] = useMutation(CREATE_VENUE_BOOKING);
  const [createFarmhouseBookingMutation, { loading: createFarmhouseLoading }] = useMutation(CREATE_FARMHOUSE_BOOKING);
  const [createCateringBookingMutation, { loading: createCateringLoading }] = useMutation(CREATE_CATERING_BOOKING);
  const [createPhotographyBookingMutation, { loading: createPhotographyLoading }] = useMutation(CREATE_PHOTOGRAPHY_BOOKING);
  const [requestVisitMutation, { loading: requestVisitLoading }] = useMutation(REQUEST_VISIT);
  const [updatePaymentMutation, { loading: updatePaymentLoading }] = useMutation(UPDATE_PAYMENT);
  const [payAdvanceMutation, { loading: payAdvanceLoading }] = useMutation(PAY_ADVANCE);
  const [payFullMutation, { loading: payFullLoading }] = useMutation(PAY_FULL);
  const [payBalanceMutation, { loading: payBalanceLoading }] = useMutation(PAY_BALANCE);
  const [cancelBookingMutation, { loading: cancelLoading }] = useMutation(CANCEL_BOOKING);

  // ============== QUERY FUNCTIONS ==============
  
  const getBooking = useCallback(async (id: string) => {
    try {
      const result = await getBookingQuery({
        variables: { id },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      return (result.data as any)?.booking;
    } catch (error: any) {
      console.error('❌ Error fetching booking:', error);
      toast.error(error.message || 'Failed to fetch booking');
      throw error;
    }
  }, [getBookingQuery, token]);

  const getMyBookings = useCallback(async (filters?: BookingFiltersInput) => {
    try {
      const result = await getMyBookingsQuery({
        variables: { filters },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      return (result.data as any)?.myBookings;
    } catch (error: any) {
      console.error('❌ Error fetching my bookings:', error);
      toast.error(error.message || 'Failed to fetch bookings');
      throw error;
    }
  }, [getMyBookingsQuery, token]);

  const getPendingBookings = useCallback(async () => {
    try {
      const result = await getPendingBookingsQuery({
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      return (result.data as any)?.myBookings;
    } catch (error: any) {
      console.error('❌ Error fetching pending bookings:', error);
      toast.error(error.message || 'Failed to fetch pending bookings');
      throw error;
    }
  }, [getPendingBookingsQuery, token]);

  const getConfirmedBookings = useCallback(async () => {
    try {
      const result = await getConfirmedBookingsQuery({
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      return (result.data as any)?.myBookings;
    } catch (error: any) {
      console.error('❌ Error fetching confirmed bookings:', error);
      toast.error(error.message || 'Failed to fetch confirmed bookings');
      throw error;
    }
  }, [getConfirmedBookingsQuery, token]);

  const getBookingsByDateRange = useCallback(async (from: string, to: string, limit?: number) => {
    try {
      const result = await getBookingsByDateRangeQuery({
        variables: { from, to, limit },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      return (result.data as any)?.myBookings;
    } catch (error: any) {
      console.error('❌ Error fetching bookings by date range:', error);
      toast.error(error.message || 'Failed to fetch bookings');
      throw error;
    }
  }, [getBookingsByDateRangeQuery, token]);

  // ============== MUTATION FUNCTIONS ==============
  
  const createBooking = useCallback(async (input: CreateBookingInput) => {
    try {
      console.log('🎫 Creating booking:', input);
      const result = await createBookingMutation({
        variables: { input },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Booking created successfully!');
      console.log('✅ Booking created:', result.data);
      return (result.data as any)?.createBooking;
    } catch (error: any) {
      console.error('❌ Error creating booking:', error);
      toast.error(error.message || 'Failed to create booking');
      throw error;
    }
  }, [createBookingMutation, token]);

  const createVenueBooking = useCallback(async (variables: any) => {
    try {
      const result = await createVenueBookingMutation({
        variables,
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Venue booking created successfully!');
      return (result.data as any)?.createBooking;
    } catch (error: any) {
      console.error('❌ Error creating venue booking:', error);
      toast.error(error.message || 'Failed to create venue booking');
      throw error;
    }
  }, [createVenueBookingMutation, token]);

  const createFarmhouseBooking = useCallback(async (variables: any) => {
    try {
      const result = await createFarmhouseBookingMutation({
        variables,
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Farmhouse booking created successfully!');
      return (result.data as any)?.createBooking;
    } catch (error: any) {
      console.error('❌ Error creating farmhouse booking:', error);
      toast.error(error.message || 'Failed to create farmhouse booking');
      throw error;
    }
  }, [createFarmhouseBookingMutation, token]);

  const createCateringBooking = useCallback(async (variables: any) => {
    try {
      const result = await createCateringBookingMutation({
        variables,
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Catering booking created successfully!');
      return (result.data as any)?.createBooking;
    } catch (error: any) {
      console.error('❌ Error creating catering booking:', error);
      toast.error(error.message || 'Failed to create catering booking');
      throw error;
    }
  }, [createCateringBookingMutation, token]);

  const createPhotographyBooking = useCallback(async (variables: any) => {
    try {
      const result = await createPhotographyBookingMutation({
        variables,
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Photography booking created successfully!');
      return (result.data as any)?.createBooking;
    } catch (error: any) {
      console.error('❌ Error creating photography booking:', error);
      toast.error(error.message || 'Failed to create photography booking');
      throw error;
    }
  }, [createPhotographyBookingMutation, token]);

  const requestVisit = useCallback(async (input: RequestVisitInput) => {
    try {
      const result = await requestVisitMutation({
        variables: { input },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Visit request sent successfully!');
      return (result.data as any)?.requestVisit;
    } catch (error: any) {
      console.error('❌ Error requesting visit:', error);
      toast.error(error.message || 'Failed to request visit');
      throw error;
    }
  }, [requestVisitMutation, token]);

  const updatePayment = useCallback(async (input: UpdatePaymentInput) => {
    try {
      const result = await updatePaymentMutation({
        variables: { input },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Payment updated successfully!');
      return (result.data as any)?.updatePayment;
    } catch (error: any) {
      console.error('❌ Error updating payment:', error);
      toast.error(error.message || 'Failed to update payment');
      throw error;
    }
  }, [updatePaymentMutation, token]);

  const payAdvance = useCallback(async (bookingId: string, advanceAmount: number) => {
    try {
      const result = await payAdvanceMutation({
        variables: { bookingId, advanceAmount },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Advance payment recorded successfully!');
      return (result.data as any)?.updatePayment;
    } catch (error: any) {
      console.error('❌ Error paying advance:', error);
      toast.error(error.message || 'Failed to record advance payment');
      throw error;
    }
  }, [payAdvanceMutation, token]);

  const payFull = useCallback(async (bookingId: string) => {
    try {
      const result = await payFullMutation({
        variables: { bookingId },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Full payment recorded successfully!');
      return (result.data as any)?.updatePayment;
    } catch (error: any) {
      console.error('❌ Error paying full amount:', error);
      toast.error(error.message || 'Failed to record full payment');
      throw error;
    }
  }, [payFullMutation, token]);

  const payBalance = useCallback(async (bookingId: string, balanceAmount: number) => {
    try {
      const result = await payBalanceMutation({
        variables: { bookingId, balanceAmount },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Balance payment recorded successfully!');
      return (result.data as any)?.updatePayment;
    } catch (error: any) {
      console.error('❌ Error paying balance:', error);
      toast.error(error.message || 'Failed to record balance payment');
      throw error;
    }
  }, [payBalanceMutation, token]);

  const cancelBooking = useCallback(async (input: CancelBookingInput) => {
    try {
      const result = await cancelBookingMutation({
        variables: { input },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Booking canceled successfully');
      return (result.data as any)?.cancelBooking;
    } catch (error: any) {
      console.error('❌ Error canceling booking:', error);
      toast.error(error.message || 'Failed to cancel booking');
      throw error;
    }
  }, [cancelBookingMutation, token]);

  const loading = 
    getBookingLoading || 
    getMyBookingsLoading || 
    getPendingLoading || 
    getConfirmedLoading || 
    getDateRangeLoading ||
    createLoading ||
    createVenueLoading ||
    createFarmhouseLoading ||
    createCateringLoading ||
    createPhotographyLoading ||
    requestVisitLoading ||
    updatePaymentLoading ||
    payAdvanceLoading ||
    payFullLoading ||
    payBalanceLoading ||
    cancelLoading;

  return {
    // Data
    data: currentData,
    loading,
    
    // Query functions
    getBooking,
    getMyBookings,
    getPendingBookings,
    getConfirmedBookings,
    getBookingsByDateRange,
    
    // Mutation functions
    createBooking,
    createVenueBooking,
    createFarmhouseBooking,
    createCateringBooking,
    createPhotographyBooking,
    requestVisit,
    updatePayment,
    payAdvance,
    payFull,
    payBalance,
    cancelBooking,
  };
};

// ============================================
// VENDOR BOOKING HOOK
// ============================================
export const useVendorBooking = () => {
  const [currentData, setCurrentData] = useState<any>(null);
  const token = getAuthToken();

  // ============== QUERIES ==============
  
  const [getVendorBookingsQuery, { loading: getVendorBookingsLoading, data: vendorBookingsData }] = useLazyQuery(GET_VENDOR_BOOKINGS);
  const [getVendorBookingsByServiceQuery, { loading: getByServiceLoading, data: byServiceData }] = useLazyQuery(GET_VENDOR_BOOKINGS_BY_SERVICE);
  const [getVendorVisitingRequestsQuery, { loading: getVisitRequestsLoading, data: visitRequestsData }] = useLazyQuery(GET_VENDOR_VISITING_REQUESTS);
  const [getVendorScheduledVisitsQuery, { loading: getScheduledVisitsLoading, data: scheduledVisitsData }] = useLazyQuery(GET_VENDOR_SCHEDULED_VISITS);

  // Sync query data to state
  useEffect(() => {
    if (vendorBookingsData) {
      console.log('📊 Vendor bookings data updated:', vendorBookingsData);
      setCurrentData(vendorBookingsData);
    } else if (byServiceData) setCurrentData(byServiceData);
    else if (visitRequestsData) setCurrentData(visitRequestsData);
    else if (scheduledVisitsData) setCurrentData(scheduledVisitsData);
  }, [vendorBookingsData, byServiceData, visitRequestsData, scheduledVisitsData]);

  // ============== MUTATIONS ==============
  
  const [scheduleVisitMutation, { loading: scheduleVisitLoading }] = useMutation(SCHEDULE_VISIT);
  const [completeVisitMutation, { loading: completeVisitLoading }] = useMutation(COMPLETE_VISIT);
  const [updatePaymentMutation, { loading: updatePaymentLoading }] = useMutation(UPDATE_PAYMENT);
  const [cancelBookingMutation, { loading: cancelLoading }] = useMutation(CANCEL_BOOKING);

  // ============== QUERY FUNCTIONS ==============
  
  const getVendorBookings = useCallback(async (filters?: BookingFiltersInput) => {
    try {
      const result = await getVendorBookingsQuery({
        variables: { filters },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      console.log('✅ Vendor bookings fetched:', result.data);
      return (result.data as any)?.vendorBookings;
    } catch (error: any) {
      console.error('❌ Error fetching vendor bookings:', error);
      toast.error(error.message || 'Failed to fetch vendor bookings');
      throw error;
    }
  }, [getVendorBookingsQuery, token]);

  const getVendorBookingsByService = useCallback(async (serviceType: string, limit?: number) => {
    try {
      const result = await getVendorBookingsByServiceQuery({
        variables: { serviceType, limit },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      return (result.data as any)?.vendorBookings;
    } catch (error: any) {
      console.error('❌ Error fetching bookings by service:', error);
      toast.error(error.message || 'Failed to fetch bookings');
      throw error;
    }
  }, [getVendorBookingsByServiceQuery, token]);

  const getVendorVisitingRequests = useCallback(async (filters?: BookingFiltersInput) => {
    try {
      const result = await getVendorVisitingRequestsQuery({
        variables: { filters },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      return (result.data as any)?.vendorVisitingRequests;
    } catch (error: any) {
      console.error('❌ Error fetching visit requests:', error);
      toast.error(error.message || 'Failed to fetch visit requests');
      throw error;
    }
  }, [getVendorVisitingRequestsQuery, token]);

  const getVendorScheduledVisits = useCallback(async (filters?: BookingFiltersInput) => {
    try {
      const result = await getVendorScheduledVisitsQuery({
        variables: { filters },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      return (result.data as any)?.vendorScheduledVisits;
    } catch (error: any) {
      console.error('❌ Error fetching scheduled visits:', error);
      toast.error(error.message || 'Failed to fetch scheduled visits');
      throw error;
    }
  }, [getVendorScheduledVisitsQuery, token]);

  // ============== MUTATION FUNCTIONS ==============
  
  const scheduleVisit = useCallback(async (input: ScheduleVisitInput) => {
    try {
      const result = await scheduleVisitMutation({
        variables: { input },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Visit scheduled successfully!');
      return (result.data as any)?.scheduleVisit;
    } catch (error: any) {
      console.error('❌ Error scheduling visit:', error);
      toast.error(error.message || 'Failed to schedule visit');
      throw error;
    }
  }, [scheduleVisitMutation, token]);

  const completeVisit = useCallback(async (bookingId: string) => {
    try {
      const result = await completeVisitMutation({
        variables: { bookingId },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Visit marked as completed!');
      return (result.data as any)?.completeVisit;
    } catch (error: any) {
      console.error('❌ Error completing visit:', error);
      toast.error(error.message || 'Failed to complete visit');
      throw error;
    }
  }, [completeVisitMutation, token]);

  const updatePayment = useCallback(async (input: UpdatePaymentInput) => {
    try {
      const result = await updatePaymentMutation({
        variables: { input },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Payment updated successfully!');
      return (result.data as any)?.updatePayment;
    } catch (error: any) {
      console.error('❌ Error updating payment:', error);
      toast.error(error.message || 'Failed to update payment');
      throw error;
    }
  }, [updatePaymentMutation, token]);

  const cancelBooking = useCallback(async (input: CancelBookingInput) => {
    try {
      const result = await cancelBookingMutation({
        variables: { input },
        context: { headers: { Authorization: `Bearer ${token}` } }
      });
      toast.success('Booking canceled successfully');
      return (result.data as any)?.cancelBooking;
    } catch (error: any) {
      console.error('❌ Error canceling booking:', error);
      toast.error(error.message || 'Failed to cancel booking');
      throw error;
    }
  }, [cancelBookingMutation, token]);

  const loading = 
    getVendorBookingsLoading || 
    getByServiceLoading || 
    getVisitRequestsLoading || 
    getScheduledVisitsLoading ||
    scheduleVisitLoading ||
    completeVisitLoading ||
    updatePaymentLoading ||
    cancelLoading;

  return {
    // Data
    data: currentData,
    loading,
    
    // Query functions
    getVendorBookings,
    getVendorBookingsByService,
    getVendorVisitingRequests,
    getVendorScheduledVisits,
    
    // Mutation functions
    scheduleVisit,
    completeVisit,
    updatePayment,
    cancelBooking,
  };
};
