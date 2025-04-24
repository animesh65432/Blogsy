import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    console.log("Middleware - Token:", token); // Add this line

    const path = request.nextUrl.pathname
    const loginUrl = new URL('/signin', request.url)
    const blogs = new URL('/blogs', request.url)
    const isPublicRoute = path === '/signin' || path === '/signup'

    if (path.startsWith('/blogs') && !token) {
        console.log("Middleware - Redirecting to /signin");
        return NextResponse.redirect(loginUrl)
    }

    if (isPublicRoute && token) {
        console.log("Middleware - Redirecting to /blogs");
        return NextResponse.redirect(blogs)
    }

    console.log("Middleware - Proceeding");
    return NextResponse.next()
}

export const config = {
    matcher: ['/blogs/:path*', "/signin", "/signup"]
}