import { motion, useScroll, useTransform } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface FeaturedBuildsProps {
  scrollVelocity?: number;
  scrollDirection?: "up" | "down";
  imageHoverEffect?: {
    whileHover: {
      scale: number;
      boxShadow: string;
    };
  };
}

const FeaturedBuilds = ({ scrollVelocity, scrollDirection, imageHoverEffect }: FeaturedBuildsProps) => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const session = useSession();

  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const rotateX = useTransform(scrollY, [0, 300], [0, 45]);

  return (
    <section className="relative py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured Builds</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore amazing 3D printer builds from our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  type: "spring",
                  bounce: 0.4,
                  duration: 0.8,
                  delay: index * 0.2
                }
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="scroll-warp-in"
            >
              <Card className="overflow-hidden hover-glow bg-card/80 backdrop-blur-sm">
                <div className="relative aspect-video">
                  <img
                    src={`/placeholder.svg`}
                    alt={`Featured Build ${index}`}
                    className="object-cover w-full h-full"
                  />
                  {!session && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center">
                      <Button 
                        onClick={() => navigate("/auth")}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Join to View
                      </Button>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Amazing Build {index}</h3>
                  <p className="text-gray-400">
                    A stunning custom 3D printer build with unique features and impressive specs.
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBuilds;