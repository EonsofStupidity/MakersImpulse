import { Button } from "@/components/ui/button";
import { Menu, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AdminHeaderProps {
  isSidebarCollapsed: boolean;
  onToggleSidebar: () => void;
  onRotateDock: () => void;
}

export const AdminHeader = ({ 
  isSidebarCollapsed, 
  onToggleSidebar,
  onRotateDock 
}: AdminHeaderProps) => {
  return (
    <div className={cn(
      "flex items-center justify-between p-4",
      // Desktop styles
      "lg:border-b lg:border-border/40",
      // Mobile styles
      "md:border-0"
    )}>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onToggleSidebar}
        className="hover:bg-[#34ebbd]/10 transition-colors"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRotateDock}
        className="hover:bg-[#fa19a7]/10 transition-colors"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};