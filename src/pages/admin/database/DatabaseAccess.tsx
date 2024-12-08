import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DatabaseStats from "./DatabaseStats";

const DatabaseAccess = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4">
      <div className="glass-card relative overflow-hidden p-12 rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <Lock className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF1B6B] to-[#9B51E0]">
              Unlock Full Access to Our Database
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join our community to access detailed specifications, compatibility
              data, and user reviews for thousands of 3D printer components.
            </p>
          </motion.div>

          <DatabaseStats />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button 
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-[#FF1B6B] hover:bg-[#FF1B6B]/90 text-white px-12 py-6 text-xl rounded-full"
            >
              Join Now
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseAccess;