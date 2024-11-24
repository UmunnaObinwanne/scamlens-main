// middleware.ts
import { authMiddleware, withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextResponse } from "next/server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { connectToMongoDB } from "./../Lib/db";
import Analyst from "./../Models/AnalystsSchema";

export default async function middleware(request: Request) {
  // First, apply Kinde's auth middleware
  const authResult = await withAuth(request);

  const protectedPaths = [
    "/romance-verify",
    "/onlinevendor",
    "/onlineplatform-verify",
    "/verify/phone",
    "/form"
  ];

  const path = new URL(request.url).pathname;

  // Check if it's a verification route
  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      // User is authenticated, allow access to verification routes
      return authResult;
    } catch (error) {
      console.error('Error in verification route middleware:', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If the route is /dashboard, check for admin role
  if (path.includes('/dashboard')) {
    try {
      const { getUser } = getKindeServerSession();
      const user = await getUser();

      if (!user) {
        return NextResponse.redirect(new URL('/', request.url));
      }

      // Connect to DB and check if user is admin
      await connectToMongoDB();
      const dbUser = await Analyst.findOne({ kindeId: user.id });

      if (!dbUser || dbUser.role !== 'admin') {
        // If not admin, redirect to form
        return NextResponse.redirect(new URL('/form', request.url));
      }
    } catch (error) {
      console.error('Error in admin middleware:', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Return the original auth result
  return authResult;
}

export const config = {
  matcher: [
    "/dashboard",
    "/romance-verify",
    "/onlinevendor",
    "/onlineplatform-verify",
    "/verify/phone",
    "/form"
  ]
};