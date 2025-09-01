import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, TrendingUp, AlertTriangle, CheckCircle, Star, Trash2 } from "lucide-react"
import Link from "next/link"

const stats = [
  {
    name: "Total Reviews",
    value: "2,847",
    change: "+12%",
    changeType: "positive" as const,
    icon: MessageSquare,
  },
  {
    name: "Average Rating",
    value: "4.2",
    change: "+0.3",
    changeType: "positive" as const,
    icon: Star,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "review",
    message: "New review submitted for Sunset Venue",
    time: "2 minutes ago",
    status: "pending",
  },
  {
    id: 2,
    type: "moderation",
    message: "Review #1234 approved by Admin",
    time: "15 minutes ago",
    status: "approved",
  },
  {
    id: 3,
    type: "flag",
    message: "Review flagged for inappropriate content",
    time: "1 hour ago",
    status: "flagged",
  },
  {
    id: 4,
    type: "response",
    message: "Vendor responded to review #5678",
    time: "2 hours ago",
    status: "responded",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-orange-900">Dashboard</h1>
        <p className="text-orange-700">Manage and remove reviews efficiently</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {stats.map((stat) => (
          <Card key={stat.name} className="border-orange-200 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{stat.value}</div>
              <p className="text-xs text-orange-600">
                <span className="text-orange-800">
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-orange-200 bg-white">
          <CardHeader>
            <CardTitle className="text-orange-900">Recent Activity</CardTitle>
            <CardDescription className="text-orange-700">Latest actions in your review system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {activity.type === "review" && <MessageSquare className="h-4 w-4 text-orange-600" />}
                    {activity.type === "moderation" && <CheckCircle className="h-4 w-4 text-orange-600" />}
                    {activity.type === "flag" && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                    {activity.type === "response" && <TrendingUp className="h-4 w-4 text-orange-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-orange-900">{activity.message}</p>
                    <p className="text-xs text-orange-600">{activity.time}</p>
                  </div>
                  <Badge
                    className={
                      activity.status === "approved"
                        ? "bg-orange-100 text-orange-800 border-orange-200"
                        : activity.status === "flagged"
                          ? "bg-orange-200 text-orange-900 border-orange-300"
                          : "bg-orange-50 text-orange-700 border-orange-100"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-white">
          <CardHeader>
            <CardTitle className="text-orange-900">Quick Actions</CardTitle>
            <CardDescription className="text-orange-700">Review management tools</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <Link href="/admin/reviews">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto p-3 bg-white border-orange-200 hover:bg-orange-50">
                  <MessageSquare className="h-4 w-4 text-orange-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-orange-900">Manage All Reviews</p>
                    <p className="text-xs text-orange-600">View, edit, and remove reviews</p>
                  </div>
                </Button>
              </Link>
              <Link href="/admin/reviews?filter=flagged">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto p-3 bg-white border-orange-200 hover:bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-orange-900">Remove Flagged Content</p>
                    <p className="text-xs text-orange-600">Delete inappropriate reviews</p>
                  </div>
                </Button>
              </Link>
              <Link href="/admin/reviews?action=bulk-delete">
                <Button variant="outline" className="w-full justify-start gap-3 h-auto p-3 bg-white border-orange-200 hover:bg-orange-50">
                  <Trash2 className="h-4 w-4 text-orange-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-orange-900">Bulk Remove Reviews</p>
                    <p className="text-xs text-orange-600">Select and delete multiple reviews</p>
                  </div>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
