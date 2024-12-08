import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollCardProps {
  children: ReactNode;
  index: number;
}

export const ScrollCard = ({ children, index }: ScrollCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};