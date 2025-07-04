"use client"
import type React from "react"
import ServicesGrid from "@/app/components/Vendor/VendorServices/ServicesGrid"
import { useServices } from "@/app/components/Vendor/VendorServices/ServiceContext"

export default function VendorServicesPage() {
  const { filteredPosts } = useServices()

  return (
    <div>
      <ServicesGrid filteredPosts={filteredPosts} />
    </div>
  )
}