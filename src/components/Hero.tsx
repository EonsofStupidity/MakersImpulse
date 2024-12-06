import { motion } from "framer-motion";

const DatabaseItems = () => {
  const items = [
    { id: 1, title: "Ender 3 Build", type: "3D Printer", image: "https://images.unsplash.com/photo-1631832523112-e8e94f5eb07f?auto=format&fit=crop&q=80&w=200" },
    { id: 2, title: "Prusa i3", type: "Parts", image: "https://images.unsplash.com/photo-1615942581207-42a20ca0cd62?auto=format&fit=crop&q=80&w=200" },
    { id: 3, title: "Custom Hotend", type: "Component", image: "https://images.unsplash.com/photo-1579548520664-b1a7f91f956d?auto=format&fit=crop&q=80&w=200" },
    { id: 4, title: "Filament Guide", type: "Guide", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=200" },
    { id: 5, title: "Resin Setup", type: "Tutorial", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=200" },
    { id: 6, title: "Print Farm", type: "Business", image: "https://images.unsplash.com/photo-1574170623305-6c8ce0808826?auto=format&fit=crop&q=80&w=200" },
    { id: 7, title: "Auto Leveling", type: "Upgrade", image: "https://images.unsplash.com/photo-1631832523112-e8e94f5eb07f?auto=format&fit=crop&q=80&w=200" },
    { id: 8, title: "Dual Extruder", type: "Mod", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 max-w-4xl mx-auto filter blur-sm">
      {items.map((item) => (
        <div key={item.id} className="glass p-4 rounded-lg">
          <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded-md mb-2" />
          <h3 className="text-white text-sm font-medium">{item.title}</h3>
          <p className="text-white/60 text-xs">{item.type}</p>
        </div>
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
      
      {/* Content Container */}
      <div className="container mx-auto px-6 pt-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <DatabaseItems />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-primary">MakersImpulse</span>
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Your hub for 3D printing innovation. Discover builds, parts, and join our community of makers.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="glass px-8 py-3 text-white hover:bg-white/20 transition-colors duration-200"
            >
              Explore Builds
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="glass px-8 py-3 text-white bg-primary/20 hover:bg-primary/30 transition-colors duration-200"
            >
              Join Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};