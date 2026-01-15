import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"
import { getAdminSession } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const orders = await getCollection("orders")
    const order = await orders.findOne({ _id: new ObjectId(id) })

    if (!order) {
      return NextResponse.json({ error: "Narudžba nije pronađena" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Order error:", error)
    return NextResponse.json({ error: "Greška pri dohvaćanju narudžbe" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const updates = await request.json()

    const orders = await getCollection("orders")
    const result = await orders.updateOne({ _id: new ObjectId(id) }, { $set: { ...updates, updatedAt: new Date() } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Narudžba nije pronađena" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Order update error:", error)
    return NextResponse.json({ error: "Greška pri ažuriranju narudžbe" }, { status: 500 })
  }
}
