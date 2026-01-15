import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

const prizes = [
  { id: 1, label: "10% POPUST", type: "percentage", value: 10, probability: 0.3 },
  { id: 2, label: "15% POPUST", type: "percentage", value: 15, probability: 0.2 },
  { id: 3, label: "20% POPUST", type: "percentage", value: 20, probability: 0.15 },
  { id: 4, label: "5€ POPUST", type: "fixed", value: 5, probability: 0.15 },
  { id: 5, label: "BESPLATNA DOSTAVA", type: "shipping", value: 0, probability: 0.1 },
  { id: 6, label: "POKUŠAJ PONOVO", type: "none", value: 0, probability: 0.1 },
]

function selectPrize() {
  const rand = Math.random()
  let cumulative = 0

  for (const prize of prizes) {
    cumulative += prize.probability
    if (rand <= cumulative) {
      return prize
    }
  }

  return prizes[prizes.length - 1]
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    const spinHistory = await getCollection("spin_history")

    const existingSpin = await spinHistory.findOne({ email })
    if (existingSpin) {
      return NextResponse.json({ error: "Već ste iskoristili kotač sreće" }, { status: 400 })
    }

    const prize = selectPrize()

    let couponCode = null
    if (prize.type !== "none") {
      couponCode = `SPIN${Date.now().toString(36).toUpperCase()}`

      const coupons = await getCollection("coupons")
      await coupons.insertOne({
        code: couponCode,
        type: prize.type === "shipping" ? "fixed" : prize.type,
        value: prize.type === "shipping" ? 0 : prize.value,
        freeShipping: prize.type === "shipping",
        minPurchase: 0,
        maxUses: 1,
        usedCount: 0,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        isActive: true,
        source: "spin_wheel",
        createdAt: new Date(),
      })
    }

    await spinHistory.insertOne({
      email,
      prize: prize.label,
      couponCode,
      spunAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      prize: prize.label,
      couponCode,
      prizeIndex: prizes.findIndex((p) => p.id === prize.id),
    })
  } catch (error) {
    console.error("Spin wheel error:", error)
    return NextResponse.json({ error: "Greška pri okretanju kotača" }, { status: 500 })
  }
}
