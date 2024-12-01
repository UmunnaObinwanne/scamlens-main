// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/app/api/auth/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!session || session.user.email !== 'iihtnigeria@gmail.com') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"]
};