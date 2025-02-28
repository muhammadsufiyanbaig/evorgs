"use client"
import { Search, BarChart3, Star, Layout, Target, ChevronDown, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useReportsStore } from "@/utils/store"
import type { Category } from "@/utils/interfaces"

export default function VendorReport() {
  const {
    reports,
    favorites,
    activeCategory,
    searchQuery,
    createdByFilter,
    currentView,
    toggleFavorite,
    setActiveCategory,
    setSearchQuery,
    setCreatedByFilter,
    setCurrentView,
  } = useReportsStore()

  const categories: Category[] = ["All reports", "Sales", "Finance", "Appointments", "Team", "Clients", "Inventory"]

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "All reports" || report.category === activeCategory
    const matchesCreator = !createdByFilter || report.createdBy === createdByFilter
    const matchesView =
      currentView === "all" ||
      (currentView === "favourites" && favorites.has(report.id)) ||
      (currentView === "dashboards" && report.type === "dashboard") ||
      (currentView === "standard" && report.type === "report")
    return matchesSearch && matchesCategory && matchesCreator && matchesView
  })

  const getHeading = () => {
    switch (currentView) {
      case "favourites":
        return "Favourites"
      case "dashboards":
        return "Dashboards"
      case "standard":
        return "Standard Reports"
      default:
        return "Reporting and analytics"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r bg-white p-6">
        <h2 className="mb-6 text-xl font-semibold">Reports</h2>
        <nav className="space-y-2">
          <Button
            variant="ghost"
            className={cn("w-full justify-start gap-2", currentView === "all" ? "bg-orange-50 text-orange-900" : "")}
            onClick={() => {
              setCurrentView("all")
              setActiveCategory("All reports")
            }}
          >
            <Layout className="h-4 w-4" />
            All reports
            <span className="ml-auto rounded-full bg-orange-100 px-2 py-0.5 text-xs">{reports.length}</span>
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              currentView === "favourites" ? "bg-orange-50 text-orange-900" : "",
            )}
            onClick={() => setCurrentView("favourites")}
          >
            <Star className="h-4 w-4" />
            Favourites
            <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs">{favorites.size}</span>
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              currentView === "dashboards" ? "bg-orange-50 text-orange-900" : "",
            )}
            onClick={() => setCurrentView("dashboards")}
          >
            <BarChart3 className="h-4 w-4" />
            Dashboards
            <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs">
              {reports.filter((r) => r.type === "dashboard").length}
            </span>
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2",
              currentView === "standard" ? "bg-orange-50 text-orange-900" : "",
            )}
            onClick={() => setCurrentView("standard")}
          >
            <Layout className="h-4 w-4" />
            Standard
            <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs">
              {reports.filter((r) => r.type === "report").length}
            </span>
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Target className="h-4 w-4" />
            Targets
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold">{getHeading()}</h1>
          <p className="text-gray-600">
            Access all of your Fresha reports.{" "}
            <a href="#" className="text-orange-600 hover:underline">
              Learn more
            </a>
          </p>
        </div>

        {/* Search and filters */}
        <div className="mb-8 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Search by report name or description"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Created by
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCreatedByFilter(null)}>All creators</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCreatedByFilter("Admin")}>Admin</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Category
          </Button>
        </div>

        {/* Category tabs */}
        {currentView === "all" && (
          <div className="mb-6 border-b">
            <div className="flex gap-6">
              {categories.map((category) => (
                <button
                  key={category}
                  className={cn(
                    "border-b-2 pb-2 font-medium",
                    activeCategory === category
                      ? "border-orange-600 text-orange-600"
                      : "border-transparent text-gray-600 hover:text-gray-900",
                  )}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reports grid */}
        <div className="grid gap-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="flex items-start justify-between rounded-lg border bg-white p-4 hover:shadow-sm"
            >
              <div className="flex gap-4">
                {report.icon === "chart" ? (
                  <BarChart3 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <Layout className="h-5 w-5 text-orange-500" />
                )}
                <div>
                  <h3 className="font-medium">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(report.id)}
                className={cn(
                  "text-gray-400 hover:text-gray-900",
                  favorites.has(report.id) ? "text-yellow-400 hover:text-yellow-500" : "",
                )}
              >
                <Star className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

