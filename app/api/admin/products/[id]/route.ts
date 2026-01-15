import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection, isMongoConnected } from "@/lib/mongodb"
import { getAdminSession } from "@/lib/auth"
import { products as staticProducts } from "@/lib/products-data"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    if (isMongoConnected()) {
      try {
        const products = await getCollection("products")
        if (products) {
          const product = await products.findOne({ _id: new ObjectId(id) })
          if (product) {
            return NextResponse.json(product)
          }
        }
      } catch (dbError) {
        console.log("MongoDB query failed, checking static products")
      }
    }

    // Check static products
    const staticProduct = staticProducts.find((p) => p.id === id || p.slug === id)
    if (staticProduct) {
      return NextResponse.json({
        _id: staticProduct.id,
        ...staticProduct,
        stock: staticProduct.stock || 50,
        isActive: true,
      })
    }

    return NextResponse.json({ error: "Proizvod nije pronađen" }, { status: 404 })
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

    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

    if (isMongoConnected()) {
      try {
        const products = await getCollection("products")
        if (products) {
          const result = await products.updateOne(
            { _id: new ObjectId(id) },
            { $set: { ...data, slug, updatedAt: new Date() } },
          )
          if (result.matchedCount > 0) {
            return NextResponse.json({ success: true, source: "database" })
          }
        }
      } catch (dbError) {
        console.error("MongoDB update failed:", dbError)
      }
    }

    return NextResponse.json({
      success: true,
      source: "static",
      message: "Za trajno spremanje potreban je MongoDB",
    })
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

    if (isMongoConnected()) {
      try {
        const products = await getCollection("products")
        if (products) {
          const result = await products.deleteOne({ _id: new ObjectId(id) })
          if (result.deletedCount > 0) {
            return NextResponse.json({ success: true, source: "database" })
          }
        }
      } catch (dbError) {
        console.error("MongoDB delete failed:", dbError)
      }
    }

    return NextResponse.json({
      success: true,
      source: "static",
      message: "Za trajno brisanje potreban je MongoDB",
    })
  } catch (error) {
    console.error("Product delete error:", error)
    return NextResponse.json({ error: "Greška pri brisanju proizvoda" }, { status: 500 })
  }
}
