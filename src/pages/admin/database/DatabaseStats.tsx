import { DatabaseIcon, Users } from "lucide-react";
import { motion } from "framer-motion";

const DatabaseStats = () => {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
    >
      <div className="flex flex-col items-center space-y-2">
        <DatabaseIcon className="w-12 h-12 text-primary" />
        <span className="text-4xl font-bold">1000+</span>
        <span className="text-gray-400 text-lg">Components</span>
      </div>
      <div className="flex flex-col items-center space-y-2">
        <Users className="w-12 h-12 text-primary" />
        <span className="text-4xl font-bold">5000+</span>
        <span className="text-gray-400 text-lg">Active Users</span>
      </div>
    </motion.div>
  );
};

export default DatabaseStats;