"use client"
import React from "react"
import ServiceSidebar from "@/app/components/Vendor/VendorServices/ServiceSidebar"
import ServiceSearchBar from "@/app/components/Vendor/VendorServices/ServiceSearchBar"
import { ServicesProvider, useServices } from "@/app/components/Vendor/VendorServices/ServiceContext"

type ServicesLayoutProps = {
  children: React.ReactNode
}

function ServicesLayoutContent({ children }: ServicesLayoutProps) {
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    catalog,
    categories,
  } = useServices()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <ServiceSidebar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          catalog={catalog}
          categories={categories}
        />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{activeCategory}</h1>
              <p className="text-gray-600">Browse vendors in different categories.</p>
            </div>
          </div>
          
          <ServiceSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          {children}
        </main>
      </div>
    </div>
  )
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return (
    <ServicesProvider>
      <ServicesLayoutContent>{children}</ServicesLayoutContent>
    </ServicesProvider>
  )
}