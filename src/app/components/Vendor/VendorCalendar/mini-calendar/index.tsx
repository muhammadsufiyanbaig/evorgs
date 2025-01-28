import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDaysInMonth, getFirstDayOfMonth } from "@/lib/utils"

interface MiniCalendarProps {
  date: Date
  onDateSelect: (date: Date) => void
}

export function MiniCalendar({ date, onDateSelect }: MiniCalendarProps) {
  const month = date.getMonth()
  const year = date.getFullYear()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)
  const today = date.getDate()

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => ({
    day: new Date(year, month, 0).getDate() - i,
    isPreviousMonth: true,
  })).reverse()

  const weekDays = ["M", "T", "W", "T", "F", "S", "S"]

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(date)
    newDate.setMonth(month + (direction === "next" ? 1 : -1))
    onDateSelect(newDate)
  }

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigateMonth("prev")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="font-medium">{date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigateMonth("next")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-sm text-muted-foreground">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {previousMonthDays.map(({ day }) => (
          <div
            key={`prev-${day}`}
            className="p-2 text-sm text-muted-foreground cursor-pointer hover:bg-accent rounded-full"
            onClick={() => {
              const newDate = new Date(year, month - 1, day)
              onDateSelect(newDate)
            }}
          >
            {day}
          </div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`p-2 text-sm rounded-full cursor-pointer hover:bg-accent ${
              day === today ? "bg-orange-500 text-white hover:bg-orange-500/90" : day === 20 ? "text-orange-500" : ""
            }`}
            onClick={() => onDateSelect(new Date(year, month, day))}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}

