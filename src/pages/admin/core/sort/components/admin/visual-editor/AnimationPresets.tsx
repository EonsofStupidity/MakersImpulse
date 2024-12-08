import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const presets = [
  {
    name: "Fade In",
    animation: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.5 }
    }
  },
  {
    name: "Slide Up",
    animation: {
      initial: { y: 50, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.5 }
    }
  },
  {
    name: "Scale In",
    animation: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { duration: 0.5 }
    }
  },
  {
    name: "Bounce",
    animation: {
      animate: { 
        y: [0, -10, 0],
        transition: {
          duration: 1,
          repeat: Infinity
        }
      }
    }
  }
];

const AnimationPresets = () => {
  return (
    <ScrollArea className="h-[300px] w-[300px] rounded-md border p-4">
      <div className="space-y-4">
        {presets.map((preset) => (
          <motion.div
            key={preset.name}
            className="relative"
            {...preset.animation}
          >
            <Button
              variant="outline"
              className="w-full justify-start text-left"
              onClick={() => {
                // Will implement animation application logic later
                console.log("Applied animation:", preset.name);
              }}
            >
              {preset.name}
            </Button>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default AnimationPresets;