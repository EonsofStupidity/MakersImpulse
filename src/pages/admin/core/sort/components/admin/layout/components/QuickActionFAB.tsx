import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const QuickActionFAB = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button 
        size="icon" 
        className="h-14 w-14 rounded-full shadow-lg relative group overflow-hidden bg-black/50 hover:bg-black/70 hover:scale-[1.06]"
        onClick={() => navigate("/admin/new")}
      >
        <span className="relative z-10 text-[#34ebbd] group-hover:text-[#fa19a7] transition-colors">+</span>
        <div className="absolute inset-0 bg-[#34ebbd]/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
      </Button>
    </motion.div>
  );
};