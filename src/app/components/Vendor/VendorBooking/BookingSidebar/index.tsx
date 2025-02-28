
import { ShoppingBag, Globe, Facebook, Link2, Check } from "lucide-react"

const tabs = [
    { id: "marketplace", name: "Marketplace profile", icon: ShoppingBag },
    { id: "google", name: "Reserve with Google", icon: Globe },
    { id: "social", name: "Facebook and Instagram bookings", icon: Facebook },
    { id: "link-builder", name: "Link builder", icon: Link2 },
  ]
  
  const VendorBookingSidebar = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (id: string) => void }) => {
    return (
      <div className="w-64 border-r bg-gray-50">
        <nav className="flex flex-col p-2 space-y-1">
          <h1 className="font-bold text-lg text-orange-600 p-4">Online booking</h1>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-black text-left ${
                activeTab === tab.id ? "bg-white text-orange-600 shadow-sm" : ""
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>
    )
  }

export default VendorBookingSidebar