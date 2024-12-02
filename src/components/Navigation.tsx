import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-4" : "py-6"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          MakersImpulse
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/builds" className="nav-link">
            Builds
          </Link>
          <Link to="/parts" className="nav-link">
            Parts
          </Link>
          <Link to="/guides" className="nav-link">
            Guides
          </Link>
          <Link to="/reviews" className="nav-link">
            Reviews
          </Link>
        </div>
        <button className="glass px-6 py-2 text-white hover:bg-white/20 transition-colors duration-200">
          Search
        </button>
      </div>
    </nav>
  );
};