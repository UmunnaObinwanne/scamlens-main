// app/romance-verify/page.tsx
import RomanceFormWrapper from "@/components/RomanceFormWrapper";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function RomanceVerify() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto py-6">
        <RomanceFormWrapper />
      </div>
    </ProtectedRoute>
  );
}