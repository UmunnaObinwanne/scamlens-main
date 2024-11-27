// components/auth-wrapper.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth-check/check');
        if (!response.ok) {
          router.push('/api/auth/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        router.push('/api/auth/login');
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
}