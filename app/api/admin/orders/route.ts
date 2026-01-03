import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { getAdminSession } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const search = searchParams.get("search")

    const orders = await getCollection("orders")

    const query: Record<string, unknown> = {}

    if (status && status !== "all") {
      query.status = status
    }

    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: "i" } },
        { "customer.name": { $regex: search, $options: "i" } },
        { "customer.email": { $regex: search, $options: "i" } },
      ]
    }

    const skip = (page - 1) * limit

    const [ordersList, total] = await Promise.all([
      orders.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
      orders.countDocuments(query),
    ])

    return NextResponse.json({
      orders: ordersList,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    })
  } catch (error) {
    console.error("Orders error:", error)
    return NextResponse.json({ error: "Greška pri dohvaćanju narudžbi" }, { status: 500 })
  }
}
