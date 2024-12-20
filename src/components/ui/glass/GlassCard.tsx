import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
  level?: "low" | "medium" | "high";
  interactive?: boolean;
  className?: string;
}

export const GlassCard = ({
  children,
  level = "medium",
  interactive = true,
  className,
  ...props
}: GlassCardProps) => {
  const glassStyles = {
    low: "bg-black/10 backdrop-blur-sm border-white/5",
    medium: "bg-black/20 backdrop-blur-md border-white/10",
    high: "bg-black/30 backdrop-blur-lg border-white/20"
  };

  return (
    <motion.div
      whileHover={interactive ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <Card
        className={cn(
          "relative overflow-hidden border",
          glassStyles[level],
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity",
          "transition-all duration-300",
          className
        )}
      >
        {children}
      </Card>
    </motion.div>
  );
};