// middleware.ts
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse, NextRequest } from "next/server";

interface KindeAuth {
  userId?: string | null;
  isAuthenticated: boolean;
}

export default withAuth({
  afterAuth(auth: KindeAuth, req: NextRequest) {
    // Get the current path
    const path = req.nextUrl.pathname;
    
    // Skip middleware for auth-related paths and public routes
    if (path === '/' || path.startsWith('/api/auth/')) {
      return NextResponse.next();
    }

    const protectedPaths = [
      "/dashboard",
      "/romance-verify",
      "/onlinevendor",
      "/onlineplatform-verify",
      "/verify/phone",
    ];

    const isProtectedPath = protectedPaths.some(prefix => 
      path.startsWith(prefix)
    );

    // Check auth status
    const isAuthenticated = auth.isAuthenticated || 
                          req.cookies.get('kinde_auth') !== undefined;

    if (isProtectedPath && !isAuthenticated) {
      const loginUrl = new URL('/api/auth/login', req.url);
      loginUrl.searchParams.set('post_login_redirect_url', path);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }
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