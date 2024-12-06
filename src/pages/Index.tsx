import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#1A1F2C] min-h-screen"
    >
      <Navigation />
      <Hero />
    </motion.main>
  );
};

export default Index;