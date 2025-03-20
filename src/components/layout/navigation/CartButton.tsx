
import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export const CartButton: React.FC = () => {
  const { openCart, getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={openCart}
      className="relative text-mafia-light/80 hover:text-mafia-gold hover:bg-transparent"
    >
      <ShoppingBag className="h-5 w-5" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-mafia-gold text-xs text-mafia-dark font-bold rounded-full">
          {cartCount}
        </span>
      )}
    </Button>
  );
};
