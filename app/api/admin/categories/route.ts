import { NextResponse } from "next/server"
import { categories as defaultCategories } from "@/lib/products-data"

// In-memory store for demo - in production use a database
let customCategories: typeof defaultCategories = []

export async function GET() {
  try {
    // Return custom categories if set, otherwise default
    const cats =
      customCategories.length > 0 ? customCategories : defaultCategories.map((c) => ({ ...c, isActive: true }))
    return NextResponse.json({ categories: cats })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newCategory = {
      ...body,
      isActive: body.isActive ?? true,
    }

    // Add to custom categories
    if (customCategories.length === 0) {
      customCategories = defaultCategories.map((c) => ({ ...c, isActive: true }))
    }
    customCategories.push(newCategory)

    return NextResponse.json({ category: newCategory })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
