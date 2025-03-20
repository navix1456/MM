
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { User, LogOut, ShoppingCart, Search } from 'lucide-react';
import { SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { products } from '@/data/products';

interface MobileMenuProps {
  location: ReturnType<typeof useLocation>;
  setMobileMenuOpen: (open: boolean) => void;
  authDialogOpen: boolean;
  setAuthDialogOpen: (open: boolean) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ 
  location, 
  setMobileMenuOpen, 
  authDialogOpen,
  setAuthDialogOpen 
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      if (results.length === 1) {
        navigate(`/products/${results[0].id}`);
        setMobileMenuOpen(false);
      } else {
        // Navigate to products page with search query as a parameter
        navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <SheetContent side="left" className="bg-mafia-dark border-mafia-gray">
      <div className="flex flex-col h-full">
        <div className="py-6 border-b border-mafia-gray">
          <img 
            src="/lovable-uploads/3e548e41-8863-46c4-804b-24653ba06cb4.png" 
            alt="MERCH MAFIA" 
            className="h-10 w-auto mx-auto" 
          />
        </div>

        {/* Mobile Search */}
        <div className="px-4 py-4 border-b border-mafia-gray">
          <form onSubmit={handleSearch} className="flex">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-mafia-gray/30 border-mafia-gray text-mafia-light"
            />
            <Button type="submit" variant="ghost" size="icon" className="ml-2 text-mafia-light">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <nav className="flex flex-col py-6 space-y-4">
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 text-base font-medium transition-colors ${
              location.pathname === '/' 
                ? 'text-mafia-gold' 
                : 'text-mafia-light/80 hover:text-mafia-gold'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 text-base font-medium transition-colors ${
              location.pathname.includes('/products') && !location.search 
                ? 'text-mafia-gold' 
                : 'text-mafia-light/80 hover:text-mafia-gold'
            }`}
          >
            Shop All
          </Link>
          <Link 
            to="/products?category=clothing" 
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 text-base font-medium transition-colors ${
              location.search.includes('category=clothing') 
                ? 'text-mafia-gold' 
                : 'text-mafia-light/80 hover:text-mafia-gold'
            }`}
          >
            Clothing
          </Link>
          <Link 
            to="/products?category=poster" 
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 text-base font-medium transition-colors ${
              location.search.includes('category=poster') 
                ? 'text-mafia-gold' 
                : 'text-mafia-light/80 hover:text-mafia-gold'
            }`}
          >
            Posters
          </Link>
          <Link 
            to="/products?category=phonecase" 
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-2 text-base font-medium transition-colors ${
              location.search.includes('category=phonecase') 
                ? 'text-mafia-gold' 
                : 'text-mafia-light/80 hover:text-mafia-gold'
            }`}
          >
            Phone Cases
          </Link>
        </nav>
        
        <div className="mt-auto border-t border-mafia-gray py-4 space-y-4">
          {isAuthenticated ? (
            <div className="px-4 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-mafia-gold/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-mafia-gold" />
                </div>
                <div>
                  <p className="text-sm font-medium text-mafia-light">{user?.name}</p>
                  <p className="text-xs text-mafia-light/60">{user?.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <Link
                  to="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-mafia-light/80 hover:bg-mafia-gray/30 hover:text-mafia-gold"
                >
                  <User className="h-4 w-4" />
                  <span>My Account</span>
                </Link>
                <Link
                  to="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-mafia-light/80 hover:bg-mafia-gray/30 hover:text-mafia-gold"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>My Orders</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center space-x-2 px-3 py-2 rounded-md text-sm text-mafia-light/80 hover:bg-mafia-gray/30 hover:text-mafia-gold"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="px-4">
              <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-mafia-gold text-mafia-gold hover:bg-mafia-gold/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign In / Register
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </SheetContent>
  );
};
