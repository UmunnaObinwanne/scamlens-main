// app/api/reports/route.ts
import { NextResponse } from "next/server";
import { connectToMongoDB } from '../../../../Lib/db';
import RomanceScamReport from "../../../../Models/RomanceFormSchema";
import PlatformVerification from "../../../../Models/PlatformVerificationSchema";
import SocialVendorVerification from "../../../../Models/SocialVendorSchema";
import { auth } from "../auth/auth";

export async function GET() {
  try {
    console.log("Starting reports fetch...");
    
    const session = await auth();
    console.log("Session status:", !!session);
    
    if (!session) {
      console.log("No session found - unauthorized");
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log("Connecting to MongoDB...");
    await connectToMongoDB();
    console.log("MongoDB connected successfully");

    console.log("Fetching reports...");
    const [romanceReports, platformReports, vendorReports] = await Promise.all([
      RomanceScamReport.find({}).sort({ submissionDate: -1 }).lean(),
      PlatformVerification.find({}).sort({ submissionDate: -1 }).lean(),
      SocialVendorVerification.find({}).sort({ submissionDate: -1 }).lean()
    ]);

    console.log("Reports fetched:", {
      romanceCount: romanceReports.length,
      platformCount: platformReports.length,
      vendorCount: vendorReports.length
    });

    return NextResponse.json({ 
      success: true, 
      reports: {
        romance: romanceReports,
        platform: platformReports,
        vendor: vendorReports
      }
    });

  } catch (error: any) {
    console.error("Detailed fetch error:", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch reports',
        details: error.message 
      },
      { status: 500 }
    );
  }
}