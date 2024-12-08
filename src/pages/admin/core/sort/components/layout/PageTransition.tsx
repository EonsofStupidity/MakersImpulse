import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
      animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 30,
        duration: 0.8
      }}
      className="page-wrapper"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;