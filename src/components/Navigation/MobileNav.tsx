// components/MobileNav.tsx
"use client"; // Ensure this is a client component since it handles interactivity
import AuthButtons from "../AuthButtons/AuthButtons"; // Reuse the AuthButtons component

export function MobileNav({ session }: { session: any }) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <AuthButtons session={session} /> {/* Use AuthButtons for mobile */}
    </div>
  );
}
