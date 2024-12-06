import { Hero } from "@/components/shared/Hero";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#1a1a1a] relative overflow-hidden"
    >
      {/* Advanced degraded grid patterns with multiple layers */}
      <div className="fixed inset-0">
        {/* Enhanced noise texture with higher turbulence */}
        <div className="absolute inset-0 opacity-[0.18] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjk1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wOCIvPjwvc3ZnPg==')]" />
        
        {/* More sporadic horizontal lines with varying gaps */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px)] bg-[size:89px_100%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px)] bg-[size:157px_100%] [mask-image:linear-gradient(to_bottom,transparent_20%,black_50%,transparent_90%)]" />
        </div>
        
        {/* Irregular vertical lines with random spacing */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:100%_71px] [mask-image:linear-gradient(to_right,transparent_10%,black_40%,transparent_80%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:100%_123px] [mask-image:linear-gradient(to_right,transparent_30%,black_60%,transparent_90%)]" />
        </div>
        
        {/* Multi-layered diagonal patterns */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#80808004_1px,transparent_1px),linear-gradient(-45deg,#80808004_1px,transparent_1px)] bg-[size:83px_83px] opacity-60" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#80808003_1px,transparent_1px),linear-gradient(-45deg,#80808003_1px,transparent_1px)] bg-[size:127px_127px] opacity-40" />
        </div>
        
        {/* Scattered dot matrix with varying sizes */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 [background-image:radial-gradient(#808080_0.8px,transparent_0.8px)] [background-size:67px_67px] opacity-[0.12]" />
          <div className="absolute inset-0 [background-image:radial-gradient(#808080_0.5px,transparent_0.5px)] [background-size:93px_93px] opacity-[0.08]" />
        </div>
        
        {/* Dynamic glitch effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#ffffff02_30%,#ffffff04_50%,#ffffff02_70%,transparent_100%)] animate-pulse" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,#ffffff01_20%,#ffffff03_50%,#ffffff01_80%,transparent_100%)] animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
      
      <Hero />
      
      {/* Enhanced depth gradient with multiple layers */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a15] to-[#1a1a1a] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#1a1a1a08] to-[#1a1a1a] pointer-events-none opacity-40" />
      </div>
    </motion.main>
  );
};

export default Index;
