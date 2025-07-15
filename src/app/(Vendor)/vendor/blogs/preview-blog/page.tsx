"use client"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, User, Clock, ArrowLeft } from "lucide-react"
import Image from "next/image"

interface BlogPreview {
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  image: string
  readTime: string
  tags: string[]
}

export default function PreviewBlogPage() {
  const [blogData, setBlogData] = useState<BlogPreview | null>(null)

  useEffect(() => {
    const previewData = localStorage.getItem("blogPreview")
    if (previewData) {
      setBlogData(JSON.parse(previewData))
    }
  }, [])

  if (!blogData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading preview...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <Button onClick={() => window.close()} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Close Preview
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="bg-white shadow-lg overflow-hidden rounded-xl">
          {blogData.image && (
            <div className="relative h-64 overflow-hidden">
              <Image src={blogData.image || "/placeholder.svg"} alt={blogData.title} fill className="object-cover" />
              <div className="absolute top-4 left-4">
                <Badge className="bg-orange-500 text-white">{blogData.category}</Badge>
              </div>
            </div>
          )}

          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{blogData.title}</h1>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {blogData.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {blogData.readTime || "5 min read"}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />0
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />0
                </span>
              </div>
            </div>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">{blogData.excerpt}</p>

            <div className="prose max-w-none mb-6">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{blogData.content}</div>
            </div>

            {blogData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {blogData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
