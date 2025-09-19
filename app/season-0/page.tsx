import Link from "next/link"
import { SiteFooter } from "@/components/layout/site-footer"
import { ExternalLink, FileText, Image, BarChart3, Target, Wand2 } from "lucide-react"

export default function Season0Page() {
  const tools = [
    {
      name: "PostGen",
      description: "Generate viral content ideas for 5 platforms. Never run out of post ideas with AI-powered suggestions for LinkedIn, TikTok, Instagram, Twitter, and YouTube.",
      url: "https://postgen.craftthefuture.xyz",
      icon: <FileText className="w-8 h-8" />,
      color: "bg-blue-500"
    },
    {
      name: "MemeGen", 
      description: "Create meme captions in multiple styles. Upload custom memes or choose templates, then get witty, viral-ready captions in Professional, Playful, or Bold styles.",
      url: "https://memegen.craftthefuture.xyz",
      icon: <Image className="w-8 h-8" />,
      color: "bg-purple-500"
    },
    {
      name: "VibeScan",
      description: "AI-powered tone analysis & feedback. Analyze your content's tone across 6 categories and get instant rewrites based on emoji vibes (🔥 Bold, 😒 Casual, 💡 Inspiring).",
      url: "https://vibescan.craftthefuture.xyz", 
      icon: <BarChart3 className="w-8 h-8" />,
      color: "bg-pink-500"
    },
    {
      name: "HookGen",
      description: "Generate engaging hooks for any topic. Choose from 25 unique tones (Professional to Zen) and let AI create compelling, attention-grabbing hooks for your content.",
      url: "https://hookgen.craftthefuture.xyz",
      icon: <Target className="w-8 h-8" />,
      color: "bg-green-500"
    },
    {
      name: "Campaign Wizard",
      description: "Complete marketing campaigns with AI. Generate comprehensive campaigns with hooks, emails, and timelines tailored to your goals and 10+ channels.",
      url: "https://campaignwiz.craftthefuture.xyz",
      icon: <Wand2 className="w-8 h-8" />,
      color: "bg-orange-500"
    }
  ]

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">
      <div className="flex-1 flex flex-col p-6">
        {/* Hero Section */}
        <div className="text-center my-12">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            Season 0
            <br />
            <span className="text-green-600">is now Live</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            🚀 <strong>5 AI Tools That Will Transform Your Content Creation</strong><br />
            Stop struggling with writer's block. Generate viral content and complete campaigns in seconds, not hours.
          </p>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 max-w-2xl mx-auto mb-8">
            <p className="text-green-800 font-semibold">
              ⚡ Join early adopters using these tools to 10x their content output
            </p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
          {tools.map((tool, index) => (
            <div 
              key={tool.name}
              className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-all duration-300 hover:border-gray-300 group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`${tool.color} text-white p-3 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-gray-600 mb-6">{tool.description}</p>
                </div>
              </div>
              
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-bold hover:from-green-700 hover:to-green-800 transition-all duration-300 group-hover:scale-105 transform shadow-lg hover:shadow-xl"
              >
                🚀 Try FREE Now
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="my-16 text-center bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200">
          <h2 className="text-3xl font-bold mb-4">🎯 Ready to 10x Your Content?</h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            These tools represent our vision for the future of creative work. 
            <strong> Each one is designed to amplify human creativity, not replace it.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/about" 
              className="bg-gradient-to-r from-black to-gray-800 text-white px-8 py-4 rounded-lg font-bold hover:from-gray-800 hover:to-black transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              🚀 Learn Our Mission
            </Link>
            <Link 
              href="/feed" 
              className="bg-gradient-to-r from-gray-100 to-gray-200 text-black px-8 py-4 rounded-lg font-bold hover:from-gray-200 hover:to-gray-300 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              📖 Read Success Stories
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="my-16">
          <h2 className="text-3xl font-bold text-center mb-8">What Makes These Tools Special</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">
                Built with cutting-edge AI that understands context and creativity
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast & Intuitive</h3>
              <p className="text-gray-600">
                Designed for speed and ease of use, not complexity
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Creative Focus</h3>
              <p className="text-gray-600">
                Tools that enhance human creativity, not replace it
              </p>
            </div>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
