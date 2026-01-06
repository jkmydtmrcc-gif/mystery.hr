import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { parseNotification } from "@/lib/corvuspay"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const body: Record<string, string> = {}

    formData.forEach((value, key) => {
      body[key] = value.toString()
    })

    const notification = parseNotification(body)

    if (!notification.isValid) {
      console.error("Invalid payment signature")
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    const orders = await getCollection("orders")

    const updateData = {
      paymentStatus: notification.status === "approved" ? "paid" : "failed",
      status: notification.status === "approved" ? "processing" : "cancelled",
      paymentApprovalCode: notification.approvalCode,
      paymentTransactionId: notification.transactionId,
      updatedAt: new Date(),
    }

    await orders.updateOne({ orderNumber: notification.orderNumber }, { $set: updateData })

    return NextResponse.json({ status: "OK" })
  } catch (error) {
    console.error("Payment callback error:", error)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
