import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from "@/components/auth/SessionContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "@/components/layouts/RootLayout";
import { AppRoutes } from "@/routes";
import { ErrorBoundary } from "@/components/shared/error-handling/ErrorBoundary";
import { ThemeProvider } from "@/components/theme/providers/ThemeProvider";
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
  console.log("App component rendering");
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeProvider>
            <TooltipProvider>
              <BrowserRouter>
                <RootLayout>
                  <AppRoutes />
                </RootLayout>
              </BrowserRouter>
              <Toaster 
                position="top-right"
                expand={false}
                richColors
                closeButton
              />
            </TooltipProvider>
          </ThemeProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;