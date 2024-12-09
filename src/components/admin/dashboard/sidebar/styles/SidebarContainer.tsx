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
        "fixed left-0 top-16 h-[calc(100vh-4rem)]",
        "bg-black/20 backdrop-blur-xl border-r border-white/10",
        "after:content-[''] after:absolute after:top-0 after:right-0",
        "after:w-8 after:h-32 after:bg-transparent",
        "after:rounded-br-[100px] after:shadow-[5px_5px_10px_rgba(0,0,0,0.1)]",
        "after:border-b after:border-l after:border-white/10",
        "before:content-[''] before:absolute before:top-0 before:right-0",
        "before:w-8 before:h-16 before:-translate-y-4",
        "before:rounded-br-[40px] before:bg-transparent",
        "before:border-b before:border-l before:border-white/10",
        "z-50 transition-all duration-300",
        className
      )}
      style={{
        clipPath: "polygon(0 0, 100% 0, calc(100% - 16px) 16px, 100% 32px, 100% 100%, 0 100%, 0 0)",
        background: "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(65,240,219,0.1) 100%)"
      }}
    >
      {children}
    </motion.div>
  );
};