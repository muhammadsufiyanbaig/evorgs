
import { formatTime } from "@/utils/function"
import { Event } from "@/utils/interfaces"
import Link from "next/link"

interface WeekViewProps {
  date: Date
  events: Event[]
}

export function WeekView({ date, events }: WeekViewProps) {
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - ((date.getDay() + 6) % 7)) // Start week on Monday

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    return day
  })

  const hours = Array.from({ length: 24 }, (_, i) => i)

  const getEventStyle = (color: Event["color"]) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-800 border-l-4 border-blue-400"
      case "pink":
        return "bg-pink-50 text-pink-800 border-l-4 border-pink-400"
      default:
        return "bg-gray-50 text-gray-800 border-l-4 border-gray-400"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex border-b sticky top-0 bg-white z-10">
        <div className="w-16 flex-shrink-0" />
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="flex-1 text-center py-2">
            <div className="font-medium text-sm">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
            <div className="text-2xl font-bold text-gray-800">{day.getDate()}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 overflow-y-auto">
        <div className="w-16 flex-shrink-0">
          {hours.map((hour) => (
            <div key={hour} className="h-20 border-b relative">
              <span className="absolute -top-3 right-2 text-xs text-gray-400">
                {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
              </span>
            </div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7">
          {weekDays.map((day) => (
            <div key={day.toISOString()} className="border-l relative">
              {hours.map((hour) => (
                <div key={hour} className="h-20 border-b" />
              ))}
              {/* Place events on top of the grid */}
              {events
                .filter((event) => event.date.toDateString() === day.toDateString())
                .map((event) => {
                  const [eventHour, eventMinute] = event.startTime.split(":").map(Number)
                  const top = eventHour * 80 + (eventMinute / 60) * 80
                  return (
                    <Link
                      key={event.id}
                      href={event.bookingId ? `/vendor/bookings/${event.bookingId}` : "#"}
                      passHref
                      className={`absolute left-1 right-1 p-1 rounded-md shadow-sm cursor-pointer ${getEventStyle(
                        event.color,
                      )}`}
                      style={{ top: `${top}px`, minHeight: "60px" }}
                    >
                      <div className="font-semibold text-xs">{event.title}</div>
                      <div className="text-xs text-gray-600">{event.location}</div>
                      <div className="text-xs text-gray-600">{formatTime(event.startTime)}</div>
                    </Link>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
