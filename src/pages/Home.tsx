import { motion } from "framer-motion";
import { Navigation } from "@/components/layout/Navigation";

const Home = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#1a1a1a] relative overflow-hidden"
    >
      <Navigation />
      
      <div className="relative z-10 container mx-auto px-6 pt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-[#41f0db] text-5xl md:text-7xl font-bold mb-8">
            Welcome Home
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#41f0db]/20 to-[#ff0abe]/20 rounded-xl blur-xl group-hover:opacity-100 transition-opacity opacity-50" />
                <div className="relative bg-black/40 backdrop-blur-xl p-8 rounded-xl border border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-4">Latest Updates</h3>
                  <p className="text-white/70">
                    Check out the newest features and improvements in our latest release.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="mt-6 px-6 py-2 bg-gradient-to-r from-[#41f0db]/20 to-[#ff0abe]/20 rounded-lg backdrop-blur-xl border border-white/10 text-white hover:shadow-[0_0_15px_rgba(65,240,219,0.3)]"
                  >
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a15] to-[#1a1a1a]" />
      </div>
    </motion.div>
  );
};

export default Home;