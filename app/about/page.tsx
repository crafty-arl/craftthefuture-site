import Link from "next/link"
import { SiteFooter } from "@/components/layout/site-footer"

export default function About() {
  const targetAudience = [
    {
      segment: "Indie Builders & Devs",
      motivation: "Tools, walkthroughs, and frameworks for real-world progress",
    },
    {
      segment: "Civic Tech + Policy Thinkers",
      motivation: "Insights on ethics, systems, and governance for tech that matters",
    },
    {
      segment: "Artists, Poets, and Storytellers",
      motivation: "A space to publish speculative ideas, zines, and radical narratives",
    },
  ]

  const contentStreams = [
    {
      track: "/build",
      focus: "Devlogs, tools, automation, local AI, code + culture",
      example: '"How I made a CLI that writes my devlogs with local AI"',
    },
    {
      track: "/govern",
      focus: "Civic tech, ethical AI, policy, and systems reform",
      example: '"Why local-first tech is public infrastructure"',
    },
    {
      track: "/dream",
      focus: "Short stories, visual essays, poetry, worldbuilding",
      example: '"The archive only remembers what we say out loud"',
    },
  ]

  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">


      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 md:p-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">About</h1>

        <div className="prose max-w-none">
          <h2 className="text-2xl font-bold mt-8 mb-4">Brand Positioning</h2>
          <p className="text-xl mb-6">
            Craft The Future is a hybrid content-tech product studio building the operating system for future creators. 
            We combine proprietary AI tools, developer-centered workflows, and story-driven content across three creative lanes:
          </p>
          <ul className="mb-6 space-y-2">
            <li>
              <strong>/build</strong> for the technologists
            </li>
            <li>
              <strong>/govern</strong> for the system shapers
            </li>
            <li>
              <strong>/dream</strong> for the cultural architects
            </li>
          </ul>
          <p className="mb-6">
            We don't just ship tools — we document the process, question the systems, and imagine what could be. Through
            AI-powered content creation, interactive CLI experiences, devlogs, essays, and speculative drops, Craft The Future 
            is a creative engine for those who make, shift, and dream in public.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Target Audience</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-black mb-6">
              <thead>
                <tr className="border-b border-black">
                  <th className="p-3 text-left">Segment</th>
                  <th className="p-3 text-left">Motivation</th>
                </tr>
              </thead>
              <tbody>
                {targetAudience.map((item, index) => (
                  <tr key={index} className={index < targetAudience.length - 1 ? "border-b border-black" : ""}>
                    <td className="p-3">{item.segment}</td>
                    <td className="p-3">{item.motivation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Content Streams (By Track)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-black mb-6">
              <thead>
                <tr className="border-b border-black">
                  <th className="p-3 text-left">Track</th>
                  <th className="p-3 text-left">Focus</th>
                  <th className="p-3 text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                {contentStreams.map((item, index) => (
                  <tr key={index} className={index < contentStreams.length - 1 ? "border-b border-black" : ""}>
                    <td className="p-3">{item.track}</td>
                    <td className="p-3">{item.focus}</td>
                    <td className="p-3">{item.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">What Makes Us Different</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">🚀 AI Tools First</h3>
              <p className="text-sm text-gray-700">
                Our proprietary AI tools (PostGen, MemeGen, VibeScan, HookGen, Campaign Wizard) are always accessible and front-and-center, 
                not hidden behind services. We believe in productizing creativity.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">🎨 Unique Content Formats</h3>
              <p className="text-sm text-gray-700">
                We create content in formats that resonate with builders: devlogs, technical essays, 
                and speculative stories that document the process of building the future.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">📖 Builder-First Narrative</h3>
              <p className="text-sm text-gray-700">
                We document "the process, the systems, and the dreams" to create a digital builder's zine 
                that serves as both content and community.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">🎯 Track Segmentation</h3>
              <p className="text-sm text-gray-700">
                Clear creative lanes help users self-select: /build (technical), /govern (systems/ethics), 
                /dream (stories/speculative). Each track has its own voice and purpose.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">Voice & Aesthetic</h2>
          <ul className="mb-6 space-y-2">
            <li>
              <strong>Tone:</strong> Bold, clear, poetic-technical
            </li>
            <li>
              <strong>Visuals:</strong> Terminal minimalism meets zine collage energy
            </li>
            <li>
              <strong>Style:</strong> Devlog + Essay + Myth
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Navigation */}
      <SiteFooter />
    </main>
  )
}
