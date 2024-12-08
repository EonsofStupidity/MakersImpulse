import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSession } from "@supabase/auth-helpers-react";
import { ArrowRight, Users, Grid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const HeroContent = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [bgImageUrl, setBgImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      const { data } = supabase.storage
        .from('siteimgs')
        .getPublicUrl('tcl_header_cowpose_large.png');

      setBgImageUrl(data.publicUrl);
    };

    loadImage();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative w-full min-h-[600px] flex items-center">
      {/* Background Image */}
      {bgImageUrl && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${bgImageUrl})`,
            backgroundSize: '80%',
            backgroundPosition: 'center -50%',
            backgroundRepeat: 'no-repeat',
            opacity: 0.4,
            transform: 'translateY(-25%)'
          }}
        />
      )}

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-3xl space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold"
          variants={itemVariants}
        >
          Unleash Your Creativity: 
          <span className="text-gradient block mt-2">
            Build Your Dream 3D Printer
          </span>
        </motion.h1>

        <motion.p 
          className="text-lg md:text-xl text-gray-300 max-w-2xl"
          variants={itemVariants}
        >
          Join the MakersImpulse community, explore thousands of parts, and design 
          the perfect machine for your needs.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          variants={itemVariants}
        >
          {!session ? (
            <>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white hover-glow"
                onClick={() => navigate("/auth")}
              >
                Join the Community
                <Users className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10"
                onClick={() => navigate("/explore/builds")}
              >
                Explore Builds
                <Grid className="ml-2 h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white hover-glow"
                onClick={() => navigate("/build/new")}
              >
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10"
                onClick={() => navigate("/build/my-builds")}
              >
                My Builds
                <Grid className="ml-2 h-5 w-5" />
              </Button>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroContent;