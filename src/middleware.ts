// middleware.ts
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse, NextRequest } from "next/server";

export default withAuth({
  afterAuth(auth:any, req:NextRequest) {
    // Get the pathname of the request
    const path = req.nextUrl.pathname;

    // Protected paths that require authentication
    const protectedPaths = [
      "/dashboard",
      "/romance-verify",
      "/onlinevendor",
      "/onlineplatform-verify",
      "/verify/phone",
    ];

    // Check if the path is protected
    const isProtectedPath = protectedPaths.some(prefix => path.startsWith(prefix));

    // If it's a protected path and user is not authenticated, redirect to login
    if (isProtectedPath && !auth.userId) {
      return NextResponse.redirect(new URL('/api/auth/login', req.url));
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: [
    '/dashboard',
    '/romance-verify',
    '/onlinevendor',
    '/onlineplatform-verify',
    '/verify/phone',
  ]
};