import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"
import { getAdminSession } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const products = await getCollection("products")
    const product = await products.findOne({ _id: new ObjectId(id) })

    if (!product) {
      return NextResponse.json({ error: "Proizvod nije pronađen" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Product error:", error)
    return NextResponse.json({ error: "Greška pri dohvaćanju proizvoda" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    const products = await getCollection("products")

    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    const result = await products.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data, slug, updatedAt: new Date() } },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Proizvod nije pronađen" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Product update error:", error)
    return NextResponse.json({ error: "Greška pri ažuriranju proizvoda" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const products = await getCollection("products")
    const result = await products.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Proizvod nije pronađen" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Product delete error:", error)
    return NextResponse.json({ error: "Greška pri brisanju proizvoda" }, { status: 500 })
  }
}
