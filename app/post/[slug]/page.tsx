import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarDays, Clock, ArrowLeft, Share2, Globe } from "lucide-react"
import { getPostBySlug, fetchRssFeed } from "@/lib/fetch-rss"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { RSS_SOURCES } from "@/lib/rss-sources"
import type { Metadata } from "next"

export const revalidate = 3600 // Revalidate every hour

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found - Craft The Future",
      description: "The requested post could not be found.",
    }
  }

  return {
    title: `${post.title} - Craft The Future`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.pubDate,
      authors: [post.author],
      images: post.imageUrl ? [post.imageUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.imageUrl ? [post.imageUrl] : [],
    },
  }
}

export async function generateStaticParams() {
  const posts = await fetchRssFeed()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  // Get source information
  const source = RSS_SOURCES.find((s) => s.id === post.sourceId)

  // Get related posts from the same source or with shared tags
  const allPosts = await fetchRssFeed()

  // Filter out the current post and get posts with shared tags or from the same source
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id)
    .filter(
      (p) => p.sourceId === post.sourceId || p.tags.some((tag) => post.tags.includes(tag) && tag !== post.sourceId),
    )
    .slice(0, 3)

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">
      <SiteHeader />

      {/* Main Content */}
      <article className="flex-1 flex flex-col">
        {/* Post Header */}
        <div className="p-6 md:p-12 border-b border-black">
          <Link href="/feed" className="inline-flex items-center text-sm hover:underline mb-6">
            <ArrowLeft size={16} className="mr-2" />
            Back to Feed
          </Link>

          {source && (
            <div className="mb-4">
              <Link
                href={`/feed?source=${source.id}`}
                className="inline-flex items-center px-3 py-1 bg-black text-white rounded-md"
              >
                {source.icon && <span className="mr-1">{source.icon}</span>}
                {source.name}
              </Link>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.tags
              .filter((tag) => tag !== post.sourceId)
              .map((tag) => {
                // Determine tag type for styling
                let tagStyle = "bg-gray-100 hover:bg-gray-200"
                if (tag.startsWith('#')) {
                  tagStyle = "bg-blue-100 hover:bg-blue-200"
                } else if (tag.includes(':')) {
                  tagStyle = "bg-purple-100 hover:bg-purple-200"
                }

                return (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className={`text-xs px-2 py-1 ${tagStyle} rounded-md`}
                  >
                    {tag}
                  </Link>
                )
              })}
            <span className="text-sm text-gray-600 ml-2">{post.date}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <div className="font-medium">{post.author}</div>
                <div className="text-sm text-gray-600">Author</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <CalendarDays size={16} className="mr-1" />
                {post.date}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-1" />
                {post.readTime}
              </div>
            </div>
          </div>

          {post.imageUrl && (
            <div className="mb-6">
              <img
                src={post.imageUrl || "/placeholder.svg"}
                alt={post.title}
                className="w-full h-auto max-h-[500px] object-cover aspect-square"
              />
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="p-6 md:p-12">
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-black prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-lg prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-4 prose-blockquote:italic prose-strong:text-black prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-900 prose-pre:text-white prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>

        {/* Post Footer */}
        <div className="p-6 md:p-12 border-t border-black">
          <div className="flex justify-between items-center mb-8">
            <div className="text-lg font-bold">Share this post</div>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || "https://craftthefuture.com"}/post/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-black hover:bg-black hover:text-white transition-colors"
                aria-label="Share on Twitter"
              >
                <Share2 size={18} />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || "https://craftthefuture.com"}/post/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-black hover:bg-black hover:text-white transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Share2 size={18} />
              </a>
            </div>
          </div>

          <div className="mb-8">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
            >
              <Globe size={18} className="mr-2" />
              Read on Original Site
            </a>
          </div>

          {relatedPosts.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-4">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => {
                  const relatedSource = RSS_SOURCES.find((s) => s.id === relatedPost.sourceId)

                  return (
                    <Link
                      key={relatedPost.id}
                      href={`/post/${relatedPost.slug}`}
                      className="border border-black p-4 hover:bg-gray-50"
                    >
                      {relatedSource && (
                        <div className="text-xs mb-2 flex items-center">
                          {relatedSource.icon && <span className="mr-1">{relatedSource.icon}</span>}
                          {relatedSource.name}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {relatedPost.tags
                          .filter((tag) => tag !== relatedPost.sourceId)
                          .slice(0, 2)
                          .map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 rounded-md">
                              {tag}
                            </span>
                          ))}
                      </div>
                      <h3 className="font-bold mb-2">{relatedPost.title}</h3>
                      <div className="text-sm text-gray-600">{relatedPost.date}</div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </article>

      <SiteFooter />
    </main>
  )
}
