// middleware.ts

/*
import { authMiddleware, withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";

export default async function middleware(request: Request) {
  // First, apply Kinde's auth middleware
  const authResult = await withAuth(request);

  const protectedPaths = [
    "/romance-verify",
    "/onlinevendor",
    "/onlineplatform-verify",
    "/verify/phone",
  ];

  const path = new URL(request.url).pathname;

  // All protected routes require authentication
  if (protectedPaths.some(prefix => path.startsWith(prefix)) || path.includes('/dashboard')) {
    return authResult;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/romance-verify",
    "/onlinevendor",
    "/onlineplatform-verify",
    "/verify/phone",
    "/api/auth/success",
     '/api/auth/(.*)',  // This catches all auth routes
  ]
};

*/

import {
  authMiddleware,
  withAuth,
} from "@kinde-oss/kinde-auth-nextjs/middleware";

export default function middleware(req: Request) {
  return withAuth(req);
}

export const config = {
  matcher: ["/dashboard"],
};