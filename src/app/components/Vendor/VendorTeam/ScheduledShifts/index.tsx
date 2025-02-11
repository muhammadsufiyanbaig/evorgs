import { TeamMemberShift } from "@/utils/interfaces"
import { ChevronLeft, ChevronRight, Pencil } from "lucide-react"


const WEEK_START = new Date(2025, 1, 3) // Feb 3, 2025
const SHIFTS: TeamMemberShift[] = [
  {
    id: "1",
    name: "Muhammad...",
    image: "/placeholder.svg",
    shifts: Array(7).fill({ start: "10am", end: "7pm" }),
  },
  {
    id: "2",
    name: "Wendy Smith...",
    image: "/placeholder.svg",
    shifts: Array(7).fill({ start: "10am", end: "7pm" }),
  },
]

export function ScheduledShifts() {
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(WEEK_START)
    date.setDate(date.getDate() + i)
    return date
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Scheduled shifts</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Options
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600">
            Add
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-end items-center gap-2 mb-4">
          <button className="p-1 rounded-md hover:bg-gray-200">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium">This week</span>
          <span className="text-sm text-gray-500">
            {WEEK_START.toLocaleDateString("en-US", { month: "short", day: "numeric" })} -
            {new Date(WEEK_START.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <button className="p-1 rounded-md hover:bg-gray-200">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-[auto,repeat(7,1fr)] gap-4 p-4 border-b border-gray-200">
            <div className="font-medium text-gray-500">Team member</div>
            {weekDays.map((day, index) => (
              <div key={index} className="text-center">
                <div className="font-medium">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
                <div className="text-sm text-gray-500">
                  {day.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
              </div>
            ))}
          </div>

          {SHIFTS.map((member) => (
            <div key={member.id} className="grid grid-cols-[auto,repeat(7,1fr)] gap-4 p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <img src={member.image || "/placeholder.svg"} alt="" className="w-8 h-8 rounded-full" />
                <span className="font-medium">{member.name}</span>
                <button className="ml-2 text-gray-400 hover:text-gray-600">
                  <Pencil className="w-4 h-4" />
                </button>
              </div>
              {member.shifts.map((shift, index) => (
                <div key={index} className="bg-orange-100 text-orange-800 rounded p-2 text-sm text-center">
                  {shift.start} - {shift.end}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

