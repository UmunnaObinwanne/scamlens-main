// components/features/index.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { FeaturesList } from "./Features-List";

export async function MainFeatures() {
  const { isAuthenticated } = getKindeServerSession();
  const authenticated = await isAuthenticated();

  return <FeaturesList isAuthenticated={authenticated} />;
}