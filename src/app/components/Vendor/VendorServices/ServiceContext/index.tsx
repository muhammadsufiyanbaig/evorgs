"use client"
import React, { createContext, useContext, useState } from "react"
import { Camera, Hotel, Utensils, School } from "lucide-react"
import type { LucideIcon } from "lucide-react"

type Category = {
  name: string
  icon: LucideIcon
}

type CatalogItem = {
  id: number
  imageSrc: string
  title: string
  description: string
  categories: string
}

type ServicesContextType = {
  activeCategory: string
  setActiveCategory: (category: string) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  catalog: CatalogItem[]
  setCatalog: React.Dispatch<React.SetStateAction<CatalogItem[]>>
  filteredPosts: CatalogItem[]
  categories: Category[]
  isAddModalOpen: boolean
  setIsAddModalOpen: (open: boolean) => void
  newCatalogItem: {
    title: string
    description: string
    categories: string
    imageSrc: string
  }
  setNewCatalogItem: React.Dispatch<React.SetStateAction<{
    title: string
    description: string
    categories: string
    imageSrc: string
  }>>
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleCategoryChange: (value: string) => void
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAddCatalog: () => void
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined)

export const useServices = () => {
  const context = useContext(ServicesContext)
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider")
  }
  return context
}

export const ServicesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState("All Services")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newCatalogItem, setNewCatalogItem] = useState({
    title: "",
    description: "",
    categories: "",
    imageSrc: "",
  })

  const categories: Category[] = [
    { name: "All Services", icon: Camera },
    { name: "Photography", icon: Camera },
    { name: "Venue", icon: Hotel },
    { name: "Catering", icon: Utensils },
    { name: "Farm House", icon: School },
  ]

  const [catalog, setCatalog] = useState<CatalogItem[]>([
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
      (activeCategory === "All Services" || post.categories === activeCategory) &&
      (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewCatalogItem((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCategoryChange = (value: string) => {
    setNewCatalogItem((prev) => ({
      ...prev,
      categories: value,
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setNewCatalogItem((prev) => ({
        ...prev,
        imageSrc: reader.result as string,
      }))
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
    <ServicesContext.Provider
      value={{
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        catalog,
        setCatalog,
        filteredPosts,
        categories,
        isAddModalOpen,
        setIsAddModalOpen,
        newCatalogItem,
        setNewCatalogItem,
        handleInputChange,
        handleCategoryChange,
        handleImageUpload,
        handleAddCatalog,
      }}
    >
      {children}
    </ServicesContext.Provider>
  )
}