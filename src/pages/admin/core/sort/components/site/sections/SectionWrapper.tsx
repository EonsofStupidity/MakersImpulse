import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  backgroundImage?: string;
  className?: string;
}

const SectionWrapper = ({ children, backgroundImage, className = "" }: SectionWrapperProps) => {
  return (
    <section className={`min-h-[50vh] md:min-h-screen snap-start snap-always flex items-center justify-center py-12 md:py-20 px-4 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8,
        }}
        className="w-full relative"
      >
        {backgroundImage && (
          <div 
            className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-30"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        )}
        {children}
      </motion.div>
    </section>
  );
};

export default SectionWrapper;