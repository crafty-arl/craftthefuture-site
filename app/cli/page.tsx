import { CalendarDays } from "lucide-react"
import { FeedCli } from "@/components/feed-cli"
import { fetchRssFeed } from "@/lib/fetch-rss"

import { SiteFooter } from "@/components/layout/site-footer"
import { TagCloud } from "@/components/tag-cloud"
import { SourceSelector } from "@/components/source-selector"
import { Suspense } from "react"
import { RefreshButton } from "@/components/refresh-button"

export const revalidate = 0 // Disable caching to always fetch fresh content

// Client-side wrapper component
function CliWrapper({ feedItems }: { feedItems: any[] }) {
  return (
    <Suspense fallback={<div>Loading CLI...</div>}>
      <FeedCli feedItems={feedItems} />
    </Suspense>
  )
}

// Source selector wrapper
function SourceSelectorWrapper() {
  return (
    <Suspense fallback={<div>Loading sources...</div>}>
      <SourceSelector />
    </Suspense>
  )
}

export default async function CliPage() {
  // Fetch all feed items
  const feedItems = await fetchRssFeed()

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">


      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 md:p-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold">CLI Browser</h1>
          <div className="flex items-center gap-4">
            <SourceSelectorWrapper />
            <RefreshButton />
            <div className="flex items-center text-sm">
              <CalendarDays size={16} className="mr-2" />
              <span>Latest updates</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-xl text-center mb-4">
            Welcome to our interactive CLI browser! Type commands like <code className="bg-gray-100 px-2 py-1 rounded">help</code> to see all available commands, <code className="bg-gray-100 px-2 py-1 rounded">tools</code> to launch Season 0 AI tools, or try <code className="bg-gray-100 px-2 py-1 rounded">latest</code> to view recent content.
          </p>
          <CliWrapper feedItems={feedItems} />
          <p className="text-center mt-4 text-gray-600">
            Want to use the CLI in your terminal? Check out our <a href="https://github.com/craftthefuture/cli" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">GitHub repository</a> to get started.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Popular Tags</h2>
        <TagCloud feedItems={feedItems} />

        <div className="mt-8 bg-gray-100 p-6 border border-black">
          <h2 className="text-xl font-bold mb-4">Available Commands</h2>
          <ul className="space-y-2">
            <li>
              <code className="bg-black text-green-400 px-2 py-1">help</code> - Show available commands
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">tools</code> - Launch Season 0 AI tools
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">latest</code> - Show the most recent content
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">filter [tag]</code> - Filter content by tag
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">tags</code> - Show all available tags
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">source [id]</code> - Filter content by source
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">sources</code> - List all available sources
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">all</code> - Show all content
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">view [id]</code> - View details of a specific article
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">read [id]</code> - Open the article page
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">open [id]</code> - Open the original article
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">search [term]</code> - Search for content
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">sort date</code> - Sort by publication date
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">sort title</code> - Sort alphabetically by title
            </li>
            <li>
              <code className="bg-black text-green-400 px-2 py-1">clear</code> - Clear the terminal
            </li>
          </ul>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
