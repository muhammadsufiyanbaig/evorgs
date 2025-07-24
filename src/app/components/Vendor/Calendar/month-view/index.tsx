import type { Event } from "@/utils/interfaces"
import { getDaysInMonth, getFirstDayOfMonth } from "@/utils/function"
import Link from "next/link"

interface MonthViewProps {
  date: Date
  events: Event[]
}

export function MonthView({ date, events }: MonthViewProps) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = (getFirstDayOfMonth(year, month) + 6) % 7
  const today = new Date()

  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDayOfMonth + 1
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      return { date: new Date(year, month, dayNumber), currentMonth: true }
    } else if (dayNumber <= 0) {
      const prevMonthDate = new Date(year, month, 0)
      return { date: new Date(year, month - 1, prevMonthDate.getDate() + dayNumber), currentMonth: false }
    } else {
      return { date: new Date(year, month + 1, dayNumber - daysInMonth), currentMonth: false }
    }
  })

  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const getEventStyle = (color: Event["color"]) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200 border-l-2 border-blue-500"
      case "pink":
        return "bg-pink-100 text-pink-800 hover:bg-pink-200 border-l-2 border-pink-500"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 border-l-2 border-gray-500"
    }
  }

  return (
    <div className="grid grid-cols-7 grid-rows-6 h-full">
      <div className="grid grid-cols-7 col-span-7 border-b">
        {weekDays.map((day) => (
          <div key={day} className="text-sm font-semibold text-center py-2 text-gray-600">
            {day}
          </div>
        ))}
      </div>
      {days.map(({ date, currentMonth }, index) => {
        const dayEvents = events.filter((event) => event.date.toDateString() === date.toDateString())
        const isToday = date.toDateString() === today.toDateString()

        return (
          <div
            key={index}
            className={`min-h-[140px] border-b border-r p-2 flex flex-col ${currentMonth ? "bg-white" : "bg-gray-50"} ${isToday ? "bg-orange-50" : ""}`}
          >
            <div className={`text-right text-sm ${currentMonth ? "font-medium text-gray-700" : "text-gray-400"}`}>
              {date.getDate()}
            </div>
            <div className="mt-1 space-y-1 overflow-y-auto flex-1">
              {dayEvents.slice(0, 3).map((event) => (
                <Link key={event.id} href={event.bookingId ? `/vendor/bookings/${event.bookingId}` : "#"} passHref>
                  <div className={`text-xs p-1.5 rounded truncate cursor-pointer ${getEventStyle(event.color)}`}>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </Link>
              ))}
              {dayEvents.length > 3 && <div className="text-xs text-gray-500 mt-1">+{dayEvents.length - 3} more</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
