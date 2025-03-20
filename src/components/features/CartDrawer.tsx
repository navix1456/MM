
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CartItem } from '@/components/ui/CartItem';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, X, ArrowRight, Trash2 } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    getCartTotal,
    clearCart
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={open => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-md bg-mafia-dark border-mafia-gray animate-slide-in">
        <SheetHeader className="border-b border-mafia-gray/20 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-mafia-gold flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Your Cart
            </SheetTitle>
            <SheetClose className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-mafia-gray/20">
              <X className="h-4 w-4 text-mafia-light/70" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </SheetHeader>
        
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh]">
            <div className="bg-mafia-gray/10 rounded-full p-6 mb-4">
              <ShoppingBag className="h-10 w-10 text-mafia-gold/50" />
            </div>
            <h3 className="text-lg font-medium text-mafia-light mb-2">Your cart is empty</h3>
            <p className="text-sm text-mafia-light/60 mb-4 text-center">
              Looks like you haven't added any products to your cart yet.
            </p>
            <SheetClose asChild>
              <Link to="/products">
                <Button variant="outline" className="border-mafia-gold text-mafia-gold hover:bg-mafia-gold/10">
                  Browse Products
                </Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 my-6 h-[calc(100vh-15rem)]">
              <div className="space-y-1 pr-3">
                {cart.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            
            <SheetFooter className="border-t border-mafia-gray/20 pt-4 flex-col space-y-4">
              <div className="space-y-2 w-full">
                <div className="flex justify-between text-sm text-mafia-light/70">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-mafia-light/70">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-medium text-mafia-light">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex flex-col w-full space-y-2">
                <SheetClose asChild>
                  <Link to="/checkout">
                    <Button className="w-full bg-mafia-gold hover:bg-mafia-gold/90 text-mafia-dark">
                      Checkout
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/products">
                    <Button variant="outline" className="w-full border-mafia-gray/40 text-mafia-light hover:bg-mafia-gray/20">
                      Continue Shopping
                    </Button>
                  </Link>
                </SheetClose>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearCart}
                  className="w-full text-mafia-light/60 hover:text-mafia-light hover:bg-mafia-gray/20"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cart
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
