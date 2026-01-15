import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { createPaymentForm } from "@/lib/corvuspay"

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `MB${timestamp}${random}`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { cart, customer, couponCode, subtotal, discount, total } = body

    console.log("[v0] Checkout request:", { cart, customer })

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Košarica je prazna" }, { status: 400 })
    }

    if (!customer || !customer.firstName || !customer.email) {
      return NextResponse.json({ error: "Podaci o kupcu nisu potpuni" }, { status: 400 })
    }

    const orderNumber = generateOrderNumber()
    const orders = await getCollection("orders")

    const order = {
      orderNumber,
      customer: {
        name: `${customer.firstName} ${customer.lastName}`,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address: {
          street: customer.address,
          city: customer.city,
          postalCode: customer.postalCode,
          country: customer.country || "Hrvatska",
        },
      },
      items: cart.map((item: { productId: string; name: string; price: number; quantity: number; image: string }) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      subtotal: subtotal || 0,
      discount: discount || 0,
      total: total || 0,
      couponCode: couponCode || null,
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: "corvuspay",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    console.log("[v0] Creating order:", order)

    await orders.insertOne(order)

    if (couponCode) {
      try {
        const coupons = await getCollection("coupons")
        await coupons.updateOne({ code: couponCode.toUpperCase() }, { $inc: { usedCount: 1 } })
      } catch (error) {
        console.error("[v0] Coupon update error:", error)
      }
    }

    const cartDescription = cart
      .map((item: { name: string; quantity: number }) => `${item.name} x${item.quantity}`)
      .join(", ")

    const paymentForm = createPaymentForm({
      orderNumber,
      amount: total,
      cart: cartDescription,
      customerFirstName: customer.firstName,
      customerLastName: customer.lastName,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      customerAddress: customer.address,
      customerCity: customer.city,
      customerZipCode: customer.postalCode,
      customerCountry: customer.country || "HR",
    })

    return NextResponse.json({
      success: true,
      orderNumber,
      paymentForm,
    })
  } catch (error) {
    console.error("[v0] Checkout error:", error)
    return NextResponse.json(
      {
        error: "Greška pri kreiranju narudžbe",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
