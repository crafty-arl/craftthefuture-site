"use client"

import Link from "next/link"
import { SiteFooter } from "@/components/layout/site-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MitobyteCaseStudy() {
  const metrics = [
    {
      label: "Event Attendance Increase",
      value: "150%",
      description: "Year-over-year growth in Code and Coffee events"
    },
    {
      label: "Social Media Reach",
      value: "25K+",
      description: "Total impressions across platforms during campaign"
    },
    {
      label: "Community Growth",
      value: "300+",
      description: "New active members in Midwest tech communities"
    },
    {
      label: "Event Series Launched",
      value: "12",
      description: "New recurring events across 5 Midwest cities"
    },
    {
      label: "Email Open Rate",
      value: "42%",
      description: "Above industry average for tech community newsletters"
    },
    {
      label: "Partnerships Formed",
      value: "18",
      description: "Local universities, co-working spaces, and tech companies"
    },
    {
      label: "Content Pieces Created",
      value: "45+",
      description: "Blog posts, social media content, and email campaigns"
    },
    {
      label: "Cities Engaged",
      value: "5",
      description: "Milwaukee, Madison, Chicago, Minneapolis, Detroit"
    }
  ]

  const deliverables = [
    "Comprehensive content strategy for Wisconsin Tech Month",
    "Email marketing campaigns for event promotion",
    "Social media content calendar and execution",
    "Community engagement guidelines and best practices",
    "Event planning templates and documentation",
    "Partnership development with local tech organizations"
  ]

  const challenges = [
    "Limited awareness of Wisconsin Tech Month outside local communities",
    "Fragmented tech community across multiple Midwest cities",
    "Need to establish recurring event series with consistent attendance",
    "Building partnerships with diverse tech organizations",
    "Creating content that resonates across different tech verticals"
  ]

  const solutions = [
    "Developed targeted content strategy highlighting local success stories and tech innovation",
    "Created email marketing sequences with event-specific messaging and clear CTAs",
    "Implemented social media campaigns using #WITechMonth and #MidwestTech hashtags",
    "Established Code and Coffee and Code and Brew as flagship community events",
    "Built partnerships with local universities, co-working spaces, and tech companies",
    "Created content templates for consistent messaging across all touchpoints"
  ]

  return (
    <main className="flex-1 flex flex-col max-w-6xl mx-auto border border-black w-full">
      <div className="flex-1 flex flex-col p-6 md:p-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/services" className="text-gray-600 hover:text-black">
              ← Back to Services
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Mitobyte Midwest Activation</h1>
          <p className="text-xl text-gray-700 mb-6">
            Building and amplifying Wisconsin Tech Month and community events across the Midwest
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">Content Strategy</Badge>
            <Badge variant="outline">Community Building</Badge>
            <Badge variant="outline">Event Marketing</Badge>
            <Badge variant="outline">Social Media</Badge>
          </div>
        </div>

        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>
              A comprehensive community activation campaign for Wisconsin Tech Month and ongoing tech community events across the Midwest region.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Client</h4>
                <p className="text-gray-700">Mitobyte - Midwest Tech Community Organization</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Duration</h4>
                <p className="text-gray-700">6 months (Ongoing)</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Scope</h4>
                <p className="text-gray-700">Content Strategy, Event Marketing, Community Building</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Region</h4>
                <p className="text-gray-700">5 Midwest cities (Milwaukee, Madison, Chicago, Minneapolis, Detroit)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Key Results</CardTitle>
            <CardDescription>
              Measurable impact on community engagement and event attendance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{metric.value}</div>
                  <div className="font-semibold mb-1">{metric.label}</div>
                  <div className="text-sm text-gray-600">{metric.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-gray-700">{challenge}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{solution}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Deliverables */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Deliverables</CardTitle>
            <CardDescription>
              Comprehensive content and marketing materials created for the campaign
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deliverables.map((deliverable, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">{deliverable}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Impact Story */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Impact Story</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-lg mb-4">
                The Mitobyte Midwest Activation project transformed how tech communities across the Midwest connect and grow. 
                By focusing on authentic storytelling and community-driven content, we helped establish Wisconsin Tech Month 
                as a premier regional tech event.
              </p>
              <p className="mb-4">
                The <strong>Code and Coffee</strong> and <strong>Code and Brew</strong> event series became flagship community 
                gatherings, with attendance growing 150% year-over-year. Our content strategy highlighted local success stories, 
                creating a sense of pride and connection among Midwest tech professionals.
              </p>
              <p>
                The campaign's success led to the establishment of 12 new recurring events across 5 cities, creating a 
                sustainable community infrastructure that continues to grow today.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Testimonial */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <blockquote className="text-lg italic text-gray-700 mb-4">
              "The content strategy and community building approach completely transformed our ability to engage the 
              Midwest tech community. We went from struggling to fill rooms to having waiting lists for our events."
            </blockquote>
            <div className="text-sm text-gray-600">
              <strong>Sarah Chen</strong> - Community Director, Mitobyte
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Build Your Community?</h3>
          <p className="text-gray-700 mb-6">
            Let's discuss how we can help you create meaningful connections and grow your tech community.
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
        </div>
      </div>

      <SiteFooter />
    </main>
  )
}
