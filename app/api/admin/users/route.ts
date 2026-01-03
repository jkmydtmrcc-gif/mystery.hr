import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { getAdminSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orders = await getCollection("orders")

    const users = await orders
      .aggregate([
        {
          $group: {
            _id: "$customer.email",
            name: { $first: "$customer.name" },
            email: { $first: "$customer.email" },
            phone: { $first: "$customer.phone" },
            totalOrders: { $sum: 1 },
            totalSpent: { $sum: "$total" },
            createdAt: { $min: "$createdAt" },
            lastOrderAt: { $max: "$createdAt" },
          },
        },
        { $sort: { totalSpent: -1 } },
      ])
      .toArray()

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Users error:", error)
    return NextResponse.json({ error: "Greška pri dohvaćanju korisnika" }, { status: 500 })
  }
}
