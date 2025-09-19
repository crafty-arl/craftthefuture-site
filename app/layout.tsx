import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/layout/site-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Craft The Future - AI Tools That 10x Your Content Creation",
  description: "🚀 4 AI-powered creative tools: PostGen, MemeGen, VibeScan, HookGen. Stop struggling with writer's block. Generate viral content ideas, perfect captions, and engaging hooks in seconds. Join 500+ creators already using our tools.",
  keywords: "AI content creation, viral content ideas, meme generator, content marketing tools, AI writing tools, content strategy",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ctf-logo.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <SiteHeader />
          {children}
        </div>
      </body>
    </html>
  )
}
