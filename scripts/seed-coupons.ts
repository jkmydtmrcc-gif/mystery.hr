import { MongoClient } from "mongodb"

const coupons = [
  {
    code: "DOBRODOSLI",
    type: "percentage",
    value: 10,
    minPurchase: 0,
    maxUses: 1000,
    usedCount: 0,
    expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    code: "PREMIUM20",
    type: "percentage",
    value: 20,
    minPurchase: 100,
    maxUses: 500,
    usedCount: 0,
    expiresAt: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
  {
    code: "PRVIBOX",
    type: "fixed",
    value: 15,
    minPurchase: 50,
    maxUses: 200,
    usedCount: 0,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    isActive: true,
  },
]

async function seedCoupons() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    console.error("MONGODB_URI is not defined")
    process.exit(1)
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db("mysterybox")
    const couponsCollection = db.collection("coupons")

    for (const coupon of coupons) {
      await couponsCollection.updateOne(
        { code: coupon.code },
        {
          $setOnInsert: {
            ...coupon,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
        { upsert: true },
      )
    }

    console.log(`Successfully seeded ${coupons.length} coupons!`)
  } catch (error) {
    console.error("Error seeding coupons:", error)
  } finally {
    await client.close()
  }
}

seedCoupons()
