// components/AdminProtectedRoute.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { connectToMongoDB } from "../../Lib/db";
import Analyst from "../../Models/AnalystsSchema";

export async function AdminProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/');
  }

  try {
    await connectToMongoDB();
    const dbUser = await Analyst.findOne({ kindeId: user.id });

    if (!dbUser || dbUser.role !== 'admin') {
      redirect('/form');
    }
  } catch (error) {
    console.error('Error checking admin status:', error);
    redirect('/');
  }

  return <>{children}</>;
}