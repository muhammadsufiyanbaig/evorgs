import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  TicketIcon,
  ClockIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  TrendingUpIcon,
  MessageSquareIcon,
} from "lucide-react"

const stats = [
  {
    title: "Total Tickets",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as const,
    icon: TicketIcon,
  },
  {
    title: "Open Tickets",
    value: "24",
    change: "-8%",
    changeType: "negative" as const,
    icon: ClockIcon,
  },
  {
    title: "Resolved Today",
    value: "18",
    change: "+23%",
    changeType: "positive" as const,
    icon: CheckCircleIcon,
  },
  {
    title: "Urgent Tickets",
    value: "3",
    change: "-2",
    changeType: "negative" as const,
    icon: AlertTriangleIcon,
  },
]

const recentTickets = [
  {
    id: "TK-001",
    subject: "Payment processing issue",
    priority: "High" as const,
    status: "Open" as const,
    creator: "John Doe",
    createdAt: "2 hours ago",
  },
  {
    id: "TK-002",
    subject: "Account login problems",
    priority: "Medium" as const,
    status: "In Progress" as const,
    creator: "Jane Smith",
    createdAt: "4 hours ago",
  },
  {
    id: "TK-003",
    subject: "Feature request: Dark mode",
    priority: "Low" as const,
    status: "Open" as const,
    creator: "Mike Johnson",
    createdAt: "6 hours ago",
  },
  {
    id: "TK-004",
    subject: "Technical issue with booking",
    priority: "Urgent" as const,
    status: "In Progress" as const,
    creator: "Sarah Wilson",
    createdAt: "8 hours ago",
  },
]

const priorityColors = {
  Low: "bg-green-100 text-green-800",
  Medium: "bg-yellow-100 text-yellow-800",
  High: "bg-orange-100 text-orange-800",
  Urgent: "bg-red-100 text-red-800",
}

const statusColors = {
  Open: "bg-blue-100 text-blue-800",
  "In Progress": "bg-purple-100 text-purple-800",
  Resolved: "bg-green-100 text-green-800",
  Closed: "bg-gray-100 text-gray-800",
}

export default function DashboardPage() {
  return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your support tickets.</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <TrendingUpIcon className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button size="sm">
              <MessageSquareIcon className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Tickets */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TicketIcon className="h-5 w-5" />
              <span>Recent Tickets</span>
            </CardTitle>
            <CardDescription>Latest support tickets that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex flex-col space-y-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors md:flex-row md:items-center md:justify-between md:space-y-0"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-foreground">{ticket.id}</span>
                      <Badge className={priorityColors[ticket.priority]}>{ticket.priority}</Badge>
                      <Badge className={statusColors[ticket.status]}>{ticket.status}</Badge>
                    </div>
                    <p className="text-sm text-foreground font-medium">{ticket.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      Created by {ticket.creator} • {ticket.createdAt}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                    <Button size="sm">Respond</Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">View All Tickets</Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
