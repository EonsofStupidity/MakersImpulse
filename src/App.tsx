import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "@/components/layouts/RootLayout";
import { AppRoutes } from "@/routes";
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { AdminSidebarProvider } from "@/components/admin/dashboard/sidebar/AdminSidebarContext";
import { Toaster } from "sonner";
import { QueryProvider } from "@/components/auth/providers/QueryProvider";
import { AuthProvider } from "@/components/auth/providers/AuthProvider";
import { AnimatePresence } from "framer-motion";

const App = () => {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <BrowserRouter>
          <AdminSidebarProvider>
            <ThemeProvider>
              <TooltipProvider>
                <AuthProvider>
                  <AnimatePresence mode="wait">
                    <RootLayout>
                      <AppRoutes />
                    </RootLayout>
                    <Toaster 
                      position="top-right" 
                      expand={false} 
                      richColors 
                      closeButton 
                    />
                  </AnimatePresence>
                </AuthProvider>
              </TooltipProvider>
            </ThemeProvider>
          </AdminSidebarProvider>
        </BrowserRouter>
      </QueryProvider>
    </ErrorBoundary>
  );
};

export default App;