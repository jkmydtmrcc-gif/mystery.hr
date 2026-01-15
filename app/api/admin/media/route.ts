import { NextResponse } from "next/server"

// In-memory store for demo - in production use blob storage
const mediaFiles: Array<{
  id: string
  name: string
  url: string
  type: "image" | "video"
  size: number
  createdAt: string
}> = []

export async function GET() {
  try {
    return NextResponse.json({ files: mediaFiles })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch media" }, { status: 500 })
  }
}
