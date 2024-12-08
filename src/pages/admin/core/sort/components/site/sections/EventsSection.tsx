import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  event_type: string;
  start_date: string;
  end_date: string | null;
  image_url: string | null;
  registration_url: string | null;
  is_featured: boolean;
  status: string;
}

const EventsSection = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ["community-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_events")
        .select("*")
        .eq("status", "upcoming")
        .order("start_date", { ascending: true })
        .limit(3);

      if (error) throw error;
      return data as CommunityEvent[];
    },
  });

  if (isLoading || !events?.length) return null;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Calendar className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline">{event.event_type}</Badge>
                  {event.is_featured && (
                    <Badge variant="secondary">Featured</Badge>
                  )}
                </div>

                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-muted-foreground mb-4 flex-1">
                  {event.description}
                </p>

                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(new Date(event.start_date), "MMM d, yyyy")}
                  </span>
                </div>

                {event.registration_url && (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => window.open(event.registration_url, "_blank")}
                  >
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;