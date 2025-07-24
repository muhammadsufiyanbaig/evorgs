"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDaysInMonth, getFirstDayOfMonth } from "@/utils/function"
import type { Event } from "@/utils/interfaces"

interface MiniCalendarProps {
  date: Date
  onDateSelect: (date: Date) => void
  events: Event[]
}

export function MiniCalendar({ date, onDateSelect, events }: MiniCalendarProps) {
  const month = date.getMonth()
  const year = date.getFullYear()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = (getFirstDayOfMonth(year, month) + 6) % 7
  const today = new Date()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const prevMonthDaysCount = firstDayOfMonth
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  const prevMonthDays = Array.from({ length: prevMonthDaysCount }, (_, i) => prevMonthLastDay - i).reverse()

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"]

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(date)
    newDate.setMonth(month + (direction === "next" ? 1 : -1))
    onDateSelect(newDate)
  }

  const dayHasEvent = (day: number, isCurrentMonth: boolean) => {
    const checkDate = isCurrentMonth ? new Date(year, month, day) : new Date(year, month - 1, day)
    return events.some((event) => event.date.toDateString() === checkDate.toDateString())
  }

  return (
    <div className="select-none p-4 bg-white shadow-lg rounded-lg border">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigateMonth("prev")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium text-orange-600 text-lg">
          {date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigateMonth("next")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekDays.map((day) => (
          <div key={day} className="flex justify-center items-center text-sm font-semibold p-1 text-gray-500">
            <p>{day}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {prevMonthDays.map((day) => (
          <div
            key={`prev-${day}`}
            className="flex justify-center items-center p-2 text-sm text-gray-300 cursor-pointer"
            onClick={() => onDateSelect(new Date(year, month - 1, day))}
          >
            <p>{day}</p>
          </div>
        ))}
        {days.map((day) => {
          const isToday =
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            day === today.getDate()
          const isSelected = day === date.getDate()
          return (
            <div
              key={day}
              className={`flex justify-center items-center p-2 text-sm rounded-full cursor-pointer relative h-9 w-9 mx-auto ${
                isSelected
                  ? "bg-orange-600 text-white"
                  : isToday
                    ? "bg-orange-100 text-orange-700"
                    : "text-gray-700 hover:bg-orange-50"
              }`}
              onClick={() => onDateSelect(new Date(year, month, day))}
            >
              <p>{day}</p>
              {dayHasEvent(day, true) && !isSelected && (
                <div className="absolute bottom-1 h-1 w-1 bg-orange-500 rounded-full" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
