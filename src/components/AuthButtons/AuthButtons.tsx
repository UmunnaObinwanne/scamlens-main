// components/AuthButtons.tsx
"use client"; // Mark this as a client component
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function AuthButtons({ session }: { session: any }) {
  return session?.user ? (
    <>
      <span className="text-sm">Welcome, {session.user.name || session.user.email}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </Button>
    </>
  ) : (
    <>
      <Button asChild variant="ghost" size="sm">
        <a href="/login">Sign in</a>
      </Button>
      <Button asChild size="sm">
        <a href="/signup">Get Started</a>
      </Button>
    </>
  );
}
