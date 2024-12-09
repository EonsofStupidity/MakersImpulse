import { Navigation } from "@/components/shared/ui/Navigation";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] text-white">
      <Navigation />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Toaster />
      <Sonner />
    </div>
  );
};