import { create } from "zustand"
import type {  ReportsState } from "@/utils/interfaces"

export const useReportsStore = create<ReportsState>((set) => ({
  reports: [
    {
      id: "1",
      title: "Performance dashboard",
      description: "Dashboard of your business performance.",
      type: "dashboard",
      category: "All reports",
      isFavorite: false,
      createdBy: "Admin",
      icon: "chart",
    },
    {
      id: "2",
      title: "Online presence dashboard",
      description: "Online sales and online client performance",
      type: "dashboard",
      category: "Sales",
      isFavorite: false,
      createdBy: "Admin",
      icon: "chart",
    },
    {
      id: "3",
      title: "Sales summary",
      description: "Sales quantities and value, excluding gift card sales.",
      type: "report",
      category: "Sales",
      isFavorite: false,
      createdBy: "Admin",
      icon: "tag",
    },
    {
      id: "4",
      title: "Sales list",
      description: "Complete listing of all sales transactions.",
      type: "report",
      category: "Sales",
      isFavorite: false,
      createdBy: "Admin",
      icon: "tag",
    },
    {
      id: "5",
      title: "Sales log detail",
      description: "Detailed log of all sales activities.",
      type: "report",
      category: "Sales",
      isFavorite: false,
      createdBy: "Admin",
      icon: "tag",
    },
  ],
  favorites: new Set(),
  activeCategory: "All reports",
  searchQuery: "",
  createdByFilter: null,
  currentView: "all",

  toggleFavorite: (id) =>
    set((state) => {
      const newFavorites = new Set(state.favorites)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return { favorites: newFavorites }
    }),

  setActiveCategory: (category) => set({ activeCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setCreatedByFilter: (creator) => set({ createdByFilter: creator }),
  setCurrentView: (view) => set({ currentView: view }),
}))

