import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import BuildFormContainer from '@/components/maker-space/builds/form/BuildFormContainer';

const NewBuild = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto p-6"
    >
      <Card className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create New Build</h1>
        <BuildFormContainer />
      </Card>
    </motion.div>
  );
};

export default NewBuild;