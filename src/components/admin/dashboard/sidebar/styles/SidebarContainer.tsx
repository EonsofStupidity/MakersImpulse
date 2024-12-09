import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SidebarContainerProps {
  children: React.ReactNode;
  isCollapsed: boolean;
  className?: string;
}

export const SidebarContainer = ({ children, isCollapsed, className }: SidebarContainerProps) => {
  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 60 : 210 }}
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)]",
        "bg-black/20 backdrop-blur-xl border-r border-white/10",
        "after:content-[''] after:absolute after:top-0 after:right-0",
        "after:w-8 after:h-32 after:bg-transparent",
        "after:rounded-bl-[100px] after:shadow-[5px_5px_10px_rgba(0,0,0,0.1)]",
        "after:border-b after:border-l after:border-white/10",
        "z-50 transition-all duration-300",
        className
      )}
      style={{
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 0)",
        background: "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(65,240,219,0.1) 100%)"
      }}
    >
      {children}
    </motion.div>
  );
};