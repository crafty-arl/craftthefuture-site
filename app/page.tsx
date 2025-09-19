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
          Season 0
          <br />
          <span className="text-green-600">is now Live</span>
        </h1>

        {/* Clear Value Proposition */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
            🚀 4 AI Tools That Will 10x Your Content Creation
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            <strong>PostGen, MemeGen, VibeScan, and HookGen</strong> - Stop struggling with writer's block. 
            Generate viral content ideas, perfect captions, and engaging hooks in seconds, not hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/season-0" 
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🎯 Try All 4 Tools FREE →
            </Link>
            <Link 
              href="/feed" 
              className="bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              📖 Read Success Stories
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            ⚡ Join early adopters using these tools
          </p>
        </div>

        {/* Season 0 Tools Preview */}
        <div className="my-12">
          <h2 className="text-3xl font-bold text-center mb-8">🔥 What You Get</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-green-300 transition-all duration-300 group cursor-pointer">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📝</div>
              <h3 className="font-bold text-sm mb-1">PostGen</h3>
              <p className="text-xs text-gray-600 mb-2">Viral content ideas</p>
              <div className="text-xs text-green-600 font-semibold">✓ 5 platforms</div>
            </div>
            <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-purple-300 transition-all duration-300 group cursor-pointer">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🖼️</div>
              <h3 className="font-bold text-sm mb-1">MemeGen</h3>
              <p className="text-xs text-gray-600 mb-2">Meme captions</p>
              <div className="text-xs text-purple-600 font-semibold">✓ 3 styles</div>
            </div>
            <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-pink-300 transition-all duration-300 group cursor-pointer">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📊</div>
              <h3 className="font-bold text-sm mb-1">VibeScan</h3>
              <p className="text-xs text-gray-600 mb-2">Tone analysis</p>
              <div className="text-xs text-pink-600 font-semibold">✓ 6 categories</div>
            </div>
            <div className="text-center p-6 border-2 border-gray-200 rounded-lg hover:shadow-lg hover:border-green-300 transition-all duration-300 group cursor-pointer">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🎯</div>
              <h3 className="font-bold text-sm mb-1">HookGen</h3>
              <p className="text-xs text-gray-600 mb-2">Engaging hooks</p>
              <div className="text-xs text-green-600 font-semibold">✓ 25 tones</div>
            </div>
          </div>
          <div className="text-center">
            <Link 
              href="/season-0" 
              className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🚀 Launch All Tools Now →
            </Link>
          </div>
        </div>

        {/* Content Preview */}
        <div className="my-8">
          <CliAnimation />
          <p className="text-center mt-4 text-gray-600">
            Explore our content in the <Link href="/feed" className="underline hover:text-black">Feed</Link> or <Link href="/cli" className="underline hover:text-black">CLI Browser</Link>.
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
        <div className="my-16 text-center bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl border-2 border-gray-200">
          <h2 className="text-3xl font-bold mb-4">📧 Don't Miss Out</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Join <strong>builders and creators</strong> getting weekly insights on AI tools, 
            dev culture, and the future of creative work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://buildbycraftthefuture.substack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🚀 Subscribe FREE →
            </a>
            <p className="text-sm text-gray-500">
              ⚡ No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="mt-16 mb-8 text-center">
          <p className="text-xl max-w-2xl mx-auto">
            A hybrid content-tech product studio building the operating system for future creators. We don't just ship tools — we document the
            process, question the systems, and imagine what could be. Through AI-powered content creation, builder-first narratives, 
            and story-driven feeds, we're creating the future of creative work.
          </p>
        </div>

        {/* Sticky CTA Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-4 z-50 shadow-lg">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="font-bold text-lg">🚀 Ready to 10x Your Content?</p>
              <p className="text-sm opacity-90">Join early adopters using our AI tools</p>
            </div>
            <div className="flex gap-3">
              <Link 
                href="/season-0" 
                className="bg-white text-green-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
              >
                Try Tools FREE →
              </Link>
              <Link 
                href="/services" 
                className="bg-green-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-900 transition-colors"
              >
                Hire Us
              </Link>
            </div>
          </div>
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
                  Every line of code is a choice about the future we want to live in. We're building the operating system for future creators 
                  by combining AI tools, developer workflows, and story-driven content that actually serves the community."
                </p>
                <p className="text-sm text-gray-600">
                  Former tech lead turned storyteller. Building the future of creative work since 2020. 
                  <Link href="/about" className="text-black hover:underline ml-1">Learn more about our mission →</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
      {/* Add padding for sticky CTA */}
      <div className="h-20"></div>
    </main>
  )
}
