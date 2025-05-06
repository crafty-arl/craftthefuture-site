import type { FeedItem } from "./fetch-rss"

// Define tag categories
export const TAG_CATEGORIES = {
  TOPICS: 'topics',
  CATEGORIES: 'categories',
  SECTIONS: 'sections',
  OTHER: 'other'
} as const

// Define common tag patterns
const TAG_PATTERNS = {
  HASHTAG: /#[\w-]+/g,
  SECTION: /\/(\w+):/g,
  CATEGORY: /category:[\w-]+/g,
  KEYWORD: /\b(devlog|ai|tech|build|tool|security|privacy|governance|ethics)\b/gi
}

// Define common words to filter out
const COMMON_WORDS = new Set([
  'the', 'and', 'for', 'with', 'this', 'that', 'what', 'when', 'where', 'why', 'how',
  'are', 'was', 'were', 'will', 'have', 'has', 'had', 'been', 'being', 'from', 'about'
])

// Function to clean and validate a tag
function validateAndCleanTag(tag: string): string | null {
  // Remove any non-alphanumeric characters except hyphens
  const cleaned = tag.replace(/[^a-z0-9-]/gi, '').toLowerCase()
  
  // Filter out:
  // 1. Empty strings
  // 2. Pure numbers
  // 3. Common words
  // 4. Too short tags
  if (
    !cleaned ||
    /^\d+$/.test(cleaned) ||
    COMMON_WORDS.has(cleaned) ||
    cleaned.length < 2
  ) {
    return null
  }

  return cleaned
}

export interface TagInfo {
  name: string
  count: number
  category: typeof TAG_CATEGORIES[keyof typeof TAG_CATEGORIES]
  relatedTags: string[]
}

export function extractTags(content: string, title: string): string[] {
  const tags = new Set<string>()
  const text = (content + ' ' + title).toLowerCase()

  // Extract hashtags
  const hashtagMatches = text.match(TAG_PATTERNS.HASHTAG) || []
  hashtagMatches.forEach(tag => {
    const cleanTag = tag.slice(1).trim()
    const validTag = validateAndCleanTag(cleanTag)
    if (validTag) {
      tags.add(validTag)
    }
  })

  // Extract section markers
  const sectionMatches = text.match(TAG_PATTERNS.SECTION) || []
  sectionMatches.forEach(section => {
    const cleanTag = section.slice(1, -1).trim()
    const validTag = validateAndCleanTag(cleanTag)
    if (validTag) {
      tags.add(validTag)
    }
  })

  // Extract categories
  const categoryMatches = text.match(TAG_PATTERNS.CATEGORY) || []
  categoryMatches.forEach(category => {
    const cleanTag = category.replace('category:', '').trim()
    const validTag = validateAndCleanTag(cleanTag)
    if (validTag) {
      tags.add(validTag)
    }
  })

  // Extract keywords
  const keywordMatches = text.match(TAG_PATTERNS.KEYWORD) || []
  keywordMatches.forEach(keyword => {
    const cleanTag = keyword.toLowerCase().trim()
    const validTag = validateAndCleanTag(cleanTag)
    if (validTag) {
      tags.add(validTag)
    }
  })

  return Array.from(tags)
}

export function categorizeTag(tag: string): typeof TAG_CATEGORIES[keyof typeof TAG_CATEGORIES] {
  if (tag.startsWith('#')) return TAG_CATEGORIES.TOPICS
  if (tag.includes(':')) return TAG_CATEGORIES.SECTIONS
  if (['devlogs', 'building', 'tools'].includes(tag)) return TAG_CATEGORIES.CATEGORIES
  if (['ai', 'tech', 'security', 'privacy', 'governance', 'ethics'].includes(tag)) return TAG_CATEGORIES.TOPICS
  return TAG_CATEGORIES.OTHER
}

export function getTagInfo(tag: string, feedItems: FeedItem[]): TagInfo | null {
  // Clean the tag before processing
  const validTag = validateAndCleanTag(tag)
  if (!validTag) return null

  const itemsWithTag = feedItems.filter(item => item.tags.includes(validTag))
  const relatedTags = new Set<string>()
  
  // Find related tags from items that share this tag
  itemsWithTag.forEach(item => {
    item.tags.forEach(t => {
      if (t !== validTag) relatedTags.add(t)
    })
  })

  return {
    name: validTag,
    count: itemsWithTag.length,
    category: categorizeTag(validTag),
    relatedTags: Array.from(relatedTags)
  }
}

export function getAllTags(feedItems: FeedItem[]): TagInfo[] {
  const tagSet = new Set<string>()
  feedItems.forEach(item => {
    item.tags.forEach(tag => {
      const validTag = validateAndCleanTag(tag)
      if (validTag) tagSet.add(validTag)
    })
  })

  return Array.from(tagSet)
    .map(tag => getTagInfo(tag, feedItems))
    .filter((info): info is TagInfo => info !== null)
}

export function getRelatedTags(tag: string, feedItems: FeedItem[]): string[] {
  const validTag = validateAndCleanTag(tag)
  if (!validTag) return []

  const itemsWithTag = feedItems.filter(item => item.tags.includes(validTag))
  const relatedTags = new Map<string, number>()
  
  itemsWithTag.forEach(item => {
    item.tags.forEach(t => {
      const validRelatedTag = validateAndCleanTag(t)
      if (validRelatedTag && validRelatedTag !== validTag) {
        relatedTags.set(validRelatedTag, (relatedTags.get(validRelatedTag) || 0) + 1)
      }
    })
  })

  return Array.from(relatedTags.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag)
} 