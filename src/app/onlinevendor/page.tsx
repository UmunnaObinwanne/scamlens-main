import SocialVendorWrapper from "@/components/SocialVendorWrapper"
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function SocialVendorPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-6">
        <SocialVendorWrapper />
      </div>
    </ProtectedRoute>
  );
}