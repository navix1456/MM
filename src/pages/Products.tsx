
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProductGrid } from '@/components/features/ProductGrid';
import { products } from '@/data/products';
import { Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SearchDialog } from '@/components/features/SearchDialog';
import { useWishlist } from '@/context/WishlistContext';
import { useNavigate } from 'react-router-dom';

// Define product categories
const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'apparel', name: 'Apparel' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'posters', name: 'Posters' },
  { id: 'limited', name: 'Limited Edition' },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState('featured');
  const [searchOpen, setSearchOpen] = useState(false);
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  // Filter products when category or sort order changes
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'newest') {
      result.sort((a, b) => (a.new === b.new) ? 0 : a.new ? -1 : 1);
    } else if (sortOrder === 'bestseller') {
      result.sort((a, b) => (a.bestSeller === b.bestSeller) ? 0 : a.bestSeller ? -1 : 1);
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, sortOrder]);

  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-mafia-gold mb-2">
            Our Collection
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Explore our exclusive collection of premium merchandise. From stylish apparel to 
            custom phone cases and posters.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button 
            variant="outline" 
            className="border-mafia-gold text-mafia-gold hover:bg-mafia-gold hover:text-mafia-dark"
            onClick={() => navigate('/wishlist')}
          >
            <Heart className="h-4 w-4 mr-2" />
            Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
          </Button>
          <Button 
            variant="outline" 
            className="border-mafia-gold text-mafia-gold hover:bg-mafia-gold hover:text-mafia-dark"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button 
            variant="outline" 
            className="border-mafia-gold text-mafia-gold hover:bg-mafia-gold hover:text-mafia-dark"
          >
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Sort
          </Button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <Card className="bg-mafia-gray/30 border-mafia-gray/50">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={
                    selectedCategory === category.id
                      ? "bg-mafia-gold text-mafia-dark hover:bg-mafia-gold/90"
                      : "border-mafia-gray/50 text-mafia-light hover:bg-mafia-gray/20 hover:text-mafia-gold"
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sort options */}
      <div className="mb-6 flex justify-end">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-mafia-gray/30 text-mafia-light border border-mafia-gray/50 rounded-md py-2 px-3 text-sm"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest</option>
          <option value="bestseller">Best Sellers</option>
        </select>
      </div>

      <div className="mb-16">
        <ProductGrid products={filteredProducts} columns={4} />
      </div>

      <div className="text-center bg-mafia-gray p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-mafia-gold mb-4">Looking for Something Special?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Customize your own merch with our personalization options. Upload your designs and create unique pieces that reflect your style.
        </p>
        <Link to="/customize">
          <Button className="bg-mafia-gold text-mafia-dark hover:bg-mafia-accent">
            Create Custom Merch
          </Button>
        </Link>
      </div>
      
      {/* Search Dialog */}
      <SearchDialog open={searchOpen} setOpen={setSearchOpen} />
    </div>
  );
};

export default Products;
