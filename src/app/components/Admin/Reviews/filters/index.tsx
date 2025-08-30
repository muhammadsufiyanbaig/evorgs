"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Filter, X } from "lucide-react"
import { format } from "date-fns"
import type { ReviewFilters, ServiceType, ModerationStatus } from "@/utils/interfaces"

interface ReviewsFiltersProps {
  filters: ReviewFilters
  onFiltersChange: (filters: ReviewFilters) => void
  onClearFilters: () => void
}

export function ReviewsFilters({ filters, onFiltersChange, onClearFilters }: ReviewsFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dateFrom, setDateFrom] = useState<Date | undefined>(filters.dateFrom ? new Date(filters.dateFrom) : undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(filters.dateTo ? new Date(filters.dateTo) : undefined)

  const serviceTypes: ServiceType[] = ["VENUE", "CATERING", "PHOTOGRAPHY", "FARMHOUSE", "BOOKING", "OTHER"]
  const moderationStatuses: ModerationStatus[] = ["PENDING", "APPROVED", "REJECTED", "FLAGGED", "UNDER_REVIEW"]

  const handleFilterChange = (key: keyof ReviewFilters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    })
  }

  const handleRatingChange = (rating: number) => {
    const currentRatings = filters.rating || []
    const newRatings = currentRatings.includes(rating)
      ? currentRatings.filter((r) => r !== rating)
      : [...currentRatings, rating]

    handleFilterChange("rating", newRatings.length > 0 ? newRatings : undefined)
  }

  const handleServiceTypeChange = (serviceType: ServiceType) => {
    const currentTypes = filters.serviceType || []
    const newTypes = currentTypes.includes(serviceType)
      ? currentTypes.filter((t) => t !== serviceType)
      : [...currentTypes, serviceType]

    handleFilterChange("serviceType", newTypes.length > 0 ? newTypes : undefined)
  }

  const handleModerationStatusChange = (status: ModerationStatus) => {
    const currentStatuses = filters.moderationStatus || []
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter((s) => s !== status)
      : [...currentStatuses, status]

    handleFilterChange("moderationStatus", newStatuses.length > 0 ? newStatuses : undefined)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.searchTerm) count++
    if (filters.rating?.length) count++
    if (filters.serviceType?.length) count++
    if (filters.moderationStatus?.length) count++
    if (filters.isVerified !== undefined) count++
    if (filters.isPublished !== undefined) count++
    if (filters.hasResponse !== undefined) count++
    if (filters.dateFrom) count++
    if (filters.dateTo) count++
    return count
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Search reviews..."
          value={filters.searchTerm || ""}
          onChange={(e) => handleFilterChange("searchTerm", e.target.value || undefined)}
          className="max-w-sm"
        />

        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filters
              {getActiveFiltersCount() > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Filters</h4>
                <Button variant="ghost" size="sm" onClick={onClearFilters}>
                  Clear all
                </Button>
              </div>

              {/* Rating Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant={filters.rating?.includes(rating) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleRatingChange(rating)}
                      className="h-8 w-8 p-0"
                    >
                      {rating}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Service Type Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Service Type</Label>
                <div className="flex flex-wrap gap-2">
                  {serviceTypes.map((type) => (
                    <Button
                      key={type}
                      variant={filters.serviceType?.includes(type) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleServiceTypeChange(type)}
                      className="h-8 text-xs capitalize"
                    >
                      {type.toLowerCase()}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Status Filters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Verification</Label>
                  <Select
                    value={filters.isVerified === undefined ? "all" : filters.isVerified ? "verified" : "unverified"}
                    onValueChange={(value) =>
                      handleFilterChange("isVerified", value === "all" ? undefined : value === "verified")
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="unverified">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Publication</Label>
                  <Select
                    value={filters.isPublished === undefined ? "all" : filters.isPublished ? "published" : "draft"}
                    onValueChange={(value) =>
                      handleFilterChange("isPublished", value === "all" ? undefined : value === "published")
                    }
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Moderation Status */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Moderation Status</Label>
                <div className="flex flex-wrap gap-2">
                  {moderationStatuses.map((status) => (
                    <Button
                      key={status}
                      variant={filters.moderationStatus?.includes(status) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleModerationStatusChange(status)}
                      className="h-8 text-xs capitalize"
                    >
                      {status.toLowerCase().replace("_", " ")}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">From Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 justify-start text-left font-normal bg-transparent"
                      >
                        <CalendarIcon className="mr-2 h-3 w-3" />
                        {dateFrom ? format(dateFrom, "MMM dd") : "Select"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateFrom}
                        onSelect={(date) => {
                          setDateFrom(date)
                          handleFilterChange("dateFrom", date?.toISOString())
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">To Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 justify-start text-left font-normal bg-transparent"
                      >
                        <CalendarIcon className="mr-2 h-3 w-3" />
                        {dateTo ? format(dateTo, "MMM dd") : "Select"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateTo}
                        onSelect={(date) => {
                          setDateTo(date)
                          handleFilterChange("dateTo", date?.toISOString())
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {getActiveFiltersCount() > 0 && (
        <Button variant="ghost" size="sm" onClick={onClearFilters} className="gap-2">
          <X className="h-4 w-4" />
          Clear filters
        </Button>
      )}
    </div>
  )
}
