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
      {/* Degraded grid patterns with noise texture */}
      <div className="fixed inset-0">
        {/* Base noise texture */}
        <div className="absolute inset-0 opacity-[0.15] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
        
        {/* Sporadic horizontal lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px)] bg-[size:67px_100%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_50%,transparent_100%)]" />
        
        {/* Irregular vertical lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:100%_43px] [mask-image:linear-gradient(to_right,transparent_0%,black_50%,transparent_100%)]" />
        
        {/* Diagonal degraded pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(45deg,#80808005_1px,transparent_1px),linear-gradient(-45deg,#80808005_1px,transparent_1px)] bg-[size:53px_53px] opacity-70" />
        
        {/* Random dots pattern */}
        <div className="absolute inset-0 [background-image:radial-gradient(#808080_1px,transparent_1px)] [background-size:39px_39px] opacity-[0.15]" />
        
        {/* Glitch effect overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#ffffff03_50%,transparent_100%)] animate-pulse" />
      </div>
      
      <Navigation />
      <Hero />
      
      {/* Enhanced depth gradient */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a10] to-[#1a1a1a] pointer-events-none" />
    </motion.main>
  );
};

export default Index;