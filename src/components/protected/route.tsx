// components/protected-route.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { connectToMongoDB } from "../../../Lib/db";
import Analyst from "../../../Models/AnalystsSchema";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAdmin?: boolean;
};

export async function ProtectedRoute({ 
  children, 
  requireAdmin = false 
}: ProtectedRouteProps): Promise<JSX.Element> {
  const { isAuthenticated, getUser } = getKindeServerSession();

  if (!(await isAuthenticated())) {
    redirect('/api/auth/login');
  }

  const user = await getUser();

  if (requireAdmin) {
    try {
      await connectToMongoDB();
      const dbUser = await Analyst.findOne({ kindeId: user?.id });

      if (!dbUser || dbUser.role !== 'admin') {
        redirect('/');
      }
    } catch (error) {
      console.error('Error checking admin status:', error);
      redirect('/');
    }
  }

  return (
    <div>
      {children}
    </div>
  );
}