import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense } from "react";
import { PageTransition } from "@/components/shared/transitions/PageTransition";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import { publicRoutes } from "./public-routes";
import { makerSpaceRoutes } from "./maker-space-routes";
import { adminRoutes } from "./admin-routes";

export const AppRoutes = () => {
  const { session, isLoading } = useAuth();
  
  console.log('AppRoutes: Session state:', { 
    userId: session?.user?.id,
    role: session?.user?.role,
    isLoading,
    hasSession: !!session
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <PageTransition>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes - Always Accessible */}
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}

          {/* Protected Maker Space Routes */}
          {makerSpaceRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <AuthGuard 
                  requireAuth={true}
                  onError={(error) => {
                    console.error('Auth error:', error);
                    toast.error('Please sign in to access this content');
                  }}
                >
                  {route.element}
                </AuthGuard>
              }
            />
          ))}

          {/* Admin Routes - Restricted to admin/super_admin */}
          {adminRoutes.map((route) => (
            <Route
              key={route.path}
              path={`/admin/${route.path}`}
              element={
                <AuthGuard 
                  requireAuth={true}
                  requiredRole={["admin", "super_admin"]}
                  fallbackPath="/"
                  onError={(error) => {
                    console.error('Admin access error:', error);
                    toast.error('Admin access required');
                  }}
                >
                  {route.element}
                </AuthGuard>
              }
            />
          ))}

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </PageTransition>
  );
};