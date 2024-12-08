import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const HeroVisuals = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const rotateX = useTransform(scrollY, [0, 300], [0, 45]);

  useEffect(() => {
    const loadImage = async () => {
      const { data } = supabase.storage
        .from('siteimgs')
        .getPublicUrl('siteimg_cow_maker_icon.png');
      
      setImageUrl(data.publicUrl);
    };

    loadImage();
  }, []);

  return (
    <motion.div
      style={{ opacity, scale, rotateX }}
      className="relative w-full max-w-2xl mx-auto perspective-1000"
    >
      {imageUrl && (
        <div className="relative aspect-square w-full max-w-md mx-auto">
          <img
            src={imageUrl}
            alt="3D Printer Maker"
            className="w-full h-full object-contain animate-float"
            loading="lazy"
          />
        </div>
      )}
      
      {/* Glow effects */}
      <div className="absolute -inset-4 bg-primary/20 blur-3xl -z-10" />
      <motion.div
        className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default HeroVisuals;