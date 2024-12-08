import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import ErrorBoundary from "@/components/common/ErrorBoundary";

interface AppProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

export const AppProviders = ({ children }: AppProvidersProps) => (
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase} initialSession={null}>
      <TooltipProvider>
        <ErrorBoundary>
          <Toaster />
          <Sonner />
          {children}
        </ErrorBoundary>
      </TooltipProvider>
    </SessionContextProvider>
  </QueryClientProvider>
);