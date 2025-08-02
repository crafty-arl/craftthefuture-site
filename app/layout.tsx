import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/components/layout/site-header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Craft The Future",
  description: "A publishing platform for thinkers, builders, and dreamers",
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
