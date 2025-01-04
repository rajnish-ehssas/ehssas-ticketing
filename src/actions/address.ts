'use server'

import { z } from 'zod'
import type { ActionResponse, AddressFormData } from '../types/address'
// import { connectToDatabase } from '@/mongodb';
import { Client } from '@/mongodb/schemas/ClientSchema';
import bcrypt from 'bcrypt';
import { createRefreshSession, createSession } from '@/lib/session';

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }) // Minimum length of 8 characters
        .max(32, { message: "Password must not exceed 32 characters" }) // Optional maximum length
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" }) // At least one uppercase letter
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" }) // At least one lowercase letter
        .regex(/\d/, { message: "Password must contain at least one number" }) // At least one numeric digit
        .regex(/[@$!%*?&]/, { message: "Password must contain at least one special character (@$!%*?&)" }) // At least one special character
})

export async function submitLogin(prevState: ActionResponse | null, formData: FormData): Promise<ActionResponse> {
    // console.log('prevState', prevState);
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    try {
        const rawData: AddressFormData = {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
        }
        const validatedData = loginSchema.safeParse(rawData)
        if (!validatedData.success) {
            return {
                success: false,
                message: 'Please fix the errors in the form',
                errors: validatedData.error.flatten().fieldErrors,
            }
        }
        // await connectToDatabase();
        const { email, password } = validatedData.data;
        const user = await Client.findOne({ email });
        // console.log('user:', user);
        if (!user) {
            return {
                success: false,
                message: 'Invalid email.',
            }
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Password Invalid.',
            }
        }
        await createSession(user._id, user.roles); // for jose
        await createRefreshSession(user._id, user.roles)

        return {
            success: true,
            message: 'Login successful!',
        }
    } catch (error) {
        console.log('error', error);

        return {
            success: false,
            message: 'An unexpected error occurred',
        }
    }
}

