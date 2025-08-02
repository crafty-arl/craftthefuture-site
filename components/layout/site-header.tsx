"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/feed", label: "Feed" },
    { href: "/tags", label: "Tags" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="border-b border-black">
      <div className="max-w-4xl mx-auto w-full flex justify-between items-center p-6">
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
            <Link key={item.href} href={item.href} className={pathname === item.href ? "font-bold" : "hover:underline"}>
              {item.label}
            </Link>
          ))}
          <a
            href="https://buildbycraftthefuture.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Subscribe
          </a>
          <Button 
            className="ml-4 bg-green-600 text-white hover:bg-green-700"
            onClick={() => window.open('https://cal.com/0xgmcarl', 'popup', 'width=800,height=600,scrollbars=yes,resizable=yes')}
          >
            Hire Us
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={toggleMobileMenu} aria-label="Toggle menu">
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-black">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block p-4 ${pathname === item.href ? "font-bold bg-gray-100" : "hover:bg-gray-50"} border-b border-black`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://buildbycraftthefuture.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 hover:bg-gray-50 border-b border-black"
            onClick={() => setMobileMenuOpen(false)}
          >
            Subscribe
          </a>
          <div className="p-4 border-b border-black">
            <Button 
              className="w-full bg-green-600 text-white hover:bg-green-700"
              onClick={() => {
                setMobileMenuOpen(false)
                window.open('https://cal.com/0xgmcarl', 'popup', 'width=800,height=600,scrollbars=yes,resizable=yes')
              }}
            >
              Hire Us
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}
