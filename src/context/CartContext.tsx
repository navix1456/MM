
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { 
  getCartFromStorage, 
  saveCartToStorage, 
  clearCartFromStorage 
} from '@/utils/cartStorage';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  category: string;
  customization?: {
    designUrl?: string;
    size?: string;
    color?: string;
    style?: string;
  };
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const savedCart = getCartFromStorage();
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart(currentCart => {
      // Check if the item already exists in the cart
      const existingItem = currentCart.find(
        cartItem => cartItem.id === item.id && 
        JSON.stringify(cartItem.customization) === JSON.stringify(item.customization)
      );

      if (existingItem) {
        // Update quantity if item exists
        const updatedCart = currentCart.map(cartItem => 
          cartItem.id === item.id && 
          JSON.stringify(cartItem.customization) === JSON.stringify(item.customization)
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
        toast.success(`Updated ${item.name} quantity in cart`);
        return updatedCart;
      } else {
        // Add new item to cart
        toast.success(`Added ${item.name} to cart`);
        return [...currentCart, item];
      }
    });
    openCart();
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      return removeFromCart(id);
    }

    setCart(currentCart => {
      return currentCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (id: string) => {
    setCart(currentCart => {
      const itemToRemove = currentCart.find(item => item.id === id);
      if (itemToRemove) {
        toast.info(`Removed ${itemToRemove.name} from cart`);
      }
      return currentCart.filter(item => item.id !== id);
    });
  };

  const clearCart = () => {
    setCart([]);
    clearCartFromStorage();
    toast.info("Cart cleared");
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
