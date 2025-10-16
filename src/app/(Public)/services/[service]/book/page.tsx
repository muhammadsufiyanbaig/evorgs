'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import BookingDetails from '@/app/components/Home/BookingDetails'
import { useUserBooking } from '@/hooks/useGraphQLBooking'
import { useUserCatering } from '@/hooks/useGraphQLServices'
import { useUserFarmhouse } from '@/hooks/useGraphQLFarmhouse'
import { useUserVenue } from '@/hooks/useGraphQLVenue'
import { useUserPhotography } from '@/hooks/useGraphQLPhotography'

const ServiceBook = () => {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const serviceId = params.service as string
  
  const [serviceType, setServiceType] = useState<'venue' | 'farmhouse' | 'catering' | 'photography' | null>(null)
  const [serviceData, setServiceData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  
  // Booking hooks
  const {
    createVenueBooking,
    createFarmhouseBooking,
    createCateringBooking,
    createPhotographyBooking,
    loading: bookingLoading
  } = useUserBooking()
  
  // Service hooks
  const { getCateringPackage, loading: cateringLoading, data: cateringData } = useUserCatering()
  const { getFarmhouse, loading: farmhouseLoading, data: farmhouseData } = useUserFarmhouse()
  const { getVenue, loading: venueLoading, data: venueData } = useUserVenue()
  const { getPhotographyPackage, loading: photographyLoading, data: photographyData } = useUserPhotography()
  
  // Try to determine service type from search params or by fetching
  useEffect(() => {
    if (!serviceId) return
    
    const typeParam = searchParams.get('type')
    if (typeParam && ['venue', 'farmhouse', 'catering', 'photography'].includes(typeParam)) {
      setServiceType(typeParam as any)
    }
    
    const loadService = async () => {
      try {
        // Try each service type
        await Promise.all([
          getVenue(serviceId),
          getPhotographyPackage(serviceId),
          getFarmhouse(serviceId),
          getCateringPackage(serviceId)
        ])
      } catch (err) {
        console.error('Error loading service:', err)
      }
    }
    
    loadService()
  }, [serviceId, searchParams])
  
  // Update service data when any query completes
  useEffect(() => {
    const vData = venueData as any
    const pData = photographyData as any
    const fData = farmhouseData as any
    const cData = cateringData as any
    
    if (vData?.venue) {
      setServiceType('venue')
      setServiceData(vData.venue)
    } else if (pData?.photographyPackage) {
      setServiceType('photography')
      setServiceData(pData.photographyPackage)
    } else if (fData?.farmhouse) {
      setServiceType('farmhouse')
      setServiceData(fData.farmhouse)
    } else if (cData?.cateringPackage) {
      setServiceType('catering')
      setServiceData(cData.cateringPackage)
    }
  }, [venueData, photographyData, farmhouseData, cateringData])
  
  const loading = cateringLoading || farmhouseLoading || venueLoading || photographyLoading || bookingLoading
  
  if (loading && !serviceData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    )
  }
  
  if (error || (!loading && !serviceData)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Service Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'Unable to load service details'}</p>
          <button
            onClick={() => router.push('/services')}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Back to Services
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <>
      <BookingDetails 
        serviceId={serviceId}
        serviceType={serviceType}
        serviceData={serviceData}
        onCreateBooking={{
          venue: createVenueBooking,
          farmhouse: createFarmhouseBooking,
          catering: createCateringBooking,
          photography: createPhotographyBooking
        }}
        loading={bookingLoading}
      />
    </>
  )
}

export default ServiceBook