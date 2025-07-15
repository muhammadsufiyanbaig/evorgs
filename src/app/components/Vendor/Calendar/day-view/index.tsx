import type { Event } from "@/utils/interfaces"
import Link from "next/link"

interface DayViewProps {
  date: Date
  events: Event[]
}

export function DayView({ date, events }: DayViewProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i)
  const dayEvents = events.filter((event) => event.date.toDateString() === date.toDateString())

  const getEventStyle = (color: Event["color"]) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 border-l-4 border-blue-400"
      case "pink":
        return "bg-pink-50 border-l-4 border-pink-400"
      default:
        return "bg-gray-50 border-l-4 border-gray-400"
    }
  }

  const getEventTextStyle = (color: Event["color"]) => {
    switch (color) {
      case "blue":
        return "text-blue-800"
      case "pink":
        return "text-pink-800"
      default:
        return "text-gray-800"
    }
  }

  return (
    <div className="relative min-h-full">
      <div className="grid grid-cols-[60px_1fr] h-full">
        {/* Time column */}
        <div className="border-r">
          {hours.map((hour) => (
            <div key={hour} className="h-20 text-right pr-2 relative">
              <div className="text-xs text-gray-400 absolute -top-2 right-2">
                {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
              </div>
            </div>
          ))}
        </div>
        {/* Events grid */}
        <div className="relative">
          {/* Horizontal lines */}
          {hours.map((hour) => (
            <div key={hour} className="h-20 border-b" />
          ))}
          {/* Events */}
          {dayEvents.map((event) => {
            const [eventHour, eventMinute] = event.startTime.split(":").map(Number)
            const top = eventHour * 80 + (eventMinute / 60) * 80
            return (
              <Link
                key={event.id}
                href={event.bookingId ? `/vendor/bookings/${event.bookingId}` : "#"}
                passHref
                className={`absolute left-2 right-2 p-2 rounded-md shadow-sm cursor-pointer ${getEventStyle(
                  event.color,
                )}`}
                style={{ top: `${top}px`, minHeight: "60px" }}
              >
                <div className={`font-semibold text-sm ${getEventTextStyle(event.color)}`}>{event.title}</div>
                <div className={`text-xs ${getEventTextStyle(event.color)}`}>
                  {event.startTime} - {event.location}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
