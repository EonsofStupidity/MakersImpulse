import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "@/components/layouts/RootLayout";
import { AppRoutes } from "@/routes";
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";
import { ThemeProvider } from "@/components/theme/ThemeContext";
import { AdminSidebarProvider } from "@/components/admin/dashboard/sidebar/AdminSidebarContext";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { Toaster } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  console.log('App component mounting...');
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <AdminSidebarProvider>
              <ThemeProvider>
                <TooltipProvider>
                  <RootLayout>
                    <AppRoutes />
                  </RootLayout>
                  <Toaster 
                    position="top-right" 
                    expand={false} 
                    richColors 
                    closeButton 
                  />
                </TooltipProvider>
              </ThemeProvider>
            </AdminSidebarProvider>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;