'use client'

import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import ServiceProfileComponent from "@/app/components/Home/ServiceProfile";
import { useUserCatering } from '@/hooks/useGraphQLServices';
import { useUserFarmhouse } from '@/hooks/useGraphQLFarmhouse';
import { useUserVenue } from '@/hooks/useGraphQLVenue';
import { useUserPhotography } from '@/hooks/useGraphQLPhotography';

const ServiceProfile = () => {
  const params = useParams();
  const serviceId = params.service as string;
  
  const [serviceType, setServiceType] = useState<'catering' | 'farmhouse' | 'venue' | 'photography' | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { getCateringPackage, loading: cateringLoading, data: cateringData } = useUserCatering();
  const { getFarmhouse, loading: farmhouseLoading, data: farmhouseData } = useUserFarmhouse();
  const { getVenue, loading: venueLoading, data: venueData } = useUserVenue();
  const { getPhotographyPackage, loading: photographyLoading, data: photographyData } = useUserPhotography();
  
  useEffect(() => {
    if (!serviceId) return;
    
    // Determine service type from URL pattern or try loading all types
    const loadService = async () => {
      try {
        // Try venue first
        await getVenue(serviceId);
        
        // Give it a moment to update the data state
        setTimeout(() => {
          const vData = venueData as any;
          if (vData?.venue) {
            setServiceType('venue');
          } else {
            // Try photography
            getPhotographyPackage(serviceId);
            setTimeout(() => {
              const pData = photographyData as any;
              if (pData?.photographyPackage) {
                setServiceType('photography');
              } else {
                // Try farmhouse
                getFarmhouse(serviceId);
                setTimeout(() => {
                  const fData = farmhouseData as any;
                  if (fData?.farmhouse) {
                    setServiceType('farmhouse');
                  } else {
                    // Try catering as last option
                    getCateringPackage(serviceId);
                    setServiceType('catering');
                  }
                }, 300);
              }
            }, 300);
          }
        }, 300);
        
      } catch (err) {
        console.error('Error loading service:', err);
        // Try fallbacks
        try {
          await getPhotographyPackage(serviceId);
          if (photographyData?.photographyPackage) {
            setServiceType('photography');
          } else {
            await getFarmhouse(serviceId);
            if (farmhouseData?.farmhouse) {
              setServiceType('farmhouse');
            } else {
              await getCateringPackage(serviceId);
              setServiceType('catering');
            }
          }
        } catch (fallbackErr) {
          setError('Service not found');
        }
      }
    };
    
    loadService();
  }, [serviceId]);
  
  // Determine which data to use
  const serviceData = 
    serviceType === 'venue' ? (venueData as any)?.venue :
    serviceType === 'photography' ? (photographyData as any)?.photographyPackage :
    serviceType === 'farmhouse' ? (farmhouseData as any)?.farmhouse : 
    serviceType === 'catering' ? (cateringData as any)?.cateringPackage : 
    null;
  
  const loading = cateringLoading || farmhouseLoading || venueLoading || photographyLoading;
  
  if (loading && !serviceData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }
  
  if (error || (!loading && !serviceData)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Service not found'}</p>
          <button 
            onClick={() => window.history.back()} 
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <ServiceProfileComponent 
        serviceId={serviceId}
        serviceData={serviceData}
        serviceType={serviceType}
      />
    </>
  );
};

export default ServiceProfile;
