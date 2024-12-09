import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MobileNavTrigger } from "./MobileNavTrigger";
import { MobileNavContent } from "./MobileNavContent";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    console.log('Closing mobile menu');
    setIsOpen(false);
  };

  return (
    <>
      <MobileNavTrigger isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={handleClose}
            />
            <MobileNavContent isOpen={isOpen} onClose={handleClose} />
          </>
        )}
      </AnimatePresence>
    </>
  );
};