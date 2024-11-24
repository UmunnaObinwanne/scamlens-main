// app/api/reports/[id]/route.ts
import { connectToMongoDB } from '../../../../../Lib/db';
import RomanceScamReport from "../../../../../Models/RomanceFormSchema";
import PlatformVerification from "../../../../../Models/PlatformVerificationSchema";
import VendorVerification from "../../../../../Models/SocialVendorSchema";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
 try {
   const id = req.url.split('/').pop();
   console.log('Fetching report with ID:', id);

   await connectToMongoDB();

   let report;
   let type;

   report = await RomanceScamReport.findById(id);
   if (report) type = 'romance';

   if (!report) {
     report = await PlatformVerification.findById(id);
     if (report) type = 'platform';
   }

   if (!report) {
     report = await VendorVerification.findById(id);
     if (report) type = 'vendor';
   }

   if (!report) {
     return NextResponse.json({ success: false, error: 'Report not found' }, { status: 404 });
   }

   return NextResponse.json({ success: true, report, type });

 } catch (error) {
   console.error('Error fetching report:', error);
   return NextResponse.json({ success: false, error: 'Failed to fetch report' }, { status: 500 });
 }
}

export async function PATCH(req: Request) {
  try {
    const id = req.url.split('/').pop();
    const body = await req.text();
    const { status, type } = JSON.parse(body);

    if (!status || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToMongoDB();
    let Model;
    switch(type) {
      case 'romance':
        Model = RomanceScamReport;
        break;
      case 'platform':
        Model = PlatformVerification;
        break;
      case 'vendor':
        Model = VendorVerification;
        break;
      default:
        throw new Error('Invalid report type');
    }

    const updatedReport = await Model.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    if (!updatedReport) {
      return NextResponse.json(
        { success: false, error: 'Report not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      report: updatedReport,
      type
    });

  } catch (error) {
    console.error('Error updating report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update status' },
      { status: 500 }
    );
  }
}