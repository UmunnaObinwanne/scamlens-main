// components/ProtectedRoute.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/');
  }

  // Just check if user is authenticated
  return <>{children}</>;
}