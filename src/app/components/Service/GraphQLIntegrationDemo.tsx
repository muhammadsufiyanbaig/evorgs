// Example component demonstrating GraphQL services integration
"use client";

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CateringGraphQL, 
  FarmHouseGraphQL, 
  PhotographyGraphQL, 
  VenueGraphQL,
  type PaginationInput 
} from '@/utils/graphql';

const ServicesIntegrationDemo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Pagination configuration
  const pagination: PaginationInput = { page: 1, limit: 6 };

  // Catering packages query
  const { 
    data: cateringData, 
    loading: cateringLoading, 
    error: cateringError 
  } = useQuery(CateringGraphQL.GET_CATERING_PACKAGES, {
    variables: {
      filters: searchTerm ? { 
        location: selectedLocation || undefined 
      } : {},
      pagination
    }
  }) as { data: any, loading: boolean, error: any };

  // Farm houses query
  const { 
    data: farmhouseData, 
    loading: farmhouseLoading 
  } = useQuery(FarmHouseGraphQL.GET_FARMHOUSES, {
    variables: {
      filters: {},
      pagination
    }
  }) as { data: any, loading: boolean };

  // Photography packages query
  const { 
    data: photographyData, 
    loading: photographyLoading 
  } = useQuery(PhotographyGraphQL.GET_PHOTOGRAPHY_PACKAGES, {
    variables: {
      filters: {},
      pagination
    }
  }) as { data: any, loading: boolean };

  // Venues query
  const { 
    data: venueData, 
    loading: venueLoading 
  } = useQuery(VenueGraphQL.GET_VENUES, {
    variables: {
      filters: {},
      pagination
    }
  }) as { data: any, loading: boolean };

  // Featured packages queries
  const { data: featuredCatering } = useQuery(CateringGraphQL.GET_FEATURED_CATERING_PACKAGES, {
    variables: { limit: 3 }
  }) as { data: any };

  const { data: featuredVenues } = useQuery(VenueGraphQL.GET_FEATURED_VENUES, {
    variables: { limit: 3 }
  }) as { data: any };

  const ServiceCard = ({ service, type }: { service: any, type: string }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{service.packageName || service.venueName || service.farmHouseName}</CardTitle>
          <Badge variant="secondary">{type}</Badge>
        </div>
        {service.rating && (
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <span className="text-sm">{service.rating} ({service.reviewCount} reviews)</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {service.description}
        </p>
        <div className="space-y-2">
          {service.pricePerPerson && (
            <p className="text-lg font-semibold text-orange-600">
              ${service.pricePerPerson}/person
            </p>
          )}
          {service.pricePerHour && (
            <p className="text-lg font-semibold text-orange-600">
              ${service.pricePerHour}/hour
            </p>
          )}
          {service.perNightPrice && (
            <p className="text-lg font-semibold text-orange-600">
              ${service.perNightPrice}/night
            </p>
          )}
          {service.capacity && (
            <p className="text-sm text-gray-500">Capacity: {service.capacity}</p>
          )}
          {service.location && (
            <p className="text-sm text-gray-500">📍 {service.location}</p>
          )}
        </div>
        <Button className="w-full mt-4" variant="outline">
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  const LoadingGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="h-64 animate-pulse">
          <CardHeader>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-8 bg-gray-200 rounded mt-4"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 mt-20">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
            Find Your Perfect
            <span className="text-orange-500 block">Service</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Discover amazing venues, photographers, caterers, and farmhouses for your special events
          </p>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <Input
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Location..."
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="flex-1 md:max-w-xs"
            />
            <Button className="bg-orange-500 hover:bg-orange-600">
              Search
            </Button>
          </div>
        </div>

        {/* Featured Services */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(featuredCatering as any)?.getFeaturedCateringPackages?.slice(0, 2)?.map((service: any) => (
              <ServiceCard key={service.id} service={service} type="Catering" />
            )) || []}
            {(featuredVenues as any)?.getFeaturedVenues?.slice(0, 1)?.map((service: any) => (
              <ServiceCard key={service.id} service={service} type="Venue" />
            )) || []}
          </div>
        </section>

        {/* Service Categories */}
        <Tabs defaultValue="catering" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="catering">Catering</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="photography">Photography</TabsTrigger>
            <TabsTrigger value="farmhouses">Farm Houses</TabsTrigger>
          </TabsList>

          <TabsContent value="catering">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Catering Packages</h2>
                {cateringData?.cateringPackages?.totalCount && (
                  <p className="text-gray-600">
                    {cateringData.cateringPackages.totalCount} packages found
                  </p>
                )}
              </div>
              
              {cateringLoading ? (
                <LoadingGrid />
              ) : cateringError ? (
                <div className="text-center py-12">
                  <p className="text-red-600">Error loading catering packages</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cateringData?.cateringPackages?.packages?.map((service: any) => (
                    <ServiceCard key={service.id} service={service} type="Catering" />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="venues">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Venues</h2>
                {venueData?.venues?.totalCount && (
                  <p className="text-gray-600">
                    {venueData.venues.totalCount} venues found
                  </p>
                )}
              </div>
              
              {venueLoading ? (
                <LoadingGrid />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {venueData?.venues?.venues?.map((service: any) => (
                    <ServiceCard key={service.id} service={service} type="Venue" />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="photography">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Photography Packages</h2>
                {photographyData?.photographyPackages?.totalCount && (
                  <p className="text-gray-600">
                    {photographyData.photographyPackages.totalCount} packages found
                  </p>
                )}
              </div>
              
              {photographyLoading ? (
                <LoadingGrid />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {photographyData?.photographyPackages?.packages?.map((service: any) => (
                    <ServiceCard key={service.id} service={service} type="Photography" />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="farmhouses">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Farm Houses</h2>
                {farmhouseData?.farmHouses?.totalCount && (
                  <p className="text-gray-600">
                    {farmhouseData.farmHouses.totalCount} farmhouses found
                  </p>
                )}
              </div>
              
              {farmhouseLoading ? (
                <LoadingGrid />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {farmhouseData?.farmHouses?.farmHouses?.map((service: any) => (
                    <ServiceCard key={service.id} service={service} type="Farm House" />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Stats Section */}
        <section className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Platform Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">
                {cateringData?.cateringPackages?.totalCount || 0}
              </div>
              <div className="text-gray-600">Catering Packages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">
                {venueData?.venues?.totalCount || 0}
              </div>
              <div className="text-gray-600">Venues</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">
                {photographyData?.photographyPackages?.totalCount || 0}
              </div>
              <div className="text-gray-600">Photography</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">
                {farmhouseData?.farmHouses?.totalCount || 0}
              </div>
              <div className="text-gray-600">Farm Houses</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesIntegrationDemo;
