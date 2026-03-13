import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getUserFromRequest } from '@/lib/auth';

export async function GET() {
  const db = await getDb();
  const contacts = await db.collection('contacts').find().toArray();
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const { name, email, message } = await request.json();
  const db = await getDb();
  const auth = await getUserFromRequest(request);
  
  const result = await db.collection('contacts').insertOne({
    name,
    email,
    message,
    userId: auth?.userId ?? null,
    userEmail: auth?.email ?? null,
    createdAt: new Date()
  });
  
  return NextResponse.json(result);
}