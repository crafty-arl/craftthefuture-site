import { CalendarDays } from "lucide-react"
import Link from "next/link"
import { FeedCli } from "@/components/feed-cli"
import { fetchRssFeed } from "@/lib/fetch-rss"

import { SiteFooter } from "@/components/layout/site-footer"
import { TagCloud } from "@/components/tag-cloud"
import { SourceSelector } from "@/components/source-selector"
import { RSS_SOURCES } from "@/lib/rss-sources"
import { RefreshButton } from "@/components/refresh-button"

export const revalidate = 0 // Disable caching to always fetch fresh content

interface FeedPageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function FeedPage({ searchParams }: FeedPageProps) {
  // Get source from query params
  const sourceId = typeof searchParams.source === "string" ? searchParams.source : undefined

  // Fetch feed items based on source
  const feedItems = await fetchRssFeed(sourceId)

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">


      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold">Feed</h1>
          <div className="flex items-center gap-4">
            <SourceSelector />
            <RefreshButton />
            <div className="flex items-center text-sm">
              <CalendarDays size={16} className="mr-2" />
              <span>Latest updates</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xl text-center mb-4">
            Try our interactive CLI to explore our content. Type commands like <code className="bg-gray-100 px-2 py-1 rounded">help</code> or <code className="bg-gray-100 px-2 py-1 rounded">latest</code> to get started.
          </p>
          <FeedCli feedItems={feedItems} />
          <p className="text-center mt-4 text-gray-600">
            Want to use the CLI in your terminal? Check out our <a href="https://github.com/craftthefuture/cli" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">GitHub repository</a> to get started.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Popular Tags</h2>
        <TagCloud feedItems={feedItems} />

        <div className="space-y-10 mt-8">
          <h2 className="text-2xl font-bold border-b border-black pb-2">Latest Articles</h2>
          {feedItems.length === 0 ? (
            <div className="py-8 text-center text-gray-500">No articles found. Please check back later.</div>
          ) : (
            feedItems.map((item) => {
              // Get source info
              const source = RSS_SOURCES.find((s) => s.id === item.sourceId)

              return (
                <article key={item.id} className="border-b border-black pb-10 last:border-b-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {source && (
                      <Link
                        href={`/feed?source=${source.id}`}
                        className="text-xs px-2 py-1 bg-black text-white rounded-md flex items-center gap-1"
                      >
                        {source.icon && <span>{source.icon}</span>}
                        {source.name}
                      </Link>
                    )}
                    {item.tags
                      .filter((tag) => tag !== item.sourceId) // Don't show source as a tag
                      .slice(0, 3)
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
                    <span className="text-sm text-gray-600 ml-2">{item.date}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">
                    <Link href={`/post/${item.slug}`} className="hover:underline">
                      {item.title}
                    </Link>
                  </h2>
                  {item.imageUrl && (
                    <div className="mb-4">
                      <Link href={`/post/${item.slug}`}>
                        <img
                          src={item.imageUrl || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-48 object-cover aspect-square"
                        />
                      </Link>
                    </div>
                  )}
                  <p className="text-gray-700 mb-4">{item.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span className="text-sm font-medium">{item.author}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="text-sm text-gray-600">{item.readTime}</span>
                      <Link href={`/post/${item.slug}`} className="text-sm underline hover:text-gray-700">
                        Read more
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })
          )}
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
