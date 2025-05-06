"use client"

import { RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function RefreshButton() {
  const router = useRouter()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      router.refresh()
    } finally {
      // Keep the loading state visible for at least 500ms to provide visual feedback
      setTimeout(() => {
        setIsRefreshing(false)
      }, 500)
    }
  }

  return (
    <button
      onClick={handleRefresh}
      className="flex items-center gap-2 px-3 py-1.5 text-sm border border-black hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      title="Refresh content"
      disabled={isRefreshing}
    >
      <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
      <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
    </button>
  )
} 