import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  item: {
    icon: LucideIcon;
    label: string;
    path: string;
    description: string;
  };
  isCollapsed: boolean;
  isHovered: boolean;
  isActive: boolean;
  onClick: () => void;
}

export const SidebarItem = ({ 
  item, 
  isCollapsed, 
  isHovered, 
  isActive,
  onClick 
}: SidebarItemProps) => {
  const Icon = item.icon;

  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 text-white/80 hover:text-white hover:bg-white/5",
          "transition-all duration-300 relative overflow-hidden",
          isCollapsed && "justify-center p-2",
          isActive && "bg-white/10 text-neon-cyan"
        )}
        onClick={onClick}
      >
        <Icon className={cn(
          "h-5 w-5 shrink-0",
          "transition-all duration-300",
          isCollapsed ? "mr-0" : "mr-2"
        )} />
        {!isCollapsed && (
          <span className="text-sm font-medium">{item.label}</span>
        )}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/10 to-[#ff0abe]/10 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            clipPath: "polygon(0 0, 100% 0, 95% 100%, 5% 100%)"
          }}
        />
      </Button>
      {isCollapsed && (isHovered || isActive) && (
        <div className="absolute left-full top-0 ml-2 p-2 bg-black/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
          <div className="text-sm font-medium text-white whitespace-nowrap">{item.label}</div>
          <div className="text-xs text-white/60">{item.description}</div>
        </div>
      )}
    </motion.div>
  );
};