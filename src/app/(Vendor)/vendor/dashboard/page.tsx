import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Calendar, History } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">Recent sales</CardTitle>
          <button className="h-8 w-8 rounded-lg hover:bg-accent">⋮</button>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <BarChart3 className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-medium">No Sales Data</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Make some appointments for sales data to appear
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-medium">Upcoming appointments</CardTitle>
          <button className="h-8 w-8 rounded-lg hover:bg-accent">⋮</button>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Calendar className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-medium">Your schedule is empty</h3>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Make some appointments for schedule data to appear
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Appointments activity</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <History className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-medium">No recent activity</h3>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Today&apos;s next appointments</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Calendar className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-medium">No Appointments Today</h3>
        </CardContent>
      </Card>
    </div>
  )
}

