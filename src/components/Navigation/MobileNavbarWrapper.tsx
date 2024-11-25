// components/client/MobileNavbarWrapper.tsx
"use client";

import { useState, useEffect } from 'react';

export function MobileNavbarWrapper({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}