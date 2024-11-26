// app/api/auth/success/route.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../../Lib/db";
import Analyst, { IAnalyst } from "../../../../../Models/AnalystsSchema";

export async function GET(request: Request): Promise<NextResponse> {
  console.log("Success route handler started");

  try {
    const { searchParams } = new URL(request.url);
    const returnTo = searchParams.get('returnTo');
    console.log("Return URL:", returnTo);

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id || !user.email) {
      return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL!));
    }

    console.log("Authenticated user:", {
      id: user.id,
      email: user.email,
      givenName: user.given_name,
      familyName: user.family_name,
    });

    await connectToMongoDB();

    let dbAnalyst = await Analyst.findOne({
      $or: [{ kindeId: user.id }, { email: user.email }],
    });

    if (!dbAnalyst) {
      const analystData: Partial<IAnalyst> = {
        kindeId: user.id,
        email: user.email,
        firstName: user.given_name || user.email.split("@")[0],
        lastName: user.family_name || "User",
        role: "user",
        hasSubmittedForm: false,
        status: "pending",
      };

      console.log("Creating new analyst:", analystData);

      try {
        dbAnalyst = new Analyst(analystData);
        await dbAnalyst.validate();
        dbAnalyst = await dbAnalyst.save();
        console.log("New analyst created:", dbAnalyst);
      } catch (error) {
        console.error("Error creating analyst:", error);
        throw error;
      }
    }

    console.log("Final analyst data:", {
      id: dbAnalyst._id,
      email: dbAnalyst.email,
      role: dbAnalyst.role,
      hasSubmittedForm: dbAnalyst.hasSubmittedForm,
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    let redirectPath;

    if (dbAnalyst.role === "admin") {
      redirectPath = "/dashboard";
    } else if (returnTo && returnTo.startsWith('/')) {
      redirectPath = returnTo;
    } else {
      redirectPath = "/";
    }

    const redirectUrl = new URL(redirectPath, baseUrl);
    console.log(`Redirecting ${dbAnalyst.role} to:`, redirectUrl.toString());
    
    return NextResponse.redirect(redirectUrl, {
      status: 302,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });

  } catch (error) {
    console.error("Error in success handler:", error);
    return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL!));
  }
}