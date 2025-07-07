"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Calendar, Clock, User, Eye, Heart, MessageCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { getBlogPostBySlug, type BlogPost, type Comment } from "@/utils/data"

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set())
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const slug = params.slug as string
    const foundPost = getBlogPostBySlug(slug)
    if (foundPost) {
      setPost(foundPost)
      setComments([...foundPost.comments])
    }
  }, [params.slug])

  const handleLikePost = () => {
    setIsLiked(!isLiked)
  }

  const handleLikeComment = (commentId: number) => {
    setLikedComments((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(commentId)) {
        newSet.delete(commentId)
      } else {
        newSet.add(commentId)
      }
      return newSet
    })
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !post) return

    const comment: Comment = {
      id: Date.now(),
      author: "You",
      content: newComment,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      likes: 0,
    }

    setComments([...comments, comment])
    setNewComment("")
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog post not found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been moved.</p>
          <Link href="/">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const currentLikes = post.likes + (isLiked ? 1 : 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/">
          <Button
            variant="ghost"
            className="mb-8 text-orange-600 hover:text-orange-700 hover:bg-orange-50 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>

        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="relative h-64 md:h-96">
            <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
            </div>
          </div>

          <div className="p-8 md:p-12">
            {/* Post Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{post.views.toLocaleString()} views</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full hover:bg-orange-200 transition-colors duration-200 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Like Button */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                onClick={handleLikePost}
                variant="outline"
                className={`flex items-center gap-2 transition-all duration-200 ${
                  isLiked
                    ? "bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100"
                    : "hover:bg-orange-50 hover:border-orange-200"
                }`}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-orange-500 text-orange-500" : ""}`} />
                <span>{currentLikes} likes</span>
              </Button>
              <div className="flex items-center gap-2 text-gray-600">
                <MessageCircle className="w-4 h-4" />
                <span>{comments.length} comments</span>
              </div>
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-ul:my-4 prose-li:text-gray-700 prose-strong:text-gray-900 mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Summary/Conclusion */}
            <div className="bg-orange-50 rounded-2xl p-6 mb-12 border-l-4 border-orange-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Key Takeaways
              </h3>
              <p className="text-gray-700 leading-relaxed">{post.summary}</p>
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-100 pt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Comments ({comments.length})</h3>

              {/* Add Comment Form */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-8">
                <div className="flex gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-orange-500 text-white">Y</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Share your thoughts..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="mb-4 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                      rows={3}
                    />
                    <Button
                      onClick={handleAddComment}
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                      disabled={!newComment.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => {
                  const isCommentLiked = likedComments.has(comment.id)
                  const commentLikes = comment.likes + (isCommentLiked ? 1 : 0)

                  return (
                    <div
                      key={comment.id}
                      className="flex gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-200"
                    >
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-orange-100 text-orange-600">
                          {comment.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700 mb-3 leading-relaxed">{comment.content}</p>
                        <Button
                          onClick={() => handleLikeComment(comment.id)}
                          variant="ghost"
                          size="sm"
                          className={`text-sm ${
                            isCommentLiked
                              ? "text-orange-600 hover:text-orange-700"
                              : "text-gray-500 hover:text-orange-600"
                          }`}
                        >
                          <Heart className={`w-3 h-3 mr-1 ${isCommentLiked ? "fill-orange-500" : ""}`} />
                          {commentLikes}
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
