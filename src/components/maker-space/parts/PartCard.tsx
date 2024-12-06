import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

const PartCard = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card className="p-4 bg-black/20 backdrop-blur-xl border border-white/10">
        <h3 className="text-xl font-bold text-white mb-2">Part Title</h3>
        <p className="text-white/80">Part description will go here</p>
      </Card>
    </motion.div>
  );
};

export default PartCard;