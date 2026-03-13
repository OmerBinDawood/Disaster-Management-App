import { MongoClient, ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db(process.env.MONGODB_DB);
  const contacts = await db.collection('contacts').find().toArray();
  await client.close();
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  const client = await MongoClient.connect(process.env.MONGODB_URI!);
  const db = client.db(process.env.MONGODB_DB);
  
  const result = await db.collection('contacts').insertOne({
    name,
    email,
    message,
    createdAt: new Date()
  });
  
  await client.close();
  return NextResponse.json(result);
}