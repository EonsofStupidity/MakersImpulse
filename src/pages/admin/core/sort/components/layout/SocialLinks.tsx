import { Youtube, Twitch, Facebook } from "lucide-react";
import { motion } from "framer-motion";

const SocialLinks = ({ isScrolled }: { isScrolled: boolean }) => {
  return (
    <motion.div 
      className="hidden md:flex items-center space-x-4"
      animate={{ 
        opacity: isScrolled ? 0.8 : 1,
        scale: isScrolled ? 0.9 : 1
      }}
    >
      <a href="https://youtube.com/@makernetwork" target="_blank" rel="noopener noreferrer" 
         className="text-gray-400 hover:text-[#FF0000] transition-colors">
        <Youtube className="w-5 h-5" />
      </a>
      <a href="https://twitch.tv/makernetwork" target="_blank" rel="noopener noreferrer"
         className="text-gray-400 hover:text-[#6441A4] transition-colors">
        <Twitch className="w-5 h-5" />
      </a>
      <a href="https://facebook.com/makernetwork" target="_blank" rel="noopener noreferrer"
         className="text-gray-400 hover:text-[#1877F2] transition-colors">
        <Facebook className="w-5 h-5" />
      </a>
    </motion.div>
  );
};

export default SocialLinks;