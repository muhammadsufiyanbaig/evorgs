"use server"

import { blogPosts } from "@/utils/data"

interface BlogPostData {
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  image: string
  readTime: string
  tags: string[]
  date: string
  likes: number
  views: number
  comments: any[]
}

export async function createBlogPost(blogData: BlogPostData) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Generate a new ID and slug
  const newId = Math.max(...blogPosts.map((post) => post.id)) + 1
  const slug = blogData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

  const newPost = {
    id: newId,
    title: blogData.title,
    excerpt: blogData.excerpt,
    content: blogData.content,
    summary: blogData.excerpt, // or provide another summary logic if needed
    image: blogData.image || "/placeholder.svg?height=200&width=300",
    author: blogData.author,
    date: blogData.date,
    readTime: blogData.readTime || "5 min read",
    category: blogData.category,
    tags: blogData.tags,
    likes: 0,
    views: 0,
    comments: [],
    slug: slug,
  }

  // Add to the beginning of the array (newest first)
  blogPosts.unshift(newPost)

  return { success: true, post: newPost }
}
