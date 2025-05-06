"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function SiteFooter() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/tags", label: "Tags" },
    { href: "/feed", label: "Feed" },
    { href: "/cli", label: "CLI" },
  ]

  return (
    <>
      <nav className="flex border-t border-black">
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`
              flex-1 text-center py-4 
              ${pathname === item.href ? "bg-gray-100 font-medium" : "hover:bg-gray-100"} 
              ${index < navItems.length - 1 ? "border-r border-black" : ""}
            `}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <footer className="p-6 border-t border-black">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p>© 2024 Craft The Future</p>
          <div className="flex gap-4">
            <a
              href="https://x.com/craftthefuture_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/company/craft-the-future/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/crafty-arl"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}
