"use client"
import type React from "react"
import { useState } from "react"
import { Heart, MessageCircle, User, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { blogPosts } from "@/utils/data"

export default function BlogListingPage() {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set())

  const handleLikePost = (postId: number, e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking like button
    setLikedPosts((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
      {/* Header */}
      <header className="bg-white/80 mt-16  backdrop-blur-sm shadow-sm border-b border-orange-100/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              EvOrgs <span className="text-orange-500">Blogs</span>
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Discover insights in design, development, and digital creativity
            </p>
          </div>
        </div>
      </header>

      {/* Blog Grid */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {blogPosts.map((post) => {
            const isLiked = likedPosts.has(post.id)
            const currentLikes = post.likes + (isLiked ? 1 : 0)

            return (
              <Link key={post.id} href={`/blogs/${post.slug}`}>
                <Card className="group cursor-pointer bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden rounded-xl h-full">
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardContent className="p-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2 leading-tight">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">{post.excerpt}</p>

                    {/* Tags - Show only 2 */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-orange-50 text-orange-600 text-xs rounded-md">
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="px-2 py-0.5 bg-gray-50 text-gray-500 text-xs rounded-md">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Simplified Stats */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleLikePost(post.id, e)}
                          className={`flex items-center gap-1 transition-colors duration-200 ${
                            isLiked ? "text-orange-500" : "text-gray-400 hover:text-orange-500"
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${isLiked ? "fill-orange-500" : ""}`} />
                          {currentLikes}
                        </button>
                        <span className="flex items-center gap-1 text-gray-400">
                          <MessageCircle className="w-3 h-3" />
                          {post.comments.length}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-orange-500 font-medium text-xs">{post.date}</span>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-4 py-1 h-7 rounded-lg transition-all duration-200 group-hover:bg-orange-600"
                      >
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
