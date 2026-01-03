import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const { code, subtotal } = await request.json()

    const coupons = await getCollection("coupons")
    const coupon = await coupons.findOne({
      code: code.toUpperCase(),
      isActive: true,
    })

    if (!coupon) {
      return NextResponse.json({ error: "Nevaljan kupon" }, { status: 400 })
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json({ error: "Kupon je istekao" }, { status: 400 })
    }

    if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json({ error: "Kupon je iskorišten" }, { status: 400 })
    }

    if (coupon.minPurchase > 0 && subtotal < coupon.minPurchase) {
      return NextResponse.json({ error: `Minimalna kupovina za ovaj kupon je ${coupon.minPurchase}€` }, { status: 400 })
    }

    let discount = 0
    if (coupon.type === "percentage") {
      discount = (subtotal * coupon.value) / 100
    } else {
      discount = Math.min(coupon.value, subtotal)
    }

    return NextResponse.json({
      valid: true,
      coupon: {
        code: coupon.code,
        type: coupon.type,
        value: coupon.value,
        discount,
      },
    })
  } catch (error) {
    console.error("Coupon validation error:", error)
    return NextResponse.json({ error: "Greška pri validaciji kupona" }, { status: 500 })
  }
}
