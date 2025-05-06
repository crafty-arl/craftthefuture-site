"use client"

import { useState, Suspense } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { RSS_SOURCES } from "@/lib/rss-sources"
import { ChevronDown } from "lucide-react"

export function SourceSelector() {
  return (
    <Suspense fallback={<div>Loading sources...</div>}>
      <SourceSelectorContent />
    </Suspense>
  )
}

function SourceSelectorContent() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = useState(false)

  // Get current source from URL or default to "all"
  const currentSource = searchParams.get("source") || "all"

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSourceSelect = (sourceId: string) => {
    // Create new search params
    const params = new URLSearchParams(searchParams)

    if (sourceId === "all") {
      params.delete("source")
    } else {
      params.set("source", sourceId)
    }

    // Navigate to the same page with updated query params
    router.push(`${pathname}?${params.toString()}`)
    setIsOpen(false)
  }

  // Get the display name for the current source
  const getCurrentSourceName = () => {
    if (currentSource === "all") return "All Sources"
    const source = RSS_SOURCES.find((s) => s.id === currentSource)
    return source ? `${source.icon} ${source.name}` : "All Sources"
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-2 border border-black hover:bg-gray-50"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span>{getCurrentSourceName()}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-56 bg-white border border-black shadow-lg">
          <button
            onClick={() => handleSourceSelect("all")}
            className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
              currentSource === "all" ? "bg-gray-100 font-medium" : ""
            }`}
          >
            All Sources
          </button>

          {RSS_SOURCES.map((source) => (
            <button
              key={source.id}
              onClick={() => handleSourceSelect(source.id)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 ${
                currentSource === source.id ? "bg-gray-100 font-medium" : ""
              }`}
            >
              <span className="mr-2">{source.icon}</span>
              {source.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
