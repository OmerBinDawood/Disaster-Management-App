import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function PUT(
  request: Request,
  context: any,
) {
  const { name, email, message } = await request.json();
  const db = await getDb();
  const { params } = context as { params: { id: string } };
  
  const result = await db.collection('contacts').updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { name, email, message } }
  );
  
  return NextResponse.json(result);
}

export async function DELETE(
  request: Request,
  context: any,
) {
  const db = await getDb();
  const { params } = context as { params: { id: string } };
  
  const result = await db.collection('contacts').deleteOne({
    _id: new ObjectId(params.id),
  });
  
  return NextResponse.json(result);
}