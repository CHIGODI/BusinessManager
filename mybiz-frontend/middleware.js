import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req) {
    const access_token = req.cookies.get('access_token')?.value;
    const refresh_token = req.cookies.get('refresh_token')?.value;

    if (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup') {
        return NextResponse.next();
    }

    if (!access_token && !refresh_token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (access_token) {
        try {
            const { payload } = await jwtVerify(access_token, new TextEncoder().encode(process.env.JWT_SECRET));
            return NextResponse.next();
        } catch (error) {
            console.log('Access token is invalid:', error);

            if (refresh_token) {
                try {
                    const refreshResponse = await fetch('http://localhost:8000/api/token/refresh/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refresh_token })
                    });

                    if (refreshResponse.ok) {
                        const data = await refreshResponse.json();
                        const response = NextResponse.next();
                        response.cookies.set('access_token', data.access);
                        return response;
                    } else {
                        return NextResponse.redirect(new URL('/login', req.url));
                    }
                } catch (error) {
                    console.log('Error refreshing token:', error);
                    return NextResponse.redirect(new URL('/login', req.url));
                }
            } else {
                return NextResponse.redirect(new URL('/login', req.url));
            }
        }
    }
    // If no conditions match, proceed to the next request
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/settings', '/products', '/sales', '/customers'],
};
