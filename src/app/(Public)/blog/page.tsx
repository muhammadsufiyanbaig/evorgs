"use client"

import type React from "react"

import { useState } from "react"
import { Eye, Heart, MessageCircle, User } from "lucide-react"
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm mt-10 border-b border-orange-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              EvOrgs <span className="text-orange-500">Blogs</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the latest trends, techniques, and insights in design, development, and digital creativity
            </p>
          </div>
        </div>
      </header>

      {/* Blog Grid */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => {
            const isLiked = likedPosts.has(post.id)
            const currentLikes = post.likes + (isLiked ? 1 : 0)

            return (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="group cursor-pointer bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden rounded-2xl h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardContent className="p-6 flex flex-col h-full">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-grow">{post.excerpt}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                          +{post.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Post Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.views.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={(e) => handleLikePost(post.id, e)}
                          className={`flex items-center gap-1 transition-colors duration-200 ${
                            isLiked ? "text-orange-500" : "text-gray-500 hover:text-orange-500"
                          }`}
                        >
                          <Heart className={`w-3 h-3 ${isLiked ? "fill-orange-500" : ""}`} />
                          {currentLikes}
                        </button>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {post.comments.length}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-orange-500 font-medium text-sm">{post.date}</span>
                      <span className="text-gray-500 text-sm">{post.readTime}</span>
                    </div>

                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded-xl transition-all duration-200 group-hover:bg-orange-600 group-hover:shadow-lg">
                      Read More
                    </Button>
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
