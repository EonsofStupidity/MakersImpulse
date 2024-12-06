import { Navigation } from "@/components/layout/Navigation";
import { Hero } from "@/components/features/Hero";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#1a1a1a] relative overflow-hidden"
    >
      {/* Grid pattern background with interlacing */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#80808008_1px,transparent_1px),linear-gradient(-45deg,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
      
      <Navigation />
      <Hero />
      
      {/* Gradient overlay for depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-transparent to-[#1a1a1a] pointer-events-none" />
    </motion.main>
  );
};

export default Index;