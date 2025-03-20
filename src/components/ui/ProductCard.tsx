
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { WishlistButton } from '@/components/ui/WishlistButton';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { addToCart } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      category: product.category
    });
  };

  return (
    <Link 
      to={`/products/${product.id}`}
      className={`relative group bg-mafia-gray/10 rounded-lg border border-mafia-gray/20 overflow-hidden flex flex-col transition-all duration-300 hover-lift ${
        featured ? 'aspect-[4/5]' : 'aspect-[3/4]'
      }`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className={`${featured ? 'aspect-[4/3]' : 'aspect-square'} w-full`}>
          <img 
            src={product.images[0]} 
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'img-loaded' : 'img-loading'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.new && (
            <span className="px-2 py-1 bg-blue-500 text-white text-xs font-bold rounded">NEW</span>
          )}
          {product.bestSeller && (
            <span className="px-2 py-1 bg-mafia-gold text-mafia-dark text-xs font-bold rounded">BEST SELLER</span>
          )}
          {product.customizable && (
            <span className="px-2 py-1 bg-purple-500 text-white text-xs font-bold rounded">CUSTOMIZABLE</span>
          )}
        </div>
        
        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton product={product} />
        </div>
        
        {/* Quick Add Button */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-10">
          <Button 
            onClick={handleAddToCart}
            size="sm"
            className="bg-mafia-gold hover:bg-mafia-gold/90 text-mafia-dark"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-medium text-mafia-light group-hover:text-mafia-gold transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="mt-1 text-lg font-bold text-mafia-gold">
          ${product.price.toFixed(2)}
        </p>
        
        {featured && (
          <div className="mt-auto pt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full gap-2 mt-2 border-mafia-gray/40 text-mafia-light hover:bg-mafia-gray/20 hover:text-mafia-gold"
            >
              <ExternalLink className="h-4 w-4" />
              View Details
            </Button>
          </div>
        )}
      </div>
    </Link>
  );
};
