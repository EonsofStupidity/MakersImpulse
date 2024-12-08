import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

const DatabaseCTA = () => {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const session = useSession();

  const opacity = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.3, 0.8], [0.8, 1]);
  const blur = useTransform(scrollYProgress, [0.3, 0.8], [0, 8]);

  if (session) return null;

  return (
    <motion.div
      style={{ opacity }}
      className="fixed inset-0 z-50 pointer-events-none"
    >
      <motion.div
        style={{ scale }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          style={{ backdropFilter: `blur(${blur}px)` }}
          className="absolute inset-0 bg-black/30"
        />
        
        <div className="relative z-10 text-center space-y-6 pointer-events-auto">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Unlock Full Database Access
          </h2>
          
          <p className="text-xl text-gray-200 max-w-2xl mx-auto px-4">
            Join our community to access detailed specifications, compatibility data, and user reviews
            for thousands of 3D printer components.
          </p>
          
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-xl rounded-full hover:scale-105 transition-all duration-300"
          >
            Join Now
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DatabaseCTA;