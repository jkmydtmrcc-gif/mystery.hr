import { NextResponse } from "next/server"
import { getCollection, isMongoDBAvailable } from "@/lib/mongodb"
import { getAdminSession } from "@/lib/auth"

const mockUsers = [
  {
    _id: "user-1",
    name: "Marko Horvat",
    email: "marko@example.com",
    phone: "+385 91 234 5678",
    totalOrders: 5,
    totalSpent: 245,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastOrderAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "user-2",
    name: "Ana Kovačević",
    email: "ana@example.com",
    phone: "+385 92 345 6789",
    totalOrders: 3,
    totalSpent: 175,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    lastOrderAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "user-3",
    name: "Ivan Babić",
    email: "ivan@example.com",
    phone: "+385 98 456 7890",
    totalOrders: 8,
    totalSpent: 420,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    lastOrderAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "user-4",
    name: "Petra Novak",
    email: "petra@example.com",
    phone: "+385 99 567 8901",
    totalOrders: 2,
    totalSpent: 100,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    lastOrderAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "user-5",
    name: "Luka Jurić",
    email: "luka@example.com",
    phone: "+385 91 678 9012",
    totalOrders: 12,
    totalSpent: 680,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    lastOrderAt: new Date().toISOString(),
  },
]

export async function GET() {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (!isMongoDBAvailable()) {
      return NextResponse.json({ users: mockUsers })
    }

    const orders = await getCollection("orders")
    if (!orders) {
      return NextResponse.json({ users: mockUsers })
    }

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
    return NextResponse.json({ users: mockUsers })
  }
}
