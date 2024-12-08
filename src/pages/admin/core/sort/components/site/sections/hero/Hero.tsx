import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import HeroContent from "./HeroContent";
import HeroVisuals from "./HeroVisuals";

const Hero = () => {
  const { scrollY } = useScroll();
  const springConfig = { stiffness: 300, damping: 30, bounce: 0.25 };
  
  // Transform for opacity that maintains visibility at bottom
  const opacity = useSpring(
    useTransform(scrollY, 
      [0, 200, 300], // Scroll positions
      [1, 1, 0.98]   // Opacity values - stays mostly visible
    ),
    springConfig
  );
  
  // Transform for scale that maintains size at bottom
  const scale = useSpring(
    useTransform(scrollY, 
      [0, 200, 300], 
      [1, 0.95, 0.95]  // Scales down slightly and maintains
    ),
    springConfig
  );
  
  // Transform for Y position that stops at a certain point
  const y = useSpring(
    useTransform(scrollY, 
      [0, 200, 300], 
      [0, -50, -50]    // Moves up and stays
    ),
    springConfig
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background effects */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,27,255,0.1)_0%,rgba(26,31,44,0)_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
      </motion.div>
      
      <div className="container relative z-10 mx-auto flex flex-col lg:flex-row items-center gap-12">
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.5,
            ease: [0.77, 0, 0.175, 1]
          }}
        >
          <HeroContent />
        </motion.div>

        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.7,
            ease: [0.77, 0, 0.175, 1]
          }}
        >
          <HeroVisuals />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full p-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
