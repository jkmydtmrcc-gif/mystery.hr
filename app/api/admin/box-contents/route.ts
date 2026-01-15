import { NextResponse } from "next/server"

// In-memory store for demo - in production use a database
const customBoxContents: Record<string, unknown[]> = {}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const productSlug = searchParams.get("productSlug")

    if (productSlug) {
      return NextResponse.json({ items: customBoxContents[productSlug] || [] })
    }

    return NextResponse.json({ boxContents: customBoxContents })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch box contents" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { productSlug, items } = await request.json()

    if (!productSlug || !items) {
      return NextResponse.json({ error: "Missing productSlug or items" }, { status: 400 })
    }

    // Validate chances sum to 100
    const totalChance = items.reduce((sum: number, item: { chance: number }) => sum + item.chance, 0)
    if (Math.abs(totalChance - 100) > 0.01) {
      return NextResponse.json({ error: "Chances must sum to 100%" }, { status: 400 })
    }

    customBoxContents[productSlug] = items

    return NextResponse.json({ success: true, items })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save box contents" }, { status: 500 })
  }
}
