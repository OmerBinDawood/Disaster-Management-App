import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'
import { getUserFromRequest } from '@/lib/auth'

export async function POST(request: Request) {
  const { amount, currency, type, email } = await request.json()

  if (!amount || !currency) {
    return NextResponse.json({ error: 'Amount and currency are required' }, { status: 400 })
  }

  const db = await getDb()
  const auth = await getUserFromRequest(request)

  const result = await db.collection('donations').insertOne({
    amount,
    currency,
    type: type || 'one-time',
    email: email || auth?.email || null,
    userId: auth?.userId ?? null,
    createdAt: new Date(),
  })

  return NextResponse.json({ _id: result.insertedId }, { status: 201 })
}

