// components/Header.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileNavbar } from "@/components/mobile-navbar";
import {MobileNavbarWrapper} from "./MobileNavbarWrapper"
import { MobileNav } from "./MobileNav";
import { UserProfile } from "./UserProfile";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { connectToMongoDB } from "../../../Lib/db";
import Analyst from "../../../Models/AnalystsSchema";
import { UserProfile as UserProfileType } from "../../../Types/user";

export async function MainHeader() {
  const { isAuthenticated, getUser } = getKindeServerSession();
const userFromKinde = await getUser();
  
  // Transform Kinde user to match our UserProfile type
  const user: UserProfileType | null = userFromKinde ? {
    picture: userFromKinde.picture || null,
    family_name: userFromKinde.family_name || null,
    given_name: userFromKinde.given_name || null,
    email: userFromKinde.email || null,
    id: userFromKinde.id
  } : null;

  const isAuth = await isAuthenticated();

  let dbUser = null;
  if (user) {
    try {
      await connectToMongoDB();
      dbUser = await Analyst.findOne({ kindeId: user.id });
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  }

  const isAdmin = dbUser?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-colors hover:opacity-90">
          {/* Logo SVG */}
          <span className="font-heading text-xl font-bold">checkit</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {/* Navigation Links */}
          {isAuth && isAdmin && (
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuth ? (
            <>
              <LoginLink>
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </LoginLink>
              <RegisterLink postLoginRedirectURL="/api/auth/success">
                <Button size="sm">
                  Get Started
                </Button>
              </RegisterLink>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <UserProfile user={user} />
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNavbarWrapper>
          <MobileNavbar>
            <MobileNav 
              isAuthenticated={isAuth}
              user={user}
              isAdmin={isAdmin}
            />
          </MobileNavbar>
        </MobileNavbarWrapper>
      </div>
    </header>
  );
}