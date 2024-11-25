// app/api/auth/check-admin/route.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { connectToMongoDB } from "../../../../../Lib/db";
import Analyst from "../../../../../Models/AnalystsSchema";

export async function GET() {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ isAdmin: false }, { status: 401 });
    }

    await connectToMongoDB();
    const dbUser = await Analyst.findOne({ kindeId: user.id });

    if (!dbUser || dbUser.role !== 'admin') {
      return NextResponse.json({ isAdmin: false }, { status: 403 });
    }

    return NextResponse.json({ isAdmin: true }, { status: 200 });
  } catch (error) {
    console.error('Error checking admin status:', error);
    return NextResponse.json({ isAdmin: false }, { status: 500 });
  }
}