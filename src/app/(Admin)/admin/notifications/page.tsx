import { StatsCards } from "@/app/components/Admin/notification/stats-card"
import { NotificationsTable } from "@/app/components/Admin/notification/table"

export default function AdminDashboard() {
  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 lg:p-6">
        <div className="space-y-6">
          <StatsCards />
          <NotificationsTable />
        </div>
      </main>
    </>
  )
}
