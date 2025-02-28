import type React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

type SearchBarProps = {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

 const CatalogSearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => (
  <div className="mb-8 flex items-center gap-4">
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        placeholder="Search vendors..."
        className="pl-10"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  </div>
)

export default CatalogSearchBar;