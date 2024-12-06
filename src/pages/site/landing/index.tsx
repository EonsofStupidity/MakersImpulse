import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Search, Database, Box, Users, TrendingUp, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import BuildCard from "@/components/maker-space/builds/BuildCard";
import PartCard from "@/components/maker-space/parts/PartCard";
import GuideCard from "@/components/maker-space/guides/GuideCard";
import { ContentGrid } from "@/components/content/discovery/ContentGrid";
import { FilterSystem } from "@/components/content/discovery/FilterSystem";
import { useToast } from "@/components/ui/use-toast";

const LandingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { toast } = useToast();
  
  const backgroundY = useTransform(scrollY, [0, 1000], ["0%", "50%"]);
  const textY = useTransform(scrollY, [0, 500], ["0%", "100%"]);
  const parallaxY = useTransform(scrollY, [0, 1000], ["0%", "25%"]);

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

  const handleExplore = (section: string) => {
    toast({
      title: "Exploring " + section,
      description: "Navigating to " + section + " section...",
      duration: 2000,
    });
  };

  const FeaturePanel = ({ icon: Icon, title, description, gradient, link }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-xl ${gradient} p-1`}
    >
      <Link 
        to={link}
        onClick={() => handleExplore(title)}
        className="block h-full"
      >
        <div className="glass p-6 h-full rounded-lg backdrop-blur-xl border border-white/10 hover:border-neon-cyan/30 transition-all duration-300">
          <Icon className="w-12 h-12 mb-4 text-[#41f0db] animate-pulse" />
          <h3 className="text-2xl font-bold text-white mb-2 animate-neon-glow">{title}</h3>
          <p className="text-white/80">{description}</p>
        </div>
      </Link>
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
      <motion.div 
        style={{ y: parallaxY }}
        className="relative z-10 pt-32 pb-20"
      >
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

            {/* Search Bar with FilterSystem Integration */}
            <div className="max-w-2xl mx-auto mb-12">
              <FilterSystem />
            </div>

            {/* Content Grid Integration */}
            <ContentGrid />

            {/* Featured Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
              <FeaturePanel
                icon={Database}
                title="Latest Builds"
                description="Explore our comprehensive database of 3D printer builds with detailed specifications and user reviews."
                gradient="bg-gradient-to-r from-[#41f0db]/20 to-[#8000ff]/20"
                link="/maker-space/builds"
              />
              <FeaturePanel
                icon={Box}
                title="Parts Catalog"
                description="Find compatible parts and upgrades for your 3D printer with our interactive catalog system."
                gradient="bg-gradient-to-r from-[#ff0abe]/20 to-[#41f0db]/20"
                link="/maker-space/parts"
              />
            </div>

            {/* Supporting Sections */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <FeaturePanel
                icon={BookOpen}
                title="Community Guides"
                description="Learn from expert makers with our comprehensive guide collection."
                gradient="bg-gradient-to-r from-[#41f0db]/20 to-[#ff0abe]/20"
                link="/maker-space/guides"
              />
              <FeaturePanel
                icon={Users}
                title="User Reviews"
                description="Real experiences from our community of makers."
                gradient="bg-gradient-to-r from-[#ff0abe]/20 to-[#8000ff]/20"
                link="/maker-space/reviews"
              />
              <FeaturePanel
                icon={TrendingUp}
                title="Trending Projects"
                description="Stay updated with the latest and most popular builds."
                gradient="bg-gradient-to-r from-[#8000ff]/20 to-[#41f0db]/20"
                link="/maker-space/builds/trending"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Gradient Footer */}
      <motion.div
        style={{ y: textY }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a1a1a] to-transparent z-20"
      />
    </div>
  );
};

export default LandingPage;