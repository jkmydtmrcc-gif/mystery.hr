import { NextResponse } from "next/server"
import { getCollection } from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const contacts = await getCollection("contacts")

    const contact = {
      ...data,
      status: "new",
      createdAt: new Date(),
    }

    await contacts.insertOne(contact)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact error:", error)
    return NextResponse.json({ error: "Greška pri slanju poruke" }, { status: 500 })
  }
}
