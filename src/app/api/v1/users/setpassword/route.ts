// import { connectToDatabase } from '@/mongodb';
import { Client } from '@/mongodb/schemas/ClientSchema';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { PasswordChangeRequest } from '@/mongodb/schemas/PasswordChangeRequestSchema';

export async function POST(request: NextRequest) {
    try {
        // await connectToDatabase();
        const { password, tempPassword, userId } = await request.json();
        const passwordChangeRequest = await PasswordChangeRequest.findOne({ userId });
        if (!passwordChangeRequest) {
            return NextResponse.json({ message: 'No password reset request found.' }, { status: 404 });
        }
        if (passwordChangeRequest.expiresAt < new Date()) {
            return NextResponse.json({ message: 'Password reset request has expired.' }, { status: 400 });
        }
        const isMatch = await bcrypt.compare(tempPassword, passwordChangeRequest.tempPassword);
        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid temporary password.' }, { status: 400 });
        }
        // Fetch user by userId
        const user = await Client.findById(userId);
        if (!user) {
            return NextResponse.json({ message: 'User not found.' }, { status: 404 });
        }
        function isPasswordValid(password: string): boolean {
            return (
                password.length >= 8 &&
                /[A-Z]/.test(password) && // At least one uppercase letter
                /[a-z]/.test(password) && // At least one lowercase letter
                /[0-9]/.test(password) && // At least one digit
                /[!@#$%^&*]/.test(password) // At least one special character
            );
        }
        
        // // Validate the new password format (assuming validation is defined in schema)
        if (!isPasswordValid(password)) {
            return NextResponse.json(
                { message: "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long." },
                { status: 400 }
            );
        }
        // Hash the new password and update the user
        const hashedNewPassword = await bcrypt.hash(password, 10);
        const updateResult = await Client.updateOne(
            { _id: userId },
            { $set: { password: hashedNewPassword } }
        );

        if (updateResult.matchedCount === 0) {
            return NextResponse.json(
                { message: "Failed to update password. User not found." },
                { status: 404 }
            );
        }

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json(
                { message: "Password update failed due to an unknown reason." },
                { status: 500 }
            );
        }

        // Delete the password change request
        await PasswordChangeRequest.deleteOne({ _id: passwordChangeRequest._id });

        // // Periodic Cleanup of Expired Requests
        // setInterval(async () => {
        //     await PasswordChangeRequest.deleteMany({ expiresAt: { $lt: new Date() } });
        // }, 60 * 60 * 1000); // Run every hour

        const response = NextResponse.json(
            { message: "Your password has been successfully updated." },
            { status: 200 }
        );
        return response;
    } catch (error: unknown) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
