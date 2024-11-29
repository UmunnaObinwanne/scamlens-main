// app/api/reports/route.ts
import { NextResponse } from "next/server";
import { connectToMongoDB } from '../../../../Lib/db';
import RomanceScamReport from "../../../../Models/RomanceFormSchema";
import PlatformVerification from "../../../../Models/PlatformVerificationSchema";
import SocialVendorVerification from "../../../../Models/SocialVendorSchema";
import { auth } from "../auth/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToMongoDB();
    
    const [romanceReports, platformReports, vendorReports] = await Promise.all([
      RomanceScamReport.find({}).sort({ submissionDate: -1 }).lean(),
      PlatformVerification.find({}).sort({ submissionDate: -1 }).lean(),
      SocialVendorVerification.find({}).sort({ submissionDate: -1 }).lean()
    ]);

    return NextResponse.json({ 
      success: true, 
      reports: {
        romance: romanceReports,
        platform: platformReports,
        vendor: vendorReports
      }
    });

  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
}