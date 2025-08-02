import Link from "next/link"

import { SiteFooter } from "@/components/layout/site-footer"
import { fetchRssFeed } from "@/lib/fetch-rss"
import { TagCloud } from "@/components/tag-cloud"

export const revalidate = 3600 // Revalidate every hour

export default async function TagsPage() {
  const feedItems = await fetchRssFeed()

  // Get all unique tags from feed items (excluding source IDs)
  const allTags = [
    ...new Set(feedItems.flatMap((item) => (item.tags ? item.tags.filter((tag) => tag !== item.sourceId) : []))),
  ]

  // Count occurrences of each tag
  const tagCounts = allTags.reduce(
    (acc, tag) => {
      const count = feedItems.filter((item) => item.tags.includes(tag)).length
      return { ...acc, [tag]: count }
    },
    {} as Record<string, number>,
  )

  // Sort tags by frequency (most common first)
  const sortedTags = allTags.sort((a, b) => tagCounts[b] - tagCounts[a])

  // Group tags by first letter for alphabetical organization
  const tagsByLetter: Record<string, { tag: string; count: number }[]> = {}

  sortedTags.forEach((tag) => {
    const firstLetter = tag.charAt(0).toUpperCase()
    if (!tagsByLetter[firstLetter]) {
      tagsByLetter[firstLetter] = []
    }
    tagsByLetter[firstLetter].push({ tag, count: tagCounts[tag] })
  })

  // Sort the letters
  const sortedLetters = Object.keys(tagsByLetter).sort()

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">


      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Tags</h1>

        <p className="text-lg mb-8">Browse content by tags to discover articles on specific topics.</p>

        <h2 className="text-2xl font-bold mb-4">Popular Tags</h2>
        <TagCloud feedItems={feedItems} />

        <h2 className="text-2xl font-bold mt-12 mb-6">All Tags</h2>

        <div className="space-y-8">
          {sortedLetters.map((letter) => (
            <div key={letter} className="border-t border-black pt-4">
              <h3 className="text-xl font-bold mb-4">{letter}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {tagsByLetter[letter].map(({ tag, count }) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="flex justify-between items-center p-3 border border-black hover:bg-gray-100"
                  >
                    <span>{tag}</span>
                    <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">{count}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
