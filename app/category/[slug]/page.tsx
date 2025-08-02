import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarDays, ArrowLeft } from "lucide-react"
import { fetchRssFeed } from "@/lib/fetch-rss"

import { SiteFooter } from "@/components/layout/site-footer"
import type { Metadata } from "next"

export const revalidate = 3600 // Revalidate every hour

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Define valid categories and their metadata
const CATEGORIES = {
  build: {
    title: "/build",
    description: "Technical insights and devlogs for builders",
    emoji: "🛠️",
  },
  govern: {
    title: "/govern",
    description: "Systems and ethics for shapers",
    emoji: "🏛️",
  },
  dream: {
    title: "/dream",
    description: "Stories and visions for architects",
    emoji: "💭",
  },
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categorySlug = params.slug
  const category = CATEGORIES[categorySlug as keyof typeof CATEGORIES]

  if (!category) {
    return {
      title: "Category Not Found - Craft The Future",
      description: "The requested category could not be found.",
    }
  }

  return {
    title: `${category.title} - Craft The Future`,
    description: category.description,
  }
}

export async function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({
    slug,
  }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const categorySlug = params.slug
  const category = CATEGORIES[categorySlug as keyof typeof CATEGORIES]

  if (!category) {
    notFound()
  }

  const allPosts = await fetchRssFeed()
  const categoryPosts = allPosts.filter((post) => 
    post.tags.some(tag => tag.toLowerCase() === categorySlug.toLowerCase())
  )

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">


      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 md:p-12">
        <Link href="/feed" className="inline-flex items-center text-sm hover:underline mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Feed
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{category.emoji}</span>
            <h1 className="text-4xl md:text-5xl font-bold">{category.title}</h1>
          </div>
          <p className="text-lg text-gray-700">{category.description}</p>
        </div>

        <div className="space-y-10">
          {categoryPosts.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No articles found in this category. Please check back later.
            </div>
          ) : (
            categoryPosts.map((post) => (
              <article key={post.id} className="border-b border-black pb-10 last:border-b-0">
                <div className="flex items-center gap-4 mb-2">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-sm font-medium bg-gray-100 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarDays size={16} className="mr-1" />
                    {post.date}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-3">
                  <Link href={`/post/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                {post.imageUrl && (
                  <div className="mb-4">
                    <Link href={`/post/${post.slug}`}>
                      <img
                        src={post.imageUrl || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                  </div>
                )}
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                    <span className="text-sm font-medium">{post.author}</span>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className="text-sm text-gray-600">{post.readTime}</span>
                    <Link href={`/post/${post.slug}`} className="text-sm underline hover:text-gray-700">
                      Read more
                    </Link>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
