import type React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

type Category = {
  name: string
  icon: LucideIcon
}

type SidebarProps = {
  activeCategory: string
  setActiveCategory: (category: string) => void
  catalog: any[]
  categories: Category[]
}

 const CatalogSidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory, catalog, categories }) => {
  return (
    <div className="w-64 border-r bg-white p-6">
      <h2 className="mb-6 text-xl font-semibold">Catalog</h2>
      <nav className="space-y-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.name}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2",
                activeCategory === category.name && "bg-orange-50 text-orange-900",
              )}
              onClick={() => setActiveCategory(category.name)}
            >
              <Icon className="h-4 w-4" />
              {category.name}
              <span className="ml-auto rounded-full bg-gray-100 px-2 py-0.5 text-xs">
                {catalog.filter((p) => category.name === "All Catalog" || p.categories === category.name).length}
              </span>
            </Button>
          )
        })}
      </nav>
    </div>
  )
}

export default CatalogSidebar;