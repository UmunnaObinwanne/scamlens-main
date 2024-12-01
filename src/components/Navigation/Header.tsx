"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { MobileNavbar } from "@/components/mobile-navbar";
import { MobileNavbarWrapper } from "./MobileNavbarWrapper";
import { MobileNav } from "./MobileNav";
import AuthButtons from "../AuthButtons/AuthButtons";

interface AdminPropss {
  session: any;
  isAdmin: boolean;
}

export function MainHeader() {
  const { data: session, status } = useSession();

  // Check if user is admin
  const isAdmin = session?.user?.email === 'iihtnigeria@gmail.com';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 transition-colors hover:opacity-90"
        >
          <span className="font-heading text-xl font-bold">checkit</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {isAdmin && (
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>

            </div>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <AuthButtons session={session} />
        </div>

        {/* Mobile Navigation */}
        <MobileNavbarWrapper>
          <MobileNavbar>
            <MobileNav session={session} 
            isAdmin={session?.user?.email === 'iihtnigeria@gmail.com'}
            />
          </MobileNavbar>
        </MobileNavbarWrapper>
      </div>
    </header>
  );
}