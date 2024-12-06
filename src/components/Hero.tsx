import { motion } from "framer-motion";
import { Search } from "lucide-react";

const DatabaseItems = () => {
  const items = [
    { id: 1, title: "Ender 3 Build", type: "3D Printer", image: "https://images.unsplash.com/photo-1631832523112-e8e94f5eb07f?auto=format&fit=crop&q=80&w=200" },
    { id: 2, title: "Prusa i3", type: "Parts", image: "https://images.unsplash.com/photo-1615942581207-42a20ca0cd62?auto=format&fit=crop&q=80&w=200" },
    { id: 3, title: "Custom Hotend", type: "Component", image: "https://images.unsplash.com/photo-1579548520664-b1a7f91f956d?auto=format&fit=crop&q=80&w=200" },
    { id: 4, title: "Filament Guide", type: "Guide", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto filter blur-sm">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="card bevel-border animate-pulse-border"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-md mb-2" />
          <h3 className="text-white text-sm font-medium">{item.title}</h3>
          <p className="text-white/60 text-xs">{item.type}</p>
        </motion.div>
      ))}
    </div>
  );
};

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1A1F2C]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div className="container mx-auto px-6 pt-24 relative z-10">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <DatabaseItems />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative"
        >
          <h1 className="mb-6 animate-float">
            Welcome to <span className="text-[#ff0abe]">MakersImpulse</span>
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Your hub for 3D printing innovation. Discover builds, parts, and join our community of makers.
          </p>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search builds, parts, or guides..."
                className="w-full px-6 py-4 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#ff0abe]/50"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="glass px-8 py-3 text-white hover:bg-white/20 transition-colors duration-200 bevel-border"
            >
              Explore Builds
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="glass px-8 py-3 text-white bg-[#ff0abe]/20 hover:bg-[#ff0abe]/30 transition-colors duration-200 bevel-border"
            >
              Join Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};