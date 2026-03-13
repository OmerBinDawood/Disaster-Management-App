import jwt from 'jsonwebtoken'

type AuthTokenPayload = {
  userId: string
  email: string
}

const COOKIE_NAME = 'auth_token'

export function signAuthToken(payload: AuthTokenPayload): string {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not set in environment variables')
  }
  return jwt.sign(payload, secret, { expiresIn: '7d' })
}

export function verifyAuthToken(token: string): AuthTokenPayload | null {
  const secret = process.env.JWT_SECRET
  if (!secret) return null
  try {
    return jwt.verify(token, secret) as AuthTokenPayload
  } catch {
    return null
  }
}

export function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {}
  return header.split(';').reduce<Record<string, string>>((acc, part) => {
    const [key, ...rest] = part.split('=')
    if (!key) return acc
    acc[key.trim()] = decodeURIComponent(rest.join('=').trim())
    return acc
  }, {})
}

export async function getUserFromRequest(request: Request): Promise<AuthTokenPayload | null> {
  const cookieHeader = request.headers.get('cookie')
  const cookies = parseCookies(cookieHeader)
  const token = cookies[COOKIE_NAME]
  if (!token) return null
  return verifyAuthToken(token)
}

export { COOKIE_NAME }

