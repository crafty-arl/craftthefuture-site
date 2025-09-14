import Link from "next/link"
import Image from "next/image"
import { CliAnimation } from "@/components/cli-animation"
import { SiteFooter } from "@/components/layout/site-footer"
import { fetchRssFeed } from "@/lib/fetch-rss"

export const revalidate = 0 // Disable caching to always fetch fresh content

export default async function Home() {
  // Fetch real articles from the RSS feed
  const feedItems = await fetchRssFeed()
  const featuredArticles = feedItems.slice(0, 3) // Get the 3 most recent articles
  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">


      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        <h1 className="text-6xl md:text-7xl font-bold text-center my-12">
          Read /think
          <br />
          /imagine
        </h1>

        {/* Clear Value Proposition */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
            Insights, stories, and future-facing devlogs for builders, technologists, and creatives
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Stay ahead on AI, tools, and dev culture. Join 1,000+ future-builders getting our best drops weekly.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/feed" 
              className="bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
            >
              Start Reading
            </Link>
          </div>
        </div>

        {/* CLI Animation */}
        <div className="my-8">
          <CliAnimation />
          <p className="text-center mt-4 text-gray-600">
            Try our interactive CLI in the <Link href="/feed" className="underline hover:text-black">Feed</Link> or <Link href="/cli" className="underline hover:text-black">CLI Browser</Link> to explore our content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">/build</h2>
            <p className="text-lg">
              Technical insights
              <br />
              and devlogs
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold">/govern</h2>
            <p className="text-lg">
              Systems and ethics
              <br />
              content
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold">/dream</h2>
            <p className="text-lg">
              Stories and speculative
              <br />
              visions
            </p>
          </div>
        </div>

        {/* Visual Browse Section - Alternative to CLI */}
        <div className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredArticles.length > 0 ? (
              featuredArticles.map((article, index) => {
                // Determine track based on tags or content
                let track = "/build"
                if (article.tags.some(tag => tag.includes('govern') || tag.includes('policy') || tag.includes('civic'))) {
                  track = "/govern"
                } else if (article.tags.some(tag => tag.includes('dream') || tag.includes('story') || tag.includes('speculative'))) {
                  track = "/dream"
                }

                return (
                  <div key={article.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="text-sm text-gray-500 mb-2">{track}</div>
                    <h3 className="text-xl font-semibold mb-3">{article.title}</h3>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <Link href={`/post/${article.slug}`} className="text-black font-medium hover:underline">
                        Read more →
                      </Link>
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                    </div>
                  </div>
                )
              })
            ) : (
              // Fallback content if no articles are available
              <>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="text-sm text-gray-500 mb-2">/build</div>
                  <h3 className="text-xl font-semibold mb-3">How I made a CLI that writes my devlogs with local AI</h3>
                  <p className="text-gray-600 mb-4">A deep dive into building automated documentation tools that actually work for indie developers.</p>
                  <Link href="/feed" className="text-black font-medium hover:underline">Read more →</Link>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="text-sm text-gray-500 mb-2">/govern</div>
                  <h3 className="text-xl font-semibold mb-3">Why local-first tech is public infrastructure</h3>
                  <p className="text-gray-600 mb-4">Exploring the civic responsibility of building tools that work offline and respect user sovereignty.</p>
                  <Link href="/feed" className="text-black font-medium hover:underline">Read more →</Link>
                </div>
                <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="text-sm text-gray-500 mb-2">/dream</div>
                  <h3 className="text-xl font-semibold mb-3">The archive only remembers what we say out loud</h3>
                  <p className="text-gray-600 mb-4">A speculative essay on digital memory, collective forgetting, and the stories we choose to preserve.</p>
                  <Link href="/feed" className="text-black font-medium hover:underline">Read more →</Link>
                </div>
              </>
            )}
          </div>
          <div className="text-center">
            <Link href="/feed" className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-md font-medium transition-colors">
              Browse All Articles
            </Link>
          </div>
        </div>

        {/* Simple Subscribe Section */}
        <div className="my-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">Get our latest insights on AI, tools, and dev culture delivered weekly.</p>
          <a
            href="https://buildbycraftthefuture.substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors"
          >
            Subscribe to Newsletter
          </a>
        </div>

        <div className="mt-16 mb-8 text-center">
          <p className="text-xl max-w-2xl mx-auto">
            A story-forward content studio for people building tomorrow. We don't just ship tools — we document the
            process, question the systems, and imagine what could be.
          </p>
        </div>

        {/* Featured In Section */}
        <div className="my-12">
          <h2 className="text-2xl font-bold text-center mb-6">Featured In</h2>
          <div className="flex flex-wrap flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
            <img src="/ethchilogo.webp" alt="ETH CHI" className="h-14 md:h-16 max-w-[140px] md:max-w-[180px] w-auto object-contain" />
            <img src="/mketechlogo.webp" alt="MKE TECH" className="h-14 md:h-16 max-w-[140px] md:max-w-[180px] w-auto object-contain" />
            <img src="/sftechlogo3.webp" alt="TECH" className="h-14 md:h-16 max-w-[140px] md:max-w-[180px] w-auto object-contain" />
            <img src="/blockchainfuturistlogo.webp" alt="Blockchain Futurist Conference" className="h-14 md:h-16 max-w-[180px] md:max-w-[220px] w-auto object-contain" />
          </div>
        </div>


        {/* Founder Bio Section */}
        <div className="my-16 bg-gray-50 p-8 rounded-lg">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Why We Built This</h2>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-32 h-32 rounded-full overflow-hidden mx-auto md:mx-0">
                <Image
                  src="/1749784593382.jpg"
                  alt="Carl, Founder & Chief Storyteller"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">Carl, Founder & Chief Storyteller</h3>
                <p className="text-gray-700 mb-4">
                  "I started Craft The Future because I was tired of the disconnect between the tools we build and the stories we tell about them. 
                  Every line of code is a choice about the future we want to live in. We document that process, question the systems, 
                  and imagine what could be."
                </p>
                <p className="text-sm text-gray-600">
                  Former tech lead turned storyteller. Building in public since 2020. 
                  <Link href="/about" className="text-black hover:underline ml-1">Learn more about our mission →</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
