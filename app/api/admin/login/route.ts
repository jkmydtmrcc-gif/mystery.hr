import { NextResponse } from "next/server"
import { createToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email i lozinka su obavezni" }, { status: 400 })
    }

    // Get admin credentials from env or use defaults
    const adminEmail = process.env.ADMIN_EMAIL || "admin@mystery.hr"
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

    // Simple credential check
    if (email !== adminEmail || password !== adminPassword) {
      return NextResponse.json({ error: "Pogrešni podaci za prijavu" }, { status: 401 })
    }

    const token = await createToken({
      id: "admin-1",
      email: adminEmail,
      role: "admin",
    })

    const response = NextResponse.json({ success: true, message: "Uspješna prijava" }, { status: 200 })

    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Greška pri prijavi" }, { status: 500 })
  }
}
