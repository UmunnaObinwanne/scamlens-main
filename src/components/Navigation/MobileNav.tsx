// components/MobileNav.tsx
import Link from "next/link";
import AuthButtons from "../AuthButtons/AuthButtons";

interface MobileNavProps {
  session: any;
  isAdmin?: boolean;
}

export function MobileNav({ session, isAdmin }: MobileNavProps) {
  return (
    <div className="fixed inset-x-0 top-[64px] bottom-0 z-[100] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
        {/* Auth buttons moved to top */}
        <div className="border-b p-4 bg-background">
          <AuthButtons session={session} />
        </div>

        <nav className="flex-1 p-4">
          <div className="flex flex-col space-y-4">
            {isAdmin && (
              <Link 
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
            )}
            {/* Add more nav items here */}
          </div>
        </nav>
      </div>
    </div>
  );
}