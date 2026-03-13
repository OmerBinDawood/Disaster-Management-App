import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

const COLLECTION = 'reports';

export async function GET() {
  try {
    const db = await getDb();
    const reports = await db
      .collection(COLLECTION)
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json(reports);
  } catch (err: any) {
    console.error('Error in /api/reports (GET):', err);
    return NextResponse.json(
      { error: 'Failed to fetch reports', detail: err?.message ?? String(err) },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, category, latitude, longitude, description, severity } = await request.json();

    const db = await getDb();

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

    return NextResponse.json({ _id: result.insertedId, ...doc });
  } catch (err: any) {
    console.error('Error in /api/reports (POST):', err);
    return NextResponse.json(
      { error: 'Failed to create report', detail: err?.message ?? String(err) },
      { status: 500 },
    );
  }
}

