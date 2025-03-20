
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { ProductGrid } from '@/components/features/ProductGrid';
import { Trash2, ShoppingBag } from 'lucide-react';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, clearWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-mafia-gold mb-4">Your Wishlist is Empty</h1>
        <p className="text-gray-400 mb-8">You haven't added any items to your wishlist yet.</p>
        <Button onClick={() => navigate('/products')} className="bg-mafia-gold text-mafia-dark hover:bg-mafia-accent">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-mafia-gold mb-2">My Wishlist</h1>
          <p className="text-gray-400">You have {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist</p>
        </div>
        <Button 
          variant="outline" 
          className="mt-4 md:mt-0 border-red-500/50 text-red-500 hover:bg-red-950/20 hover:text-red-400"
          onClick={clearWishlist}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Wishlist
        </Button>
      </div>

      <div className="mb-16">
        <ProductGrid products={wishlist} columns={4} />
      </div>
    </div>
  );
};

export default Wishlist;
