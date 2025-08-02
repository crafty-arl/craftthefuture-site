import Link from "next/link"

import { SiteFooter } from "@/components/layout/site-footer"

export default function TagNotFound() {
  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">


      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center">
        <h1 className="text-6xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-bold mb-4">Tag Not Found</h2>
        <p className="mb-8 max-w-md">
          The tag you are looking for does not exist. Please check the URL or browse our available tags.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/" className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors">
            Go Home
          </Link>
          <Link
            href="/feed"
            className="px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors"
          >
            Browse Feed
          </Link>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
