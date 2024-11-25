// lib/auth.ts
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Analyst from "../../Models/AnalystsSchema";
import { connectToMongoDB } from "../../Lib/db"

export async function checkAdmin(): Promise<boolean> {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id) {
      return false;
    }

    await connectToMongoDB();
    const dbUser = await Analyst.findOne({ kindeId: user.id });

    return dbUser?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}