import type { Event } from "@/utils/interfaces"

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
        return "bg-blue-50"
      case "pink":
        return "bg-pink-50"
      default:
        return "bg-gray-50"
    }
  }

  const getEventTextStyle = (color: Event["color"]) => {
    switch (color) {
      case "blue":
        return "text-blue-600"
      case "pink":
        return "text-pink-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="relative min-h-full">
      <div className="absolute inset-0">
        <div className="grid grid-cols-[48px_1fr] divide-x">
          <div className="divide-y">
            {hours.map((hour) => (
              <div key={hour} className="h-20">
                <div className="relative -top-2.5 text-right pr-2 text-sm text-muted-foreground">
                  {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                </div>
              </div>
            ))}
          </div>
          <div className="divide-y">
            {dayEvents.map((event) => {
              const hour = Number.parseInt(event.startTime.split(":")[0])
              const minutes = Number.parseInt(event.startTime.split(":")[1] || "0")
              const top = hour * 80 + (minutes / 60) * 80

              return (
                <div
                  key={event.id}
                  className={`absolute left-[49px] right-0 p-2 ${getEventStyle(event.color)}`}
                  style={{ top: `${top}px`, minHeight: "80px" }}
                >
                  <div className={`text-sm font-medium ${getEventTextStyle(event.color)}`}>{event.title}</div>
                  {event.startTime && (
                    <div className={`text-sm ${getEventTextStyle(event.color)}`}>{event.startTime} AM</div>
                  )}
                  {event.location && (
                    <div className={`text-sm ${getEventTextStyle(event.color)}`}>{event.location}</div>
                  )}
                </div>
              )
            })}
            {hours.map((hour) => (
              <div key={hour} className="h-20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

