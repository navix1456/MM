
import React from 'react';
import { X } from 'lucide-react';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { QuantitySelector } from './QuantitySelector';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex py-4 border-b border-mafia-gray/20 last:border-0 animate-fade-in">
      {/* Product Image */}
      <div className="h-20 w-20 rounded-md overflow-hidden bg-mafia-gray/10 flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      {/* Product Details */}
      <div className="ml-4 flex-grow">
        <div className="flex justify-between">
          <h3 className="text-sm font-medium text-mafia-light">{item.name}</h3>
          <button 
            onClick={() => removeFromCart(item.id)}
            className="text-mafia-light/50 hover:text-mafia-gold transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {/* Custom options if any */}
        {item.customization && (
          <div className="mt-1">
            {item.customization.size && (
              <span className="text-xs text-mafia-light/60 mr-2">
                Size: {item.customization.size}
              </span>
            )}
            {item.customization.color && (
              <span className="text-xs text-mafia-light/60 mr-2">
                Color: {item.customization.color}
              </span>
            )}
            {item.customization.style && (
              <span className="text-xs text-mafia-light/60">
                Style: {item.customization.style}
              </span>
            )}
          </div>
        )}
        
        {/* Price and Quantity */}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm font-medium text-mafia-gold">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          <QuantitySelector
            quantity={item.quantity}
            onChange={handleQuantityChange}
            min={1}
            max={10}
          />
        </div>
      </div>
    </div>
  );
};
