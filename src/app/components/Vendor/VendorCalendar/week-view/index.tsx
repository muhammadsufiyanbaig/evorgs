import type { Event } from "@/lib/types"
import { formatTime } from "@/lib/utils"

interface WeekViewProps {
  date: Date
  events: Event[]
}

export function WeekView({ date, events }: WeekViewProps) {
  const startOfWeek = new Date(date)
  startOfWeek.setDate(date.getDate() - date.getDay())

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek)
    day.setDate(startOfWeek.getDate() + i)
    return day
  })

  const hours = Array.from({ length: 24 }, (_, i) => i)

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
    <div className="flex flex-col h-full">
      <div className="flex border-b">
        <div className="w-16" />
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="flex-1 text-center py-2">
            <div className="font-medium">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
            <div className="text-sm text-muted-foreground">{day.getDate()}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 overflow-y-auto">
        <div className="w-16 flex-shrink-0">
          {hours.map((hour) => (
            <div key={hour} className="h-20 border-b relative">
              <span className="absolute -top-3 right-2 text-sm text-muted-foreground">
                {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
              </span>
            </div>
          ))}
        </div>
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="flex-1 border-l">
            {hours.map((hour) => (
              <div key={hour} className="h-20 border-b relative">
                {events
                  .filter((event) => event.date.toDateString() === day.toDateString())
                  .map((event) => {
                    const [eventHour, eventMinute] = event.startTime.split(":").map(Number)
                    const top = eventHour * 80 + (eventMinute / 60) * 80
                    return (
                      <div
                        key={event.id}
                        className={`absolute left-0 right-0 p-1 text-xs ${getEventStyle(event.color)}`}
                        style={{ top: `${top}px`, height: "80px" }}
                      >
                        <div className="font-medium">{event.title}</div>
                        <div>{formatTime(event.startTime)}</div>
                        {event.location && <div>{event.location}</div>}
                      </div>
                    )
                  })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

