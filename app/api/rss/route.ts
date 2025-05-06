import { type NextRequest, NextResponse } from "next/server"
import { getSourceById, getDefaultSource } from "@/lib/rss-sources"

export async function GET(request: NextRequest) {
  try {
    // Get the source ID from the query parameters
    const searchParams = request.nextUrl.searchParams
    const sourceId = searchParams.get("source")

    // Get the source URL
    const source = sourceId ? getSourceById(sourceId) : getDefaultSource()

    if (!source) {
      return NextResponse.json({ error: "Invalid source ID" }, { status: 400 })
    }

    const response = await fetch(source.url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`)
    }

    const xmlData = await response.text()

    // Return the XML data with the correct content type
    return new NextResponse(xmlData, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    })
  } catch (error) {
    console.error("Error in RSS API route:", error)
    return new NextResponse(JSON.stringify({ error: "Failed to fetch RSS feed" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
