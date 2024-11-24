import OnlinePlatformForm from "../../components/OnlinePlatformForm"
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function OnlinePlatformVerify() {
   return (
    <ProtectedRoute>
      <div className="container mx-auto py-6">
        <OnlinePlatformForm />
      </div>
    </ProtectedRoute>
  );
}

