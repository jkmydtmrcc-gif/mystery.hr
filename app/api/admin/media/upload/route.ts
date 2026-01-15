import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // In production, upload to Vercel Blob or similar
    // For demo, we'll return a placeholder response
    const isVideo = file.type.startsWith("video/")

    const mediaFile = {
      id: `media-${Date.now()}`,
      name: file.name,
      url: `/uploads/${file.name}`,
      type: isVideo ? "video" : ("image" as const),
      size: file.size,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({ file: mediaFile })
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
