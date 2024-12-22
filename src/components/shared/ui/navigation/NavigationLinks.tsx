import React from 'react';
import { Link } from 'react-router-dom';

export const NavigationLinks = () => {
  return (
    <nav className="space-x-4">
      <Link to="/" className="text-white hover:text-primary">Home</Link>
      <Link to="/settings" className="text-white hover:text-primary">Settings</Link>
      <Link to="/profile" className="text-white hover:text-primary">Profile</Link>
    </nav>
  );
};

export default NavigationLinks;