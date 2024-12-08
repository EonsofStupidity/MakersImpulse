import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

const Hero = ({ scrollVelocity, scrollDirection }: { scrollVelocity: number; scrollDirection: "up" | "down" }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [mascotUrl, setMascotUrl] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const springConfig = { stiffness: 300, damping: 30, bounce: 0.25 };
  
  useEffect(() => {
    const loadImages = async () => {
      const { data: headerData } = supabase.storage
        .from('siteimgs')
        .getPublicUrl('tcl_header_cowpose_large.png');
      
      const { data: mascotData } = supabase.storage
        .from('siteimgs')
        .getPublicUrl('siteimg_cow_maker_icon.png');
      
      setImageUrl(headerData.publicUrl);
      setMascotUrl(mascotData.publicUrl);
    };

    loadImages();
  }, []);
  
  const opacity = useSpring(
    useTransform(scrollY, [0, 300], [1, 0]),
    springConfig
  );
  
  const scale = useSpring(
    useTransform(scrollY, [0, 300], [1, 0.8]),
    springConfig
  );
  
  const y = useSpring(
    useTransform(scrollY, [0, 300], [0, -100]),
    springConfig
  );

  const rotateX = useSpring(
    useTransform(scrollY, [0, 300], [0, 45]),
    springConfig
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(110,27,255,0.1)_0%,rgba(26,31,44,0)_70%)]" />
        {imageUrl && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${imageUrl})`
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
      </div>
      
      <div className="container relative z-10 mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Text Content */}
        <motion.div
          style={{
            opacity,
            scale,
            y,
            rotateX,
            transformOrigin: "top",
          }}
          className="flex-1 text-center lg:text-left perspective-1000"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Build Your
            <span className="text-gradient block">Dream Machine</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
            Join the future of 3D printing. Design, build, and customize your perfect printer with our comprehensive platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white hover-glow"
            >
              Start Building
              <ArrowRight className="ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/10"
            >
              View Builds
            </Button>
          </div>
        </motion.div>

        {/* Mascot/Image Section */}
        <motion.div
          style={{
            opacity,
            scale,
            y,
            rotateX,
            transformOrigin: "top",
          }}
          className="flex-1 relative perspective-1000"
        >
          <div className="relative w-[500px] h-[500px]">
            {mascotUrl && (
              <img
                src={mascotUrl}
                alt="3D Printer Builder Mascot"
                className="absolute top-0 left-0 w-full h-full object-contain animate-float"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
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