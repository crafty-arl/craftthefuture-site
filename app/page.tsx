import Link from "next/link"
import Image from "next/image"
import { CliAnimation } from "@/components/cli-animation"
import { SiteFooter } from "@/components/layout/site-footer"


export const revalidate = 0 // Disable caching to always fetch fresh content

export default function Home() {
  return (
    <main className="flex-1 flex flex-col max-w-4xl mx-auto border border-black w-full">


      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        <h1 className="text-6xl md:text-7xl font-bold text-center my-12">
          Read /think
          <br />
          /imagine
        </h1>

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
      </div>

      <SiteFooter />
    </main>
  )
}
