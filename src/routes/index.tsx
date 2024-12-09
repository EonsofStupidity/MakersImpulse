import { Routes, Route, Navigate } from "react-router-dom";
import { PageTransition } from "@/components/shared/transitions/PageTransition";
import { PublicRoutes } from "./public-routes";
import { ProtectedRoutes } from "./protected-routes";
import { adminRoutes } from "./admin-routes";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useSession } from "@/components/auth/SessionContext";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { toast } from "sonner";
import Landing from "@/pages/site/landing";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";

export const AppRoutes = () => {
  const { session, isLoading } = useSession();
  
  console.log('AppRoutes: Current session state:', { session, isLoading });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageTransition>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={
          session ? <Navigate to="/maker-space" replace /> : <Login />
        } />
        <Route path="/register" element={
          session ? <Navigate to="/maker-space" replace /> : <Register />
        } />
        
        {/* Map public routes */}
        {PublicRoutes().map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}

        {/* Protected Routes */}
        {ProtectedRoutes().map((route) => (
          <Route
            key={route.props.path}
            path={route.props.path}
            element={
              <AuthGuard 
                requireAuth={true}
                fallbackPath="/login"
                onError={(error) => {
                  console.error('Protected route access error:', error);
                  toast.error('Please sign in to access this content');
                }}
              >
                {route.props.element}
              </AuthGuard>
            }
          />
        ))}

        {/* Admin Routes */}
        {adminRoutes.map((route) => (
          <Route
            key={route.path}
            path={`/admin${route.path}`}
            element={
              <AuthGuard 
                requireAuth={true} 
                requiredRole={["admin", "super_admin"]}
                fallbackPath="/login"
                onError={(error) => {
                  console.error('Admin access error:', error);
                  toast.error(error instanceof Error ? error.message : 
                    typeof error === 'string' ? error : 
                    'message' in error ? error.message : 
                    'Access denied');
                }}
              >
                {route.element}
              </AuthGuard>
            }
          />
        ))}

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/maker-space" replace />} />
      </Routes>
    </PageTransition>
  );
};