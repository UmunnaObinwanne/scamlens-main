// middleware.ts
export { auth as middleware } from "../app/api/auth/auth"

export const config = {
  matcher: ["/dashboard/:path*"]
}