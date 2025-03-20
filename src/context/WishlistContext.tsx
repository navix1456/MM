
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { Product } from '@/data/products';

type WishlistContextType = {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

// Get wishlist from localStorage
const getStoredWishlist = (): Product[] => {
  if (typeof window === 'undefined') return [];
  
  const storedWishlist = localStorage.getItem('wishlist');
  if (storedWishlist) {
    try {
      return JSON.parse(storedWishlist);
    } catch (error) {
      console.error('Failed to parse stored wishlist', error);
      return [];
    }
  }
  return [];
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlist, setWishlist] = useState<Product[]>(getStoredWishlist());
  
  // Update localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    if (wishlist.some(item => item.id === product.id)) {
      return; // Item already in wishlist
    }
    
    setWishlist(prev => [...prev, product]);
    toast.success(`${product.name} added to wishlist`);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
    toast.info("Removed from wishlist");
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.info("Wishlist cleared");
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
