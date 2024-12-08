import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Package } from "lucide-react";

const categories = [
  { name: "Motion Control", icon: Package, href: "/parts/motion" },
  { name: "Electronics", icon: Package, href: "/parts/electronics" },
  { name: "Frame Components", icon: Package, href: "/parts/frame" },
  { name: "Extruders", icon: Package, href: "/parts/extruders" },
  { name: "Add-ons", icon: Package, href: "/parts/addons" },
  { name: "Sensors", icon: Package, href: "/parts/sensors" },
];

const PartCatalog = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Part Catalog</h2>
            <p className="text-muted-foreground">
              Browse our extensive collection of printer parts
            </p>
          </div>
          <Button onClick={() => navigate("/parts")} variant="outline">
            Full Catalog <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="p-6 text-center cursor-pointer hover:bg-accent transition-colors"
                onClick={() => navigate(category.href)}
              >
                <category.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                <h3 className="font-medium">{category.name}</h3>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartCatalog;