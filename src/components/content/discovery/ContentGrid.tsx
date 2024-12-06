import React from 'react';
import { motion } from 'framer-motion';

const ContentGrid = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
    >
      {/* Content grid items will go here */}
    </motion.div>
  );
};

export default ContentGrid;