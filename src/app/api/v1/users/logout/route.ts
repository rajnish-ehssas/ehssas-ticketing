import {  NextResponse } from 'next/server';
import { deleteSession } from '@/lib/session';


export async function POST() {
    try {
        await deleteSession()
        const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
        return response;
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
