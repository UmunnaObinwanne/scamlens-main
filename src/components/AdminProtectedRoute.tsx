// components/AdminProtectedRoute.tsx
import { checkAdmin } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function AdminProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await checkAdmin();

  if (!isAdmin) {
    redirect('/form');
  }

  return <>{children}</>;
}