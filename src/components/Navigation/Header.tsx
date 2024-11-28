// components/Header.tsx
"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { MobileNavbar } from "@/components/mobile-navbar";
import { MobileNavbarWrapper } from "./MobileNavbarWrapper";
import { MobileNav } from "./MobileNav";
import AuthButtons from "../AuthButtons/AuthButtons";

export function MainHeader() {
  const { data: session, status } = useSession();

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
          {/* Add any public navigation links here */}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <AuthButtons session={session} />
        </div>

        {/* Mobile Navigation */}
        <MobileNavbarWrapper>
          <MobileNavbar>
            <MobileNav session={session} />
          </MobileNavbar>
        </MobileNavbarWrapper>
      </div>
    </header>
  );
}