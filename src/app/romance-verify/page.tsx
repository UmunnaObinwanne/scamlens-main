// app/romance-verify/page.tsx
import RomanceFormWrapper from "@/components/RomanceFormWrapper";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthWrapper from "@/components/Auth/Auth-Wrapper";

export default function RomanceVerify() {
  return (
    <ProtectedRoute>

      <div className="container mx-auto py-6">
        <AuthWrapper>
          <RomanceFormWrapper />
           </AuthWrapper>
      </div>
    </ProtectedRoute>
  );
}