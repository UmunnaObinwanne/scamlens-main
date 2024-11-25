// app/api/auth/success/route.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../../Lib/db";
import Analyst, { IAnalyst } from "../../../../../Models/AnalystsSchema";

export async function GET(request: Request): Promise<NextResponse> {
  console.log("Success route handler started");

  try {
    // Get the returnTo URL from query parameters
    const { searchParams } = new URL(request.url);
    const returnTo = searchParams.get('returnTo');
    console.log("Return URL:", returnTo);

    // Get the authenticated user from Kinde
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user || !user.id || !user.email) {
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    // Log the user details for debugging
    console.log("Authenticated user:", {
      id: user.id,
      email: user.email,
      givenName: user.given_name,
      familyName: user.family_name,
    });

    // Connect to the MongoDB database
    await connectToMongoDB();

    // Check if the user already exists in the database
    let dbAnalyst = await Analyst.findOne({
      $or: [{ kindeId: user.id }, { email: user.email }],
    });

    if (!dbAnalyst) {
      const analystData: Partial<IAnalyst> = {
        kindeId: user.id,
        email: user.email,
        firstName: user.given_name || user.email.split("@")[0],
        lastName: user.family_name || "User",
        role: "user", // Default role
        hasSubmittedForm: false,
        status: "pending",
      };

      console.log("Creating new analyst:", analystData);

      try {
        dbAnalyst = new Analyst(analystData);
        await dbAnalyst.validate(); // Enforce validation
        dbAnalyst = await dbAnalyst.save(); // Save the document
        console.log("New analyst created:", dbAnalyst);
      } catch (error) {
        console.error("Error creating analyst:", error);
        throw error;
      }
    }

    // Log the final analyst data
    console.log("Final analyst data:", {
      id: dbAnalyst._id,
      email: dbAnalyst.email,
      role: dbAnalyst.role,
      hasSubmittedForm: dbAnalyst.hasSubmittedForm,
    });

    // Determine redirect URL based on role and returnTo parameter
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    let redirectPath;

    if (dbAnalyst.role === "admin") {
      // Admins always go to dashboard
      redirectPath = "/dashboard";
    } else if (returnTo && returnTo.startsWith('/')) {
      // If returnTo is provided and is a valid path, use it
      redirectPath = returnTo;
    } else {
      // Default fallback
      redirectPath = "/";
    }

    const redirectUrl = new URL(redirectPath, baseUrl);

    console.log(`Redirecting ${dbAnalyst.role} to:`, redirectUrl.toString());
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error("Error in success handler:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}