import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const products = await getCollection("products")
    const product = await products.findOne({ slug, isActive: true })

    if (!product) {
      return NextResponse.json({ error: "Proizvod nije pronađen" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Product error:", error)
    return NextResponse.json({ error: "Greška pri dohvaćanju proizvoda" }, { status: 500 })
  }
}
