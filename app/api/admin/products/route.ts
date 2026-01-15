import { NextResponse } from "next/server"
import { getCollection, isMongoConnected } from "@/lib/mongodb"
import { getAdminSession } from "@/lib/auth"
import { products as staticProducts, categories } from "@/lib/products-data"

export async function GET() {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (isMongoConnected()) {
      try {
        const productsCollection = await getCollection("products")
        if (productsCollection) {
          const productsList = await productsCollection.find({}).sort({ createdAt: -1 }).toArray()
          if (productsList.length > 0) {
            return NextResponse.json({ products: productsList, source: "database" })
          }
        }
      } catch (dbError) {
        console.log("MongoDB query failed, using static data")
      }
    }

    // Return static products from lib/products-data.ts
    const formattedProducts = staticProducts.map((p, index) => ({
      _id: p.id || `static-${index}`,
      name: p.name,
      slug: p.slug,
      description: p.description || "",
      price: p.price,
      originalPrice: p.originalPrice,
      image: p.image,
      category: p.category,
      stock: p.stock || 50,
      isActive: true,
      dominantColor: p.dominantColor,
      rating: p.rating,
      reviews: p.reviews,
      potentialValue: p.potentialValue,
      includes: p.includes,
      gallery: p.gallery,
      createdAt: new Date().toISOString(),
    }))

    return NextResponse.json({ products: formattedProducts, source: "static", categories })
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

    if (isMongoConnected()) {
      try {
        const products = await getCollection("products")
        if (products) {
          const result = await products.insertOne(product)
          return NextResponse.json({ success: true, id: result.insertedId, source: "database" })
        }
      } catch (dbError) {
        console.error("MongoDB insert failed:", dbError)
      }
    }

    return NextResponse.json({
      success: true,
      id: `temp-${Date.now()}`,
      source: "static",
      message: "Za trajno spremanje potreban je MongoDB",
    })
  } catch (error) {
    console.error("Product create error:", error)
    return NextResponse.json({ error: "Greška pri kreiranju proizvoda" }, { status: 500 })
  }
}
