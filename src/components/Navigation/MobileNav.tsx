// components/MobileNav.tsx
import Link from "next/link";

interface MobileNavProps {
  session: any;
  isAdmin?: boolean;
}

export function MobileNav({ session, isAdmin }: MobileNavProps) {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {isAdmin && (
        <>
          <Link 
            href="/dashboard"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
        </>
      )}
      {/* Other mobile nav items */}
    </div>
  );
}