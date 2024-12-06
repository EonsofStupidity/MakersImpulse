import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ContentLinks = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-2"
    >
      {/* Content links will go here */}
    </motion.div>
  );
};

export default ContentLinks;