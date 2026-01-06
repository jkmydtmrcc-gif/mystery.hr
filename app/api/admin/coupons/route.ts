import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { getAdminSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const coupons = await getCollection("coupons")
    const couponsList = await coupons.find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json({ coupons: couponsList })
  } catch (error) {
    console.error("Coupons error:", error)
    return NextResponse.json({ error: "Greška pri dohvaćanju kupona" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const coupons = await getCollection("coupons")

    const existing = await coupons.findOne({ code: data.code })
    if (existing) {
      return NextResponse.json({ error: "Kupon s tim kodom već postoji" }, { status: 400 })
    }

    const coupon = {
      ...data,
      usedCount: 0,
      expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await coupons.insertOne(coupon)

    return NextResponse.json({ success: true, id: result.insertedId })
  } catch (error) {
    console.error("Coupon create error:", error)
    return NextResponse.json({ error: "Greška pri kreiranju kupona" }, { status: 500 })
  }
}
