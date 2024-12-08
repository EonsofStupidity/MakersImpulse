import { Navigation } from "@/components/shared/ui/Navigation";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/ThemeContext";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Toaster />
        <Sonner />
      </div>
    </ThemeProvider>
  );
};