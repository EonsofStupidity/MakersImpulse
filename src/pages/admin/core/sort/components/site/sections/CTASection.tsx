import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

const CTASection = () => {
  const navigate = useNavigate();
  const session = useSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, type: "spring" }}
      className="w-full max-w-6xl mx-auto"
    >
      <div className="glass-card relative overflow-hidden p-12">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-accent">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Join our community of makers and start building your dream 3D printer today.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg hover:scale-105 transition-all duration-300"
            onClick={() => navigate(session ? "/build" : "/auth")}
          >
            {session ? "Start Building" : "Get Started"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CTASection;