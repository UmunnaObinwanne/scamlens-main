// components/AdminProtected.tsx
"use client"

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface AdminProtectedProps {
  children: ReactNode;
}

export default function AdminProtected({ children }: AdminProtectedProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && (!session || session.user.email !== 'iihtnigeria@gmail.com')) {
      router.push('/');
    }
  }, [session, status, router]);

  if (status === 'loading' || !session || session.user.email !== 'iihtnigeria@gmail.com') {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>;
  }

  return <>{children}</>;
}