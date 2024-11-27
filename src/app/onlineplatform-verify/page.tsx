import OnlinePlatformForm from "../../components/OnlinePlatformForm"
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AuthWrapper from "@/components/Auth/Auth-Wrapper";

export default function OnlinePlatformVerify() {
   return (
    <ProtectedRoute>
       <div className="container mx-auto py-6">
         <AuthWrapper>
           <OnlinePlatformForm />
           </AuthWrapper>
      </div>
    </ProtectedRoute>
  );
}

