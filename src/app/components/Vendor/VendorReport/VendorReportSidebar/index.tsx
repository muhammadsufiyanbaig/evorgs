import { Button } from '@/components/ui/button'
import { BarChart3, Layout, Star, Target } from 'lucide-react'
import React from 'react'


interface VendorReportSidebarProps {
  setCurrentView: (view: string) => void;
  setActiveCategory: (category: string) => void;
}
interface VendorReportSidebarProps {
  setCurrentView: (view: string) => void;
  setActiveCategory: (category: string) => void;
  currentView: string;
  reports: Report[];
  favorites: Set<any>;
}

const VendorReportSidebar: React.FC<VendorReportSidebarProps> = ({ setCurrentView, setActiveCategory, currentView, reports, favorites }) => {
  return (
    <div className="w-64 border-r bg-white p-6">
    <h2 className="mb-6 text-xl font-semibold">Reports</h2>
    <nav className="space-y-2">
      <Button
        variant="ghost"
        className={`w-full justify-start gap-2 ${currentView === "all" ? "bg-orange-50 text-orange-900" : ""}`}
        onClick={() => {
          setCurrentView("all")
          setActiveCategory("All reports")
        }}
      >
        <Layout className="h-4 w-4" />
        All reports
        <span className="ml-auto rounded-full bg-orange-100 px-2 py-0.5 text-xs">{reports.length}</span>
      </Button>
      <Button
        variant="ghost"
        className={`w-full justify-start gap-2 ${currentView === "favourites" ? "bg-orange-50 text-orange-900" : ""}`}
        onClick={() => setCurrentView("favourites")}
      >
        <Star className="h-4 w-4" />
        Favourites
        <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs">{favorites.size}</span>
      </Button>
      <Button
        variant="ghost"
        className={`w-full justify-start gap-2 ${currentView === "dashboards" ? "bg-orange-50 text-orange-900" : ""}`}
        onClick={() => setCurrentView("dashboards")}
      >
        <BarChart3 className="h-4 w-4" />
        Dashboards
        <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs">
          {reports.filter((r) => r.type === "dashboard").length}
        </span>
      </Button>
      <Button
        variant="ghost"
        className={`w-full justify-start gap-2 ${currentView === "standard" ? "bg-orange-50 text-orange-900" : ""}`}
        onClick={() => setCurrentView("standard")}
      >
        <Layout className="h-4 w-4" />
        Standard
        <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs">
          {reports.filter((r) => r.type === "report").length}
        </span>
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-2">
        <Target className="h-4 w-4" />
        Targets
      </Button>
    </nav>
  </div>
  )
}

export default VendorReportSidebar
