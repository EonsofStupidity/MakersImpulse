import { motion } from "framer-motion";
import { Search } from "lucide-react";

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1A1F2C]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center scale-80"
        style={{
          backgroundImage: "url('/lovable-uploads/4edf410a-5bd3-426b-8efe-fb8acb60e39c.png')",
          backgroundPosition: "center 40%",
          transform: "scale(0.8)"
        }}
      />
      
      <div className="container mx-auto px-6 pt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative"
        >
          <h1 className="mb-6 animate-float">
            Welcome to <span className="text-[#41f0db]">MakersImpulse</span>
          </h1>
          
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Your hub for 3D printing innovation. Discover builds, parts, and join our community of makers.
          </p>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search builds, parts, or guides..."
                className="w-full px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#ff0abe]/50 transition-all duration-300"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50" />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="glass px-8 py-3 text-white bg-gradient-to-r from-[#24e3dd] to-[#24e3dd]/70 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              Explore Builds
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="glass px-8 py-3 text-white bg-[#ff0abe]/20 hover:bg-[#ff0abe]/30 backdrop-blur-xl border border-white/10 transition-all duration-300"
            >
              Join Now
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.25 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="glass px-8 py-3 text-white bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300"
            >
              Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};