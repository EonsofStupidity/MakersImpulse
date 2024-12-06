import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Search, Database, Box, Users, TrendingUp, BookOpen } from "lucide-react";

const LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
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

  const FeaturePanel = ({ icon: Icon, title, description, gradient }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-xl ${gradient} p-1`}
    >
      <div className="glass p-6 h-full rounded-lg backdrop-blur-xl">
        <Icon className="w-12 h-12 mb-4 text-[#41f0db] animate-pulse" />
        <h3 className="text-2xl font-bold text-white mb-2 animate-neon-glow">{title}</h3>
        <p className="text-white/80">{description}</p>
      </div>
    </motion.div>
  );

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-[#1a1a1a]">
      {/* Cyberpunk Grid Overlay */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#41f0db]/10 via-[#ff0abe]/10 to-[#8000ff]/10" />
      </motion.div>

      {/* Hero Section */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#41f0db] to-[#ff0abe] animate-float letter-hover">
              Build your 3D Printer Dream
            </h1>
            
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Join our community of makers and bring your ideas to life
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search builds, parts, or guides..."
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-[#41f0db] rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#41f0db] transition-all duration-300 animate-neon-pulse"
                />
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50" />
              </div>
            </div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-4xl mx-auto mb-20"
            >
              <img 
                src="/lovable-uploads/08249147-939f-4ee3-94ab-3c2bb85daaaf.png"
                alt="3D Printer"
                className="w-full h-auto rounded-xl shadow-2xl"
              />
            </motion.div>

            {/* Featured Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
              <FeaturePanel
                icon={Database}
                title="Latest Builds Database"
                description="Explore our comprehensive database of 3D printer builds with detailed specifications and user reviews."
                gradient="bg-gradient-to-r from-[#41f0db]/20 to-[#8000ff]/20"
              />
              <FeaturePanel
                icon={Box}
                title="Parts Catalog"
                description="Find compatible parts and upgrades for your 3D printer with our interactive catalog system."
                gradient="bg-gradient-to-r from-[#ff0abe]/20 to-[#41f0db]/20"
              />
            </div>

            {/* Supporting Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <FeaturePanel
                icon={BookOpen}
                title="Community Guides"
                description="Learn from expert makers with our comprehensive guide collection."
                gradient="bg-gradient-to-r from-[#41f0db]/20 to-[#ff0abe]/20"
              />
              <FeaturePanel
                icon={Users}
                title="User Reviews"
                description="Real experiences from our community of makers."
                gradient="bg-gradient-to-r from-[#ff0abe]/20 to-[#8000ff]/20"
              />
              <FeaturePanel
                icon={TrendingUp}
                title="Trending Projects"
                description="Stay updated with the latest and most popular builds."
                gradient="bg-gradient-to-r from-[#8000ff]/20 to-[#41f0db]/20"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Gradient Footer */}
      <motion.div
        style={{ y: textY }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent z-20"
      />
    </div>
  );
};

export default LandingPage;