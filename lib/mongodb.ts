import { MongoClient, type Db, type Document, type Collection } from "mongodb"

const uri = process.env.MONGODB_URI || ""
const options = {}

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

export function isMongoDBAvailable(): boolean {
  return !!process.env.MONGODB_URI
}

export function isMongoConnected(): boolean {
  return !!process.env.MONGODB_URI && clientPromise !== null
}

if (uri) {
  const cleanUri = uri.replace(/:27017/g, "").replace(/\/$/, "")

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(cleanUri, options)
      global._mongoClientPromise = client.connect()
    }
    clientPromise = global._mongoClientPromise
  } else {
    client = new MongoClient(cleanUri, options)
    clientPromise = client.connect()
  }
}

export default clientPromise

export async function getDatabase(): Promise<Db | null> {
  if (!clientPromise) return null
  try {
    const client = await clientPromise
    return client.db("mysterybox")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    return null
  }
}

export async function getCollection<T extends Document>(collectionName: string): Promise<Collection<T> | null> {
  const db = await getDatabase()
  if (!db) return null
  return db.collection<T>(collectionName)
}
