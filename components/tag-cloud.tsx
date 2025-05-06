"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { FeedItem } from "@/lib/fetch-rss"
import { getAllTags, TAG_CATEGORIES, type TagInfo } from "@/lib/tag-utils"

interface TagCloudProps {
  feedItems: FeedItem[]
}

export function TagCloud({ feedItems }: TagCloudProps) {
  const router = useRouter()

  // Get all tags with their info
  const allTags = getAllTags(feedItems)

  // Group tags by category
  const tagGroups = allTags.reduce((groups, tag) => {
    if (!groups[tag.category]) {
      groups[tag.category] = []
    }
    groups[tag.category].push(tag)
    return groups
  }, {} as Record<string, TagInfo[]>)

  // Sort groups in a specific order
  const groupOrder = [
    TAG_CATEGORIES.CATEGORIES,
    TAG_CATEGORIES.TOPICS,
    TAG_CATEGORIES.SECTIONS,
    TAG_CATEGORIES.OTHER
  ]

  // Sort tags within each group by count
  Object.keys(tagGroups).forEach(category => {
    tagGroups[category].sort((a, b) => b.count - a.count)
  })

  return (
    <div className="space-y-6">
      {groupOrder.map((category) => {
        const tags = tagGroups[category] || []
        if (tags.length === 0) return null

        return (
          <div key={category} className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500 capitalize">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                // Calculate tag size based on count
                const maxCount = Math.max(...tags.map(t => t.count))
                const size = 1 + (tag.count / maxCount) * 0.5 // Scale between 1 and 1.5

                return (
                  <Link
                    key={tag.name}
                    href={`/tag/${tag.name}`}
                    className={`px-3 py-1 border border-black hover:bg-black hover:text-white transition-colors ${
                      category === TAG_CATEGORIES.CATEGORIES ? 'bg-gray-100' : ''
                    }`}
                    style={{ fontSize: `${size}rem` }}
                  >
                    {tag.name} <span className="text-sm">({tag.count})</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
