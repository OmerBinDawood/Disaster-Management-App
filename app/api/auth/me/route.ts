import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth'
import { getDb } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request: Request) {
  const payload = await getUserFromRequest(request)
  if (!payload) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  const db = await getDb()
  const user = await db
    .collection('users')
    .findOne<{ _id: ObjectId; name: string; email: string }>({ _id: new ObjectId(payload.userId) })

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  return NextResponse.json({
    user: {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    },
  })
}

