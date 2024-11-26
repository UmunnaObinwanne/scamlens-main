// app/api/auth/success/route.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../../Lib/db";
import Analyst, { IAnalyst } from "../../../../../Models/AnalystsSchema";

export async function GET(request: Request): Promise<NextResponse> {
  console.log("Success route handler started in:", process.env.NODE_ENV);

  try {
    // Get the returnTo URL from query parameters
    const { searchParams } = new URL(request.url);
    const returnTo = searchParams.get('returnTo');
    console.log("Return URL:", returnTo);

    // Get the authenticated user from Kinde
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log("Kinde User:", user);

    if (!user || !user.id || !user.email) {
      console.log("No user found, redirecting to home");
      return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL!));
    }

    // Connect to MongoDB
    try {
      await connectToMongoDB();
      console.log("MongoDB connected");
    } catch (dbError) {
      console.error("MongoDB connection error:", dbError);
      throw dbError;
    }

    // Check if the user already exists in the database
    let dbAnalyst = null;
    try {
      dbAnalyst = await Analyst.findOne({
        $or: [{ kindeId: user.id }, { email: user.email }],
      });
      console.log("Found analyst:", dbAnalyst);
    } catch (findError) {
      console.error("Error finding analyst:", findError);
      throw findError;
    }

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
      console.log("User is admin, redirecting to dashboard");
      redirectPath = "/dashboard";
    } else if (returnTo && returnTo.startsWith('/')) {
      console.log("Redirecting to return URL:", returnTo);
      redirectPath = returnTo;
    } else {
      console.log("Default redirect to home");
      redirectPath = "/";
    }

    const redirectUrl = new URL(redirectPath, baseUrl);
    console.log("Final redirect URL:", redirectUrl.toString());
    
    return NextResponse.redirect(redirectUrl);

  } catch (error) {
    console.error("Error in success handler:", error);
    // Log additional error details
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_APP_URL!));
  }
}