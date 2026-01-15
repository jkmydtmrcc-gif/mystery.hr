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
    const users = await getCollection("users")
    const products = await getCollection("products")

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    const [totalOrders, totalCustomers, totalProducts, currentMonthRevenue, lastMonthRevenue] = await Promise.all([
      orders.countDocuments(),
      users.countDocuments(),
      products.countDocuments(),
      orders
        .aggregate([
          { $match: { createdAt: { $gte: startOfMonth }, paymentStatus: "paid" } },
          { $group: { _id: null, total: { $sum: "$total" } } },
        ])
        .toArray(),
      orders
        .aggregate([
          { $match: { createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }, paymentStatus: "paid" } },
          { $group: { _id: null, total: { $sum: "$total" } } },
        ])
        .toArray(),
    ])

    const totalRevenue =
      (
        await orders
          .aggregate([{ $match: { paymentStatus: "paid" } }, { $group: { _id: null, total: { $sum: "$total" } } }])
          .toArray()
      )[0]?.total || 0

    const currentRevenue = currentMonthRevenue[0]?.total || 0
    const lastRevenue = lastMonthRevenue[0]?.total || 1
    const revenueChange = Math.round(((currentRevenue - lastRevenue) / lastRevenue) * 100)

    const currentMonthOrders = await orders.countDocuments({ createdAt: { $gte: startOfMonth } })
    const lastMonthOrders = await orders.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
    })
    const ordersChange =
      lastMonthOrders > 0 ? Math.round(((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100) : 0

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      revenueChange,
      ordersChange,
    })
  } catch (error) {
    console.error("Stats error:", error)
    return NextResponse.json({ error: "Greška pri dohvaćanju statistike" }, { status: 500 })
  }
}
