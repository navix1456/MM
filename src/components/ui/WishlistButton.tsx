
import React from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/data/products';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  product: Product;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showText?: boolean;
  className?: string;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({
  product,
  variant = 'ghost',
  size = 'icon',
  showText = false,
  className,
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggleWishlist}
      className={cn(
        "transition-colors",
        inWishlist ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-500",
        className
      )}
      aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={cn("h-5 w-5", inWishlist ? "fill-current" : "")} />
      {showText && (
        <span className="ml-2">{inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>
      )}
    </Button>
  );
};
