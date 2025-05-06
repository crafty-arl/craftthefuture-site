import Link from "next/link"

const CATEGORIES = [
  {
    slug: "build",
    title: "/build",
    description: "Technical insights and devlogs for builders",
    emoji: "🛠️",
  },
  {
    slug: "govern",
    title: "/govern",
    description: "Systems and ethics for shapers",
    emoji: "🏛️",
  },
  {
    slug: "dream",
    title: "/dream",
    description: "Stories and visions for architects",
    emoji: "💭",
  },
]

export function CategoryNav() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
      {CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className="border border-black p-4 hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{category.emoji}</span>
            <h3 className="text-xl font-bold">{category.title}</h3>
          </div>
          <p className="text-sm text-gray-700">{category.description}</p>
        </Link>
      ))}
    </div>
  )
}
