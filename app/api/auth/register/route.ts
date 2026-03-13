import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDb } from '@/lib/mongodb'
import { COOKIE_NAME, signAuthToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })
    }

    const db = await getDb()

    const existing = await db.collection('users').findOne({ email })
    if (existing) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 10)

    const result = await db.collection('users').insertOne({
      name,
      email,
      password: hashed,
      createdAt: new Date(),
    })

    const userId = result.insertedId.toString()
    const token = signAuthToken({ userId, email })

    const response = NextResponse.json({ userId, email, name }, { status: 201 })
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (err: any) {
    console.error('Error in /api/auth/register:', err)
    return NextResponse.json(
      { error: 'Internal error during registration', detail: err?.message ?? String(err) },
      { status: 500 },
    )
  }
}

