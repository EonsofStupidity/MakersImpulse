import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarContainerProps {
  children: React.ReactNode;
  isCollapsed: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}

export const SidebarContainer = ({ 
  children, 
  isCollapsed, 
  onMouseEnter,
  onMouseLeave,
  className 
}: SidebarContainerProps) => {
  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 60 : 185 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "fixed left-0 top-16 min-h-[500px]",
        "bg-black/20 backdrop-blur-xl border-r border-white/10",
        "after:content-[''] after:absolute after:bottom-0 after:right-0",
        "after:w-full after:h-[150px]",
        "after:bg-gradient-to-t after:from-black/20 after:to-transparent",
        "after:border-r after:border-white/10",
        "z-50 transition-all duration-300",
        className
      )}
      style={{
        clipPath: `polygon(
          0 0, 
          100% 0, 
          100% calc(100% - 150px), 
          0 100%, 
          0 0
        )`,
        background: "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(65,240,219,0.1) 100%)"
      }}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};