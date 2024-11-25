// components/UserProfile.tsx
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { UserProfile as UserProfileType } from "../../../Types/user";

interface Props {
  user: UserProfileType | null;
}

export function UserProfile({ user }: Props) {
  if (!user) return null;

  return (
    <>
      <div className="flex items-center gap-3 mb-3">
        {user.picture ? (
          <img
            src={user.picture}
            alt={`${user.given_name}'s profile`}
            className="h-8 w-8 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
            {user.given_name?.[0]}
            {user.family_name?.[0]}
          </div>
        )}
        <div className="flex flex-col flex-1">
          <p className="text-sm font-medium">
            {user.given_name} {user.family_name}
          </p>
          <p className="text-xs text-muted-foreground">
            {user.email}
          </p>
        </div>
      </div>
      <LogoutLink>
        <Button variant="outline" size="sm" className="w-full">
          Sign out
        </Button>
      </LogoutLink>
    </>
  );
}