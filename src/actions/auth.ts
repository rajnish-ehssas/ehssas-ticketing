// import 'server-only'
import { createSession, deleteSession } from '@/lib/session';
import { Client } from '@/mongodb/schemas/ClientSchema';
import { loginSchema, LoginValidation } from '@/validation/usersValidate';
import { redirect } from 'next/navigation'
import { NextResponse } from 'next/server';


export async function signup(state: LoginValidation, formData: FormData) {
    // Validate form fields
    const validatedFields = loginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }
    const { email, password } = validatedFields.data
    const user = await Client.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: 'Invalid email.' }, { status: 401 });
    }
    // Check if the password matches
    const isPasswordValid = (password === user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ error: 'Password Invalid.' }, { status: 401 });
    }
    // const tokenPayload = { id: user._id, email: user.email, roles: user.roles };
    await createSession(user._id, user.roles);
    const isAdmin = user?.roles?.includes('ADMIN');
    const isClient = user?.roles?.includes('CLIENT');
    if (isAdmin) {
        redirect('/in/en/adminportal')
    } else if (isClient) {
        redirect('/in/en/clientportal')
    }
    // Call the provider or db to create a user...
}
export async function logout() {
    deleteSession()
    redirect('/in/en/login')
}