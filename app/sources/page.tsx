import Link from "next/link"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { RSS_SOURCES } from "@/lib/rss-sources"
import { fetchRssFeed } from "@/lib/fetch-rss"
import { Globe, RssIcon } from "lucide-react"

export const revalidate = 3600 // Revalidate every hour

export default async function SourcesPage() {
  // Fetch all feed items to count articles per source
  const allItems = await fetchRssFeed()

  // Count articles per source
  const sourceCounts = RSS_SOURCES.reduce(
    (acc, source) => {
      const count = allItems.filter((item) => item.sourceId === source.id).length
      return { ...acc, [source.id]: count }
    },
    {} as Record<string, number>,
  )

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">
      <SiteHeader />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">RSS Sources</h1>

        <p className="text-lg mb-8">
          Browse content from these RSS feeds. Each source provides unique perspectives and information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {RSS_SOURCES.map((source) => (
            <div key={source.id} className="border border-black p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center">
                  {source.icon && <span className="mr-2">{source.icon}</span>}
                  {source.name}
                </h2>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded-md">
                  {sourceCounts[source.id] || 0} articles
                </span>
              </div>

              {source.description && <p className="text-gray-700 mb-4">{source.description}</p>}

              <div className="flex flex-wrap gap-3 mt-4">
                <Link
                  href={`/feed?source=${source.id}`}
                  className="inline-flex items-center px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
                >
                  <RssIcon size={16} className="mr-2" />
                  View Feed
                </Link>

                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors"
                >
                  <Globe size={16} className="mr-2" />
                  View Source
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-100 p-6 border border-black">
          <h2 className="text-xl font-bold mb-4">About RSS Feeds</h2>
          <p className="mb-4">
            RSS (Really Simple Syndication) is a web feed that allows users and applications to access updates to
            websites in a standardized, computer-readable format.
          </p>
          <p>
            This site aggregates content from multiple RSS feeds to provide you with a curated reading experience across
            different sources.
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
