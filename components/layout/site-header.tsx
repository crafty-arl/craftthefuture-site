"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, ChevronDown, Terminal, X, Search, Zap } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { InteractiveCli } from "@/components/interactive-cli"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [season0DropdownOpen, setSeason0DropdownOpen] = useState(false)
  const [cliOpen, setCliOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const cliRef = useRef<HTMLDivElement>(null)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleSeason0Dropdown = () => {
    setSeason0DropdownOpen(!season0DropdownOpen)
  }

  const toggleCli = () => {
    setCliOpen(!cliOpen)
    setSearchOpen(false)
  }

  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    setCliOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSeason0DropdownOpen(false)
      }
      if (cliRef.current && !cliRef.current.contains(event.target as Node)) {
        setCliOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open CLI
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault()
        setCliOpen(true)
        setSearchOpen(false)
      }
      // Escape to close overlays
      if (event.key === 'Escape') {
        setCliOpen(false)
        setSearchOpen(false)
        setMobileMenuOpen(false)
        setSeason0DropdownOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const season0Tools = [
    { name: "PostGen", url: "https://postgen.craftthefuture.xyz", description: "Viral content ideas" },
    { name: "MemeGen", url: "https://memegen.craftthefuture.xyz", description: "Meme captions" },
    { name: "VibeScan", url: "https://vibescan.craftthefuture.xyz", description: "Tone analysis" },
    { name: "HookGen", url: "https://hookgen.craftthefuture.xyz", description: "Engaging hooks" },
    { name: "Campaign Wizard", url: "https://campaignwiz.craftthefuture.xyz", description: "Complete campaigns" },
  ]

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/feed", label: "Feed" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
  ]

  const quickActions = [
    { href: "/season-0", label: "Season 0 Tools", icon: "🚀", description: "AI-powered creative tools" },
    { href: "/feed", label: "Browse Content", icon: "📖", description: "Latest articles & stories" },
    { href: "https://buildbycraftthefuture.substack.com", label: "Newsletter", icon: "📧", description: "Weekly insights", external: true },
  ]

  return (
    <>
      <header className="border-b border-black bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto w-full flex justify-between items-center p-4 md:p-6">
          <Link href="/" className="hover:opacity-90 transition-opacity">
            <Image
              src="/ctf-logo.png"
              alt="Craft The Future"
              width={150}
              height={40}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href 
                    ? "text-green-600 border-b-2 border-green-600" 
                    : "text-gray-700 hover:text-black hover:underline"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Season 0 Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleSeason0Dropdown}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-black hover:underline"
              >
                Season 0
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {season0DropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-2">
                    <Link
                      href="/season-0"
                      className="block px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded"
                      onClick={() => setSeason0DropdownOpen(false)}
                    >
                      All Season 0 Tools
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    {season0Tools.map((tool) => (
                      <a
                        key={tool.name}
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-2 text-sm hover:bg-gray-100 rounded"
                        onClick={() => setSeason0DropdownOpen(false)}
                      >
                        <div className="font-medium text-gray-900">{tool.name}</div>
                        <div className="text-xs text-gray-500">{tool.description}</div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CLI Button */}
            <button
              onClick={toggleCli}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-black hover:underline"
              title="Open CLI Terminal (Ctrl+K)"
            >
              <Terminal className="w-4 h-4" />
              CLI
            </button>

            <Link
              href="/newsletter"
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-black hover:underline"
            >
              Newsletter
            </Link>
            
            <Link href="/services">
              <Button className="bg-green-600 text-white hover:bg-green-700 font-semibold">
                Hire Us
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={toggleMobileMenu} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-black bg-white">
            {/* Navigation Items */}
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block p-4 border-b border-gray-200 ${
                  pathname === item.href 
                    ? "bg-green-50 text-green-800 font-semibold" 
                    : "hover:bg-gray-50 text-gray-700"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Season 0 Tools in Mobile */}
            <div className="border-b border-gray-200">
              <div className="p-4 font-semibold bg-gray-50 text-gray-700">Season 0 Tools</div>
              <Link
                href="/season-0"
                className="block p-4 pl-8 hover:bg-gray-50 border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Season 0 Tools
              </Link>
              {season0Tools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 pl-8 hover:bg-gray-50 border-b border-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="font-medium">{tool.name}</div>
                  <div className="text-sm text-gray-500">{tool.description}</div>
                </a>
              ))}
            </div>

            {/* CLI & Newsletter */}
            <div className="border-b border-gray-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  setCliOpen(true)
                }}
                className="flex items-center gap-2 p-4 hover:bg-gray-50 border-b border-gray-200 w-full text-left"
              >
                <Terminal className="w-4 h-4" />
                <span>CLI Terminal</span>
              </button>
              <Link
                href="/newsletter"
                className="block p-4 hover:bg-gray-50 border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Newsletter
              </Link>
            </div>

            {/* CTA */}
            <div className="p-4">
              <Link
                href="/services"
                className="block w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-green-600 text-white hover:bg-green-700 font-semibold">
                  Hire Us
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </header>

      {/* CLI Overlay */}
      {cliOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div ref={cliRef} className="w-full max-w-4xl max-h-[80vh] bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5" />
                <span className="font-semibold">Craft The Future CLI</span>
              </div>
              <button
                onClick={() => setCliOpen(false)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <InteractiveCli />
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div ref={cliRef} className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                <span className="font-semibold">Search Content</span>
              </div>
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search for articles, tools, or topics
                  </label>
                  <input
                    type="text"
                    placeholder="Type your search query..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    autoFocus
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/feed"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setSearchOpen(false)}
                  >
                    <span className="text-lg">📰</span>
                    <div>
                      <div className="font-medium">Browse Feed</div>
                      <div className="text-xs text-gray-500">All articles</div>
                    </div>
                  </Link>
                  <Link
                    href="/tags"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    onClick={() => setSearchOpen(false)}
                  >
                    <span className="text-lg">🏷️</span>
                    <div>
                      <div className="font-medium">Browse Tags</div>
                      <div className="text-xs text-gray-500">By topic</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
