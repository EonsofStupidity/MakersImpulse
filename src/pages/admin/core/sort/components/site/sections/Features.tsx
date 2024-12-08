import { motion } from "framer-motion";
import { Printer, Share2, Users, Wrench, Code, Star } from "lucide-react";
import { ScrollCard } from "@/components/ui/scroll-card";

interface FeaturesProps {
  scrollVelocity?: number;  // Made optional with ?
}

const features = [
  {
    title: "Build",
    description: "Create your dream 3D printer with our extensive database of parts and guides",
    icon: Printer,
  },
  {
    title: "Share",
    description: "Share your builds and inspire others in the community",
    icon: Share2,
  },
  {
    title: "Connect",
    description: "Join a vibrant community of makers and enthusiasts",
    icon: Users,
  },
  {
    title: "Customize",
    description: "Fine-tune every aspect of your printer to match your needs",
    icon: Wrench,
  },
  {
    title: "Learn",
    description: "Access detailed tutorials and documentation",
    icon: Code,
  },
  {
    title: "Excel",
    description: "Achieve professional-grade results with expert guidance",
    icon: Star,
  },
];

const Features = ({ scrollVelocity = 0 }: FeaturesProps) => {  // Added default value
  return (
    <section className="py-20 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to build and customize your perfect 3D printer
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScrollCard key={feature.title} index={index}>
              <div className="flex items-center gap-6 p-6 rounded-lg bg-secondary/80 hover:bg-secondary/60 transition-colors">
                <feature.icon className="w-12 h-12 text-primary shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            </ScrollCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;