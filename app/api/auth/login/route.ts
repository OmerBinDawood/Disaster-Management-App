import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDb } from '@/lib/mongodb'
import { COOKIE_NAME, signAuthToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const db = await getDb()
    const user = await db.collection('users').findOne<{ _id: any; name: string; email: string; password: string }>({ email })

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    const userId = user._id.toString()
    const token = signAuthToken({ userId, email: user.email })

    const response = NextResponse.json({ userId, email: user.email, name: user.name })
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (err: any) {
    console.error('Error in /api/auth/login:', err)
    return NextResponse.json(
      { error: 'Internal error during login', detail: err?.message ?? String(err) },
      { status: 500 },
    )
  }
}

