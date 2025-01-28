import type { Event } from "@/lib/types"
import { getDaysInMonth, getFirstDayOfMonth } from "@/lib/utils"

interface MonthViewProps {
  date: Date
  events: Event[]
}

export function MonthView({ date, events }: MonthViewProps) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)
  const lastDayOfPrevMonth = new Date(year, month, 0).getDate()

  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDayOfMonth + 1
    if (dayNumber > 0 && dayNumber <= daysInMonth) {
      return { date: new Date(year, month, dayNumber), currentMonth: true }
    } else if (dayNumber <= 0) {
      return { date: new Date(year, month - 1, lastDayOfPrevMonth + dayNumber), currentMonth: false }
    } else {
      return { date: new Date(year, month + 1, dayNumber - daysInMonth), currentMonth: false }
    }
  })

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getEventStyle = (color: Event["color"]) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-600"
      case "pink":
        return "bg-pink-50 text-pink-600"
      default:
        return "bg-gray-50 text-gray-600"
    }
  }

  return (
    <div className="grid grid-cols-7 gap-1 p-4">
      {weekDays.map((day) => (
        <div key={day} className="text-sm font-medium text-center py-2">
          {day}
        </div>
      ))}
      {days.map(({ date, currentMonth }, index) => {
        const dayEvents = events.filter((event) => event.date.toDateString() === date.toDateString())
        return (
          <div
            key={index}
            className={`min-h-[100px] border rounded-lg p-1 ${
              currentMonth ? "bg-white" : "bg-gray-50"
            } ${date.toDateString() === new Date().toDateString() ? "ring-2 ring-[#6E56CF]" : ""}`}
          >
            <div className={`text-right ${currentMonth ? "font-medium" : "text-muted-foreground"}`}>
              {date.getDate()}
            </div>
            <div className="mt-1 space-y-1">
              {dayEvents.slice(0, 3).map((event) => (
                <div key={event.id} className={`text-xs p-1 rounded ${getEventStyle(event.color)}`}>
                  {event.title}
                </div>
              ))}
              {dayEvents.length > 3 && (
                <div className="text-xs text-muted-foreground">+{dayEvents.length - 3} more</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

