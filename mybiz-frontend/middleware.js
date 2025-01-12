import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"; // To extract the JWT from the request

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // If there is no token, the user is not authenticated
    if (!token) {
        // Allow access to the following public pages
        if (
            req.nextUrl.pathname === "/" ||
            req.nextUrl.pathname === "/login" ||
            req.nextUrl.pathname === "/signup"
        ) {
            return NextResponse.next();s
        }
        // Redirect unauthenticated users to login page
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Handle Role-Based Access Control (RBAC)
    const { role } = token;

    // Define which routes are restricted based on roles
    if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
        // Redirect users who are not admins to the homepage or any other page
        return NextResponse.redirect(new URL("/unauthorised", req.url));
    }
    if (req.nextUrl.pathname.startsWith("/user") && role !== "user") {
        // Redirect users who are not admins to the homepage or any other page
        return NextResponse.redirect(new URL("/unauthorised", req.url));
    }

    if (req.nextUrl.pathname.startsWith("/user") && role !== "user" && role !== "admin") {
        // Redirect users who are neither admins nor users to the homepage
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Allow authenticated users to continue to their requested route
    return NextResponse.next();
}

// Apply middleware to all routes except public routes
export const config = {
    matcher: [
        "/user/:path*",
        "/admin/:path*",
        "/settings",
        "/dashboard",
    ],
};
