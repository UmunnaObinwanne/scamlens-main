// components/MobileNav.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { UserProfile } from "./UserProfile"
import { UserProfile as UserProfileType} from "../../../Types/user";


interface MobileNavProps {
  isAuthenticated: boolean;
  user: UserProfileType | null;
  isAdmin: boolean;
}

export function MobileNav({ isAuthenticated, user, isAdmin }: MobileNavProps) {
  return (
    <div className="flex flex-col">
      {!isAuthenticated ? (
        <>
          <nav className="flex flex-col space-y-1 p-4">
            {isAdmin && (
              <Link
                href="/dashboard"
                className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Dashboard
              </Link>
            )}
            <Link
              href="/about"
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              About
            </Link>
            {/* Other nav links */}
          </nav>

          <div className="border-t p-4 space-y-2">
            <LoginLink>
              <Button 
                variant="outline" 
                className="w-full"
                size="sm"
              >
                Sign in
              </Button>
            </LoginLink>
            <RegisterLink postLoginRedirectURL="/api/auth/success">
              <Button 
                className="w-full"
                size="sm"
              >
                Get Started
              </Button>
            </RegisterLink>
          </div>
        </>
      ) : (
        <>
          <nav className="flex flex-col space-y-1 p-4">
            <Link
              href="/about"
              className="rounded-md px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            >
              About
            </Link>
            {/* Other nav links */}
          </nav>

          <div className="border-t p-4">
            <UserProfile user={user} />
          </div>
        </>
      )}
    </div>
  );
}