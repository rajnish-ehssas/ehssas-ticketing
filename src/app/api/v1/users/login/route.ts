// import { NextRequest, NextResponse } from 'next/server';
// import { connectToDatabase } from '@/mongodb';
// import { Client } from '@/mongodb/schemas/ClientSchema';
// import { cookies } from 'next/headers'
// import jwt from "jsonwebtoken";
// const JWT_SECRET = JWT_SECRET || 'ehssas_digitch_tickting_jwt_secret';
// const TOKEN_EXPIRY = '1h'; // Token expiry (1 hour)

// export async function GET(request: NextRequest) {
//   try {
//     await connectToDatabase();
//     const users = await Client.find();
//     return NextResponse.json(users);
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     await connectToDatabase();
//     const cookieStore = await cookies()
//     const { email, password } = await request.json();
//     // Find the user by email
//     const user = await Client.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ error: 'Invalid email.' }, { status: 401 });
//     }
//     // Check if the password matches
//     const isPasswordValid = (password === user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json({ error: 'Password Invalid.' }, { status: 401 });
//     }
//     const tokenPayload = { id: user._id, email: user.email };
//     const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
//     // Set the token in an HTTP-only cookie
//     cookieStore.set('token', token, {
//       httpOnly: true,
//       secure: NODE_ENV === 'production',
//       sameSite: 'strict',
//       path: '/',
//       maxAge: 3600, // Matches token expiry (1 hour)
//     });
//     const response = NextResponse.json({ message: 'Login successful', user: { id: user._id, email: user.email } }, { status: 200 });
//     return response;
//   } catch (error) {
//     return NextResponse.json({ error: error || "Internal Server Error." }, { status: 500 });
//   }
// }







import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/mongodb';
import { Client } from '@/mongodb/schemas/ClientSchema';
import { createRefreshSession, createSession } from '@/lib/session';
import bcrypt from 'bcrypt';

export const maxDuration = 60
export async function GET() {
  try {
    await connectToDatabase();
    // const users = await Client.find();
    return NextResponse.json("");
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();
    // Find the user by email
    const user = await Client.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid email.' }, { status: 401 });
    }
    // Check if the password matches
    // const isPasswordValid = (password === user.password);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Password Invalid.' }, { status: 401 });
    }
    // const tokenPayload = { id: user._id, email: user.email, roles: user.roles };
    // await createSession(tokenPayload); // for jwt

    await createSession(user._id, user.roles); // for jose
    await createRefreshSession(user._id, user.roles)
    const response = NextResponse.json({ message: 'Login successful', user: user }, { status: 200 });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
    // return NextResponse.json({ error: error || "Internal Server Error." }, { status: 500 });
  }
}
