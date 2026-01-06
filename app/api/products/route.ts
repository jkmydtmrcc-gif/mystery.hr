import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const products = await getCollection("products")

    const query: Record<string, unknown> = { isActive: true }
    if (category && category !== "all") {
      query.category = category
    }

    const productsList = await products.find(query).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ products: productsList })
  } catch (error) {
    console.error("Products error:", error)
    return NextResponse.json({ error: "Greška pri dohvaćanju proizvoda" }, { status: 500 })
  }
}
