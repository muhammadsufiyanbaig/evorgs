'use client'

import React, { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import ServiceProfileComponent from "@/app/components/Home/ServiceProfile";
import { useUserCatering } from '@/hooks/useGraphQLServices';
import { useUserFarmhouse } from '@/hooks/useGraphQLFarmhouse';

const ServiceProfile = () => {
  const params = useParams();
  const serviceId = params.service as string;
  
  const [serviceType, setServiceType] = useState<'catering' | 'farmhouse' | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const { getCateringPackage, loading: cateringLoading, data: cateringData } = useUserCatering();
  const { getFarmhouse, loading: farmhouseLoading, data: farmhouseData } = useUserFarmhouse();
  
  useEffect(() => {
    if (!serviceId) return;
    
    // Determine service type from URL pattern or try both
    // For now, we'll try to load farmhouse first, then catering
    
    const loadService = async () => {
      try {
        // Try farmhouse first
        await getFarmhouse(serviceId);
        
        // Give it a moment to update the data state
        setTimeout(() => {
          if (farmhouseData?.farmhouse) {
            setServiceType('farmhouse');
          } else {
            // Try catering if farmhouse didn't work
            getCateringPackage(serviceId);
            setServiceType('catering');
          }
        }, 300);
        
      } catch (err) {
        console.error('Error loading service:', err);
        // Try catering as fallback
        try {
          await getCateringPackage(serviceId);
          setServiceType('catering');
        } catch (cateringErr) {
          setError('Service not found');
        }
      }
    };
    
    loadService();
  }, [serviceId]);
  
  // Determine which data to use
  const serviceData = serviceType === 'farmhouse' 
    ? farmhouseData?.farmhouse 
    : cateringData?.cateringPackage;
  
  const loading = cateringLoading || farmhouseLoading;
  
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
