// app/api/reports/route.ts
import { NextResponse } from "next/server";
import { connectToMongoDB } from '../../../../Lib/db';
import RomanceScamReport from "../../../../Models/RomanceFormSchema";
import PlatformVerification from "../../../../Models/PlatformVerificationSchema";
import SocialVendorVerification from "../../../../Models/SocialVendorSchema";
import { auth } from "../auth/auth";

export async function GET(request: Request) {
  
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToMongoDB();
    
    // Get all reports from different collections
    const romanceReports = await RomanceScamReport.find({}).sort({ submissionDate: -1 });
    const platformReports = await PlatformVerification.find({}).sort({ submissionDate: -1 });
    const vendorReports = await SocialVendorVerification.find({}).sort({ submissionDate: -1 });

    console.log('reports fetched', romanceReports, platformReports, vendorReports)

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