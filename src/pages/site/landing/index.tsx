import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Search } from "lucide-react";

const transitions = [
  {
    initial: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 1.05, filter: "blur(8px)" },
  },
  {
    initial: { opacity: 0, x: -100, rotateY: -30 },
    animate: { opacity: 1, x: 0, rotateY: 0 },
    exit: { opacity: 0, x: 100, rotateY: 30 },
  },
  {
    initial: { opacity: 0, y: 50, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.9 },
  }
];

const LandingPage = () => {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "50%"]);
  const textY = useTransform(scrollY, [0, 500], ["0%", "100%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = containerRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-[#1a1a1a]"
    >
      {/* Cyberpunk Grid Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#41f0db]/10 via-[#ff0abe]/10 to-[#8000ff]/10" />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/5 via-[#ff0abe]/5 to-[#8000ff]/5 animate-gradient-flow" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="container mx-auto px-6 pt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center relative"
          >
            {/* Hero Title */}
            <h1 className="text-[#41f0db] text-4xl md:text-6xl font-bold mb-6 animate-float">
              <span className="letter-hover">Build your 3D Printer Dream</span>
            </h1>
            
            {/* Glass Card Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Feature Card 1 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass p-8 backdrop-blur-xl bg-gradient-to-br from-[#41f0db]/10 to-[#ff0abe]/10 border border-[#41f0db]/20"
              >
                <h2 className="text-2xl font-bold text-[#41f0db] mb-4">Innovate</h2>
                <p className="text-white/80">Create groundbreaking designs with cutting-edge tools and technology.</p>
              </motion.div>

              {/* Feature Card 2 */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass p-8 backdrop-blur-xl bg-gradient-to-br from-[#ff0abe]/10 to-[#8000ff]/10 border border-[#ff0abe]/20"
              >
                <h2 className="text-2xl font-bold text-[#ff0abe] mb-4">Create</h2>
                <p className="text-white/80">Bring your ideas to life with precision and expertise.</p>
              </motion.div>
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-12"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                className="px-8 py-3 text-white bg-gradient-to-r from-[#41f0db] to-[#ff0abe] rounded-lg shadow-lg hover:shadow-[#41f0db]/20 transition-all duration-300"
              >
                Get Started
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ y: textY }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent z-20"
      />
    </div>
  );
};

export default LandingPage;