import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Filter, Grid, List, SlidersHorizontal } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

const PartsDatabase = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState("");
  const session = useSession();
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [0, 300], [0.7, 1]);
  const scale = useTransform(scrollY, [0, 300], [0.95, 1]);
  const blur = useTransform(scrollY, [0, 300], [3, 8]);

  const { data: components, isLoading } = useQuery({
    queryKey: ["components", priceRange, searchQuery],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("base_product")
        .select("*")
        .gte("cost_usd", priceRange[0])
        .lte("cost_usd", priceRange[1])
        .order("name");

      if (error) throw error;
      return data;
    },
  });

  const filteredComponents = components?.filter((component) =>
    component.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Filters Panel */}
          <Card className="w-full md:w-64 p-4 space-y-6 sticky top-24">
            <div className="space-y-2">
              <h3 className="font-semibold">Filters</h3>
              <Input
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Price Range</h4>
              <Slider
                defaultValue={[0, 1000]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            <div className="pt-4">
              <Button variant="outline" className="w-full" onClick={() => setPriceRange([0, 1000])}>
                Reset Filters
              </Button>
            </div>
          </Card>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Parts Database</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant={view === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={view === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setView("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="h-[300px] animate-pulse bg-muted" />
                ))}
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {filteredComponents?.map((component, index) => (
                  <motion.div
                    key={component.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        type: "spring",
                        bounce: 0.4,
                        duration: 0.8,
                        delay: index * 0.1
                      }
                    }}
                    viewport={{ once: true }}
                    className="scroll-warp-in"
                  >
                    <Card className="overflow-hidden hover-glow transition-all duration-300">
                      {component.image_url && (
                        <div className="relative">
                          <img
                            src={component.image_url}
                            alt={component.name}
                            className="w-full h-48 object-cover"
                          />
                          {!session && (
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center">
                              <Button 
                                onClick={() => navigate("/auth")}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Join to View Details
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{component.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {component.manufacturer}
                        </p>
                        <div className="flex justify-between items-center">
                          <Badge variant="secondary">${component.cost_usd}</Badge>
                          <Badge
                            variant={
                              component.today_trending === "up"
                                ? "default"
                                : component.today_trending === "down"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {component.today_trending}
                          </Badge>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blurred CTA Overlay for non-authenticated users */}
      {!session && (
        <motion.div
          style={{ opacity, backdropFilter: `blur(${blur}px)` }}
          className="absolute inset-0 bg-black/30 flex items-center justify-center"
        >
          <motion.div
            style={{ scale }}
            className="text-center space-y-6 p-8 rounded-xl bg-black/40"
          >
            <h3 className="text-3xl font-bold text-white">
              Unlock Full Database Access
            </h3>
            <p className="text-lg text-gray-200 max-w-md mx-auto">
              Join our community to access detailed specifications, compatibility data, and pricing information for thousands of components.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/auth")}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-xl rounded-full animate-bounce"
            >
              Join Now
            </Button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default PartsDatabase;