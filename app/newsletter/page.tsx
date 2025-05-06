import Link from "next/link"

export default function Newsletter() {
  const issues = [
    {
      number: "Issue #12",
      date: "May 1, 2024",
      title: "The Future Stack",
      highlights: [
        {
          category: "/build",
          title: "Building a personal knowledge graph with embedded vectors",
        },
        {
          category: "/govern",
          title: "Digital commons and the future of community governance",
        },
        {
          category: "/dream",
          title: "Terminal dreams: A visual essay",
        },
      ],
    },
    {
      number: "Issue #11",
      date: "April 24, 2024",
      title: "The Future Stack",
      highlights: [
        {
          category: "/build",
          title: "How I made a CLI that writes my devlogs with local AI",
        },
        {
          category: "/govern",
          title: "Why local-first tech is public infrastructure",
        },
        {
          category: "/dream",
          title: "The archive only remembers what we say out loud",
        },
      ],
    },
  ]

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">
      {/* Header */}
      <header className="flex justify-between items-center p-6 border-b border-black">
        <Link href="/" className="font-bold text-lg tracking-tight hover:underline">
          CRAFT THE FUTURE
        </Link>
        <nav className="flex gap-6">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/feed" className="hover:underline">
            Feed
          </Link>
          <a
            href="https://craftthefuture.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Subscribe
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">The Future Stack</h1>

        <p className="text-xl mb-12">
          Our weekly newsletter featuring 1 from /build, 1 from /govern, 1 from /dream + curated links.
        </p>

        <div className="space-y-12">
          {issues.map((issue, index) => (
            <div key={index} className="border border-black p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{issue.number}</h2>
                <span className="text-sm">{issue.date}</span>
              </div>
              <h3 className="text-xl mb-6">{issue.title}</h3>

              <div className="space-y-4">
                {issue.highlights.map((highlight, hIndex) => (
                  <div key={hIndex} className="flex gap-4">
                    <span className="text-sm font-medium w-20">{highlight.category}</span>
                    <Link href="#" className="hover:underline">
                      {highlight.title}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Link href="#" className="inline-block underline">
                  Read full issue
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://craftthefuture.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
          >
            Subscribe to The Future Stack
          </a>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="flex border-t border-black">
        <Link href="/" className="flex-1 text-center py-4 hover:bg-gray-100 border-r border-black">
          Home
        </Link>
        <Link href="/topics" className="flex-1 text-center py-4 hover:bg-gray-100 border-r border-black">
          Topics
        </Link>
        <Link href="/archive" className="flex-1 text-center py-4 hover:bg-gray-100">
          Archive
        </Link>
      </nav>

      {/* Footer */}
      <footer className="p-6 border-t border-black">
        <p>© 2024 Craft The Future</p>
      </footer>
    </main>
  )
}
