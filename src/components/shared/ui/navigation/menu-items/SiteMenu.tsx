import React from 'react';
import { motion } from 'framer-motion';
import { ListItem } from '../ListItem';
import { menuVariants } from '../animations';

export const SiteMenu = () => (
  <motion.ul
    variants={menuVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className="grid w-[400px] gap-3 p-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl"
  >
    <ListItem href="/maker-space" title="Maker Space">
      Your central hub for all maker resources
    </ListItem>
    <ListItem href="/about" title="About">
      Learn about our mission and community
    </ListItem>
    <ListItem href="/terms" title="Terms">
      Terms of service and usage guidelines
    </ListItem>
    <ListItem href="/privacy" title="Privacy">
      Our privacy policy and data practices
    </ListItem>
  </motion.ul>
);