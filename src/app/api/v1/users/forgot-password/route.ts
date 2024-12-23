import { forgotPasswordMail } from '@/lib/sendEmail';
import { connectToDatabase } from '@/mongodb';
import { Client } from '@/mongodb/schemas/ClientSchema';
import { PasswordChangeRequest } from '@/mongodb/schemas/PasswordChangeRequestSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';


export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }
    const user = await Client.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: 'User with this email does not exist.' },
        { status: 404 }
      );
    }
    const origin = request.headers.get('origin') || "origin not define";
    // Generate a random temp password
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedTempPassword = await bcrypt.hash(tempPassword, 10);

    // Set expiry duration (e.g., 1 hour)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await PasswordChangeRequest.create({
      userId: user._id,
      tempPassword: hashedTempPassword,
      expiresAt,
    });
    if (user?.email) {
      forgotPasswordMail({
        email: user.email,
        origin,
        tempPassword, // Send unhashed temp password for the user
        userId: user._id,
      });
    }

    const response = NextResponse.json(
      { message: "A password reset link has been sent to your email. Please check your inbox." },
      { status: 200 }
    );
    return response;
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
