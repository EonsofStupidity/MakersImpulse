import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[#1A1F2C]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      <div className="container mx-auto px-6 pt-24 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-primary">MakersImpulse</span>
          </h1>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Your hub for 3D printing innovation. Discover builds, parts, and join our community of makers.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="glass px-8 py-3 text-white hover:bg-white/20 transition-colors duration-200">
              Explore Builds
            </button>
            <button className="glass px-8 py-3 text-white hover:bg-white/20 transition-colors duration-200">
              Browse Parts
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};