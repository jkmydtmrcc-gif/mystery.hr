import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"
import { verifyPassword, createToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    console.log("[v0] Admin login attempt for:", email)

    if (!email || !password) {
      return NextResponse.json({ error: "Email i lozinka su obavezni" }, { status: 400 })
    }

    let admins
    try {
      admins = await getCollection("admins")
    } catch (dbError) {
      console.error("[v0] Database connection error:", dbError)
      return NextResponse.json({ error: "Greška pri povezivanju s bazom podataka" }, { status: 500 })
    }

    const admin = await admins.findOne({ email })

    if (!admin) {
      console.log("[v0] Admin not found")
      return NextResponse.json({ error: "Pogrešni podaci za prijavu" }, { status: 401 })
    }

    const isValid = await verifyPassword(password, admin.password)

    if (!isValid) {
      console.log("[v0] Invalid password")
      return NextResponse.json({ error: "Pogrešni podaci za prijavu" }, { status: 401 })
    }

    const token = await createToken({
      id: admin._id.toString(),
      email: admin.email,
      role: "admin",
    })

    console.log("[v0] Login successful, setting cookie")

    const response = NextResponse.json({ success: true, message: "Uspješna prijava" }, { status: 200 })

    // Set cookie on response
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: false, // Allow HTTP for VPS
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    })

    return response
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Greška pri prijavi",
      },
      { status: 500 },
    )
  }
}
