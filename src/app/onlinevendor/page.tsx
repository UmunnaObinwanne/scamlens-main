import SocialVendorWrapper from "@/components/SocialVendorWrapper"
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthWrapper from "@/components/Auth/Auth-Wrapper";

export default function SocialVendorPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-6">
        <AuthWrapper>
          <SocialVendorWrapper />
        </AuthWrapper>
      </div>
    </ProtectedRoute>
  );
}