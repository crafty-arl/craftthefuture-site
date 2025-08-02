import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays } from "lucide-react"

import { SiteFooter } from "@/components/layout/site-footer"
import { fetchRssFeed } from "@/lib/fetch-rss"
import { getTagInfo, getRelatedTags, TAG_CATEGORIES } from "@/lib/tag-utils"
import type { Metadata } from "next"

export const revalidate = 3600 // Revalidate every hour

interface TagPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const tag = params.slug
  const allPosts = await fetchRssFeed()
  const tagInfo = getTagInfo(tag, allPosts)

  if (!tagInfo) {
    return {
      title: "Tag Not Found - Craft The Future",
      description: "The requested tag could not be found.",
    }
  }

  return {
    title: `${tagInfo.name} - Craft The Future`,
    description: `${tagInfo.count} articles tagged with ${tagInfo.name}`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const tag = params.slug
  const allPosts = await fetchRssFeed()
  const tagInfo = getTagInfo(tag, allPosts)

  // Check if the requested tag exists
  if (!tagInfo) {
    notFound()
  }

  // Filter posts by tag
  const taggedPosts = allPosts.filter((post) => post.tags.includes(tag))

  // Get related tags
  const relatedTags = getRelatedTags(tag, allPosts)

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">


      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 md:p-12">
        <Link href="/feed" className="inline-flex items-center text-sm hover:underline mb-6">
          <ArrowLeft size={16} className="mr-2" />
          Back to Feed
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {tagInfo.category === TAG_CATEGORIES.TOPICS ? '#' : ''}{tagInfo.name}
          </h1>
          <p className="text-lg text-gray-700">
            {tagInfo.count} {tagInfo.count === 1 ? "article" : "articles"} tagged with "{tagInfo.name}"
          </p>
        </div>

        {relatedTags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Related Tags</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTags.slice(0, 5).map((relatedTag) => (
                <Link
                  key={relatedTag}
                  href={`/tag/${relatedTag}`}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                >
                  {relatedTag}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-10">
          {taggedPosts.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              No articles found with this tag. Please check back later.
            </div>
          ) : (
            taggedPosts.map((post) => (
              <article key={post.id} className="border-b border-black pb-10 last:border-b-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {post.tags.map((t) => (
                    <Link
                      key={t}
                      href={`/tag/${t}`}
                      className={`text-xs px-2 py-1 rounded-md ${
                        t === tag ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {t}
                    </Link>
                  ))}
                  <div className="flex items-center text-sm text-gray-600 ml-2">
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
                        className="w-full h-48 object-cover aspect-square"
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
