'use server'

// import { z } from 'zod'
import type { ActionResponseAuth } from '../types/address'
// import { createRefreshSession, createSession } from '@/lib/session';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';


export async function authHandle(prevState: ActionResponseAuth | null): Promise<ActionResponseAuth> {
    // Simulate network delay
    console.log('prevState', prevState);

    // await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
        const cookieStore = await cookies()
        const cookie = cookieStore.get('session')?.value

        if (cookie) {
            const session = await decrypt(cookie);
            if (!session?.userId) {
                return {
                    // login: true,
                    // message: 'Login successful!',
                    login: false,
                    message: 'logout successful!',
                }
            } else {
                return {
                    // login: false,
                    // message: 'logout successful!',
                    login: true,
                    message: 'Login successful!',
                }
            }

        }
        return {
            // login: true,
            // message: 'Login successful!',
            login: false,
            message: 'logout successful!',
        }
    } catch (error) {
        console.log('error:', error);
        return {
            login: false,
            message: 'An unexpected error occurred',
        }
    }
}

