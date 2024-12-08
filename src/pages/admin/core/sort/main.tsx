import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import App from './App.tsx';
import './index.css';

const queryClient = new QueryClient();
const supabaseUrl = "https://sexaafhdokidiblyckas.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNleGFhZmhkb2tpZGlibHlja2FzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzMDAzNDUsImV4cCI6MjA0Nzg3NjM0NX0.cTZLl15qh9dgaH_LEE2PBxXF8ki1SXSx9pt6d0OmSPU";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <SessionContextProvider supabaseClient={supabase}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SessionContextProvider>
  </QueryClientProvider>
);