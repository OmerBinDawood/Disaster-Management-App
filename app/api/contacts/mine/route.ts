import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { getUserFromRequest } from '@/lib/auth'

export async function GET(request: Request) {
  const auth = await getUserFromRequest(request)
  if (!auth) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const db = await getDb()
  const contacts = await db
    .collection('contacts')
    .find({ userId: auth.userId })
    .sort({ createdAt: -1 })
    .toArray()

  return NextResponse.json(contacts)
}

