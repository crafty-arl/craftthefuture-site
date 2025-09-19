"use client"

import type React from "react"
import { useState, useEffect, useRef, type KeyboardEvent, Suspense } from "react"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import type { FeedItem } from "@/lib/fetch-rss"
import { RSS_SOURCES } from "@/lib/rss-sources"

type CommandOutput = {
  text: string
  isLink?: boolean
  href?: string
  isArticle?: boolean
  articleId?: string
  isHtml?: boolean
  isSource?: boolean
  sourceId?: string
}

type Command = {
  input: string
  output: CommandOutput[]
  isProcessing?: boolean
  isError?: boolean
}

interface FeedCliProps {
  feedItems: FeedItem[]
}

type CommandMode = 'select' | 'assisted'

type CommandSuggestion = {
  command: string
  description: string
  category: string
  requiresId?: boolean
}

export function FeedCli({ feedItems }: FeedCliProps) {
  return (
    <Suspense fallback={<div>Loading router...</div>}>
      <FeedCliContent feedItems={feedItems} />
    </Suspense>
  )
}

function FeedCliContent({ feedItems }: FeedCliProps) {
  const router = useRouter()
  const [commands, setCommands] = useState<Command[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [filteredItems, setFilteredItems] = useState<FeedItem[]>(feedItems)
  const [selectedArticle, setSelectedArticle] = useState<FeedItem | null>(null)
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [commandMode, setCommandMode] = useState<CommandMode>('select')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<CommandSuggestion[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const [availableIds, setAvailableIds] = useState<{ id: string; shortId: string; title: string }[]>([])

  // Update available IDs when filtered items change
  useEffect(() => {
    const ids = filteredItems.map((item, index) => ({
      id: item.id,
      shortId: (index + 1).toString(),
      title: item.title
    }))
    setAvailableIds(ids)
  }, [filteredItems])

  // Define command suggestions
  const commandSuggestions: CommandSuggestion[] = [
    { command: 'help', description: 'Show available commands', category: 'System' },
    { command: 'tools', description: 'Launch Season 0 AI tools', category: 'Tools' },
    { command: 'latest', description: 'Show the most recent content', category: 'Content' },
    { command: 'filter [tag]', description: 'Filter content by tag', category: 'Content' },
    { command: 'tags', description: 'Show all available tags', category: 'Content' },
    { command: 'source [id]', description: 'Filter content by source', category: 'Content' },
    { command: 'sources', description: 'List all available sources', category: 'Content' },
    { command: 'all', description: 'Show all content', category: 'Content' },
    { command: 'view [id]', description: 'View details of a specific article', category: 'Content', requiresId: true },
    { command: 'read [id]', description: 'Open the article page', category: 'Content', requiresId: true },
    { command: 'open [id]', description: 'Open the original article', category: 'Content', requiresId: true },
    { command: 'search [term]', description: 'Search for content', category: 'Content' },
    { command: 'sort date', description: 'Sort by publication date', category: 'Content' },
    { command: 'sort title', description: 'Sort alphabetically by title', category: 'Content' },
    { command: 'clear', description: 'Clear the terminal', category: 'System' },
  ]

  // Filter suggestions based on input and context
  useEffect(() => {
    if (currentInput.trim()) {
      const [command, ...args] = currentInput.toLowerCase().split(' ')
      const baseCommand = command.trim()
      
      // If we're in the middle of a command that requires an ID
      const currentSuggestion = commandSuggestions.find(s => s.command.startsWith(baseCommand))
      if (currentSuggestion?.requiresId && args.length === 0) {
        // Show available IDs as suggestions
        const filtered = availableIds.filter(item =>
          item.title.toLowerCase().includes(currentInput.toLowerCase())
        )
        setFilteredSuggestions(filtered.map(item => ({
          command: `${baseCommand} ${item.id}`,
          description: item.title,
          category: 'Article'
        })))
        setShowSuggestions(true)
      } else {
        // Show regular command suggestions
        const filtered = commandSuggestions.filter(suggestion =>
          suggestion.command.toLowerCase().includes(currentInput.toLowerCase()) ||
          suggestion.description.toLowerCase().includes(currentInput.toLowerCase())
        )
        setFilteredSuggestions(filtered)
        setShowSuggestions(true)
      }
    } else {
      setShowSuggestions(false)
    }
  }, [currentInput, availableIds])

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: CommandSuggestion) => {
    setCurrentInput(suggestion.command)
    setShowSuggestions(false)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  // Handle keyboard navigation for suggestions
  const handleSuggestionKeyDown = (e: KeyboardEvent<HTMLButtonElement>, suggestion: CommandSuggestion) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSuggestionClick(suggestion)
    }
  }

  // Toggle command mode
  const toggleCommandMode = () => {
    setCommandMode(prev => prev === 'select' ? 'assisted' : 'select')
    setShowSuggestions(false)
  }

  // Handle full screen toggle
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen)
  }

  // Handle F11 key press for full screen toggle
  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'F11') {
        e.preventDefault()
        toggleFullScreen()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFullScreen])

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [commands])

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Add initial welcome message
    setCommands([
      {
        input: "help",
        output: [
          { text: "CRAFT THE FUTURE FEED CLI" },
          { text: "Available commands:" },
          { text: "  latest       - Show the most recent content" },
          { text: "  filter [tag] - Filter content by tag" },
          { text: "  tags         - Show all available tags" },
          { text: "  source [id]  - Filter content by source" },
          { text: "  sources      - List all available sources" },
          { text: "  all          - Show all content" },
          { text: "  view [id]    - View details of a specific article" },
          { text: "  read [id]    - Open the article page" },
          { text: "  open [id]    - Open the original article on Substack" },
          { text: "  search [term] - Search for content" },
          { text: "  sort date    - Sort by publication date (newest first)" },
          { text: "  sort title   - Sort alphabetically by title" },
          { text: "  clear        - Clear the terminal" },
          { text: "  help         - Show this help message" },
        ],
      },
    ])
  }, [])

  // Update filtered items when feedItems change
  useEffect(() => {
    setFilteredItems(feedItems)
  }, [feedItems])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && currentInput.trim() && !isProcessing) {
      executeCommand(currentInput)
    }
  }

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase()
    setIsProcessing(true)

    // Add command to history with processing state
    setCommands((prev) => [...prev, { input: trimmedInput, output: [], isProcessing: true }])
    setCurrentInput("")

    // Process command after a short delay to show loading state
    setTimeout(() => {
      let commandOutput: CommandOutput[] = []
      let isError = false
      let newFilteredItems = [...feedItems]

      // Command processing logic
      if (trimmedInput === "help") {
        commandOutput = [
          { text: "CRAFT THE FUTURE FEED CLI" },
          { text: "Available commands:" },
          ...commandSuggestions.map(suggestion => ({
            text: `  ${suggestion.command.padEnd(15)} - ${suggestion.description}`
          }))
        ]
      } else if (trimmedInput === "tools") {
        commandOutput = [
          { text: "🚀 Season 0 AI Tools - Now Live!" },
          { text: "Launch our suite of AI-powered creative tools:" },
          {
            text: "→ PostGen - Generate platform-specific content ideas",
            isLink: true,
            href: "https://postgen.craftthefuture.xyz",
          },
          {
            text: "→ MemeGen - Create viral meme captions",
            isLink: true,
            href: "https://memegen.craftthefuture.xyz",
          },
          {
            text: "→ VibeScan - Analyze content tone & get rewrites",
            isLink: true,
            href: "https://vibescan.craftthefuture.xyz",
          },
          {
            text: "→ HookGen - Generate engaging hooks in 25 tones",
            isLink: true,
            href: "https://hookgen.craftthefuture.xyz",
          },
          { text: "Type 'tools [name]' to launch a specific tool" },
          { text: "Or visit the Season 0 page", isLink: true, href: "/season-0" },
        ]
      } else if (trimmedInput.startsWith("tools ")) {
        const toolName = trimmedInput.substring(6).toLowerCase().trim()
        const tools = {
          "postgen": { name: "PostGen", url: "https://postgen.craftthefuture.xyz", description: "Content ideas generator" },
          "memegen": { name: "MemeGen", url: "https://memegen.craftthefuture.xyz", description: "Meme caption generator" },
          "vibescan": { name: "VibeScan", url: "https://vibescan.craftthefuture.xyz", description: "Tone analysis tool" },
          "hookgen": { name: "HookGen", url: "https://hookgen.craftthefuture.xyz", description: "Hook generator" },
        }
        
        const tool = tools[toolName as keyof typeof tools]
        if (tool) {
          commandOutput = [
            { text: `🚀 Launching ${tool.name}...` },
            { text: tool.description },
            {
              text: `→ Open ${tool.name}`,
              isLink: true,
              href: tool.url,
            },
            { text: "Tool will open in a new tab" },
          ]
        } else {
          commandOutput = [
            { text: `Tool "${toolName}" not found.` },
            { text: "Available tools: postgen, memegen, vibescan, hookgen" },
            { text: "Type 'tools' to see all tools" },
          ]
          isError = true
        }
      } else if (trimmedInput === "latest") {
        // Sort by date (assuming most recent first)
        newFilteredItems = [...feedItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        setFilteredItems(newFilteredItems)

        commandOutput = [
          { text: "Showing latest content:" },
          ...newFilteredItems.slice(0, 5).map((item, index) => ({
            text: `[${index + 1}] ${item.title} (${RSS_SOURCES.find((s) => s.id === item.sourceId)?.name || item.sourceId}) - ${item.date}`,
            isArticle: true,
            articleId: (index + 1).toString(),
          })),
          { text: "Type 'view [id]' to see details or 'read [id]' to open the article page" },
        ]
      } else if (trimmedInput.startsWith("filter ")) {
        const tag = trimmedInput.split(" ")[1].toLowerCase()

        // Get all unique tags from feed items
        const allTags = [...new Set(feedItems.flatMap((item) => (item.tags ? item.tags : [])))]

        if (tag && allTags.includes(tag)) {
          newFilteredItems = feedItems.filter((item) => item.tags && item.tags.includes(tag))
          setFilteredItems(newFilteredItems)

          if (newFilteredItems.length === 0) {
            commandOutput = [
              { text: `No content found with tag "${tag}".` },
              { text: "Try 'tags' to see all available tags or 'all' to see all content." },
            ]
          } else {
            commandOutput = [
              { text: `Filtering content with tag "${tag}":` },
              ...newFilteredItems.map((item, index) => ({
                text: `[${index + 1}] ${item.title} (${RSS_SOURCES.find((s) => s.id === item.sourceId)?.name || item.sourceId}) - ${item.date}`,
                isArticle: true,
                articleId: (index + 1).toString(),
              })),
              { text: "Type 'view [id]' to see details or 'read [id]' to open the article page" },
            ]
          }
        } else {
          commandOutput = [{ text: `Tag "${tag}" not found.` }, { text: "Type 'tags' to see all available tags." }]
          isError = true
        }
      } else if (trimmedInput === "tags") {
        // Get all unique tags from feed items (excluding source IDs)
        const allTags = [
          ...new Set(feedItems.flatMap((item) => (item.tags ? item.tags.filter((tag) => tag !== item.sourceId) : []))),
        ]

        if (allTags.length === 0) {
          commandOutput = [
            { text: "No tags found in the current feed." },
            { text: "Try 'all' to see all available content." },
          ]
        } else {
          commandOutput = [
            { text: "Available tags:" },
            ...allTags.map((tag) => ({ text: `  ${tag}` })),
            { text: "Type 'filter [tag]' to filter content by tag." },
          ]
        }
      } else if (trimmedInput === "sources") {
        commandOutput = [
          { text: "Available sources:" },
          ...RSS_SOURCES.map((source, index) => ({
            text: `  ${index + 1}. ${source.icon || ""} ${source.name}`,
            isSource: true,
            sourceId: (index + 1).toString(),
          })),
          { text: "Type 'source [id]' to filter content by source." },
        ]
      } else if (trimmedInput.startsWith("source ")) {
        const sourceId = trimmedInput.split(" ")[1]
        // Try to find source by numeric ID first
        const sourceByNumber = RSS_SOURCES[parseInt(sourceId) - 1]
        const source = sourceByNumber || RSS_SOURCES.find((s) => s.id === sourceId)

        if (source) {
          newFilteredItems = feedItems.filter((item) => item.sourceId === source.id)
          setFilteredItems(newFilteredItems)

          if (newFilteredItems.length === 0) {
            commandOutput = [
              { text: `No content found from source "${source.name}".` },
              { text: "Try 'all' to see all available content." },
            ]
          } else {
            commandOutput = [
              { text: `Filtering content from ${source.icon || ""} ${source.name}:` },
              ...newFilteredItems.map((item, index) => ({
                text: `[${index + 1}] ${item.title} - ${item.date}`,
                isArticle: true,
                articleId: (index + 1).toString(),
              })),
              { text: "Type 'view [id]' to see details or 'read [id]' to open the article page" },
            ]
          }
        } else {
          commandOutput = [
            { text: `Source "${sourceId}" not found.` },
            { text: "Available sources:" },
            ...RSS_SOURCES.map((source, index) => ({
              text: `  ${index + 1}. ${source.icon || ""} ${source.name}`,
              isSource: true,
              sourceId: (index + 1).toString(),
            })),
            { text: "Type 'source [id]' to filter content by source." },
          ]
          isError = true
        }
      } else if (trimmedInput === "all") {
        setFilteredItems(feedItems)

        commandOutput = [
          { text: "Showing all content:" },
          ...feedItems.map((item, index) => ({
            text: `[${index + 1}] ${item.title} (${RSS_SOURCES.find((s) => s.id === item.sourceId)?.name || item.sourceId}) - ${item.date}`,
            isArticle: true,
            articleId: (index + 1).toString(),
          })),
          { text: "Type 'view [id]' to see details or 'read [id]' to open the article page" },
        ]
      } else if (trimmedInput.startsWith("view ")) {
        const id = trimmedInput.split(" ")[1]
        // Try to find article by short ID first
        const articleByShortId = availableIds.find(item => item.shortId === id)
        const article = articleByShortId 
          ? feedItems.find(item => item.id === articleByShortId.id)
          : feedItems.find(item => item.id === id)

        if (article) {
          setSelectedArticle(article)
          const source = RSS_SOURCES.find((s) => s.id === article.sourceId)

          // Create a simplified excerpt without HTML
          const plainExcerpt = article.excerpt.replace(/<[^>]*>/g, "")

          commandOutput = [
            { text: `Title: ${article.title}` },
            { text: `Source: ${source?.icon || ""} ${source?.name || article.sourceId}` },
            { text: `Date: ${article.date}` },
            { text: `Author: ${article.author}` },
            { text: `Read time: ${article.readTime}` },
            { text: `Tags: ${article.tags.filter((tag) => tag !== article.sourceId).join(", ")}` },
            { text: "---" },
            { text: plainExcerpt },
            { text: "---" },
            {
              text: "Read full article on this site",
              isLink: true,
              href: `/post/${article.slug}`,
            },
            {
              text: "Read on original site",
              isLink: true,
              href: article.link,
            },
          ]
        } else {
          commandOutput = [
            { text: `Article with ID ${id} not found.` },
            { text: "Available articles:" },
            ...availableIds.map(item => ({
              text: `  ${item.shortId} - ${item.title}`
            }))
          ]
          isError = true
        }
      } else if (trimmedInput.startsWith("read ")) {
        const id = trimmedInput.split(" ")[1]
        // Try to find article by short ID first
        const articleByShortId = availableIds.find(item => item.shortId === id)
        const article = articleByShortId 
          ? feedItems.find(item => item.id === articleByShortId.id)
          : feedItems.find(item => item.id === id)

        if (article) {
          // Navigate to the article page
          router.push(`/post/${article.slug}`)
          commandOutput = [{ text: `Opening article "${article.title}"...` }]
        } else {
          commandOutput = [
            { text: `Article with ID ${id} not found.` },
            { text: "Available articles:" },
            ...availableIds.map(item => ({
              text: `  ${item.shortId} - ${item.title}`
            }))
          ]
          isError = true
        }
      } else if (trimmedInput.startsWith("open ")) {
        const id = trimmedInput.split(" ")[1]
        // Try to find article by short ID first
        const articleByShortId = availableIds.find(item => item.shortId === id)
        const article = articleByShortId 
          ? feedItems.find(item => item.id === articleByShortId.id)
          : feedItems.find(item => item.id === id)

        if (article) {
          // Open the article in a new tab
          window.open(article.link, "_blank")
          commandOutput = [{ text: `Opening article "${article.title}" on original site...` }]
        } else {
          commandOutput = [
            { text: `Article with ID ${id} not found.` },
            { text: "Available articles:" },
            ...availableIds.map(item => ({
              text: `  ${item.shortId} - ${item.title}`
            }))
          ]
          isError = true
        }
      } else if (trimmedInput.startsWith("search ")) {
        const searchTerm = trimmedInput.split(" ").slice(1).join(" ").toLowerCase()

        const searchResults = feedItems.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.excerpt.toLowerCase().includes(searchTerm) ||
            item.content.toLowerCase().includes(searchTerm),
        )

        if (searchResults.length > 0) {
          commandOutput = [
            { text: `Search results for "${searchTerm}":` },
            ...searchResults.map((item, index) => ({
              text: `[${index + 1}] ${item.title} (${RSS_SOURCES.find((s) => s.id === item.sourceId)?.name || item.sourceId}) - ${item.date}`,
              isArticle: true,
              articleId: (index + 1).toString(),
            })),
            { text: "Type 'view [id]' to see details or 'read [id]' to open the article page" },
          ]
        } else {
          commandOutput = [
            { text: `No results found for "${searchTerm}".` },
            { text: "Try a different search term or 'all' to see all content." },
          ]
        }
      } else if (trimmedInput === "sort date") {
        newFilteredItems = [...filteredItems].sort(
          (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
        )
        setFilteredItems(newFilteredItems)

        commandOutput = [
          { text: "Sorting content by date (newest first):" },
          ...newFilteredItems.slice(0, 5).map((item) => ({
            text: `[${item.id}] ${item.title} - ${item.date}`,
            isArticle: true,
            articleId: item.id,
          })),
          { text: newFilteredItems.length > 5 ? `...and ${newFilteredItems.length - 5} more items` : "" },
        ]
      } else if (trimmedInput === "sort title") {
        newFilteredItems = [...filteredItems].sort((a, b) => a.title.localeCompare(b.title))
        setFilteredItems(newFilteredItems)

        commandOutput = [
          { text: "Sorting content alphabetically by title:" },
          ...newFilteredItems.slice(0, 5).map((item) => ({
            text: `[${item.id}] ${item.title} - ${item.date}`,
            isArticle: true,
            articleId: item.id,
          })),
          { text: newFilteredItems.length > 5 ? `...and ${newFilteredItems.length - 5} more items` : "" },
        ]
      } else if (trimmedInput === "clear" || trimmedInput === "cls") {
        setCommands([])
        setIsProcessing(false)
        return
      } else {
        commandOutput = [
          { text: `Command not found: ${trimmedInput}` },
          { text: "Type 'help' to see available commands" },
        ]
        isError = true
      }

      // Update command history with output
      setCommands((prev) =>
        prev.map((cmd, i) =>
          i === prev.length - 1 ? { input: trimmedInput, output: commandOutput, isProcessing: false, isError } : cmd,
        ),
      )

      setIsProcessing(false)

      // Focus input after command execution
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 800)
  }

  const handleArticleClick = (articleId: string) => {
    executeCommand(`view ${articleId}`)
  }

  return (
    <div className={`w-full border border-black bg-black text-green-400 font-mono text-xs sm:text-sm md:text-base rounded-none overflow-hidden ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}>
      <div className="flex items-center justify-between px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center">
          <div className="flex space-x-1 sm:space-x-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-2 sm:ml-4 text-gray-300 text-xs sm:text-sm">craft-terminal ~ feed</div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleCommandMode}
            className="text-gray-400 hover:text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm"
            title={`Switch to ${commandMode === 'select' ? 'assisted' : 'select'} mode`}
            aria-label={`Switch to ${commandMode === 'select' ? 'assisted' : 'select'} mode`}
          >
            {commandMode === 'select' ? 'Assisted Mode' : 'Select Mode'}
          </button>
          <button
            onClick={toggleFullScreen}
            className="text-gray-400 hover:text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm"
            title="Toggle full screen (F11)"
            aria-label="Toggle full screen"
          >
            {isFullScreen ? 'Exit' : 'Full'}
          </button>
        </div>
      </div>

      <div 
        ref={containerRef} 
        className={`p-2 sm:p-4 overflow-y-auto ${isFullScreen ? 'h-[calc(100vh-40px)]' : 'h-48 sm:h-64 md:h-80'}`} 
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Command history */}
        {commands.map((command, i) => (
          <div key={i} className="mb-2 sm:mb-4">
            <div className="flex items-center">
              <span className="text-green-600 mr-1 sm:mr-2">
                <ChevronRight size={14} className="sm:w-4 sm:h-4" />
              </span>
              <span className={`${command.isError ? "text-red-400" : ""} text-xs sm:text-sm`}>{command.input}</span>
            </div>

            {command.isProcessing ? (
              <div className="ml-4 mt-1">
                <div className="inline-block w-3 h-3 sm:w-4 sm:h-4 border-t-2 border-green-400 rounded-full animate-spin"></div>
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm">Processing...</span>
              </div>
            ) : (
              <div className="ml-4 mt-1">
                {command.output.map((line, j) => (
                  <div key={j} className={`${j === 0 ? "text-gray-400" : ""} py-0.5 text-xs sm:text-sm`}>
                    {line.isLink ? (
                      <a
                        href={line.href || "#"}
                        className="text-green-300 hover:underline active:text-green-200"
                        target={line.href?.startsWith("http") ? "_blank" : undefined}
                        rel={line.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {line.text}
                      </a>
                    ) : line.isArticle ? (
                      <button
                        onClick={() => handleArticleClick(line.articleId || "")}
                        className="text-left text-green-300 hover:underline active:text-green-200 cursor-pointer w-full"
                      >
                        {line.text}
                      </button>
                    ) : line.isHtml ? (
                      <div dangerouslySetInnerHTML={{ __html: line.text }} />
                    ) : line.isSource ? (
                      <span className="text-green-300">{line.text}</span>
                    ) : (
                      line.text
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Command input area */}
        <div className="relative">
          <div className="flex items-center">
            <span className="text-green-600 mr-1 sm:mr-2">
              <ChevronRight size={14} className="sm:w-4 sm:h-4" />
            </span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              className="bg-transparent border-none outline-none text-green-400 w-full text-xs sm:text-sm"
              placeholder={isProcessing ? "Processing..." : commandMode === 'select' ? "Type a command..." : "Type to see suggestions..."}
              disabled={isProcessing}
              aria-label="Command input"
              role="combobox"
              aria-expanded={showSuggestions}
              aria-controls="command-suggestions"
              aria-autocomplete="list"
            />
          </div>

          {/* Command suggestions */}
          {showSuggestions && commandMode === 'assisted' && (
            <div
              ref={suggestionsRef}
              id="command-suggestions"
              className="absolute left-0 right-0 mt-1 bg-gray-900 border border-gray-700 rounded-md shadow-lg max-h-48 overflow-y-auto z-10"
              role="listbox"
            >
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onKeyDown={(e) => handleSuggestionKeyDown(e, suggestion)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-800 focus:bg-gray-800 focus:outline-none text-xs sm:text-sm"
                  role="option"
                  aria-selected={currentInput === suggestion.command}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-green-300">{suggestion.command}</span>
                    <span className="text-gray-400 text-xs">{suggestion.category}</span>
                  </div>
                  <div className="text-gray-400 text-xs mt-0.5">{suggestion.description}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-900 border-t border-gray-700 text-[10px] sm:text-xs text-gray-400">
        <span className="hidden sm:inline">Type </span>
        <span className="text-green-400">help</span>
        <span className="hidden sm:inline"> for commands | </span>
        <span className="text-green-400">sources</span>
        <span className="hidden sm:inline"> for sources | </span>
        <span className="text-green-400">search [term]</span>
        <span className="hidden sm:inline"> to find articles</span>
      </div>
    </div>
  )
}
