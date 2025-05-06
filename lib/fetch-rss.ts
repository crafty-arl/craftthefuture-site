import { XMLParser } from "fast-xml-parser"
import { RSS_SOURCES, type RssSource } from "./rss-sources"
import { extractTags } from "./tag-utils"

export interface FeedItem {
  id: string
  title: string
  slug: string
  date: string
  excerpt: string
  content: string
  author: string
  sourceId: string
  tags: string[]
  imageUrl?: string
  readTime?: string
  pubDate: string
  link: string
}

// Update the mock data to include sourceId
const MOCK_FEED_ITEMS: FeedItem[] = [
  {
    id: "1",
    title: "Stop Shipping Alone: Why Devlogs Actually Matter",
    date: "May 5, 2025",
    excerpt: "You don't need a brand. You need a devlog.",
    author: "GM! Carl",
    readTime: "3 min read",
    link: "https://buildbycraftthefuture.substack.com/p/stop-shipping-alone-why-devlogs-actually",
    content:
      "<p>Hey builder,</p><p>Ever wonder why some indie projects get traction while others ghost into the void? It's not polish. It's not hype. It's the habit of showing your work — and owning the mess.</p>",
    imageUrl: "/placeholder.svg?height=400&width=600",
    slug: "stop-shipping-alone-why-devlogs-actually-matter",
    pubDate: "Mon, 05 May 2025 23:01:20 GMT",
    tags: ["devlogs", "building", "indie"],
    sourceId: "craftthefuture",
  },
  {
    id: "2",
    title: "🧠 Tech News Roundup · #2",
    date: "May 5, 2025",
    excerpt: "AI agents get to work, encryption fumbles the human layer, and spyware targets exiles",
    author: "GM! Carl",
    readTime: "5 min read",
    link: "https://buildbycraftthefuture.substack.com/p/tech-news-roundup-2",
    content:
      "<blockquote><h3>📬 <strong>Ship, Don't Shill — New Email Series Launches Tonight @ 6PM</strong></h3><p>A short, sharp series on building honest products — not hype.<br>Tactics, devlogs, and raw lessons from real indie tools.</p></blockquote>",
    imageUrl: "/placeholder.svg?height=400&width=600",
    slug: "tech-news-roundup-2",
    pubDate: "Mon, 05 May 2025 13:02:46 GMT",
    tags: ["news", "tech", "ai"],
    sourceId: "craftthefuture",
  },
  {
    id: "3",
    title: "🧠 Devlog: Rebuilding the Backbone — AI Agent Overhaul for Etherith",
    date: "May 2, 2025",
    excerpt: "⛵ Ship Don't Shill — Free Email Course",
    author: "GM! Carl",
    readTime: "7 min read",
    link: "https://buildbycraftthefuture.substack.com/p/devlog-rebuilding-the-backbone-ai",
    content:
      "<h3>⛵ <strong>Ship Don't Shill — Free Email Course</strong></h3><p>Tired of threads that say nothing and builds that never ship?</p>",
    imageUrl: "/placeholder.svg?height=400&width=600",
    slug: "devlog-rebuilding-the-backbone-ai-agent-overhaul-for-etherith",
    pubDate: "Fri, 02 May 2025 13:03:01 GMT",
    tags: ["devlogs", "ai", "agents"],
    sourceId: "craftthefuture",
  },
]

// Update the fetchRssFeed function to handle multiple sources
export async function fetchRssFeed(sourceId?: string): Promise<FeedItem[]> {
  try {
    const response = await fetch("https://buildbycraftthefuture.substack.com/feed", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`)
    }

    const xml = await response.text()
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_",
      cdataTagName: "__cdata",
      textNodeName: "__text",
    })
    
    const result = parser.parse(xml)
    const items = Array.isArray(result.rss.channel.item) 
      ? result.rss.channel.item 
      : [result.rss.channel.item]

    // Process and transform feed items
    const feedItems: FeedItem[] = items.map((item: any) => {
      // Extract content from CDATA if present
      const content = item["content:encoded"]?.["__cdata"] || 
                     item["content:encoded"]?.["__text"] || 
                     item["content:encoded"] || // Try direct content access
                     item.description?.["__cdata"] || 
                     item.description?.["__text"] || 
                     item.description || 
                     ""

      // Extract title from CDATA if present
      const title = item.title?.["__cdata"] || 
                   item.title?.["__text"] || 
                   item.title || 
                   ""

      // Extract description for excerpt
      const description = item.description?.["__cdata"] || 
                         item.description?.["__text"] || 
                         item.description || 
                         ""

      // Extract tags using our new utility
      const tags = extractTags(content, title)

      // Create slug from title
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      // Extract image URL from content if present
      const imageMatch = content.match(/<img[^>]+src="([^">]+)"/)
      const imageUrl = imageMatch ? imageMatch[1] : undefined

      // Calculate read time based on content length
      const wordCount = content.replace(/<[^>]*>/g, "").split(/\s+/).length
      const readTime = Math.max(1, Math.round(wordCount / 200)) + " min read"

      // Format the content for display
      const formatContent = (content: string): string => {
        // Remove any CDATA tags
        let formatted = content.replace(/<!\[CDATA\[|\]\]>/g, '')
        
        // Clean up HTML and add proper spacing
        formatted = formatted
          .replace(/<p>\s*<\/p>/g, '') // Remove empty paragraphs
          .replace(/\n\s*\n/g, '\n') // Remove multiple newlines
          .replace(/<p>/g, '<p class="mb-4">') // Add margin to paragraphs
          .replace(/<h([1-6])>/g, '<h$1 class="mt-8 mb-4">') // Add margin to headings
          .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-gray-200 pl-4 my-6 italic">') // Style blockquotes
          .replace(/<ul>/g, '<ul class="list-disc pl-6 my-4">') // Style lists
          .replace(/<ol>/g, '<ol class="list-decimal pl-6 my-4">') // Style ordered lists
          .replace(/<li>/g, '<li class="mb-2">') // Add margin to list items
          .replace(/<img/g, '<img class="rounded-lg shadow-md my-6"') // Style images
          .replace(/<a/g, '<a class="text-blue-600 hover:underline"') // Style links
          .replace(/<strong>/g, '<strong class="font-semibold">') // Style bold text
          .replace(/<em>/g, '<em class="italic">') // Style italic text
          .replace(/<code>/g, '<code class="bg-gray-100 px-1 rounded">') // Style inline code
          .replace(/<pre>/g, '<pre class="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto">') // Style code blocks
          .trim()

        // Add spacing between sections
        formatted = formatted
          .replace(/([.!?])\s*<\/p>/g, '$1</p>\n\n') // Add extra space after sentences
          .replace(/(<\/h[1-6]>)\s*/g, '$1\n\n') // Add extra space after headings
          .replace(/(<\/blockquote>)\s*/g, '$1\n\n') // Add extra space after blockquotes
          .replace(/(<\/ul>|<\/ol>)\s*/g, '$1\n\n') // Add extra space after lists

        return formatted
      }

      return {
        id: item.guid?.["__text"] || item.guid || item.link,
        title,
        slug,
        date: new Date(item.pubDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        excerpt: description.replace(/<[^>]*>/g, "").substring(0, 200) + "...",
        content: formatContent(content),
        author: "Craft The Future",
        sourceId: "substack",
        tags,
        imageUrl,
        readTime,
        pubDate: item.pubDate,
        link: item.link,
      }
    })

    console.log('Processed feed items:', feedItems.map(item => ({
      title: item.title,
      tags: item.tags,
      content: item.content.substring(0, 100) + '...' // Log first 100 chars of content
    })))

    // Filter by source if specified
    if (sourceId) {
      return feedItems.filter((item) => item.sourceId === sourceId)
    }

    return feedItems
  } catch (error) {
    console.error("Error fetching RSS feed:", error)
    return []
  }
}

export async function getPostById(id: string): Promise<FeedItem | null> {
  const posts = await fetchRssFeed()
  return posts.find((post) => post.id === id) || null
}

export async function getPostBySlug(slug: string): Promise<FeedItem | null> {
  const feedItems = await fetchRssFeed()
  return feedItems.find((item) => item.slug === slug) || null
}
