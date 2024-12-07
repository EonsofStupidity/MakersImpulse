import { Route } from "react-router-dom";
import { AuthGuard } from "@/components/auth/AuthGuard";
import MakerSpace from "@/pages/content/maker-space";

export const ProtectedRoutes = () => (
  <>
    <Route 
      path="/maker-space" 
      element={<AuthGuard><MakerSpace /></AuthGuard>} 
    />
  </>
);