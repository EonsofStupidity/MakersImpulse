import { motion } from "framer-motion";
import FeaturedBuilds from "@/components/sections/FeaturedBuilds";
import { Card } from "@/components/ui/card";

const Featured = () => {
  return (
    <div className="container mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-card/80 backdrop-blur-sm border-t border-primary/20">
          <h1 className="text-3xl font-bold mb-8">Featured Builds</h1>
          <FeaturedBuilds />
        </Card>
      </motion.div>
    </div>
  );
};

export default Featured;