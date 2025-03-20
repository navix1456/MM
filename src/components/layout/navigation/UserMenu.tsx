
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

interface UserMenuProps {
  handleLogout: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ handleLogout }) => {
  const { user } = useAuth();

  return (
    <div className="hidden sm:flex relative group">
      <Button 
        variant="ghost" 
        size="icon"
        className="text-mafia-light/80 hover:text-mafia-gold hover:bg-transparent"
      >
        <User className="h-5 w-5" />
      </Button>
      <div className="absolute right-0 top-full mt-2 w-48 bg-mafia-dark border border-mafia-gray rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="px-4 py-3 border-b border-mafia-gray">
          <p className="text-sm font-semibold text-mafia-gold truncate">
            {user?.name}
          </p>
          <p className="text-xs text-mafia-light/60 truncate">
            {user?.email}
          </p>
        </div>
        <div className="py-1">
          <Link 
            to="/account" 
            className="block px-4 py-2 text-sm text-mafia-light hover:bg-mafia-gray/30 hover:text-mafia-gold"
          >
            Account
          </Link>
          <Link 
            to="/orders" 
            className="block px-4 py-2 text-sm text-mafia-light hover:bg-mafia-gray/30 hover:text-mafia-gold"
          >
            Orders
          </Link>
          <button 
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-sm text-mafia-light hover:bg-mafia-gray/30 hover:text-mafia-gold"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
};
