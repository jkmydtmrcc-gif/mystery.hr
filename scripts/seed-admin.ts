import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs"

async function seedAdmin() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error("❌ MONGODB_URI is not defined in .env.local")
    console.error("Please create .env.local file with MONGODB_URI")
    process.exit(1)
  }

  const cleanUri = uri.replace(/:27017/g, "").replace(/\/$/, "")

  const client = new MongoClient(cleanUri)

  try {
    console.log("🔄 Connecting to MongoDB...")
    await client.connect()
    console.log("✅ Connected to MongoDB successfully!")

    const db = client.db("mysterybox")
    const admins = db.collection("admins")

    const adminEmail = process.env.ADMIN_EMAIL || "admin@mystery.hr"
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123"

    const existingAdmin = await admins.findOne({ email: adminEmail })

    if (existingAdmin) {
      console.log(`ℹ️  Admin user already exists: ${adminEmail}`)
      console.log("✅ No action needed")
      return
    }

    console.log("🔄 Creating admin user...")
    const hashedPassword = await bcrypt.hash(adminPassword, 12)

    await admins.insertOne({
      email: adminEmail,
      password: hashedPassword,
      name: "Administrator",
      role: "admin",
      createdAt: new Date(),
    })

    console.log("✅ Admin user created successfully!")
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("📧 Email:", adminEmail)
    console.log("🔑 Password:", adminPassword)
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    console.log("⚠️  IMPORTANT: Change this password after first login!")
    console.log("🔗 Admin Panel: http://localhost:3000/admin")
  } catch (error) {
    console.error("❌ Error seeding admin:", error)
    if (error instanceof Error) {
      console.error("Error details:", error.message)
    }
    process.exit(1)
  } finally {
    await client.close()
    console.log("🔌 MongoDB connection closed")
  }
}

seedAdmin()
