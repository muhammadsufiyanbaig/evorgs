"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Heart, MessageCircle, Edit3, Trash2, Plus, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/utils/data"

export default function MyBlogsPage() {
  // In a real app, you'd filter by authenticated user
  const [myBlogs] = useState(blogPosts.slice(0, 4)) // Mock vendor's blogs
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const categories = ["all", ...Array.from(new Set(myBlogs.map((blog) => blog.category)))]

  const filteredBlogs = myBlogs
    .filter(
      (blog) =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((blog) => filterCategory === "all" || blog.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        case "most-liked":
          return b.likes - a.likes
        case "most-viewed":
          return b.views - a.views
        default:
          return 0
      }
    })

  const totalStats = {
    posts: myBlogs.length,
    views: myBlogs.reduce((sum, blog) => sum + blog.views, 0),
    likes: myBlogs.reduce((sum, blog) => sum + blog.likes, 0),
    comments: myBlogs.reduce((sum, blog) => sum + blog.comments.length, 0),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                My <span className="text-orange-500">Blogs</span>
              </h1>
              <p className="text-gray-600 mt-1">Manage and track your published content</p>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">{totalStats.posts}</div>
              <div className="text-sm text-gray-600">Total Posts</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{totalStats.views.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total Views</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-500">{totalStats.likes}</div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{totalStats.comments}</div>
              <div className="text-sm text-gray-600">Total Comments</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search your blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-40">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="most-liked">Most Liked</SelectItem>
                    <SelectItem value="most-viewed">Most Viewed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <Card
              key={blog.id}
              className="group bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md overflow-hidden rounded-xl"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={blog.image || "/placeholder.svg"}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-orange-500/90 backdrop-blur-sm text-white text-xs">{blog.category}</Badge>
                </div>
                <div className="absolute top-3 right-3 flex gap-2">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white">
                    <Edit3 className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="destructive" className="h-8 w-8 p-0 bg-red-500/90 hover:bg-red-600">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{blog.excerpt}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {blog.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                  {blog.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{blog.tags.length - 2}
                    </Badge>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {blog.readTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {blog.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {blog.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {blog.comments.length}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link href={`/blog/${blog.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                      View Post
                    </Button>
                  </Link>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-4">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-400 mb-4">
                <MessageCircle className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterCategory !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "You haven't created any blog posts yet"}
              </p>
              {!searchTerm && filterCategory === "all" && (
                <Link href="/vendor/create-blog">
                  <Button className="bg-orange-500 hover:bg-orange-600">Create Your First Blog</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
