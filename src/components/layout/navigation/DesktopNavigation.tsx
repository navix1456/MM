
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const DesktopNavigation: React.FC = () => {
  const location = useLocation();
  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link 
        to="/" 
        className={`text-sm font-medium transition-colors ${
          location.pathname === '/' 
            ? 'text-mafia-gold' 
            : 'text-mafia-light/80 hover:text-mafia-gold'
        }`}
      >
        Home
      </Link>
      <Link 
        to="/products" 
        className={`text-sm font-medium transition-colors ${
          location.pathname.includes('/products') 
            ? 'text-mafia-gold' 
            : 'text-mafia-light/80 hover:text-mafia-gold'
        }`}
      >
        Shop
      </Link>
      <Link 
        to="/products?category=clothing" 
        className="text-sm font-medium text-mafia-light/80 hover:text-mafia-gold transition-colors"
      >
        Clothing
      </Link>
      <Link 
        to="/products?category=poster" 
        className="text-sm font-medium text-mafia-light/80 hover:text-mafia-gold transition-colors"
      >
        Posters
      </Link>
      <Link 
        to="/products?category=phonecase" 
        className="text-sm font-medium text-mafia-light/80 hover:text-mafia-gold transition-colors"
      >
        Phone Cases
      </Link>
    </nav>
  );
};
