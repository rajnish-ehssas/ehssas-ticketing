

// import { NextRequest, NextResponse } from 'next/server';
// import { cookies } from 'next/headers'
// import jwt from 'jsonwebtoken';

// export async function middleware(req: NextRequest) {
//     const userNavigatinRoute = req.nextUrl.pathname
//     const cookieStore = await cookies()
//     const token = cookieStore.get('token')?.value
//     console.log('Middleware token:', token);

//     /*-----------------------------------------------Back-end side start--------------------------------------------------------- */
//     const apiPublic = ['/api/v1/users/login']
//     if (userNavigatinRoute.startsWith('/api/v1')) {
//         if (!token && !apiPublic.includes(userNavigatinRoute)) {
//             return NextResponse.json({ error: "Authentication Failed" }, { status: 401 });
//         } else {
//             try {
//                 if (token) {
//                     const decoded = jwt.decode(token);
//                     const decodedCookies = decoded as { id: string; email: string };
//                     const requestHeaders = new Headers(req.headers);
//                     requestHeaders.set('userData', JSON.stringify(decodedCookies));
//                     return NextResponse.next({
//                         request: { headers: requestHeaders, },
//                     });
//                 }
//             } catch (error) {
//                  return NextResponse.json({ error: "Authentication Failed" }, { status: 401 });
//             }

//         }
//     }
//     /*-----------------------------------------------Back-end side start--------------------------------------------------------- */
//     /*-----------------------------------------------Front-end side start-------------------------------------------------------- */
//     if (!token && userNavigatinRoute.startsWith('/in/en/clientportal')) {
//         // return NextResponse.redirect(new URL('/in/en/clientportal', req.url))
//         return NextResponse.redirect(new URL('/in/en/login', req.url))
//     } else {
//         if (token && userNavigatinRoute.startsWith('/in/en/login')) {
//             return NextResponse.redirect(new URL('/in/en/clientportal', req.url))
//         }
//     }
//     return NextResponse.next();
//     /*-----------------------------------------------Front-end side start--------------------------------------------------------- */
// }

// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)', '/api/:path*'],
// }




import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers'
import { decrypt, updateSession } from './lib/session';

export async function middleware(req: NextRequest) {
    const userNavigatinRoute = req.nextUrl.pathname
    const cookieStore = await cookies()
    const cookie = cookieStore.get('session')?.value
    const refreshCookie = cookieStore.get('refresh-session')?.value
    const session = await decrypt(cookie);
    const refreshSession = await decrypt(refreshCookie);
    if (!refreshCookie || !refreshSession?.userId) {
        if (session?.userId) {
            await updateSession(session?.userId as string, session?.roles as string[])
        }
    }
    // /*---------------------------------------Back-end side start----------------------------------------------------- */
    const apiPublic = ['/api/v1/users/login', '/api/v1/users/forgot-password', '/api/v1/users/setpassword']
    if (userNavigatinRoute.startsWith('/api/v1')) {
        if (!session?.userId && !apiPublic.includes(userNavigatinRoute)) {
            return NextResponse.json({ error: "Authentication Failed" }, { status: 401 });
        } else {
            try {
                if (session?.userId) {
                    const response = NextResponse.next();
                    response.headers.set('userData', JSON.stringify(session))
                    return response
                }
            } catch (error: unknown) {
                return NextResponse.json({ error: error || "Authentication Failed" }, { status: 401 });
            }
        }
    }
    /*-----------------------------------------Back-end side END------------------------------------------------------ */
    /*-----------------------------------------Front-end side start------------------------------------------------- */
    let rolesArray = [];
    if (session?.roles) {
        if (Array.isArray(session.roles)) {
            rolesArray = session.roles; // It's already an array
        } else if (typeof session.roles === 'object') {
            rolesArray = Object.values(session.roles); // Convert object to array
        } else if (typeof session.roles === 'string') {
            rolesArray = session.roles.split(','); // Split string if roles are comma-separated
        }
    }
    const isAdmin = rolesArray.includes('ADMIN');
    const isClient = rolesArray.includes('CLIENT');
    const isClientRoute = userNavigatinRoute.startsWith('/in/en/clientportal')
    const isAdminRoute = userNavigatinRoute.startsWith('/in/en/adminportal')
    const isLoginRoute = userNavigatinRoute.startsWith('/in/en/login')
    // console.log('Middleware isAdmin:', isAdmin);
    // console.log('Middleware isClient:', isClient);
    // console.log('Middleware isClientRoute:', isClientRoute);
    // console.log('Middleware isAdminRoute:', isAdminRoute);
    // console.log('Middleware isLoginRoute:', isLoginRoute);

    /*--------------------------------------------TESTED---------------------------------------------------*/
    if (!session?.userId && (isClientRoute || isAdminRoute)) {
        return NextResponse.redirect(new URL('/in/en/login', req.nextUrl))
    }
    if (session?.userId && isLoginRoute) {
        if (isAdmin) {
            return NextResponse.redirect(new URL('/in/en/adminportal', req.nextUrl))
        }
        if (isClient) {
            return NextResponse.redirect(new URL('/in/en/clientportal', req.nextUrl))
        }
    }
    if (session?.userId && isAdminRoute && !isAdmin) {
        return NextResponse.redirect(new URL('/in/en/clientportal', req.nextUrl))
    }
    if (session?.userId && isClientRoute && !isClient) {
        return NextResponse.redirect(new URL('/in/en/adminportal', req.nextUrl))
    }
    /*--------------------------------------------TESTED---------------------------------------------------*/

    return NextResponse.next();
    /*----------------------------------------Front-end side END-------------------------------------------------- */
}

export const config = {
    // matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)', '/api/:path*'],
    matcher: ['/in/en/clientportal/:path*', '/in/en/adminportal/:path*', '/in/en/login', '/api/:path*'],
}
