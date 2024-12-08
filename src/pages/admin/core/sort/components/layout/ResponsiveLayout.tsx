import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Plus } from "lucide-react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import ErrorBoundary from "@/components/common/ErrorBoundary";

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  quickActions?: React.ReactNode;
}

export const ResponsiveLayout = ({
  children,
  sidebar,
  quickActions,
}: ResponsiveLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <ErrorBoundary>
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 min-h-screen border-r border-border/40 bg-card/50 backdrop-blur-sm fixed">
          <ScrollArea className="h-screen">
            <div className="p-4">
              {sidebar}
            </div>
          </ScrollArea>
        </aside>

        {/* Mobile Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <div className="flex items-center justify-between p-4">
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              {quickActions}
            </div>
            <SheetContent side="left" className="w-[300px] p-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  {sidebar}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content */}
        <main className="md:ml-64 min-h-screen w-full">
          {children}
        </main>

        {/* Mobile FAB */}
        <motion.div 
          className="fixed bottom-20 right-4 md:hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-full shadow-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </motion.div>
      </ErrorBoundary>
    </div>
  );
};