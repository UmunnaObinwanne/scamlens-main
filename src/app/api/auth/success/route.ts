// app/api/auth/success/route.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../../Lib/db";
import Analyst from "../../../../../Models/AnalystsSchema";

export async function GET(request: Request) {
  console.log("Success route handler started");

  try {
    // Wait for a short time to ensure Kinde session is established
    await new Promise(resolve => setTimeout(resolve, 1000));

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    
    console.log("User data:", user);

    if (!user || !user.id) {
      console.log("No user found");
      return NextResponse.redirect(new URL('/api/auth/login', process.env.NEXT_PUBLIC_APP_URL!));
    }

    await connectToMongoDB();
    let dbAnalyst = await Analyst.findOne({ kindeId: user.id });
    console.log("Existing user:", dbAnalyst);

    if (!dbAnalyst) {
      const analystData = {
        kindeId: user.id,
        email: user.email,
        firstName: user.given_name || user.email?.split('@')[0],
        lastName: user.family_name || 'User',
        role: 'user',
        hasSubmittedForm: false,
        status: 'pending'
      };

      console.log("Creating new user:", analystData);
      dbAnalyst = await Analyst.create(analystData);
      console.log("New user created:", dbAnalyst);
    }

    // Get return URL from query params
    const { searchParams } = new URL(request.url);
    const returnTo = searchParams.get('returnTo');

    const redirectPath = returnTo && returnTo.startsWith('/') ? returnTo : '/';
    const redirectUrl = new URL(redirectPath, process.env.NEXT_PUBLIC_APP_URL);

    console.log("Redirecting to:", redirectUrl.toString());

    const response = NextResponse.redirect(redirectUrl);

    // Set secure cookies
    response.cookies.set('kinde_auth', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });
    console.log(user.id)

    return response;

  } catch (error) {
    console.error("Error in success handler:", error);
    return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL!));
  }
}