import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { getCollection } from "@/lib/mongodb"
import { getAdminSession } from "@/lib/auth"

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    const coupons = await getCollection("coupons")
    const result = await coupons.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...data,
          expiresAt: data.expiresAt ? new Date(data.expiresAt) : null,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Kupon nije pronađen" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Coupon update error:", error)
    return NextResponse.json({ error: "Greška pri ažuriranju kupona" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const coupons = await getCollection("coupons")
    const result = await coupons.deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Kupon nije pronađen" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Coupon delete error:", error)
    return NextResponse.json({ error: "Greška pri brisanju kupona" }, { status: 500 })
  }
}
