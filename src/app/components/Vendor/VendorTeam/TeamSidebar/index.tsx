"use client";

export function Sidebar({ setView, currentView }: { setView: (view: "members" | "shifts") => void; currentView: string }) {
  return (
    <nav className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-orange-500">Team</h1>
      </div>
      <div className="p-2 space-y-1">
        <button
          onClick={() => setView("members")}
          className={`block w-full text-left px-3 py-2 rounded-lg ${
            currentView === "members" ? "bg-orange-100 text-orange-700" : "text-gray-700 hover:bg-orange-50"
          }`}
        >
          Team members
        </button>
        <button
          onClick={() => setView("shifts")}
          className={`block w-full text-left px-3 py-2 rounded-lg ${
            currentView === "shifts" ? "bg-orange-100 text-orange-700" : "text-gray-700 hover:bg-orange-50"
          }`}
        >
          Scheduled shifts
        </button>
      </div>
    </nav>
  );
}
