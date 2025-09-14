"use client"

import Link from "next/link"
import { SiteFooter } from "@/components/layout/site-footer"
import { Button } from "@/components/ui/button"

export default function Services() {
  const services = [
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
      title: "Technical Documentation & Devlogs",
      description: "Transform your development process into engaging narratives that inspire and educate.",
      deliverables: [
        "Interactive devlog series",
        "Technical documentation",
        "Code walkthrough videos",
        "Process documentation"
      ],
      outcomes: "Increase developer adoption and create educational content that drives community growth"
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
      description: "Build and nurture communities around your technology and vision.",
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
    },
    {
      client: "Mitobyte Activation for Midwest",
      challenge: "Building awareness and engagement for Wisconsin Tech Month and community events like Code and Coffee and Code and Brew across the Midwest",
      solution: "Developed comprehensive content strategy including blog posts highlighting WI Tech Month activities, targeted email marketing campaigns for event promotion, and active social media engagement to drive attendance to Code and Coffee and Code and Brew events",
      result: "Successfully amplified Wisconsin Tech Month visibility and increased attendance at community events, establishing stronger tech community connections across the Midwest region"
    }
  ]

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">
      <div className="flex-1 flex flex-col p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Services</h1>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">What We Do</h2>
          <p className="text-xl mb-6">
            We help technology companies and creators tell better stories about their work. 
            From technical documentation to community building, we turn complex ideas into 
            compelling narratives that inspire action.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            {services.map((service, index) => (
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
          <div className="space-y-8 mb-12">
            {caseStudies.map((study, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{study.client}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold mb-1">Challenge:</h4>
                    <p className="text-gray-600">{study.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Solution:</h4>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Result:</h4>
                    <p className="text-gray-600">{study.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mt-12 mb-6">Ready to Get Started?</h2>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-semibold mb-4">Let's Build Something Together</h3>
              <p className="text-gray-700 mb-6">
                Book a free 30-minute consultation to discuss your project and how we can help 
                you tell better stories about your technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-green-600 text-white hover:bg-green-700 px-8 py-3"
                  onClick={() => window.open('https://cal.com/0xgmcarl', 'popup', 'width=800,height=600,scrollbars=yes,resizable=yes')}
                >
                  Book Free Consultation
                </Button>
                <Button 
                  variant="outline" 
                  className="px-8 py-3"
                  onClick={() => window.location.href = 'mailto:carl@craftthefuture.xyz'}
                >
                  Email Us Directly
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Response time: Usually within 24 hours
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
