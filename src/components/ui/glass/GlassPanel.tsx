import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  level?: "low" | "medium" | "high";
  className?: string;
}

export const GlassPanel = ({
  children,
  level = "medium",
  className,
  ...props
}: GlassPanelProps) => {
  const glassStyles = {
    low: "bg-black/10 backdrop-blur-sm",
    medium: "bg-black/20 backdrop-blur-md",
    high: "bg-black/30 backdrop-blur-lg"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "rounded-lg border border-white/10",
        glassStyles[level],
        "bg-gradient-to-br from-white/5 to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};