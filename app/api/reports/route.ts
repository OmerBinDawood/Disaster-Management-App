import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const COLLECTION = 'reports';

export async function GET() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db(process.env.MONGODB_DB);

  const reports = await db
    .collection(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();

  await client.close();
  return NextResponse.json(reports);
}

export async function POST(request: Request) {
  const { name, category, latitude, longitude, description, severity } = await request.json();

  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db(process.env.MONGODB_DB);

  const doc = {
    name: name || 'Anonymous',
    category,
    latitude: Number(latitude),
    longitude: Number(longitude),
    description,
    severity: Number(severity) || 1,
    status: 'unverified' as const,
    createdAt: new Date(),
  };

  const result = await db.collection(COLLECTION).insertOne(doc);
  await client.close();

  return NextResponse.json({ _id: result.insertedId, ...doc });
}

