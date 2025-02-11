import { TeamMember } from "@/utils/interfaces"
import { Search, SlidersHorizontal, MoreVertical } from "lucide-react"


const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Muhammad Sufiyan Baig",
    email: "send.sufiyan@gmail.com",
    phone: "+92 312 3352667",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Wendy Smith (Demo)",
    image: "/placeholder.svg",
  },
]

export function TeamMembers() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Team members</h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Options
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600">
            Add
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search team members"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {teamMembers.map((member) => (
            <li key={member.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full" src={member.image || "/placeholder.svg"} alt="" />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{member.name}</div>
                  {member.email && <div className="text-sm text-gray-500">{member.email}</div>}
                  {member.phone && <div className="text-sm text-gray-500">{member.phone}</div>}
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-4">No reviews yet</span>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

