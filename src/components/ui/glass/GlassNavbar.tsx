import React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassNavbarProps extends Omit<HTMLMotionProps<"nav">, "ref"> {
  children: React.ReactNode;
  level?: "low" | "medium" | "high";
  sticky?: boolean;
  className?: string;
}

export const GlassNavbar = ({
  children,
  level = "medium",
  sticky = true,
  className,
  ...props
}: GlassNavbarProps) => {
  const glassStyles = {
    low: "bg-black/10 backdrop-blur-sm border-white/5",
    medium: "bg-black/20 backdrop-blur-md border-white/10",
    high: "bg-black/30 backdrop-blur-lg border-white/20"
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      {...props}
      className={cn(
        "w-full border-b z-50",
        sticky && "sticky top-0",
        glassStyles[level],
        "transition-colors duration-300",
        className
      )}
    >
      {children}
    </motion.nav>
  );
};