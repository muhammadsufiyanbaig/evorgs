"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, FileText, Eye, Heart, MessageCircle } from "lucide-react"
import Link from "next/link"
import { blogPosts } from "@/utils/data"

export default function VendorDashboard() {
  // Filter posts by current vendor (in a real app, you'd filter by authenticated user)
  const vendorPosts = blogPosts.slice(0, 3) // Mock data for demo

  const totalViews = vendorPosts.reduce((sum, post) => sum + post.views, 0)
  const totalLikes = vendorPosts.reduce((sum, post) => sum + post.likes, 0)
  const totalComments = vendorPosts.reduce((sum, post) => sum + post.comments.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Vendor's <span className="text-orange-500">Blogs Dashboard</span>
              </h1>
              <p className="text-gray-600 mt-1">Manage your blog posts and track performance</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{vendorPosts.length}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
                </div>
                <Eye className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Likes</p>
                  <p className="text-2xl font-bold text-gray-900">{totalLikes}</p>
                </div>
                <Heart className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Comments</p>
                  <p className="text-2xl font-bold text-gray-900">{totalComments}</p>
                </div>
                <MessageCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Posts */}
        <Card>
          <CardHeader>
            <CardTitle>Your Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendorPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{post.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{post.excerpt.substring(0, 100)}...</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.category}</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {post.likes}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Link href={`/blogs/${post.slug}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
