
import React from 'react';
import { ProductCard } from '@/components/ui/ProductCard';
import { Product } from '@/data/products';

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  featured?: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  columns = 4,
  featured = false
}) => {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
  };

  return (
    <div className={`grid ${columnClasses[columns]} gap-6`}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} featured={featured} />
      ))}
    </div>
  );
};
