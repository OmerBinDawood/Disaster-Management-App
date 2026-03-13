import { MongoClient, Db } from 'mongodb'

let client: MongoClient | null = null
let cachedDb: Db | null = null

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb

  const uri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB

  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment variables')
  }

  if (!dbName) {
    throw new Error('MONGODB_DB is not set in environment variables')
  }

  if (!client) {
    client = new MongoClient(uri)
    await client.connect()
  }

  cachedDb = client.db(dbName)
  return cachedDb
}

