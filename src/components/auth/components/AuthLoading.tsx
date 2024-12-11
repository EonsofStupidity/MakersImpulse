import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface AuthLoadingProps {
  message?: string;
}

export const AuthLoading = ({ message = "Loading..." }: AuthLoadingProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-[200px]"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="flex flex-col items-center gap-3"
      >
        <Loader2 className="h-8 w-8 animate-spin text-[#41f0db]" />
        <p className="text-white/80 text-sm animate-pulse">{message}</p>
      </motion.div>
    </motion.div>
  );
};