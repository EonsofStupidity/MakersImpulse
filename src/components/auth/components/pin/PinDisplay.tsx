import { motion } from "framer-motion";

interface PinDisplayProps {
  currentPin: string;
}

export const PinDisplay = ({ currentPin }: PinDisplayProps) => {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: currentPin[i] ? 1 : 0.8,
            opacity: currentPin[i] ? 1 : 0.3
          }}
          className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        >
          {currentPin[i] && "*"}
        </motion.div>
      ))}
    </div>
  );
};