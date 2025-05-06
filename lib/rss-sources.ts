export interface RssSource {
  id: string
  name: string
  url: string
  icon?: string
}

// List of RSS sources - keeping only Craft The Future
export const RSS_SOURCES: RssSource[] = [
  {
    id: "substack",
    name: "Build by Craft The Future",
    url: "https://buildbycraftthefuture.substack.com/feed",
    icon: "📝",
  },
]

// Get a source by ID
export function getSourceById(id: string): RssSource | undefined {
  return RSS_SOURCES.find((source) => source.id === id)
}

// Get default source
export function getDefaultSource(): RssSource {
  return RSS_SOURCES[0]
}
