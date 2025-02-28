"use client"
import type React from "react"
import { useState } from "react"

import { Camera, Hotel, Utensils, School } from "lucide-react"
import CatalogSidebar from "./CatalogSidebar"
import AddCatalogModal from "./AddCatalog"
import CatalogSearchBar from "./CatalogSearchBar"
import CatalogGrid from "./CatalogGrid"

export default function VendorCatalog() {
  const [activeCategory, setActiveCategory] = useState("All Catalog")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newCatalogItem, setNewCatalogItem] = useState({
    title: "",
    description: "",
    categories: "",
    imageSrc: "",
  })

  const categories = [
    { name: "All Catalog", icon: Camera },
    { name: "Photography", icon: Camera },
    { name: "Venue", icon: Hotel },
    { name: "Catering", icon: Utensils },
    { name: "Farm House", icon: School },
  ]

  const [catalog, setCatalog] = useState([
    {
      id: 1,
      imageSrc: "/venue-category.jpg",
      title: "My new project",
      description: "A beautiful venue",
      categories: "Venue",
    },
    {
      id: 2,
      imageSrc: "/farmHouse-category.jpg",
      title: "Farm House",
      description: "Amazing farm house for rent",
      categories: "Farm House",
    },
    {
      id: 3,
      imageSrc: "/catering-category.jpg",
      title: "Catering",
      description: "Delicious catering services",
      categories: "Catering",
    },
    {
      id: 4,
      imageSrc: "/pic-2.jpg",
      title: "Photography",
      description: "Capture your memories",
      categories: "Photography",
    },
  ])

  const filteredPosts = catalog.filter(
    (post) =>
      (activeCategory === "All Catalog" || post.categories === activeCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCatalogItem((prev) => ({ ...prev, [name]: value }))
  }

  const handleCategoryChange = (value: string) => {
    setNewCatalogItem((prev) => ({ ...prev, categories: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setNewCatalogItem((prev) => ({ ...prev, imageSrc: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleAddCatalog = () => {
    if (newCatalogItem.title && newCatalogItem.description && newCatalogItem.categories) {
      setCatalog((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          ...newCatalogItem,
          imageSrc: newCatalogItem.imageSrc || "/placeholder.svg",
        },
      ])
      setIsAddModalOpen(false)
      setNewCatalogItem({
        title: "",
        description: "",
        categories: "",
        imageSrc: "",
      })
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <CatalogSidebar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        catalog={catalog}
        categories={categories}
      />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold">{activeCategory}</h1>
            <p className="text-gray-600">Browse vendors in different categories.</p>
          </div>
          <AddCatalogModal
            isOpen={isAddModalOpen}
            setIsOpen={setIsAddModalOpen}
            newCatalogItem={newCatalogItem}
            handleInputChange={handleInputChange}
            handleCategoryChange={handleCategoryChange}
            handleAddCatalog={handleAddCatalog}
            categories={categories}
            handleImageUpload={handleImageUpload}
          />
        </div>
        <CatalogSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <CatalogGrid filteredPosts={filteredPosts} />
      </div>
    </div>
  )
}

