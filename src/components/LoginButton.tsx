// components/LoginButton.tsx
"use client";

import { useRouter } from "next/navigation";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs";

export default function LoginButton() {
  return (
    <LoginLink 
      className="your-classes-here"
      postLoginRedirectUrl="/api/auth/kinde-callback"
    >
      Sign In
    </LoginLink>
  );
}