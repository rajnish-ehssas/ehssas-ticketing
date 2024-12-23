// import 'server-only';
// import jwt from 'jsonwebtoken';
// import { SessionPayload } from './definitions';
// import { cookies } from 'next/headers';

// const secretKey = JWT_SECRET_KEY;
// const TOKEN_EXPIRY = '1h'; // Token expiry (1 hour)

// // Function to encrypt a payload into a JWT
// export async function encrypt(payload: SessionPayload): Promise<string> {
//   if (!secretKey) {
//     throw new Error('JWT_SECRET_KEY is not defined in environment variables');
//   }
//   return jwt.sign(payload, secretKey, {
//     algorithm: 'HS256', // Same algorithm as used before
//     expiresIn: TOKEN_EXPIRY, 
//   });
// }

// // Function to decrypt and verify a JWT
// export async function decrypt(session: string | undefined = ''): Promise<SessionPayload | null> {
//   if (!session) {
//     console.error('Session token is missing or invalid');
//     return null; // Handle missing or invalid session gracefully
//   }
//   if (!secretKey) {
//     throw new Error('JWT_SECRET_KEY is not defined in environment variables');
//   }
//   try {
//     const payload = jwt.verify(session, secretKey, {
//       algorithms: ['HS256'],
//     }) as SessionPayload;
//     return payload;
//   } catch (error) {
//     console.error('Failed to verify session-:', error);
//     return null; // Return null if verification fails
//   }
// }

// // Updated createSession to accept a single tokenPayload object
// export async function createSession(tokenPayload: { id: string; email: string; roles: string[] }) {
//   const expiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
//   const session = await encrypt({
//     userId: tokenPayload.id,
//     email: tokenPayload.email,
//     roles: tokenPayload.roles,
//     expiresAt: expiresAt.toISOString(),
//   });

//   const cookieStore = await cookies();

//   cookieStore.set('session', session, {
//     httpOnly: true,
//     secure: true,
//     expires: expiresAt,
//     sameSite: 'lax',
//     path: '/',
//   });
// }

// // export async function createSession(id: number) {
// //     const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

// //     // 1. Create a session in the database
// //     const data = await db
// //       .insert(sessions)
// //       .values({
// //         userId: id,
// //         expiresAt,
// //       })
// //       // Return the session ID
// //       .returning({ id: sessions.id })

// //     const sessionId = data[0].id

// //     // 2. Encrypt the session ID
// //     const session = await encrypt({ sessionId, expiresAt })

// //     // 3. Store the session in cookies for optimistic auth checks
// //     const cookieStore = await cookies()
// //     cookieStore.set('session', session, {
// //       httpOnly: true,
// //       secure: true,
// //       expires: expiresAt,
// //       sameSite: 'lax',
// //       path: '/',
// //     })
// //   }

// export async function updateSession() {
//     const session = (await cookies()).get('session')?.value
//     const payload = await decrypt(session)

//     if (!session || !payload) {
//       return null
//     }
//     const expires = new Date(Date.now() + 1 * 60 * 60 * 1000);
//     const cookieStore = await cookies()
//     cookieStore.set('session', session, {
//       httpOnly: true,
//       secure: true,
//       expires: expires,
//       sameSite: 'lax',
//       path: '/',
//     })
//   }

//   export async function deleteSession() {
//     const cookieStore = await cookies()
//     cookieStore.delete('session')
//   }




// // for jose
import 'server-only'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers';
import { JWT_SECRET_KEY } from '@/env';

const secretKey = JWT_SECRET_KEY
const encodedKey = new TextEncoder().encode(secretKey)

interface CustomJWTPayload extends JWTPayload {
  expiresAt: Date;
}

export async function encrypt(payload: CustomJWTPayload) {
  const expiresAt = Math.floor(payload.expiresAt.getTime() / 1000)
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.error('Failed to verify session-:', error);
    return null;
  }
}

export async function createSession(userId: string, roles: string[]) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt, roles })
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}
export async function createRefreshSession(userId: string, roles: string[]) {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt, roles })
  const cookieStore = await cookies()
  cookieStore.set('refresh-session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function updateSession(userId: string, roles: string[]) {
  await createRefreshSession(userId, roles)
  await createSession(userId, roles)
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
  cookieStore.delete('refresh-session')
}