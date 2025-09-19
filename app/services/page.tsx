"use client"

import Link from "next/link"
import { SiteFooter } from "@/components/layout/site-footer"
import { Button } from "@/components/ui/button"

export default function Services() {
  const aiTools = [
    {
      name: "PostGen",
      description: "Instantly generate platform-specific post ideas using AI for LinkedIn, TikTok, Instagram, Twitter, YouTube, and Facebook.",
      features: ["5 platform templates", "Viral content ideas", "Instant generation", "Custom tone matching"],
      link: "https://postgen.craftthefuture.xyz/",
      icon: "📝"
    },
    {
      name: "MemeGen", 
      description: "Create meme captions in multiple styles. Choose a template or upload, then select a tone for customization.",
      features: ["3 meme styles", "Custom uploads", "Tone customization", "Instant captions"],
      link: "https://memegen.craftthefuture.xyz/",
      icon: "🖼️"
    },
    {
      name: "VibeScan",
      description: "Analyze any content for tone, returning instant feedback and AI-suggested rewrites in six styles/emojis.",
      features: ["6 tone categories", "Instant analysis", "AI rewrites", "Emoji suggestions"],
      link: "https://vibescan.craftthefuture.xyz/",
      icon: "📊"
    },
    {
      name: "HookGen",
      description: "Generate engaging hooks for content in 25 different vibes/styles to maximize engagement.",
      features: ["25 tone options", "Engagement optimization", "Multiple formats", "Instant generation"],
      link: "https://hookgen.craftthefuture.xyz/",
      icon: "🎯"
    },
    {
      name: "Campaign Wizard",
      description: "Generate comprehensive marketing campaigns with AI-powered hooks, emails, and timelines tailored to your goals and channels.",
      features: ["10+ marketing channels", "Complete campaign plans", "Email sequences", "Timeline & analytics"],
      link: "https://campaignwiz.craftthefuture.xyz/",
      icon: "🎯"
    }
  ]

  const automationServices = [
    {
      title: "AI-Powered Content Workflows",
      description: "Custom integrations of our AI tools into your existing content pipeline for automated ideation, tone checking, and optimization.",
      deliverables: [
        "Custom PostGen templates for your brand voice",
        "Automated VibeScan integration for quality control", 
        "HookGen API integration for social media",
        "Campaign Wizard integration for complete marketing campaigns",
        "Workflow automation and documentation"
      ],
      outcomes: "10x content production speed while maintaining quality and brand consistency"
    },
    {
      title: "Technical Documentation Automation",
      description: "Transform your development process into engaging narratives using AI-assisted devlog generation and technical writing.",
      deliverables: [
        "AI-powered devlog generation from git commits",
        "Automated technical documentation updates",
        "Code walkthrough video scripts",
        "Process documentation templates"
      ],
      outcomes: "Keep documentation current and engaging without manual overhead"
    },
    {
      title: "Community Content Automation",
      description: "Build and nurture communities with AI-generated content that maintains authentic voice and drives engagement.",
      deliverables: [
        "Automated community engagement content",
        "AI-generated discussion prompts",
        "Event promotion content automation",
        "Community health monitoring and content suggestions"
      ],
      outcomes: "Scale community engagement while maintaining authentic voice and connection"
    }
  ]

  const traditionalServices = [
    {
      title: "Content Strategy & Storytelling",
      description: "We help you find your voice and tell compelling stories about your technology, process, and vision.",
      deliverables: [
        "Content strategy and editorial calendar",
        "Technical writing and documentation",
        "Thought leadership content",
        "Community engagement strategy"
      ],
      outcomes: "Build authentic audience engagement and establish thought leadership in your space"
    },
    {
      title: "Brand & Messaging Development",
      description: "Craft a unique brand voice that resonates with builders, technologists, and creatives.",
      deliverables: [
        "Brand voice and messaging framework",
        "Content style guide",
        "Website copy and messaging",
        "Social media strategy"
      ],
      outcomes: "Create a distinctive brand that stands out in the crowded tech space"
    },
    {
      title: "Community Building & Engagement",
      description: "Build and nurture communities around your technology and vision using our builder-first approach.",
      deliverables: [
        "Community strategy and guidelines",
        "Engagement content and campaigns",
        "Event planning and execution",
        "Moderation and community management"
      ],
      outcomes: "Foster a loyal community that advocates for your technology and vision"
    }
  ]

  const caseStudies = [
    {
      client: "ETH Chicago Conference 2023",
      challenge: "Building awareness and engagement for inaugural Midwest blockchain conference with diverse audience across 5 tracks (Builders, Creatives, Traditional Business, Legal & Policy, Financial)",
      solution: "Developed comprehensive content strategy including blog posts highlighting speakers and sessions, targeted email marketing campaigns, and active social media engagement across X/Twitter to foster community participation",
      result: "Successfully amplified ETH Chicago's mission, driving increased registration and attendance for the September 2023 conference at Willis Tower, establishing strong community engagement in the Midwest Web3 ecosystem"
    }
  ]

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">
      <div className="flex-1 flex flex-col p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Services</h1>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">🚀 Our 5 AI-Powered Tools (Free to Use)</h2>
          <p className="text-xl mb-6">
            Start with our proprietary AI tools that 10x content creation. Each tool is immediately accessible 
            and designed to enhance your creativity without replacing the human element.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
            {aiTools.map((tool, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-3">{tool.icon}</span>
                  <h3 className="text-xl font-semibold">{tool.name}</h3>
                </div>
                <p className="text-gray-700 mb-4">{tool.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {tool.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <a 
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700 transition-colors"
                >
                  Try {tool.name} FREE →
                </a>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">⚡ AI-Powered Services & Automation</h2>
          <p className="text-xl mb-6">
            Custom integrations and automation services that put our AI tools to work in your specific workflow. 
            We don't just provide tools—we build the operating system for future creators.
          </p>

          <div className="grid grid-cols-1 gap-8 my-12">
            {automationServices.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                
                <h4 className="font-semibold mb-2">What You Get:</h4>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  {service.deliverables.map((deliverable, i) => (
                    <li key={i}>• {deliverable}</li>
                  ))}
                </ul>
                
                <div className="bg-green-50 p-3 rounded">
                  <h4 className="font-semibold text-sm mb-1">Expected Outcome:</h4>
                  <p className="text-sm text-gray-700">{service.outcomes}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-4">🎨 Traditional Content Services</h2>
          <p className="text-xl mb-6">
            Classic content strategy and execution, enhanced by our unique developer-centered approach and 
            builder-first narrative that resonates with technical audiences.
          </p>

          <div className="grid grid-cols-1 gap-8 my-12">
            {traditionalServices.map((service, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-700 mb-4">{service.description}</p>
                
                <h4 className="font-semibold mb-2">What You Get:</h4>
                <ul className="text-sm text-gray-600 mb-4 space-y-1">
                  {service.deliverables.map((deliverable, i) => (
                    <li key={i}>• {deliverable}</li>
                  ))}
                </ul>
                
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-semibold text-sm mb-1">Expected Outcome:</h4>
                  <p className="text-sm text-gray-700">{service.outcomes}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-6">Case Studies</h2>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-xl border-2 border-gray-200 mb-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">🚧 Coming Soon</h3>
              <p className="text-lg text-gray-700 mb-4">
                We're currently working on detailed case studies showcasing our AI-powered content workflows, 
                automation services, and unique developer-centered approaches.
              </p>
              <p className="text-sm text-gray-600">
                In the meantime, check out our <Link href="/feed" className="text-black hover:underline">Feed</Link> to see our work in action, 
                or <Link href="/season-0" className="text-black hover:underline">try our AI tools</Link> to experience our approach firsthand.
              </p>
              </div>
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-6">🚀 Ready to Build the Future?</h2>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h3>
              <p className="text-lg text-gray-700 mb-6">
                <strong>Book a FREE 30-minute consultation</strong> to discuss your project and discover how we can help 
                you 10x your content impact with AI tools, automation, and our unique developer-centered approach.
              </p>
              <div className="bg-white p-4 rounded-lg border-2 border-green-200 mb-6">
                <p className="text-green-800 font-semibold">
                  ⚡ Book your consultation to discuss your project
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 px-8 py-4 text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.open('https://cal.com/0xgmcarl', 'popup', 'width=800,height=600,scrollbars=yes,resizable=yes')}
                >
                  🎯 Book FREE Consultation →
                </Button>
                <Button 
                  variant="outline" 
                  className="px-8 py-4 text-lg font-bold border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 transform hover:scale-105"
                  onClick={() => window.location.href = 'mailto:carl@craftthefuture.xyz'}
                >
                  📧 Email Us Directly
                </Button>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                ⚡ Response time: Usually within 48 hours | 💼 100% confidential
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Not sure if we're a good fit? Check out our <Link href="/about" className="text-black hover:underline">About page</Link> to learn more about our approach.
            </p>
          </div>
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
