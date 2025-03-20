
import { CartItem } from '@/context/CartContext';

const CART_STORAGE_KEY = 'merchMafiaCart';

export const getCartFromStorage = (): CartItem[] => {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Failed to parse cart from storage', error);
    return [];
  }
};

export const saveCartToStorage = (cart: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart to storage', error);
  }
};

export const clearCartFromStorage = (): void => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear cart from storage', error);
  }
};

export const getCartItemCount = (): number => {
  const cart = getCartFromStorage();
  return cart.reduce((count, item) => count + item.quantity, 0);
};

export const getCartTotal = (): number => {
  const cart = getCartFromStorage();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};
