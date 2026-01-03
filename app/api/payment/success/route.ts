import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderNumber = searchParams.get("order_number")

  const cookieStore = await cookies()
  cookieStore.delete("cart")

  return NextResponse.redirect(new URL(`/narudzba-uspjesna?order=${orderNumber}`, request.url))
}

export async function POST(request: Request) {
  const formData = await request.formData()
  const orderNumber = formData.get("order_number")

  const cookieStore = await cookies()
  cookieStore.delete("cart")

  return NextResponse.redirect(new URL(`/narudzba-uspjesna?order=${orderNumber}`, request.url))
}
