import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <motion.div
      animate={{ width: isSearchOpen ? "200px" : "40px" }}
      className="relative bg-secondary/80 backdrop-blur-md border border-gray-600 rounded-md overflow-hidden"
    >
      {isSearchOpen ? (
        <Input
          type="search"
          placeholder="Search..."
          className="w-full text-white bg-transparent placeholder-gray-400 focus:ring-0 focus:outline-none"
          autoFocus
          onBlur={() => setIsSearchOpen(false)}
        />
      ) : (
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 flex items-center justify-center text-gray-400 cursor-pointer hover:text-white transition-colors"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="h-5 w-5" />
        </motion.div>
      )}
    </motion.div>
  );
}