import type React from "react"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type CatalogItem = {
  id: number
  imageSrc: string
  title: string
  description: string
  categories: string
}

type CatalogGridProps = {
  filteredPosts: CatalogItem[]
}

const CatalogGrid: React.FC<CatalogGridProps> = ({ filteredPosts }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredPosts.length > 0 ? (
      filteredPosts.map((post) => (
        <Card key={post.id} className="p-4 shadow relative">
          <Image
            src={post.imageSrc || "/placeholder.svg"}
            alt={post.title}
            width={500}
            height={300}
            className="rounded-lg mb-4"
          />
          <h3 className="text-lg font-semibold">{post.title}</h3>
          <p className="text-gray-600">{post.description}</p>
         <div className="absolute top-6 right-6">
         <Badge className="">{post.categories}</Badge>
         </div>
        </Card>
      ))
    ) : (
      <p className="text-gray-500">No results found.</p>
    )}
  </div>
)

export default CatalogGrid;