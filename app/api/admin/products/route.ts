import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { getAdminSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const products = await getCollection("products")
    const productsList = await products.find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ products: productsList })
  } catch (error) {
    console.error("Products error:", error)
    return NextResponse.json({ error: "Greška pri dohvaćanju proizvoda" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const products = await getCollection("products")

    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const product = {
      ...data,
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await products.insertOne(product)

    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error("Product create error:", error)
    return NextResponse.json({ error: "Greška pri kreiranju proizvoda" }, { status: 500 })
  }
}
