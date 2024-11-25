// app/api/auth/kinde_callback/route.ts
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const authResponse = await handleAuth()(request);
  return authResponse;
}