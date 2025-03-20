
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { CartDrawer } from '@/components/features/CartDrawer';
import { useAuth } from '@/context/AuthContext';
import { DesktopNavigation } from './navigation/DesktopNavigation';
import { UserMenu } from './navigation/UserMenu';
import { AuthDialog } from './navigation/AuthDialog';
import { CartButton } from './navigation/CartButton';
import { MobileMenu } from './navigation/MobileMenu';
import { SearchDialog } from '@/components/features/SearchDialog';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Monitor scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-mafia-dark/95 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-8">
            <img 
              src="/lovable-uploads/3e548e41-8863-46c4-804b-24653ba06cb4.png" 
              alt="MERCH MAFIA" 
              className="h-8 w-auto" 
            />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Search Icon */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="text-mafia-light/80 hover:text-mafia-gold hover:bg-transparent"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* User Account */}
            {isAuthenticated ? (
              <UserMenu handleLogout={handleLogout} />
            ) : (
              <AuthDialog 
                open={authDialogOpen} 
                setOpen={setAuthDialogOpen} 
              />
            )}

            {/* Cart */}
            <CartButton />

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="md:hidden text-mafia-light/80 hover:text-mafia-gold hover:bg-transparent"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <MobileMenu 
                location={location}
                setMobileMenuOpen={setMobileMenuOpen}
                authDialogOpen={authDialogOpen}
                setAuthDialogOpen={setAuthDialogOpen}
              />
            </Sheet>
          </div>
        </div>
      </header>
      <CartDrawer />
      <SearchDialog open={searchOpen} setOpen={setSearchOpen} />
    </>
  );
};
