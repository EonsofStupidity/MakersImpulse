import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Search, Users, Book, Tools, Star, TrendingUp, MessageCircle } from "lucide-react";

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

  const CTAButton = ({ icon: Icon, text, image, color = "cyan" }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative group overflow-hidden rounded-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/20 to-[#ff0abe]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="glass p-6 flex items-center gap-4 relative z-10">
        <div className="w-16 h-16 rounded-full overflow-hidden">
          <img src={image} alt={text} className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#41f0db] transition-colors">
            {text}
          </h3>
          <div className="flex items-center gap-2 text-white/60">
            <Icon className="w-4 h-4" />
            <span>Explore Now</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden bg-[#1a1a1a]"
    >
      {/* Background Elements */}
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#41f0db] to-[#ff0abe] animate-float">
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
                  className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-[#41f0db] rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#41f0db] transition-all duration-300"
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

            {/* CTAs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <CTAButton 
                icon={MessageCircle}
                text="Join Forums"
                image="/lovable-uploads/935d5733-15e9-40b1-90f7-8f0b396452ec.png"
              />
              <CTAButton 
                icon={Tools}
                text="Explore Builds"
                image="/lovable-uploads/0a568f5e-da09-445b-8b37-e014edf76c51.png"
              />
              <CTAButton 
                icon={Star}
                text="Browse Parts"
                image="/lovable-uploads/293dada8-67ab-4da3-8f66-2f83623340b5.png"
              />
              <CTAButton 
                icon={Book}
                text="Read Guides"
                image="/lovable-uploads/71f960d6-8f95-4f76-87b9-1987d2afb370.png"
              />
              <CTAButton 
                icon={Users}
                text="Join Community"
                image="/lovable-uploads/935d5733-15e9-40b1-90f7-8f0b396452ec.png"
              />
              <CTAButton 
                icon={TrendingUp}
                text="Latest Trends"
                image="/lovable-uploads/08249147-939f-4ee3-94ab-3c2bb85daaaf.png"
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