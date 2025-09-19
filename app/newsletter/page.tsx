import Link from "next/link"
import { SiteFooter } from "@/components/layout/site-footer"
import { ExternalLink, Users, Zap, BookOpen, Crown, CheckCircle } from "lucide-react"

export default function NewsletterPage() {
  const tiers = [
    {
      name: "Free (Play Mode)",
      price: "Free",
      description: "Perfect for trying our tools and getting started",
      icon: <Zap className="w-6 h-6" />,
      color: "bg-gray-100 text-gray-800",
      features: [
        "Access to All Season 0 Content / Tools",
        "3 uses/day per tool",
        "Weekly newsletter with basic challenges",
        "Community access"
      ],
      cta: "Start Free",
      ctaLink: "https://buildbycraftthefuture.substack.com"
    },
    {
      name: "Monthly Plan",
      price: "$8/month",
      description: "For builders who need unlimited access",
      icon: <Users className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-800",
      features: [
        "Listed in the Creator Directory",
        "Eligible for Subscriber Spotlights in newsletters/zines",
        "Receive Blueprints (step-by-step playbooks combining tools + marketing tactics)",
        "Unlimited runs on all tools",
        "Priority support"
      ],
      cta: "Subscribe Monthly",
      ctaLink: "https://buildbycraftthefuture.substack.com"
    },
    {
      name: "Annual Plan",
      price: "$80/year",
      description: "Best value for committed builders",
      icon: <BookOpen className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-800",
      features: [
        "Everything in Monthly plan",
        "2 months free (save $16)",
        "Early access to new features",
        "Priority support",
        "Exclusive annual subscriber content"
      ],
      cta: "Subscribe Annually",
      ctaLink: "https://buildbycraftthefuture.substack.com"
    },
    {
      name: "Blueprint Member",
      price: "$150/year",
      description: "Founding members with white-label access",
      icon: <Crown className="w-6 h-6" />,
      color: "bg-yellow-100 text-yellow-800",
      features: [
        "White Label Access - Use all Season 0 tools (Hook Generator, Post Ideas, Vibe Scanner, Meme Captions, Campaign Wizard)",
        "Everything in Annual plan",
        "Founding member recognition",
        "Early access to live events/workshops",
        "Direct access to Carl for feedback"
      ],
      cta: "Become Founder",
      ctaLink: "https://buildbycraftthefuture.substack.com"
    }
  ]

  const benefits = [
    {
      title: "Low Lift, High Value",
      description: "Designed for solopreneurs. One newsletter per week, curated spotlights, and quarterly zines.",
      icon: "⚡"
    },
    {
      title: "Builder-First Community",
      description: "Connect with other builders, creators, and technologists building the future.",
      icon: "🔨"
    },
    {
      title: "AI Tools + Content",
      description: "Access to our 5 AI tools plus deep-dive content on creative work and technology.",
      icon: "🤖"
    },
    {
      title: "Exclusive Access",
      description: "Early access to new tools, experiments, and live events before they go public.",
      icon: "🚀"
    }
  ]

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">
      <div className="flex-1 flex flex-col p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Newsletter</h1>

        <div className="prose max-w-none">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join the <span className="text-green-600">Builder's Newsletter</span>
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Weekly insights on AI tools, dev culture, and the future of creative work. 
              <strong> Built for builders, by builders.</strong>
            </p>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border-2 border-green-200 mb-8">
              <p className="text-lg text-gray-800 mb-4">
                <strong>🎯 Season 0 is Live!</strong> Join early adopters using our AI tools and building the future of creative work.
              </p>
              <a
                href="https://buildbycraftthefuture.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🚀 Subscribe FREE →
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* What You Get */}
          <div className="my-12">
            <h2 className="text-2xl font-bold mb-8 text-center">What You Get</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{benefit.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-gray-700">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subscription Tiers */}
          <div className="my-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Choose Your Builder Path</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tiers.map((tier, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300">
                  <div className="text-center mb-6">
                    <div className={`${tier.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      {tier.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                    <div className="text-3xl font-bold text-green-600 mb-2">{tier.price}</div>
                    <p className="text-sm text-gray-600">{tier.description}</p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a
                    href={tier.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full block text-center py-3 px-4 rounded-lg font-bold transition-all duration-300 ${
                      tier.name === "Free (Play Mode)" 
                        ? "bg-gray-100 text-gray-800 hover:bg-gray-200" 
                        : "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Why This Works */}
          <div className="my-16 bg-gray-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Why This Works for Builders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">🎯 Solopreneur-Friendly</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 1 newsletter per week (sustainable)</li>
                  <li>• 1 spotlight per month per tier</li>
                  <li>• 1 zine per quarter (batch content)</li>
                  <li>• 1-2 live events per year (optional)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">🚀 High Value, Low Maintenance</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Directories = Simple Notion pages</li>
                  <li>• Spotlights = Curated monthly features</li>
                  <li>• Zines = Repackaged existing content</li>
                  <li>• Community = Self-sustaining builders</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="my-16 text-center bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Builder's Journey?</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Start with our free tools and newsletter, then upgrade as you grow. 
              <strong> No pressure, just building together.</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://buildbycraftthefuture.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
              >
                🚀 Start FREE Today →
              </a>
              <Link 
                href="/season-0" 
                className="bg-gray-100 text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
              >
                🔧 Try Our Tools
              </Link>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              ⚡ Join early adopters building the future of creative work
            </p>
          </div>

          {/* Footer Links */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Questions? Check out our <Link href="/about" className="text-black hover:underline">About page</Link> or 
              <Link href="/services" className="text-black hover:underline ml-1">Services</Link> to learn more about our approach.
            </p>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}