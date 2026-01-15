import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    const subscribers = await getCollection("newsletter_subscribers")

    const existing = await subscribers.findOne({ email })
    if (existing) {
      return NextResponse.json({ error: "Email je već prijavljen" }, { status: 400 })
    }

    await subscribers.insertOne({
      email,
      subscribedAt: new Date(),
      isActive: true,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Newsletter error:", error)
    return NextResponse.json({ error: "Greška pri prijavi" }, { status: 500 })
  }
}
